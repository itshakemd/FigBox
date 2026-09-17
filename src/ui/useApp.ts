import { useState, useCallback, useEffect } from "react";
import type { View } from "./types";
import { useNotes } from "./useNotes";
import { getViewSize, normalizeNotes } from "./utils";

export default function useApp() {
  const [activeView, setActiveView] = useState<View>("pill");
  const { notes, activeNoteId, addNote, openNote, showNoteList, updateNoteText, setNotes } = useNotes();

  const applyView = useCallback((next: View) => {
    setActiveView(next);
    const size = getViewSize(next);
    parent.postMessage({ pluginMessage: { type: "resize", width: size.width, height: size.height } }, "*");
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const msg = event.data?.pluginMessage; if (!msg) return;
      if (msg.type === "note-init") setNotes(normalizeNotes(msg.notes ?? msg.note));
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setNotes]);

  return { activeView, notes, activeNoteId, addNote, openNote, showNoteList, updateNoteText, applyView };
}