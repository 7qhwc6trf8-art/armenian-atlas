# Tailwind CSS migration — v1.6.0

The full React interface now uses Tailwind CSS v4 utility classes. The earlier component-oriented CSS selectors were removed from the React UI layer.

## Integration

- `tailwindcss` and `@tailwindcss/vite` are pinned in `devDependencies`.
- `vite.config.ts` registers the Tailwind Vite plugin after the React plugin.
- `src/styles.css` starts with `@import "tailwindcss"`.
- Theme values are defined as CSS custom properties and exported through `@theme inline`.
- The custom dark variant targets the app's existing `[data-theme="dark"]` attribute.

## Component migration

Utility classes are used throughout:

- `src/App.tsx`
- `src/components/Header.tsx`
- `src/components/BottomNav.tsx`
- `src/components/MapScreen.tsx`
- `src/components/MapCanvas.tsx`
- `src/components/TerritorySheet.tsx`
- `src/components/BrowseScreen.tsx`
- `src/components/ProvinceCard.tsx`
- `src/components/SavedScreen.tsx`
- `src/components/ProfileScreen.tsx`
- `src/components/SettingsScreen.tsx`
- `src/components/SearchOverlay.tsx`
- `src/components/LogoMark.tsx`

Responsive rules, visual states, typography, spacing, layout, dark-mode variants, and animation utilities are colocated with the JSX they style.

## Deliberate global CSS exceptions

Leaflet creates marker labels and tooltip nodes outside React. Their runtime class names cannot be expressed as JSX `className` utility strings, so the following stay in the Tailwind entry stylesheet:

- Province labels
- Western/Eastern division labels
- City, province, and division tooltips
- Leaflet attribution sizing

The stylesheet also retains global document defaults, Telegram/iOS safe-area variables, reduced-motion overrides, and the settlement loading keyframe.

## Maintenance rule

New React UI should be written with Tailwind utilities. Add global selectors only for third-party DOM that cannot receive utility classes, browser-level defaults, or reusable design tokens.
