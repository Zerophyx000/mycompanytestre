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
import { useTranslation } from "react-i18next";

export const addressData = [
  // (unchanged demo data)
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
  const { t } = useTranslation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const columns: GridColDef[] = [
    { field: 'adrKey', headerName: t('address.grid.adrKey'), minWidth: 100, flex: 1 },
    { field: 'ownType', headerName: t('address.grid.ownType'), minWidth: 100, flex: 1 },
    { field: 'extTyp', headerName: t('address.grid.extTyp'), minWidth: 90, flex: 1 },
    { field: 'extKey', headerName: t('address.grid.extKey'), minWidth: 110, flex: 1 },
    { field: 'memberKey', headerName: t('address.grid.memberKey'), minWidth: 110, flex: 1 },
    { field: 'member', headerName: t('address.grid.member'), minWidth: 120, flex: 1 },
    { field: 'adrKeyMain', headerName: t('address.grid.adrKeyMain'), minWidth: 110, flex: 1 },
    { field: 'adrKeyNew', headerName: t('address.grid.adrKeyNew'), minWidth: 110, flex: 1 },
    { field: 'alternateKey', headerName: t('address.grid.alternateKey'), minWidth: 120, flex: 1 },
    { field: 'proKey', headerName: t('address.grid.proKey'), minWidth: 110, flex: 1 },
    { field: 'aDate', headerName: t('address.grid.aDate'), minWidth: 100, flex: 1 },
    { field: 'origin', headerName: t('address.grid.origin'), minWidth: 80, flex: 1 },
    { field: 'class', headerName: t('address.grid.class'), minWidth: 100, flex: 1 },
    { field: 'status', headerName: t('address.grid.status'), minWidth: 90, flex: 1 },
    { field: 'statusDate', headerName: t('address.grid.statusDate'), minWidth: 110, flex: 1 }
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
              {t("address.breadcrumb.dashboard")}
            </Link>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PeopleIcon fontSize="small" />
              <Typography variant="body2">{t("address.breadcrumb.addresses")}</Typography>
            </Stack>
          </Breadcrumbs>
        </Box>

        <Box px={3} pb={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <PeopleIcon fontSize="large" />
              <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  {t("address.header.title")}
                </Typography>
                <Typography variant="body2">
                  {t("address.header.subtitle")}
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              onClick={() => setIsCreateDialogOpen(true)}
              startIcon={<PersonAddIcon />}
              size="large"
            >
              {t("address.actions.new")}
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <PersonAddIcon fontSize="small" />
            <Typography variant="body2">{t("address.quick.add")}</Typography>
            <Typography variant="caption" ml="auto">{t("address.quick.hint")}</Typography>
          </Stack>
        </Box>

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
                rows={addressData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                onRowClick={handleRowClick}
                checkboxSelection
                disableRowSelectionOnClick={false}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>

        <Dialog open={isCreateDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">{t("address.create.title")}</Typography>
              <IconButton onClick={handleCloseDialog} size="small" aria-label={t("common.close")}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" paragraph>
              {t("address.create.desc")}
            </Typography>
            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                {t("address.create.typeLabel")} *
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleMenuOpen}
                endIcon={<ArrowDownIcon />}
              >
                {!addressType
                  ? t("address.create.typePlaceholder")
                  : addressType === 'person'
                  ? t("address.create.typePerson")
                  : t("address.create.typeCompany")
                }
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleTypeSelect('person')}>
                  <PersonIcon sx={{ mr: 1 }} /> {t("address.create.typePerson")}
                </MenuItem>
                <MenuItem onClick={() => handleTypeSelect('unternehmen')}>
                  <BusinessIcon sx={{ mr: 1 }} /> {t("address.create.typeCompany")}
                </MenuItem>
              </Menu>
            </Box>
            {addressType && (
              <Stack spacing={3}>
                {addressType === 'unternehmen' ? (
                  <TextField
                    fullWidth
                    label={t("address.form.company") + " *"}
                    placeholder={t("address.form.companyPh") ?? ""}
                    value={formData.firmenname}
                    onChange={e => handleInputChange('firmenname', e.target.value)}
                  />
                ) : (
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      label={t("address.form.firstName") + " *"}
                      placeholder={t("address.form.firstNamePh") ?? ""}
                      value={formData.vorname}
                      onChange={e => handleInputChange('vorname', e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label={t("address.form.lastName") + " *"}
                      placeholder={t("address.form.lastNamePh") ?? ""}
                      value={formData.nachname}
                      onChange={e => handleInputChange('nachname', e.target.value)}
                    />
                  </Stack>
                )}
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    label={t("address.form.email")}
                    type="email"
                    placeholder="beispiel@email.com"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label={t("address.form.phone")}
                    type="tel"
                    placeholder="+41 XX XXX XX XX"
                    value={formData.telefon}
                    onChange={e => handleInputChange('telefon', e.target.value)}
                  />
                </Stack>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label={t("address.form.street")}
                    value={formData.strasse}
                    onChange={e => handleInputChange('strasse', e.target.value)}
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label={t("address.form.zip")}
                      value={formData.plz}
                      onChange={e => handleInputChange('plz', e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label={t("address.form.city")}
                      value={formData.stadt}
                      onChange={e => handleInputChange('stadt', e.target.value)}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label={t("address.form.country")}
                    value={formData.land}
                    onChange={e => handleInputChange('land', e.target.value)}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label={t("address.form.notes")}
                  multiline
                  rows={3}
                  value={formData.notizen}
                  onChange={e => handleInputChange('notizen', e.target.value)}
                />
              </Stack>
            )}
            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4} pt={2}>
              <Button variant="outlined" onClick={handleCloseDialog}>
                {t("common.cancel")}
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!addressType}
              >
                {t("address.create.submit")}
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
