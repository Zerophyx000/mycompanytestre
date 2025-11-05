// src/theme/index.ts
import { createTheme, alpha } from "@mui/material/styles";
import { blueTheme } from "./lightThemes/blueTheme";
import { redTheme } from "./lightThemes/redTheme";
import { orangeTheme } from "./lightThemes/orangeTheme";
import { yellowTheme } from "./lightThemes/yellowTheme";
import { greenTheme } from "./lightThemes/greenTheme";
import { limeTheme } from "./lightThemes/limeTheme";
import { purpleTheme } from "./lightThemes/purpleTheme";
import { blackTheme } from "./lightThemes/blackTheme";
import { darkTheme } from "./darkThemes/darkTheme";

type Preset = "blue" | "red" | "orange" | "yellow" | "green" | "lime" | "purple" | "black" | "dark";

const PRESET_KEY = "app.theme.preset";
const LS_PRIMARY = "app.theme.primary";
const LS_SECONDARY = "app.theme.secondary";
const LS_RADIUS = "app.theme.radius";
const LS_FONT_URL = "app.theme.fontUrl";
const LS_FONT_FAMILY = "app.theme.fontFamily";

const read = (k: string) => (typeof window !== "undefined" ? localStorage.getItem(k) : null);

function getPreset(): Preset {
  const v = (read(PRESET_KEY) as Preset) || "blue";
  const allow: Preset[] = ["blue","red","orange","yellow","green","lime","purple","black","dark"];
  return allow.includes(v) ? v : "blue";
}

function pickTheme(p: Preset) {
  if (p === "red") return redTheme;
  if (p === "orange") return orangeTheme;
  if (p === "yellow") return yellowTheme;
  if (p === "green") return greenTheme;
  if (p === "lime") return limeTheme;
  if (p === "purple") return purpleTheme;
  if (p === "black") return blackTheme;
  if (p === "dark") return darkTheme;
  return blueTheme;
}

// already added earlier to make color overrides propagate
function paletteDrivenComponentOverrides() {
  return {
    MuiButton: {
      styleOverrides: {
        contained: ({ theme }: any) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }),
        outlined: ({ theme }: any) => ({
          borderColor: alpha(theme.palette.primary.main, 0.5),
          color: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
          },
        }),
        text: ({ theme }: any) => ({
          color: theme.palette.primary.main,
          "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.06) },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }: any) => ({ backgroundColor: theme.palette.primary.main }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: any) => ({ "&.Mui-selected": { color: theme.palette.primary.main } }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          color: alpha(theme.palette.primary.main, 0.6),
          "&.Mui-checked": { color: theme.palette.primary.main },
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          color: alpha(theme.palette.primary.main, 0.6),
          "&.Mui-checked": { color: theme.palette.primary.main },
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: ({ theme }: any) => ({
          "&.Mui-checked": {
            color: theme.palette.primary.main,
            "& + .MuiSwitch-track": { backgroundColor: theme.palette.primary.main },
          },
        }),
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: ({ theme }: any) => ({ color: theme.palette.primary.main }),
        track: ({ theme }: any) => ({ color: theme.palette.primary.main }),
        rail: ({ theme }: any) => ({ color: alpha(theme.palette.primary.main, 0.4) }),
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: ({ theme }: any) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          color: theme.palette.primary.main,
          "&:hover": { color: theme.palette.primary.dark },
        }),
      },
    },
  };
}

function ensureFontLinks(fontUrl: string) {
  if (typeof document === "undefined" || !fontUrl) return;
  const id = "app-theme-font-link";
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }
  if (fontUrl.includes("fonts.googleapis.com") && !document.getElementById("app-theme-font-preconnect")) {
    const pre = document.createElement("link");
    pre.id = "app-theme-font-preconnect";
    pre.rel = "preconnect";
    pre.href = "https://fonts.gstatic.com";
    pre.crossOrigin = "anonymous";
    document.head.appendChild(pre);
  }
}

function withRuntimeOverrides(base: ReturnType<typeof createTheme>) {
  const primary = read(LS_PRIMARY) || undefined;
  const secondary = read(LS_SECONDARY) || undefined;
  const radius = read(LS_RADIUS) ? Number(read(LS_RADIUS)) : undefined;
  const fontUrl = read(LS_FONT_URL) || "";
  const fontFamily =
    read(LS_FONT_FAMILY) ||
    (typeof base.typography.fontFamily === "string" ? base.typography.fontFamily : "Inter, Roboto, Helvetica, Arial, sans-serif");

  ensureFontLinks(fontUrl);

  const theme = createTheme({
    ...base,
    palette: {
      ...base.palette,
      primary: { ...base.palette.primary, ...(primary ? { main: primary } : {}) },
      secondary: { ...base.palette.secondary, ...(secondary ? { main: secondary } : {}) },
    },
    shape: { ...base.shape, ...(Number.isFinite(radius as number) ? { borderRadius: radius as number } : {}) },
    typography: { ...base.typography, fontFamily },
    components: {
      ...base.components,
      ...paletteDrivenComponentOverrides(),
      MuiCssBaseline: {
        styleOverrides: {
          "html, body, #root": { height: "100%", fontFamily },
          body: { fontFamily, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" },
          "*": { fontFamily },
        },
      },
    },
  });

  return theme;
}

const preset = getPreset();
const selected = pickTheme(preset);
const theme = withRuntimeOverrides(selected);

export default theme;
