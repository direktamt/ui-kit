import Stack from '@mui/material/Stack';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import { PageHeader, SectionCard, typeScale } from '../../src/index.ts';

const SAMPLE = 'Wohnsitz anmelden in Bonn: Aufenthaltstitel 0123456789 Il1';

export function TypographyPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Typography"
        description="Inter Display (optical size 32) for headings, Inter for text, self-hosted as one variable font."
      />
      <SectionCard>
        <Stack spacing={2.5}>
          {(Object.keys(typeScale) as (keyof typeof typeScale)[]).map(
            (variant) => (
              <Stack key={variant} spacing={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {variant} · {typeScale[variant].fontSize} /{' '}
                  {typeScale[variant].fontWeight}
                </Typography>
                <Typography variant={variant as TypographyProps['variant']}>
                  {SAMPLE}
                </Typography>
              </Stack>
            ),
          )}
        </Stack>
      </SectionCard>
    </>
  );
}
