import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  resolveBrandMarkColors,
  type BrandMarkVariant,
} from './BrandColors.js';
import { brandPaths, ICON_VIEW_BOX } from './BrandPaths.js';

export interface BrandIconProps {
  variant?: BrandMarkVariant;
  /** Rendered height; the width follows the 280:256 aspect ratio. */
  height?: number | string;
  /** Accessible name; pass an empty string for a decorative icon. */
  title?: string;
  sx?: SxProps<Theme>;
}

/**
 * DirektAmt icon mark from the outlined brand paths.
 */
export function BrandIcon({
  variant = 'adaptive',
  height = 24,
  title = 'DirektAmt',
  sx,
}: BrandIconProps) {
  const colors = resolveBrandMarkColors(variant, useTheme());
  const decorative = title === '';

  return (
    <Box
      component="svg"
      viewBox={ICON_VIEW_BOX}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      sx={[
        { height, width: 'auto', display: 'block', flexShrink: 0 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <path fill={colors.ink} d={brandPaths.iconBase} />
      <path fill={colors.accent} d={brandPaths.iconAccent} />
    </Box>
  );
}
