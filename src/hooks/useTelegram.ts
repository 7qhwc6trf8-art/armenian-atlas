import { useEffect } from 'react';

export function useTelegram(): TelegramWebApp | null {
  const webApp = window.Telegram?.WebApp ?? null;

  useEffect(() => {
    if (!webApp) return;

    webApp.ready();
    webApp.expand();
    webApp.disableVerticalSwipes?.();
    webApp.setHeaderColor?.('#f8f3ea');
    webApp.setBackgroundColor?.('#f8f3ea');
    webApp.setBottomBarColor?.('#fbf8f2');

    const root = document.documentElement;
    const applyInsets = () => {
      const safe = webApp.safeAreaInset;
      const content = webApp.contentSafeAreaInset;
      if (safe) {
        root.style.setProperty('--tg-safe-top', `${safe.top}px`);
        root.style.setProperty('--tg-safe-right', `${safe.right}px`);
        root.style.setProperty('--tg-safe-bottom', `${safe.bottom}px`);
        root.style.setProperty('--tg-safe-left', `${safe.left}px`);
      }
      if (content) {
        root.style.setProperty('--tg-content-safe-top', `${content.top}px`);
        root.style.setProperty('--tg-content-safe-bottom', `${content.bottom}px`);
      }
    };

    applyInsets();
  }, [webApp]);

  return webApp;
}
