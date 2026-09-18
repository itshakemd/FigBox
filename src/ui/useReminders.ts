import { useState, useCallback, useRef } from "react";
import type { Reminder } from "./types";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const reminderIdCounter = useRef(0);

  const saveReminders = useCallback((r: Reminder[]) => { parent.postMessage({ pluginMessage: { type: "reminders-save", reminders: r } }, "*"); }, []);

  const addReminder = useCallback((rawTitle: string) => {
    const title = (rawTitle || "").trim() || "Reminder";
    reminderIdCounter.current += 1;
    const id = `r${Date.now()}-${reminderIdCounter.current}`;
    const r: Reminder = { id, title, durationMin: 10, dueAt: Date.now() + 10 * 60 * 1000 };
    setReminders(prev => { const next = [...prev, r]; saveReminders(next); return next; });
  }, [saveReminders]);

  return { reminders, addReminder, saveReminders, setReminders };
}