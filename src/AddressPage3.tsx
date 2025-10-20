import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  Button,
  CssBaseline,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import {
  DataGrid,
  type GridColDef,
  GridToolbar,
  type GridRowParams,
} from "@mui/x-data-grid";

export type AddressRow = {
  id: number;
  adrKey: string;
  ownType: string;
  extTyp: string;
  extKey: string;
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

type Props = {
  /** Click handler to open detail tab for an address key */
  onOpenAddress?: (adrKey: string) => void;
};

const rows: AddressRow[] = [
  {
    id: 1,
    adrKey: "ADR001234",
    ownType: "Individual",
    extTyp: "Update",
    extKey: "EXT7891",
    memberKey: "MBR45678",
    member: "John Smith",
    adrKeyMain: "ADR001234",
    adrKeyNew: "ADR001235",
    alternateKey: "ALT789123",
    proKey: "PRO456789",
    aDate: "2024-01-15",
    origin: "Web",
    class: "Premium",
    status: "Active",
    statusDate: "2024-01-15",
  },
  {
    id: 2,
    adrKey: "ADR002345",
    ownType: "Company",
    extTyp: "Create",
    extKey: "EXT7892",
    memberKey: "MBR45679",
    member: "Jane Doe",
    adrKeyMain: "ADR002345",
    adrKeyNew: "ADR002346",
    alternateKey: "ALT789124",
    proKey: "PRO456790",
    aDate: "2024-01-16",
    origin: "Import",
    class: "Standard",
    status: "Pending",
    statusDate: "2024-01-16",
  },
  {
    id: 3,
    adrKey: "ADR003456",
    ownType: "Partnership",
    extTyp: "Delete",
    extKey: "EXT7893",
    memberKey: "MBR45680",
    member: "Bob Johnson",
    adrKeyMain: "ADR003456",
    adrKeyNew: "ADR003457",
    alternateKey: "ALT789125",
    proKey: "PRO456791",
    aDate: "2024-01-17",
    origin: "Manual",
    class: "Basic",
    status: "Inactive",
    statusDate: "2024-01-17",
  },
  {
    id: 4,
    adrKey: "ADR004567",
    ownType: "Individual",
    extTyp: "Update",
    extKey: "EXT7894",
    memberKey: "MBR45681",
    member: "Sarah Wilson",
    adrKeyMain: "ADR004567",
    adrKeyNew: "ADR004568",
    alternateKey: "ALT789126",
    proKey: "PRO456792",
    aDate: "2024-01-18",
    origin: "API",
    class: "Premium",
    status: "Active",
    statusDate: "2024-01-18",
  },
  {
    id: 5,
    adrKey: "ADR005678",
    ownType: "Company",
    extTyp: "Create",
    extKey: "EXT7895",
    memberKey: "MBR45682",
    member: "Mike Brown",
    adrKeyMain: "ADR005678",
    adrKeyNew: "ADR005679",
    alternateKey: "ALT789127",
    proKey: "PRO456793",
    aDate: "2024-01-19",
    origin: "Batch",
    class: "Enterprise",
    status: "Active",
    statusDate: "2024-01-19",
  },
];

const columns: GridColDef<AddressRow>[] = [
  { field: "adrKey", headerName: "AdrKey", width: 110 },
  { field: "ownType", headerName: "OwnType", width: 110 },
  { field: "extTyp", headerName: "ExtTyp", width: 90 },
  { field: "extKey", headerName: "ExtKey", width: 110 },
  { field: "memberKey", headerName: "MemberKey", width: 130 },
  { field: "member", headerName: "Member", width: 150 },
  { field: "adrKeyMain", headerName: "AdrKeyMain", width: 130 },
  { field: "adrKeyNew", headerName: "AdrKeyNew", width: 130 },
  { field: "alternateKey", headerName: "AlternateKey", width: 140 },
  { field: "proKey", headerName: "ProKey", width: 120 },
  { field: "aDate", headerName: "ADate", width: 110 },
  { field: "origin", headerName: "Origin", width: 100 },
  { field: "class", headerName: "Class", width: 110 },
  { field: "status", headerName: "Status", width: 110 },
  { field: "statusDate", headerName: "StatusDate", width: 130 },
];

export default function AdressePage({ onOpenAddress }: Props) {
  const handleRowClick = (params: GridRowParams<AddressRow>) => {
    onOpenAddress?.(params.row.adrKey);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ px: 3, pt: 2, pb: 1 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component="button"
            variant="body2"
            color="text.secondary"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <HomeIcon fontSize="small" />
            Dashboard
          </Link>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PeopleIcon fontSize="small" />
            <Typography variant="body2" color="text.primary">
              Adressen
            </Typography>
          </Stack>
        </Breadcrumbs>
      </Box>

      <Box sx={{ px: 3, pb: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <PeopleIcon sx={{ fontSize: 32, color: "primary.main" }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Adressen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kontakte und Adressen verwalten
              </Typography>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<PersonAddIcon />} size="large">
            Neue Adresse
          </Button>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, px: 3, pb: 3 }}>
        <Paper elevation={1}>
          <div style={{ height: 520, width: "100%" }}>
            <DataGrid<AddressRow>
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          </div>
        </Paper>
      </Box>
    </>
  );
}

// expose the grid data for overview

export const addressData: AddressRow[] = rows;
