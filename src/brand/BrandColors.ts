import type { Theme } from '@mui/material/styles';
import { brandColors } from '../tokens/ColorTokens.js';

/**
 * Colour variants of the brand marks, as in the brand kit:
 * `adaptive` follows the active colour scheme (primary on light, reversed
 * on dark), the others are fixed.
 */
export type BrandMarkVariant =
  'adaptive' | 'primary' | 'reversed' | 'navy' | 'white';

export interface BrandMarkColors {
  ink: string;
  accent: string;
}

export function resolveBrandMarkColors(
  variant: BrandMarkVariant,
  theme: Theme,
): BrandMarkColors {
  switch (variant) {
    case 'adaptive': {
      const palette = (theme.vars ?? theme).palette;
      return { ink: palette.brand.ink, accent: palette.brand.accent };
    }
    case 'primary':
      return { ink: brandColors.navy, accent: brandColors.blue };
    case 'reversed':
      return { ink: '#FFFFFF', accent: brandColors.blue };
    case 'navy':
      return { ink: brandColors.navy, accent: brandColors.navy };
    case 'white':
      return { ink: '#FFFFFF', accent: '#FFFFFF' };
  }
}
