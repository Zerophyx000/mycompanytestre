/* eslint-disable react-refresh/only-export-components */
import { useState, useMemo } from "react";
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
  ButtonGroup,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";

export const addressData = [
  {
    id: 1,
    adrKey: "ADR001234",
    ownType: "Individual",
    extTyp: "Update",
    extKey: "EXT7891",
    memberKey: "MBR45678",
    member: "John Smith",
    adrKeyMain: "ADR001234",
    adrKeyNew: "ADR001235",
    alternateKey: "ALT789123",
    proKey: "PRO456789",
    aDate: "2024-01-15",
    origin: "Web",
    class: "Premium",
    status: "Active",
    statusDate: "2024-01",
    company: "Smith Corp",
    email: "john.smith@smithcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Los Angeles 90210, United States"
  },
  {
    id: 2,
    adrKey: "ADR002345",
    ownType: "Company",
    extTyp: "Create",
    extKey: "EXT7892",
    memberKey: "MBR45679",
    member: "Jane Doe",
    adrKeyMain: "ADR002345",
    adrKeyNew: "ADR002346",
    alternateKey: "ALT789124",
    proKey: "PRO456790",
    aDate: "2024-01-16",
    origin: "Import",
    class: "Standard",
    status: "Pending",
    statusDate: "2024-01",
    company: "Doe Enterprises",
    email: "jane.doe@doeenterprises.com",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, New York 10001, United States"
  },
  {
    id: 3,
    adrKey: "ADR003456",
    ownType: "Partnership",
    extTyp: "Delete",
    extKey: "EXT7893",
    memberKey: "MBR45680",
    member: "Bob Johnson",
    adrKeyMain: "ADR003456",
    adrKeyNew: "ADR003457",
    alternateKey: "ALT789125",
    proKey: "PRO456791",
    aDate: "2024-01-17",
    origin: "Manual",
    class: "Basic",
    status: "Inactive",
    statusDate: "2024-01",
    company: "Johnson & Partners",
    email: "bob.johnson@johnsonpartners.com",
    phone: "+1 (555) 246-8135",
    address: "789 Partnership St, Chicago 60601, United States"
  },
  {
    id: 4,
    adrKey: "ADR004567",
    ownType: "Individual",
    extTyp: "Update",
    extKey: "EXT7894",
    memberKey: "MBR45681",
    member: "Sarah Wilson",
    adrKeyMain: "ADR004567",
    adrKeyNew: "ADR004568",
    alternateKey: "ALT789126",
    proKey: "PRO456792",
    aDate: "2024-01-18",
    origin: "API",
    class: "Premium",
    status: "Active",
    statusDate: "2024-01",
    company: "Wilson Technologies",
    email: "sarah.wilson@wilsontech.com",
    phone: "+1 (555) 369-2580",
    address: "321 Tech Drive, San Francisco 94105, United States"
  },
  {
    id: 5,
    adrKey: "ADR005678",
    ownType: "Company",
    extTyp: "Create",
    extKey: "EXT7895",
    memberKey: "MBR45682",
    member: "Mike Brown",
    adrKeyMain: "ADR005678",
    adrKeyNew: "ADR005679",
    alternateKey: "ALT789127",
    proKey: "PRO456793",
    aDate: "2024-01-19",
    origin: "Batch",
    class: "Enterprise",
    status: "Active",
    statusDate: "2024-01",
    company: "Brown Industries",
    email: "mike.brown@brownindustries.com",
    phone: "+1 (555) 147-2589",
    address: "654 Industrial Blvd, Houston 77001, United States"
  }
];

type Props = {
  onOpenAddress?: (adrKey: string) => void;
};

