import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {
  CodeBlock,
  DescriptionList,
  EmptyState,
  LoadingState,
  PageHeader,
  SectionCard,
} from '../../src/index.ts';

export function LayoutPage() {
  return (
    <>
      <PageHeader
        overline="Components"
        title="Page building blocks"
        description="Page header, section cards, description lists, code blocks and the loading, empty and error states."
        actions={
          <>
            <Button variant="outlined" color="inherit">
              Secondary
            </Button>
            <Button variant="contained">Primary action</Button>
          </>
        }
      >
        <Stack direction="row" spacing={1}>
          <Chip label="GET /services" size="small" />
          <Chip label="Live" size="small" variant="outlined" color="success" />
        </Stack>
      </PageHeader>
      <Stack spacing={3}>
        <SectionCard
          title="Description list"
          description="Label and value pairs."
          actions={<Button size="small">Edit</Button>}
        >
          <DescriptionList
            items={[
              { label: 'Service catalog key', value: '99102013000000' },
              { label: 'Title', value: 'Wohnsitz Anmeldung' },
              { label: 'Modified at', value: '2026-10-01T09:12:00Z' },
            ]}
          />
        </SectionCard>
        <SectionCard title="Code block">
          <CodeBlock>
            {JSON.stringify(
              { regionalKey: '053140000000', name: 'Bonn', relevance: 0.98 },
              null,
              2,
            )}
          </CodeBlock>
        </SectionCard>
        <SectionCard title="States">
          <Stack spacing={2}>
            <LoadingState label="Loading services…" dense />
            <EmptyState
              title="Nothing requested yet"
              description="Provide a regional key and a query to search."
              dense
            />
            <EmptyState
              tone="warning"
              title="Not found"
              description="No master text is published for this pair."
              dense
            />
            <EmptyState
              tone="error"
              title="Government data source is unavailable"
              description="The upstream API did not answer."
              action={
                <Button variant="outlined" color="inherit">
                  Retry
                </Button>
              }
              dense
            />
          </Stack>
        </SectionCard>
      </Stack>
    </>
  );
}
