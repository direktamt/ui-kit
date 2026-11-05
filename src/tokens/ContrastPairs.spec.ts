import { describe, expect, it } from 'vitest';
import { brandColors } from './ColorTokens.js';
import { listContrastPairs } from './ContrastPairs.js';
import { contrastRatio } from './ContrastRatio.js';

describe('contrastRatio', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
    expect(contrastRatio(brandColors.blue, '#FFFFFF')).toBeCloseTo(3.14, 2);
  });
});

describe('theme colour pairs', () => {
  const pairs = listContrastPairs().map((pair) => ({
    ...pair,
    label: `${pair.scheme}: ${pair.usage} (${pair.foreground} on ${pair.background}) ${pair.ratio.toFixed(2)}:1`,
  }));

  it.each(pairs)('$label', ({ ratio, minimum }) => {
    expect(ratio).toBeGreaterThanOrEqual(minimum);
  });
});
