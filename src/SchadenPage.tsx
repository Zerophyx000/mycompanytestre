import { useState } from "react";
import {
  Box,
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
  aDate: string;
  origin: string;
  class: string;
  status: string;
  statusDate: string;
};

export type SchadenPageProps = {
  onOpenClaim?: (row: SchadenRow) => void;
};

export default function SchadenPage({ onOpenClaim }: SchadenPageProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const navigateToHome = () => {
    window.location.href = '/dashboard';
  };

  const rows: SchadenRow[] = [
    { id: 1, adrKey: "ADR001234", ownType: "Individual", evtTyp: "Update", evtKey: "EVT7891", memberKey: "MBR45678", member: "John Smith", adrKeyMain: "ADR001234", adrKeyNew: "ADR001235", alternateKey: "ALT789123", proKey: "PRO456789", aDate: "2024-01-15", origin: "Web", class: "Premium", status: "Active", statusDate: "2024-01-15" },
    { id: 2, adrKey: "ADR002345", ownType: "Company", evtTyp: "Create", evtKey: "EVT7892", memberKey: "MBR45679", member: "Jane Doe", adrKeyMain: "ADR002345", adrKeyNew: "ADR002346", alternateKey: "ALT789124", proKey: "PRO456790", aDate: "2024-01-16", origin: "Import", class: "Standard", status: "Pending", statusDate: "2024-01-16" },
    { id: 3, adrKey: "ADR003456", ownType: "Partnership", evtTyp: "Delete", evtKey: "EVT7893", memberKey: "MBR45680", member: "Bob Johnson", adrKeyMain: "ADR003456", adrKeyNew: "ADR003457", alternateKey: "ALT789125", proKey: "PRO456791", aDate: "2024-01-17", origin: "Manual", class: "Basic", status: "Inactive", statusDate: "2024-01-17" },
    { id: 4, adrKey: "ADR004567", ownType: "Individual", evtTyp: "Update", evtKey: "EVT7894", memberKey: "MBR45681", member: "Sarah Wilson", adrKeyMain: "ADR004567", adrKeyNew: "ADR004568", alternateKey: "ALT789126", proKey: "PRO456792", aDate: "2024-01-18", origin: "API", class: "Premium", status: "Active", statusDate: "2024-01-18" },
    { id: 5, adrKey: "ADR005678", ownType: "Company", evtTyp: "Create", evtKey: "EVT7895", memberKey: "MBR45682", member: "Mike Brown", adrKeyMain: "ADR005678", adrKeyNew: "ADR005679", alternateKey: "ALT789127", proKey: "PRO456793", aDate: "2024-01-19", origin: "Batch", class: "Enterprise", status: "Active", statusDate: "2024-01-19" },
  ];

  const columns = [
    { field: "adrKey", headerName: "AdrKey", minWidth: 110, flex: 1 },
    { field: "ownType", headerName: "OwnType", minWidth: 110, flex: 1 },
    { field: "evtTyp", headerName: "EvtTyp", minWidth: 90, flex: 1 },
    { field: "evtKey", headerName: "EvtKey", minWidth: 110, flex: 1 },
    { field: "memberKey", headerName: "MemberKey", minWidth: 120, flex: 1 },
    { field: "member", headerName: "Member", minWidth: 140, flex: 1 },
    { field: "adrKeyMain", headerName: "AdrKeyMain", minWidth: 120, flex: 1 },
    { field: "adrKeyNew", headerName: "AdrKeyNew", minWidth: 120, flex: 1 },
    { field: "alternateKey", headerName: "AlternateKey", minWidth: 130, flex: 1 },
    { field: "proKey", headerName: "ProKey", minWidth: 120, flex: 1 },
    { field: "aDate", headerName: "ADate", minWidth: 110, flex: 1 },
    { field: "origin", headerName: "Origin", minWidth: 90, flex: 1 },
    { field: "class", headerName: "Class", minWidth: 110, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 100, flex: 1 },
    { field: "statusDate", headerName: "StatusDate", minWidth: 120, flex: 1 },
  ];

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
      <Box component="main" minHeight="100vh" display="flex" flexDirection="column">
        <Box px={3} pt={2} pb={1}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component="button"
              variant="body2"
              onClick={navigateToHome}
              underline="hover"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <HomeIcon fontSize="small" />
              Dashboard
            </Link>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FireIcon fontSize="small" />
              <Typography variant="body2">Schäden</Typography>
            </Stack>
          </Breadcrumbs>
        </Box>

        <Box px={3} pb={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <FireIcon fontSize="large" />
              <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Schäden
                </Typography>
                <Typography variant="body2">
                  Schadenfälle und Vorfälle verwalten
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              onClick={() => setIsCreateDialogOpen(true)}
              startIcon={<AddIcon />}
              size="large"
            >
              Neuer Schadensfall
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <AddIcon fontSize="small" />
            <Typography variant="body2">Schnellaktion verfügbar: Neuen Schadensfall erstellen</Typography>
            <Typography variant="caption" ml="auto">Klicken Sie auf "Neuer Schadensfall" um loszulegen</Typography>
          </Stack>
        </Box>

        {/* FIXED: Full width like AddressPage */}
        <Box flex={1} px={3} pb={3} sx={{ minWidth: 0 }}>
          <Paper sx={{ width: "100%", overflow: "auto" }}>
            <Box sx={{
              width: "100%",
              minWidth: 950,
              maxWidth: "100vw",
              height: 520,
              overflowX: "auto"
            }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick={false}
                onRowClick={(p: GridRowParams) => onOpenClaim?.(p.row as SchadenRow)}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      <Dialog open={isCreateDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">Neuen Schadensfall erstellen</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Erfassen Sie einen neuen Schadenfall mit den wichtigsten Angaben.
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Schadenstyp *</Typography>
              <Button fullWidth variant="outlined" onClick={handleMenuOpen} endIcon={<KeyboardArrowDownIcon />}>
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

            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4} pt={2}>
              <Button variant="outlined" onClick={handleCloseDialog}>
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
