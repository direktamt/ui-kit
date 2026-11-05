import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useId, type ReactNode } from 'react';

export interface SectionCardProps {
  title?: ReactNode;
  description?: ReactNode;
  /** Controls aligned to the end of the header. */
  actions?: ReactNode;
  /** Content flush with the card edges, e.g. a table. */
  disablePadding?: boolean;
  /** Footer below the content, separated by a hairline. */
  footer?: ReactNode;
  /** Heading level of the title. */
  headingComponent?: 'h2' | 'h3' | 'h4';
  children?: ReactNode;
}

/**
 * Titled region of a page on a bordered surface.
 */
export function SectionCard({
  title,
  description,
  actions,
  disablePadding = false,
  footer,
  headingComponent = 'h2',
  children,
}: SectionCardProps) {
  const titleId = useId();
  const hasHeader = Boolean(title || description || actions);

  return (
    <Paper
      variant="outlined"
      component="section"
      aria-labelledby={title ? titleId : undefined}
      sx={{ borderRadius: 3, overflow: 'hidden' }}
    >
      {hasHeader && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{
            justifyContent: 'space-between',
            alignItems: { sm: 'flex-start' },
            paddingInline: { xs: 2, sm: 2.5 },
            paddingTop: 2.25,
            paddingBottom: disablePadding || !children ? 2.25 : 0,
            borderBottom: disablePadding && children ? '1px solid' : 'none',
            borderColor: 'border.subtle',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            {title && (
              <Typography
                id={titleId}
                variant="h5"
                component={headingComponent}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', marginTop: 0.5 }}
              >
                {description}
              </Typography>
            )}
          </Box>
          {actions && (
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              {actions}
            </Stack>
          )}
        </Stack>
      )}
      {children && (
        <Box
          sx={
            disablePadding
              ? undefined
              : { paddingInline: { xs: 2, sm: 2.5 }, paddingBlock: 2.25 }
          }
        >
          {children}
        </Box>
      )}
      {footer && (
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'border.subtle',
            paddingInline: { xs: 2, sm: 2.5 },
            paddingBlock: 1.5,
          }}
        >
          {footer}
        </Box>
      )}
    </Paper>
  );
}
