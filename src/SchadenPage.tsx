import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Stack,
  CssBaseline,
  Menu,
  MenuItem,
  Grid,
  Divider,
  ButtonGroup,
} from "@mui/material";
import {
  Home as HomeIcon,
  LocalFireDepartment as FireIcon,
  AddCircle as AddIcon,
  Close as CloseIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { DataGrid, type GridRowParams, GridToolbar } from "@mui/x-data-grid";

export type SchadenRow = {
  id: number;
  adrKey: string;
  ownType: string;
  evtTyp: string;
  evtKey: string;
  memberKey: string;
  member: string;
  adrKeyMain: string;
  adrKeyNew: string;
  alternateKey: string;
  proKey: string;
  aDate: string;   // ISO yyyy-mm-dd
  origin: string;  // e.g. Web / API / Import
  class: string;
  status: string;  // Active / Pending / Inactive / …
  statusDate: string;
};

export type SchadenPageProps = {
  onOpenClaim?: (row: SchadenRow) => void;
};

// ---- Quick Views for Schaden ----
type ViewKey =
  | "aktuell"
  | "naechste"
  | "alle"
  | "uebergeben"
  | "meineAuftraege"
  | "meineProjekte"
  | "zuVisieren"
  | "meineVerdankungen";

const SCHADEN_VIEWS: { key: ViewKey; label: string; predicate: (r: SchadenRow) => boolean }[] = [
  { key: "aktuell", label: "Aktuell", predicate: (r) => r.status === "Active" },
  { key: "naechste", label: "Nächste", predicate: (r) => r.status === "Pending" },
  { key: "alle", label: "Alle", predicate: () => true },
  // Example placeholders — replace with real rules:
  { key: "uebergeben", label: "Übergeben", predicate: (r) => r.origin === "API" || r.origin === "Import" },
  { key: "meineAuftraege", label: "Meine Aufträge", predicate: () => true },
  { key: "meineProjekte", label: "Meine Projekte", predicate: () => true },
  { key: "zuVisieren", label: "Zu Visieren", predicate: () => true },
  { key: "meineVerdankungen", label: "Meine Verdankungen", predicate: () => true },
];

function QuickViewsBar({
  active,
  onChange,
}: {
  active: ViewKey;
  onChange: (k: ViewKey) => void;
}) {
  return (
    <Box sx={{ p: 1 }}>
      <ButtonGroup size="small" variant="outlined" sx={{ flexWrap: "wrap", gap: 1 }}>
        {SCHADEN_VIEWS.map((v) => (
          <Button
            key={v.key}
            variant={active === v.key ? "contained" : "outlined"}
            onClick={() => onChange(v.key)}
          >
            {v.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default function SchadenPage({ onOpenClaim }: SchadenPageProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeView, setActiveView] = useState<ViewKey>("aktuell");

  const [claimType, setClaimType] = useState("");
  const [formData, setFormData] = useState({
    schadennummer: "",
    kategorie: "",
    prioritaet: "",
    meldedatum: "",
    schadendatum: "",
    status: "",
    adresse: "",
    schaetzwert: "",
    notizen: "",
  });

  const navigateToHome = () => console.log("Navigate to home");

  const rows: SchadenRow[] = [
    { id: 1, adrKey: "ADR001234", ownType: "Individual", evtTyp: "Update", evtKey: "EVT7891", memberKey: "MBR45678", member: "John Smith", adrKeyMain: "ADR001234", adrKeyNew: "ADR001235", alternateKey: "ALT789123", proKey: "PRO456789", aDate: "2024-01-15", origin: "Web",   class: "Premium",    status: "Active",   statusDate: "2024-01-15" },
    { id: 2, adrKey: "ADR002345", ownType: "Company",    evtTyp: "Create", evtKey: "EVT7892", memberKey: "MBR45679", member: "Jane Doe",   adrKeyMain: "ADR002345", adrKeyNew: "ADR002346", alternateKey: "ALT789124", proKey: "PRO456790", aDate: "2024-01-16", origin: "Import", class: "Standard",   status: "Pending",  statusDate: "2024-01-16" },
    { id: 3, adrKey: "ADR003456", ownType: "Partnership", evtTyp: "Delete", evtKey: "EVT7893", memberKey: "MBR45680", member: "Bob Johnson", adrKeyMain: "ADR003456", adrKeyNew: "ADR003457", alternateKey: "ALT789125", proKey: "PRO456791", aDate: "2024-01-17", origin: "Manual", class: "Basic",      status: "Inactive", statusDate: "2024-01-17" },
    { id: 4, adrKey: "ADR004567", ownType: "Individual",  evtTyp: "Update", evtKey: "EVT7894", memberKey: "MBR45681", member: "Sarah Wilson", adrKeyMain: "ADR004567", adrKeyNew: "ADR004568", alternateKey: "ALT789126", proKey: "PRO456792", aDate: "2024-01-18", origin: "API",   class: "Premium",    status: "Active",   statusDate: "2024-01-18" },
    { id: 5, adrKey: "ADR005678", ownType: "Company",     evtTyp: "Create", evtKey: "EVT7895", memberKey: "MBR45682", member: "Mike Brown",  adrKeyMain: "ADR005678", adrKeyNew: "ADR005679", alternateKey: "ALT789127", proKey: "PRO456793", aDate: "2024-01-19", origin: "Batch",  class: "Enterprise", status: "Active",   statusDate: "2024-01-19" },
  ];

  const columns = [
    { field: "adrKey", headerName: "AdrKey", width: 110 },
    { field: "ownType", headerName: "OwnType", width: 110 },
    { field: "evtTyp", headerName: "EvtTyp", width: 90 },
    { field: "evtKey", headerName: "EvtKey", width: 110 },
    { field: "memberKey", headerName: "MemberKey", width: 120 },
    { field: "member", headerName: "Member", width: 140 },
    { field: "adrKeyMain", headerName: "AdrKeyMain", width: 120 },
    { field: "adrKeyNew", headerName: "AdrKeyNew", width: 120 },
    { field: "alternateKey", headerName: "AlternateKey", width: 130 },
    { field: "proKey", headerName: "ProKey", width: 120 },
    { field: "aDate", headerName: "ADate", width: 110 },
    { field: "origin", headerName: "Origin", width: 90 },
    { field: "class", headerName: "Class", width: 110 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "statusDate", headerName: "StatusDate", width: 120 },
  ];

  const activePredicate = SCHADEN_VIEWS.find((v) => v.key === activeView)?.predicate ?? (() => true);
  const filteredRows = useMemo(() => rows.filter(activePredicate), [activePredicate]);

  const handleInputChange = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleTypeSelect = (type: string) => {
    setClaimType(type);
    handleMenuClose();
  };
  const handleSubmit = () => {
    console.log("Claim created:", { claimType, ...formData });
    handleCloseDialog();
  };
  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setClaimType("");
    setFormData({
      schadennummer: "",
      kategorie: "",
      prioritaet: "",
      meldedatum: "",
      schadendatum: "",
      status: "",
      adresse: "",
      schaetzwert: "",
      notizen: "",
    });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" component="main">
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component="button" variant="body2" onClick={navigateToHome} underline="hover">
              <Stack direction="row" alignItems="center" spacing={1}>
                <HomeIcon fontSize="small" />
                <span>Dashboard</span>
              </Stack>
            </Link>

            <Stack direction="row" alignItems="center" spacing={1}>
              <FireIcon fontSize="small" />
              <Typography variant="body2" color="text.primary">
                Schäden
              </Typography>
            </Stack>
          </Breadcrumbs>
        </Box>

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={2}>
              <FireIcon color="primary" />
              <Box>
                <Typography variant="h4" component="h1">
                  Schäden
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schadenfälle und Vorfälle verwalten
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => setIsCreateDialogOpen(true)} startIcon={<AddIcon />}>
              Neuer Schadensfall
            </Button>
          </Grid>
        </Grid>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AddIcon fontSize="small" />
            <Typography variant="body2">
              Schnellaktion verfügbar: Neuen Schadensfall erstellen
            </Typography>
          </Stack>
          <Divider />
        </Stack>

        <Paper elevation={1}>
          <QuickViewsBar active={activeView} onChange={setActiveView} />

          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoHeight
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={(p: GridRowParams) => onOpenClaim?.(p.row as SchadenRow)}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
            }}
          />
        </Paper>
      </Container>

      <Dialog open={isCreateDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Neuen Schadensfall erstellen</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Erfassen Sie einen neuen Schadenfall mit den wichtigsten Angaben.
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2">Schadenstyp *</Typography>
              <Button fullWidth variant="outlined" onClick={handleMenuOpen} endIcon={<KeyboardArrowDownIcon />} color="inherit">
                {!claimType
                  ? "Typ auswählen…"
                  : claimType === "wasser"
                  ? "Wasserschaden"
                  : claimType === "feuer"
                  ? "Feuer"
                  : claimType === "einbruch"
                  ? "Einbruch/Diebstahl"
                  : "Sturm/Wetter"}
              </Button>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleTypeSelect("wasser")}>Wasserschaden</MenuItem>
                <MenuItem onClick={() => handleTypeSelect("feuer")}>Feuer</MenuItem>
                <MenuItem onClick={() => handleTypeSelect("einbruch")}>Einbruch/Diebstahl</MenuItem>
                <MenuItem onClick={() => handleTypeSelect("sturm")}>Sturm/Wetter</MenuItem>
              </Menu>
            </Box>

            {claimType && (
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Schadennummer *"
                  placeholder="CLM-2024-001234"
                  value={formData.schadennummer}
                  onChange={(e) => handleInputChange("schadennummer", e.target.value)}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Kategorie"
                      placeholder="z. B. Wasserschaden"
                      value={formData.kategorie}
                      onChange={(e) => handleInputChange("kategorie", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Priorität"
                      placeholder="Hoch / Mittel / Niedrig"
                      value={formData.prioritaet}
                      onChange={(e) => handleInputChange("prioritaet", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Meldedatum"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.meldedatum}
                      onChange={(e) => handleInputChange("meldedatum", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Schadendatum"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.schadendatum}
                      onChange={(e) => handleInputChange("schadendatum", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Status"
                      placeholder="Aktiv / Pending / Abgeschlossen"
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Geschätzter Schaden (€)"
                      placeholder="12500"
                      value={formData.schaetzwert}
                      onChange={(e) => handleInputChange("schaetzwert", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Adresse"
                  placeholder="123 Main Street, 90210 Los Angeles"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange("adresse", e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Beschreibung / Notizen"
                  multiline
                  rows={3}
                  placeholder="Kurze Beschreibung des Vorfalls…"
                  value={formData.notizen}
                  onChange={(e) => handleInputChange("notizen", e.target.value)}
                />
              </Stack>
            )}

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={handleCloseDialog} color="inherit">
                Abbrechen
              </Button>
              <Button variant="contained" onClick={handleSubmit} disabled={!claimType || !formData.schadennummer}>
                Schadensfall erstellen
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
