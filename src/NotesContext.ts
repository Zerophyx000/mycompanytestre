import * as React from "react";

export type NoteColor = "default" | "info" | "warning" | "success";

export type NewNoteInput = {
  title: string;
  body: string;
  tags: string[];
  color: NoteColor;
  pinned: boolean;
};

export type NoteItem = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  color: NoteColor;
  pinned: boolean;
  createdAt: string; // ISO
};

export type NotesApi = {
  notes: NoteItem[];
  openCreate: () => void;
  addNote: (n: NewNoteInput) => void;
  togglePin: (id: string) => void;
  removeNote: (id: string) => void;
};

export const NotesContext = React.createContext<NotesApi | null>(null);
export const useNotes = () => React.useContext(NotesContext);
