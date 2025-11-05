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
  Select,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardLite from "./DashboardLite";
import AdressePage from "./AddressPage";
import SchadenPage, { type SchadenRow, SCHADEN_ROWS } from "./SchadenPage";
import SchadenTabs from "./SchadenTabs";
import { AddressDetailLayout } from "./AddressDetailLayout 2";
import SchadenCalendar from "./Calender";
import SettingsTab from "./SettingsTab";
import { useTranslation } from "react-i18next";

type MainKey = "dashboard" | "adressen" | "schaeden" | "calendar" | "settings";

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
  max: { id: "max", name: "Max Mustermann", avatar: "MM", permissions: ["dashboard", "schaeden", "calendar"] },
  anna: { id: "anna", name: "Anna Admin", avatar: "AA", permissions: ["dashboard", "adressen", "settings"] },
};

const RECENT_MAX = 8;
const PERMS_KEY_MAX = "app.perms.max";
const VALID_PERMS = ["dashboard", "adressen", "schaeden", "calendar"] as const;

function loadMaxPerms(): Extract<MainKey, "dashboard" | "adressen" | "schaeden" | "calendar">[] {
  try {
    const raw = localStorage.getItem(PERMS_KEY_MAX);
    if (!raw) return ["dashboard", "schaeden", "calendar"];
    const arr = JSON.parse(raw) as string[];
    return arr.filter((x) => (VALID_PERMS as readonly string[]).includes(x)) as any;
  } catch {
    return ["dashboard", "schaeden", "calendar"];
  }
}

function labelFor(key: MainKey, t: (k: string, opts?: any) => string) {
  if (key === "dashboard") return t("tabs.dashboard");
  if (key === "adressen") return t("tabs.addresses");
  if (key === "schaeden") return t("tabs.claims");
  if (key === "calendar") return t("tabs.calendar");
  if (key === "settings") return t("tabs.settings", "Settings");
  return key;
}

