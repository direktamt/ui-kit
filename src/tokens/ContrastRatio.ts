/**
 * WCAG 2.x contrast ratio between two opaque `#RRGGBB` colours.
 */
export function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG 2.x relative luminance of an opaque `#RRGGBB` colour.
 */
export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) {
    throw new Error(`Expected an opaque #RRGGBB colour, got "${hex}".`);
  }
  const [red, green, blue] = match
    .slice(1)
    .map((channel) => linearize(parseInt(channel, 16) / 255));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function linearize(value: number): number {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}
