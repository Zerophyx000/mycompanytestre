import * as React from "react";
import {
  Box, Typography, Card, CardContent, Stack, TextField, Button,
  Slider, Divider, RadioGroup, Radio, FormControl, FormLabel, Grid,
  Checkbox, Table, TableBody, TableCell, TableHead, TableRow, FormControlLabel, Switch
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

const PRESET_KEY = "app.theme.preset";
const LS_PRIMARY = "app.theme.primary";
const LS_SECONDARY = "app.theme.secondary";
const LS_RADIUS = "app.theme.radius";
const PERM_PREFIX = "app.perms.";

type Perm = "adressen" | "schaeden" | "calendar" | "settings";
type UserLite = { id: string; name: string; avatar?: string };

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

const ALL_PERMS: Perm[] = ["adressen", "schaeden", "calendar", "settings"];

type Props = { users: UserLite[] };

export default function SettingsTab({ users }: Props) {
  const base = useTheme();

  const [preset, setPreset] = React.useState<string>(localStorage.getItem(PRESET_KEY) || "blue");
  const [primary, setPrimary] = React.useState<string>(localStorage.getItem(LS_PRIMARY) || "");
  const [secondary, setSecondary] = React.useState<string>(localStorage.getItem(LS_SECONDARY) || "");
  const [radius, setRadius] = React.useState<number>(Number(localStorage.getItem(LS_RADIUS) || base.shape.borderRadius || 8));

  const loadUserPerms = (id: string): Perm[] => {
    try {
      const raw = localStorage.getItem(PERM_PREFIX + id);
      if (!raw) return [];
      const arr = JSON.parse(raw) as string[];
      return arr.filter((p) => ALL_PERMS.includes(p as Perm)) as Perm[];
    } catch {
      return [];
    }
  };

  const initialPerms = React.useMemo(() => {
    const obj: Record<string, Perm[]> = {};
    users.forEach((u) => (obj[u.id] = loadUserPerms(u.id)));
    return obj;
  }, [users]);

  const [permsByUser, setPermsByUser] = React.useState<Record<string, Perm[]>>(initialPerms);

  const settingsHoldersCount = React.useMemo(
    () => Object.values(permsByUser).filter((list) => list.includes("settings")).length,
    [permsByUser]
  );

  const isLastSettingsHolder = (userId: string) =>
    (permsByUser[userId] || []).includes("settings") && settingsHoldersCount === 1;

  const togglePerm = (userId: string, p: Perm) =>
    setPermsByUser((prev) => {
      const current = prev[userId] || [];
      if (p === "settings" && current.includes("settings") && settingsHoldersCount === 1) {
        return prev;
      }
      const next = current.includes(p) ? current.filter((x) => x !== p) : [...current, p];
      return { ...prev, [userId]: next };
    });

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
      }),
    [base, primary, secondary, radius]
  );

  const apply = () => {
    localStorage.setItem(PRESET_KEY, preset);
    if (primary) localStorage.setItem(LS_PRIMARY, primary); else localStorage.removeItem(LS_PRIMARY);
    if (secondary) localStorage.setItem(LS_SECONDARY, secondary); else localStorage.removeItem(LS_SECONDARY);
    localStorage.setItem(LS_RADIUS, String(radius));
    Object.entries(permsByUser).forEach(([id, list]) => {
      localStorage.setItem(PERM_PREFIX + id, JSON.stringify(list));
    });
    location.reload();
  };

  const resetOverrides = () => {
    localStorage.removeItem(LS_PRIMARY);
    localStorage.removeItem(LS_SECONDARY);
    localStorage.removeItem(LS_RADIUS);
    setPrimary("");
    setSecondary("");
    setRadius(8);
  };

  return (
    <Box p={2} maxWidth={1024}>
      <Typography variant="h2" gutterBottom>Settings</Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <FormControl>
            <FormLabel>Presets</FormLabel>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Light</Typography>
                <RadioGroup value={preset} onChange={(_, v) => setPreset(v)} row>
                  {LIGHT_PRESETS.map((p) => (
                    <FormControlLabel key={p.key} value={p.key} control={<Radio />} label={p.label} />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Dark</Typography>
                <RadioGroup value={preset} onChange={(_, v) => setPreset(v)} row>
                  {DARK_PRESETS.map((p) => (
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
              <TextField size="small" placeholder="leave empty for preset" value={primary} onChange={(e) => setPrimary(e.target.value)} sx={{ width: 220 }} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ minWidth: 140 }}>Secondary</Typography>
              <input type="color" value={secondary || "#000000"} onChange={(e) => setSecondary(e.target.value)} />
              <TextField size="small" placeholder="leave empty for preset" value={secondary} onChange={(e) => setSecondary(e.target.value)} sx={{ width: 220 }} />
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
          <Typography variant="h6" gutterBottom>User Permissions</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                {ALL_PERMS.map((p) => <TableCell key={p} align="center">{p}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => {
                const list = permsByUser[u.id] || [];
                return (
                  <TableRow key={u.id}>
                    <TableCell>{u.name}</TableCell>
                    {ALL_PERMS.map((p) => {
                      const disabled = p === "settings" && isLastSettingsHolder(u.id);
                      return (
                        <TableCell key={p} align="center">
                          <Checkbox
                            checked={list.includes(p)}
                            onChange={() => togglePerm(u.id, p)}
                            disabled={disabled}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
