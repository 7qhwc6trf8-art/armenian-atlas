import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { Division, ProvinceId, TerritoryMetrics } from '../types/domain';

export interface ProvinceProperties {
  id: ProvinceId;
  metrics?: TerritoryMetrics;
}

export interface DivisionProperties {
  id: Division;
  nameHy: string;
  nameEn: string;
  provinceCount: number;
  provinceIds: ProvinceId[];
  labelCenter: [number, number];
  source?: string;
  metrics?: TerritoryMetrics;
}

export type ProvinceFeature = Feature<Geometry, ProvinceProperties>;
export type ProvinceFeatureCollection = FeatureCollection<Geometry, ProvinceProperties>;
export type DivisionFeature = Feature<Geometry, DivisionProperties>;
export type DivisionFeatureCollection = FeatureCollection<Geometry, DivisionProperties>;

async function loadGeoJson<T>(path: string, label: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${label} (${response.status})`);
  }
  return (await response.json()) as T;
}

export function loadProvinceGeoJson(): Promise<ProvinceFeatureCollection> {
  return loadGeoJson<ProvinceFeatureCollection>('/data/historical-provinces.geojson', 'province boundaries');
}

export function loadDivisionGeoJson(): Promise<DivisionFeatureCollection> {
  return loadGeoJson<DivisionFeatureCollection>('/data/map-coverage.geojson', 'Western/Eastern Armenia boundaries');
}
