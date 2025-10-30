import React, { useMemo, useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
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
  ListItemButton,
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
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { type SchadenRow, type SchadenViewKey, SCHADEN_VIEWS, SCHADEN_COLUMNS } from "./SchadenPage";
import { useTranslation } from "react-i18next";

type User = { id: "max" | "anna"; name: string; avatar: string };
type SavedLayout = { name: string; visibleCols: string[]; filterText: string };

const LAYOUT_KEY = "dashboardLayouts";
// Width big enough to fit all Schaden columns; tweak if you add more columns
const MIN_TABLE_WIDTH = 1500;

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
  const { t } = useTranslation();

  const [activeView, setActiveView] = useState<SchadenViewKey>("alle");
  const [visibleCols, setVisibleCols] = useState<string[]>(SCHADEN_COLUMNS.map((c) => c.field));
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
    const usedCols = SCHADEN_COLUMNS.filter((c) => visibleCols.includes(c.field));
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
    const name = window.prompt(t("dashboard.saveLayoutPrompt"));
    if (!name) return;
    const withoutSame = savedLayouts.filter((l) => l.name !== name);
    const newLayouts = [{ name, visibleCols, filterText }, ...withoutSame];
    persistLayouts(newLayouts);
  };

  const handleResetLayout = () => {
    setVisibleCols(SCHADEN_COLUMNS.map((c) => c.field));
    setFilterText("");
  };

  const columns = SCHADEN_COLUMNS.filter((c) => visibleCols.includes(c.field));

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6">{t("dashboard.title")}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Select
            size="small"
            value={user.id}
            onChange={(e) => onSwitchUser(e.target.value as "max" | "anna")}
            sx={{ mr: 2, minWidth: 150 }}
          >
            <MenuItem value="max">{t("users.max")}</MenuItem>
            <MenuItem value="anna">{t("users.anna")}</MenuItem>
          </Select>
          <Avatar sx={{ ml: 1 }}>{user.avatar}</Avatar>
          <Typography variant="body2" sx={{ ml: 1 }}>{user.name}</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {t("dashboard.subtitle")}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          {t("dashboard.myDashboard")}
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="subtitle1">{t("dashboard.overview")}</Typography>
            <Grid container spacing={2} columns={5} sx={{ mt: 1 }}>
              <Grid><OverviewCard icon={<InfoOutlinedIcon />} label={t("overview.open")} value="—" /></Grid>
              <Grid><OverviewCard icon={<ScheduleIcon />} label={t("overview.upcoming")} value="—" /></Grid>
              <Grid><OverviewCard icon={<WorkHistoryIcon />} label={t("overview.inProgress")} value="—" /></Grid>
              <Grid><OverviewCard icon={<CheckCircleOutlineIcon />} label={t("overview.closed")} value="—" /></Grid>
              <Grid><OverviewCard icon={<AllInboxIcon />} label={t("overview.total")} value="—" /></Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* === Scrollable Recent Claims section === */}
        <Paper elevation={0} sx={{ mt: 3 }}>
          {/* Outer horizontal scroll container */}
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            {/* Inner width ensures toolbar + grid can be scrolled into view */}
            <Box sx={{ minWidth: MIN_TABLE_WIDTH }}>
              <Toolbar sx={{ px: 1 }}>
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  {t("dashboard.recentClaims")}
                </Typography>
                <Tooltip title={t("dashboard.columns")}><IconButton onClick={() => setOpenColumns(true)}><ViewColumnIcon /></IconButton></Tooltip>
                <Tooltip title={t("dashboard.filter")}><IconButton onClick={() => setOpenFilter(true)}><FilterListIcon /></IconButton></Tooltip>
                <Tooltip title={t("dashboard.export")}><IconButton onClick={handleExportCSV}><DownloadIcon /></IconButton></Tooltip>
                <Tooltip title={t("dashboard.more")}><IconButton onClick={(e) => setAnchorEl(e.currentTarget)}><MoreVertIcon /></IconButton></Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={() => { handleSaveLayout(); setAnchorEl(null); }}>
                    {t("dashboard.saveLayout")}
                  </MenuItem>
                  <MenuItem onClick={() => { setOpenLoad(true); setAnchorEl(null); }}>
                    {t("dashboard.loadLayout")}
                  </MenuItem>
                  <MenuItem onClick={() => { handleResetLayout(); setAnchorEl(null); }}>
                    {t("dashboard.resetLayout")}
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
                      {t(`filters.${v.key}`)}
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
                // make sure the grid itself doesn't force-hide overflow
                sx={{
                  "& .MuiDataGrid-virtualScroller": { overflowX: "hidden" },
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      <Dialog open={openColumns} onClose={() => setOpenColumns(false)}>
        <DialogTitle>{t("dashboard.selectColumns")}</DialogTitle>
        <DialogContent>
          <FormGroup>
            {SCHADEN_COLUMNS.map((c) => (
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
        <DialogTitle>{t("dashboard.filterByMember")}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder={t("dashboard.enterMember") ?? ""}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openLoad} onClose={() => setOpenLoad(false)} fullWidth maxWidth="sm">
        <DialogTitle>{t("dashboard.loadLayouts")}</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 360, overflow: "auto", p: 0 }}>
          <List>
            {savedLayouts.length === 0 && (
              <ListItem>
                <ListItemText primary={t("dashboard.noLayouts")} />
              </ListItem>
            )}

            {savedLayouts.map((l) => (
              <ListItem key={l.name} disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label={t("dashboard.delete")}
                    onClick={() => {
                      const next = savedLayouts.filter((x) => x.name !== l.name);
                      setSavedLayouts(next);
                      localStorage.setItem(LAYOUT_KEY, JSON.stringify(next));
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() => {
                    setVisibleCols(l.visibleCols);
                    setFilterText(l.filterText);
                    setOpenLoad(false);
                  }}
                >
                  <ListItemText
                    primary={l.name}
                    secondary={`${t("dashboard.columns")}: ${l.visibleCols.length} • ${t("dashboard.filter")}: ${l.filterText ? `"${l.filterText}"` : "—"}`}
                  />
                </ListItemButton>
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
