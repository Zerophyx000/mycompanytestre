import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

import DashboardLite from "./DashboardLite";
import AdressePage from "./AddressPage3"; 
import SchadenPage, { type SchadenRow } from "./SchadenPage";
import SchadenTabs from "./SchadenTabs";
import { AddressDetailLayout } from "./AddressDetailLayout 2";

type TabItem = {
  key: string;
  label: string;
  element: React.ReactNode;
};

export default function App() {
  const [tabs, setTabs] = React.useState<TabItem[]>([
    { key: "dashboard", label: "Dashboard", element: <DashboardLite /> },
  ]);
  const [activeKey, setActiveKey] = React.useState("dashboard");

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === activeKey));

  const openTab = (key: "dashboard" | "adressen" | "schaeden") => {
    const exists = tabs.find((t) => t.key === key);
    if (exists) return setActiveKey(key);

    const next: TabItem =
      key === "adressen"
        ? {
            key,
            label: "Adressen",
            element: <AdressePage onOpenAddress={openAddressTab} />,
          }
        : key === "schaeden"
        ? {
            key,
            label: "Schäden",
            element: <SchadenPage onOpenClaim={openClaimTab} />,
          }
        : { key, label: "Dashboard", element: <DashboardLite /> };

    setTabs((prev) => [...prev, next]);
    setActiveKey(key);
  };

  const openClaimTab = (row: SchadenRow) => {
    const key = `claim:${row.id}`;
    const exists = tabs.find((t) => t.key === key);
    if (exists) return setActiveKey(key);

    const next: TabItem = {
      key,
      label: `Schaden ${row.adrKey}`,
      element: <SchadenTabs claim={row} />,
    };
    setTabs((prev) => [...prev, next]);
    setActiveKey(key);
  };

  const openAddressTab = (adrKey: string) => {
    const key = `address:${adrKey}`;
    const exists = tabs.find((t) => t.key === key);
    if (exists) return setActiveKey(key);

    const next: TabItem = {
      key,
      label: `Adresse ${adrKey}`,
      element: <AddressDetailLayout adrKey={adrKey} />,
    };
    setTabs((prev) => [...prev, next]);
    setActiveKey(key);
  };

  const closeTab = (key: string) => {
    if (tabs.length === 1) return;
    const nextTabs = tabs.filter((t) => t.key !== key);
    setTabs(nextTabs);
    if (activeKey === key && nextTabs.length > 0) {
      setActiveKey(nextTabs[nextTabs.length - 1].key);
    }
  };

  const isDetailTab =
    activeKey.startsWith("claim:") || activeKey.startsWith("address:");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Avatar>MC</Avatar>
          <Box flexGrow={1} />
          <Tooltip title="Suchen">
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chat">
            <IconButton size="small">
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Benachrichtigungen">
            <IconButton size="small">
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" size="small">
            Aktion
          </Button>
        </Toolbar>
      </AppBar>

      <Paper square>
        <Tabs
          value={activeIndex}
          onChange={(_, idx) => setActiveKey(tabs[idx].key)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((t) => (
            <Tab
              key={t.key}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{t.label}</Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(t.key);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Stack>
              }
            />
          ))}
        </Tabs>
      </Paper>

      <Stack direction="row" flexGrow={1} minHeight={0}>
        {/* Left app nav */}
        <Paper square>
          <List>
            <ListItemButton
              selected={activeKey === "dashboard"}
              onClick={() => openTab("dashboard")}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              {!isDetailTab && <ListItemText primary="Dashboard" />}
            </ListItemButton>

            <ListItemButton
              selected={activeKey === "adressen"}
              onClick={() => openTab("adressen")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              {!isDetailTab && <ListItemText primary="Adressen" />}
            </ListItemButton>

            <ListItemButton
              selected={activeKey === "schaeden"}
              onClick={() => openTab("schaeden")}
            >
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              {!isDetailTab && <ListItemText primary="Schäden" />}
            </ListItemButton>
          </List>
        </Paper>

        {/* Active tab content */}
        <Box flexGrow={1} minWidth={0} minHeight={0} display="flex">
          {tabs.map((t, idx) =>
            idx === activeIndex ? (
              <Box key={t.key} flexGrow={1}>
                {t.element}
              </Box>
            ) : null
          )}
        </Box>
      </Stack>
    </Box>
  );
}
