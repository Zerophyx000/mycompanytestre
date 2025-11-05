import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { blueTheme } from "./themes"
import "./i18n";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={blueTheme}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
    
  </StrictMode>,
)
