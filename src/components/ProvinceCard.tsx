import { ArrowRight, BookmarkSimple, MapPin, MapTrifold } from '@phosphor-icons/react';
import { formatAreaKm2, formatDistanceKm, provinceMetricsById } from '../data/territoryMetrics';
import { useI18n } from '../i18n';
import type { Province } from '../types/domain';

interface ProvinceCardProps {
  province: Province;
  saved?: boolean;
  large?: boolean;
  onOpen: () => void;
  onToggleSaved?: () => void;
}

export function ProvinceCard({ province, saved = false, large = false, onOpen, onToggleSaved }: ProvinceCardProps) {
  const metrics = provinceMetricsById[province.id];
  const { t, locale, provinceName, provinceSecondaryName, divisionName } = useI18n();
  const displayName = provinceName(province);
  const secondaryName = provinceSecondaryName(province);

  if (large) {
    return (
      <article className="group relative overflow-hidden rounded-[27px] border border-atlas-line-strong bg-atlas-card p-[18px] shadow-atlas-card backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--atlas-gold-soft),transparent)] opacity-60" />
        <div className="pointer-events-none absolute -right-14 -top-16 size-40 rounded-full border border-atlas-line bg-[radial-gradient(circle,rgba(188,139,60,0.2),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-44 rounded-full bg-[radial-gradient(circle,rgba(143,8,48,0.1),transparent_70%)]" />

        <div className="relative z-[1] flex items-start gap-4">
          <div className="grid size-[54px] shrink-0 place-items-center rounded-[18px] border border-atlas-line-strong bg-atlas-highlight font-serif text-[21px] font-bold text-atlas-gold shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
            {String(province.order).padStart(2, '0')}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex min-w-0 items-center gap-2">
              <span className="rounded-full bg-atlas-chip px-2 py-1 text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-coral">{divisionName(province.division)}</span>
              <span className="truncate text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-muted-soft">{province.transliteration}</span>
            </div>
            <h3 className="m-0 truncate text-[24px] font-[900] leading-none tracking-[-0.055em] text-atlas-ink">{displayName}</h3>
            <p className="mb-0 mt-2 line-clamp-2 text-[9px] leading-[1.58] text-atlas-muted">{province.shortDescription}</p>
          </div>
          {onToggleSaved && (
            <button className={`grid size-10 shrink-0 cursor-pointer place-items-center rounded-[14px] border p-0 transition-transform active:scale-95 ${saved ? 'border-atlas-burgundy bg-atlas-burgundy text-white shadow-[0_8px_20px_rgba(151,11,52,.22)]' : 'border-atlas-line-strong bg-atlas-control text-atlas-burgundy'}`} type="button" onClick={onToggleSaved} aria-label={t('aria.saveProvince')}>
              <BookmarkSimple size={19} weight={saved ? 'fill' : 'regular'} />
            </button>
          )}
        </div>

        <div className="relative z-[1] mt-4 grid grid-cols-2 gap-2">
          <span className="rounded-[16px] border border-atlas-line bg-atlas-metric px-3 py-2.5">
            <small className="block text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-coral">{t('card.area')}</small>
            <strong className="mt-1.5 block text-[10px] font-[850] text-atlas-ink-soft">{formatAreaKm2(metrics.areaKm2, locale)}</strong>
          </span>
          <span className="rounded-[16px] border border-atlas-line bg-atlas-metric px-3 py-2.5">
            <small className="block text-[6.5px] font-black uppercase tracking-[0.1em] text-atlas-coral">{t('card.perimeter')}</small>
            <strong className="mt-1.5 block text-[10px] font-[850] text-atlas-ink-soft">{formatDistanceKm(metrics.perimeterKm, locale)}</strong>
          </span>
        </div>

        <button className="relative z-[1] mt-3 flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-[15px] border border-atlas-line-strong bg-atlas-control px-3.5 text-left text-[9px] font-black text-atlas-ink-soft transition-[transform,background-color] active:scale-[0.985] active:bg-atlas-control-active" type="button" onClick={onOpen}>
          <span className="inline-flex items-center gap-2"><MapTrifold size={17} className="text-atlas-burgundy" /> {t('card.openOnMap')}</span>
          <ArrowRight size={16} className="text-atlas-gold" />
        </button>
      </article>
    );
  }

  return (
    <button
      className="group relative grid min-h-[98px] w-full cursor-pointer grid-cols-[50px_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[23px] border border-atlas-line-strong bg-atlas-card px-[14px] py-3 text-left shadow-atlas-card backdrop-blur-xl transition-[transform,box-shadow] active:scale-[0.986]"
      type="button"
      onClick={onOpen}
    >
      <span className="pointer-events-none absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-atlas-burgundy opacity-0 transition-opacity group-active:opacity-100" />
      <span className="grid size-[50px] place-items-center rounded-[17px] border border-atlas-line bg-atlas-highlight font-serif text-[17px] font-bold text-atlas-gold">
        {String(province.order).padStart(2, '0')}
      </span>
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2">
          <strong className="truncate text-[15px] font-[880] tracking-[-0.04em] text-atlas-ink">{displayName}</strong>
          <small className="shrink-0 rounded-full bg-atlas-chip px-1.5 py-0.5 text-[6px] font-black uppercase tracking-[0.08em] text-atlas-coral">{province.division === 'western' ? 'W' : 'E'}</small>
        </span>
        <small className="mt-1 block truncate text-[7px] font-bold uppercase tracking-[0.06em] text-atlas-muted-soft">{secondaryName}</small>
        <span className="mt-2 flex min-w-0 items-center gap-2 text-[7px] font-bold text-atlas-muted">
          <span className="inline-flex min-w-0 items-center gap-1"><MapPin size={11} /><span className="truncate">{province.epithet}</span></span>
          <i className="size-1 shrink-0 rounded-full bg-atlas-line-strong" />
          <strong className="shrink-0 text-atlas-ink-soft">{formatAreaKm2(metrics.areaKm2, locale)}</strong>
        </span>
      </span>
      <span className="grid size-8 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-burgundy"><ArrowRight size={15} /></span>
    </button>
  );
}
