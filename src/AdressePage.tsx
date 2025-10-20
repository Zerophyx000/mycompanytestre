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
    MenuItem
} from '@mui/material';
import {
    Home as HomeIcon,
    People as PeopleIcon,
    PersonAdd as PersonAddIcon,
    Close as CloseIcon,
    Business as BusinessIcon,
    Person as PersonIcon,
    KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
export default function AddressPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const navigateToHome = () => {
        console.log('Navigate to home');
    };
    
    // Dialog state
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

    // Sample data
    const rows = [
        {
            id: 1,
            adrKey: 'ADR001234',
            ownType: 'Individual',
            extTyp: 'Update',
            extKey: 'EXT7891',
            memberKey: 'MBR45678',
            member: 'John Smith',
            adrKeyMain: 'ADR001234',
            adrKeyNew: 'ADR001235',
            alternateKey: 'ALT789123',
            proKey: 'PRO456789',
            aDate: '2024-01-15',
            origin: 'Web',
            class: 'Premium',
            status: 'Active',
            statusDate: '2024-01-15'
        },
        {
            id: 2,
            adrKey: 'ADR002345',
            ownType: 'Company',
            extTyp: 'Create',
            extKey: 'EXT7892',
            memberKey: 'MBR45679',
            member: 'Jane Doe',
            adrKeyMain: 'ADR002345',
            adrKeyNew: 'ADR002346',
            alternateKey: 'ALT789124',
            proKey: 'PRO456790',
            aDate: '2024-01-16',
            origin: 'Import',
            class: 'Standard',
            status: 'Pending',
            statusDate: '2024-01-16'
        },
        {
            id: 3,
            adrKey: 'ADR003456',
            ownType: 'Partnership',
            extTyp: 'Delete',
            extKey: 'EXT7893',
            memberKey: 'MBR45680',
            member: 'Bob Johnson',
            adrKeyMain: 'ADR003456',
            adrKeyNew: 'ADR003457',
            alternateKey: 'ALT789125',
            proKey: 'PRO456791',
            aDate: '2024-01-17',
            origin: 'Manual',
            class: 'Basic',
            status: 'Inactive',
            statusDate: '2024-01-17'
        },
        {
            id: 4,
            adrKey: 'ADR004567',
            ownType: 'Individual',
            extTyp: 'Update',
            extKey: 'EXT7894',
            memberKey: 'MBR45681',
            member: 'Sarah Wilson',
            adrKeyMain: 'ADR004567',
            adrKeyNew: 'ADR004568',
            alternateKey: 'ALT789126',
            proKey: 'PRO456792',
            aDate: '2024-01-18',
            origin: 'API',
            class: 'Premium',
            status: 'Active',
            statusDate: '2024-01-18'
        },
        {
            id: 5,
            adrKey: 'ADR005678',
            ownType: 'Company',
            extTyp: 'Create',
            extKey: 'EXT7895',
            memberKey: 'MBR45682',
            member: 'Mike Brown',
            adrKeyMain: 'ADR005678',
            adrKeyNew: 'ADR005679',
            alternateKey: 'ALT789127',
            proKey: 'PRO456793',
            aDate: '2024-01-19',
            origin: 'Batch',
            class: 'Enterprise',
            status: 'Active',
            statusDate: '2024-01-19'
        }
    ];

    const columns = [
        { field: 'adrKey', headerName: 'AdrKey', width: 100 },
        { field: 'ownType', headerName: 'OwnType', width: 100 },
        { field: 'extTyp', headerName: 'ExtTyp', width: 80 },
        { field: 'extKey', headerName: 'ExtKey', width: 90 },
        { field: 'memberKey', headerName: 'MemberKey', width: 110 },
        { field: 'member', headerName: 'Member', width: 120 },
        { field: 'adrKeyMain', headerName: 'AdrKeyMain', width: 110 },
        { field: 'adrKeyNew', headerName: 'AdrKeyNew', width: 110 },
        { field: 'alternateKey', headerName: 'AlternateKey', width: 120 },
        { field: 'proKey', headerName: 'ProKey', width: 110 },
        { field: 'aDate', headerName: 'ADate', width: 100 },
        { field: 'origin', headerName: 'Origin', width: 80 },
        { field: 'class', headerName: 'Class', width: 100 },
        { field: 'status', headerName: 'Status', width: 90 },
        { field: 'statusDate', headerName: 'StatusDate', width: 110 }
    ];

    // Dialog handlers
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTypeSelect = (type: string) => {
        setAddressType(type);
        handleMenuClose();
    };

    const handleSubmit = () => {
        console.log('Form submitted:', { addressType, ...formData });
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
            <Box 
                component="main"
                sx={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: 'background.default'
                }}
            >
                {/* Breadcrumb */}
                <Box sx={{ px: 3, pt: 2, pb: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={navigateToHome}
                            color="text.secondary"
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <HomeIcon fontSize="small" />
                            Dashboard
                        </Link>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PeopleIcon fontSize="small" />
                            <Typography variant="body2" color="text.primary">
                                Adressen
                            </Typography>
                        </Stack>
                    </Breadcrumbs>
                </Box>

                {/* Page Header */}
                <Box sx={{ px: 3, pb: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <PeopleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                            <Box>
                                <Typography variant="h4" component="h1" fontWeight="bold">
                                    Adressen
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Kontakte und Adressen verwalten
                                </Typography>
                            </Box>
                        </Stack>
                        
                        <Button
                            variant="contained"
                            onClick={() => setIsCreateDialogOpen(true)}
                            startIcon={<PersonAddIcon />}
                            size="large"
                            sx={{ px: 3 }}
                        >
                            Neue Adresse
                        </Button>
                    </Stack>

                    {/* Quick Action Info */}
                    <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={1}
                        color="text.secondary"
                        mb={2}
                    >
                        <PersonAddIcon fontSize="small" />
                        <Typography variant="body2">
                            Schnellaktion verfügbar: Neue Adresse hinzufügen
                        </Typography>
                        <Typography variant="caption" sx={{ ml: 'auto' }}>
                            Klicken Sie auf "Neue Adresse" um loszulegen
                        </Typography>
                    </Stack>
                </Box>

                {/* Data Grid */}
                <Box sx={{ flex: 1, px: 3, pb: 3 }}>
                    <Paper elevation={1}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 25, 50]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            slots={{
                                toolbar: GridToolbar,
                            }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                        />
                    </Paper>
                </Box>

                {/* Create Address Dialog */}
                <Dialog
                    open={isCreateDialogOpen}
                    onClose={handleCloseDialog}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ elevation: 8 }}
                >
                    <DialogTitle>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">
                                Neue Adresse erstellen
                            </Typography>
                            <IconButton onClick={handleCloseDialog} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </DialogTitle>

                    <DialogContent>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Erstellen Sie einen neuen Kontakt oder eine neue Adresse im System.
                        </Typography>

                        {/* Address Type Selection */}
                        <Box mb={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Adresstyp *
                            </Typography>
                            
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleMenuOpen}
                                endIcon={<ArrowDownIcon />}
                                color="inherit"
                                sx={{ justifyContent: 'space-between', py: 1.5 }}
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
                                    <PersonIcon sx={{ mr: 1 }} />
                                    Person
                                </MenuItem>
                                <MenuItem onClick={() => handleTypeSelect('unternehmen')}>
                                    <BusinessIcon sx={{ mr: 1 }} />
                                    Unternehmen
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* Form Fields */}
                        {addressType && (
                            <Stack spacing={3}>
                                {/* Company Name or Person Name */}
                                {addressType === 'unternehmen' ? (
                                    <TextField
                                        fullWidth
                                        label="Firmenname *"
                                        placeholder="Beispiel GmbH"
                                        value={formData.firmenname}
                                        onChange={(e) => handleInputChange('firmenname', e.target.value)}
                                        variant="outlined"
                                    />
                                ) : (
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Vorname *"
                                            placeholder="Max"
                                            value={formData.vorname}
                                            onChange={(e) => handleInputChange('vorname', e.target.value)}
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Nachname *"
                                            placeholder="Mustermann"
                                            value={formData.nachname}
                                            onChange={(e) => handleInputChange('nachname', e.target.value)}
                                            variant="outlined"
                                        />
                                    </Stack>
                                )}

                                {/* Email and Phone */}
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        label="E-Mail"
                                        type="email"
                                        placeholder="beispiel@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Telefon"
                                        type="tel"
                                        placeholder="+41 XX XXX XX XX"
                                        value={formData.telefon}
                                        onChange={(e) => handleInputChange('telefon', e.target.value)}
                                        variant="outlined"
                                    />
                                </Stack>

                                {/* Address */}
                                <Stack spacing={2}>
                                    <TextField
                                        fullWidth
                                        label="Straße und Hausnummer"
                                        placeholder="Musterstraße 123"
                                        value={formData.strasse}
                                        onChange={(e) => handleInputChange('strasse', e.target.value)}
                                        variant="outlined"
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            label="PLZ"
                                            placeholder="8000"
                                            value={formData.plz}
                                            onChange={(e) => handleInputChange('plz', e.target.value)}
                                            variant="outlined"
                                            sx={{ width: '30%' }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Stadt"
                                            placeholder="Zürich"
                                            value={formData.stadt}
                                            onChange={(e) => handleInputChange('stadt', e.target.value)}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <TextField
                                        fullWidth
                                        label="Land"
                                        value={formData.land}
                                        onChange={(e) => handleInputChange('land', e.target.value)}
                                        variant="outlined"
                                    />
                                </Stack>

                                {/* Notes */}
                                <TextField
                                    fullWidth
                                    label="Notizen"
                                    multiline
                                    rows={3}
                                    placeholder="Zusätzliche Informationen..."
                                    value={formData.notizen}
                                    onChange={(e) => handleInputChange('notizen', e.target.value)}
                                    variant="outlined"
                                />
                            </Stack>
                        )}

                        {/* Action Buttons */}
                        <Stack 
                            direction="row" 
                            justifyContent="flex-end" 
                            spacing={2} 
                            sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}
                        >
                            <Button
                                variant="outlined"
                                onClick={handleCloseDialog}
                                color="inherit"
                            >
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
                    </DialogContent>
                </Dialog>
            </Box>
        </>
    );
}
