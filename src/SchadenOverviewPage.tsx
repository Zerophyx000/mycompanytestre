import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteIcon from "@mui/icons-material/Note";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDocuments } from "./DocumentsContext";
import { useClaim } from "./SchadenTabs";
import { useNotes } from "./NotesContext";

import "./SchadenOverviewPage.css";

export default function SchadenOverviewPage() {
  const claim = useClaim();
  const notes = useNotes();
  const docs = useDocuments();
  if (!claim) return null;

  return (
    <Box className="schaden-overview-root">
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={3}>
          <Box className="card">
            <Box padding={2}>
              <Typography variant="h6" fontWeight="bold">
                crs Coop Rechtsschutz
              </Typography>
              <Typography variant="body2" color="text.secondary">
                MEMBER
              </Typography>

              <Box marginTop={2}>
                <Typography variant="body2">
                  Zürichstrasse 45,
                  <br />
                  8600 Dübendorf, Switzerland
                </Typography>
              </Box>
              <Stack direction="row" alignItems="center" spacing={1} marginTop={1}>
                <MailOutlineIcon fontSize="small" />
                <Typography variant="body2">m.hoffmann@lawgroup.com</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+41 44 654 32 10</Typography>
              </Stack>

              <Box marginTop={2} marginBottom={0.5}>
                <Chip size="small" color="warning" label="10 | Nächster Termin" />
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Letzte Änderung: 15. Aug. 2025, 15:18
              </Typography>
            </Box>

            <Divider />

            <Box padding={2}>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined" startIcon={<NoteIcon />} onClick={() => notes?.openCreate()}>
                  Note
                </Button>
                <Button size="small" variant="outlined" startIcon={<EmailIcon />}>
                  Email
                </Button>
                <Button size="small" variant="outlined" startIcon={<DescriptionIcon />} onClick={() => docs?.openCreate()}>
                  Doc
               </Button>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            </Box>

            <Divider />

            <Box padding={2}>
              <Typography variant="subtitle2">Interner Schlüssel</Typography>
              <Typography variant="body2" gutterBottom>345984</Typography>
              <Typography variant="subtitle2">Team</Typography>
              <Typography variant="body2" gutterBottom>Front 1</Typography>
              <Typography variant="subtitle2">Schadenstelle</Typography>
              <Typography variant="body2" gutterBottom>10 Arau</Typography>
              <Typography variant="subtitle2">Schaden-Nummer</Typography>
              <Typography variant="body2" gutterBottom>35789</Typography>
              <Typography variant="subtitle2">Schadenjahr</Typography>
              <Typography variant="body2" gutterBottom>2023</Typography>
              <Divider style={{ margin: "8px 0" }} />
              <Typography variant="caption" color="text.secondary" display="block">
                Erstellt: 8. Jan. 2025, 09:15
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Zuletzt bearbeitet: 11. Jan. 2025, 16:45 (by John Smith)
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={8} className="minw0">
              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Aufwand</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Optionale Beschreibung
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {[5, 10, 15, 30, 45, 60].map((m) => (
                          <Button key={m} size="small" variant="outlined">
                            {m} min
                          </Button>
                        ))}
                      </Stack>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Rückstellungen</Typography>
                          <Typography variant="body2">0.00</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Budget</Typography>
                          <Typography variant="body2">500.00</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Gesamtaufwand</Typography>
                          <Typography variant="body2">57.50</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Restbudget</Typography>
                          <Typography variant="body2">442.50</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Eigenaufwand</Typography>
                          <Typography variant="body2">57.50</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Zeit</Typography>
                          <Typography variant="body2">1 Std. 30 min</Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>


              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Metadaten</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Anlage</Typography>
                        <Typography variant="body2">12.09.2023</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Eigner</Typography>
                        <Typography variant="body2">Carlos Müller</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Status</Typography>
                        <Typography variant="body2">10 | Nächster Termin</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Status Datum</Typography>
                        <Typography variant="body2">15.08.2025 15:18</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Schadendaten</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Schadenstelle</Typography>
                        <Typography variant="body2">10 | Arau</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Schadendatum</Typography>
                        <Typography variant="body2">21.12.2023</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Mitglied-Nummer</Typography>
                        <Typography variant="body2">12345</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Fall-Nummer</Typography>
                        <Typography variant="body2">235546</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">SchadenCodes</Typography>
                        <Typography variant="body2">
                          1-1-17-08 | Deckung-Schweiz-Beratungsrechtsschutz-Mietrecht
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>

            <Grid item xs={12} md={4} className="minw0">
              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Beziehungen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      Platzhalter
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
