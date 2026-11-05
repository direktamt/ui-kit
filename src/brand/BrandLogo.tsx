import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  resolveBrandMarkColors,
  type BrandMarkVariant,
} from './BrandColors.js';
import { brandPaths, LOGO_VIEW_BOX } from './BrandPaths.js';

export interface BrandLogoProps {
  variant?: BrandMarkVariant;
  /** Rendered height; the width follows the 1530:256 aspect ratio. */
  height?: number | string;
  /** Accessible name. */
  title?: string;
  sx?: SxProps<Theme>;
}

/**
 * Horizontal DirektAmt lockup (icon and wordmark) from the outlined brand
 * paths. The brand marks are not covered by the code licence.
 */
export function BrandLogo({
  variant = 'adaptive',
  height = 24,
  title = 'DirektAmt',
  sx,
}: BrandLogoProps) {
  const colors = resolveBrandMarkColors(variant, useTheme());

  return (
    <Box
      component="svg"
      viewBox={LOGO_VIEW_BOX}
      role="img"
      aria-label={title}
      sx={[
        { height, width: 'auto', display: 'block', flexShrink: 0 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <path fill={colors.ink} d={brandPaths.iconBase} />
      <path fill={colors.accent} d={brandPaths.iconAccent} />
      <path fill={colors.ink} d={brandPaths.wordmarkDirekt} />
      <path fill={colors.accent} d={brandPaths.wordmarkAmt} />
    </Box>
  );
}
