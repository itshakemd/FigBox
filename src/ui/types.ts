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

export type View = 'pill' | 'apps' | 'links' | 'timer' | 'tasks' | 'note' | 'tags' | 'reminders';