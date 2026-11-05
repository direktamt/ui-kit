import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { MenuIcon } from '../icons/KitIcons.js';
import { layout } from '../tokens/LayoutTokens.js';
import { AppShellContext } from './AppShellContext.js';

export interface AppShellLabels {
  /** Accessible name of the mobile menu button. */
  openNavigation: string;
  /** Accessible name of the navigation landmark. */
  navigation: string;
}

export interface AppShellProps {
  /** Left part of the header, usually a `ProductLockup`. */
  brand: ReactNode;
  /** Right part of the header: colour-scheme toggle, links, status. */
  headerActions?: ReactNode;
  /** Side navigation, usually a `NavigationList`. */
  navigation?: ReactNode;
  /** Content below the navigation, e.g. version or environment. */
  navigationFooter?: ReactNode;
  children: ReactNode;
  /** Maximum width of the content column in pixels; `false` for full width. */
  contentMaxWidth?: number | false;
  labels?: Partial<AppShellLabels>;
}

const DEFAULT_LABELS: AppShellLabels = {
  openNavigation: 'Open navigation',
  navigation: 'Main navigation',
};

/**
 * Application frame: sticky header, side navigation (permanent from the
 * `md` breakpoint, a drawer below it) and a centred content column.
 */
export function AppShell({
  brand,
  headerActions,
  navigation,
  navigationFooter,
  children,
  contentMaxWidth = layout.contentMaxWidth,
  labels,
}: AppShellProps) {
  const text = { ...DEFAULT_LABELS, ...labels };
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeNavigation = useCallback(() => setMobileOpen(false), []);
  const context = useMemo(() => ({ closeNavigation }), [closeNavigation]);

  const navigationContent = navigation && (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 1.5,
        gap: 2,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{navigation}</Box>
      {navigationFooter}
    </Box>
  );

  return (
    <AppShellContext.Provider value={context}>
      <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
        <AppBar position="sticky">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: layout.headerHeight },
              paddingInline: { xs: 1.5, md: 3 },
              gap: 1,
            }}
          >
            {navigation && (
              <IconButton
                edge="start"
                aria-label={text.openNavigation}
                onClick={() => setMobileOpen(true)}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              {brand}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {headerActions && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {headerActions}
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex' }}>
          {navigation && (
            <>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={closeNavigation}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { md: 'none' },
                  '& .MuiDrawer-paper': {
                    width: layout.navigationWidth + 32,
                    paddingTop: 1,
                  },
                }}
              >
                <Box
                  component="nav"
                  aria-label={text.navigation}
                  sx={{ height: '100%' }}
                >
                  {navigationContent}
                </Box>
              </Drawer>
              <Box
                component="nav"
                aria-label={text.navigation}
                sx={{
                  display: { xs: 'none', md: 'block' },
                  width: layout.navigationWidth,
                  flexShrink: 0,
                  position: 'sticky',
                  top: layout.headerHeight,
                  height: `calc(100dvh - ${layout.headerHeight}px)`,
                  overflowY: 'auto',
                  borderInlineEnd: '1px solid',
                  borderColor: 'border.subtle',
                  bgcolor: 'background.paper',
                }}
              >
                {navigationContent}
              </Box>
            </>
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              paddingInline: { xs: 2, sm: 3, lg: 5 },
              paddingBlock: { xs: 3, md: 5 },
            }}
          >
            <Box
              sx={{
                maxWidth: contentMaxWidth === false ? 'none' : contentMaxWidth,
                marginInline: 'auto',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShellContext.Provider>
  );
}
