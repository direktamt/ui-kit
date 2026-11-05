import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

export interface PageHeaderProps {
  title: ReactNode;
  /** Short context line above the title, e.g. the section or a resource type. */
  overline?: ReactNode;
  description?: ReactNode;
  /** Buttons aligned to the end of the title row. */
  actions?: ReactNode;
  /** Metadata row below the description: chips, identifiers, status. */
  children?: ReactNode;
}

/**
 * Top of a page: overline, `h1` title, description, actions and metadata.
 */
export function PageHeader({
  title,
  overline,
  description,
  actions,
  children,
}: PageHeaderProps) {
  return (
    <Box component="header" sx={{ marginBottom: { xs: 3, md: 4 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { sm: 'flex-start' },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          {overline && (
            <Typography
              variant="overline"
              component="p"
              sx={{ color: 'primary.main', marginBottom: 0.5 }}
            >
              {overline}
            </Typography>
          )}
          <Typography
            variant="h3"
            component="h1"
            sx={{ overflowWrap: 'anywhere' }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body1"
              component="p"
              sx={{ color: 'text.secondary', marginTop: 1, maxWidth: '72ch' }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {actions && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexShrink: 0, flexWrap: 'wrap', rowGap: 1 }}
            useFlexGap
          >
            {actions}
          </Stack>
        )}
      </Stack>
      {children && <Box sx={{ marginTop: 2 }}>{children}</Box>}
    </Box>
  );
}
