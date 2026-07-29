import { ArrowClockwise, Buildings, CloudCheck, CloudSlash, MapTrifold, SquaresFour } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useCallback, useMemo, useState } from 'react';
import type { SettlementStatus } from '../hooks/useSettlementCatalog';
import { useI18n } from '../i18n';
import type { City, Division, MapMode, PlaceEraFilter, Province, ProvinceId } from '../types/domain';
import { MapCanvas, type DivisionFilter } from './MapCanvas';
import { TerritorySheet } from './TerritorySheet';

interface MapScreenProps {
  mode: MapMode;
  onMode: (mode: MapMode) => void;
  province: Province;
  selectedCity: City | null;
  settlements: City[];
  settlementStatus: SettlementStatus;
  settlementError: string | null;
  sourceTimestamp?: string;
  onRefreshSettlements: () => void;
  saved: boolean;
  onProvince: (id: ProvinceId) => void;
  onCity: (city: City) => void;
  onToggleSaved: () => void;
  showMapLabels: boolean;
  showModernNames: boolean;
}

const filterButtonBase = 'relative cursor-pointer rounded-[12px] border-0 bg-transparent px-3 py-2 text-[7.5px] font-[850] text-atlas-map-text transition-colors';

export function MapScreen({
  mode,
  onMode,
  province,
  selectedCity,
  settlements,
  settlementStatus,
  settlementError,
  sourceTimestamp,
  onRefreshSettlements,
  saved,
  onProvince,
  onCity,
  onToggleSaved,
  showMapLabels,
  showModernNames,
}: MapScreenProps) {
  const [divisionFilter, setDivisionFilter] = useState<DivisionFilter>('all');
  const [eraFilter, setEraFilter] = useState<PlaceEraFilter>('all');
  const { t, locale } = useI18n();
  const handleDivision = useCallback((division: Division) => setDivisionFilter(division), []);
  const cityCount = settlements.length;
  const modes = useMemo<Array<{ id: MapMode; label: string; Icon: typeof MapTrifold }>>(() => [
    { id: 'provinces', label: t('map.provinces'), Icon: MapTrifold },
    { id: 'division', label: t('map.divisions'), Icon: SquaresFour },
    { id: 'cities', label: settlementStatus === 'loading' ? t('map.loadingPlaces') : t('map.places', { count: cityCount.toLocaleString(locale) }), Icon: Buildings },
  ], [cityCount, locale, settlementStatus, t]);

  const syncTone = settlementStatus === 'offline'
    ? 'text-atlas-danger'
    : settlementStatus === 'loading'
      ? 'text-atlas-burgundy'
      : 'text-atlas-map-text';

  return (
    <main className="relative h-full min-h-0 w-full overflow-hidden">
      <div className="absolute left-3 right-3 top-3 z-[650] rounded-[22px] border border-atlas-line-strong bg-atlas-map-glass p-1.5 shadow-[0_16px_44px_rgba(38,21,28,.18)] backdrop-blur-[28px]" role="tablist" aria-label={t('aria.mapMode')}>
        <div className="grid min-h-[48px] grid-cols-3 gap-1">
          {modes.map(({ id, label, Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                className={`relative z-[1] flex min-w-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-[16px] border-0 bg-transparent px-1 text-[7.5px] font-[860] ${active ? 'text-white' : 'text-atlas-map-text'}`}
                onClick={() => onMode(id)}
                role="tab"
                aria-selected={active}
              >
                {active && <motion.span layoutId="mode-pill" className="absolute inset-0 z-0 rounded-[16px] bg-[linear-gradient(145deg,#a90a3a,#720523)] shadow-[0_9px_22px_rgba(139,6,43,.28)]" />}
                <span className={`relative z-[2] grid size-6 shrink-0 place-items-center rounded-[9px] ${active ? 'bg-white/12' : 'bg-atlas-icon-tile text-atlas-burgundy'}`}><Icon size={13} weight={active ? 'fill' : 'duotone'} /></span>
                <span className="relative z-[2] truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {mode === 'division' && (
        <div className="absolute left-1/2 top-[76px] z-[645] flex -translate-x-1/2 gap-1 rounded-[16px] border border-atlas-line-strong bg-atlas-map-glass p-1 shadow-[0_12px_30px_rgba(42,25,31,.14)] backdrop-blur-2xl" role="group" aria-label={t('aria.divisionFilter')}>
          {(['all', 'western', 'eastern'] as const).map((value) => (
            <button key={value} type="button" className={`${filterButtonBase} ${divisionFilter === value ? 'bg-atlas-burgundy text-white shadow-[0_7px_16px_rgba(139,6,43,.2)]' : ''}`} onClick={() => setDivisionFilter(value)}>{value === 'all' ? t('map.all') : value === 'western' ? t('map.western') : t('map.eastern')}</button>
          ))}
        </div>
      )}

      {mode === 'cities' && (
        <>
          <div className="absolute left-1/2 top-[76px] z-[645] flex -translate-x-1/2 gap-1 rounded-[16px] border border-atlas-line-strong bg-atlas-map-glass p-1 shadow-[0_12px_30px_rgba(42,25,31,.14)] backdrop-blur-2xl" role="group" aria-label={t('aria.eraFilter')}>
            {(['all', 'present', 'historical'] as const).map((value) => (
              <button key={value} type="button" className={`${filterButtonBase} min-w-[58px] ${eraFilter === value ? 'bg-atlas-burgundy text-white shadow-[0_7px_16px_rgba(139,6,43,.2)]' : ''}`} onClick={() => setEraFilter(value)}>{value === 'all' ? t('map.all') : value === 'present' ? t('map.present') : t('map.historical')}</button>
            ))}
          </div>
          <button
            type="button"
            className={`absolute left-3 top-[122px] z-[644] flex cursor-pointer items-center gap-1.5 rounded-[14px] border border-atlas-line-strong bg-atlas-map-glass px-2.5 py-2 text-[7.5px] font-[850] shadow-[0_10px_26px_rgba(42,25,31,.14)] backdrop-blur-2xl ${syncTone}`}
            onClick={onRefreshSettlements}
            title={settlementError ?? sourceTimestamp ?? t('map.database')}
          >
            {settlementStatus === 'offline' ? <CloudSlash size={13} /> : <CloudCheck size={13} />}
            <span>{settlementStatus === 'loading' ? t('map.refreshing') : settlementStatus === 'offline' ? t('map.offline') : t('map.live')}</span>
            <ArrowClockwise size={11} className={settlementStatus === 'loading' ? 'animate-[settlement-spin_0.9s_linear_infinite]' : ''} />
          </button>
        </>
      )}

      <MapCanvas
        mode={mode}
        divisionFilter={divisionFilter}
        eraFilter={eraFilter}
        settlements={settlements}
        selectedProvinceId={province.id}
        selectedCity={selectedCity}
        onProvince={onProvince}
        onCity={onCity}
        onDivision={handleDivision}
        showLabels={showMapLabels}
        showModernNames={showModernNames}
      />
      <TerritorySheet
        province={province}
        selectedCity={selectedCity}
        settlements={settlements}
        saved={saved}
        onToggleSaved={onToggleSaved}
        onCity={onCity}
        showModernNames={showModernNames}
      />
    </main>
  );
}
