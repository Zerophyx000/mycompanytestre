// themes/darkThemes/darkTheme.ts

import { createTheme } from "@mui/material/styles";
import { baseThemeOptions } from "../baseThemeOptions";

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: "#90CAF9", contrastText: "#000000" },
    secondary: { main: "#424242", contrastText: "#ffffff" },
    error: { main: "#f48fb1", contrastText: "#000000" },
    success: { main: "#81c784", contrastText: "#000000" },
    warning: { main: "#ffb74d", contrastText: "#000000" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#FFFFFF", secondary: "#B0B0B0", disabled: "#666666" },
    divider: "#424242",
    action: { hover: "#2C2C2C", selected: "#1A237E", disabled: "#424242" },
  },
  components: {
    ...baseThemeOptions.components,
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#1E1E1E', color: '#FFFFFF', boxShadow: 'none', borderBottom: '1px solid #424242' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, textTransform: "none", fontWeight: 500, fontSize: '0.875rem', padding: '6px 16px' },
        contained: {
          backgroundColor: '#90CAF9',
          color: '#000000',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#64B5F6', boxShadow: 'none' },
        },
        outlined: {
          borderColor: '#424242',
          color: '#B0B0B0',
          '&:hover': { borderColor: '#616161', backgroundColor: '#2C2C2C' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.24)",
          border: '1px solid #424242',
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8, backgroundColor: '#1E1E1E', boxShadow: 'none' },
        outlined: { border: '1px solid #424242' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: "#1E1E1E",
            '& fieldset': { borderColor: '#424242' },
            '&:hover fieldset': { borderColor: '#616161' },
            '&.Mui-focused fieldset': { borderColor: '#90CAF9', borderWidth: '2px' },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: '#1A237E',
            color: '#90CAF9',
            '&:hover': { backgroundColor: '#283593' },
          },
          '&:hover': { backgroundColor: '#2C2C2C' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #424242', padding: '12px 16px', fontSize: '0.8125rem' },
        head: {
          backgroundColor: '#1E1E1E',
          fontWeight: 600,
          color: '#B0B0B0',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500, fontSize: '0.75rem' },
        colorSuccess: { backgroundColor: '#2e7d32', color: '#81c784' },
        colorWarning: { backgroundColor: '#f57c00', color: '#ffb74d' },
        colorError: { backgroundColor: '#c62828', color: '#f48fb1' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { margin: 0, padding: 0, backgroundColor: "#121212" },
        '.dashboard-root': { backgroundColor: '#121212' },
        '.schaden-tabs-shell': { backgroundColor: '#121212' },
        '.schaden-tabs-breadcrumbs': { backgroundColor: '#121212' },
        ...(typeof baseThemeOptions.components?.MuiCssBaseline?.styleOverrides === 'object' 
          ? baseThemeOptions.components.MuiCssBaseline.styleOverrides 
          : {})
      },
    },
  },
});
