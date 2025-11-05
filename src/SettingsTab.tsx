import * as React from "react";
import {
  Box, Typography, Card, CardContent, Stack, TextField, Button, Switch, FormControlLabel,
  Slider, Divider, RadioGroup, Radio, FormControl, FormLabel, Grid, Checkbox, FormGroup
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

const PRESET_KEY = "app.theme.preset";
const LS_PRIMARY = "app.theme.primary";
const LS_SECONDARY = "app.theme.secondary";
const LS_RADIUS = "app.theme.radius";
const LS_FONT_URL = "app.theme.fontUrl";
const LS_FONT_FAMILY = "app.theme.fontFamily";
const LS_PERMS_MAX = "app.perms.max";

const LIGHT_PRESETS = [
  { key: "blue", label: "Blue" },
  { key: "red", label: "Red" },
  { key: "orange", label: "Orange" },
  { key: "yellow", label: "Yellow" },
  { key: "green", label: "Green" },
  { key: "lime", label: "Lime" },
  { key: "purple", label: "Purple" },
  { key: "black", label: "Black" },
] as const;

const DARK_PRESETS = [{ key: "dark", label: "Dark" }] as const;

const ALL_PERMS = ["dashboard", "adressen", "schaeden", "calendar"] as const;
type Perm = typeof ALL_PERMS[number];

export default function SettingsTab() {
  const base = useTheme();

  const [preset, setPreset] = React.useState<string>(localStorage.getItem(PRESET_KEY) || "blue");

  const [primary, setPrimary] = React.useState<string>(localStorage.getItem(LS_PRIMARY) || "");
  const [secondary, setSecondary] = React.useState<string>(localStorage.getItem(LS_SECONDARY) || "");
  const [radius, setRadius] = React.useState<number>(Number(localStorage.getItem(LS_RADIUS) || base.shape.borderRadius || 8));

  const [fontUrl, setFontUrl] = React.useState<string>(localStorage.getItem(LS_FONT_URL) || "");
  const [fontFamily, setFontFamily] = React.useState<string>(
    localStorage.getItem(LS_FONT_FAMILY) || (typeof base.typography.fontFamily === "string" ? base.typography.fontFamily : "Inter, Roboto, Helvetica, Arial, sans-serif")
  );

  const storedPerms: Perm[] = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem(LS_PERMS_MAX) || "null") || ["dashboard","schaeden","calendar"]; }
    catch { return ["dashboard","schaeden","calendar"]; }
  }, []);
  const [maxPerms, setMaxPerms] = React.useState<Perm[]>(storedPerms);

  const preview = React.useMemo(
    () =>
      createTheme({
        ...base,
        palette: {
          ...base.palette,
          primary: { ...base.palette.primary, ...(primary ? { main: primary } : {}) },
          secondary: { ...base.palette.secondary, ...(secondary ? { main: secondary } : {}) },
        },
        shape: { ...base.shape, borderRadius: radius },
        typography: { ...base.typography, fontFamily },
      }),
    [base, primary, secondary, radius, fontFamily]
  );

  const togglePerm = (p: Perm) =>
    setMaxPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const apply = () => {
    localStorage.setItem(PRESET_KEY, preset);
    if (primary) localStorage.setItem(LS_PRIMARY, primary); else localStorage.removeItem(LS_PRIMARY);
    if (secondary) localStorage.setItem(LS_SECONDARY, secondary); else localStorage.removeItem(LS_SECONDARY);
    localStorage.setItem(LS_RADIUS, String(radius));
    localStorage.setItem(LS_FONT_URL, fontUrl.trim());
    localStorage.setItem(LS_FONT_FAMILY, fontFamily.trim());
    localStorage.setItem(LS_PERMS_MAX, JSON.stringify(maxPerms));
    location.reload();
  };

  const resetOverrides = () => {
    localStorage.removeItem(LS_PRIMARY);
    localStorage.removeItem(LS_SECONDARY);
    localStorage.removeItem(LS_RADIUS);
    localStorage.removeItem(LS_FONT_URL);
    localStorage.removeItem(LS_FONT_FAMILY);
    setPrimary("");
    setSecondary("");
    setRadius(8);
    setFontUrl("");
    setFontFamily("Inter, Roboto, Helvetica, Arial, sans-serif");
  };

  return (
    <Box p={2} maxWidth={960}>
      <Typography variant="h2" gutterBottom>Settings</Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <FormControl>
            <FormLabel>Presets</FormLabel>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Light</Typography>
                <RadioGroup
                  value={preset}
                  onChange={(_, v) => setPreset(v)}
                  row
                >
                  {LIGHT_PRESETS.map(p => (
                    <FormControlLabel key={p.key} value={p.key} control={<Radio />} label={p.label} />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Dark</Typography>
                <RadioGroup
                  value={preset}
                  onChange={(_, v) => setPreset(v)}
                  row
                >
                  {DARK_PRESETS.map(p => (
                    <FormControlLabel key={p.key} value={p.key} control={<Radio />} label={p.label} />
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Custom Overrides</Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ minWidth: 140 }}>Primary</Typography>
              <input type="color" value={primary || "#000000"} onChange={(e) => setPrimary(e.target.value)} />
              <TextField size="small" placeholder="leave empty for preset" value={primary} onChange={(e) => setPrimary(e.target.value)} sx={{ width: 200 }} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ minWidth: 140 }}>Secondary</Typography>
              <input type="color" value={secondary || "#000000"} onChange={(e) => setSecondary(e.target.value)} />
              <TextField size="small" placeholder="leave empty for preset" value={secondary} onChange={(e) => setSecondary(e.target.value)} sx={{ width: 200 }} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ minWidth: 140 }}>Border radius</Typography>
              <Slider value={radius} onChange={(_, v) => setRadius(Array.isArray(v) ? v[0] : v)} min={0} max={24} step={1} sx={{ maxWidth: 320 }} />
              <Typography>{radius}px</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Typography & Fonts</Typography>
          <Stack spacing={2}>
            <TextField label="Font CSS URL" placeholder="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
                       value={fontUrl} onChange={(e) => setFontUrl(e.target.value)} fullWidth />
            <TextField label="Font family" placeholder="Inter, Roboto, Helvetica, Arial, sans-serif"
                       value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} fullWidth />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>User Permissions</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Modify Max Mustermann</Typography>
          <FormGroup row>
            {ALL_PERMS.map((p) => (
              <FormControlLabel
                key={p}
                control={<Checkbox checked={maxPerms.includes(p)} onChange={() => togglePerm(p)} />}
                label={p}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={apply}>Apply</Button>
        <Button variant="outlined" onClick={resetOverrides}>Reset Overrides</Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <ThemeProvider theme={preview}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Preview</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained">Primary</Button>
              <Button variant="outlined">Outlined</Button>
              <Button>Text</Button>
              <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
            </Stack>
            <Typography sx={{ mt: 2 }}>
              The quick brown fox jumps over the lazy dog — 1234567890
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </Box>
  );
}
