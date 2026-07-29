import {
  ArrowRight,
  BookmarkSimple,
  GearSix,
  MapPin,
  MapTrifold,
  ShareNetwork,
  Sparkle,
} from '@phosphor-icons/react';
import { provinces, provinceById } from '../data/provinces';
import { useI18n } from '../i18n';
import type { ProvinceId } from '../types/domain';

interface TelegramProfile {
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface ProfileScreenProps {
  user?: TelegramProfile;
  savedIds: ProvinceId[];
  visitedIds: ProvinceId[];
  onOpenProvince: (id: ProvinceId) => void;
  onOpenSaved: () => void;
  onOpenSettings: () => void;
}

export function ProfileScreen({ user, savedIds, visitedIds, onOpenProvince, onOpenSaved, onOpenSettings }: ProfileScreenProps) {
  const { t, provinceName, provinceSecondaryName } = useI18n();
  const name = user ? [user.first_name, user.last_name].filter(Boolean).join(' ') : t('profile.visitor');
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || t('profile.initials');
  const visited = visitedIds.map((id) => provinceById[id]).filter(Boolean);
  const completion = Math.min(100, Math.round((visited.length / provinces.length) * 100));
  const recommendations = provinces.filter((province) => !visitedIds.includes(province.id)).slice(0, 3);

  const shareAtlas = async () => {
    const shareData = { title: t('profile.shareTitle'), text: t('profile.shareText'), url: window.location.origin };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
    } catch {
      // Native share can be cancelled without creating an error state.
    }
  };

