import { useMemo, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type SchadenRow = {
  id: number;
  adrKey: string;
  ownType: string;
  evtTyp: string;
  evtKey: string;
  memberKey: string;
  member: string;
  adrKeyMain: string;
  adrKeyNew: string;
  alternateKey: string;
  proKey: string;
  aDate: string;
  origin: string;
  class: string;
  status: string;
  statusDate: string;
};

export type SchadenViewKey =
  | "aktuell"
  | "naechste"
  | "alle"
  | "uebergeben"
  | "meineAuftraege"
  | "meineProjekte"
  | "zuVisieren"
  | "meineVerdankungen";

export const SCHADEN_VIEWS: {
  key: SchadenViewKey;
  label: string;
  predicate: (r: SchadenRow) => boolean;
}[] = [
  { key: "aktuell", label: "Aktuell", predicate: (r) => r.status === "Active" },
  { key: "naechste", label: "Nächste", predicate: (r) => r.status === "Pending" },
  { key: "alle", label: "Alle", predicate: () => true },
  {
    key: "uebergeben",
    label: "Übergeben",
    predicate: (r) => r.origin === "API" || r.origin === "Import",
  },
  { key: "meineAuftraege", label: "Meine Aufträge", predicate: () => true },
  { key: "meineProjekte", label: "Meine Projekte", predicate: () => true },
  { key: "zuVisieren", label: "Zu Visieren", predicate: () => true },
  { key: "meineVerdankungen", label: "Meine Verdankungen", predicate: () => true },
];

const columns: GridColDef<SchadenRow>[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "adrKey", headerName: "AdrKey", width: 140 },
  { field: "member", headerName: "Mitglied", width: 160 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "origin", headerName: "Quelle", width: 120 },
];

export default function SchadenPage({
  onOpenClaim,
}: {
  onOpenClaim: (row: SchadenRow) => void;
}) {
  const [activeView, setActiveView] = useState<SchadenViewKey>("alle");

  const rows: SchadenRow[] = [
    {
      id: 1,
      adrKey: "ADR001234",
      ownType: "Individual",
      evtTyp: "Update",
      evtKey: "EVT7891",
      memberKey: "MBR45678",
      member: "John Smith",
      adrKeyMain: "ADR001234",
      adrKeyNew: "ADR001235",
      alternateKey: "ALT789123",
      proKey: "PRO456789",
      aDate: "2025-10-21",
      origin: "Web",
      class: "Premium",
      status: "Active",
      statusDate: "2025-10-21",
    },
    {
      id: 2,
      adrKey: "ADR002345",
      ownType: "Company",
      evtTyp: "Create",
      evtKey: "EVT7892",
      memberKey: "MBR45679",
      member: "Jane Doe",
      adrKeyMain: "ADR002345",
      adrKeyNew: "ADR002346",
      alternateKey: "ALT789124",
      proKey: "PRO456790",
      aDate: "2025-10-07",
      origin: "Import",
      class: "Standard",
      status: "Pending",
      statusDate: "2025-10-07",
    },
  ];

  const predicate =
    SCHADEN_VIEWS.find((v) => v.key === activeView)?.predicate ?? (() => true);
  const filteredRows = useMemo(() => rows.filter(predicate), [rows, predicate]);

  return (
    <Box>
      <Paper elevation={0}>
        <Toolbar>
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Schäden
          </Typography>
          <Tooltip title="Spalten"><IconButton><ViewColumnIcon /></IconButton></Tooltip>
          <Tooltip title="Filtern"><IconButton><FilterListIcon /></IconButton></Tooltip>
          <Tooltip title="Aktualisieren"><IconButton><RefreshIcon /></IconButton></Tooltip>
          <Tooltip title="Exportieren"><IconButton><DownloadIcon /></IconButton></Tooltip>
          <Tooltip title="Mehr"><IconButton><MoreVertIcon /></IconButton></Tooltip>
        </Toolbar>

        <Divider />

        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          hideFooterPagination
          disableRowSelectionOnClick
          onRowClick={(params) => onOpenClaim(params.row)}
        />
      </Paper>
    </Box>
  );
}
