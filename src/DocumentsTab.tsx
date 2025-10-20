import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Paper,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/Download";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useDocuments } from "./DocumentsContext";
import type { DocumentItem } from "./DocumentsContext";

export default function DocumentsTab() {
  const api = useDocuments();
  if (!api) return null;

  type Row = DocumentItem;

  const columns: GridColDef<Row>[] = [
    { field: "name", headerName: "Dateiname", flex: 1, minWidth: 200 },
    {
      field: "size",
      headerName: "Grösse",
      width: 120,
      sortable: true,
      renderCell: (params: GridRenderCellParams<Row>) =>
        `${(params.row.size / 1024).toFixed(1)} KB`,
    },
    { field: "type", headerName: "Typ", width: 160 },
    {
      field: "uploadedAt",
      headerName: "Hochgeladen",
      width: 180,
      renderCell: (params: GridRenderCellParams<Row>) =>
        new Date(params.row.uploadedAt).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Row>) => {
        const row = params.row;
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              component={Link}
              href={row.url}
              download={row.name}
              target="_blank"
              rel="noopener"
              aria-label="Download"
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => api.removeDoc(row.id)}
              aria-label="Löschen"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6">Dokumente</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={api.openCreate}>
          Hochladen
        </Button>
      </Stack>

      <Paper variant="outlined">
        <div style={{ height: 420, width: "100%" }}>
          <DataGrid<Row>
            rows={api.docs}
            columns={columns}
            getRowId={(r) => r.id}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
          />
        </div>
      </Paper>
    </Box>
  );
}
