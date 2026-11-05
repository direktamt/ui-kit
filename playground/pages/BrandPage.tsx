import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  BrandIcon,
  BrandLogo,
  brandColors,
  PageHeader,
  SectionCard,
} from '../../src/index.ts';
import type { BrandMarkVariant } from '../../src/index.ts';

const VARIANTS: { variant: BrandMarkVariant; background: string }[] = [
  { variant: 'adaptive', background: 'background.paper' },
  { variant: 'primary', background: '#FFFFFF' },
  { variant: 'navy', background: '#FFFFFF' },
  { variant: 'reversed', background: brandColors.navy },
  { variant: 'white', background: brandColors.navy },
];

export function BrandPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Brand marks"
        description="Logo and icon from the outlined master paths. The marks are not covered by the code licence."
      />
      <SectionCard title="Variants">
        <Stack spacing={2}>
          {VARIANTS.map(({ variant, background }) => (
            <Stack
              key={variant}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{
                alignItems: { sm: 'center' },
                p: 3,
                borderRadius: 2,
                bgcolor: background,
                border: '1px solid',
                borderColor: 'border.subtle',
              }}
            >
              <BrandLogo variant={variant} height={32} />
              <BrandIcon variant={variant} height={32} />
              <Box sx={{ flexGrow: 1 }} />
              <Typography
                variant="caption"
                sx={{
                  color:
                    background === brandColors.navy
                      ? '#FFFFFF'
                      : 'text.secondary',
                }}
              >
                {variant}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </SectionCard>
    </>
  );
}
