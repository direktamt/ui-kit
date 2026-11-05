import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

export interface DescriptionListItem {
  label: ReactNode;
  value: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionListItem[];
  /** Width of the label column from the `sm` breakpoint, in pixels. */
  labelWidth?: number;
}

/**
 * Label/value pairs as a semantic description list with hairlines.
 */
export function DescriptionList({
  items,
  labelWidth = 200,
}: DescriptionListProps) {
  return (
    <Box component="dl" sx={{ margin: 0 }}>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: `${labelWidth}px 1fr` },
            columnGap: 3,
            rowGap: 0.5,
            paddingBlock: 1.25,
            borderTop: index === 0 ? 'none' : '1px solid',
            borderColor: 'border.subtle',
          }}
        >
          <Box
            component="dt"
            sx={{
              typography: 'body2',
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            {item.label}
          </Box>
          <Box
            component="dd"
            sx={{
              typography: 'body2',
              margin: 0,
              minWidth: 0,
              overflowWrap: 'anywhere',
              whiteSpace: 'pre-line',
            }}
          >
            {item.value}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
