import type { Components, CSSObject, Theme } from '@mui/material/styles';
import type { ElementType } from 'react';
import { radius } from '../tokens/LayoutTokens.js';
import { fontFamilies } from '../tokens/TypographyTokens.js';

type Intent = 'primary' | 'info' | 'success' | 'warning' | 'error';
type Severity = 'info' | 'success' | 'warning' | 'error';

const INTENTS: Intent[] = ['primary', 'info', 'success', 'warning', 'error'];
const SEVERITIES: Severity[] = ['info', 'success', 'warning', 'error'];

/** Scheme-aware palette: CSS variables when they are enabled. */
function palette(theme: Theme) {
  return (theme.vars ?? theme).palette;
}

function focusRing(theme: Theme): CSSObject {
  return {
    outline: `2px solid ${palette(theme).border.focus}`,
    outlineOffset: 2,
  };
}

function floatingPaper(theme: Theme): CSSObject {
  return {
    border: `1px solid ${palette(theme).border.subtle}`,
    borderRadius: radius.md,
    backgroundImage: 'none',
  };
}

/**
 * Component defaults and style overrides: flat, bordered surfaces, no
 * ripple and no elevation, a visible focus ring, sentence-case buttons.
 */
export function createComponentOverrides(
  linkComponent?: ElementType,
): Components<Omit<Theme, 'components'>> {
  return {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => ({
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
        body: {
          fontOpticalSizing: 'auto',
        },
        'code, kbd, pre, samp': {
          fontFamily: fontFamilies.mono,
        },
        '::selection': {
          backgroundColor: palette(theme).primary.subtle,
          color: palette(theme).primary.subtleText,
        },
      }),
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        ...(linkComponent ? { LinkComponent: linkComponent } : {}),
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-focusVisible': focusRing(theme),
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.md,
          boxShadow: 'none',
          whiteSpace: 'nowrap',
          '&:hover, &:active': { boxShadow: 'none' },
          variants: [
            {
              props: { size: 'small' },
              style: { minHeight: 32, padding: '4px 12px' },
            },
            {
              props: { size: 'medium' },
              style: { minHeight: 40, padding: '8px 16px' },
            },
            {
              props: { size: 'large' },
              style: {
                minHeight: 48,
                padding: '12px 22px',
                fontSize: '0.9375rem',
              },
            },
            {
              props: { variant: 'outlined' },
              style: {
                borderColor: palette(theme).border.subtle,
                backgroundColor: palette(theme).background.paper,
                '&:hover': {
                  borderColor: palette(theme).border.control,
                  backgroundColor: palette(theme).surface.hover,
                },
              },
            },
            {
              props: { variant: 'outlined', color: 'inherit' },
              style: { color: palette(theme).text.primary },
            },
            ...INTENTS.map((intent) => ({
              props: { variant: 'text' as const, color: intent },
              style: {
                '&:hover': { backgroundColor: palette(theme)[intent].subtle },
              },
            })),
          ],
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.md,
          '&:hover': { backgroundColor: palette(theme).surface.hover },
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          variants: [
            {
              props: { variant: 'outlined' },
              style: { borderColor: palette(theme).border.subtle },
            },
          ],
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': { paddingBottom: 20 },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'inherit',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: palette(theme).background.paper,
          color: palette(theme).text.primary,
          borderBottom: `1px solid ${palette(theme).border.subtle}`,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundImage: 'none',
          borderColor: palette(theme).border.subtle,
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({ ...floatingPaper(theme), marginTop: 4 }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ theme }) => ({ ...floatingPaper(theme), marginTop: 4 }),
        listbox: {
          padding: 4,
          '& .MuiAutocomplete-option': {
            borderRadius: radius.sm,
            minHeight: 36,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: { padding: 4 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body2,
          borderRadius: radius.sm,
          minHeight: 36,
          gap: 8,
          '&:hover': { backgroundColor: palette(theme).surface.hover },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: palette(theme).primary.subtle,
            color: palette(theme).primary.subtleText,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          ...floatingPaper(theme),
          borderRadius: radius.lg,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.h5,
          padding: '20px 24px 12px',
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '12px 24px',
          borderTop: `1px solid ${palette(theme).border.subtle}`,
        }),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          '&:not(.MuiBackdrop-invisible)': {
            backgroundColor: 'rgba(14, 20, 29, 0.48)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.md,
          backgroundColor: palette(theme).background.paper,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette(theme).border.control,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: palette(theme).border.subtle,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: palette(theme).text.secondary,
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginInline: 2,
          marginTop: 4,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: ({ theme }) => theme.typography.body2,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: palette(theme).border.control,
          borderRadius: radius.sm,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.sm,
          fontWeight: 500,
          variants: [
            {
              props: { variant: 'filled', color: 'default' },
              style: {
                backgroundColor: palette(theme).surface.inset,
                color: palette(theme).text.primary,
              },
            },
            {
              props: { variant: 'outlined', color: 'default' },
              style: { borderColor: palette(theme).border.subtle },
            },
            ...INTENTS.map((intent) => ({
              props: { variant: 'outlined' as const, color: intent },
              style: {
                borderColor: palette(theme)[intent].subtleBorder,
                backgroundColor: palette(theme)[intent].subtle,
                color: palette(theme)[intent].subtleText,
              },
            })),
          ],
        }),
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          ...theme.typography.caption,
          fontWeight: 500,
          backgroundColor: palette(theme).text.primary,
          color: palette(theme).background.paper,
          borderRadius: radius.sm,
          padding: '6px 10px',
        }),
        arrow: ({ theme }) => ({
          color: palette(theme).text.primary,
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body2,
          borderRadius: radius.md,
          border: '1px solid transparent',
          alignItems: 'flex-start',
          variants: SEVERITIES.flatMap((severity) => {
            const colors = palette(theme)[severity];
            return [
              {
                props: { variant: 'standard' as const, severity },
                style: {
                  backgroundColor: colors.subtle,
                  borderColor: colors.subtleBorder,
                  color: colors.subtleText,
                  '& .MuiAlert-icon': { color: colors.subtleText },
                },
              },
              {
                props: { variant: 'outlined' as const, severity },
                style: {
                  borderColor: colors.subtleBorder,
                  color: colors.subtleText,
                  '& .MuiAlert-icon': { color: colors.subtleText },
                },
              },
              {
                props: { variant: 'filled' as const, severity },
                style: {
                  backgroundColor: colors.main,
                  color: colors.contrastText,
                },
              },
            ];
          }),
        }),
        icon: {
          paddingBlock: 8,
          opacity: 1,
        },
        message: {
          paddingBlock: 8,
        },
        action: {
          paddingTop: 2,
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.subtitle2,
          marginBottom: 2,
        }),
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${palette(theme).border.subtle}`,
          backgroundColor: palette(theme).background.paper,
          '&, &:first-of-type, &:last-of-type': { borderRadius: radius.md },
          '&::before': { display: 'none' },
          '& + &': { marginTop: 8 },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 48,
          paddingInline: 16,
          borderRadius: radius.md,
          '&:hover': { backgroundColor: palette(theme).surface.hover },
        }),
        content: {
          marginBlock: 12,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '4px 16px 16px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body2,
          borderBottom: `1px solid ${palette(theme).border.subtle}`,
          padding: '12px 16px',
          '&.MuiTableCell-sizeSmall': { padding: '10px 16px' },
        }),
        head: ({ theme }) => ({
          ...theme.typography.caption,
          fontWeight: 600,
          color: palette(theme).text.secondary,
          backgroundColor: palette(theme).surface.inset,
          whiteSpace: 'nowrap',
          '&.MuiTableCell-sizeSmall': { paddingBlock: 8 },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiTableRow-hover:hover': {
            backgroundColor: palette(theme).surface.hover,
          },
          '&:last-child > .MuiTableCell-body': { borderBottom: 0 },
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderTop: `1px solid ${palette(theme).border.subtle}`,
          color: palette(theme).text.secondary,
        }),
        toolbar: {
          minHeight: 48,
        },
        displayedRows: ({ theme }) => theme.typography.body2,
        selectLabel: ({ theme }) => theme.typography.body2,
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: radius.md,
          '&:hover': { backgroundColor: palette(theme).surface.hover },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: palette(theme).primary.subtle,
            color: palette(theme).primary.subtleText,
          },
          '&.Mui-selected .MuiListItemIcon-root': {
            color: palette(theme).primary.subtleText,
          },
          '&.Mui-focusVisible': {
            ...focusRing(theme),
            outlineOffset: -2,
            backgroundColor: 'transparent',
          },
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: 32,
          color: palette(theme).text.secondary,
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'always',
        ...(linkComponent ? { component: linkComponent } : {}),
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          textUnderlineOffset: '0.2em',
          textDecorationThickness: '1px',
          textDecorationColor:
            'color-mix(in srgb, currentColor 35%, transparent)',
          '&:hover': { textDecorationColor: 'currentColor' },
          '&.Mui-focusVisible, &:focus-visible': {
            outline: '2px solid currentColor',
            outlineOffset: 2,
            borderRadius: 2,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: palette(theme).border.subtle,
        }),
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: palette(theme).surface.inset,
          borderRadius: radius.sm,
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          height: 4,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: radius.md,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  };
}
