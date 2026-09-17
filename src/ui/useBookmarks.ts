import { useState, useCallback, useRef } from "react";
import type { Bookmark } from "./types";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const bookmarkIdCounter = useRef(0);
  void bookmarkIdCounter;

  const saveBookmarks = useCallback((b: Bookmark[]) => {
    parent.postMessage({ pluginMessage: { type: "bookmarks-save", bookmarks: b } }, "*");
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks(prev => { const next = prev.filter(b => b.id !== id); saveBookmarks(next); return next; });
  }, [saveBookmarks]);

  return { bookmarks, deleteBookmark, saveBookmarks, setBookmarks };
}