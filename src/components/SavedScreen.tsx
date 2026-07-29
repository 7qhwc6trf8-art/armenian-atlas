import { BookmarkSimple, MapTrifold, Sparkle } from '@phosphor-icons/react';
import { provinces } from '../data/provinces';
import { useI18n } from '../i18n';
import type { ProvinceId } from '../types/domain';
import { ProvinceCard } from './ProvinceCard';

interface SavedScreenProps {
  savedIds: ProvinceId[];
  onOpen: (id: ProvinceId) => void;
  onToggle: (id: ProvinceId) => void;
}

export function SavedScreen({ savedIds, onOpen, onToggle }: SavedScreenProps) {
  const { t } = useI18n();
  const savedProvinces = provinces.filter((province) => savedIds.includes(province.id));
  const featured = provinces.filter((province) => ['ayrarat', 'syunik', 'aghdznik', 'parskahayk'].includes(province.id));

  return (
    <main className="scrollbar-none absolute inset-0 overflow-y-auto bg-atlas-content px-[14px] pb-9 pt-3">
      <section className="atlas-folio relative overflow-hidden rounded-[30px] p-[18px]">
        <div className="pointer-events-none absolute -right-10 -top-14 size-40 rounded-full border border-atlas-line bg-[radial-gradient(circle,rgba(187,137,62,.22),transparent_66%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[5px] bg-[linear-gradient(#a90c3b,#6f0625)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--atlas-gold-soft),transparent)] opacity-60" />
        <div className="relative z-[1] flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="block text-[7px] font-black uppercase tracking-[0.16em] text-atlas-coral">{t('saved.eyebrow')}</span>
            <h1 className="mb-2 mt-2.5 text-[32px] font-[900] leading-none tracking-[-0.06em] text-atlas-ink">{t('saved.title')}</h1>
            <p className="m-0 max-w-[290px] text-[9px] leading-[1.6] text-atlas-muted">{t('saved.subtitle')}</p>
          </div>
          <span className="relative grid size-[54px] shrink-0 place-items-center rounded-[19px] bg-atlas-burgundy text-[#f4d17e] shadow-[0_13px_30px_rgba(151,11,52,.25)]">
            <BookmarkSimple size={26} weight="fill" />
            <b className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-atlas-panel bg-atlas-gold text-[8px] text-[#49300f]">{savedProvinces.length}</b>
          </span>
        </div>

        <div className="relative z-[1] mt-5 flex items-center gap-2">
          <span className="h-px flex-1 bg-atlas-line-strong" />
          <span className="rounded-full border border-atlas-line-strong bg-atlas-control px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.12em] text-atlas-muted">{String(savedProvinces.length).padStart(2, '0')}</span>
          <span className="h-px flex-1 bg-atlas-line-strong" />
        </div>
      </section>

      <div className="mb-3 mt-6 flex items-end justify-between px-1">
        <div>
          <span className="block text-[6.5px] font-black uppercase tracking-[0.15em] text-atlas-coral">{t('saved.eyebrow')}</span>
          <h2 className="mb-0 mt-1.5 text-[17px] font-[880] tracking-[-0.04em] text-atlas-ink">{t('saved.title')}</h2>
        </div>
        <span className="text-[9px] font-black text-atlas-burgundy">{String(savedProvinces.length).padStart(2, '0')}</span>
      </div>

      {savedProvinces.length > 0 ? (
        <div className="grid gap-2.5">
          {savedProvinces.map((province) => (
            <ProvinceCard key={province.id} province={province} large saved onOpen={() => onOpen(province.id)} onToggleSaved={() => onToggle(province.id)} />
          ))}
        </div>
      ) : (
        <section className="atlas-glass grid place-items-center rounded-[28px] px-[24px] py-10 text-center">
          <div className="relative grid size-[68px] place-items-center rounded-[23px] border border-atlas-line bg-atlas-highlight text-atlas-burgundy before:absolute before:inset-2 before:rounded-[17px] before:border before:border-atlas-line before:content-['']"><BookmarkSimple size={32} weight="duotone" /></div>
          <h2 className="mb-1.5 mt-4 text-[19px] font-[880] tracking-[-0.04em] text-atlas-ink">{t('saved.emptyTitle')}</h2>
          <p className="m-0 max-w-[300px] text-[9px] leading-[1.65] text-atlas-muted">{t('saved.emptyText')}</p>
          <button className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[15px] border-0 bg-atlas-burgundy px-5 text-[9px] font-black text-white shadow-[0_10px_24px_rgba(151,11,52,.22)] active:scale-[0.98]" type="button" onClick={() => onOpen('ayrarat')}>
            <MapTrifold size={18} /> {t('saved.openMap')}
          </button>
        </section>
      )}

      <div className="mb-3 mt-7 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-[10px] bg-atlas-highlight text-atlas-gold"><Sparkle size={15} weight="fill" /></span>
          <h2 className="m-0 text-[17px] font-[880] tracking-[-0.04em] text-atlas-ink">{t('saved.recommended')}</h2>
        </div>
        <span className="text-[8px] font-black text-atlas-muted-soft">04</span>
      </div>
      <div className="grid gap-2.5">
        {featured.map((province) => (
          <ProvinceCard key={province.id} province={province} large saved={savedIds.includes(province.id)} onOpen={() => onOpen(province.id)} onToggleSaved={() => onToggle(province.id)} />
        ))}
      </div>
    </main>
  );
}
