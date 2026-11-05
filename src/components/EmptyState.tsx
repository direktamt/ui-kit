import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import {
  ErrorIcon,
  InboxIcon,
  InfoIcon,
  WarningIcon,
} from '../icons/KitIcons.js';

export type EmptyStateTone = 'neutral' | 'info' | 'warning' | 'error';

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  /** Replaces the tone's default icon. */
  icon?: ReactNode;
  tone?: EmptyStateTone;
  /** Call to action, e.g. a retry button. */
  action?: ReactNode;
  /** Smaller paddings for use inside cards and dialogs. */
  dense?: boolean;
}

const DEFAULT_ICONS: Record<EmptyStateTone, ReactNode> = {
  neutral: <InboxIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/**
 * Placeholder for regions without content: nothing requested yet, no
 * results, not found or failed.
 */
export function EmptyState({
  title,
  description,
  icon,
  tone = 'neutral',
  action,
  dense = false,
}: EmptyStateProps) {
  const toned = tone !== 'neutral';

  return (
    <Box
      role={tone === 'error' ? 'alert' : 'status'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 1,
        paddingInline: 3,
        paddingBlock: dense ? 3 : 5,
        border: '1px dashed',
        borderColor: 'border.subtle',
        borderRadius: 3,
      }}
    >
      <Box
        aria-hidden
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          marginBottom: 0.5,
          bgcolor: toned ? `${tone}.subtle` : 'surface.inset',
          color: toned ? `${tone}.subtleText` : 'text.secondary',
          '& .MuiSvgIcon-root': { fontSize: 22 },
        }}
      >
        {icon ?? DEFAULT_ICONS[tone]}
      </Box>
      <Typography variant="subtitle1" component="p">
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', maxWidth: '56ch' }}
        >
          {description}
        </Typography>
      )}
      {action && <Box sx={{ marginTop: 1 }}>{action}</Box>}
    </Box>
  );
}
