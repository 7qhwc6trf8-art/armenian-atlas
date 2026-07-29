import type { Division, ProvinceId, TerritoryMetrics } from '../types/domain';

/**
 * Cartographic measurements calculated geodesically from the supplied GeoJSON
 * on the WGS84 ellipsoid. Historical borders are interpretive, so values are
 * intentionally rounded and should be presented as estimates.
 */
export const provinceMetricsById: Record<ProvinceId, TerritoryMetrics> = {
  'gugark': { areaKm2: 11426, perimeterKm: 565, eastWestKm: 192, northSouthKm: 123, sharePercent: 3.6, centroid: [44.20866, 41.39186] },
  'tayk': { areaKm2: 11754, perimeterKm: 488, eastWestKm: 164, northSouthKm: 117, sharePercent: 3.7, centroid: [41.90593, 40.84585] },
  'upper-armenia': { areaKm2: 26895, perimeterKm: 866, eastWestKm: 294, northSouthKm: 176, sharePercent: 8.5, centroid: [39.93993, 40.18176] },
  'ayrarat': { areaKm2: 44739, perimeterKm: 1119, eastWestKm: 350, northSouthKm: 218, sharePercent: 14.1, centroid: [43.64159, 40.27251] },
  'utik': { areaKm2: 15664, perimeterKm: 614, eastWestKm: 204, northSouthKm: 153, sharePercent: 4.9, centroid: [46.42384, 40.63482] },
  'artsakh': { areaKm2: 7200, perimeterKm: 389, eastWestKm: 123, northSouthKm: 106, sharePercent: 2.3, centroid: [46.89716, 39.76871] },
  'paytakaran': { areaKm2: 26511, perimeterKm: 776, eastWestKm: 190, northSouthKm: 213, sharePercent: 8.3, centroid: [48.33932, 39.34091] },
  'syunik': { areaKm2: 17947, perimeterKm: 667, eastWestKm: 169, northSouthKm: 197, sharePercent: 5.7, centroid: [45.88212, 39.73095] },
  'vaspurakan': { areaKm2: 47611, perimeterKm: 1471, eastWestKm: 435, northSouthKm: 194, sharePercent: 15.0, centroid: [44.79252, 38.6646] },
  'turuberan': { areaKm2: 28246, perimeterKm: 802, eastWestKm: 260, northSouthKm: 175, sharePercent: 8.9, centroid: [41.95987, 39.24329] },
  'tsopk': { areaKm2: 21327, perimeterKm: 821, eastWestKm: 238, northSouthKm: 142, sharePercent: 6.7, centroid: [39.48909, 39.19599] },
  'aghdznik': { areaKm2: 20872, perimeterKm: 820, eastWestKm: 269, northSouthKm: 136, sharePercent: 6.6, centroid: [40.78122, 38.35556] },
  'moks': { areaKm2: 3901, perimeterKm: 322, eastWestKm: 80, northSouthKm: 101, sharePercent: 1.2, centroid: [42.56311, 38.1223] },
  'korchayk': { areaKm2: 19575, perimeterKm: 763, eastWestKm: 286, northSouthKm: 120, sharePercent: 6.2, centroid: [43.02928, 37.51204] },
  'parskahayk': { areaKm2: 13904, perimeterKm: 683, eastWestKm: 134, northSouthKm: 220, sharePercent: 4.4, centroid: [44.97072, 37.71039] },
};

export const divisionMetricsById: Record<Division, TerritoryMetrics> = {
  'western': { areaKm2: 194097, perimeterKm: 2929, eastWestKm: 814, northSouthKm: 506, sharePercent: 61.1, centroid: [42.29557, 38.93251] },
  'eastern': { areaKm2: 123494, perimeterKm: 2154, eastWestKm: 690, northSouthKm: 399, sharePercent: 38.9, centroid: [45.56062, 40.11909] },
};

function integerFormatter(locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
}

function decimalFormatter(locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
}

export function formatAreaKm2(value: number, locale = 'hy-AM'): string {
  const unit = locale === 'hy-AM' ? 'կմ²' : 'km²';
  return `${integerFormatter(locale).format(value)} ${unit}`;
}

export function formatDistanceKm(value: number, locale = 'hy-AM'): string {
  const unit = locale === 'hy-AM' ? 'կմ' : 'km';
  return `${integerFormatter(locale).format(value)} ${unit}`;
}

export function formatShare(value: number, locale = 'hy-AM'): string {
  return `${decimalFormatter(locale).format(value)}%`;
}
