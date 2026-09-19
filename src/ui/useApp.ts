import { useState, useCallback, useEffect } from "react";
import type { View } from "./types";
import { useTimer } from "./useTimer";
import { useBookmarks } from "./useBookmarks";
import { useNotes } from "./useNotes";
import { useTasks } from "./useTasks";
import { useTags } from "./useTags";
import { useReminders } from "./useReminders";
import { getViewSize, normalizeNotes } from "./utils";

export default function useApp() {
  const [activeView, setActiveView] = useState<View>("pill");
  const timer = useTimer();
  const { bookmarks, addBookmark, deleteBookmark, setBookmarks } = useBookmarks();
  const { notes, activeNoteId, addNote, deleteNote, openNote, showNoteList, showNoteOnBoard, updateNoteText, setNotes } = useNotes();
  const { tasks, addTask, toggleTask, deleteTask, setTasks } = useTasks();
  const { tags, tagPendingId, tagPendingName, tagIdCounter, addTag, navigateToTag, deleteTag, saveTags, setTags, setTagPendingId, setTagPendingName } = useTags();
  const { reminders, reminderNow, addReminder, cancelReminder, triggerReminder, ensureTickLoop, removeReminderById, setReminders } = useReminders();

  const applyView = useCallback((next: View) => {
    setActiveView(next);
    const size = getViewSize(next);
    parent.postMessage({ pluginMessage: { type: "resize", width: size.width, height: size.height } }, "*");
  }, []);

  const ensureTickLoopIfAny = useCallback(() => { if (reminders.length > 0) ensureTickLoop(); }, [reminders, ensureTickLoop]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const msg = event.data?.pluginMessage; if (!msg) return;
      switch (msg.type) {
        case "tasks-init": setTasks(msg.tasks || []); break;
        case "bookmarks-init": setBookmarks(msg.bookmarks || []); break;
        case "note-init": setNotes(normalizeNotes(msg.notes ?? msg.note)); break;
        case "tags-init": setTags(msg.tags || []); break;
        case "tag-create-result":
          if (msg.nodeId) {
            tagIdCounter.current += 1;
            const name = tagPendingName || "Untitled";
            setTags(prev => [...prev, { id: `g${Date.now()}-${tagIdCounter.current}`, name, nodeId: msg.nodeId }]);
            saveTags(tags);
          }
          setTagPendingId(null); setTagPendingName(""); break;
        case "tag-missing": setTags(prev => prev.filter((t: any) => t.nodeId !== msg.nodeId)); break;
        case "reminders-init": {
          const now = Date.now(); const overdue = msg.reminders.filter((r: any) => now >= r.dueAt); const active = msg.reminders.filter((r: any) => now < r.dueAt);
          setReminders(active); overdue.forEach((r: any) => triggerReminder(r.id, r.title)); ensureTickLoop(); break;
        }
        case "reminder-trigger-result": setReminders(prev => prev.filter((r: any) => r.id !== msg.id)); break;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setNotes, setTasks, setBookmarks, setTags, tagPendingId, tagPendingName, tags, saveTags, tagIdCounter, setReminders, triggerReminder, ensureTickLoop, removeReminderById]);

  return {
    activeView, bookmarks, notes, activeNoteId, tasks, tags, reminders, reminderNow,
    timerSeconds: timer.timerSeconds, timerRunning: timer.timerRunning,
    addBookmark, deleteBookmark, addNote, deleteNote, openNote, showNoteList, showNoteOnBoard, updateNoteText, addTask, toggleTask, deleteTask, addTag, navigateToTag, deleteTag, addReminder, cancelReminder, applyView,
    startTimer: timer.startTimer, pauseTimer: timer.pauseTimer, resetTimer: timer.resetTimer,
    setTimerSeconds: timer.setTimerSeconds, setTimerRunning: timer.setTimerRunning, ensureTickLoopIfAny,
  };
}