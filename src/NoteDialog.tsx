import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, MenuItem
} from "@mui/material";
import type { NewNoteInput, NoteColor } from "./NotesContext";
import { useTranslation } from "react-i18next";

type Props = { open: boolean; onClose: () => void; onSave: (n: NewNoteInput) => void; };

export default function NoteDialog({ open, onClose, onSave }: Props) {
  const { t } = useTranslation();
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
      <DialogTitle>{t("notes.dialog.title")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label={t("notes.fields.title")}
            value={title}
            onChange={e=>setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label={t("notes.fields.body")}
            value={body}
            onChange={e=>setBody(e.target.value)}
            fullWidth
            multiline
            minRows={4}
          />
          <TextField
            label={t("notes.fields.tags")}
            value={tagsText}
            onChange={e=>setTagsText(e.target.value)}
            fullWidth
            placeholder={t("notes.placeholders.tags") ?? ""}
          />
          <TextField
            select
            label={t("notes.fields.accent")}
            value={color}
            onChange={e=>setColor(e.target.value as NoteColor)}
            fullWidth
          >
            <MenuItem value="default">{t("notes.colors.none")}</MenuItem>
            <MenuItem value="info">{t("notes.colors.info")}</MenuItem>
            <MenuItem value="warning">{t("notes.colors.warning")}</MenuItem>
            <MenuItem value="success">{t("notes.colors.success")}</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" variant="outlined">
          {t("common.cancel")}
        </Button>
        <Button
          onClick={()=>{handleSave(); onClose();}}
          variant="contained"
          disabled={!title.trim() && !body.trim()}
        >
          {t("common.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
