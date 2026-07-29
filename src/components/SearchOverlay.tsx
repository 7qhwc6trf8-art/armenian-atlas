import { ArrowRight, Buildings, CloudArrowDown, MagnifyingGlass, MapPin, X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import { provinces } from '../data/provinces';
import type { SettlementStatus } from '../hooks/useSettlementCatalog';
import { useI18n } from '../i18n';
import { placeSearchText } from '../lib/place-utils';
import type { City, ProvinceId } from '../types/domain';

interface SearchOverlayProps {
  open: boolean;
  settlements: City[];
  settlementStatus: SettlementStatus;
  onClose: () => void;
  onProvince: (id: ProvinceId) => void;
  onCity: (city: City) => void;
  showModernNames: boolean;
}

export function SearchOverlay({ open, settlements, settlementStatus, onClose, onProvince, onCity, showModernNames }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t, locale, provinceName, provinceSecondaryName, cityName, eraLabel } = useI18n();
  const normalized = query.trim().toLocaleLowerCase(locale);

  const matches = useMemo(() => {
    if (!normalized) return { provinces: provinces.slice(0, 6), cities: settlements.slice(0, 12) };
    const provinceMatches = provinces.filter((province) =>
      [province.nameHy, province.nameEn, provinceName(province), provinceSecondaryName(province), province.transliteration, province.epithet]
        .join(' ')
        .toLocaleLowerCase(locale)
        .includes(normalized),
    );
    const cityMatches = settlements.filter((city) => placeSearchText(city).includes(normalized));
    return { provinces: provinceMatches.slice(0, 8), cities: cityMatches.slice(0, 40) };
  }, [locale, normalized, provinceName, provinceSecondaryName, settlements]);

  const statusClass = settlementStatus === 'offline'
    ? 'bg-[color-mix(in_srgb,var(--atlas-danger)_10%,transparent)] text-atlas-danger'
    : settlementStatus === 'loading'
      ? 'bg-atlas-chip text-atlas-burgundy'
      : 'bg-atlas-icon-tile text-atlas-muted';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[2000] flex items-end bg-atlas-overlay p-2 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => inputRef.current?.focus()}
        >
          <motion.div
            className="relative flex max-h-[calc(100%-8px)] w-full flex-col overflow-hidden rounded-[31px] border border-atlas-line-strong bg-atlas-panel px-3.5 pb-[calc(14px+var(--tg-safe-bottom))] pt-4 shadow-[0_32px_96px_rgba(24,12,18,.4)]"
            initial={{ y: 34, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 34, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--atlas-gold-soft),transparent)] opacity-65" />
            <div className="flex items-center justify-between gap-3 px-1">
              <div>
                <span className="block text-[7px] font-black uppercase tracking-[0.16em] text-atlas-coral">{t('search.eyebrow')}</span>
                <h2 className="mb-0 mt-2 text-[28px] font-[900] leading-none tracking-[-0.06em] text-atlas-ink">{t('search.title')}</h2>
              </div>
              <button className="grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-[15px] border border-atlas-line-strong bg-atlas-control p-0 shadow-atlas-card active:scale-95" type="button" onClick={onClose} aria-label={t('aria.closeSearch')}>
                <X size={20} weight="bold" />
              </button>
            </div>

            <label className="atlas-glass mt-4 flex min-h-[56px] items-center gap-3 rounded-[20px] px-[12px] text-atlas-muted-soft">
              <span className="grid size-9 shrink-0 place-items-center rounded-[13px] bg-atlas-icon-tile text-atlas-burgundy"><MagnifyingGlass size={18} weight="bold" /></span>
              <input ref={inputRef} className="w-full border-0 bg-transparent text-[10px] text-atlas-ink outline-none placeholder:text-atlas-muted-soft" value={query} onChange={(event: { target: { value: string } }) => setQuery(event.target.value)} placeholder={t('search.placeholder')} />
              {query && <button type="button" className="grid size-7 cursor-pointer place-items-center rounded-full border border-atlas-line bg-atlas-control p-0 text-atlas-muted" onClick={() => setQuery('')}><X size={13} /></button>}
            </label>

            <div className={`mt-2 flex items-center gap-2 rounded-[14px] px-3 py-2 text-[7.5px] font-[780] ${statusClass}`}>
              <CloudArrowDown size={14} />
              <span>{settlementStatus === 'loading' ? t('search.loading') : t('search.databaseStatus', { count: settlements.length.toLocaleString(locale) })}</span>
            </div>

            <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto pt-4">
              {matches.provinces.length > 0 && (
                <section>
                  <div className="mb-2.5 flex items-center justify-between px-1">
                    <h3 className="m-0 text-[8px] font-black uppercase tracking-[0.13em] text-atlas-coral">{t('search.provinces')}</h3>
                    <span className="text-[8px] font-black text-atlas-muted-soft">{matches.provinces.length}</span>
                  </div>
                  <div className="grid gap-2">
                    {matches.provinces.map((province) => (
                      <button key={province.id} className="atlas-glass grid min-h-[67px] cursor-pointer grid-cols-[42px_minmax(0,1fr)_32px] items-center gap-3 rounded-[21px] px-3 py-2 text-left active:scale-[0.99]" type="button" onClick={() => onProvince(province.id)}>
                        <span className="grid size-[42px] place-items-center rounded-[15px] border border-atlas-line bg-atlas-highlight font-serif text-[13px] font-bold text-atlas-gold">{String(province.order).padStart(2, '0')}</span>
                        <span className="min-w-0"><strong className="block truncate text-[11px] font-[860] text-atlas-ink-soft">{provinceName(province)}</strong><small className="mt-1 block truncate text-[7px] text-atlas-muted-soft">{provinceSecondaryName(province)} · {province.epithet}</small></span>
                        <span className="grid size-8 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-burgundy"><ArrowRight size={14} /></span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {matches.cities.length > 0 && (
                <section className="mt-5">
                  <div className="mb-2.5 flex items-center justify-between px-1">
                    <h3 className="m-0 text-[8px] font-black uppercase tracking-[0.13em] text-atlas-coral">{t('search.places')}</h3>
                    <span className="text-[8px] font-black text-atlas-muted-soft">{matches.cities.length}</span>
                  </div>
                  <div className="atlas-glass overflow-hidden rounded-[24px] p-1.5">
                    {matches.cities.map((city, index) => (
                      <button key={city.id} className={`grid min-h-[61px] w-full cursor-pointer grid-cols-[40px_minmax(0,1fr)_30px] items-center gap-2.5 rounded-[18px] border-0 bg-transparent px-2.5 py-2 text-left active:scale-[0.99] ${index ? 'border-t border-atlas-line' : ''}`} type="button" onClick={() => onCity(city)}>
                        <span className="grid size-10 place-items-center rounded-[14px] border border-atlas-line bg-atlas-icon-tile text-atlas-burgundy"><Buildings size={17} /></span>
                        <span className="min-w-0"><strong className="block truncate text-[10px] font-[850] text-atlas-ink-soft">{cityName(city)}</strong><small className="mt-1 block truncate text-[7px] text-atlas-muted-soft">{showModernNames ? `${city.modernName} · ` : ''}{eraLabel(city)}</small></span>
                        <span className="grid size-7 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-gold"><MapPin size={13} /></span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {matches.provinces.length === 0 && matches.cities.length === 0 && (
                <div className="grid place-items-center rounded-[25px] border border-dashed border-atlas-line-strong px-5 py-11 text-center">
                  <span className="grid size-14 place-items-center rounded-[20px] bg-atlas-icon-tile text-atlas-muted-soft"><MagnifyingGlass size={28} /></span>
                  <p className="mb-0 mt-3 text-[10px] text-atlas-muted">{t('search.empty')}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
