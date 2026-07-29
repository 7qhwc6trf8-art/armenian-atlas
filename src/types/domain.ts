export type ProvinceId =
  | 'gugark'
  | 'tayk'
  | 'upper-armenia'
  | 'ayrarat'
  | 'utik'
  | 'artsakh'
  | 'paytakaran'
  | 'syunik'
  | 'vaspurakan'
  | 'turuberan'
  | 'tsopk'
  | 'aghdznik'
  | 'moks'
  | 'korchayk'
  | 'parskahayk';

export type Division = 'western' | 'eastern';
export type PlaceEra = 'present' | 'historical' | 'both';
export type PlaceEraFilter = 'all' | 'present' | 'historical';
export type PlaceSource = 'curated' | 'openstreetmap';

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export interface TerritoryMetrics {
  areaKm2: number;
  perimeterKm: number;
  eastWestKm: number;
  northSouthKm: number;
  sharePercent: number;
  /** GeoJSON coordinate order: longitude, latitude. */
  centroid: [number, number];
}

export interface Province {
  id: ProvinceId;
  order: number;
  nameHy: string;
  nameEn: string;
  transliteration: string;
  division: Division;
  epithet: string;
  shortDescription: string;
  description: string;
  administrativeCenters: string[];
  cantons: number | null;
  landscape: string;
  presentDay: string[];
  highlights: string[];
  timeline: TimelineEntry[];
  center: [number, number];
}

export interface City {
  id: string;
  provinceId: ProvinceId;
  nameHy: string;
  nameEn: string;
  modernName: string;
  coordinates: [number, number];
  category: 'capital' | 'city' | 'town' | 'monastery' | 'fortress' | 'site';
  note: string;
  era?: PlaceEra;
  alternateNames?: string[];
  population?: number;
  source?: PlaceSource;
  sourceId?: string;
  updatedAt?: string;
}

export type NavTab = 'map' | 'browse' | 'saved' | 'profile';
export type MapMode = 'provinces' | 'division' | 'cities';
