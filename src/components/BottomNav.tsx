import { BookmarkSimple, Compass, MapTrifold, UserCircle } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import type { NavTab } from '../types/domain';

interface BottomNavProps {
  active: NavTab;
  onChange: (tab: NavTab) => void;
}

const items = [
  { id: 'map' as const, labelKey: 'nav.map', Icon: MapTrifold },
  { id: 'browse' as const, labelKey: 'nav.browse', Icon: Compass },
  { id: 'saved' as const, labelKey: 'nav.saved', Icon: BookmarkSimple },
  { id: 'profile' as const, labelKey: 'nav.profile', Icon: UserCircle },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  const { t } = useI18n();

  return (
    <nav
      className="relative z-[1100] pb-3 min-h-[calc(50px+var(--tg-safe-bottom))] shrink-0"
      aria-label={t('aria.mainNav')}
    >
      <div className="atlas-glass grid h-full grid-cols-4 p-1.5 w-full">
        {items.map(({ id, labelKey, Icon }) => {
          const isActive = active === id; 
          return (
            <button
              key={id}
              className={`relative flex cursor-pointer flex-col items-center justify-center gap-[3px] overflow-hidden rounded-[18px] border-0 bg-transparent px-1 py-1 text-[7.5px] font-[850] transition-colors ${isActive ? 'text-atlas-burgundy' : 'text-atlas-muted-soft'}`}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-[18px] border border-atlas-line-strong bg-atlas-control-active shadow-[0_8px_20px_rgba(58,32,40,0.09)] dark:bg-atlas-control"
                  transition={{ type: 'spring', stiffness: 440, damping: 38 }}
                />
              )}
              <span className={`relative z-[1] grid size-7 place-items-center rounded-[11px] transition-colors ${isActive ? 'bg-atlas-burgundy text-white shadow-[0_7px_16px_rgba(151,11,52,.24)]' : ''}`}>
                <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
              </span>
              <span className="relative z-[1] max-w-full truncate">{t(labelKey)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
