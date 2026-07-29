import { ArrowRight, Compass, MagnifyingGlass, MapTrifold, Mountains } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { provinces } from '../data/provinces';
import { formatAreaKm2, provinceMetricsById } from '../data/territoryMetrics';
import { useI18n } from '../i18n';
import type { ProvinceId } from '../types/domain';
import { ProvinceCard } from './ProvinceCard';

interface BrowseScreenProps {
  onOpen: (id: ProvinceId) => void;
}

export function BrowseScreen({ onOpen }: BrowseScreenProps) {
  const [query, setQuery] = useState('');
  const { t, locale, provinceName, provinceSecondaryName } = useI18n();
  const featured = provinces.find((province) => province.id === 'ayrarat') ?? provinces[0];
  const featuredMetrics = provinceMetricsById[featured.id];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    if (!normalized) return provinces;
    return provinces.filter((province) =>
      [province.nameHy, province.nameEn, provinceName(province), provinceSecondaryName(province), province.transliteration, province.epithet]
        .join(' ')
        .toLocaleLowerCase(locale)
        .includes(normalized),
    );
  }, [locale, provinceName, provinceSecondaryName, query]);

  return (
    <main className="scrollbar-none absolute inset-0 overflow-y-auto bg-atlas-content px-[14px] pb-8 pt-3">
      <section className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[linear-gradient(145deg,var(--atlas-hero),var(--atlas-hero-2)_58%,#980c38)] px-[18px] pb-[18px] pt-[19px] text-white shadow-[0_22px_56px_rgba(89,5,34,0.28)]">
        <div className="pointer-events-none absolute -right-9 -top-16 font-serif text-[132px] font-bold leading-none text-white/[0.045]">15</div>
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-52 rounded-full bg-[radial-gradient(circle,rgba(227,184,96,0.25),transparent_66%)]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,209,124,.7),transparent)]" />

        <div className="relative z-[1] flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="block text-[7px] font-black uppercase tracking-[0.18em] text-[#e8bd70]">{t('browse.eyebrow')}</span>
            <h1 className="mb-2 mt-2.5 text-[32px] font-[900] leading-[.98] tracking-[-0.06em]">{t('browse.title')}</h1>
            <p className="m-0 max-w-[300px] text-[9px] leading-[1.6] text-white/62">{t('browse.subtitle')}</p>
          </div>
          <span className="grid size-[50px] shrink-0 place-items-center rounded-[18px] border border-white/15 bg-white/[0.08] text-[#f0cc7c] backdrop-blur-xl">
            <Compass size={27} weight="duotone" />
          </span>
        </div>

        <button type="button" onClick={() => onOpen(featured.id)} className="relative z-[1] mt-5 grid w-full cursor-pointer grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] border border-white/12 bg-black/15 p-3 text-left backdrop-blur-xl transition-transform active:scale-[0.985]">
          <span className="grid size-11 place-items-center rounded-[15px] border border-[#e9c979]/30 bg-[#e9c979]/10 font-serif text-[16px] font-bold text-[#f0cc7c]">04</span>
          <span className="min-w-0">
            <small className="block text-[6.5px] font-black uppercase tracking-[0.12em] text-white/48">{provinceSecondaryName(featured)}</small>
            <strong className="mt-1 block truncate text-[14px] font-[880]">{provinceName(featured)}</strong>
            <span className="mt-1.5 flex items-center gap-1.5 text-[7px] text-white/52"><Mountains size={12} />{formatAreaKm2(featuredMetrics.areaKm2, locale)}</span>
          </span>
          <span className="grid size-9 place-items-center rounded-full border border-white/12 bg-white/[0.07]"><ArrowRight size={16} /></span>
        </button>
      </section>

      <label className="atlas-glass sticky top-2 z-10 mt-3 flex min-h-[54px] items-center gap-3 rounded-[19px] px-[14px] text-atlas-muted-soft">
        <span className="grid size-8 shrink-0 place-items-center rounded-[12px] bg-atlas-icon-tile text-atlas-burgundy"><MagnifyingGlass size={17} weight="bold" /></span>
        <input
          className="w-full border-0 bg-transparent text-[10px] text-atlas-ink outline-none placeholder:text-atlas-muted-soft"
          value={query}
          onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
          placeholder={t('browse.placeholder')}
        />
        <span className="grid min-w-8 place-items-center rounded-full bg-atlas-chip px-2 py-1 text-[8px] font-black text-atlas-coral">{filtered.length}</span>
      </label>

      <div className="mb-3 mt-6 flex items-end justify-between px-1">
        <div>
          <span className="block text-[6.5px] font-black uppercase tracking-[0.15em] text-atlas-coral">{t('browse.eyebrow')}</span>
          <h2 className="mb-0 mt-1.5 text-[17px] font-[880] tracking-[-0.04em] text-atlas-ink">{t('browse.provinces')}</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-atlas-line bg-atlas-control px-2.5 py-1.5 text-[7px] font-black text-atlas-muted"><MapTrifold size={13} className="text-atlas-burgundy" />{String(filtered.length).padStart(2, '0')}</span>
      </div>

      <div className="grid gap-2.5">
        {filtered.map((province) => <ProvinceCard key={province.id} province={province} onOpen={() => onOpen(province.id)} />)}
      </div>
    </main>
  );
}
