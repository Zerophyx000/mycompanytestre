// themes/lightThemes/greenTheme.ts

import { createTheme } from "@mui/material/styles";
import { baseThemeOptions } from "../baseThemeOptions";

export const greenTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: "#388e3c", contrastText: "#ffffff" },
    secondary: { main: "#F5F5F5", contrastText: "#333333" },
    error: { main: "#EF4444", contrastText: "#ffffff" },
    success: { main: "#2e7d32", contrastText: "#ffffff" },
    warning: { main: "#F59E0B", contrastText: "#ffffff" },
    background: { default: "#FAFAFA", paper: "#ffffff" },
    text: { primary: "#333333", secondary: "#757575", disabled: "#BDBDBD" },
    divider: "#E0E0E0",
    action: { hover: "#F5F5F5", selected: "#E8F5E9", disabled: "#E0E0E0" },
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
          backgroundColor: '#388e3c',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#2e7d32', boxShadow: 'none' },
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
            backgroundColor: '#E8F5E9',
            color: '#388e3c',
            '&:hover': { backgroundColor: '#C8E6C9' },
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
            '&.Mui-focused fieldset': { borderColor: '#388e3c', borderWidth: '2px' },
          },
        },
      },
    },
  },
});
