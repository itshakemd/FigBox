import type { Note, View } from "./types";

export const PILL_SIZE = { width: 100, height: 40 };
export const GRID_SIZE = { width: 170, height: 170 };

export function getViewSize(view: View) {
  if (view === "pill") return PILL_SIZE;
  return GRID_SIZE;
}

export function normalizeNotes(rawNotes: any): Note[] {
  if (Array.isArray(rawNotes)) {
    return rawNotes.filter((n: any) => n && typeof n === "object").map((n: any, i: number) => ({
      id: n.id || `n${Date.now()}-${i}`,
      title: (n.title || "Untitled note").toString().trim() || "Untitled note",
      text: (n.text || "").toString(),
      updatedAt: Number(n.updatedAt) || Date.now(),
    }));
  }
  if (typeof rawNotes === "string" && rawNotes.trim()) {
    return [{ id: `n${Date.now()}-legacy`, title: "Untitled note", text: rawNotes, updatedAt: Date.now() }];
  }
  return [];
}