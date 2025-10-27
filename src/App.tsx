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

type MainKey = "dashboard" | "adressen" | "schaeden";

type TabItem = {
  key: string;           
  label: string;         
  row?: SchadenRow;      
  adrKey?: string;      
};

type User = {
  id: "max" | "anna";
  name: string;
  avatar: string;
  permissions: MainKey[]; 
};

const USERS: Record<User["id"], User> = {
  max:  { id: "max",  name: "Max Mustermann", avatar: "MM", permissions: ["dashboard", "schaeden"] },
  anna: { id: "anna", name: "Anna Admin",     avatar: "AA", permissions: ["dashboard", "adressen"] },
};

const RECENT_MAX = 8; 

export default function App() {
  const [user, setUser] = React.useState<User>(USERS.max);

  const [tabs, setTabs] = React.useState<TabItem[]>([
    { key: "dashboard", label: "Dashboard" },
  ]);
  const [activeKey, setActiveKey] = React.useState<string>("dashboard");

  const [recentSchadens, setRecentSchadens] = React.useState<SchadenRow[]>([]);

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === activeKey));

  const canSee = (k: MainKey) => user.permissions.includes(k);

  const openTab = (key: MainKey) => {
    if (!canSee(key)) return;
    if (tabs.some((t) => t.key === key)) return setActiveKey(key);
    setTabs((prev) => [...prev, { key, label: capital(key) }]);
    setActiveKey(key);
  };

  const openClaimTab = (row: SchadenRow) => {
    if (!canSee("schaeden")) return;
    const key = `claim:${row.id}`;
    if (!tabs.some((t) => t.key === key)) {
      setTabs((prev) => [...prev, { key, label: `Schaden ${row.adrKey}`, row }]);
    }
    setActiveKey(key);

    setRecentSchadens((prev) => {
      const dedup = prev.filter((r) => r.id !== row.id);
      return [row, ...dedup].slice(0, RECENT_MAX);
    });
  };

  const openAddressTab = (adrKey: string) => {
    if (!canSee("adressen")) return;
    const key = `address:${adrKey}`;
    if (!tabs.some((t) => t.key === key)) {
      setTabs((prev) => [...prev, { key, label: `Adresse ${adrKey}`, adrKey }]);
    }
    setActiveKey(key);
  };

  const closeTab = (key: string) => {
    if (tabs.length === 1) return; 
    const next = tabs.filter((t) => t.key !== key);
    setTabs(next);
    if (activeKey === key && next.length > 0) setActiveKey(next[next.length - 1].key);
  };

  function handleSwitchUser(nextId: User["id"]) {
    if (nextId === user.id) return;
    const nextUser = USERS[nextId];
    setUser(nextUser);

    const filtered = tabs.filter((t) => {
      if (t.key === "dashboard") return true;
      if (t.key === "adressen") return nextUser.permissions.includes("adressen");
      if (t.key === "schaeden") return nextUser.permissions.includes("schaeden");
      if (t.key.startsWith("address:")) return nextUser.permissions.includes("adressen");
      if (t.key.startsWith("claim:")) return nextUser.permissions.includes("schaeden");
      return false;
    });

    const nextTabs = filtered.length ? filtered : [{ key: "dashboard", label: "Dashboard" }];
    setTabs(nextTabs);

    const stillActive = nextTabs.some((t) => t.key === activeKey);
    setActiveKey(stillActive ? activeKey : "dashboard");
  }

  function elementFor(t: TabItem): React.ReactNode {
    if (t.key === "dashboard") {
      return (
        <DashboardLite
          user={{ id: user.id, name: user.name, avatar: user.avatar }}
          onSwitchUser={handleSwitchUser}
          recentSchadens={recentSchadens}
        />
      );
    }
    if (t.key === "adressen") return <AdressePage onOpenAddress={openAddressTab} />;
    if (t.key === "schaeden") return <SchadenPage onOpenClaim={openClaimTab} />;
    if (t.key.startsWith("claim:") && t.row) return <SchadenTabs claim={t.row} />;
    if (t.key.startsWith("address:") && t.adrKey) return <AddressDetailLayout adrKey={t.adrKey} />;
    return <Box />;
  }

  const isDetailTab = activeKey.startsWith("claim:") || activeKey.startsWith("address:");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Avatar sx={{ mr: 1 }}>{user.avatar}</Avatar>
          <Typography>{user.name}</Typography>
          <Box flexGrow={1} />
          <Tooltip title="Suchen">
            <IconButton size="small"><SearchIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Chat">
            <IconButton size="small"><ChatBubbleOutlineIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Benachrichtigungen">
            <IconButton size="small"><NotificationsNoneIcon /></IconButton>
          </Tooltip>
          <Button variant="contained" size="small">Aktion</Button>
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
                  {t.key !== "dashboard" && (
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
      </Paper>

      <Stack direction="row" flexGrow={1} minHeight={0}>

        <Paper square>
          <List>
            <ListItemButton
              selected={activeKey === "dashboard"}
              onClick={() => openTab("dashboard")}
            >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              {!isDetailTab && <ListItemText primary="Dashboard" />}
            </ListItemButton>

            {user.permissions.includes("adressen") && (
              <ListItemButton
                selected={activeKey === "adressen"}
                onClick={() => openTab("adressen")}
              >
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary="Adressen" />}
              </ListItemButton>
            )}

            {user.permissions.includes("schaeden") && (
              <ListItemButton
                selected={activeKey === "schaeden"}
                onClick={() => openTab("schaeden")}
              >
                <ListItemIcon><WhatshotIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary="Schäden" />}
              </ListItemButton>
            )}
          </List>
        </Paper>

        <Box flexGrow={1} minWidth={0} minHeight={0} display="flex">
          {tabs.map((t, idx) =>
            idx === activeIndex ? (
              <Box key={t.key} flexGrow={1}>
                {elementFor(t)}
              </Box>
            ) : null
          )}
        </Box>
      </Stack>
    </Box>
  );
}

function capital(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
