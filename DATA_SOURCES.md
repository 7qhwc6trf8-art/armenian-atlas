# Data sources and settlement-catalog behavior

## Boundary data

The historical province and Western/Eastern division geometries are the user-supplied GeoJSON assets stored under `public/data/`.

## Current and historical places

The runtime catalog is assembled from:

1. The curated Armenian gazetteer in `src/data/cities.ts`.
2. OpenStreetMap records requested through Overpass QL in `src/lib/settlements.ts`.

The query requests:

- `place=city`
- `place=town`
- `abandoned:place=city|town`
- `disused:place=city|town`
- `was:place=city|town`
- `historic=city|town|settlement`
- `place=locality` records carrying `old_name` or `historic`
- archaeological sites tagged as a settlement, city, or town

All returned coordinates are tested against the province Polygon/MultiPolygon features. A record is discarded unless it lies inside one of the 15 province geometries.

## Names

The app prefers `name:hy`. It also reads `old_name:hy`, `old_name`, `alt_name:hy`, `alt_name`, local names, official names, English names, and international names. When no Armenian form exists, the interface generates a display transliteration; this is a convenience label and should be editorially reviewed.

## Caching and availability

The merged result is cached in browser `localStorage` for 30 days. A manual refresh bypasses that cache. If all Overpass endpoints fail, the app uses its curated 63-place fallback.

## Attribution and scholarly caution

OpenStreetMap-derived data must retain OpenStreetMap attribution in the deployed product. OpenStreetMap is a living community database, so coverage and tagging vary by region. Historical classifications and place names can be incomplete, ambiguous, or disputed. For a scholarly release, export the live results into a reviewed static gazetteer and attach citations for each historical assertion.

## Cartographic territory measurements

Version 1.3.0 adds measurements derived directly from the supplied province and Western/Eastern division geometries. Area and perimeter were calculated geodesically on the WGS84 ellipsoid. East–west and north–south spans are approximate distances across each geometry's geographic bounding box.

These values are intended for interface context and comparative exploration. Historical boundaries are interpretive and may differ across atlases and scholarly traditions; therefore, the displayed figures must not be presented as legal, cadastral, or universally authoritative historical measurements.
