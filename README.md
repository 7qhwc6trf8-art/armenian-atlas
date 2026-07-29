# Armenian Heritage Atlas

**Version 2.1.0 — elegant museum-atlas interface**

A premium, mobile-first historical map application for Telegram Mini Apps and iPhone-sized screens. Version 2.1 refines the complete interface into an elegant editorial museum-atlas experience while preserving the map, data, routes, languages, settings, and Telegram integrations.


## Version 2.1 elegant interface

The interface now uses a calmer, more premium visual language inspired by archival folios, Armenian museum catalogues, and modern iOS applications:

- New parchment-and-oxblood design system with antique-gold archival accents
- Refined compact header with edition detail, new emblem treatment, and softer action hierarchy
- Floating navigation dock with restrained active states instead of a full red tab block
- Reworked map command bar, filters, map chrome, labels, and territory dossier
- Editorial province directory with a featured Ayrarat folio and spacious single-column province cards
- Rebuilt saved collection, profile dashboard, settings, and global search surfaces
- Fine hairlines, archival numbering, subtle paper-grid texture, controlled glass effects, and deeper dark mode
- Larger safe touch areas while keeping the UI visually quiet and iPhone-friendly
- All behavior remains Tailwind CSS utility-first, responsive, multilingual, and Telegram Mini App safe-area aware

## Included

- Tailwind CSS v4 utility-first interface using the official Vite plugin
- Interactive OpenStreetMap map rendered with Leaflet
- GeoJSON boundaries for all 15 provinces of Greater Armenia
- True Western Armenia / Eastern Armenia polygon mode generated from the uploaded map coverage
- Western division with 9 province geometries and Eastern division with 6 province geometries
- Separate Armenian-first labels, colors, tooltips, filters, map focus, and internal province outlines
- Province, Western/Eastern, and complete settlement-catalog display modes
- Three settlement filters: **Բոլորը**, **Ներկա**, and **Անցյալ**
- Runtime loading of every OpenStreetMap `place=city` and `place=town` feature located inside the supplied 15-province GeoJSON
- Additional historical-place loading for abandoned, disused, and former cities/towns, historically tagged localities, old-name localities, and archaeological settlements represented in OpenStreetMap
- 63 curated Armenian historical places retained as an offline and editorial fallback
- Armenian-first names, current names, old and alternate names, population where available, and province assignment
- Exact point-in-polygon filtering, so downloaded places outside the historical coverage are discarded
- Search across provinces and the complete loaded settlement catalog
- Clickable polygons and markers, automatic focus, reset, and custom zoom controls
- Animated territory dossier that keeps the map visible
- Saved provinces persisted in `localStorage`
- Telegram Mini App initialization, expansion, safe-area support, and haptic feedback
- Browse and saved screens matching the supplied iPhone visual direction
- URL-based navigation with `react-router-dom` for `/map`, `/browse`, `/saved`, `/profile`, and `/settings`
- Premium profile page with Telegram user data, discovery progress, viewed-province history, saved count, recommendations, and native sharing
- Settings page with system/light/dark appearance, map-label visibility, modern-name visibility, haptic controls, reduced-motion support, cache clearing, and personal-atlas reset
- Five application languages: **Հայերեն (AM), English (EN), Русский (RU), Türkçe (TR), and Azərbaycanca (AZ)**
- Persistent language selection with localized navigation, settings, search, map controls, filters, territory labels, profile, and saved-place flows
- Localized province and Western/Eastern division names, localized number and distance formatting, and English fallback for editorial historical descriptions that do not yet have a translated record
- Refined premium dark appearance with deep brown-black surfaces, burgundy actions, gold accents, high-contrast ivory typography, dark map controls, dossiers, cards, search, profile, and settings
- Browser back/forward navigation and Vercel SPA rewrites for direct route loading
- Structured province descriptions, centers, cantons, geography, present-day places, highlights, and timelines
- Geodesic surface area, boundary perimeter, east–west span, north–south span, and percentage of the mapped 15-province territory for every province
- Surface area and perimeter measurements for the Western and Eastern Armenia division polygons, visible in map labels and tooltips
- Drizzle/SQLite schema starter in `database/`
- Server-side Telegram `initData` validation helper in `server/telegram/`
- Vercel configuration and data-integrity checker

## Tailwind CSS architecture

The React interface has been migrated from the previous large semantic stylesheet to Tailwind utility classes directly in the TSX components. Tailwind is connected through `@tailwindcss/vite`, and `src/styles.css` is now the CSS-first Tailwind entry point.

- `@import "tailwindcss"` loads Tailwind.
- `@theme inline` exposes the atlas color, font, and shadow tokens as utilities such as `bg-atlas-panel`, `text-atlas-ink`, and `shadow-atlas-card`.
- The existing `[data-theme="dark"]` appearance system is connected to Tailwind through a custom `dark` variant.
- Responsive sizing, spacing, typography, layout, hover, focus, dark-mode, and motion states live in component utility classes.
- The remaining global CSS is intentionally limited to document defaults, safe-area behavior, reduced-motion behavior, one loading keyframe, and Leaflet-generated labels/tooltips that are created outside React.
- Tailwind v4 is CSS-first, so this project does not require a `tailwind.config.js` file.

