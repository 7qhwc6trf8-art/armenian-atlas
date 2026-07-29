import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { BrowseScreen } from './components/BrowseScreen';
import { Header } from './components/Header';
import { MapScreen } from './components/MapScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SavedScreen } from './components/SavedScreen';
import { SearchOverlay } from './components/SearchOverlay';
import { SettingsScreen } from './components/SettingsScreen';
import { provinceById } from './data/provinces';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSettlementCatalog } from './hooks/useSettlementCatalog';
import { useTelegram } from './hooks/useTelegram';
import { I18nProvider, localeByLanguage } from './i18n';
import { clearSettlementCache } from './lib/settlements';
import type { City, MapMode, NavTab, ProvinceId } from './types/domain';
import { defaultAtlasPreferences, type AtlasPreferences } from './types/preferences';

const tabPaths: Record<NavTab, string> = {
  map: '/map',
  browse: '/browse',
  saved: '/saved',
  profile: '/profile',
};

function tabFromPath(pathname: string): NavTab {
  if (pathname.startsWith('/browse')) return 'browse';
  if (pathname.startsWith('/saved')) return 'saved';
  if (pathname.startsWith('/profile') || pathname.startsWith('/settings')) return 'profile';
  return 'map';
}

export default function App() {
  const telegram = useTelegram();
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = tabFromPath(location.pathname);
  const [mapMode, setMapMode] = useState<MapMode>('provinces');
  const [selectedProvinceId, setSelectedProvinceId] = useState<ProvinceId>('aghdznik');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedIds, setSavedIds] = useLocalStorage<ProvinceId[]>('armenian-atlas:saved-provinces', []);
  const [visitedIds, setVisitedIds] = useLocalStorage<ProvinceId[]>('armenian-atlas:visited-provinces', []);
  const [storedPreferences, setPreferences] = useLocalStorage<AtlasPreferences>('armenian-atlas:preferences', defaultAtlasPreferences);
  const preferences: AtlasPreferences = { ...defaultAtlasPreferences, ...storedPreferences };
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const settlementCatalog = useSettlementCatalog(mapMode === 'cities' || searchOpen || activeTab === 'map');

  useEffect(() => {
    if (!storedPreferences.language) {
      setPreferences((current) => ({ ...defaultAtlasPreferences, ...current }));
    }
  }, [setPreferences, storedPreferences.language]);

  useEffect(() => {
    document.documentElement.lang = localeByLanguage[preferences.language];
    document.documentElement.dir = 'ltr';
  }, [preferences.language]);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme = preferences.appearance === 'system'
    ? (systemDark ? 'dark' : 'light')
    : preferences.appearance;

  useEffect(() => {
    const dark = resolvedTheme === 'dark';
    telegram?.setHeaderColor?.(dark ? '#211518' : '#f8f3ea');
    telegram?.setBackgroundColor?.(dark ? '#140b0e' : '#f8f3ea');
    telegram?.setBottomBarColor?.(dark ? '#211518' : '#fbf8f2');
  }, [resolvedTheme, telegram]);

  const haptic = useCallback((style: 'light' | 'medium' = 'light') => {
    if (preferences.haptics) telegram?.HapticFeedback?.impactOccurred(style);
  }, [preferences.haptics, telegram]);

  const visitProvince = useCallback((id: ProvinceId) => {
    setVisitedIds((current) => current.includes(id) ? current : [...current, id]);
  }, [setVisitedIds]);

  useEffect(() => {
    if (activeTab === 'map') visitProvince(selectedProvinceId);
  }, [activeTab, selectedProvinceId, visitProvince]);

  const openProvince = useCallback((id: ProvinceId) => {
    setSelectedProvinceId(id);
    setSelectedCity(null);
    visitProvince(id);
    navigate('/map');
    setSearchOpen(false);
    haptic('light');
  }, [haptic, navigate, visitProvince]);

  const openCity = useCallback((city: City) => {
    setSelectedProvinceId(city.provinceId);
    setSelectedCity(city);
    setMapMode('cities');
    visitProvince(city.provinceId);
    navigate('/map');
    setSearchOpen(false);
    haptic('medium');
  }, [haptic, navigate, visitProvince]);

  const toggleSaved = useCallback((id: ProvinceId) => {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    if (preferences.haptics) telegram?.HapticFeedback?.notificationOccurred('success');
  }, [preferences.haptics, setSavedIds, telegram]);

  const navigateTab = useCallback((tab: NavTab) => {
    navigate(tabPaths[tab]);
    setSearchOpen(false);
    haptic();
  }, [haptic, navigate]);

  const province = provinceById[selectedProvinceId];
  const transition = useMemo(() => preferences.reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: 'easeOut' as const }, [preferences.reduceMotion]);

  return (
    <I18nProvider language={preferences.language}>
      <MotionConfig reducedMotion={preferences.reduceMotion ? 'always' : 'user'}>
        <div
          className="relative mx-auto flex h-dvh min-h-[560px] w-full max-w-[460px] flex-col overflow-hidden bg-atlas-shell text-atlas-ink shadow-[0_0_0_1px_rgba(65,38,47,0.09),0_38px_120px_rgba(48,28,36,0.24)] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(var(--atlas-paper-grid)_1px,transparent_1px),linear-gradient(90deg,var(--atlas-paper-grid)_1px,transparent_1px)] before:bg-[size:32px_32px] before:content-[''] min-[720px]:mt-[12px] min-[720px]:h-[min(950px,calc(100dvh-24px))] min-[720px]:rounded-[38px] dark:shadow-[0_0_0_1px_rgba(255,240,225,0.055),0_44px_130px_rgba(0,0,0,0.66)]"
          data-theme={resolvedTheme}
          data-language={preferences.language}
          data-reduce-motion={preferences.reduceMotion}
        >
          <Header
            savedCount={savedIds.length}
            onBrand={() => navigateTab('map')}
            onSearch={() => setSearchOpen(true)}
            onSaved={() => navigateTab('saved')}
          />
          <div className="relative z-[1] min-h-0 flex-1 overflow-hidden before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[2] before:h-10 before:bg-gradient-to-b before:from-atlas-shell/35 before:to-transparent">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                className="relative h-full min-h-0 w-full"
                initial={{ opacity: 0, x: preferences.reduceMotion ? 0 : activeTab === 'map' ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: preferences.reduceMotion ? 0 : activeTab === 'saved' ? 12 : -12 }}
                transition={transition}
              >
                <Routes location={location}>
                  <Route
                    path="/map"
                    element={(
                      <MapScreen
                        mode={mapMode}
                        onMode={(mode) => { setMapMode(mode); haptic(); }}
                        province={province}
                        selectedCity={selectedCity}
                        settlements={settlementCatalog.places}
                        settlementStatus={settlementCatalog.status}
                        settlementError={settlementCatalog.error}
                        sourceTimestamp={settlementCatalog.sourceTimestamp}
                        onRefreshSettlements={settlementCatalog.refresh}
                        saved={savedIds.includes(province.id)}
                        onProvince={openProvince}
                        onCity={openCity}
                        onToggleSaved={() => toggleSaved(province.id)}
                        showMapLabels={preferences.showMapLabels}
                        showModernNames={preferences.showModernNames}
                      />
                    )}
                  />
                  <Route path="/browse" element={<BrowseScreen onOpen={openProvince} />} />
                  <Route path="/saved" element={<SavedScreen savedIds={savedIds} onOpen={openProvince} onToggle={toggleSaved} />} />
                  <Route
                    path="/profile"
                    element={(
                      <ProfileScreen
                        user={telegram?.initDataUnsafe?.user}
                        savedIds={savedIds}
                        visitedIds={visitedIds}
                        onOpenProvince={openProvince}
                        onOpenSaved={() => navigateTab('saved')}
                        onOpenSettings={() => navigate('/settings')}
                      />
                    )}
                  />
                  <Route
                    path="/settings"
                    element={(
                      <SettingsScreen
                        preferences={preferences}
                        onChange={setPreferences}
                        onBack={() => navigate('/profile')}
                        onClearCache={() => {
                          clearSettlementCache();
                          settlementCatalog.refresh();
                        }}
                        onResetAtlas={() => {
                          setSavedIds([]);
                          setVisitedIds([]);
                        }}
                      />
                    )}
                  />
                  <Route path="/" element={<Navigate replace to="/map" />} />
                  <Route path="*" element={<Navigate replace to="/map" />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
          <BottomNav active={activeTab} onChange={navigateTab} />
          <SearchOverlay
            open={searchOpen}
            settlements={settlementCatalog.places}
            settlementStatus={settlementCatalog.status}
            onClose={() => setSearchOpen(false)}
            onProvince={openProvince}
            onCity={openCity}
            showModernNames={preferences.showModernNames}
          />
        </div>
      </MotionConfig>
    </I18nProvider>
  );
}
