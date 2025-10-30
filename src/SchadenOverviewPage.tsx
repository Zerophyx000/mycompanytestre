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
import { useTranslation } from "react-i18next";

export default function SchadenOverviewPage() {
  const { t } = useTranslation();
  const claim = useClaim();
  const notes = useNotes();
  const docs = useDocuments();
  if (!claim) return null;

  return (
    <Box className="schaden-overview-root">
      <Grid container spacing={2} alignItems="flex-start">
        <Grid>
          <Box className="card">
            <Box padding={2}>
              <Typography variant="h6" fontWeight="bold">
                crs Coop Rechtsschutz
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {t("overview.member")}
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
                <Chip size="small" color="warning" label={t("overview.nextAppointment", { value: 10 })} />
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                {t("overview.lastChange")} 15. Aug. 2025, 15:18
              </Typography>
            </Box>

            <Divider />

            <Box padding={2}>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined" startIcon={<NoteIcon />} onClick={() => notes?.openCreate()}>
                  {t("buttons.note")}
                </Button>
                <Button size="small" variant="outlined" startIcon={<EmailIcon />}>
                  {t("buttons.email")}
                </Button>
                <Button size="small" variant="outlined" startIcon={<DescriptionIcon />} onClick={() => docs?.openCreate()}>
                  {t("buttons.document")}
                </Button>
                <IconButton size="small" aria-label={t("buttons.more")}>
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            </Box>

            <Divider />

            <Box padding={2}>
              <Typography variant="subtitle2">{t("overview.internalKey")}</Typography>
              <Typography variant="body2" gutterBottom>345984</Typography>

              <Typography variant="subtitle2">{t("overview.team")}</Typography>
              <Typography variant="body2" gutterBottom>Front 1</Typography>

              <Typography variant="subtitle2">{t("overview.damageLocation")}</Typography>
              <Typography variant="body2" gutterBottom>10 Arau</Typography>

              <Typography variant="subtitle2">{t("overview.caseNumber")}</Typography>
              <Typography variant="body2" gutterBottom>35789</Typography>

              <Typography variant="subtitle2">{t("overview.caseYear")}</Typography>
              <Typography variant="body2" gutterBottom>2023</Typography>

              <Divider style={{ margin: "8px 0" }} />

              <Typography variant="caption" color="text.secondary" display="block">
                {t("overview.created")} 8. Jan. 2025, 09:15
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {t("overview.lastEdited")} 11. Jan. 2025, 16:45 (by John Smith)
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid className="minw0">
              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{t("overview.effort")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        {t("overview.optionalDescription")}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {[5, 10, 15, 30, 45, 60].map((m) => (
                          <Button key={m} size="small" variant="outlined">
                            {t("overview.minutes", { value: m })}
                          </Button>
                        ))}
                      </Stack>
                      <Divider />
                      <Grid container spacing={2}>
                        <Grid>
                          <Typography variant="subtitle2">{t("overview.provisions")}</Typography>
                          <Typography variant="body2">0.00</Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2">{t("overview.budget")}</Typography>
                          <Typography variant="body2">500.00</Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2">{t("overview.totalEffort")}</Typography>
                          <Typography variant="body2">57.50</Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2">{t("overview.remainingBudget")}</Typography>
                          <Typography variant="body2">442.50</Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2">{t("overview.ownEffort")}</Typography>
                          <Typography variant="body2">57.50</Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2">{t("overview.time")}</Typography>
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
                    <Typography variant="h6">{t("overview.metadata")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.installationDate")}</Typography>
                        <Typography variant="body2">12.09.2023</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.owner")}</Typography>
                        <Typography variant="body2">Carlos Müller</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.status")}</Typography>
                        <Typography variant="body2">10 | Nächster Termin</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.statusDate")}</Typography>
                        <Typography variant="body2">15.08.2025 15:18</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{t("overview.claimData")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.damageLocation")}</Typography>
                        <Typography variant="body2">10 | Arau</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.damageDate")}</Typography>
                        <Typography variant="body2">21.12.2023</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.memberNumber")}</Typography>
                        <Typography variant="body2">12345</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.caseNumber")}</Typography>
                        <Typography variant="body2">235546</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">{t("overview.damageCodes")}</Typography>
                        <Typography variant="body2">
                          1-1-17-08 | Deckung-Schweiz-Beratungsrechtsschutz-Mietrecht
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>

            <Grid className="minw0">
              <Box className="card">
                <Accordion defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{t("overview.relationships")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {t("overview.placeholder")}
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
