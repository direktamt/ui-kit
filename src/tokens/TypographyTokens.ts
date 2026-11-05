/**
 * Inter is self-hosted through `@direktamt/ui-kit/fonts` as one variable font
 * with weight and optical-size axes. Text uses the automatic optical size
 * (Inter); headings pin the optical size to 32, which is Inter Display.
 */
export const fontFamilies = {
  sans: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
} as const;

/** `font-variation-settings` that selects the Inter Display optical size. */
export const displayVariation = "'opsz' 32";

/**
 * OpenType features: lowercase l with tail and capital I with serifs, so
 * official keys and identifiers stay unambiguous.
 */
export const textFeatureSettings = "'cv05', 'cv08'";

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export interface TypeStyleToken {
  fontSize: string;
  lineHeight: number;
  fontWeight: number;
  letterSpacing?: string;
  display?: boolean;
}

/**
 * Type scale. Root size 16px; body text is 15px, the dense console default
 * is `body2` at 14px.
 */
export const typeScale = {
  h1: {
    fontSize: '2.25rem',
    lineHeight: 1.15,
    fontWeight: fontWeights.bold,
    letterSpacing: '-0.025em',
    display: true,
  },
  h2: {
    fontSize: '1.75rem',
    lineHeight: 1.2,
    fontWeight: fontWeights.bold,
    letterSpacing: '-0.02em',
    display: true,
  },
  h3: {
    fontSize: '1.5rem',
    lineHeight: 1.25,
    fontWeight: fontWeights.bold,
    letterSpacing: '-0.015em',
    display: true,
  },
  h4: {
    fontSize: '1.25rem',
    lineHeight: 1.3,
    fontWeight: fontWeights.semibold,
    letterSpacing: '-0.01em',
    display: true,
  },
  h5: {
    fontSize: '1.0625rem',
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
    letterSpacing: '-0.005em',
    display: true,
  },
  h6: {
    fontSize: '0.9375rem',
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
    display: true,
  },
  subtitle1: {
    fontSize: '0.9375rem',
    lineHeight: 1.5,
    fontWeight: fontWeights.semibold,
  },
  subtitle2: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    fontWeight: fontWeights.semibold,
  },
  body1: {
    fontSize: '0.9375rem',
    lineHeight: 1.6,
    fontWeight: fontWeights.regular,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.55,
    fontWeight: fontWeights.regular,
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: fontWeights.semibold,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    fontWeight: fontWeights.regular,
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    fontWeight: fontWeights.semibold,
    letterSpacing: '0.04em',
  },
} as const satisfies Record<string, TypeStyleToken>;

export type TypeStyleName = keyof typeof typeScale;
