import { useState, useCallback, useRef } from "react";
import type { Task } from "./types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskIdCounter = useRef(0);

  const saveTasks = useCallback((t: Task[]) => { parent.postMessage({ pluginMessage: { type: "tasks-save", tasks: t } }, "*"); }, []);

  const addTask = useCallback((text: string) => {
    const trimmed = text.trim(); if (!trimmed) return;
    taskIdCounter.current += 1;
    const task: Task = { id: `t${Date.now()}-${taskIdCounter.current}`, text: trimmed, done: false };
    setTasks(prev => { const next = [...prev, task]; saveTasks(next); return next; });
  }, [saveTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => { const next = prev.map(t => t.id === id ? { ...t, done: !t.done } : t); saveTasks(next); return next; });
  }, [saveTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => { const next = prev.filter(t => t.id !== id); saveTasks(next); return next; });
  }, [saveTasks]);

  return { tasks, addTask, toggleTask, deleteTask, saveTasks, setTasks };
}