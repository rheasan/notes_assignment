import { createContext, useContext } from "react";

export const NotesContext = createContext<NotesContext | null>(null);
export const useNotesContext = () => useContext(NotesContext);