import {
  colorSchemes,
  type ColorSchemeName,
  type ColorSchemeTokens,
} from './ColorTokens.js';
import { contrastRatio } from './ContrastRatio.js';

/** WCAG 2.x AA minimum for normal-size text (1.4.3). */
export const TEXT_MINIMUM = 4.5;
/** WCAG 2.x AA minimum for user-interface boundaries and focus (1.4.11). */
export const NON_TEXT_MINIMUM = 3;

export interface ContrastPair {
  scheme: ColorSchemeName;
  /** Where the theme renders this combination. */
  usage: string;
  foreground: string;
  background: string;
  minimum: number;
  ratio: number;
}

type IntentName = 'primary' | 'info' | 'success' | 'warning' | 'error';

const INTENTS: IntentName[] = [
  'primary',
  'info',
  'success',
  'warning',
  'error',
];

/**
 * Every foreground/background combination the theme renders, per colour
 * scheme. Disabled text is exempt under WCAG 1.4.3 and not listed; the
 * locked brand blue appears only in the logo, which is exempt as well.
 */
export function listContrastPairs(): ContrastPair[] {
  return (Object.keys(colorSchemes) as ColorSchemeName[]).flatMap((scheme) =>
    pairsOf(scheme, colorSchemes[scheme]),
  );
}

function pairsOf(
  scheme: ColorSchemeName,
  tokens: ColorSchemeTokens,
): ContrastPair[] {
  const { background, text, border } = tokens;
  const surfaces: [string, string][] = [
    ['page', background.default],
    ['paper', background.paper],
  ];

  const entries: [string, string, string, number][] = [
    ['Primary text on page', text.primary, background.default, TEXT_MINIMUM],
    ['Primary text on paper', text.primary, background.paper, TEXT_MINIMUM],
    [
      'Primary text on inset (table header, code, chip)',
      text.primary,
      background.inset,
      TEXT_MINIMUM,
    ],
    ['Primary text on hovered row', text.primary, tokens.hover, TEXT_MINIMUM],
    [
      'Secondary text on page',
      text.secondary,
      background.default,
      TEXT_MINIMUM,
    ],
    ['Secondary text on paper', text.secondary, background.paper, TEXT_MINIMUM],
    ['Secondary text on inset', text.secondary, background.inset, TEXT_MINIMUM],
    [
      'Secondary text on hovered row',
      text.secondary,
      tokens.hover,
      TEXT_MINIMUM,
    ],
    ['Tooltip text', background.paper, text.primary, TEXT_MINIMUM],
  ];

  for (const intent of INTENTS) {
    const colors = tokens[intent];
    for (const [surfaceName, surface] of surfaces) {
      entries.push([
        `${intent} text on ${surfaceName}`,
        colors.main,
        surface,
        TEXT_MINIMUM,
      ]);
    }
    entries.push(
      [
        `${intent} contrast text on fill`,
        colors.contrastText,
        colors.main,
        TEXT_MINIMUM,
      ],
      [
        `${intent} contrast text on hovered fill`,
        colors.contrastText,
        colors.hover,
        TEXT_MINIMUM,
      ],
      [
        `${intent} text on subtle background`,
        colors.subtleText,
        colors.subtle,
        TEXT_MINIMUM,
      ],
    );
  }

  for (const [surfaceName, surface] of surfaces) {
    entries.push(
      [
        `Form-control border on ${surfaceName}`,
        border.control,
        surface,
        NON_TEXT_MINIMUM,
      ],
      [`Focus ring on ${surfaceName}`, tokens.focus, surface, NON_TEXT_MINIMUM],
    );
  }

  return entries.map(([usage, foreground, background, minimum]) => ({
    scheme,
    usage,
    foreground,
    background,
    minimum,
    ratio: contrastRatio(foreground, background),
  }));
}
