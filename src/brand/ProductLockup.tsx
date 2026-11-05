import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { AnimatedBrandLogo } from './AnimatedBrandLogo.js';
import { BrandLogo } from './BrandLogo.js';

export interface ProductLockupProps {
  /** Product or application name shown next to the logo. */
  product?: string;
  /** Home link of the application. */
  href?: string;
  /** Logo height in pixels. */
  logoHeight?: number;
  /** Plays the logo intro once on mount; static under reduced motion. */
  animated?: boolean;
}

/**
 * Header lockup: the DirektAmt logo, a hairline and the product name.
 */
export function ProductLockup({
  product,
  href,
  logoHeight = 22,
  animated = false,
}: ProductLockupProps) {
  const Logo = animated ? AnimatedBrandLogo : BrandLogo;
  const content = (
    <>
      <Logo height={logoHeight} />
      {product && (
        <>
          <Box
            aria-hidden
            sx={{
              width: '1px',
              alignSelf: 'stretch',
              marginBlock: '2px',
              bgcolor: 'border.subtle',
            }}
          />
          <Typography
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
            }}
          >
            {product}
          </Typography>
        </>
      )}
    </>
  );

  const layout = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1.5,
    minWidth: 0,
  } as const;

  return href ? (
    <Link
      href={href}
      underline="none"
      color="inherit"
      aria-label={product ? `DirektAmt ${product}` : 'DirektAmt'}
      sx={{ ...layout, borderRadius: 1 }}
    >
      {content}
    </Link>
  ) : (
    <Box sx={layout}>{content}</Box>
  );
}
