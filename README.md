# DirektAmt UI kit

`@direktamt/ui-kit` is the shared React UI kit of DirektAmt frontends: design
tokens, a [Material UI](https://mui.com/material-ui/) theme, the brand marks
and a few layout components on top of Material UI.

- **Tokens** in TypeScript and as CSS custom properties (`tokens.css`):
  brand colours, derived blue and neutral scales, light and dark colour
  schemes, type scale, spacing, radii, layout sizes.
- **Theme**: `createDirektAmtTheme()` and `DirektAmtThemeProvider`. Light and
  dark colour schemes through Material UI CSS variables, Inter and Inter
  Display, flat surfaces (no shadows, no ripple), sentence-case buttons,
  visible focus ring, right-to-left support.
- **Brand**: `BrandLogo`, `AnimatedBrandLogo` (one-time intro, static under
  reduced motion), `BrandIcon`, `ProductLockup` and the full brand kit in
  `assets/` (logos, icons, favicons, avatar), specified in
  `assets/README.md`.
- **Components**: `AppShell`, `NavigationList`, `NavigationItem`,
  `PageHeader`, `SectionCard`, `DescriptionList`, `CodeBlock`, `EmptyState`,
  `LoadingState`, `ColorSchemeToggle`.

All other components are plain Material UI components; the theme styles them.

## Install

```bash
npm install @direktamt/ui-kit @mui/material @emotion/react @emotion/styled react react-dom
```

Peer dependencies: React 18.3 or 19, Material UI 9.5 or later 9.x, Emotion 11.
The kit is ESM only and ships its TypeScript declarations.

## Setup

```tsx
import { DirektAmtThemeProvider } from '@direktamt/ui-kit';
import '@direktamt/ui-kit/fonts';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <DirektAmtThemeProvider>
    <App />
  </DirektAmtThemeProvider>,
);
```

- `@direktamt/ui-kit/fonts` loads Inter as a self-hosted variable font
  (weight and optical-size axes) from `@fontsource-variable/inter`; the
  application's bundler serves the files. No third-party font CDN is used.
  Headings use the Inter Display optical size, text uses Inter.
- `DirektAmtThemeProvider` renders the theme, `CssBaseline` and the colour
  scheme. The visitor's choice (`light`, `dark`, `system`) is stored by
  Material UI in `localStorage`; `defaultMode` sets the initial value.
- Router links: pass `linkComponent` (for example a React Router adapter that
  maps `href` to `to`). Buttons, list items and links that receive `href`
  then navigate through the router.
- Right-to-left: `direction="rtl"` sets `dir` on `<html>` and mirrors the
  component styles through an RTL Emotion cache.
- Own theme: `createDirektAmtTheme(options, ...overrides)` merges further
  Material UI theme options on top; pass the result as `theme`.

### Application frame

```tsx
import {
  AppShell,
  ColorSchemeToggle,
  NavigationItem,
  NavigationList,
  PageHeader,
  ProductLockup,
  SectionCard,
} from '@direktamt/ui-kit';

<AppShell
  brand={<ProductLockup product="Integrations" href="/" />}
  headerActions={<ColorSchemeToggle />}
  navigation={
    <NavigationList title="Services">
      <NavigationItem href="/services" label="Services" selected />
    </NavigationList>
  }
>
  <PageHeader overline="Services" title="Search" description="…" />
  <SectionCard title="Results">…</SectionCard>
</AppShell>;
```

### Tokens without Material UI

```css
@import '@direktamt/ui-kit/tokens.css';

.note {
  color: var(--da-color-text-primary);
  background: var(--da-color-background-paper);
  border-radius: var(--da-radius-md);
}
```

The colour variables follow `[data-light]` and `[data-dark]` on `<html>`, the
same selectors the Material UI theme uses, and the system preference when
neither is set. The theme's own variables use the prefix `--da-palette-…`.

## Colours and accessibility

The locked brand values are navy `#192434` and accent blue `#5A91EB`. They
are used for the logo and wordmark only. The accent reaches about 3.1:1 on
white, below the WCAG AA minimum of 4.5:1 for text, so the interface uses a
derived blue scale: `#2A62C9` (primary) and `#2152AD` (hover, text on tinted
backgrounds) on light surfaces, `#8DB4F2` and `#B3CDF6` on dark surfaces.

Every text and background combination of the theme is listed in
`src/tokens/ContrastPairs.ts` and checked by the test suite: at least 4.5:1
for text, 3:1 for form-control borders and the focus ring. `npm test` prints
each pair with its measured ratio; the playground shows the same table.

## Development

```bash
npm install
npm run dev        # playground on http://localhost:5173
npm run check      # lint (ESLint and Prettier), typecheck, tests, build
npm pack --dry-run # files that would be published
```

The playground (`playground/`) is a small Vite app that shows tokens,
typography, components, page building blocks and brand marks in both colour
schemes and both directions. It is not part of the package.

Conventions for contributors and coding agents are in `AGENTS.md`.

## Releases

Releases are published to npm by the `Release` GitHub Actions workflow when a
`v*` tag is pushed. The workflow runs the full check, verifies that the tag
matches `package.json` and publishes with provenance.

## Licence

The code is licensed under the [Apache License 2.0](LICENSE).

**Brand marks are not covered by the code licence.** The DirektAmt name,
logo, icon and favicon (`assets/` and the paths in `src/brand/BrandPaths.ts`)
are brand marks of DirektAmt. They may be used to refer to DirektAmt and in
DirektAmt applications; any other use, modification or use that suggests
endorsement needs permission.