See `TAILWIND_MIGRATION.md` for the migration map and maintenance rules, and `ELEGANT_UI.md` for the version 2.1 design system.

## Complete city and historical-place catalog

The application no longer uses a fixed 63-marker limit. When the map opens, it requests the latest city/town features from multiple public Overpass endpoints, filters them against `historical-provinces.geojson`, assigns each place to its province, merges duplicates with the curated Armenian gazetteer, and stores the result in `localStorage` for 30 days.

The catalog supports:

- **Ներկա** — current cities and towns
- **Անցյալ** — historical, abandoned, ruined, or archaeological urban places
- **Բոլորը** — both groups, including places that have current and historical identities

Names are read in this order: Armenian OpenStreetMap name, historical Armenian name, another Armenian alternate name, and then a generated Armenian-script transliteration. Current, former, official, local, and alternate names remain searchable.

If every Overpass endpoint is temporarily unavailable, the interface continues with the 63 curated places and displays an offline status instead of failing.

## Western / Eastern GeoJSON

`public/data/map-coverage.geojson` contains two non-overlapping features:

- `western` — **Արևմտյան Հայաստան / Western Armenia**, 9 provinces
- `eastern` — **Արևելյան Հայաստան / Eastern Armenia**, 6 provinces

The exact uploaded source is preserved at `public/data/map-coverage-source.geojson`. Its `provinces` coverage feature was partitioned using the 15 province boundaries. The Western and Eastern polygons cover the uploaded outer boundary and do not overlap.

## Territory measurements

Every province and both division features include a `properties.metrics` object containing:

- `areaKm2` — geodesic surface area in square kilometres
- `perimeterKm` — polygon boundary length in kilometres
- `eastWestKm` — approximate maximum bounding-box width
- `northSouthKm` — approximate maximum bounding-box height
- `sharePercent` — percentage of the relevant mapped whole
- `centroid` — geometry centroid in GeoJSON longitude/latitude order

Measurements were calculated from the supplied GeoJSON on the WGS84 ellipsoid and rounded for display. Historical boundaries are interpretive, so these values are cartographic estimates rather than legal, cadastral, or universally accepted historical figures.


## Languages and translation behavior

The selected language is stored in `armenian-atlas:preferences` and is applied immediately without reloading. The app also updates the document locale so screen readers and locale-aware number formatting use the selected language.

The full application interface is translated in Armenian, English, Russian, Turkish, and Azerbaijani. Province names and Western/Eastern division names are localized. The historical editorial database currently stores its long descriptions, landscapes, highlights, and timeline narratives primarily in English, so those fields intentionally fall back to English until specialist translations are added. Armenian names remain available as secondary heritage labels in every non-Armenian language.

## Run locally

```bash
npm install
npm run check:data
npm run dev
```

Open the local URL shown by Vite. For a production test:

```bash
npm run lint
npm run build
npm run preview
```

Node.js 20.19 or newer is required.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Use build command `npm run build`.
4. Use output directory `dist`.
5. Deploy and copy the HTTPS URL.

The browser must be able to reach at least one configured Overpass endpoint to refresh the complete catalog. Cached and curated data remain available when it cannot.

## Connect as a Telegram Mini App

1. Open **@BotFather**.
2. Select your bot and configure its Mini App or menu button.
3. Paste the deployed HTTPS URL.
4. Configure the Mini App name, icon, and splash-screen colors.
5. Validate `Telegram.WebApp.initData` on your server before trusting a Telegram user identity. A validation helper is included at `server/telegram/verifyInitData.ts`.

The Telegram script is loaded before the application entry point in `index.html`. The app calls `ready()`, `expand()`, applies safe-area variables, disables accidental vertical swipes when supported, and uses native haptic feedback.

## Historical-data note

The live catalog means “all matching places currently represented in OpenStreetMap within the supplied boundaries,” not every settlement that ever existed. Historical urban geography is incomplete and sometimes disputed. The 63 curated records and province descriptions are an editorial starting point; period-specific names, jurisdiction, borders, administrative centers, and historical classifications should be reviewed by specialist historians before publication as an authoritative scholarly edition.

See `DATA_SOURCES.md` for data behavior, attribution, and expansion guidance.

## Project structure

```text
armenian-heritage-atlas/
├── public/
│   ├── data/
│   │   ├── historical-provinces.geojson
│   │   ├── map-coverage.geojson
│   │   └── map-coverage-source.geojson
│   ├── favicon.svg
│   └── manifest.webmanifest
├── src/
│   ├── components/
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── data/
│   ├── hooks/
│   │   └── useSettlementCatalog.ts
│   ├── i18n/
│   │   └── index.tsx
│   ├── lib/
│   │   ├── place-utils.ts
│   │   └── settlements.ts
│   ├── types/
│   │   ├── domain.ts
│   │   └── preferences.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css              # Tailwind entry, theme tokens, Leaflet globals
├── database/
├── server/telegram/
├── scripts/check-data.mjs
├── DATA_SOURCES.md
├── TAILWIND_MIGRATION.md
├── vercel.json
└── package.json
```

## Data-integrity check

Run `npm run check:data` to verify the 15 provinces, the 2 Western/Eastern division features, their territory measurements, the minimum 63 curated records, unique IDs, the live city/town query, historical-name queries, boundary filtering, and division membership.
