import L, {
  type GeoJSON as LeafletGeoJSON,
  type LatLngBounds,
  type Layer,
  type LayerGroup,
  type Map as LeafletMap,
  type Path,
  type Polygon,
} from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { provinceById } from '../data/provinces';
import {
  divisionMetricsById,
  formatAreaKm2,
  formatDistanceKm,
  provinceMetricsById,
} from '../data/territoryMetrics';
import { APP_BOUNDS, DEFAULT_CENTER, DEFAULT_ZOOM, DIVISION_COLORS, PROVINCE_COLORS } from '../lib/constants';
import {
  loadDivisionGeoJson,
  loadProvinceGeoJson,
  type DivisionFeature,
  type DivisionFeatureCollection,
  type ProvinceFeature,
  type ProvinceFeatureCollection,
} from '../lib/geo';
import { getPlaceEra, matchesEra } from '../lib/place-utils';
import type { City, Division, MapMode, PlaceEraFilter, ProvinceId } from '../types/domain';

export type DivisionFilter = 'all' | Division;


function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

interface MapCanvasProps {
  mode: MapMode;
  divisionFilter: DivisionFilter;
  eraFilter: PlaceEraFilter;
  settlements: City[];
  selectedProvinceId: ProvinceId;
  selectedCity: City | null;
  onProvince: (id: ProvinceId) => void;
  onCity: (city: City) => void;
  onDivision: (division: Division) => void;
  showLabels: boolean;
  showModernNames: boolean;
}

