import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { PageHeader, SectionCard } from '../../src/index.ts';

const SEVERITIES = ['info', 'success', 'warning', 'error'] as const;
const INTENTS = ['primary', 'info', 'success', 'warning', 'error'] as const;

const ROWS = [
  {
    key: '99102013000000',
    title: 'Wohnsitz Anmeldung',
    type: 'Leistungsobjekt mit Verrichtung',
  },
  {
    key: '99035003000000',
    title: 'Aufenthaltserlaubnis zum Studium',
    type: 'Leistungsobjekt mit Verrichtung',
  },
  {
    key: '99050012104000',
    title: 'Personalausweis Ausstellung',
    type: 'Leistungsobjekt mit Verrichtung',
  },
];

export function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <PageHeader
        overline="Components"
        title="Material UI under the DirektAmt theme"
        description="Flat surfaces, no ripple, sentence-case buttons, own radii."
      />
      <Stack spacing={3}>
        <SectionCard title="Buttons">
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={1.5}
              useFlexGap
              sx={{ flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Button variant="contained">Search</Button>
              <Button variant="outlined" color="inherit">
                Back
              </Button>
              <Button variant="outlined">Outlined</Button>
              <Button>Text</Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Button variant="contained" size="small">
                Small
              </Button>
              <Button variant="contained">Medium</Button>
              <Button variant="contained" size="large">
                Large
              </Button>
            </Stack>
            <Typography variant="body2">
              Inline <Link href="#components">link to a resource</Link> inside
              running text.
            </Typography>
          </Stack>
        </SectionCard>
        <SectionCard title="Form controls">
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <TextField
              label="Regional key"
              size="small"
              defaultValue="053140000000"
            />
            <TextField
              label="Query"
              size="small"
              required
              helperText="Plain-language search"
            />
            <TextField
              label="Postal code"
              size="small"
              error
              helperText="Provide a city name or a postal code."
            />
            <TextField
              select
              label="Resource"
              size="small"
              defaultValue="services"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="services">Service description</MenuItem>
              <MenuItem value="online-services">Online service</MenuItem>
            </TextField>
            <TextField
              label="Disabled"
              size="small"
              disabled
              defaultValue="Read only"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Fuzzy search"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Use regional hierarchy"
            />
          </Stack>
        </SectionCard>
        <SectionCard title="Chips">
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <Chip label="Default" />
            <Chip label="Clickable" onClick={() => undefined} />
            <Chip label="Outlined" variant="outlined" />
            {INTENTS.map((intent) => (
              <Chip
                key={intent}
                label={intent}
                color={intent}
                variant="outlined"
                size="small"
              />
            ))}
            {INTENTS.map((intent) => (
              <Chip
                key={`${intent}-filled`}
                label={intent}
                color={intent}
                size="small"
              />
            ))}
          </Stack>
        </SectionCard>
        <SectionCard title="Alerts">
          <Stack spacing={1.5}>
            {SEVERITIES.map((severity) => (
              <Alert key={severity} severity={severity}>
                <AlertTitle>
                  {severity[0].toUpperCase() + severity.slice(1)}
                </AlertTitle>
                Government data source answered with a {severity} state.
              </Alert>
            ))}
            {SEVERITIES.map((severity) => (
              <Alert
                key={`${severity}-filled`}
                severity={severity}
                variant="filled"
              >
                Filled {severity} alert.
              </Alert>
            ))}
          </Stack>
        </SectionCard>
        <SectionCard title="Table" disablePadding>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Service catalog key</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Service type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ROWS.map((row) => (
                  <TableRow key={row.key} hover sx={{ cursor: 'pointer' }}>
                    <TableCell>
                      <Chip
                        label={row.key}
                        size="small"
                        sx={{ fontFamily: 'monospace' }}
                      />
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={42}
            page={0}
            rowsPerPage={20}
            rowsPerPageOptions={[20]}
            onPageChange={() => undefined}
          />
        </SectionCard>
        <SectionCard title="Accordion and dialog">
          <Stack spacing={2}>
            <div>
              {['Voraussetzungen', 'Erforderliche Unterlagen', 'Kosten'].map(
                (title) => (
                  <Accordion key={title}>
                    <AccordionSummary>
                      <Chip
                        label="section"
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Official section text as published.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ),
              )}
            </div>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setDialogOpen(true)}
              sx={{ alignSelf: 'flex-start' }}
            >
              Open dialog
            </Button>
          </Stack>
        </SectionCard>
      </Stack>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Catalog entry 99102013000000</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Dialog content on a flat, bordered surface.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
