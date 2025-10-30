import { createTheme } from "@mui/material/styles";

// ========================================
// DESIGN TOKENS
// ========================================

// Brand Colors
const brand = {
  10: "#1E2F4B",
  20: "#293F61",
  30: "#344F78",
  40: "#3F5F8E",
  50: "#4A6FA5",
  60: "#6C90C0",
  70: "#87A9D5",
  80: "#ACC4E3",
  90: "#D2DFF0",
  100: "#E9EFF6",
};

// Red Colors
const red = {
  10: "#300603",
  20: "#4D0B0A",
  30: "#690807",
  40: "#900B09",
  50: "#C00F0C",
  60: "#EC221F",
  70: "#F4776A",
  80: "#FCB3AD",
  90: "#FDD3D0",
  100: "#FEE9E7",
};

// Green Colors
const green = {
  10: "#062D1B",
  20: "#024023",
  30: "#02542D",
  40: "#008043",
  50: "#009951",
  60: "#14AE5C",
  70: "#85E0A3",
  80: "#AFF4C6",
  90: "#CFF7D3",
  100: "#EBFFEE",
};

// Yellow Colors
const yellow = {
  10: "#401B01",
  20: "#522504",
  30: "#682D03",
  40: "#975102",
  50: "#BF6A02",
  60: "#E5A000",
  70: "#F5BA16",
  80: "#FFE8A3",
  90: "#FFF1C2",
  100: "#FFFBEB",
};

// Slate Colors
const slate = {
  10: "#242424",
  20: "#303030",
  30: "#434343",
  40: "#5A5A5A",
  50: "#767676",
  60: "#949494",
  70: "#B2B2B2",
  80: "#CDCDCD",
  90: "#E3E3E3",
  100: "#F3F3F3",
};

// Grey Colors
const grey = {
  10: "#111111",
  20: "#1E1E1E",
  30: "#2C2C2C",
  40: "#383838",
  50: "#444444",
  60: "#757575",
  70: "#B3B3B3",
  80: "#D9D9D9",
  90: "#E6E6E6",
  100: "#F5F5F5",
};

// Pink Colors
const pink = {
  10: "#3F1536",
  20: "#57184A",
  30: "#8A226F",
  40: "#BA2A92",
  50: "#D732A8",
  60: "#EA3FB8",
  70: "#F19EDC",
  80: "#F5C0EF",
  90: "#FAE1FA",
  100: "#FCF1FD",
};

// White scale (for overlays/transparency)
const white = {
  0: "rgba(255, 255, 255, 0)",
  10: "rgba(255, 255, 255, 0.1)",
  20: "rgba(255, 255, 255, 0.2)",
  30: "rgba(255, 255, 255, 0.3)",
  40: "rgba(255, 255, 255, 0.4)",
  50: "rgba(255, 255, 255, 0.5)",
  60: "rgba(255, 255, 255, 0.6)",
  70: "rgba(255, 255, 255, 0.7)",
  80: "rgba(255, 255, 255, 0.8)",
  90: "rgba(255, 255, 255, 0.9)",
  95: "rgba(255, 255, 255, 0.95)",
  100: "#FFFFFF",
};

// Black scale (for overlays/transparency)
const black = {
  0: "rgba(0, 0, 0, 0)",
  10: "rgba(0, 0, 0, 0.1)",
  20: "rgba(0, 0, 0, 0.2)",
  30: "rgba(0, 0, 0, 0.3)",
  40: "rgba(0, 0, 0, 0.4)",
  50: "rgba(0, 0, 0, 0.5)",
  60: "rgba(0, 0, 0, 0.6)",
  70: "rgba(0, 0, 0, 0.7)",
  80: "rgba(0, 0, 0, 0.8)",
  90: "rgba(0, 0, 0, 0.9)",
  95: "rgba(0, 0, 0, 0.95)",
  100: "#000000",
};

// ========================================
// MUI THEME
// ========================================

