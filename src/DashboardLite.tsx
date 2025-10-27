import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
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

type Row = { id: number; name: string; status: string };

const rows: Row[] = [
  { id: 1, name: "John Smith", status: "Active" },
  { id: 2, name: "Jane Doe", status: "Pending" },
  { id: 3, name: "Mike Brown", status: "Inactive" },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 220 },
  { field: "status", headerName: "Status", width: 160 },
];

export default function DashboardLite() {
  return (
    <Box>
      {/* Top bar section */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button variant="contained" startIcon={<AddLocationAltIcon />}>
            Neue Adresse
          </Button>
        </Toolbar>
      </Paper>

      {/* User info section */}
      <Box sx={{ p: 3, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>MM</Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Max Mustermann
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sachschaden • Schadensachbearbeiter
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom fontWeight="bold">
          Mein Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Übersicht
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Wichtige Kennzahlen auf einen Blick
        </Typography>

        {/* Stats cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <OverviewCard icon={<InfoOutlinedIcon />} label="Offene Fälle" value="—" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <OverviewCard icon={<ScheduleIcon />} label="Anstehende Fälle" value="—" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <OverviewCard icon={<WorkHistoryIcon />} label="In Bearbeitung" value="—" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <OverviewCard icon={<CheckCircleOutlineIcon />} label="Abgeschlossen" value="—" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <OverviewCard icon={<AllInboxIcon />} label="Gesamt Fälle" value="—" />
          </Grid>
        </Grid>

        {/* Table section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Fälle
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Tooltip title="Spalten">
              <IconButton size="small">
                <ViewColumnIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton size="small">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Aktualisieren">
              <IconButton size="small">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exportieren">
              <IconButton size="small">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mehr">
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* DataGrid */}
        <Paper>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
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
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon}
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
