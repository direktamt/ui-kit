import Box from '@mui/material/Box';

export interface CodeBlockProps {
  children: string;
  /** Maximum height in pixels before the block scrolls. */
  maxHeight?: number;
  /** Wrap long lines instead of scrolling horizontally. */
  wrap?: boolean;
  /** Accessible name of the scrollable region. */
  label?: string;
}

/**
 * Monospaced, scrollable block for JSON and other preformatted text.
 */
export function CodeBlock({
  children,
  maxHeight = 480,
  wrap = false,
  label,
}: CodeBlockProps) {
  return (
    <Box
      component="pre"
      dir="ltr"
      tabIndex={0}
      aria-label={label}
      sx={(theme) => ({
        margin: 0,
        padding: 2,
        maxHeight,
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: '0.8125rem',
        lineHeight: 1.6,
        tabSize: 2,
        whiteSpace: wrap ? 'pre-wrap' : 'pre',
        wordBreak: wrap ? 'break-word' : 'normal',
        textAlign: 'start',
        color: 'text.primary',
        bgcolor: 'surface.inset',
        border: '1px solid',
        borderColor: 'border.subtle',
        borderRadius: 2,
        '&:focus-visible': {
          outline: `2px solid ${(theme.vars ?? theme).palette.border.focus}`,
          outlineOffset: 2,
        },
      })}
    >
      {children}
    </Box>
  );
}
