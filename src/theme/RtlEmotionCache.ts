import createCache, { type EmotionCache } from '@emotion/cache';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';

let rtlCache: EmotionCache | undefined;

/**
 * Emotion cache that mirrors physical CSS properties for right-to-left
 * layouts. Created once and shared.
 */
export function getRtlEmotionCache(): EmotionCache {
  rtlCache ??= createCache({
    key: 'da-rtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return rtlCache;
}
