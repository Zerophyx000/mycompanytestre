import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, MenuItem
} from "@mui/material";
import type { NewNoteInput, NoteColor } from "./NotesContext";

type Props = { open: boolean; onClose: () => void; onSave: (n: NewNoteInput) => void; };

export default function NoteDialog({ open, onClose, onSave }: Props) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tagsText, setTagsText] = React.useState("");
  const [color, setColor] = React.useState<NoteColor>("default");

  const reset = () => { setTitle(""); setBody(""); setTagsText(""); setColor("default"); };

  const handleSave = () => {
    const tags = tagsText.split(",").map(t => t.trim()).filter(Boolean);
    onSave({ title: title.trim(), body: body.trim(), tags, color, pinned: false });
    reset();
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Neue Notiz</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Titel" value={title} onChange={e=>setTitle(e.target.value)} fullWidth autoFocus />
          <TextField label="Inhalt" value={body} onChange={e=>setBody(e.target.value)} fullWidth multiline minRows={4} />
          <TextField label="Tags (kommagetrennt)" value={tagsText} onChange={e=>setTagsText(e.target.value)} fullWidth />
          <TextField select label="Akzentfarbe" value={color} onChange={e=>setColor(e.target.value as NoteColor)} fullWidth>
            <MenuItem value="default">Keine</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="warning">Warnung</MenuItem>
            <MenuItem value="success">Erledigt</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" variant="outlined">Abbrechen</Button>
        <Button onClick={()=>{handleSave(); onClose();}} variant="contained" disabled={!title.trim() && !body.trim()}>
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}
