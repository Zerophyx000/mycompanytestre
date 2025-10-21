import React, { useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./DashboardLite.css";

type Row = { id: number; name: string; status: "Active" | "Pending" | "Inactive" };

const rows: Row[] = [
  { id: 1, name: "John Smith", status: "Active" },
  { id: 2, name: "Jane Doe", status: "Pending" },
  { id: 3, name: "Mike Brown", status: "Inactive" },
];

const columns: GridColDef<Row>[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 220 },
  { field: "status", headerName: "Status", width: 160 },
];

// ---- Quick Views setup ----
type ViewKey =
  | "aktuell"
  | "naechste"
  | "alle"
  | "uebergeben"
  | "meineAuftraege"
  | "meineProjekte"
  | "zuVisieren"
  | "meineVerdankungen";

const DASHBOARD_VIEWS: { key: ViewKey; label: string; predicate: (r: Row) => boolean }[] = [
  { key: "aktuell", label: "Aktuell", predicate: (r) => r.status === "Active" },
  { key: "naechste", label: "Nächste", predicate: (r) => r.status === "Pending" },
  { key: "alle", label: "Alle", predicate: () => true },
  // The rest are placeholders — adjust to your domain rules when you have them:
  { key: "uebergeben", label: "Übergeben", predicate: () => true },
  { key: "meineAuftraege", label: "Meine Aufträge", predicate: () => true },
  { key: "meineProjekte", label: "Meine Projekte", predicate: () => true },
  { key: "zuVisieren", label: "Zu Visieren", predicate: () => true },
  { key: "meineVerdankungen", label: "Meine Verdankungen", predicate: () => true },
];

function QuickViewsBar({
  active,
  onChange,
}: {
  active: ViewKey;
  onChange: (k: ViewKey) => void;
}) {
  return (
    <Box sx={{ p: 1 }}>
      <ButtonGroup size="small" variant="outlined" sx={{ flexWrap: "wrap", gap: 1 }}>
        {DASHBOARD_VIEWS.map((v) => (
          <Button
            key={v.key}
            variant={active === v.key ? "contained" : "outlined"}
            onClick={() => onChange(v.key)}
          >
            {v.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default function DashboardLite() {
  const [activeView, setActiveView] = useState<ViewKey>("aktuell");
  const activePredicate = DASHBOARD_VIEWS.find((v) => v.key === activeView)?.predicate ?? (() => true);
  const filteredRows = useMemo(() => rows.filter(activePredicate), [activePredicate]);

  return (
    <Box className="dashboard-root">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
          <Box className="flex-grow" />
          <Button variant="contained" startIcon={<AddLocationAltIcon />}>
            Neue Adresse
          </Button>
          <Avatar className="ml-16">MM</Avatar>
          <Typography variant="body2" className="ml-8">
            Max Mustermann
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="dashboard-content">
        <Typography variant="subtitle2" color="textSecondary" className="mt-16">
          Sachschaden • Schadensachbearbeiter
        </Typography>
        <Typography variant="h6" className="mt-8 mb-24">
          Mein Dashboard
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="subtitle1">Übersicht</Typography>
            <Typography variant="body2" color="textSecondary">
              Wichtige Kennzahlen auf einen Blick
            </Typography>

            <Grid container spacing={2} columns={5} className="mt-8">
              <Grid xs={5} sm={5} md={5} lg={1}>
                <OverviewCard icon={<InfoOutlinedIcon />} label="Offene Fälle" value="—" />
              </Grid>
              <Grid xs={5} sm={5} md={5} lg={1}>
                <OverviewCard icon={<ScheduleIcon />} label="Anstehende Fälle" value="—" />
              </Grid>
              <Grid xs={5} sm={5} md={5} lg={1}>
                <OverviewCard icon={<WorkHistoryIcon />} label="In Bearbeitung" value="—" />
              </Grid>
              <Grid xs={5} sm={5} md={5} lg={1}>
                <OverviewCard icon={<CheckCircleOutlineIcon />} label="Abgeschlossen" value="—" />
              </Grid>
              <Grid xs={5} sm={5} md={5} lg={1}>
                <OverviewCard icon={<AllInboxIcon />} label="Gesamt Fälle" value="—" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Paper elevation={0} className="mt-24 table-wrapper">
          <Toolbar>
            <Typography variant="subtitle1" className="flex-grow">
              Fälle
            </Typography>
            <Tooltip title="Spalten"><IconButton><ViewColumnIcon /></IconButton></Tooltip>
            <Tooltip title="Filtern"><IconButton><FilterListIcon /></IconButton></Tooltip>
            <Tooltip title="Aktualisieren"><IconButton><RefreshIcon /></IconButton></Tooltip>
            <Tooltip title="Exportieren"><IconButton><DownloadIcon /></IconButton></Tooltip>
            <Tooltip title="Mehr"><IconButton><MoreVertIcon /></IconButton></Tooltip>
          </Toolbar>

          <QuickViewsBar active={activeView} onChange={setActiveView} />

          <Divider />
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
          />
        </Paper>
      </Box>
    </Box>
  );
}

function OverviewCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box className="overview-card">
          <Avatar variant="rounded">{icon}</Avatar>
          <Box className="ml-16">
            <Typography variant="overline" color="textSecondary">
              {label}
            </Typography>
            <Typography variant="h6">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
