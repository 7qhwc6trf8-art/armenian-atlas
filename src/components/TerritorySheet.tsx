import {
  BookmarkSimple,
  Buildings,
  CalendarDots,
  CaretDown,
  CaretUp,
  ClockCounterClockwise,
  GlobeHemisphereEast,
  MagnifyingGlass,
  MapPin,
  MapTrifold,
  Mountains,
  Ruler,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { formatAreaKm2, formatDistanceKm, formatShare, provinceMetricsById } from '../data/territoryMetrics';
import { useI18n } from '../i18n';
import { getPlaceEra, placeSearchText } from '../lib/place-utils';
import type { City, Province } from '../types/domain';

interface TerritorySheetProps {
  province: Province;
  selectedCity: City | null;
  settlements: City[];
  saved: boolean;
  onToggleSaved: () => void;
  onCity: (city: City) => void;
  showModernNames: boolean;
}

const sectionTitleClass = 'flex items-center gap-2 text-atlas-burgundy';

export function TerritorySheet({ province, selectedCity, settlements, saved, onToggleSaved, onCity, showModernNames }: TerritorySheetProps) {
  const [expanded, setExpanded] = useState(false);
  const [placeQuery, setPlaceQuery] = useState('');
  const { t, locale, provinceName, cityName, divisionName, eraLabel } = useI18n();
  const provinceCities = useMemo(() => settlements.filter((place) => place.provinceId === province.id), [province.id, settlements]);
  const filteredCities = useMemo(() => {
    const normalized = placeQuery.trim().toLocaleLowerCase(locale);
    if (!normalized) return provinceCities;
    return provinceCities.filter((place) => placeSearchText(place).includes(normalized));
  }, [locale, placeQuery, provinceCities]);
  const presentCount = provinceCities.filter((place) => ['present', 'both'].includes(getPlaceEra(place))).length;
  const historicalCount = provinceCities.filter((place) => ['historical', 'both'].includes(getPlaceEra(place))).length;
  const metrics = provinceMetricsById[province.id];
  const displayName = provinceName(province);

  useEffect(() => {
    setExpanded(false);
    setPlaceQuery('');
  }, [province.id]);

  useEffect(() => {
    if (selectedCity) setExpanded(true);
  }, [selectedCity]);

  return (
    <motion.section
      className="absolute bottom-2.5 left-2.5 right-2.5 z-[700] overflow-hidden rounded-[31px] border border-atlas-line-strong bg-atlas-sheet shadow-[0_-9px_44px_rgba(35,20,27,.19),0_24px_64px_rgba(35,20,27,.18)] backdrop-blur-[30px] dark:shadow-[0_-10px_48px_rgba(0,0,0,.46),0_26px_70px_rgba(0,0,0,.45)]"
      initial={false}
      animate={{ height: expanded ? '80%' : 210 }}
      transition={{ type: 'spring', stiffness: 330, damping: 35 }}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 z-[2] h-px bg-[linear-gradient(90deg,transparent,var(--atlas-gold-soft),transparent)] opacity-65" />
      <button className="absolute left-1/2 top-0 z-[4] grid h-6 w-24 -translate-x-1/2 cursor-pointer place-items-center border-0 bg-transparent p-0" type="button" onClick={() => setExpanded((value) => !value)} aria-label={t('aria.toggleDetails')}>
        <span className="h-1 w-9 rounded-full bg-atlas-line-strong" />
      </button>

      <div className="scrollbar-none h-full overflow-y-auto overscroll-contain px-[16px] pb-6 pt-[22px]">
        <div className="flex items-start gap-3">
          <span className="grid size-[50px] shrink-0 place-items-center rounded-[17px] border border-atlas-line-strong bg-atlas-highlight font-serif text-[18px] font-bold text-atlas-gold">
            {String(province.order).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <span className="rounded-full bg-atlas-chip px-2 py-1 text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-coral">{province.transliteration}</span>
              <span className="truncate text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-muted-soft">{divisionName(province.division)}</span>
            </div>
            <h1 className="mb-1.5 mt-2 truncate text-[29px] font-[900] leading-none tracking-[-0.06em] text-atlas-ink">{displayName}</h1>
            <p className="m-0 line-clamp-2 text-[8.5px] leading-[1.55] text-atlas-muted">{province.shortDescription}</p>
          </div>
          <button className={`grid size-[44px] shrink-0 cursor-pointer place-items-center rounded-[16px] border p-0 shadow-atlas-card transition-transform active:scale-95 ${saved ? 'border-atlas-burgundy bg-atlas-burgundy text-white' : 'border-atlas-line-strong bg-atlas-control text-atlas-burgundy'}`} type="button" onClick={onToggleSaved} aria-label={t('aria.saveProvince')}>
            <BookmarkSimple size={21} weight={saved ? 'fill' : 'regular'} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_1fr_88px] gap-2">
          <span className="rounded-[15px] border border-atlas-line bg-atlas-metric px-2.5 py-2">
            <small className="block text-[6px] font-black uppercase tracking-[0.1em] text-atlas-coral">{t('territory.area')}</small>
            <strong className="mt-1.5 block truncate text-[9px] font-[850] text-atlas-ink-soft">{formatAreaKm2(metrics.areaKm2, locale)}</strong>
          </span>
          <span className="rounded-[15px] border border-atlas-line bg-atlas-metric px-2.5 py-2">
            <small className="block text-[6px] font-black uppercase tracking-[0.1em] text-atlas-coral">{t('territory.perimeter')}</small>
            <strong className="mt-1.5 block truncate text-[9px] font-[850] text-atlas-ink-soft">{formatDistanceKm(metrics.perimeterKm, locale)}</strong>
          </span>
          <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-[15px] border-0 bg-atlas-burgundy px-2 py-2 text-[7.5px] font-black text-white shadow-[0_8px_20px_rgba(151,11,52,.2)]" type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? <CaretDown size={14} weight="bold" /> : <CaretUp size={14} weight="bold" />}
            <span>{provinceCities.length}</span>
          </button>
        </div>

        {selectedCity && selectedCity.provinceId === province.id && (
          <AnimatePresence mode="wait">
            <motion.div key={selectedCity.id} className="mt-3 grid grid-cols-[38px_minmax(0,1fr)] gap-2.5 rounded-[18px] border border-atlas-line-strong bg-atlas-highlight p-2.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <span className="grid size-[38px] place-items-center rounded-[14px] bg-atlas-burgundy text-white"><MapPin size={17} weight="fill" /></span>
              <span className="min-w-0">
                <strong className="block truncate text-[10px] font-[860] text-atlas-ink-soft">{cityName(selectedCity)}</strong>
                <small className="mt-1 block truncate text-[7px] text-atlas-muted">{showModernNames ? `${selectedCity.modernName} · ` : ''}{eraLabel(selectedCity)}</small>
                {selectedCity.alternateNames?.length ? <em className="mt-1 block truncate text-[7px] not-italic text-atlas-coral">{t('territory.previousNames')} {selectedCity.alternateNames.slice(0, 4).join(' · ')}</em> : null}
              </span>
            </motion.div>
          </AnimatePresence>
        )}

        {expanded && (
          <motion.div className="mt-4 border-t border-atlas-line pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <section>
              <div className={sectionTitleClass}>
                <Buildings size={17} />
                <h2 className="m-0 text-[9.5px] font-black uppercase tracking-[0.11em]">{t('territory.allPlaces')}</h2>
                <span className="ml-auto rounded-full border border-atlas-line bg-atlas-control px-2 py-1 text-[7.5px] font-black text-atlas-coral">{provinceCities.length}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <span className="flex min-h-[40px] items-center gap-1.5 rounded-[14px] border border-atlas-line bg-atlas-metric px-2.5 py-2 text-[7.5px] font-bold text-atlas-muted"><Buildings size={14} />{t('territory.presentCount')}<strong className="ml-auto text-[10px] text-atlas-burgundy">{presentCount}</strong></span>
                <span className="flex min-h-[40px] items-center gap-1.5 rounded-[14px] border border-atlas-line bg-atlas-metric px-2.5 py-2 text-[7.5px] font-bold text-atlas-muted"><ClockCounterClockwise size={14} />{t('territory.historicalCount')}<strong className="ml-auto text-[10px] text-atlas-burgundy">{historicalCount}</strong></span>
              </div>
              <label className="atlas-glass mt-2.5 flex min-h-[46px] items-center gap-2 rounded-[16px] px-3 text-atlas-muted-soft">
                <MagnifyingGlass size={17} />
                <input className="min-w-0 flex-1 border-0 bg-transparent text-[9px] text-atlas-ink outline-none placeholder:text-atlas-muted-soft" value={placeQuery} onChange={(event: { target: { value: string } }) => setPlaceQuery(event.target.value)} placeholder={t('territory.searchPlaceholder')} />
              </label>
              <div className="mt-2.5 grid gap-1.5">
                {filteredCities.map((city) => {
                  const active = selectedCity?.id === city.id;
                  return (
                    <button key={city.id} type="button" onClick={() => onCity(city)} className={`grid min-h-[58px] cursor-pointer grid-cols-[38px_minmax(0,1fr)_28px] items-center gap-2.5 rounded-[18px] border px-2.5 py-2 text-left active:scale-[0.99] ${active ? 'border-atlas-burgundy/30 bg-atlas-chip' : 'border-atlas-line bg-atlas-card'}`}>
                      <span className={`grid size-[38px] place-items-center rounded-[14px] ${active ? 'bg-atlas-burgundy text-white' : 'bg-atlas-icon-tile text-atlas-burgundy'}`}><MapPin size={16} weight={active ? 'fill' : 'regular'} /></span>
                      <span className="min-w-0"><strong className="block truncate text-[10px] font-[860] text-atlas-ink-soft">{cityName(city)}</strong><small className="mt-1 block truncate text-[7px] text-atlas-muted-soft">{showModernNames ? `${city.modernName} · ` : ''}{eraLabel(city)}{city.population ? ` · ${city.population.toLocaleString(locale)}` : ''}</small></span>
                      <span className="grid size-7 place-items-center rounded-full border border-atlas-line bg-atlas-control text-[15px] text-atlas-gold">›</span>
                    </button>
                  );
                })}
                {filteredCities.length === 0 && <div className="rounded-[18px] border border-dashed border-atlas-line-strong p-5 text-center text-[9px] text-atlas-muted">{t('territory.noPlace')}</div>}
              </div>
            </section>

            <section className="mt-6 border-t border-atlas-line pt-5">
              <div className={sectionTitleClass}><GlobeHemisphereEast size={17} /><h2 className="m-0 text-[9.5px] font-black uppercase tracking-[0.11em]">{t('territory.dossier')}</h2></div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  [t('territory.area'), formatAreaKm2(metrics.areaKm2, locale), <MapTrifold size={17} weight="duotone" />],
                  [t('territory.perimeter'), formatDistanceKm(metrics.perimeterKm, locale), <Ruler size={17} />],
                  [t('territory.eastWest'), formatDistanceKm(metrics.eastWestKm, locale), '↔'],
                  [t('territory.northSouth'), formatDistanceKm(metrics.northSouthKm, locale), '↕'],
                ].map(([label, value, icon]) => (
                  <article key={String(label)} className="grid min-h-[74px] grid-cols-[38px_minmax(0,1fr)] items-center gap-2.5 rounded-[18px] border border-atlas-line bg-atlas-card p-2.5">
                    <span className="grid size-[38px] place-items-center rounded-[14px] border border-atlas-line bg-atlas-icon-tile text-atlas-burgundy">{icon}</span>
                    <span className="min-w-0"><small className="block truncate text-[6px] font-black uppercase tracking-[0.09em] text-atlas-coral">{label}</small><strong className="mt-1.5 block truncate text-[9.5px] font-[850] text-atlas-ink-soft">{value}</strong></span>
                  </article>
                ))}
              </div>
              <div className="mt-2.5 flex items-center justify-between rounded-[17px] border border-atlas-line bg-atlas-highlight px-3 py-3 text-[8px] text-atlas-muted"><span>{t('territory.share')}</span><strong className="font-serif text-[14px] text-atlas-burgundy">{formatShare(metrics.sharePercent, locale)}</strong></div>
              <p className="mb-3 mt-4 text-[9px] leading-[1.68] text-atlas-muted">{province.description}</p>
              <div className="grid gap-2">
                {[
                  [t('territory.centers'), province.administrativeCenters.join(' · ')],
                  [t('territory.cantons'), province.cantons ?? '—'],
                  [t('territory.geography'), province.landscape],
                  [t('territory.presentAreas'), province.presentDay.join(' · ')],
                ].map(([label, value]) => (
                  <article key={label} className="rounded-[18px] border border-atlas-line bg-atlas-card px-3.5 py-3"><span className="block text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-coral">{label}</span><strong className="mt-1.5 block text-[9px] font-bold leading-[1.58] text-atlas-ink-soft">{value}</strong></article>
                ))}
              </div>
              <p className="mb-0 mt-3 text-[7px] leading-[1.55] text-atlas-muted-soft">{t('territory.measurementNote')}</p>
            </section>

            <section className="mt-6 border-t border-atlas-line pt-5">
              <div className={sectionTitleClass}><Mountains size={17} /><h2 className="m-0 text-[9.5px] font-black uppercase tracking-[0.11em]">{t('territory.heritage')}</h2></div>
              <div className="mt-3 flex flex-wrap gap-1.5">{province.highlights.map((highlight) => <span className="rounded-full border border-atlas-line bg-atlas-chip px-2.5 py-2 text-[7px] font-bold text-atlas-muted" key={highlight}>{highlight}</span>)}</div>
            </section>

            <section className="mt-6 border-t border-atlas-line pt-5">
              <div className={sectionTitleClass}><CalendarDots size={17} /><h2 className="m-0 text-[9.5px] font-black uppercase tracking-[0.11em]">{t('territory.timeline')}</h2></div>
              <div className="mt-3 grid gap-2">
                {province.timeline.map((entry, index) => (
                  <article key={`${entry.period}-${entry.title}`} className="relative grid grid-cols-[42px_1fr] gap-3 rounded-[18px] border border-atlas-line bg-atlas-card p-3">
                    <span className="grid size-[42px] place-items-center rounded-[15px] border border-atlas-line bg-atlas-highlight font-serif text-[13px] font-bold text-atlas-gold">{String(index + 1).padStart(2, '0')}</span>
                    <div><time className="text-[6.5px] font-black uppercase tracking-[0.08em] text-atlas-coral">{entry.period}</time><h3 className="mb-1 mt-1.5 text-[10px] font-[860] text-atlas-ink-soft">{entry.title}</h3><p className="m-0 text-[8px] leading-[1.55] text-atlas-muted">{entry.description}</p></div>
                  </article>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
