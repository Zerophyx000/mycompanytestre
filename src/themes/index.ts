import { createTheme } from "@mui/material/styles";
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

function withRuntimeOverrides(base: ReturnType<typeof createTheme>) {
  const primary = read(LS_PRIMARY) || undefined;
  const secondary = read(LS_SECONDARY) || undefined;
  const radius = read(LS_RADIUS) ? Number(read(LS_RADIUS)) : undefined;
  const fontUrl = read(LS_FONT_URL) || "";
  const fontFamily = read(LS_FONT_FAMILY) || "";

  if (typeof document !== "undefined" && fontUrl) {
    const id = "app-theme-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  }

  return createTheme({
    ...base,
    palette: {
      ...base.palette,
      primary: { ...base.palette.primary, ...(primary ? { main: primary } : {}) },
      secondary: { ...base.palette.secondary, ...(secondary ? { main: secondary } : {}) },
    },
    shape: { ...base.shape, ...(Number.isFinite(radius as number) ? { borderRadius: radius as number } : {}) },
    typography: { ...base.typography, ...(fontFamily ? { fontFamily } : {}) },
  });
}

const preset = getPreset();
const selected = pickTheme(preset);
const theme = withRuntimeOverrides(selected);

export default theme;
