/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";

export type SchadenRow = {
  id: number;
  adrKey: string;
  ownType: string;
  evtTyp: string;
  evtKey: string;        // still in data type, just not shown as a column
  memberKey: string;
  member: string;
  adrKeyMain: string;
  adrKeyNew: string;     // still in data type, just not shown as a column
  alternateKey: string;  // still in data type, just not shown as a column
  proKey: string;        // still in data type, just not shown as a column
  aDate: string;
  origin: string;
  class: string;
  status: string;
  statusDate: string;
};

export type SchadenViewKey = "aktuell" | "naechste" | "fertig" | "alle" | "apiimport";

export const SCHADEN_VIEWS: {
  key: SchadenViewKey;
  label: string;
  predicate: (r: SchadenRow) => boolean;
}[] = [
  { key: "aktuell", label: "Aktuell", predicate: (r) => r.status === "Active" },
  { key: "naechste", label: "Nächste", predicate: (r) => r.status === "Pending" },
  { key: "fertig", label: "Fertig", predicate: (r) => r.status === "Closed" },
  { key: "alle", label: "Alle", predicate: () => true },
  { key: "apiimport", label: "API / Import", predicate: (r) => r.origin === "API" || r.origin === "Import" },
];

const rows: SchadenRow[] = [
  { id: 1,  adrKey: "ADR001234", ownType: "Individual",  evtTyp: "Update", evtKey: "EVT7891", memberKey: "MBR45678", member: "John Smith",   adrKeyMain: "ADR001234", adrKeyNew: "ADR001235", alternateKey: "ALT789123", proKey: "PRO456789", aDate: "2025-10-21", origin: "Web",    class: "Premium",    status: "Active",   statusDate: "2025-10-21" },
  { id: 2,  adrKey: "ADR002345", ownType: "Company",     evtTyp: "Create", evtKey: "EVT7892", memberKey: "MBR45679", member: "Jane Doe",    adrKeyMain: "ADR002345", adrKeyNew: "ADR002346", alternateKey: "ALT789124", proKey: "PRO456790", aDate: "2025-10-07", origin: "Import",  class: "Standard",   status: "Pending",  statusDate: "2025-10-07" },
  { id: 3,  adrKey: "ADR003456", ownType: "Partnership", evtTyp: "Delete", evtKey: "EVT7893", memberKey: "MBR45680", member: "Bob Johnson", adrKeyMain: "ADR003456", adrKeyNew: "ADR003457", alternateKey: "ALT789125", proKey: "PRO456791", aDate: "2025-10-17", origin: "Manual",  class: "Basic",      status: "Inactive", statusDate: "2025-10-17" },
  { id: 4,  adrKey: "ADR004567", ownType: "Individual",  evtTyp: "Update", evtKey: "EVT7894", memberKey: "MBR45681", member: "Sarah Wilson",adrKeyMain: "ADR004567", adrKeyNew: "ADR004568", alternateKey: "ALT789126", proKey: "PRO456792", aDate: "2025-10-18", origin: "API",     class: "Premium",    status: "Active",   statusDate: "2025-10-18" },
  { id: 5,  adrKey: "ADR005678", ownType: "Company",     evtTyp: "Create", evtKey: "EVT7895", memberKey: "MBR45682", member: "Mike Brown",  adrKeyMain: "ADR005678", adrKeyNew: "ADR005679", alternateKey: "ALT789127", proKey: "PRO456793", aDate: "2025-10-19", origin: "Batch",   class: "Enterprise", status: "Active",   statusDate: "2025-10-19" },
  { id: 6,  adrKey: "ADR006789", ownType: "Individual",  evtTyp: "Update", evtKey: "EVT7896", memberKey: "MBR45683", member: "Emily Davis", adrKeyMain: "ADR006789", adrKeyNew: "ADR006790", alternateKey: "ALT789128", proKey: "PRO456794", aDate: "2025-10-11", origin: "Web",    class: "Standard",   status: "Closed",   statusDate: "2025-10-12" },
  { id: 7,  adrKey: "ADR007890", ownType: "Company",     evtTyp: "Create", evtKey: "EVT7897", memberKey: "MBR45684", member: "Chris Green", adrKeyMain: "ADR007890", adrKeyNew: "ADR007891", alternateKey: "ALT789129", proKey: "PRO456795", aDate: "2025-10-05", origin: "Import",  class: "Premium",    status: "Pending",  statusDate: "2025-10-05" },
  { id: 8,  adrKey: "ADR008901", ownType: "Partnership", evtTyp: "Update", evtKey: "EVT7898", memberKey: "MBR45685", member: "Laura Lee",   adrKeyMain: "ADR008901", adrKeyNew: "ADR008902", alternateKey: "ALT789130", proKey: "PRO456796", aDate: "2025-10-10", origin: "API",     class: "Basic",      status: "Active",   statusDate: "2025-10-10" },
  { id: 9,  adrKey: "ADR009012", ownType: "Individual",  evtTyp: "Delete", evtKey: "EVT7899", memberKey: "MBR45686", member: "Peter White", adrKeyMain: "ADR009012", adrKeyNew: "ADR009013", alternateKey: "ALT789131", proKey: "PRO456797", aDate: "2025-09-30", origin: "Manual",  class: "Standard",   status: "Inactive", statusDate: "2025-10-01" },
  { id: 10, adrKey: "ADR010123", ownType: "Company",     evtTyp: "Create", evtKey: "EVT7900", memberKey: "MBR45687", member: "Zoe King",    adrKeyMain: "ADR010123", adrKeyNew: "ADR010124", alternateKey: "ALT789132", proKey: "PRO456798", aDate: "2025-10-22", origin: "Batch",   class: "Enterprise", status: "Active",   statusDate: "2025-10-22" },
  { id: 11, adrKey: "ADR011234", ownType: "Individual",  evtTyp: "Update", evtKey: "EVT7901", memberKey: "MBR45688", member: "Nina Patel",  adrKeyMain: "ADR011234", adrKeyNew: "ADR011235", alternateKey: "ALT789133", proKey: "PRO456799", aDate: "2025-10-03", origin: "Web",    class: "Premium",    status: "Closed",   statusDate: "2025-10-04" },
  { id: 12, adrKey: "ADR012345", ownType: "Company",     evtTyp: "Update", evtKey: "EVT7902", memberKey: "MBR45689", member: "Oscar Diaz",  adrKeyMain: "ADR012345", adrKeyNew: "ADR012346", alternateKey: "ALT789134", proKey: "PRO456800", aDate: "2025-10-15", origin: "API",     class: "Standard",   status: "Pending",  statusDate: "2025-10-15" },
];