export function MapCanvas({
  mode,
  divisionFilter,
  eraFilter,
  settlements,
  selectedProvinceId,
  selectedCity,
  onProvince,
  onCity,
  onDivision,
  showLabels,
  showModernNames,
}: MapCanvasProps) {
  const { t, locale, provinceName, provinceSecondaryName, cityName, divisionName, eraLabel } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const provinceLayerRef = useRef<LeafletGeoJSON | null>(null);
  const divisionLayerRef = useRef<LeafletGeoJSON | null>(null);
  const labelLayerRef = useRef<LayerGroup | null>(null);
  const cityLayerRef = useRef<LayerGroup | null>(null);
  const featureBoundsRef = useRef(new Map<ProvinceId, LatLngBounds>());
  const divisionBoundsRef = useRef(new Map<Division, LatLngBounds>());
  const [provinceData, setProvinceData] = useState<ProvinceFeatureCollection | null>(null);
  const [divisionData, setDivisionData] = useState<DivisionFeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([loadProvinceGeoJson(), loadDivisionGeoJson()])
      .then(([provinces, divisions]) => {
        if (!active) return;
        setProvinceData(provinces);
        setDivisionData(divisions);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : t('map.loadError'));
      });
    return () => {
      active = false;
    };
  }, [t]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: true,
      preferCanvas: true,
      minZoom: 4,
      maxZoom: 13,
      maxBoundsViscosity: 0.72,
    }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    map.attributionControl.setPrefix(false);
    map.fitBounds(APP_BOUNDS, { padding: [18, 18] });
    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !provinceData || !divisionData) return;

    provinceLayerRef.current?.removeFrom(map);
    divisionLayerRef.current?.removeFrom(map);
    labelLayerRef.current?.removeFrom(map);
    featureBoundsRef.current.clear();
    divisionBoundsRef.current.clear();

    const labelLayer = L.layerGroup().addTo(map);
    let divisionLayer: LeafletGeoJSON | null = null;

    if (mode === 'division') {
      divisionLayer = L.geoJSON(divisionData, {
        style: (feature: DivisionFeature | undefined) => {
          const id = feature?.properties?.id ?? 'western';
          const colors = DIVISION_COLORS[id];
          const active = divisionFilter === 'all' || divisionFilter === id;
          const selected = divisionFilter === id;
          return {
            color: colors.line,
            weight: selected ? 4.4 : 3.2,
            opacity: active ? 1 : 0.42,
            fillColor: selected ? colors.selected : colors.fill,
            fillOpacity: active ? (selected ? 0.84 : 0.72) : 0.1,
            lineCap: 'round',
            lineJoin: 'round',
          };
        },
        onEachFeature: (feature: DivisionFeature, layer: Layer) => {
          const { id, provinceCount, labelCenter } = feature.properties;
          const displayName = divisionName(id);
          const metrics = divisionMetricsById[id];
          const pathLayer = layer as Path;
          const polygonLayer = layer as Polygon;
          divisionBoundsRef.current.set(id, polygonLayer.getBounds());

          pathLayer.bindTooltip(
            `<strong>${escapeHtml(displayName)}</strong><small>${escapeHtml(t('map.provinceCount', { count: provinceCount }))}</small><em>${formatAreaKm2(metrics.areaKm2, locale)} · ${formatDistanceKm(metrics.perimeterKm, locale)}</em>`,
            { direction: 'top', offset: [0, -8], className: 'division-tooltip', sticky: true },
          );
          pathLayer.on({
            mouseover: () => pathLayer.setStyle({ fillOpacity: 0.88, weight: 4.5 }),
            mouseout: () => divisionLayer?.resetStyle(pathLayer),
            click: () => {
              onDivision(id);
              map.fitBounds(polygonLayer.getBounds(), {
                paddingTopLeft: [28, 145],
                paddingBottomRight: [28, 275],
                maxZoom: 7,
                animate: true,
              });
            },
          });

          if (!showLabels) return;
          const [lng, lat] = labelCenter;
          const label = L.marker([lat, lng], {
            interactive: true,
            keyboard: true,
            icon: L.divIcon({
              className: 'division-map-label-shell',
              html: `<span class="division-map-label ${id}${divisionFilter === id ? ' is-selected' : ''}${divisionFilter !== 'all' && divisionFilter !== id ? ' is-dimmed' : ''}"><strong>${escapeHtml(displayName)}</strong><small>${formatAreaKm2(metrics.areaKm2, locale)}</small><em>${provinceCount}</em></span>`,
              iconSize: [164, 61],
              iconAnchor: [82, 30],
            }),
          });
          label.on('click', () => {
            onDivision(id);
            map.fitBounds(polygonLayer.getBounds(), {
              paddingTopLeft: [28, 145],
              paddingBottomRight: [28, 275],
              maxZoom: 7,
              animate: true,
            });
          });
          label.addTo(labelLayer);
        },
      }).addTo(map);
      divisionLayerRef.current = divisionLayer;
    }

    const provinceLayer = L.geoJSON(provinceData, {
      interactive: mode !== 'division',
      style: (feature: ProvinceFeature | undefined) => {
        const id = feature?.properties?.id as ProvinceId;
        const province = provinceById[id];
        const selected = id === selectedProvinceId;
        const colors = PROVINCE_COLORS[province?.division ?? 'western'];

        if (mode === 'division') {
          return {
            color: '#f8e3b6',
            weight: 1.15,
            opacity: 0.74,
            fillOpacity: 0,
            interactive: false,
            lineCap: 'round',
            lineJoin: 'round',
          };
        }

        return {
          color: selected ? '#ffe8a9' : '#efc77a',
          weight: selected ? 4.2 : 2.7,
          opacity: 1,
          fillColor: selected ? colors.selected : colors.fill,
          fillOpacity: mode === 'cities' ? 0.42 : 0.68,
          lineCap: 'round',
          lineJoin: 'round',
        };
      },
      onEachFeature: (feature: ProvinceFeature, layer: Layer) => {
        const id = feature.properties.id;
        const province = provinceById[id];
        const metrics = provinceMetricsById[id];
        const pathLayer = layer as Path;
        const boundsLayer = layer as Polygon;
        featureBoundsRef.current.set(id, boundsLayer.getBounds());

        if (mode === 'division') return;

        pathLayer.bindTooltip(
          `<strong>${escapeHtml(provinceName(province))}</strong><small>${escapeHtml(provinceSecondaryName(province))}</small><em>${formatAreaKm2(metrics.areaKm2, locale)} · ${formatDistanceKm(metrics.perimeterKm, locale)}</em>`,
          { direction: 'top', offset: [0, -8], className: 'province-tooltip', sticky: true },
        );

        pathLayer.on({
          mouseover: () => pathLayer.setStyle({ fillOpacity: 0.84, weight: id === selectedProvinceId ? 4.5 : 3.4 }),
          mouseout: () => provinceLayer.resetStyle(pathLayer),
          click: () => {
            onProvince(id);
            map.fitBounds(boundsLayer.getBounds(), {
              paddingTopLeft: [36, 128],
              paddingBottomRight: [36, 285],
              maxZoom: 8,
              animate: true,
            });
          },
        });

        if (!showLabels) return;
        const label = L.marker(province.center, {
          interactive: true,
          keyboard: true,
          icon: L.divIcon({
            className: 'province-label-shell',
            html: `<span class="province-map-label${id === selectedProvinceId ? ' is-selected' : ''}">${escapeHtml(provinceName(province))}</span>`,
            iconSize: [112, 28],
            iconAnchor: [56, 14],
          }),
        });
        label.on('click', () => {
          onProvince(id);
          map.flyTo(province.center, Math.max(map.getZoom(), 7), { duration: 0.65 });
        });
        label.addTo(labelLayer);
      },
    }).addTo(map);

    if (mode === 'division') provinceLayer.bringToFront();

    provinceLayerRef.current = provinceLayer;
    labelLayerRef.current = labelLayer;

    if (mode === 'division') {
      const targetBounds = divisionFilter === 'all'
        ? divisionLayer?.getBounds()
        : divisionBoundsRef.current.get(divisionFilter);
      if (targetBounds?.isValid()) {
        map.fitBounds(targetBounds, {
          paddingTopLeft: [24, 142],
          paddingBottomRight: [24, 270],
          maxZoom: 7,
          animate: true,
        });
      }
    }

    return () => {
      provinceLayer.removeFrom(map);
      divisionLayer?.removeFrom(map);
      labelLayer.removeFrom(map);
    };
  }, [divisionData, divisionFilter, divisionName, locale, mode, onDivision, onProvince, provinceData, provinceName, provinceSecondaryName, selectedProvinceId, showLabels, t]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    cityLayerRef.current?.removeFrom(map);
    const cityLayer = L.layerGroup().addTo(map);
    const visibleCities = mode === 'division'
      ? []
      : (mode === 'cities'
        ? settlements.filter((city) => matchesEra(city, eraFilter))
        : settlements.filter((city) => city.provinceId === selectedProvinceId));

    visibleCities.forEach((city) => {
      const isSelected = selectedCity?.id === city.id;
      const era = getPlaceEra(city);
      const populationRadius = city.population
        ? Math.min(3.2, Math.max(0, Math.log10(city.population + 1) - 3))
        : 0;
      const baseRadius = city.category === 'capital' ? 6.8 : city.category === 'city' ? 5.4 : city.category === 'town' ? 4.3 : 4.7;
      const marker = L.circleMarker(city.coordinates, {
        radius: isSelected ? 8.5 : baseRadius + populationRadius,
        color: isSelected ? '#fff4d4' : era === 'historical' ? '#ffe3a0' : '#fff7e5',
        weight: isSelected ? 3 : era === 'historical' ? 2.2 : 1.7,
        fillColor: isSelected ? '#9d001f' : era === 'historical' ? '#78504a' : era === 'both' ? '#a51732' : '#c0463c',
        fillOpacity: city.source === 'openstreetmap' ? 0.88 : 0.98,
        dashArray: era === 'historical' ? '3 2' : undefined,
      });
      const alternate = city.alternateNames?.length
        ? `<em>${city.alternateNames.slice(0, 4).map(escapeHtml).join(' · ')}</em>`
        : '';
      const population = city.population
        ? `<b>${escapeHtml(t('map.residents', { count: city.population.toLocaleString(locale) }))}</b>`
        : '';
      marker.bindTooltip(
        `<strong>${escapeHtml(cityName(city))}</strong><small>${showModernNames ? `${escapeHtml(city.modernName)} · ` : ''}${escapeHtml(eraLabel(city))}</small>${alternate}${population}`,
        { direction: 'top', offset: [0, -7], className: 'city-tooltip' },
      );
      marker.on('click', () => {
        onCity(city);
        map.flyTo(city.coordinates, Math.max(map.getZoom(), 8), { duration: 0.55 });
      });
      marker.addTo(cityLayer);
    });

    cityLayerRef.current = cityLayer;
    return () => {
      cityLayer.removeFrom(map);
    };
  }, [cityName, eraFilter, eraLabel, locale, mode, onCity, selectedCity?.id, selectedProvinceId, settlements, showModernNames, t]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mode === 'division') return;
    if (selectedCity) {
      map.flyTo(selectedCity.coordinates, Math.max(map.getZoom(), 8), { duration: 0.55 });
      return;
    }
    const province = provinceById[selectedProvinceId];
    map.flyTo(province.center, Math.max(6.7, Math.min(7.4, map.getZoom())), { duration: 0.6 });
  }, [mode, selectedCity, selectedProvinceId]);

  const zoomBy = (delta: number) => mapRef.current?.setZoom((mapRef.current?.getZoom() ?? DEFAULT_ZOOM) + delta);
  const reset = () => {
    const map = mapRef.current;
    if (!map) return;
    if (mode === 'division' && divisionFilter !== 'all') {
      const bounds = divisionBoundsRef.current.get(divisionFilter);
      if (bounds?.isValid()) {
        map.fitBounds(bounds, { paddingTopLeft: [24, 142], paddingBottomRight: [24, 270], maxZoom: 7, animate: true });
        return;
      }
    }
    map.fitBounds(APP_BOUNDS, { padding: [18, 18], animate: true });
  };

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0 z-[1] bg-[#cbdad6] after:pointer-events-none after:absolute after:inset-0 after:z-[400] after:bg-[linear-gradient(to_bottom,rgba(20,10,15,.07),transparent_18%,transparent_64%,rgba(20,10,15,.16))] after:content-['']" />
      {mode === 'division' && (
        <div className="absolute left-3 top-[122px] z-[620] grid gap-1.5 rounded-[15px] border border-atlas-line-strong bg-atlas-map-glass px-3 py-2.5 text-[7.5px] font-extrabold text-atlas-map-text shadow-[0_12px_30px_rgba(42,25,31,.15)] backdrop-blur-2xl" aria-label={t('map.legend')}>
          <span className="flex items-center gap-1.5 whitespace-nowrap"><i className="size-2.5 rounded border-2 border-[#efc77a] bg-[#8d4e45]" />{t('map.western')} · 9</span>
          <span className="flex items-center gap-1.5 whitespace-nowrap"><i className="size-2.5 rounded border-2 border-[#efc77a] bg-[#b06f58]" />{t('map.eastern')} · 6</span>
        </div>
      )}
      {error && <div className="absolute left-1/2 top-20 z-[800] w-[calc(100%-40px)] -translate-x-1/2 rounded-[13px] bg-[#fff5f2] px-[15px] py-3 text-[12px] text-[#8b1426] shadow-atlas">{error}</div>}
      <button className="absolute right-3 top-[74px] z-[620] grid size-[42px] cursor-pointer place-items-center rounded-[15px] border border-atlas-line-strong bg-atlas-map-glass p-0 text-[23px] leading-none text-atlas-burgundy shadow-[0_12px_30px_rgba(42,25,31,.15)] backdrop-blur-2xl active:scale-95" type="button" onClick={reset} aria-label={t('aria.resetMap')}>↶</button>
      <div className="absolute bottom-[224px] right-3 z-[620] grid overflow-hidden rounded-[16px] border border-atlas-line-strong bg-atlas-map-glass shadow-[0_12px_30px_rgba(42,25,31,.15)] backdrop-blur-2xl [&>button]:grid [&>button]:size-[42px] [&>button]:cursor-pointer [&>button]:place-items-center [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[22px] [&>button]:font-medium [&>button]:text-atlas-burgundy-dark [&>button]:active:bg-atlas-control-active [&>button+button]:border-t [&>button+button]:border-atlas-line" aria-label={t('aria.zoomControls')}>
        <button type="button" onClick={() => zoomBy(1)} aria-label={t('aria.zoomIn')}>+</button>
        <button type="button" onClick={() => zoomBy(-1)} aria-label={t('aria.zoomOut')}>−</button>
      </div>
    </div>
  );
}
