import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stack, Typography, List, ListItem, ListItemText
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (files: File[]) => void;
};

export default function DocumentDialog({ open, onClose, onSave }: Props) {
  const { t } = useTranslation();
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
      <DialogTitle>{t("documents.uploadTitle")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography variant="body2" color="text.secondary">
            {t("documents.pickHint")}
          </Typography>

          <input
            ref={pickRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />

          <Button variant="outlined" onClick={pick}>
            {t("documents.pickFiles")}
          </Button>

          <List dense>
            {files.map((f) => (
              <ListItem key={f.name}>
                <ListItemText
                  primary={f.name}
                  secondary={`${f.type || t("documents.unknownType")} • ${(f.size / 1024).toFixed(1)} KB`}
                />
              </ListItem>
            ))}
            {files.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                {t("documents.noneSelected")}
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
          {t("common.cancel")}
        </Button>
        <Button
          onClick={() => { onSave(files); reset(); onClose(); }}
          variant="contained"
          disabled={files.length === 0}
        >
          {t("documents.upload")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
