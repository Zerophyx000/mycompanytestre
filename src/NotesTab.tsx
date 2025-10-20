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

export default function NotesTab() {
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

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">Notizen</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={api.openCreate}>
          Neue Notiz
        </Button>
      </Stack>

      <TextField value={q} onChange={e=>setQ(e.target.value)} fullWidth placeholder="Notizen filtern…" margin="dense" />

      <Grid container spacing={2} mt={0}>
        {filtered.map(n=>(
          <Grid item xs={12} md={6} key={n.id}>
            <Card variant="outlined">
              <CardHeader
                title={n.title}
                subheader={new Date(n.createdAt).toLocaleString()}
                action={
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={()=>api.togglePin(n.id)}>
                      {n.pinned ? <PushPinIcon/> : <PushPinOutlinedIcon/>}
                    </IconButton>
                    <IconButton onClick={()=>api.removeNote(n.id)}>
                      <DeleteOutlineIcon/>
                    </IconButton>
                  </Stack>
                }
              />
              <CardContent>
                {n.tags.length>0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                    {n.tags.map(t=> <Chip key={t} label={t} size="small"/>)}
                  </Stack>
                )}
                <Chip size="small" color={colorToChip(n.color)} label={n.color} sx={{mr:1}} />
                <Typography variant="body2" mt={1} whiteSpace="pre-wrap">{n.body}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>api.togglePin(n.id)}>
                  {n.pinned ? "Lösen" : "Anpinnen"}
                </Button>
                <Button size="small" color="error" onClick={()=>api.removeNote(n.id)}>
                  Löschen
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filtered.length===0 && (
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography variant="body2" color="text.secondary">
                  Keine Notizen gefunden. Erstellen Sie die erste Notiz.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
