import { readFile } from 'node:fs/promises';

const provincesGeo = JSON.parse(await readFile(new URL('../public/data/historical-provinces.geojson', import.meta.url), 'utf8'));
const divisionsGeo = JSON.parse(await readFile(new URL('../public/data/map-coverage.geojson', import.meta.url), 'utf8'));
const citySource = await readFile(new URL('../src/data/cities.ts', import.meta.url), 'utf8');
const settlementSource = await readFile(new URL('../src/lib/settlements.ts', import.meta.url), 'utf8');

const curatedCityCount = (citySource.match(/provinceId:/g) ?? []).length;
const curatedIds = [...citySource.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]);
const provinceIds = provincesGeo.features.map((feature) => feature.properties.id);
const divisionIds = divisionsGeo.features.map((feature) => feature.properties.id);
const dividedProvinceIds = divisionsGeo.features.flatMap((feature) => feature.properties.provinceIds ?? []);

function assertMetrics(feature, label) {
  const metrics = feature.properties.metrics;
  if (!metrics) throw new Error(`${label} is missing territory measurements`);
  for (const key of ['areaKm2', 'perimeterKm', 'eastWestKm', 'northSouthKm', 'sharePercent']) {
    if (!Number.isFinite(metrics[key]) || metrics[key] <= 0) throw new Error(`${label} has invalid ${key}`);
  }
  if (!Array.isArray(metrics.centroid) || metrics.centroid.length !== 2 || metrics.centroid.some((value) => !Number.isFinite(value))) {
    throw new Error(`${label} has an invalid measurement centroid`);
  }
}

if (provincesGeo.features.length !== 15) throw new Error(`Expected 15 provinces, found ${provincesGeo.features.length}`);
if (new Set(provinceIds).size !== 15) throw new Error('Province IDs are not unique');
if (curatedCityCount < 63) throw new Error(`Expected at least 63 curated places, found ${curatedCityCount}`);
if (new Set(curatedIds).size !== curatedIds.length) throw new Error('Curated place IDs are not unique');
if (!settlementSource.includes('nwr["place"~"^(city|town)$"]')) throw new Error('Live all-city OpenStreetMap query is missing');
if (!['old_name', 'abandoned:place', 'disused:place', 'was:place', 'archaeological_site'].every((token) => settlementSource.includes(token))) throw new Error('Historical/old-name queries are incomplete');
if (!settlementSource.includes('fetchOverpassEndpoint') || !settlementSource.includes('28_000')) throw new Error('Overpass failover timeout is missing');
if (!settlementSource.includes('pointInGeometry')) throw new Error('GeoJSON boundary filtering is missing');

if (divisionsGeo.features.length !== 2) throw new Error(`Expected 2 Armenia divisions, found ${divisionsGeo.features.length}`);
if (!divisionIds.includes('western') || !divisionIds.includes('eastern')) throw new Error('Western/Eastern division IDs are missing');
if (new Set(dividedProvinceIds).size !== 15) throw new Error('Division province membership must cover 15 unique provinces');
if (dividedProvinceIds.some((id) => !provinceIds.includes(id))) throw new Error('A division references an unknown province');

for (const feature of provincesGeo.features) assertMetrics(feature, `Province ${feature.properties.id}`);

for (const feature of divisionsGeo.features) {
  const { properties, geometry } = feature;
  if (!['Polygon', 'MultiPolygon'].includes(geometry?.type)) throw new Error(`${properties.id} has an unsupported geometry type`);
  if (properties.provinceCount !== properties.provinceIds.length) throw new Error(`${properties.id} province count does not match its IDs`);
  if (!Array.isArray(properties.labelCenter) || properties.labelCenter.length !== 2) throw new Error(`${properties.id} label center is invalid`);
  assertMetrics(feature, `Division ${properties.id}`);
}

console.log(`Data check passed: ${provincesGeo.features.length} measured provinces, ${divisionsGeo.features.length} measured divisions, ${curatedCityCount} curated places + live current/historical OpenStreetMap catalog.`);
