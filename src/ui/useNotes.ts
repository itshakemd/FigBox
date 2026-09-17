import { useState, useCallback } from "react";
import type { Note } from "./types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const saveNotes = useCallback((n: Note[]) => {
    parent.postMessage({ pluginMessage: { type: "note-save", notes: n } }, "*");
  }, []);

  return { notes, saveNotes, setNotes };
}