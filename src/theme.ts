// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#1976d2",  // Standard blue for accent elements
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F5F5F5",  // Light gray for sidebars
      contrastText: "#333333",
    },
    error: {
      main: "#EF4444",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10B981",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F59E0B",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FAFAFA",  // Very light gray background (main area)
      paper: "#ffffff",     // Pure white for cards/papers
    },
    text: {
      primary: "#333333",   // Dark gray for main text
      secondary: "#757575", // Medium gray for secondary text
      disabled: "#BDBDBD",
    },
    divider: "#E0E0E0",  // Light gray borders
    action: {
      hover: "#F5F5F5",
      selected: "#E3F2FD",
      disabled: "#E0E0E0",
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.8125rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: "none",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: "0.8125rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      lineHeight: 1.5,
      color: "#757575",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "14px",
          margin: 0,
          padding: 0,
        },
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#FAFAFA",
        },
        // Scrollbar styles
        '.scrollbar-hide': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#BDBDBD',
          borderRadius: '3px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#9E9E9E',
        },
        
        // DashboardLite.css styles
        '.dashboard-root': {
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAFAFA',
        },
        '.dashboard-content': {
          width: '100%',
          maxWidth: '100%',
          padding: '0 24px',
          boxSizing: 'border-box',
        },
        '.table-wrapper': {
          height: '400px',
          width: '100%',
        },
        '.flex-grow': {
          flexGrow: 1,
        },
        '.ml-8': {
          marginLeft: '8px',
        },
        '.ml-16': {
          marginLeft: '16px',
        },
        '.mt-8': {
          marginTop: '8px',
        },
        '.mt-16': {
          marginTop: '16px',
        },
        '.mt-24': {
          marginTop: '24px',
        },
        '.mb-24': {
          marginBottom: '24px',
        },
        '.overview-card': {
          display: 'flex',
          alignItems: 'center',
        },
        
        // SchadenTabs.css styles
        '.schaden-tabs-shell': {
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: '#FAFAFA',
        },
        '.schaden-tabs-breadcrumbs': {
          padding: '8px 16px',
          backgroundColor: '#FAFAFA',
        },
        '.schaden-tabs-grid': {
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: '16px',
          width: '100%',
          padding: '0 0 16px 16px',
          boxSizing: 'border-box',
        },
        '.schaden-tabs-main': {
          minWidth: 0,
        },
        '.schaden-tabs-rightnav': {
          borderRadius: '8px',
          height: 'fit-content',
          position: 'sticky',
          top: '56px',
        },
        '.panel': {
          borderRadius: '8px',
        },
        
        // SchadenOverviewPage.css styles
        '.schaden-overview-root': {
          width: '100%',
          boxSizing: 'border-box',
        },
        '.schaden-overview-grid': {
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '16px',
          width: '100%',
        },
        '.schaden-sidebar': {
          flex: '0 0 280px',
          maxWidth: '280px',
        },
        '.schaden-center': {
          minWidth: 0,
          width: '100%',
        },
        '.col-main, .col-rel': {
          minWidth: 0,
        },
        '.card': {
          borderRadius: '8px',
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',  // LIGHT GRAY, not dark blue!
          color: '#333333',             // Dark text
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',  // Light gray for toolbar
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',  // White background for tabs
          borderBottom: '1px solid #E0E0E0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
          border: '1px solid #E0E0E0',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '6px 16px',
        },
        contained: {
          backgroundColor: '#333333',  // Dark gray/black button
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#424242',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#ffffff',
          boxShadow: 'none',
        },
        outlined: {
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: "#ffffff",
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#BDBDBD',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        colorSuccess: {
          backgroundColor: '#D1FAE5',
          color: '#065F46',
        },
        colorWarning: {
          backgroundColor: '#FEF3C7',
          color: '#92400E',
        },
        colorError: {
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #F5F5F5',
          padding: '12px 16px',
          fontSize: '0.8125rem',
        },
        head: {
          backgroundColor: '#FAFAFA',
          fontWeight: 600,
          color: '#616161',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: '#E3F2FD',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#BBDEFB',
            },
          },
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#757575',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#90CAF9",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: theme.typography,
  shape: theme.shape,
  components: theme.components,
});

export default theme;
