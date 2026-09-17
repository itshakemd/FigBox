export interface Note {
  id: string;
  title: string;
  text: string;
  updatedAt: number;
}

export type View = 'pill' | 'apps' | 'links' | 'timer' | 'tasks' | 'note' | 'tags' | 'reminders';