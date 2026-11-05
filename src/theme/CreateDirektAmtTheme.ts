import {
  createTheme,
  type PaletteOptions,
  type Shadows,
  type Theme,
  type ThemeOptions,
} from '@mui/material/styles';
import type { ElementType } from 'react';
import {
  colorSchemes,
  type ColorSchemeTokens,
  type IntentColorTokens,
} from '../tokens/ColorTokens.js';
import { breakpoints, radius } from '../tokens/LayoutTokens.js';
import {
  displayVariation,
  fontFamilies,
  fontWeights,
  textFeatureSettings,
  typeScale,
  type TypeStyleToken,
} from '../tokens/TypographyTokens.js';
import { createComponentOverrides } from './ComponentOverrides.js';

/** Prefix of the CSS variables the theme generates (`--da-palette-...`). */
export const CSS_VAR_PREFIX = 'da';

export interface DirektAmtThemeOptions {
  /** Text direction. Right-to-left also needs `DirektAmtThemeProvider`. */
  direction?: 'ltr' | 'rtl';
  /**
   * Router link used when a button, list item or link receives `href`,
   * e.g. a React Router adapter. Defaults to a plain anchor.
   */
  linkComponent?: ElementType;
}

/**
 * Creates the DirektAmt Material UI theme: light and dark colour schemes as
 * CSS variables (`[data-light]` / `[data-dark]` on `<html>`), Inter and Inter
 * Display, flat surfaces without shadows or ripple, own radii.
 * Further theme options are merged on top, in order.
 */
export function createDirektAmtTheme(
  options: DirektAmtThemeOptions = {},
  ...overrides: ThemeOptions[]
): Theme {
  const { direction = 'ltr', linkComponent } = options;

  return createTheme(
    {
      cssVariables: {
        cssVarPrefix: CSS_VAR_PREFIX,
        colorSchemeSelector: 'data',
      },
      colorSchemes: {
        light: { palette: createPalette(colorSchemes.light) },
        dark: { palette: createPalette(colorSchemes.dark) },
      },
      direction,
      breakpoints: { values: breakpoints },
      shape: { borderRadius: radius.md },
      shadows: Array<string>(25).fill('none') as Shadows,
      typography: createTypography(),
      components: createComponentOverrides(linkComponent),
    },
    ...overrides,
  );
}

function createPalette(tokens: ColorSchemeTokens): PaletteOptions {
  return {
    primary: intentColor(tokens.primary),
    secondary: {
      main: tokens.text.secondary,
      dark: tokens.text.primary,
      contrastText: tokens.background.paper,
    },
    info: intentColor(tokens.info),
    success: intentColor(tokens.success),
    warning: intentColor(tokens.warning),
    error: intentColor(tokens.error),
    text: {
      primary: tokens.text.primary,
      secondary: tokens.text.secondary,
      disabled: tokens.text.disabled,
    },
    background: {
      default: tokens.background.default,
      paper: tokens.background.paper,
    },
    divider: tokens.border.subtle,
    brand: { ...tokens.brand },
    surface: {
      inset: tokens.background.inset,
      hover: tokens.hover,
    },
    border: {
      subtle: tokens.border.subtle,
      control: tokens.border.control,
      focus: tokens.focus,
    },
  };
}

function intentColor(tokens: IntentColorTokens) {
  return {
    main: tokens.main,
    dark: tokens.hover,
    contrastText: tokens.contrastText,
    subtle: tokens.subtle,
    subtleBorder: tokens.subtleBorder,
    subtleText: tokens.subtleText,
  };
}

function createTypography(): ThemeOptions['typography'] {
  const variant = ({ display, ...style }: TypeStyleToken) => ({
    ...style,
    ...(display ? { fontVariationSettings: displayVariation } : {}),
  });

  return {
    fontFamily: fontFamilies.sans,
    fontWeightRegular: fontWeights.regular,
    fontWeightMedium: fontWeights.medium,
    fontWeightBold: fontWeights.bold,
    h1: variant(typeScale.h1),
    h2: variant(typeScale.h2),
    h3: variant(typeScale.h3),
    h4: variant(typeScale.h4),
    h5: variant(typeScale.h5),
    h6: variant(typeScale.h6),
    subtitle1: variant(typeScale.subtitle1),
    subtitle2: variant(typeScale.subtitle2),
    body1: variant(typeScale.body1),
    body2: variant(typeScale.body2),
    button: { ...variant(typeScale.button), textTransform: 'none' },
    caption: variant(typeScale.caption),
    overline: { ...variant(typeScale.overline), textTransform: 'none' },
    allVariants: { fontFeatureSettings: textFeatureSettings },
  };
}
