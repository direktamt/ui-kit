import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, type Theme } from '@mui/material/styles';
import { useEffect, useMemo, type ElementType, type ReactNode } from 'react';
import { createDirektAmtTheme } from './CreateDirektAmtTheme.js';
import { getRtlEmotionCache } from './RtlEmotionCache.js';

export interface DirektAmtThemeProviderProps {
  children: ReactNode;
  /**
   * Text direction. Sets `dir` on `<html>` and, for right-to-left, mirrors
   * component styles through an RTL Emotion cache.
   */
  direction?: 'ltr' | 'rtl';
  /** Initial colour scheme before the visitor picks one. */
  defaultMode?: 'light' | 'dark' | 'system';
  /** Router link for `href` on buttons, list items and links. */
  linkComponent?: ElementType;
  /** Own theme from `createDirektAmtTheme`; replaces the default one. */
  theme?: Theme;
}

/**
 * Root provider of DirektAmt applications: theme with light and dark
 * colour schemes, CSS baseline, direction. The chosen scheme is stored in
 * `localStorage` by Material UI.
 */
export function DirektAmtThemeProvider({
  children,
  direction = 'ltr',
  defaultMode = 'system',
  linkComponent,
  theme,
}: DirektAmtThemeProviderProps) {
  const resolvedTheme = useMemo(
    () => theme ?? createDirektAmtTheme({ direction, linkComponent }),
    [theme, direction, linkComponent],
  );

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  const content = (
    <ThemeProvider
      theme={resolvedTheme}
      defaultMode={defaultMode}
      disableTransitionOnChange
    >
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );

  return direction === 'rtl' ? (
    <CacheProvider value={getRtlEmotionCache()}>{content}</CacheProvider>
  ) : (
    content
  );
}
