import type { City, PlaceEra, PlaceEraFilter } from '../types/domain';

export function getPlaceEra(place: City): PlaceEra {
  if (place.era) return place.era;
  if (place.category === 'site' || place.category === 'monastery' || place.category === 'fortress') return 'historical';
  return place.source === 'openstreetmap' ? 'present' : 'both';
}

export function matchesEra(place: City, filter: PlaceEraFilter): boolean {
  if (filter === 'all') return true;
  const era = getPlaceEra(place);
  return era === filter || era === 'both';
}

export function eraLabelHy(place: City): string {
  const era = getPlaceEra(place);
  if (era === 'present') return 'Ներկա';
  if (era === 'historical') return 'Պատմական';
  return 'Ներկա և պատմական';
}

export function placeSearchText(place: City): string {
  return [place.nameHy, place.nameEn, place.modernName, ...(place.alternateNames ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('hy-AM');
}
