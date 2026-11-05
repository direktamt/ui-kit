# DirektAmt UI kit: Agent Instructions

## What this project is

`@direktamt/ui-kit` is the public React UI kit of DirektAmt frontends: design
tokens, a Material UI theme, the brand marks and a few layout components. It
is a thin layer over Material UI, not a component library of its own.
Applications import Material UI components directly; the theme styles them.

Layout: `src/tokens/` (colours, typography, layout, contrast checks),
`src/theme/` (theme factory, component overrides, provider, RTL cache),
`src/brand/` (logo, icon, lockup), `src/components/` (shell and page
building blocks), `src/icons/` (inlined icons), `src/index.ts` (the only
public entry point besides `src/Fonts.ts`), `playground/` (local Vite
preview, not published), `scripts/` (build helpers), `assets/` (the
brand kit, published, specified in `assets/README.md`; the single source
of the brand).

## Hard conventions

1. **English only.** Identifiers, file names, comments, docs and default UI
   labels are English. Components with visible text accept a `labels` prop
   so that applications can translate it.
2. **Java-style file naming.** One main component, class or module per
   file, named after it in PascalCase (`AppShell.tsx`, `ColorTokens.ts`).
   Tests are `<Name>.spec.ts` next to the code. No `utils.ts` or
   `types.ts`; `src/index.ts` is the only barrel.
3. **Material UI first.** Style Material UI components through
   `src/theme/ComponentOverrides.ts` instead of wrapping them. Add an own
   component only when at least two applications need the same composition
   of several Material UI components. Material UI and Emotion stay peer
   dependencies; do not add `@mui/icons-material` (inline icons in
   `src/icons/KitIcons.tsx`).
4. **Tokens are the only colour source.** Colours live in
   `src/tokens/ColorTokens.ts`. Components use theme palette keys
   (`text.secondary`, `border.subtle`, `primary.subtle`), never hex values.
   The locked brand values (`#192434`, `#5A91EB`) are for the brand marks
   only.
5. **Accessibility is tested.** Every new foreground/background combination
   the theme renders gets an entry in `src/tokens/ContrastPairs.ts`; text
   needs 4.5:1, control borders and focus rings 3:1. Keep the focus ring
   visible; never remove outlines without a replacement.
6. **Flat look.** No shadows, elevation or ripple; borders separate
   surfaces. Buttons are sentence case. Radii and spacing come from
   `src/tokens/LayoutTokens.ts`.
7. **Both schemes and both directions.** Use `theme.vars` (through the
   `palette()` helper in overrides) or `sx` palette keys so styles follow
   the colour scheme. Prefer logical CSS properties (`marginInlineStart`,
   `borderInlineEnd`). Check changes in the playground in light, dark, LTR
   and RTL.
8. **Public package.** No credentials, no absolute local paths, no
   references to unreleased DirektAmt products. The brand marks are not
   covered by the code licence; keep the README notice when touching
   `assets/` or `src/brand/`.

## Commands

```bash
npm run dev        # playground
npm run check      # lint, Prettier, typecheck, tests, build
npm test           # contrast checks with measured ratios
npm pack --dry-run # published file list
```

Versioning follows semver. A release is a `v<version>` tag on `master`; the
`Release` workflow publishes it. Never publish from a local machine.
