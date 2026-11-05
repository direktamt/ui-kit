import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  AnimatedBrandLogo,
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
  const [run, setRun] = useState(0);
  const [finished, setFinished] = useState(false);

  const replay = () => {
    setFinished(false);
    setRun((value) => value + 1);
  };

  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Brand marks"
        description="Logo and icon from the outlined master paths. The marks are not covered by the code licence."
      />
      <Stack spacing={3}>
        <SectionCard
          title="Intro animation"
          actions={
            <Button variant="outlined" size="small" onClick={replay}>
              Replay
            </Button>
          }
        >
          <Stack spacing={2}>
            {(['adaptive', 'reversed'] as const).map((variant) => (
              <Box
                key={variant}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 5,
                  borderRadius: 2,
                  bgcolor:
                    variant === 'reversed'
                      ? brandColors.navy
                      : 'background.paper',
                  border: '1px solid',
                  borderColor: 'border.subtle',
                }}
              >
                <AnimatedBrandLogo
                  key={run}
                  variant={variant}
                  height={56}
                  onFinish={
                    variant === 'adaptive' ? () => setFinished(true) : undefined
                  }
                />
              </Box>
            ))}
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {finished ? 'Finished' : 'Playing'}
            </Typography>
          </Stack>
        </SectionCard>
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
      </Stack>
    </>
  );
}
