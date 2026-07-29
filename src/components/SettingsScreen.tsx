import {
  ArrowLeft,
  ArrowsClockwise,
  CaretRight,
  Check,
  Database,
  Eye,
  GlobeHemisphereWest,
  HandTap,
  Moon,
  Palette,
  SignOut,
  Sun,
  Tag,
} from '@phosphor-icons/react';
import { useState, type ReactNode } from 'react';
import { languageOptions, useI18n } from '../i18n';
import type { AppearanceMode, AtlasPreferences } from '../types/preferences';

interface SettingsScreenProps {
  preferences: AtlasPreferences;
  onChange: (next: AtlasPreferences) => void;
  onBack: () => void;
  onClearCache: () => void;
  onResetAtlas: () => void;
}

interface ToggleRowProps {
  icon: ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  divided?: boolean;
}

function ToggleRow({ icon, title, description, checked, onChange, divided = false }: ToggleRowProps) {
  return (
    <button
      className={`grid min-h-[72px] w-full cursor-pointer grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 bg-transparent px-3 py-2.5 text-left transition-transform active:scale-[0.99] ${divided ? 'border-t border-atlas-line' : 'border-0'}`}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="grid size-[42px] place-items-center rounded-[15px] border border-atlas-line bg-atlas-icon-tile text-atlas-burgundy">{icon}</span>
      <span className="min-w-0">
        <strong className="block text-[10px] font-[860] text-atlas-ink-soft">{title}</strong>
        <small className="mt-1 block text-[7px] leading-[1.45] text-atlas-muted-soft">{description}</small>
      </span>
      <span className={`relative h-[28px] w-[48px] shrink-0 rounded-full border transition-colors ${checked ? 'border-atlas-burgundy bg-atlas-burgundy' : 'border-atlas-line-strong bg-atlas-card-soft'}`}>
        <i className={`absolute left-[3px] top-[3px] size-5 rounded-full bg-white shadow-[0_3px_9px_rgba(48,28,36,0.24)] transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  );
}

function SectionTitle({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="mb-2.5 flex items-start gap-2.5 px-1">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[10px] bg-atlas-highlight text-atlas-gold">{icon}</span>
      <div className="min-w-0">
        <strong className="block text-[11px] font-[860] text-atlas-ink-soft">{title}</strong>
        <small className="mt-1 block text-[7px] leading-[1.4] text-atlas-muted-soft">{description}</small>
      </div>
    </div>
  );
}

export function SettingsScreen({ preferences, onChange, onBack, onClearCache, onResetAtlas }: SettingsScreenProps) {
  const [message, setMessage] = useState<string | null>(null);
  const { t } = useI18n();

  const patch = <K extends keyof AtlasPreferences>(key: K, value: AtlasPreferences[K]) => {
    onChange({ ...preferences, [key]: value });
  };

  const appearanceOptions = [
    { id: 'system' as AppearanceMode, label: t('settings.system'), Icon: Palette },
    { id: 'light' as AppearanceMode, label: t('settings.light'), Icon: Sun },
    { id: 'dark' as AppearanceMode, label: t('settings.dark'), Icon: Moon },
  ];

  const perform = (messageText: string, action: () => void) => {
    action();
    setMessage(messageText);
    window.setTimeout(() => setMessage(null), 2400);
  };

  return (
    <main className="scrollbar-none absolute inset-0 overflow-y-auto bg-atlas-content px-[14px] pb-9 pt-3">
      <section className="atlas-folio relative overflow-hidden rounded-[29px] p-[16px]">
        <div className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[radial-gradient(circle,rgba(190,140,63,.22),transparent_68%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[4px] bg-[linear-gradient(#a60c3a,#6a0522)]" />
        <div className="relative z-[1] flex items-center gap-3">
          <button className="grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-[15px] border border-atlas-line-strong bg-atlas-control p-0 shadow-atlas-card active:scale-95" type="button" onClick={onBack} aria-label={t('profile.settings')}>
            <ArrowLeft size={20} weight="bold" />
          </button>
          <div>
            <span className="block text-[7px] font-black uppercase tracking-[0.16em] text-atlas-coral">{t('settings.eyebrow')}</span>
            <h1 className="mb-0 mt-2 text-[29px] font-[900] leading-none tracking-[-0.06em] text-atlas-ink">{t('settings.title')}</h1>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle icon={<Palette size={16} />} title={t('settings.appearance')} description={t('settings.appearanceDescription')} />
        <div className="atlas-glass grid grid-cols-3 gap-1.5 rounded-[25px] p-1.5">
          {appearanceOptions.map(({ id, label, Icon }) => {
            const active = preferences.appearance === id;
            return (
              <button key={id} type="button" className={`relative flex min-h-[84px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border text-[8px] font-black transition-transform active:scale-[0.98] ${active ? 'border-atlas-burgundy/25 bg-atlas-burgundy text-white shadow-[0_10px_26px_rgba(151,11,52,.22)]' : 'border-transparent bg-transparent text-atlas-muted'}`} onClick={() => patch('appearance', id)}>
                <span className={`grid size-9 place-items-center rounded-[13px] ${active ? 'bg-white/12' : 'bg-atlas-icon-tile text-atlas-burgundy'}`}><Icon size={20} weight={active ? 'fill' : 'duotone'} /></span>
                <span>{label}</span>
                {active && <Check className="absolute right-2 top-2" size={13} weight="bold" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle icon={<GlobeHemisphereWest size={16} />} title={t('settings.language')} description={t('settings.languageDescription')} />
        <div className="atlas-glass grid grid-cols-2 gap-1.5 rounded-[25px] p-1.5" role="radiogroup" aria-label={t('settings.language')}>
          {languageOptions.map((option) => {
            const active = preferences.language === option.id;
            return (
              <button key={option.id} type="button" role="radio" aria-checked={active} className={`relative grid min-h-[58px] cursor-pointer grid-cols-[35px_minmax(0,1fr)_auto] items-center gap-2 rounded-[19px] border px-2.5 py-2 text-left text-[9px] font-black transition-transform active:scale-[0.98] ${active ? 'border-atlas-burgundy/22 bg-atlas-chip text-atlas-burgundy' : 'border-transparent bg-transparent text-atlas-muted'}`} onClick={() => patch('language', option.id)}>
                <span className={`grid size-[35px] place-items-center rounded-[12px] text-[8px] font-black uppercase ${active ? 'bg-atlas-burgundy text-white' : 'border border-atlas-line bg-atlas-icon-tile text-atlas-coral'}`}>{option.shortLabel}</span>
                <span className="truncate">{option.nativeLabel}</span>
                {active && <Check size={14} weight="bold" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle icon={<Eye size={16} />} title={t('settings.mapDisplay')} description={t('settings.mapDisplayDescription')} />
        <div className="atlas-glass overflow-hidden rounded-[25px] p-1.5">
          <ToggleRow icon={<Tag size={19} />} title={t('settings.mapLabels')} description={t('settings.mapLabelsDescription')} checked={preferences.showMapLabels} onChange={(value) => patch('showMapLabels', value)} />
          <ToggleRow divided icon={<Database size={19} />} title={t('settings.modernNames')} description={t('settings.modernNamesDescription')} checked={preferences.showModernNames} onChange={(value) => patch('showModernNames', value)} />
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle icon={<HandTap size={16} />} title={t('settings.interaction')} description={t('settings.interactionDescription')} />
        <div className="atlas-glass overflow-hidden rounded-[25px] p-1.5">
          <ToggleRow icon={<HandTap size={19} />} title={t('settings.haptics')} description={t('settings.hapticsDescription')} checked={preferences.haptics} onChange={(value) => patch('haptics', value)} />
          <ToggleRow divided icon={<ArrowsClockwise size={19} />} title={t('settings.reduceMotion')} description={t('settings.reduceMotionDescription')} checked={preferences.reduceMotion} onChange={(value) => patch('reduceMotion', value)} />
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle icon={<Database size={16} />} title={t('settings.data')} description={t('settings.dataDescription')} />
        <div className="atlas-glass overflow-hidden rounded-[25px] p-1.5">
          <button className="grid min-h-[70px] w-full cursor-pointer grid-cols-[42px_minmax(0,1fr)_32px] items-center gap-3 rounded-[19px] border-0 bg-transparent px-2.5 py-2 text-left active:scale-[0.99]" type="button" onClick={() => perform(t('settings.cacheCleared'), onClearCache)}>
            <span className="grid size-[42px] place-items-center rounded-[15px] border border-atlas-line bg-atlas-icon-tile text-atlas-burgundy"><Database size={19} /></span>
            <span className="min-w-0"><strong className="block text-[10px] font-[860] text-atlas-ink-soft">{t('settings.clearCache')}</strong><small className="mt-1 block text-[7px] leading-[1.42] text-atlas-muted-soft">{t('settings.clearCacheDescription')}</small></span>
            <span className="grid size-8 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-gold"><CaretRight size={14} /></span>
          </button>
          <button className="grid min-h-[70px] w-full cursor-pointer grid-cols-[42px_minmax(0,1fr)_32px] items-center gap-3 rounded-[19px] border-0 border-t border-atlas-line bg-transparent px-2.5 py-2 text-left active:scale-[0.99]" type="button" onClick={() => perform(t('settings.atlasReset'), onResetAtlas)}>
            <span className="grid size-[42px] place-items-center rounded-[15px] border border-atlas-line bg-[color-mix(in_srgb,var(--atlas-danger)_11%,transparent)] text-atlas-danger"><SignOut size={19} /></span>
            <span className="min-w-0"><strong className="block text-[10px] font-[860] text-atlas-danger">{t('settings.resetAtlas')}</strong><small className="mt-1 block text-[7px] leading-[1.42] text-atlas-muted-soft">{t('settings.resetAtlasDescription')}</small></span>
            <span className="grid size-8 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-danger"><CaretRight size={14} /></span>
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-[25px] border border-white/[0.07] bg-[linear-gradient(145deg,var(--atlas-hero),var(--atlas-hero-2))] p-[17px] text-white shadow-[0_16px_36px_rgba(85,5,32,.22)]">
        <div className="flex items-center justify-between gap-3">
          <div><strong className="block text-[13px] font-[870]">{t('settings.about')}</strong><small className="mt-1.5 block text-[7px] font-black uppercase tracking-[0.09em] text-[#e8bd70]">{t('settings.version')}</small></div>
          <span className="grid size-10 place-items-center rounded-[14px] border border-white/12 bg-white/[0.08] text-[#e8bd70]"><MapGlyph /></span>
        </div>
        <p className="mb-0 mt-3 border-t border-white/10 pt-3 text-[7px] leading-[1.55] text-white/55">{t('settings.disclaimer')}</p>
      </section>

      {message && (
        <div className="sticky bottom-2 z-30 mx-auto mt-4 flex w-fit max-w-[calc(100%-20px)] items-center gap-2 rounded-[15px] bg-atlas-ink px-4 py-3 text-[8px] font-black text-atlas-shell shadow-atlas" role="status">
          <Check size={16} weight="bold" />{message}
        </div>
      )}
    </main>
  );
}

function MapGlyph() {
  return <span className="font-serif text-[18px]">Ա</span>;
}
