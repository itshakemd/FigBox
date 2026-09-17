import { useState, useCallback } from "react";
import type { Task } from "./types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const saveTasks = useCallback((t: Task[]) => { parent.postMessage({ pluginMessage: { type: "tasks-save", tasks: t } }, "*"); }, []);

  return { tasks, saveTasks, setTasks };
}