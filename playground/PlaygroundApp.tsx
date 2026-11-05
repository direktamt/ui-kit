import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import {
  AppShell,
  ColorSchemeToggle,
  DirektAmtThemeProvider,
  NavigationItem,
  NavigationList,
  ProductLockup,
} from '../src/index.ts';
import { BrandPage } from './pages/BrandPage.tsx';
import { ColorsPage } from './pages/ColorsPage.tsx';
import { ComponentsPage } from './pages/ComponentsPage.tsx';
import { LayoutPage } from './pages/LayoutPage.tsx';
import { TypographyPage } from './pages/TypographyPage.tsx';

const PAGES = {
  colors: { label: 'Colours', render: () => <ColorsPage /> },
  typography: { label: 'Typography', render: () => <TypographyPage /> },
  components: { label: 'Components', render: () => <ComponentsPage /> },
  layout: { label: 'Layout', render: () => <LayoutPage /> },
  brand: { label: 'Brand', render: () => <BrandPage /> },
} as const;

type PageKey = keyof typeof PAGES;

function readPage(): PageKey {
  const key = window.location.hash.slice(1);
  return key in PAGES ? (key as PageKey) : 'colors';
}

/**
 * Local preview of tokens, theme and components. Not published.
 */
export function PlaygroundApp() {
  const [page, setPage] = useState<PageKey>(readPage);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const onHashChange = () => setPage(readPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <DirektAmtThemeProvider direction={direction}>
      <AppShell
        brand={<ProductLockup product="UI kit" href="#colors" animated />}
        headerActions={
          <>
            <Tooltip title="Toggle text direction">
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() =>
                  setDirection((value) => (value === 'ltr' ? 'rtl' : 'ltr'))
                }
              >
                {direction.toUpperCase()}
              </Button>
            </Tooltip>
            <ColorSchemeToggle />
          </>
        }
        navigation={
          <NavigationList title="Foundations">
            {(Object.keys(PAGES) as PageKey[]).map((key) => (
              <NavigationItem
                key={key}
                href={`#${key}`}
                label={PAGES[key].label}
                selected={page === key}
              />
            ))}
          </NavigationList>
        }
      >
        {PAGES[page].render()}
      </AppShell>
    </DirektAmtThemeProvider>
  );
}
