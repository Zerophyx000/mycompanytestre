import * as React from "react";
import {
  Box, Stack, Typography, Button, TextField, Grid, Card, CardHeader,
  CardContent, CardActions, IconButton, Chip, Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNotes, type NoteColor } from "./NotesContext";
import { useTranslation } from "react-i18next";

export default function NotesTab() {
  const { t } = useTranslation();
  const api = useNotes();
  const [q, setQ] = React.useState("");
  if (!api) return null;

  const filtered = api.notes
    .filter(n =>
      n.title.toLowerCase().includes(q.toLowerCase()) ||
      n.body.toLowerCase().includes(q.toLowerCase()) ||
      n.tags.join(",").toLowerCase().includes(q.toLowerCase())
    )
    .sort((a,b)=>Number(b.pinned)-Number(a.pinned) || (a.createdAt < b.createdAt ? 1 : -1));

  const colorToChip = (c: NoteColor) =>
    c === "info" ? "info" : c === "warning" ? "warning" :
    c === "success" ? "success" : "default";

  const colorLabel = (c: NoteColor) => {
    if (c === "info") return t("notes.colors.info");
    if (c === "warning") return t("notes.colors.warning");
    if (c === "success") return t("notes.colors.success");
    return t("notes.colors.none");
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">{t("notes.title")}</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={api.openCreate}>
          {t("notes.new")}
        </Button>
      </Stack>

      <TextField
        value={q}
        onChange={e=>setQ(e.target.value)}
        fullWidth
        placeholder={t("notes.placeholders.filter") ?? ""}
        margin="dense"
      />

      <Grid container spacing={2} mt={0}>
        {filtered.map(n=>(
          <Grid>
            <Card variant="outlined">
              <CardHeader
                title={n.title}
                subheader={new Date(n.createdAt).toLocaleString()}
                action={
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={()=>api.togglePin(n.id)} aria-label={t("notes.actions.pin")}>
                      {n.pinned ? <PushPinIcon/> : <PushPinOutlinedIcon/>}
                    </IconButton>
                    <IconButton onClick={()=>api.removeNote(n.id)} aria-label={t("common.delete")}>
                      <DeleteOutlineIcon/>
                    </IconButton>
                  </Stack>
                }
              />
              <CardContent>
                {n.tags.length>0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                    {n.tags.map(tg=> <Chip key={tg} label={tg} size="small"/>)}
                  </Stack>
                )}
                <Chip size="small" color={colorToChip(n.color)} label={colorLabel(n.color)} sx={{mr:1}} />
                <Typography variant="body2" mt={1} whiteSpace="pre-wrap">{n.body}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>api.togglePin(n.id)}>
                  {n.pinned ? t("notes.actions.unpin") : t("notes.actions.pin")}
                </Button>
                <Button size="small" color="error" onClick={()=>api.removeNote(n.id)}>
                  {t("common.delete")}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filtered.length===0 && (
          <Grid>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography variant="body2" color="text.secondary">
                  {t("notes.empty")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
