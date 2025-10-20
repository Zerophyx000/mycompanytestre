import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stack, Typography, List, ListItem, ListItemText
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (files: File[]) => void;
};

export default function DocumentDialog({ open, onClose, onSave }: Props) {
  const [files, setFiles] = React.useState<File[]>([]);

  const pickRef = React.useRef<HTMLInputElement | null>(null);
  const pick = () => pickRef.current?.click();

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
  };

  const reset = () => setFiles([]);

  return (
    <Dialog open={open} onClose={() => { reset(); onClose(); }} maxWidth="sm" fullWidth>
      <DialogTitle>Dokumente hochladen</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography variant="body2" color="text.secondary">
            Wählen Sie eine oder mehrere Dateien aus
          </Typography>

          <input
            ref={pickRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />

          <Button variant="outlined" onClick={pick}>
            Dateien auswählen…
          </Button>

          <List dense>
            {files.map((f) => (
              <ListItem key={f.name}>
                <ListItemText
                  primary={f.name}
                  secondary={`${f.type || "Unbekannt"} • ${(f.size / 1024).toFixed(1)} KB`}
                />
              </ListItem>
            ))}
            {files.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Noch keine Dateien ausgewählt
              </Typography>
            )}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => { reset(); onClose(); }}
          color="inherit"
          variant="outlined"
        >
          Abbrechen
        </Button>
        <Button
          onClick={() => { onSave(files); reset(); onClose(); }}
          variant="contained"
          disabled={files.length === 0}
        >
          Hochladen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
