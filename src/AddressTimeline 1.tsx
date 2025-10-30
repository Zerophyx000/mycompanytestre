import { Paper, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";

type Props = { adrKey?: string };

export default function AddressTimeline({ adrKey }: Props) {
  const items = [
    { when: "2025-01-15 15:18", what: "Adresse aktualisiert" },
    { when: "2025-01-10 10:02", what: "Kontakt hinzugefügt" },
    { when: "2025-01-05 09:31", what: "Adresse erstellt" },
  ];
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Activity Timeline {adrKey ? <Chip size="small" label={adrKey} sx={{ ml: 1 }} /> : null}
      </Typography>
      <List dense>
        {items.map((it, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={it.what} secondary={new Date(it.when).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
