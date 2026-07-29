import type { Geometry, Position } from 'geojson';
import { cities as curatedCities } from '../data/cities';
import { loadProvinceGeoJson, type ProvinceFeatureCollection } from './geo';
import type { City, PlaceEra, ProvinceId } from '../types/domain';

const CACHE_KEY = 'armenian-atlas:settlements:v4';
const CACHE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export function clearSettlementCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Storage can be unavailable in strict privacy modes.
  }
}
const COVERAGE_BBOX = '36.83174,38.0639,41.94619,49.40351';
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter',
];

interface OsmElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  osm3s?: { timestamp_osm_base?: string };
  elements: OsmElement[];
}

interface SettlementCache {
  savedAt: number;
  places: City[];
  sourceTimestamp?: string;
}

export interface SettlementCatalogResult {
  places: City[];
  sourceTimestamp?: string;
  fromCache: boolean;
}

const armenianRegex = /[\u0531-\u058F]/;

function normalizeName(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en-US')
    .replace(/[^a-z0-9\u0531-\u058F]+/g, ' ')
    .trim();
}

function splitNames(...values: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (!value) continue;
    for (const part of value.split(/[;,/]/)) {
      const trimmed = part.trim();
      const key = normalizeName(trimmed);
      if (!trimmed || !key || seen.has(key)) continue;
      seen.add(key);
      result.push(trimmed);
    }
  }
  return result;
}

function transliterateLatinToArmenian(value: string): string {
  if (!value || armenianRegex.test(value)) return value;
  const source = value
    .replace(/sh/gi, 'š')
    .replace(/ch/gi, 'č')
    .replace(/zh/gi, 'ž')
    .replace(/kh/gi, 'x')
    .replace(/gh/gi, 'ġ')
    .replace(/ts/gi, 'c')
    .replace(/dz/gi, 'j')
    .replace(/th/gi, 't')
    .replace(/ph/gi, 'p');

  const map: Record<string, string> = {
    a: 'ա', b: 'բ', c: 'ծ', d: 'դ', e: 'ե', f: 'ֆ', g: 'գ', h: 'հ', i: 'ի',
    j: 'ձ', k: 'կ', l: 'լ', m: 'մ', n: 'ն', o: 'ո', p: 'պ', q: 'ք', r: 'ր',
    s: 'ս', t: 'տ', u: 'ու', v: 'վ', w: 'վ', x: 'խ', y: 'յ', z: 'զ',
    š: 'շ', č: 'չ', ž: 'ժ', ġ: 'ղ',
    ç: 'չ', ş: 'շ', ğ: 'ղ', ö: 'օ', ü: 'յու', ı: 'ը', ə: 'ը',
    â: 'ա', ê: 'ե', î: 'ի', ô: 'օ', û: 'ու',
  };

  let result = '';
  for (const character of source) {
    const lower = character.toLocaleLowerCase('en-US');
    const mapped = map[lower] ?? character;
    result += character === character.toLocaleUpperCase('en-US') && mapped.length === 1
      ? mapped.toLocaleUpperCase('hy-AM')
      : mapped;
  }
  return result.replace(/\s+/g, ' ').trim();
}

