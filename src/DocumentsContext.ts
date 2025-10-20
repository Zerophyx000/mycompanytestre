import { createContext, useContext } from "react";

export type DocumentItem = {
  id: string;
  name: string;
  size: number;    
  type: string;    
  uploadedAt: string; 
  url: string;       
};

export type DocumentsApi = {
  docs: DocumentItem[];
  openCreate: () => void;
  addFiles: (files: File[]) => void;
  removeDoc: (id: string) => void;
};

export const DocumentsContext = createContext<DocumentsApi | null>(null);

export function useDocuments(): DocumentsApi {
  const ctx = useContext(DocumentsContext);
  if (!ctx) {
    return {
      docs: [],
      openCreate: () => {},
      addFiles: () => {},
      removeDoc: () => {},
    };
  }
  return ctx;
}
