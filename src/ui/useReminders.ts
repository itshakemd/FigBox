import { useState, useCallback, useEffect, useRef } from "react";
import type { Reminder } from "./types";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderNow, setReminderNow] = useState(() => Date.now());
  const [reminderTickInterval, setReminderTickInterval] = useState<number | null>(null);
  const reminderIdCounter = useRef(0);

  const saveReminders = useCallback((r: Reminder[]) => { parent.postMessage({ pluginMessage: { type: "reminders-save", reminders: r } }, "*"); }, []);

  const triggerReminder = useCallback((id: string, title: string) => {
    parent.postMessage({ pluginMessage: { type: "reminder-trigger", id, title } }, "*");
  }, []);

  const removeReminderById = useCallback((id: string) => {
    setReminders(prev => { const next = prev.filter(r => r.id !== id); saveReminders(next); return next; });
  }, [saveReminders]);

  const tickReminders = useCallback(() => {
    const now = Date.now();
    setReminderNow(now);
    setReminders(prev => {
      const due = prev.filter(r => now >= r.dueAt);
      if (due.length === 0) return prev;
      due.forEach(r => triggerReminder(r.id, r.title));
      const next = prev.filter(r => now < r.dueAt);
      saveReminders(next);
      return next;
    });
  }, [saveReminders, triggerReminder]);

  const ensureTickLoop = useCallback(() => {
    if (reminderTickInterval !== null) return;
    tickReminders();
    const id = window.setInterval(() => {
      setReminders(prev => { if (prev.length === 0) { clearInterval(id); setReminderTickInterval(null); return prev; } tickReminders(); return prev; });
    }, 1000);
    setReminderTickInterval(id);
  }, [tickReminders, reminderTickInterval]);

  useEffect(() => {
    if (reminders.length === 0 && reminderTickInterval !== null) { clearInterval(reminderTickInterval); setReminderTickInterval(null); }
  }, [reminders.length, reminderTickInterval]);

  const addReminder = useCallback((rawTitle: string, durationMin: number) => {
    const title = (rawTitle || "").trim() || "Reminder"; if (![5, 10, 15].includes(durationMin)) return;
    reminderIdCounter.current += 1;
    const id = `r${Date.now()}-${reminderIdCounter.current}`;
    const r: Reminder = { id, title, durationMin, dueAt: Date.now() + durationMin * 60 * 1000 };
    setReminders(prev => { const next = [...prev, r]; saveReminders(next); return next; });
    ensureTickLoop();
  }, [saveReminders, ensureTickLoop]);

  const cancelReminder = useCallback((id: string) => { removeReminderById(id); }, [removeReminderById]);

  return { reminders, reminderNow, addReminder, cancelReminder, triggerReminder, ensureTickLoop, removeReminderById, saveReminders, setReminders };
}