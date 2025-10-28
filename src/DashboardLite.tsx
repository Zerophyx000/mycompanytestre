import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  AppBar,
  Tooltip,
  Typography,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
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
import { type SchadenRow, type SchadenViewKey, SCHADEN_VIEWS } from "./SchadenPage";

type User = { id: "max" | "anna"; name: string; avatar: string };

const columns: GridColDef<SchadenRow>[] = [
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
  const predicate = SCHADEN_VIEWS.find((v) => v.key === activeView)?.predicate ?? (() => true);
  const filteredRows = useMemo(() => recentSchadens.filter(predicate), [recentSchadens, activeView]);

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
            <Tooltip title="Spalten"><IconButton><ViewColumnIcon /></IconButton></Tooltip>
            <Tooltip title="Filtern"><IconButton><FilterListIcon /></IconButton></Tooltip>
            <Tooltip title="Aktualisieren"><IconButton><RefreshIcon /></IconButton></Tooltip>
            <Tooltip title="Exportieren"><IconButton><DownloadIcon /></IconButton></Tooltip>
            <Tooltip title="Mehr"><IconButton><MoreVertIcon /></IconButton></Tooltip>
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
            hideFooterPagination
            disableRowSelectionOnClick
            onRowClick={(params) => onOpenClaim(params.row)}
            getRowId={(r) => r.id}
          />
        </Paper>
      </Box>
    </Box>
  );
}

function OverviewCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar variant="rounded">{icon}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="overline" color="text.secondary">{label}</Typography>
            <Typography variant="h6">{value}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
