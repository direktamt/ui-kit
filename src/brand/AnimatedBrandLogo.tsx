import Box from '@mui/material/Box';
import {
  keyframes,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material/styles';
import type { AnimationEvent } from 'react';
import {
  resolveBrandMarkColors,
  type BrandMarkVariant,
} from './BrandColors.js';
import { brandPaths, LOGO_VIEW_BOX, wordmarkGlyphs } from './BrandPaths.js';

export interface AnimatedBrandLogoProps {
  variant?: BrandMarkVariant;
  /** Rendered height; the width follows the 1530:256 aspect ratio. */
  height?: number | string;
  /** Accessible name. */
  title?: string;
  /**
   * Called once when the intro has finished; right away under reduced
   * motion.
   */
  onFinish?: () => void;
  sx?: SxProps<Theme>;
}

// Timeline in milliseconds.
const TYPING_START = 300;
const LETTER_INTERVAL = 145;
const TYPING_END = TYPING_START + wordmarkGlyphs.length * LETTER_INTERVAL;
const SETTLE = 800;
const CONTOUR_END = TYPING_END + SETTLE;
const FADE = 300;

// Contour run, in outline lengths (the outlines use pathLength="1").
const SNAKE_LENGTH = 0.3;
const SNAKE_SPEED = 1.15 / 1000;
/** Position of the seam (194, 64), where both icon parts meet, on each outline. */
const SEAM = { base: 0.2434, accent: 0 };

const EASE_OUT_CUBIC = 'cubic-bezier(0.33, 1, 0.68, 1)';

function at(ms: number): string {
  return `${((ms / CONTOUR_END) * 100).toFixed(2)}%`;
}

/**
 * The outline grows from the seam, runs along the contour while the wordmark
 * types and closes once the last letter is in.
 */
function contourRun(seam: number) {
  const start = -seam;
  const end = -(seam + SNAKE_SPEED * TYPING_END - SNAKE_LENGTH);
  const snake = `${SNAKE_LENGTH} ${1 - SNAKE_LENGTH}`;
  return keyframes`
    0% { stroke-dasharray: 0 1; stroke-dashoffset: ${start}; }
    ${at(SNAKE_LENGTH / SNAKE_SPEED)} {
      stroke-dasharray: ${snake};
      stroke-dashoffset: ${start};
    }
    ${at(TYPING_END)} {
      stroke-dasharray: ${snake};
      stroke-dashoffset: ${end.toFixed(4)};
      animation-timing-function: ${EASE_OUT_CUBIC};
    }
    100% { stroke-dasharray: 1 0; stroke-dashoffset: ${end.toFixed(4)}; }
  `;
}

const fillIn = keyframes`from { fill-opacity: 0; } to { fill-opacity: 1; }`;
const strokeOut = keyframes`from { stroke-opacity: 1; } to { stroke-opacity: 0; }`;
const letterIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

function contourAnimation(seam: number): string {
  return [
    `${contourRun(seam)} ${CONTOUR_END}ms linear both`,
    `${fillIn} ${FADE}ms linear ${CONTOUR_END}ms both`,
    `${strokeOut} ${FADE}ms linear ${CONTOUR_END + FADE / 2}ms both`,
  ].join(', ');
}

const introStyles = {
  '& [data-contour]': {
    strokeWidth: 10,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeOpacity: 0,
  },
  '& [data-contour="base"]': { animation: contourAnimation(SEAM.base) },
  '& [data-contour="accent"]': { animation: contourAnimation(SEAM.accent) },
  ...Object.fromEntries(
    wordmarkGlyphs.map((_, index) => [
      `& [data-letter="${index}"]`,
      {
        animation: `${letterIn} ${TYPING_START + (index + 1) * LETTER_INTERVAL}ms step-end both`,
      },
    ]),
  ),
  '@media (prefers-reduced-motion: reduce)': {
    '& *': {
      animationDuration: '1ms !important',
      animationDelay: '0ms !important',
    },
  },
};

/**
 * Horizontal DirektAmt lockup with a one-time intro: both icon outlines grow
 * from the seam where the parts meet and run along their contour while the
 * wordmark types letter by letter; with the last letter they close and
 * fill. The intro plays on mount; remount (for example with a new `key`) to
 * replay it. The brand marks are not covered by the code licence.
 */
export function AnimatedBrandLogo({
  variant = 'adaptive',
  height = 24,
  title = 'DirektAmt',
  onFinish,
  sx,
}: AnimatedBrandLogoProps) {
  const colors = resolveBrandMarkColors(variant, useTheme());

  const handleAnimationEnd = (event: AnimationEvent<SVGPathElement>) => {
    if (event.animationName === strokeOut.name) onFinish?.();
  };

  return (
    <Box
      component="svg"
      viewBox={LOGO_VIEW_BOX}
      role="img"
      aria-label={title}
      sx={[
        {
          height,
          width: 'auto',
          display: 'block',
          flexShrink: 0,
          overflow: 'visible',
        },
        introStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <path
        data-contour="base"
        pathLength={1}
        fill={colors.ink}
        stroke={colors.ink}
        d={brandPaths.iconBase}
      />
      <path
        data-contour="accent"
        pathLength={1}
        fill={colors.accent}
        stroke={colors.accent}
        d={brandPaths.iconAccent}
        onAnimationEnd={handleAnimationEnd}
      />
      {wordmarkGlyphs.map((glyph, index) => (
        <path
          key={index}
          data-letter={index}
          fill={glyph.tone === 'ink' ? colors.ink : colors.accent}
          d={glyph.d}
        />
      ))}
    </Box>
  );
}
