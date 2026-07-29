# QA report — v2.1.0 elegant UI

## Redesign coverage

- Rebuilt the visual token system for light and dark themes.
- Reworked the application shell, header, emblem, and floating bottom navigation.
- Rebuilt browse, saved, profile, settings, and global search surfaces.
- Reworked the map mode bar, filters, map chrome, and territory dossier.
- Rebuilt province cards into spacious editorial folio components.
- Preserved React Router paths, five-language support, Telegram Mini App behavior, map logic, saved/visited state, territory measurements, and settlement loading.
- Kept the interface Tailwind CSS v4 utility-first; global CSS remains limited to tokens, document defaults, shared utilities, and Leaflet-generated nodes.

## Validation completed

- Data integrity check passed: 15 measured provinces, 2 measured divisions, 63 curated fallback places, and live current/historical catalog logic.
- All 30 TypeScript and TSX implementation files passed TypeScript parser/transpilation checks.
- The redesigned application components passed strict semantic TypeScript checking with temporary declarations for unavailable third-party packages; Leaflet-heavy data files were syntax-checked separately.
- All relative source imports resolve to existing TypeScript, TSX, JSON, or CSS files.
- All project JSON and GeoJSON files parse successfully.
- Translation keys used by the interface exist, and Armenian, English, Russian, Turkish, and Azerbaijani dictionaries have matching key sets.
- `src/styles.css` parses without CSS syntax errors using `tinycss2`.
- Package version and visible version labels were updated to `2.1.0`.
- ZIP integrity was checked after packaging.

## Build-environment limitation

The internal npm registry returned `404` for required packages including `@eslint/js`, so a dependency-backed `npm install`, ESLint run, and Vite production build could not be executed in this environment.

Run locally or in Vercel:

```bash
npm install
npm run lint
npm run check:data
npm run build
```

## Historical-data caveat

The live catalog represents matching OpenStreetMap records inside the supplied historical boundaries plus the curated fallback. Historical borders and historical-place coverage remain interpretive and should be reviewed by specialist historians before an authoritative scholarly release.