export default function AddressPage({ onOpenAddress }: Props) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("alle");

  const navigateToHome = () => {
    window.location.href = '/dashboard';
  };

  const [addressType, setAddressType] = useState('');
  const [formData, setFormData] = useState({
    firmenname: '',
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    strasse: '',
    plz: '',
    stadt: '',
    land: 'Schweiz',
    notizen: ''
  });

  // Filter options
  const filterOptions = [
    { key: "alle", label: "Alle" },
    { key: "aktiv", label: "Aktiv" },
    { key: "pending", label: "Pending" },
    { key: "inactive", label: "Inaktiv" },
    { key: "premium", label: "Premium" },
  ];

  // Filter the addressData based on activeFilter
  const filteredAddressData = useMemo(() => {
    if (activeFilter === "alle") return addressData;
    if (activeFilter === "aktiv") return addressData.filter(a => a.status === "Active");
    if (activeFilter === "pending") return addressData.filter(a => a.status === "Pending");
    if (activeFilter === "inactive") return addressData.filter(a => a.status === "Inactive");
    if (activeFilter === "premium") return addressData.filter(a => a.class === "Premium");
    return addressData;
  }, [activeFilter]);

  const columns: GridColDef[] = [
    { field: 'adrKey', headerName: 'AdrKey', minWidth: 100, flex: 1 },
    { field: 'ownType', headerName: 'OwnType', minWidth: 100, flex: 1 },
    { field: 'extTyp', headerName: 'ExtTyp', minWidth: 90, flex: 1 },
    { field: 'extKey', headerName: 'ExtKey', minWidth: 110, flex: 1 },
    { field: 'memberKey', headerName: 'MemberKey', minWidth: 110, flex: 1 },
    { field: 'member', headerName: 'Member', minWidth: 120, flex: 1 },
    { field: 'adrKeyMain', headerName: 'AdrKeyMain', minWidth: 110, flex: 1 },
    { field: 'adrKeyNew', headerName: 'AdrKeyNew', minWidth: 110, flex: 1 },
    { field: 'alternateKey', headerName: 'AlternateKey', minWidth: 120, flex: 1 },
    { field: 'proKey', headerName: 'ProKey', minWidth: 110, flex: 1 },
    { field: 'aDate', headerName: 'ADate', minWidth: 100, flex: 1 },
    { field: 'origin', headerName: 'Origin', minWidth: 80, flex: 1 },
    { field: 'class', headerName: 'Class', minWidth: 100, flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 90, flex: 1 },
    { field: 'statusDate', headerName: 'StatusDate', minWidth: 110, flex: 1 }
  ];

  const handleRowClick = (params: GridRowParams) => {
    onOpenAddress?.(params.row.adrKey);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleTypeSelect = (type: string) => {
    setAddressType(type);
    handleMenuClose();
  };

  const handleSubmit = () => {
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setAddressType('');
    setFormData({
      firmenname: '',
      vorname: '',
      nachname: '',
      email: '',
      telefon: '',
      strasse: '',
      plz: '',
      stadt: '',
      land: 'Schweiz',
      notizen: ''
    });
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 3 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={navigateToHome}
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <HomeIcon fontSize="small" />
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PeopleIcon fontSize="small" />
            Adressen
          </Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PeopleIcon /> Adressen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kontakte und Adressen verwalten
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => setIsCreateDialogOpen(true)}
              startIcon={<PersonAddIcon />}
              size="large"
            >
              Neue Adresse
            </Button>
          </Stack>

          <Box
            sx={{
              bgcolor: "info.light",
              color: "info.contrastText",
              p: 1.5,
              borderRadius: 1,
              mb: 2
            }}
          >
            <Typography variant="body2">
              <strong>Schnellaktion verfügbar: Neue Adresse hinzufügen</strong>
            </Typography>
            <Typography variant="caption">
              Klicken Sie auf "Neue Adresse" um loszulegen
            </Typography>
          </Box>

          {/* Button Group for filtering */}
          <Box sx={{ mb: 2 }}>
            <ButtonGroup>
              {filterOptions.map((option) => (
                <Button
                  key={option.key}
                  variant={activeFilter === option.key ? "contained" : "outlined"}
                  className={activeFilter === option.key ? "Mui-selected" : ""}
                  onClick={() => setActiveFilter(option.key)}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {/* FIXED: Responsive DataGrid, never overflows! */}
          <Box sx={{ width: "100%", height: 500 }}>
            <DataGrid
              rows={filteredAddressData}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } }
              }}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                }
              }}
              onRowClick={handleRowClick}
              sx={{
                border: "none",
                "& .MuiDataGrid-cell:focus": {
                  outline: "none"
                },
                "& .MuiDataGrid-row:hover": {
                  cursor: "pointer"
                }
              }}
            />
          </Box>
        </Paper>

        <Dialog
          open={isCreateDialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">
                Neue Adresse erstellen
              </Typography>
              <IconButton onClick={handleCloseDialog} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Erstellen Sie einen neuen Kontakt oder eine neue Adresse im System.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <Box>
                <Typography variant="body2" fontWeight="medium" mb={1}>
                  Adresstyp *
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<ArrowDownIcon />}
                  onClick={handleMenuOpen}
                  sx={{ justifyContent: "space-between" }}
                >
                  {!addressType
                    ? "Typ auswählen..."
                    : addressType === 'person'
                    ? 'Person'
                    : 'Unternehmen'
                  }
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleTypeSelect('person')}>
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} /> Person
                  </MenuItem>
                  <MenuItem onClick={() => handleTypeSelect('unternehmen')}>
                    <BusinessIcon fontSize="small" sx={{ mr: 1 }} /> Unternehmen
                  </MenuItem>
                </Menu>
              </Box>

              {addressType && (
                <>
                  {addressType === 'unternehmen' ? (
                    <TextField
                      label="Firmenname *"
                      fullWidth
                      value={formData.firmenname}
                      onChange={(e) => handleInputChange('firmenname', e.target.value)}
                    />
                  ) : (
                    <>
                      <TextField
                        label="Vorname *"
                        fullWidth
                        value={formData.vorname}
                        onChange={(e) => handleInputChange('vorname', e.target.value)}
                      />
                      <TextField
                        label="Nachname *"
                        fullWidth
                        value={formData.nachname}
                        onChange={(e) => handleInputChange('nachname', e.target.value)}
                      />
                    </>
                  )}
                  <TextField
                    label="E-Mail *"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <TextField
                    label="Telefon"
                    fullWidth
                    value={formData.telefon}
                    onChange={(e) => handleInputChange('telefon', e.target.value)}
                  />
                  <TextField
                    label="Strasse"
                    fullWidth
                    value={formData.strasse}
                    onChange={(e) => handleInputChange('strasse', e.target.value)}
                  />
                  <TextField
                    label="PLZ"
                    fullWidth
                    value={formData.plz}
                    onChange={(e) => handleInputChange('plz', e.target.value)}
                  />
                  <TextField
                    label="Stadt"
                    fullWidth
                    value={formData.stadt}
                    onChange={(e) => handleInputChange('stadt', e.target.value)}
                  />
                  <TextField
                    label="Land"
                    fullWidth
                    value={formData.land}
                    onChange={(e) => handleInputChange('land', e.target.value)}
                  />
                  <TextField
                    label="Notizen"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.notizen}
                    onChange={(e) => handleInputChange('notizen', e.target.value)}
                  />
                </>
              )}

              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                <Button variant="outlined" onClick={handleCloseDialog}>
                  Abbrechen
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!addressType}
                >
                  Adresse erstellen
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
