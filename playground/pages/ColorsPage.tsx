import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {
  blue,
  brandColors,
  listContrastPairs,
  neutral,
  PageHeader,
  SectionCard,
} from '../../src/index.ts';

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Box
        sx={{
          height: 56,
          borderRadius: 2,
          bgcolor: value,
          border: '1px solid',
          borderColor: 'border.subtle',
        }}
      />
      <Typography
        variant="caption"
        component="div"
        sx={{ fontWeight: 600, mt: 0.75 }}
      >
        {name}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{ color: 'text.secondary' }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function Scale({
  title,
  scale,
}: {
  title: string;
  scale: Record<string, string>;
}) {
  return (
    <SectionCard title={title}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
          gap: 2,
        }}
      >
        {Object.entries(scale).map(([step, value]) => (
          <Swatch key={step} name={step} value={value} />
        ))}
      </Box>
    </SectionCard>
  );
}

export function ColorsPage() {
  const pairs = listContrastPairs();

  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Colours"
        description="Locked brand values for the marks, derived scales for the interface. Every text and background pair below is checked against WCAG AA in the test suite."
      />
      <Stack spacing={3}>
        <Scale title="Brand (locked)" scale={brandColors} />
        <Scale title="Blue" scale={blue} />
        <Scale title="Neutral" scale={neutral} />
        <SectionCard
          title="Contrast"
          description="Minimum 4.5:1 for text, 3:1 for control borders and the focus ring."
          disablePadding
        >
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Scheme</TableCell>
                  <TableCell>Usage</TableCell>
                  <TableCell>Sample</TableCell>
                  <TableCell align="right">Ratio</TableCell>
                  <TableCell align="right">Minimum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pairs.map((pair) => (
                  <TableRow key={`${pair.scheme}-${pair.usage}`}>
                    <TableCell>{pair.scheme}</TableCell>
                    <TableCell>{pair.usage}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1,
                          borderRadius: 1,
                          color: pair.foreground,
                          bgcolor: pair.background,
                          fontWeight: 600,
                        }}
                      >
                        Aa {pair.foreground}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {pair.ratio.toFixed(2)}:1
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        size="small"
                        variant="outlined"
                        color={pair.ratio >= pair.minimum ? 'success' : 'error'}
                        label={`${pair.minimum}:1`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </SectionCard>
      </Stack>
    </>
  );
}