const theme = createTheme({
  palette: {
    mode: "light",
    
    // Primary - Brand Blue
    primary: {
      main: brand[40],
      light: brand[60],
      dark: brand[20],
      contrastText: white[100],
    },
    
    // Secondary - Slate/Grey
    secondary: {
      main: slate[50],
      light: slate[70],
      dark: slate[30],
      contrastText: white[100],
    },
    
    // Error - Red
    error: {
      main: red[50],
      light: red[70],
      dark: red[30],
      contrastText: white[100],
    },
    
    // Warning - Yellow/Orange
    warning: {
      main: yellow[50],
      light: yellow[70],
      dark: yellow[30],
      contrastText: black[100],
    },
    
    // Info - Brand Blue (lighter)
    info: {
      main: brand[50],
      light: brand[70],
      dark: brand[30],
      contrastText: white[100],
    },
    
    // Success - Green
    success: {
      main: green[50],
      light: green[70],
      dark: green[30],
      contrastText: white[100],
    },
    
    // Background
    background: {
      default: grey[100],
      paper: white[100],
    },
    
    // Text
    text: {
      primary: grey[10],
      secondary: grey[60],
      disabled: grey[70],
    },
    
    // Divider
    divider: grey[90],
    
    // Action states
    action: {
      active: brand[40],
      hover: grey[100],
      selected: brand[90],
      disabled: grey[80],
      disabledBackground: grey[90],
      focus: brand[80],
    },
  },
  
  // ========================================
  // TYPOGRAPHY
  // ========================================
  typography: {
    fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    
    // Display styles (Hero titles)
    h1: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "3.75rem", // 60px Desktop
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "2.25rem", // 36px Mobile
      },
    },
    
    // Title styles (Page titles)
    h2: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "2.25rem", // 36px Desktop
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.75rem", // 28px Mobile
      },
    },
    
    // SecondTitle styles (Section headers)
    h3: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1.75rem", // 28px Desktop
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.375rem", // 22px Mobile
      },
    },
    
    // Body text (Paragraphs)
    body1: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1rem", // 16px Desktop
      lineHeight: 1.5,
      "@media (max-width:600px)": {
        fontSize: "1rem", // 16px Mobile
      },
    },
    
    // BodySmall (Secondary info)
    body2: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "0.875rem", // 14px Desktop
      lineHeight: 1.5,
      "@media (max-width:600px)": {
        fontSize: "0.875rem", // 14px Mobile
      },
    },
    
    // LABEL (Buttons, form labels) - UPPERCASE
    button: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.5,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    
    // Caption (Notes, footers)
    caption: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.5,
    },
    
    // Emphasized variants (Bold)
    h4: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "1.75rem", // 28px Desktop (Emphasized)
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.5rem", // 24px Mobile
      },
    },
    
    h5: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "1.125rem", // 18px Mobile (Emphasized)
      lineHeight: 1.5,
    },
    
    h6: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "1rem", // 16px (Emphasized body)
      lineHeight: 1.5,
    },
  },
  
  // ========================================
  // SHAPE & SPACING
  // ========================================
  shape: {
    borderRadius: 8,
  },
  
  spacing: 8, // Base 8px grid
  
  // ========================================
  // COMPONENT OVERRIDES
  // ========================================
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "16px",
          margin: 0,
          padding: 0,
        },
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: grey[100],
        },
        // Scrollbar
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: grey[70],
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: grey[60],
        },
      },
    },
    
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        grouped: {
          minWidth: 'auto',
        },
      },
    },
    
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "uppercase",
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '8px 16px',
        },
        contained: {
          backgroundColor: brand[40],
          color: white[100],
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: brand[30],
            boxShadow: 'none',
          },
          '&.Mui-selected': {
            backgroundColor: brand[80],
            color: brand[30],
          },
        },
        outlined: {
          borderColor: grey[80],
          color: grey[40],
          '&:hover': {
            borderColor: grey[70],
            backgroundColor: grey[100],
          },
          '&.Mui-selected': {
            backgroundColor: brand[90],
            borderColor: brand[40],
            color: brand[30],
          },
        },
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: `1px solid ${grey[90]}`,
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: white[100],
        },
      },
    },
    
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          color: grey[10],
          boxShadow: 'none',
          borderBottom: `1px solid ${grey[90]}`,
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': {
              borderColor: grey[80],
            },
            '&:hover fieldset': {
              borderColor: grey[70],
            },
            '&.Mui-focused fieldset': {
              borderColor: brand[40],
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
        },
        colorSuccess: {
          backgroundColor: green[80],
          color: green[30],
        },
        colorWarning: {
          backgroundColor: yellow[80],
          color: yellow[30],
        },
        colorError: {
          backgroundColor: red[80],
          color: red[30],
        },
      },
    },
    
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${grey[90]}`,
          padding: '12px 16px',
        },
        head: {
          backgroundColor: grey[100],
          fontWeight: 600,
          color: grey[50],
          fontSize: '0.75rem',
          textTransform: 'uppercase',
        },
      },
    },
    
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '&.Mui-selected': {
            backgroundColor: brand[90],
            color: brand[30],
            '&:hover': {
              backgroundColor: brand[80],
            },
          },
          '&:hover': {
            backgroundColor: grey[100],
          },
        },
      },
    },
  },
});

export default theme;

// Export color tokens for custom usage
export const colors = {
  brand,
  red,
  green,
  yellow,
  slate,
  grey,
  pink,
  white,
  black,
};