function pointInRing(lng: number, lat: number, ring: Position[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = Number(ring[i][0]);
    const yi = Number(ring[i][1]);
    const xj = Number(ring[j][0]);
    const yj = Number(ring[j][1]);
    const intersects = ((yi > lat) !== (yj > lat))
      && (lng < ((xj - xi) * (lat - yi)) / ((yj - yi) || Number.EPSILON) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}

function pointInPolygon(lng: number, lat: number, polygon: Position[][]): boolean {
  if (!polygon.length || !pointInRing(lng, lat, polygon[0])) return false;
  for (let i = 1; i < polygon.length; i += 1) {
    if (pointInRing(lng, lat, polygon[i])) return false;
  }
  return true;
}

function pointInGeometry(lng: number, lat: number, geometry: Geometry): boolean {
  if (geometry.type === 'Polygon') return pointInPolygon(lng, lat, geometry.coordinates);
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.some((polygon) => pointInPolygon(lng, lat, polygon));
  }
  if (geometry.type === 'GeometryCollection') {
    return geometry.geometries.some((child) => pointInGeometry(lng, lat, child));
  }
  return false;
}

function findProvinceId(lng: number, lat: number, provinces: ProvinceFeatureCollection): ProvinceId | null {
  for (const feature of provinces.features) {
    if (feature.geometry && pointInGeometry(lng, lat, feature.geometry)) return feature.properties.id;
  }
  return null;
}

function pickCoordinates(element: OsmElement): [number, number] | null {
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return [Number(lat), Number(lon)];
}

function determineEra(tags: Record<string, string>): PlaceEra {
  if (tags['abandoned:place'] || tags['disused:place'] || tags['was:place'] || tags.historic || tags.ruins === 'yes') return 'historical';
  if (tags.old_name || tags['old_name:hy']) return 'both';
  return 'present';
}

function toCity(element: OsmElement, provinceId: ProvinceId): City | null {
  const coordinates = pickCoordinates(element);
  const tags = element.tags ?? {};
  if (!coordinates) return null;

  const modernName = tags.name ?? tags['name:en'] ?? tags.int_name ?? tags.official_name;
  if (!modernName) return null;

  const englishName = tags['name:en'] ?? tags.int_name ?? modernName;
  const historicalNames = splitNames(
    tags['old_name:hy'],
    tags.old_name,
    tags['name:historic'],
    tags['historic:name'],
    tags['was:name'],
    tags.previous_name,
    tags['alt_name:hy'],
    tags.alt_name,
    tags['loc_name:hy'],
    tags.loc_name,
    tags['official_name:hy'],
  );
  const armenianName = tags['name:hy']
    ?? tags['old_name:hy']
    ?? historicalNames.find((name) => armenianRegex.test(name))
    ?? transliterateLatinToArmenian(englishName);
  const era = determineEra(tags);
  const placeType = tags.place ?? tags['abandoned:place'] ?? tags['disused:place'] ?? tags['was:place'];
  const category: City['category'] = tags.capital
    ? 'capital'
    : placeType === 'town'
      ? 'town'
      : era === 'historical'
        ? 'site'
        : 'city';
  const population = Number.parseInt((tags.population ?? '').replace(/[^0-9]/g, ''), 10);
  const eraDescription = era === 'historical'
    ? 'Պատմական կամ լքված բնակավայր'
    : placeType === 'town'
      ? 'Ներկայիս քաղաքային բնակավայր'
      : 'Ներկայիս քաղաք';
  const namesDescription = historicalNames.length
    ? ` Նախկին կամ այլընտրանքային անուններ՝ ${historicalNames.slice(0, 5).join(', ')}։`
    : '';

  return {
    id: `osm-${element.type}-${element.id}`,
    provinceId,
    nameHy: armenianName || modernName,
    nameEn: englishName,
    modernName,
    coordinates,
    category,
    note: `${eraDescription}՝ OpenStreetMap տվյալներով։${namesDescription}`,
    era,
    alternateNames: splitNames(
      tags['name:hy'],
      tags['name:en'],
      tags.int_name,
      tags.official_name,
      ...historicalNames,
    ).filter((name) => normalizeName(name) !== normalizeName(modernName)),
    population: Number.isFinite(population) && population > 0 ? population : undefined,
    source: 'openstreetmap',
    sourceId: `${element.type}/${element.id}`,
  };
}

function haversineKm(a: [number, number], b: [number, number]): number {
  const radius = 6371;
  const lat1 = a[0] * Math.PI / 180;
  const lat2 = b[0] * Math.PI / 180;
  const deltaLat = (b[0] - a[0]) * Math.PI / 180;
  const deltaLon = (b[1] - a[1]) * Math.PI / 180;
  const h = Math.sin(deltaLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function mergeCuratedAndLive(livePlaces: City[]): City[] {
  const curated = curatedCities.map((city) => ({
    ...city,
    era: city.era ?? (city.category === 'site' || city.category === 'monastery' || city.category === 'fortress' ? 'historical' : 'both'),
    source: 'curated' as const,
  }));
  const output: City[] = [...curated];

  for (const live of livePlaces) {
    const liveNames = new Set([
      normalizeName(live.modernName),
      normalizeName(live.nameEn),
      normalizeName(live.nameHy),
      ...(live.alternateNames ?? []).map(normalizeName),
    ].filter(Boolean));
    const existingIndex = output.findIndex((candidate) => {
      if (candidate.provinceId !== live.provinceId) return false;
      if (haversineKm(candidate.coordinates, live.coordinates) > 7) return false;
      return [candidate.modernName, candidate.nameEn, candidate.nameHy, ...(candidate.alternateNames ?? [])]
        .map(normalizeName)
        .some((name) => liveNames.has(name));
    });

    if (existingIndex < 0) {
      output.push(live);
      continue;
    }

    const existing = output[existingIndex];
    output[existingIndex] = {
      ...existing,
      modernName: existing.modernName || live.modernName,
      era: existing.era === 'historical' ? 'both' : existing.era,
      alternateNames: splitNames(
        ...(existing.alternateNames ?? []),
        live.modernName,
        live.nameEn,
        ...(live.alternateNames ?? []),
      ).filter((name) => ![existing.nameHy, existing.nameEn, existing.modernName].some((base) => normalizeName(base) === normalizeName(name))),
      population: live.population ?? existing.population,
      sourceId: live.sourceId,
      updatedAt: live.updatedAt,
    };
  }

  return output.sort((a, b) => {
    const byProvince = a.provinceId.localeCompare(b.provinceId);
    if (byProvince !== 0) return byProvince;
    const capitalWeight = (place: City) => place.category === 'capital' ? 0 : place.category === 'city' ? 1 : place.category === 'town' ? 2 : 3;
    const byCategory = capitalWeight(a) - capitalWeight(b);
    if (byCategory !== 0) return byCategory;
    return a.nameHy.localeCompare(b.nameHy, 'hy');
  });
}

function buildOverpassQuery(): string {
  return `[out:json][timeout:120];\n(\n  nwr["place"~"^(city|town)$"](${COVERAGE_BBOX});\n  nwr["abandoned:place"~"^(city|town)$"](${COVERAGE_BBOX});\n  nwr["disused:place"~"^(city|town)$"](${COVERAGE_BBOX});\n  nwr["was:place"~"^(city|town)$"](${COVERAGE_BBOX});\n  nwr["historic"~"^(city|town|settlement)$"](${COVERAGE_BBOX});\n  nwr["place"="locality"]["old_name"](${COVERAGE_BBOX});\n  nwr["place"="locality"]["historic"](${COVERAGE_BBOX});\n  nwr["historic"="archaeological_site"]["site_type"~"^(settlement|city|town)$"](${COVERAGE_BBOX});\n);\nout center tags;`;
}

async function fetchOverpassEndpoint(endpoint: string, query: string, signal?: AbortSignal): Promise<OverpassResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error('Overpass request timed out')), 28_000);
  const abortFromParent = () => controller.abort(signal?.reason);
  signal?.addEventListener('abort', abortFromParent, { once: true });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new URLSearchParams({ data: query }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Overpass ${response.status}`);
    return await response.json() as OverpassResponse;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abortFromParent);
  }
}

async function requestOverpass(signal?: AbortSignal): Promise<OverpassResponse> {
  const query = buildOverpassQuery();
  let lastError: unknown;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      return await fetchOverpassEndpoint(endpoint, query, signal);
    } catch (error) {
      if (signal?.aborted) throw error;
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('All OpenStreetMap settlement endpoints failed');
}

function readCache(): SettlementCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SettlementCache;
    if (!Array.isArray(parsed.places) || Date.now() - parsed.savedAt > CACHE_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(cache: SettlementCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Storage may be unavailable or full inside some Telegram clients; the live data still works in memory.
  }
}

export function getCuratedSettlements(): City[] {
  return mergeCuratedAndLive([]);
}

export async function loadAllSettlements(options?: { force?: boolean; signal?: AbortSignal }): Promise<SettlementCatalogResult> {
  if (!options?.force) {
    const cache = readCache();
    if (cache) return { places: cache.places, sourceTimestamp: cache.sourceTimestamp, fromCache: true };
  }

  const [response, provinces] = await Promise.all([
    requestOverpass(options?.signal),
    loadProvinceGeoJson(),
  ]);
  const seen = new Set<string>();
  const livePlaces: City[] = [];
  for (const element of response.elements) {
    const coordinates = pickCoordinates(element);
    if (!coordinates) continue;
    const provinceId = findProvinceId(coordinates[1], coordinates[0], provinces);
    if (!provinceId) continue;
    const place = toCity(element, provinceId);
    if (!place) continue;
    const key = `${place.provinceId}:${normalizeName(place.modernName)}:${place.coordinates[0].toFixed(3)}:${place.coordinates[1].toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    livePlaces.push({ ...place, updatedAt: response.osm3s?.timestamp_osm_base });
  }

  const places = mergeCuratedAndLive(livePlaces);
  writeCache({ savedAt: Date.now(), places, sourceTimestamp: response.osm3s?.timestamp_osm_base });
  return { places, sourceTimestamp: response.osm3s?.timestamp_osm_base, fromCache: false };
}
