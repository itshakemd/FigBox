import { useState, useCallback, useEffect, useRef } from "react";
import type { Reminder } from "./types";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderNow, setReminderNow] = useState(() => Date.now());
  const reminderIdCounter = useRef(0);

  const saveReminders = useCallback((r: Reminder[]) => { parent.postMessage({ pluginMessage: { type: "reminders-save", reminders: r } }, "*"); }, []);

  useEffect(() => {
    if (reminders.length === 0) return;
    const id = window.setInterval(() => setReminderNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [reminders.length]);

  const addReminder = useCallback((rawTitle: string, durationMin: number) => {
    const title = (rawTitle || "").trim() || "Reminder"; if (![5, 10, 15].includes(durationMin)) return;
    reminderIdCounter.current += 1;
    const id = `r${Date.now()}-${reminderIdCounter.current}`;
    const r: Reminder = { id, title, durationMin, dueAt: Date.now() + durationMin * 60 * 1000 };
    setReminders(prev => { const next = [...prev, r]; saveReminders(next); return next; });
  }, [saveReminders]);

  return { reminders, reminderNow, addReminder, saveReminders, setReminders };
}