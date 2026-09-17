import { useState, useCallback, useEffect } from "react";
import type { View } from "./types";
import { useTimer } from "./useTimer";
import { useBookmarks } from "./useBookmarks";
import { useNotes } from "./useNotes";
import { useTasks } from "./useTasks";
import { getViewSize, normalizeNotes } from "./utils";

export default function useApp() {
  const [activeView, setActiveView] = useState<View>("pill");
  const timer = useTimer();
  const { bookmarks, deleteBookmark, setBookmarks } = useBookmarks();
  const { notes, activeNoteId, addNote, deleteNote, openNote, showNoteList, updateNoteText, setNotes } = useNotes();
  const { tasks, addTask, toggleTask, deleteTask, setTasks } = useTasks();

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
        case "bookmarks-init": setBookmarks(msg.bookmarks || []); break;
        case "note-init": setNotes(normalizeNotes(msg.notes ?? msg.note)); break;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setNotes, setTasks, setBookmarks]);

  return {
    activeView, bookmarks, notes, activeNoteId, tasks,
    timerSeconds: timer.timerSeconds, timerRunning: timer.timerRunning,
    deleteBookmark, addNote, deleteNote, openNote, showNoteList, updateNoteText, addTask, toggleTask, deleteTask, applyView,
    startTimer: timer.startTimer, pauseTimer: timer.pauseTimer, resetTimer: timer.resetTimer,
    setTimerSeconds: timer.setTimerSeconds, setTimerRunning: timer.setTimerRunning,
  };
}