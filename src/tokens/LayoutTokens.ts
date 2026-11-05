/**
 * Spacing scale in pixels. The Material UI spacing unit stays 8px so that
 * `theme.spacing(n)` and the built-in component paddings keep working; these
 * named steps are what DirektAmt components and layouts use.
 */
export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Corner radii in pixels. */
export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  pill: 999,
} as const;

/** Application shell dimensions in pixels. */
export const layout = {
  headerHeight: 60,
  navigationWidth: 248,
  contentMaxWidth: 1240,
} as const;

/** Breakpoints in pixels, identical to the Material UI defaults. */
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;
