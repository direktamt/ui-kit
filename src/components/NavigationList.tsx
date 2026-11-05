import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useId, type ReactNode } from 'react';

export interface NavigationListProps {
  /** Optional group label above the items. */
  title?: string;
  /** `NavigationItem` elements. */
  children: ReactNode;
}

/**
 * Group of navigation items with an optional label.
 */
export function NavigationList({ title, children }: NavigationListProps) {
  const titleId = useId();

  return (
    <Box>
      {title && (
        <Typography
          id={titleId}
          variant="overline"
          component="div"
          sx={{
            display: 'block',
            color: 'text.secondary',
            paddingInline: 1.5,
            paddingBottom: 0.5,
          }}
        >
          {title}
        </Typography>
      )}
      <List
        disablePadding
        aria-labelledby={title ? titleId : undefined}
        sx={{ display: 'grid', gap: 0.25 }}
      >
        {children}
      </List>
    </Box>
  );
}