export default function App() {
  const { t, i18n } = useTranslation();

  const initialLang = (localStorage.getItem("lang") || i18n.language || "en").slice(0,2);
  const [lang, setLang] = React.useState<"en" | "de" | "fr">(
    (["en","de","fr"].includes(initialLang) ? initialLang : "en") as "en" | "de" | "fr"
  );
  React.useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  const [user, setUser] = React.useState<User>({ ...USERS.max, permissions: loadMaxPerms() });
  const [tabs, setTabs] = React.useState<TabItem[]>([{ key: "dashboard", label: t("tabs.dashboard") }]);
  const [activeKey, setActiveKey] = React.useState<string>("dashboard");
  const [recentSchadens, setRecentSchadens] = React.useState<SchadenRow[]>([]);

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === activeKey));
  const isDetailTab = activeKey.startsWith("claim:") || activeKey.startsWith("address:");
  const canSee = (k: MainKey) => {
    if (k === "settings") return user.id === "anna";
    return user.permissions.includes(k);
  };

  const openTab = (key: MainKey) => {
    if (!canSee(key)) return;
    if (tabs.some((t) => t.key === key)) return setActiveKey(key);
    setTabs((prev) => [...prev, { key, label: labelFor(key, t) }]);
    setActiveKey(key);
  };

  const openClaimTab = (row: SchadenRow) => {
    if (!canSee("schaeden")) return;
    const key = `claim:${row.id}`;
    if (!tabs.some((t) => t.key === key)) {
      setTabs((prev) => [...prev, { key, label: t("tabs.claim", { adrKey: row.adrKey }), row }]);
    }
    setActiveKey(key);
    setRecentSchadens((prev) => [row, ...prev.filter((r) => r.id !== row.id)].slice(0, RECENT_MAX));
  };

  const openAddressTab = (adrKey: string) => {
    if (!canSee("adressen")) return;
    const key = `address:${adrKey}`;
    if (!tabs.some((t) => t.key === key)) {
      setTabs((prev) => [...prev, { key, label: t("tabs.address", { adrKey }) , adrKey }]);
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
    const base = USERS[nextId];
    const perms = nextId === "max" ? loadMaxPerms() : base.permissions.filter((k) => k !== "settings");
    const nextUser: User = { ...base, permissions: perms as any };
    setUser(nextUser);

    const filtered = tabs.filter((t) => {
      if (t.key === "dashboard") return true;
      if (t.key === "adressen") return nextUser.permissions.includes("adressen");
      if (t.key === "schaeden") return nextUser.permissions.includes("schaeden");
      if (t.key === "calendar") return nextUser.permissions.includes("calendar");
      if (t.key === "settings") return nextUser.id === "anna";
      if (t.key.startsWith("address:")) return nextUser.permissions.includes("adressen");
      if (t.key.startsWith("claim:")) return nextUser.permissions.includes("schaeden");
      return false;
    });

    const nextTabs = filtered.length ? filtered : [{ key: "dashboard", label: t("tabs.dashboard") }];
    setTabs(nextTabs);
    setActiveKey(nextTabs.some((t) => t.key === activeKey) ? activeKey : "dashboard");
  }

  function elementFor(ti: TabItem): React.ReactNode {
    if (ti.key === "dashboard") {
      return (
        <DashboardLite
          user={{ id: user.id, name: user.name, avatar: user.avatar }}
          onSwitchUser={handleSwitchUser}
          recentSchadens={recentSchadens}
          onOpenClaim={openClaimTab}
        />
      );
    }
    if (ti.key === "adressen") return <AdressePage onOpenAddress={openAddressTab} />;
    if (ti.key === "schaeden") return <SchadenPage onOpenClaim={openClaimTab} />;
    if (ti.key === "calendar") return <SchadenCalendar rows={SCHADEN_ROWS} />;
    if (ti.key === "settings") return <SettingsTab />;
    if (ti.key.startsWith("claim:") && ti.row) return <SchadenTabs claim={ti.row} />;
    if (ti.key.startsWith("address:") && ti.adrKey) return <AddressDetailLayout adrKey={ti.adrKey} />;
    return <Box />;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100vw" overflow="hidden">
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Avatar sx={{ mr: 1 }}>{user.avatar}</Avatar>
          <Typography>{user.name}</Typography>
          <Box flexGrow={1} />
          <Tooltip title={t("topbar.language")}>
            <Select
              size="small"
              value={lang}
              onChange={(e) => setLang(e.target.value as "en" | "de" | "fr")}
              sx={{ mr: 1, minWidth: 84, bgcolor: "background.paper" }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="de">DE</MenuItem>
              <MenuItem value="fr">FR</MenuItem>
            </Select>
          </Tooltip>
          <Tooltip title={t("topbar.search")}><IconButton size="small"><SearchIcon /></IconButton></Tooltip>
          <Tooltip title={t("topbar.chat")}><IconButton size="small"><ChatBubbleOutlineIcon /></IconButton></Tooltip>
          <Tooltip title={t("topbar.notifications")}><IconButton size="small"><NotificationsNoneIcon /></IconButton></Tooltip>
          <Button variant="contained" size="small">{t("topbar.action")}</Button>
        </Toolbar>

        <Tabs
          value={activeIndex}
          onChange={(_, idx) => setActiveKey(tabs[idx].key)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ bgcolor: "background.paper", px: 2 }}
        >
          {tabs.map((ti) => (
            <Tab
              key={ti.key}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{ti.label}</Typography>
                  {ti.key !== "dashboard" && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(ti.key);
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

      <Stack direction="row" flexGrow={1} minHeight={0}>
        <Paper square>
          <List>
            <ListItemButton selected={activeKey === "dashboard"} onClick={() => openTab("dashboard")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              {!isDetailTab && <ListItemText primary={t("nav.dashboard")} />}
            </ListItemButton>

            {user.permissions.includes("adressen") && (
              <ListItemButton selected={activeKey === "adressen"} onClick={() => openTab("adressen")}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary={t("nav.addresses")} />}
              </ListItemButton>
            )}

            {user.permissions.includes("schaeden") && (
              <ListItemButton selected={activeKey === "schaeden"} onClick={() => openTab("schaeden")}>
                <ListItemIcon><WhatshotIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary={t("nav.claims")} />}
              </ListItemButton>
            )}

            {user.permissions.includes("calendar") && (
              <ListItemButton selected={activeKey === "calendar"} onClick={() => openTab("calendar")}>
                <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary={t("nav.calendar")} />}
              </ListItemButton>
            )}

            {user.id === "anna" && (
              <ListItemButton selected={activeKey === "settings"} onClick={() => openTab("settings")}>
                <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                {!isDetailTab && <ListItemText primary={t("nav.settings", "Settings")} />}
              </ListItemButton>
            )}
          </List>
        </Paper>

        <Box flexGrow={1} minWidth={0} minHeight={0} display="flex">
          {tabs.map((ti, idx) =>
            idx === activeIndex ? (
              <Box key={ti.key} flexGrow={1}>
                {elementFor(ti)}
              </Box>
            ) : null
          )}
        </Box>
      </Stack>
    </Box>
  );
}
