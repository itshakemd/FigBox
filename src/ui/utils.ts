import type { Note, View } from "./types";

export const PILL_SIZE = { width: 100, height: 40 };
export const GRID_SIZE = { width: 170, height: 170 };
export const APP_SIZE = { width: 340, height: 340 };

export function getViewSize(view: View) {
  if (view === "apps") return GRID_SIZE;
  if (view === "links") return APP_SIZE;
  if (["timer", "tasks", "note", "tags", "reminders"].includes(view)) return APP_SIZE;
  return PILL_SIZE;
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

export function normalizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function deriveLabel(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}