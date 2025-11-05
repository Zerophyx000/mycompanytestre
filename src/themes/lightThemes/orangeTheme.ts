// themes/lightThemes/orangeTheme.ts

import { createTheme } from "@mui/material/styles";
import { baseThemeOptions } from "../baseThemeOptions";

export const orangeTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: "#f57c00", contrastText: "#ffffff" },
    secondary: { main: "#F5F5F5", contrastText: "#333333" },
    error: { main: "#EF4444", contrastText: "#ffffff" },
    success: { main: "#10B981", contrastText: "#ffffff" },
    warning: { main: "#ef6c00", contrastText: "#ffffff" },
    background: { default: "#FAFAFA", paper: "#ffffff" },
    text: { primary: "#333333", secondary: "#757575", disabled: "#BDBDBD" },
    divider: "#E0E0E0",
    action: { hover: "#F5F5F5", selected: "#FFF3E0", disabled: "#E0E0E0" },
  },
  components: {
    ...baseThemeOptions.components,
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#F5F5F5', color: '#333333', boxShadow: 'none', borderBottom: '1px solid #E0E0E0' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, textTransform: "none", fontWeight: 500, fontSize: '0.875rem', padding: '6px 16px' },
        contained: {
          backgroundColor: '#f57c00',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#ef6c00', boxShadow: 'none' },
        },
        outlined: {
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': { borderColor: '#BDBDBD', backgroundColor: '#FAFAFA' },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: '#FFF3E0',
            color: '#f57c00',
            '&:hover': { backgroundColor: '#FFE0B2' },
          },
          '&:hover': { backgroundColor: '#F5F5F5' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: "#ffffff",
            '& fieldset': { borderColor: '#E0E0E0' },
            '&:hover fieldset': { borderColor: '#BDBDBD' },
            '&.Mui-focused fieldset': { borderColor: '#f57c00', borderWidth: '2px' },
          },
        },
      },
    },
  },
});
