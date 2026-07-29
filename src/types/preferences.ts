import type { AtlasLanguage } from '../i18n';

export type AppearanceMode = 'system' | 'light' | 'dark';

export interface AtlasPreferences {
  appearance: AppearanceMode;
  language: AtlasLanguage;
  haptics: boolean;
  reduceMotion: boolean;
  showMapLabels: boolean;
  showModernNames: boolean;
}

export const defaultAtlasPreferences: AtlasPreferences = {
  appearance: 'system',
  language: 'am',
  haptics: true,
  reduceMotion: false,
  showMapLabels: true,
  showModernNames: true,
};
