import * as React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Paper,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import NoteIcon from "@mui/icons-material/Note";

// Use your exact filenames with spaces:
import AddressOverview from "./AddressOverview 1";
import AddressTimeline from "./AddressTimeline 1";
import AddressNotes from "./AddressNotes 1";

export type AddressDetailLayoutProps = { adrKey: string };

function AddressDetailLayout({ adrKey }: AddressDetailLayoutProps) {
  const [tab, setTab] = React.useState<"overview" | "timeline" | "notes">("overview");

  const tabs = [
    { id: "overview" as const, label: "Übersicht", icon: <DashboardIcon /> },
    { id: "timeline" as const, label: "Activity Timeline", icon: <TimelineIcon /> },
    { id: "notes" as const, label: "Notiz", icon: <NoteIcon /> },
  ];

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Breadcrumbs */}
      <Box px={3} pt={2} pb={1}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component="button" variant="body2" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HomeIcon fontSize="small" /> Dashboard
          </Link>
          <Link component="button" variant="body2" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon fontSize="small" /> Adressen
          </Link>
          <Typography variant="body2">{adrKey}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Main + right nav */}
      <Box display="flex" flexGrow={1} px={3} pb={3} gap={2} minHeight={0}>
        {/* Main */}
        <Paper elevation={0} sx={{ flex: 1, p: 0, minWidth: 0 }}>
          <Box px={2} py={1.5}>
            <Typography variant="h5" fontWeight="bold">
              Adresse {adrKey}
            </Typography>
          </Box>
          <Divider />
          <Box p={2}>
            {tab === "overview" && <AddressOverview adrKey={adrKey} />}
            {tab === "timeline" && <AddressTimeline adrKey={adrKey} />}
            {tab === "notes" && <AddressNotes/>}
          </Box>
        </Paper>

        {/* Right navigation */}
        <Paper elevation={0} sx={{ width: 280 }}>
          <Box p={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Navigation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tabs für diese Adresse
            </Typography>
          </Box>
          <Divider />
          <List>
            {tabs.map((t) => (
              <ListItemButton
                key={t.id}
                selected={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                <ListItemIcon>{t.icon}</ListItemIcon>
                <ListItemText primary={t.label} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export { AddressDetailLayout };
export default AddressDetailLayout;
