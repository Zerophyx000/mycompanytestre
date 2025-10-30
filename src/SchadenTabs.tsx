/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
  Box, Breadcrumbs, CssBaseline, Divider, List, ListItemButton,
  ListItemIcon, ListItemText, Paper, Stack, Typography
} from "@mui/material";
import {
  Home as HomeIcon, Whatshot as WhatshotIcon, Dashboard as DashboardIcon,
  Timeline as TimelineIcon, Note as NoteIcon, Folder as FolderIcon
} from "@mui/icons-material";

import type { SchadenRow } from "./SchadenPage";
import SchadenOverviewPage from "./SchadenOverviewPage";
import NoteDialog from "./NoteDialog";
import NotesTab from "./NotesTab";
import { NotesContext, type NoteItem, type NewNoteInput } from "./NotesContext";
import DocumentDialog from "./DocumentDialog";
import DocumentsTab from "./DocumentsTab";
import { DocumentsContext, type DocumentItem } from "./DocumentsContext";

export const ClaimContext = React.createContext<SchadenRow | null>(null);
export const useClaim = () => React.useContext(ClaimContext);

type TabId = "overview" | "timeline" | "notiz" | "docs";

export default function SchadenTabs({ claim }: { claim: SchadenRow }) {
  const [currentTab, setCurrentTab] = React.useState<TabId>("overview");
  const [notes, setNotes] = React.useState<NoteItem[]>([]);
  const [noteOpen, setNoteOpen] = React.useState(false);

  const addNote = (n: NewNoteInput) =>
    setNotes((prev) => [
      {
        id: crypto.randomUUID(),
        title: n.title || "(ohne Titel)",
        body: n.body,
        tags: n.tags,
        color: n.color,
        pinned: n.pinned,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

  const togglePin = (id: string) =>
    setNotes((prev) => prev.map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x)));

  const removeNote = (id: string) => setNotes((prev) => prev.filter((x) => x.id !== id));

  const [docs, setDocs] = React.useState<DocumentItem[]>([]);
  const [docOpen, setDocOpen] = React.useState(false);

  const addFiles = (files: File[]) => {
    const items: DocumentItem[] = files.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      type: f.type || "Unbekannt",
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(f),
    }));
    setDocs((prev) => [...items, ...prev]);
  };

  const removeDoc = (id: string) => {
    setDocs((prev) => {
      const item = prev.find((d) => d.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((d) => d.id !== id);
    });
  };

  const tabs = [
    { id: "overview" as TabId, label: "Übersicht", icon: <DashboardIcon /> },
    { id: "timeline" as TabId, label: "Activity Timeline", icon: <TimelineIcon /> },
    { id: "notiz" as TabId, label: "Notiz", icon: <NoteIcon /> },
    { id: "docs" as TabId, label: "Dokumente", icon: <FolderIcon /> },
  ];

  const renderTab = () => {
    switch (currentTab) {
      case "overview":
        return <SchadenOverviewPage />;
      case "timeline":
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Activity Timeline</Typography>
            <Typography>(Platzhalter)</Typography>
          </Box>
        );
      case "notiz":
        return <NotesTab />;
      case "docs":
        return <DocumentsTab />;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        openCreate: () => setNoteOpen(true),
        addNote,
        togglePin,
        removeNote,
      }}
    >
      <DocumentsContext.Provider
        value={{
          docs,
          openCreate: () => setDocOpen(true),
          addFiles,
          removeDoc,
        }}
      >
        <ClaimContext.Provider value={claim}>
          <CssBaseline />
          <Stack direction="row" spacing={2}>  {/* ✅ CHANGED FROM "column" TO "row" */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Breadcrumbs>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <HomeIcon fontSize="small" />
                    <Typography>Dashboard</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <WhatshotIcon fontSize="small" />
                    <Typography>Schäden</Typography>
                  </Box>
                  <Typography color="text.primary">{claim.adrKey}</Typography>
                </Breadcrumbs>
              </Box>
              {renderTab()}
            </Box>

            <Paper elevation={0} sx={{ width: 280, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Navigation
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {tabs.map((tab) => (
                  <ListItemButton
                    key={tab.id}
                    selected={currentTab === tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    <ListItemIcon>{tab.icon}</ListItemIcon>
                    <ListItemText primary={tab.label} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Stack>

          <NoteDialog
            open={noteOpen}
            onClose={() => setNoteOpen(false)}
            onSave={(n) => {
              addNote(n);
              setCurrentTab("notiz");
            }}
          />

          <DocumentDialog
            open={docOpen}
            onClose={() => setDocOpen(false)}
            onSave={(files) => {
              addFiles(files);
              setCurrentTab("docs");
            }}
          />
        </ClaimContext.Provider>
      </DocumentsContext.Provider>
    </NotesContext.Provider>
  );
}
