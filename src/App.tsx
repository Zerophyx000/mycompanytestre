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
import { AddressPage } from "./AddressPage";
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
            element: <AddressPage onOpenAddress={openAddressTab} />,
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
    <Box display="flex" flexDirection="column" height="100vh" width="100vw" overflow="hidden">
      {/* Top bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>MC</Avatar>
          <Typography variant="h6" sx={{ mr: 3 }}>
            MeinUnternehmen
          </Typography>
          <Button color="inherit">Test</Button>
          <Box flex={1} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsNoneIcon />
          </IconButton>
          <Button color="inherit">Matt AI</Button>
          <Button color="inherit">Aktion</Button>
        </Toolbar>
        <Tabs
          value={activeIndex}
          onChange={(_, idx) => setActiveKey(tabs[idx].key)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ bgcolor: "background.paper", px: 2 }}
        >
          {tabs.map((t) => (
            <Tab
              key={t.key}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>{t.label}</Typography>
                  {tabs.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(t.key);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              }
            />
          ))}
        </Tabs>
      </AppBar>

      <Box display="flex" flex={1} overflow="hidden">
        {/* Left app nav */}
        {!isDetailTab && (
          <Paper
            elevation={0}
            sx={{
              width: 200,
              borderRight: 1,
              borderColor: "divider",
              overflow: "auto",
            }}
          >
            <List>
              <ListItemButton onClick={() => openTab("dashboard")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Startseite" />
              </ListItemButton>
              <ListItemButton onClick={() => openTab("adressen")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Adressen" />
              </ListItemButton>
              <ListItemButton onClick={() => openTab("schaeden")}>
                <ListItemIcon>
                  <WhatshotIcon />
                </ListItemIcon>
                <ListItemText primary="Schäden" />
              </ListItemButton>
            </List>
          </Paper>
        )}

        {/* Active tab content */}
        <Box 
          flex={1} 
          overflow="auto"
          sx={{ 
            bgcolor: 'background.default',
            minHeight: '100%'
          }}
        >
          {tabs.map((t, idx) =>
            idx === activeIndex ? (
              <Box key={t.key} sx={{ minHeight: '100%' }}>
                {t.element}
              </Box>
            ) : null
          )}
        </Box>
      </Box>
    </Box>
  );
}
