import { Box, Typography } from '@mui/material';

export default function AddressNotes() {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Notiz
            </Typography>
            <Typography variant="body2" gutterBottom>
                Notizen und Anmerkungen
            </Typography>
            <Box mt={4} p={4} textAlign="center">
                
            </Box>
        </Box>
    );
}
