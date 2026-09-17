import { useState, useCallback, useRef } from "react";
import type { Bookmark } from "./types";
import { normalizeUrl, deriveLabel } from "./utils";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const bookmarkIdCounter = useRef(0);

  const saveBookmarks = useCallback((b: Bookmark[]) => {
    parent.postMessage({ pluginMessage: { type: "bookmarks-save", bookmarks: b } }, "*");
  }, []);

  const addBookmark = useCallback((rawUrl: string, rawLabel: string) => {
    const url = normalizeUrl(rawUrl);
    if (!url) return;
    const label = rawLabel.trim() || deriveLabel(url);
    bookmarkIdCounter.current += 1;
    const b: Bookmark = { id: `b${Date.now()}-${bookmarkIdCounter.current}`, url, label };
    setBookmarks(prev => { const next = [...prev, b]; saveBookmarks(next); return next; });
  }, [saveBookmarks]);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks(prev => { const next = prev.filter(b => b.id !== id); saveBookmarks(next); return next; });
  }, [saveBookmarks]);

  return { bookmarks, addBookmark, deleteBookmark, saveBookmarks, setBookmarks };
}