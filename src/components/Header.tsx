import { BookmarkSimple, MagnifyingGlass } from '@phosphor-icons/react';
import { useI18n } from '../i18n';
import { LogoMark } from './LogoMark';

interface HeaderProps {
  savedCount: number;
  onBrand: () => void;
  onSearch: () => void;
  onSaved: () => void;
}

const iconButtonClass = 'relative grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-[16px] border border-atlas-line-strong bg-atlas-control p-0 text-atlas-ink-soft shadow-atlas-card backdrop-blur-2xl transition-[transform,background-color,border-color] active:scale-[0.94] active:bg-atlas-control-active';

export function Header({ savedCount, onBrand, onSearch, onSaved }: HeaderProps) {
  const { t } = useI18n();

  return (
    <header className="relative z-[1000] shrink-0 border-b border-atlas-line bg-atlas-header pl-[calc(14px+var(--tg-safe-left))] pr-[calc(14px+var(--tg-safe-right))] pt-[var(--tg-safe-top)] backdrop-blur-[30px] min-[720px]:rounded-t-[38px]">
      <div className="flex min-h-[72px] items-center justify-between gap-3">
        <button className="group flex min-w-0 items-center border-0 bg-transparent p-0 text-left" type="button" aria-label={t('aria.goMap')} onClick={onBrand}>
          <LogoMark />
          <span className="ml-3 min-w-0">
            <span className="flex items-center gap-2">
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-[880] leading-tight tracking-[-0.035em] text-atlas-ink">{t('brand.title')}</strong>
              <i className="hidden h-1 w-1 shrink-0 rounded-full bg-atlas-gold min-[390px]:block" />
              <small className="hidden shrink-0 text-[6px] font-black uppercase tracking-[0.16em] text-atlas-gold min-[390px]:block">MMXXVI</small>
            </span>
            <small className="mt-[3px] block max-w-[214px] overflow-hidden text-ellipsis whitespace-nowrap text-[6.5px] font-black uppercase leading-tight tracking-[0.11em] text-atlas-coral max-[370px]:max-w-[152px]">{t('brand.tagline')}</small>
          </span>
        </button>

        <div className="flex shrink-0 gap-2">
          <button className={iconButtonClass} type="button" aria-label={t('aria.search')} onClick={onSearch}>
            <MagnifyingGlass size={21} weight="bold" />
          </button>
          <button className={iconButtonClass} type="button" aria-label={t('aria.openSaved')} onClick={onSaved}>
            <BookmarkSimple size={21} weight={savedCount ? 'fill' : 'regular'} />
            {savedCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-atlas-shell bg-atlas-burgundy px-1 text-[8px] font-black text-white shadow-[0_5px_12px_rgba(138,6,43,.28)]">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
