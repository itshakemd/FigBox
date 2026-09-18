export interface Bookmark {
  id: string;
  url: string;
  label: string;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  updatedAt: number;
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export interface Tag {
  id: string;
  name: string;
  nodeId: string | null;
}

export interface Reminder {
  id: string;
  title: string;
  durationMin: number;
  dueAt: number;
}

export type View = 'pill' | 'apps' | 'links' | 'timer' | 'tasks' | 'note' | 'tags' | 'reminders';