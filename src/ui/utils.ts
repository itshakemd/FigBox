import type { View } from "./types";

export const PILL_SIZE = { width: 100, height: 40 };
export const GRID_SIZE = { width: 170, height: 170 };

export function getViewSize(view: View) {
  if (view === "pill") return PILL_SIZE;
  return GRID_SIZE;
}