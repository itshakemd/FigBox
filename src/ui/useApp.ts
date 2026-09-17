import { useState, useCallback, useEffect } from "react";
import type { View } from "./types";
import { useNotes } from "./useNotes";
import { useTasks } from "./useTasks";
import { getViewSize, normalizeNotes } from "./utils";

export default function useApp() {
  const [activeView, setActiveView] = useState<View>("pill");
  const { notes, activeNoteId, addNote, deleteNote, openNote, showNoteList, updateNoteText, setNotes } = useNotes();
  const { tasks, setTasks } = useTasks();

  const applyView = useCallback((next: View) => {
    setActiveView(next);
    const size = getViewSize(next);
    parent.postMessage({ pluginMessage: { type: "resize", width: size.width, height: size.height } }, "*");
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const msg = event.data?.pluginMessage; if (!msg) return;
      switch (msg.type) {
        case "tasks-init": setTasks(msg.tasks || []); break;
        case "note-init": setNotes(normalizeNotes(msg.notes ?? msg.note)); break;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setNotes, setTasks]);

  return { activeView, notes, activeNoteId, tasks, addNote, deleteNote, openNote, showNoteList, updateNoteText, applyView };
}