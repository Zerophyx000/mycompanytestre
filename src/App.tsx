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

// Two mock users
const USERS: Record<User["id"], User> = {
  max: {
    id: "max",
    name: "Max Mustermann",
    avatar: "MM",
    permissions: ["dashboard","schaeden"], // only Schäden
  },
  anna: {
    id: "anna",
    name: "Anna Admin",
    avatar: "AA",
    permissions: ["dashboard", "adressen"], // only Dashboard + Adressen
  },
};

export default function App() {
  const [user, setUser] = React.useState<User>(USERS.max);

  const getDefaultMainKey = (u: User): MainKey => u.permissions[0] ?? "dashboard";

  const [tabs, setTabs] = React.useState<TabItem[]>(() => {
    const first = getDefaultMainKey(USERS.max);
    return [{ key: first, label: labelFor(first) }];
  });
  const [activeKey, setActiveKey] = React.useState<string>(getDefaultMainKey(USERS.max));

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === activeKey));

  function labelFor(key: string) {
    if (key === "dashboard") return "Dashboard";
    if (key === "adressen") return "Adressen";
    if (key === "schaeden") return "Schäden";
    if (key.startsWith("claim:")) return `Schaden ${key.split(":")[1]}`;
    if (key.startsWith("address:")) return `Adresse ${key.split(":")[1]}`;
    return key;
  }

  // Permissions
  const canSee = (k: MainKey) => user.permissions.includes(k);

  // Open tabs
  const openTab = (key: MainKey) => {
    if (!canSee(key)) return;
    if (tabs.find((t) => t.key === key)) return setActiveKey(key);
    setTabs((prev) => [...prev, { key, label: labelFor(key) }]);
    setActiveKey(key);
  };

  const openClaimTab = (row: SchadenRow) => {
    if (!canSee("schaeden")) return;
    const key = `claim:${row.id}`;
    if (tabs.find((t) => t.key === key)) return setActiveKey(key);
    setTabs((prev) => [...prev, { key, label: `Schaden ${row.adrKey}`, row }]);
    setActiveKey(key);
  };

  const openAddressTab = (adrKey: string) => {
    if (!canSee("adressen")) return;
    const key = `address:${adrKey}`;
    if (tabs.find((t) => t.key === key)) return setActiveKey(key);
    setTabs((prev) => [...prev, { key, label: `Adresse ${adrKey}`, adrKey }]);
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

  // Switch test users
  function handleSwitchUser(nextId: User["id"]) {
    if (nextId === user.id) return;
    const nextUser = USERS[nextId];
    setUser(nextUser);

    const keep = tabs.filter((t) => {
      if (t.key === "dashboard") return nextUser.permissions.includes("dashboard");
      if (t.key === "adressen") return nextUser.permissions.includes("adressen");
      if (t.key === "schaeden") return nextUser.permissions.includes("schaeden");
      if (t.key.startsWith("address:")) return nextUser.permissions.includes("adressen");
      if (t.key.startsWith("claim:")) return nextUser.permissions.includes("schaeden");
      return false;
    });

    let nextTabs = keep;
    if (nextTabs.length === 0) {
      const first = getDefaultMainKey(nextUser);
      nextTabs = [{ key: first, label: labelFor(first) }];
    }

    setTabs(nextTabs);
    const currentStillAllowed = nextTabs.some((t) => t.key === activeKey);
    setActiveKey(currentStillAllowed ? activeKey : nextTabs[0].key);
  }

  // Render correct content
  function elementFor(t: TabItem): React.ReactNode {
    if (t.key === "dashboard")
      return <DashboardLite user={user} onSwitchUser={handleSwitchUser} />;
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
          <Avatar>{user.avatar}</Avatar>
          <Typography sx={{ ml: 1 }}>{user.name}</Typography>
          <Box flexGrow={1} />
          <Tooltip title="Suchen"><IconButton size="small"><SearchIcon /></IconButton></Tooltip>
          <Tooltip title="Chat"><IconButton size="small"><ChatBubbleOutlineIcon /></IconButton></Tooltip>
          <Tooltip title="Benachrichtigungen"><IconButton size="small"><NotificationsNoneIcon /></IconButton></Tooltip>
          <Button variant="contained" size="small">Aktion</Button>
        </Toolbar>
      </AppBar>

      {/* Top tabs */}
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
        {/* Sidebar nav */}
        <Paper square>
          <List>
            {user.permissions.includes("dashboard") && (
              <ListItemButton
                selected={activeKey === "dashboard"}
                onClick={() => openTab("dashboard")}
              >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            )}
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

        {/* Active content */}
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
