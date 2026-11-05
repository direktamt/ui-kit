import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export interface LoadingStateProps {
  label?: string;
  /** Smaller paddings for use inside cards and dialogs. */
  dense?: boolean;
}

/**
 * Busy indicator for a region whose data is loading.
 */
export function LoadingState({
  label = 'Loading…',
  dense = false,
}: LoadingStateProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        paddingBlock: dense ? 3 : 6,
        color: 'text.secondary',
      }}
    >
      <CircularProgress size={20} thickness={5} color="inherit" />
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
}
