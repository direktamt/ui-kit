# DirektAmt: Logo and identity specification

## Locked brand values

- Brand name: **DirektAmt**, with uppercase D and A.
- Primary navy: **#192434** (RGB 25, 36, 52).
- Accent blue: **#5A91EB** (RGB 90, 145, 235).
- Typeface: **Inter Display Bold, 700**.
- Wordmark: “Direkt” in navy and “Amt” in accent blue.
- On dark surfaces: use the reversed variant (white + blue), or all-white where one-color is required.
- No gradient, drop shadow, outline, blur, or other decorative effects.

## Files

- `direktamt-logo-primary.svg`: primary horizontal vector lockup, glyphs converted to paths.
- `direktamt-logo-reversed.svg`: reversed horizontal vector lockup for dark backgrounds.
- `direktamt-logo-navy.svg`: one-color navy lockup.
- `direktamt-logo-white.svg`: one-color white lockup.
- `direktamt-logo-*-editable.svg`: same lockups, with editable Inter Display text.
- `direktamt-icon-*.svg`: icon-only exports sharing **exactly the same master icon paths** as every horizontal lockup.
- `favicon.svg`: vector favicon, identical icon paths with margin.
- `favicon-16.png`, `favicon-32.png`, `favicon-64.png`, `favicon.ico`: browser exports.
- `direktamt-logo-primary.png`, `direktamt-icon-primary-1024.png`, `direktamt-icon-white-512.png`: convenience PNGs.
- `direktamt-avatar.svg`, `direktamt-avatar-1024.png`: square avatar for GitHub and other profile images, reversed icon on a navy tile with 15 % margin.
- `preview.png`: overview of the primary, reversed, icon-only and one-color white variants.

## Implementation

```css
:root {
  --brand-navy: #192434;
  --brand-blue: #5A91EB;
  --brand-font-family: 'Inter Display', sans-serif;
  --brand-font-weight: 700;
}
```

The outlined SVGs are font-independent, making them preferable for production usage. The editable text versions require installing Inter Display Bold locally for identical rendering. The font is not included in this kit.
