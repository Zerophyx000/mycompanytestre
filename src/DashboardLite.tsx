import React, { useMemo, useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Tooltip,
  Typography,
  ButtonGroup,
  Button,
  Menu,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type SchadenRow, type SchadenViewKey, SCHADEN_VIEWS } from "./SchadenPage";

type User = { id: "max" | "anna"; name: string; avatar: string };
type SavedLayout = { name: string; visibleCols: string[]; filterText: string };

const LAYOUT_KEY = "dashboardLayouts";

const allColumns: GridColDef<SchadenRow>[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "adrKey", headerName: "AdrKey", width: 140 },
  { field: "member", headerName: "Mitglied", width: 160 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "origin", headerName: "Quelle", width: 120 },
];

export default function DashboardLite({
  user,
  onSwitchUser,
  recentSchadens,
  onOpenClaim,
}: {
  user: User;
  onSwitchUser: (id: "max" | "anna") => void;
  recentSchadens: SchadenRow[];
  onOpenClaim: (row: SchadenRow) => void;
}) {
  const [activeView, setActiveView] = useState<SchadenViewKey>("alle");
  const [visibleCols, setVisibleCols] = useState<string[]>(allColumns.map((c) => c.field));
  const [filterText, setFilterText] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openColumns, setOpenColumns] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAYOUT_KEY);
      setSavedLayouts(raw ? JSON.parse(raw) : []);
    } catch {
      setSavedLayouts([]);
    }
  }, []);

  const persistLayouts = (layouts: SavedLayout[]) => {
    setSavedLayouts(layouts);
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layouts));
  };

  const predicate = SCHADEN_VIEWS.find((v) => v.key === activeView)?.predicate ?? (() => true);

  const filteredRows = useMemo(
    () =>
      recentSchadens
        .filter(predicate)
        .filter((r) => r.member.toLowerCase().includes(filterText.toLowerCase())),
    [recentSchadens, activeView, filterText]
  );

  const handleExportCSV = () => {
    const usedCols = allColumns.filter((c) => visibleCols.includes(c.field));
    const csv = [
      usedCols.map((c) => c.headerName).join(","),
      ...filteredRows.map((r) =>
        usedCols.map((c) => (r as any)[c.field] ?? "").join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "schaeden.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveLayout = () => {
    const name = window.prompt("Layoutname eingeben:");
    if (!name) return;
    const withoutSame = savedLayouts.filter((l) => l.name !== name);
    const newLayouts = [{ name, visibleCols, filterText }, ...withoutSame];
    persistLayouts(newLayouts);
  };

  const handleResetLayout = () => {
    setVisibleCols(allColumns.map((c) => c.field));
    setFilterText("");
  };

  const columns = allColumns.filter((c) => visibleCols.includes(c.field));

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Select
            size="small"
            value={user.id}
            onChange={(e) => onSwitchUser(e.target.value as "max" | "anna")}
            sx={{ mr: 2, minWidth: 150 }}
          >
            <MenuItem value="max">Max Mustermann</MenuItem>
            <MenuItem value="anna">Anna Admin</MenuItem>
          </Select>
          <Avatar sx={{ ml: 1 }}>{user.avatar}</Avatar>
          <Typography variant="body2" sx={{ ml: 1 }}>{user.name}</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Sachschaden • Schadensachbearbeiter</Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>Mein Dashboard</Typography>

        <Card>
          <CardContent>
            <Typography variant="subtitle1">Übersicht</Typography>
            <Grid container spacing={2} columns={5} sx={{ mt: 1 }}>
              <Grid xs={5} lg={1}><OverviewCard icon={<InfoOutlinedIcon />} label="Offene Fälle" value="—" /></Grid>
              <Grid xs={5} lg={1}><OverviewCard icon={<ScheduleIcon />} label="Anstehende Fälle" value="—" /></Grid>
              <Grid xs={5} lg={1}><OverviewCard icon={<WorkHistoryIcon />} label="In Bearbeitung" value="—" /></Grid>
              <Grid xs={5} lg={1}><OverviewCard icon={<CheckCircleOutlineIcon />} label="Abgeschlossen" value="—" /></Grid>
              <Grid xs={5} lg={1}><OverviewCard icon={<AllInboxIcon />} label="Gesamt Fälle" value="—" /></Grid>
            </Grid>
          </CardContent>
        </Card>

        <Paper elevation={0} sx={{ mt: 3 }}>
          <Toolbar>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>Letzte Schäden</Typography>
            <Tooltip title="Spalten">
              <IconButton onClick={() => setOpenColumns(true)}><ViewColumnIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Filtern">
              <IconButton onClick={() => setOpenFilter(true)}><FilterListIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Exportieren">
              <IconButton onClick={handleExportCSV}><DownloadIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Mehr">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}><MoreVertIcon /></IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => { handleSaveLayout(); setAnchorEl(null); }}>
                Layout speichern
              </MenuItem>
              <MenuItem onClick={() => { setOpenLoad(true); setAnchorEl(null); }}>
                Layout laden
              </MenuItem>
              <MenuItem onClick={() => { handleResetLayout(); setAnchorEl(null); }}>
                Layout zurücksetzen
              </MenuItem>
            </Menu>
          </Toolbar>

          <Box sx={{ p: 1 }}>
            <ButtonGroup size="small" variant="outlined" sx={{ flexWrap: "wrap", gap: 1 }}>
              {SCHADEN_VIEWS.map((v) => (
                <Button
                  key={v.key}
                  variant={activeView === v.key ? "contained" : "outlined"}
                  onClick={() => setActiveView(v.key)}
                >
                  {v.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Divider />
          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoHeight
            hideFooterPagination
            disableRowSelectionOnClick
            onRowClick={(params) => onOpenClaim(params.row)}
            getRowId={(r) => r.id}
          />
        </Paper>
      </Box>

      <Dialog open={openColumns} onClose={() => setOpenColumns(false)}>
        <DialogTitle>Spalten auswählen</DialogTitle>
        <DialogContent>
          <FormGroup>
            {allColumns.map((c) => (
              <FormControlLabel
                key={c.field}
                control={
                  <Checkbox
                    checked={visibleCols.includes(c.field)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setVisibleCols([...visibleCols, c.field]);
                      } else {
                        setVisibleCols(visibleCols.filter((f) => f !== c.field));
                      }
                    }}
                  />
                }
                label={c.headerName}
              />
            ))}
          </FormGroup>
        </DialogContent>
      </Dialog>

      <Dialog open={openFilter} onClose={() => setOpenFilter(false)}>
        <DialogTitle>Filtern nach Mitglied</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Mitglied eingeben..."
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openLoad} onClose={() => setOpenLoad(false)} fullWidth maxWidth="sm">
        <DialogTitle>Layouts laden</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 360, overflow: "auto", p: 0 }}>
          <List>
            {savedLayouts.length === 0 && (
              <ListItem>
                <ListItemText primary="Keine gespeicherten Layouts" />
              </ListItem>
            )}
            {savedLayouts.map((l) => (
              <ListItem
                key={l.name}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => {
                    const next = savedLayouts.filter((x) => x.name !== l.name);
                    persistLayouts(next);
                  }}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
                button
                onClick={() => {
                  setVisibleCols(l.visibleCols);
                  setFilterText(l.filterText);
                  setOpenLoad(false);
                }}
              >
                <CheckCircleOutlineIcon fontSize="small" style={{ marginRight: 8 }} />
                <ListItemText
                  primary={l.name}
                  secondary={`Spalten: ${l.visibleCols.length} • Filter: ${l.filterText ? `"${l.filterText}"` : "—"}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function OverviewCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar variant="rounded">{icon}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="overline" color="text.secondary">{label}</Typography>
            <Typography variant="h6">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