export const SCHADEN_COLUMNS: GridColDef<SchadenRow>[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "adrKey", headerName: "AdrKey", width: 140 },
  { field: "ownType", headerName: "Eigentümer-Typ", width: 140 },
  { field: "evtTyp", headerName: "Ereignis", width: 100 },
  // removed: evtKey
  { field: "memberKey", headerName: "MemberKey", width: 120 },
  { field: "member", headerName: "Mitglied", width: 160 },
  { field: "adrKeyMain", headerName: "AdrKeyMain", width: 120 },
  // removed: adrKeyNew
  // removed: alternateKey
  // removed: proKey
  { field: "aDate", headerName: "ADate", width: 110 },
  { field: "origin", headerName: "Quelle", width: 100 },
  { field: "class", headerName: "Klasse", width: 120 },
  { field: "status", headerName: "Status", width: 110 },
  { field: "statusDate", headerName: "StatusDatum", width: 120 },
];

export const SCHADEN_ROWS = rows;

export default function SchadenPage({ onOpenClaim }: { onOpenClaim: (row: SchadenRow) => void }) {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<SchadenViewKey>("alle");
  const predicate = SCHADEN_VIEWS.find((v) => v.key === activeView)?.predicate ?? (() => true);
  const filteredRows = useMemo(() => rows.filter(predicate), [activeView]);

  return (
    <Box>
      <Paper elevation={0}>
        <Toolbar>
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>{t("claims.title")}</Typography>
          <Tooltip title={t("claims.columns")}><IconButton><ViewColumnIcon /></IconButton></Tooltip>
          <Tooltip title={t("claims.filter")}><IconButton><FilterListIcon /></IconButton></Tooltip>
          <Tooltip title={t("claims.refresh")}><IconButton><RefreshIcon /></IconButton></Tooltip>
          <Tooltip title={t("claims.export")}><IconButton><DownloadIcon /></IconButton></Tooltip>
          <Tooltip title={t("claims.more")}><IconButton><MoreVertIcon /></IconButton></Tooltip>
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
          columns={SCHADEN_COLUMNS}
          getRowId={(r) => r.id}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          onRowClick={(params) => onOpenClaim(params.row)}
        />
      </Paper>
    </Box>
  );
}