  return (
    <main className="scrollbar-none absolute inset-0 overflow-y-auto bg-atlas-content px-[14px] pb-9 pt-3">
      <section className="relative overflow-hidden rounded-[31px] border border-white/[0.08] bg-[linear-gradient(145deg,var(--atlas-hero),var(--atlas-hero-2)_58%,#920b35)] p-[18px] text-white shadow-[0_24px_62px_rgba(86,5,33,0.3)]">
        <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full border border-white/[0.07] bg-white/[0.035]" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-56 rounded-full bg-[radial-gradient(circle,rgba(232,191,103,.25),transparent_66%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(244,207,128,.75),transparent)]" />

        <div className="relative z-[1] flex items-start gap-3.5">
          <div className="relative grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-[24px] border border-white/20 bg-white/[0.08] text-[21px] font-black text-[#f6d992] shadow-[0_14px_32px_rgba(0,0,0,.26)] before:absolute before:inset-1.5 before:rounded-[19px] before:border before:border-white/[0.08] before:content-['']" aria-hidden={!user?.photo_url}>
            {user?.photo_url ? <img className="size-full object-cover" src={user.photo_url} alt="" /> : <span className="relative z-[1]">{initials}</span>}
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <span className="block text-[6.5px] font-black uppercase tracking-[0.18em] text-[#e8bd70]">{t('profile.eyebrow')}</span>
            <h1 className="my-2 truncate text-[23px] font-[900] leading-none tracking-[-0.05em]">{name}</h1>
            <p className="m-0 truncate text-[8px] text-white/55">{user?.username ? `@${user.username}` : t('profile.guide')}</p>
          </div>
          <button type="button" onClick={onOpenSettings} className="grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-[15px] border border-white/12 bg-white/[0.08] p-0 text-white backdrop-blur-lg active:scale-95" aria-label={t('profile.settings')}>
            <GearSix size={20} />
          </button>
        </div>

        <div className="relative z-[1] mt-5 grid grid-cols-[82px_minmax(0,1fr)] items-center gap-4 rounded-[23px] border border-white/10 bg-black/15 p-3.5 backdrop-blur-xl">
          <div className="relative grid size-[74px] place-items-center rounded-full" style={{ background: `conic-gradient(#efc978 ${completion * 3.6}deg, rgba(255,255,255,.11) 0deg)` }}>
            <span className="grid size-[59px] place-items-center rounded-full border border-white/10 bg-[#440b21] text-[17px] font-black">{completion}%</span>
          </div>
          <div className="min-w-0">
            <strong className="block text-[11px] font-black">{t('profile.progress')}</strong>
            <p className="mb-0 mt-1.5 text-[8px] leading-[1.55] text-white/58">{t('profile.viewedProgress', { visited: visited.length, total: provinces.length })}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-[linear-gradient(90deg,#d30c46,#edc576)]" style={{ width: `${completion}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-3 gap-2">
        {[
          { Icon: MapPin, value: visited.length, label: t('profile.viewed') },
          { Icon: BookmarkSimple, value: savedIds.length, label: t('profile.saved') },
          { Icon: MapTrifold, value: provinces.length, label: t('profile.province') },
        ].map(({ Icon, value, label }) => (
          <article key={label} className="atlas-glass relative min-h-[94px] overflow-hidden rounded-[21px] px-2 py-3 text-center">
            <div className="pointer-events-none absolute -right-6 -top-7 size-16 rounded-full bg-[radial-gradient(circle,rgba(190,139,62,.18),transparent_68%)]" />
            <span className="mx-auto grid size-8 place-items-center rounded-[11px] bg-atlas-icon-tile text-atlas-burgundy"><Icon size={17} weight="duotone" /></span>
            <strong className="mt-2 block text-[20px] font-black leading-none tracking-[-0.045em] text-atlas-ink">{value}</strong>
            <span className="mt-1.5 block text-[6.5px] font-black uppercase tracking-[0.08em] text-atlas-muted-soft">{label}</span>
          </article>
        ))}
      </section>

      <section className="atlas-glass mt-3 overflow-hidden rounded-[26px] p-1.5">
        {[
          { Icon: BookmarkSimple, title: t('profile.savedPlaces'), description: t('profile.savedDescription'), onClick: onOpenSaved },
          { Icon: GearSix, title: t('profile.settings'), description: t('profile.settingsDescription'), onClick: onOpenSettings },
          { Icon: ShareNetwork, title: t('profile.share'), description: t('profile.shareDescription'), onClick: shareAtlas },
        ].map(({ Icon, title, description, onClick }, index) => (
          <button key={title} className={`grid min-h-[68px] w-full cursor-pointer grid-cols-[42px_minmax(0,1fr)_34px] items-center gap-2.5 rounded-[19px] border-0 bg-transparent px-2.5 py-2 text-left active:scale-[0.99] ${index ? 'border-t border-atlas-line' : ''}`} type="button" onClick={onClick}>
            <span className="grid size-[42px] place-items-center rounded-[15px] border border-atlas-line bg-atlas-icon-tile text-atlas-burgundy"><Icon size={19} weight="duotone" /></span>
            <span className="min-w-0">
              <strong className="block text-[10px] font-[850] text-atlas-ink-soft">{title}</strong>
              <small className="mt-1 block text-[7px] leading-[1.42] text-atlas-muted-soft">{description}</small>
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-gold"><ArrowRight size={14} /></span>
          </button>
        ))}
      </section>

      <div className="mb-3 mt-7 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-[10px] bg-atlas-highlight text-atlas-gold"><Sparkle size={15} weight="fill" /></span>
          <h2 className="m-0 text-[17px] font-[880] tracking-[-0.04em] text-atlas-ink">{visited.length ? t('profile.recent') : t('profile.startHere')}</h2>
        </div>
        <span className="text-[8px] font-black text-atlas-muted-soft">{String(visited.length || recommendations.length).padStart(2, '0')}</span>
      </div>
      <section className="grid gap-2.5">
        {(visited.length ? [...visited].reverse().slice(0, 4) : recommendations).map((province) => (
          <button key={province.id} className="atlas-glass grid min-h-[72px] w-full cursor-pointer grid-cols-[46px_minmax(0,1fr)_34px] items-center gap-3 rounded-[22px] px-3 py-2.5 text-left active:scale-[0.99]" type="button" onClick={() => onOpenProvince(province.id)}>
            <span className="grid size-[46px] place-items-center rounded-[16px] border border-atlas-line bg-atlas-highlight font-serif text-[15px] font-bold text-atlas-gold">{String(province.order).padStart(2, '0')}</span>
            <span className="min-w-0">
              <strong className="block text-[12px] font-[870] tracking-[-0.025em] text-atlas-ink-soft">{provinceName(province)}</strong>
              <small className="mt-1 block truncate text-[7px] text-atlas-muted-soft">{provinceSecondaryName(province)} · {province.epithet}</small>
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-atlas-line bg-atlas-control text-atlas-burgundy"><ArrowRight size={14} /></span>
          </button>
        ))}
      </section>
    </main>
  );
}
