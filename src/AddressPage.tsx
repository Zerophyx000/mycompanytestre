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
    CssBaseline
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

export function AddressPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    
    const navigateToHome = () => {
        console.log('Navigate to home');
        // Navigation logic
    };
    
    // Dialog state
    const [addressType, setAddressType] = useState('');
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
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

    // Sample data from AI
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

    const handleTypeSelect = (type: string) => {
        setAddressType(type);
        setShowTypeDropdown(false);
    };

    const handleSubmit = () => {
        console.log('Form submitted:', { addressType, ...formData });
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setIsCreateDialogOpen(false);
        setAddressType('');
        setShowTypeDropdown(false);
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
            <Box sx={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: 'background.default'
            }}>
                {/* Breadcrumb */}
                <Box sx={{ px: 3, pt: 2, pb: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 'body2.fontSize' }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={navigateToHome}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                color: 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            <HomeIcon sx={{ width: 16, height: 16 }} />
                            Dashboard
                        </Link>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PeopleIcon sx={{ width: 16, height: 16 }} />
                            <Typography color="text.primary">Adressen</Typography>
                        </Box>
                    </Breadcrumbs>
                </Box>

                {/* Page Header */}
                <Box sx={{ px: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PeopleIcon sx={{ fontSize: 24, color: 'primary.main' }} />
                            <Box>
                                <Typography variant="h5" component="h1" fontWeight={600}>
                                    Adressen
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Kontakte und Adressen verwalten
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Button
                            variant="contained"
                            onClick={() => setIsCreateDialogOpen(true)}
                            startIcon={<PersonAddIcon />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 1,
                                px: 3,
                                bgcolor: 'grey.900',
                                '&:hover': {
                                    bgcolor: 'grey.700'
                                }
                            }}
                        >
                            Neue Adresse
                        </Button>
                    </Box>

                    {/* Quick Action Info */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        color: 'text.secondary',
                        fontSize: 'body2.fontSize',
                        mb: 2
                    }}>
                        <PersonAddIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">
                            Schnellaktion verfügbar: Neue Adresse hinzufügen
                        </Typography>
                        <Box sx={{ ml: 'auto', fontSize: 'caption.fontSize' }}>
                            Klicken Sie auf "Neue Adresse" um loszulegen
                        </Box>
                    </Box>
                </Box>

                {/* Data Grid */}
                <Box sx={{ flex: 1, px: 3, pb: 3 }}>
                    <Paper sx={{ height: '100%', width: '100%' }}>
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
                            sx={{
                                border: 0,
                                '& .MuiDataGrid-main': {
                                    '& .MuiDataGrid-columnHeaders': {
                                        bgcolor: 'grey.50',
                                        fontSize: 'body2.fontSize',
                                        fontWeight: 600,
                                    },
                                    '& .MuiDataGrid-cell': {
                                        fontSize: 'body2.fontSize',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                    },
                                    '& .MuiDataGrid-row:hover': {
                                        bgcolor: 'grey.50',
                                    },
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    bgcolor: 'grey.50',
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                },
                                '& .MuiDataGrid-toolbarContainer': {
                                    p: '8px 16px',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    '& .MuiButton-root': {
                                        fontSize: 'body2.fontSize',
                                    },
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
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            minHeight: '500px'
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        pb: 1
                    }}>
                        <Typography variant="h6" fontWeight={600}>
                            Neue Adresse erstellen
                        </Typography>
                        <IconButton onClick={handleCloseDialog} size="small">
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ pt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Erstellen Sie einen neuen Kontakt oder eine neue Adresse im System.
                        </Typography>

                        {/* Address Type Selection */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                Adresstyp *
                            </Typography>
                            
                            {!addressType ? (
                                <Box>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                                        endIcon={<ArrowDownIcon />}
                                        sx={{
                                            justifyContent: 'space-between',
                                            color: 'text.secondary',
                                            borderColor: 'grey.300',
                                            bgcolor: 'grey.50',
                                            textTransform: 'none',
                                            py: 1.5,
                                            '&:hover': {
                                                bgcolor: 'grey.100'
                                            }
                                        }}
                                    >
                                        Typ auswählen...
                                    </Button>
                                    
                                    {showTypeDropdown && (
                                        <Box sx={{ 
                                            mt: 1, 
                                            border: '1px solid', 
                                            borderColor: 'grey.300', 
                                            borderRadius: 1,
                                            bgcolor: 'background.paper',
                                            boxShadow: 1
                                        }}>
                                            <Button
                                                fullWidth
                                                startIcon={<PersonIcon />}
                                                onClick={() => handleTypeSelect('person')}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    textTransform: 'none',
                                                    py: 1.5,
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                            >
                                                Person
                                            </Button>
                                            <Button
                                                fullWidth
                                                startIcon={<BusinessIcon />}
                                                onClick={() => handleTypeSelect('unternehmen')}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    textTransform: 'none',
                                                    py: 1.5,
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                            >
                                                Unternehmen
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            ) : (
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={addressType === 'person' ? <PersonIcon /> : <BusinessIcon />}
                                    onClick={() => {
                                        setAddressType('');
                                        setShowTypeDropdown(false);
                                    }}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: 'text.primary',
                                        borderColor: 'grey.300',
                                        bgcolor: 'background.paper',
                                        textTransform: 'none',
                                        py: 1.5
                                    }}
                                >
                                    {addressType === 'person' ? 'Person' : 'Unternehmen'}
                                </Button>
                            )}
                        </Box>

                        {/* Form Fields */}
                        {addressType && (
                            <Stack spacing={2.5}>
                                {/* Company Name or Person Name */}
                                {addressType === 'unternehmen' ? (
                                    <Box>
                                        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                            Firmenname *
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Beispiel GmbH"
                                            value={formData.firmenname}
                                            onChange={(e) => handleInputChange('firmenname', e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: 'grey.50'
                                                }
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                                Vorname *
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Max"
                                                value={formData.vorname}
                                                onChange={(e) => handleInputChange('vorname', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                                Nachname *
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Mustermann"
                                                value={formData.nachname}
                                                onChange={(e) => handleInputChange('nachname', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Stack>
                                )}

                                {/* Email and Phone */}
                                <Stack direction="row" spacing={2}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                            E-Mail
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="beispiel@email.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: 'grey.50'
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                            Telefon
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="+41 XX XXX XX XX"
                                            value={formData.telefon}
                                            onChange={(e) => handleInputChange('telefon', e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: 'grey.50'
                                                }
                                            }}
                                        />
                                    </Box>
                                </Stack>

                                {/* Address */}
                                <Box>
                                    <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                        Adresse
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Straße und Hausnummer"
                                        value={formData.strasse}
                                        onChange={(e) => handleInputChange('strasse', e.target.value)}
                                        sx={{
                                            mb: 2,
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'grey.50'
                                            }
                                        }}
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ width: '30%' }}>
                                            <TextField
                                                fullWidth
                                                placeholder="PLZ"
                                                value={formData.plz}
                                                onChange={(e) => handleInputChange('plz', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <TextField
                                                fullWidth
                                                placeholder="Stadt"
                                                value={formData.stadt}
                                                onChange={(e) => handleInputChange('stadt', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Stack>
                                    <TextField
                                        fullWidth
                                        value={formData.land}
                                        onChange={(e) => handleInputChange('land', e.target.value)}
                                        sx={{
                                            mt: 2,
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'grey.50'
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Notes */}
                                <Box>
                                    <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                        Notizen
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Zusätzliche Informationen..."
                                        value={formData.notizen}
                                        onChange={(e) => handleInputChange('notizen', e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'grey.50'
                                            }
                                        }}
                                    />
                                </Box>
                            </Stack>
                        )}

                        {/* Action Buttons */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            gap: 2, 
                            mt: 4,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Button
                                variant="outlined"
                                onClick={handleCloseDialog}
                                sx={{ 
                                    textTransform: 'none',
                                    px: 3,
                                    borderColor: 'grey.300',
                                    color: 'text.secondary'
                                }}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!addressType}
                                sx={{ 
                                    textTransform: 'none',
                                    px: 3,
                                    bgcolor: 'grey.900',
                                    '&:hover': {
                                        bgcolor: 'grey.700'
                                    }
                                }}
                            >
                                Adresse erstellen
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </>
    );
}
