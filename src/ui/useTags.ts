import { useState, useCallback, useRef } from "react";
import type { Tag } from "./types";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const tagIdCounter = useRef(0);

  const saveTags = useCallback((t: Tag[]) => { parent.postMessage({ pluginMessage: { type: "tags-save", tags: t } }, "*"); }, []);

  const addTag = useCallback((name: string) => {
    const trimmed = name.trim(); if (!trimmed) return;
    tagIdCounter.current += 1;
    const tag: Tag = { id: `g${Date.now()}-${tagIdCounter.current}`, name: trimmed, nodeId: null };
    setTags(prev => { const next = [...prev, tag]; saveTags(next); return next; });
  }, [saveTags]);

  const deleteTag = useCallback((id: string) => {
    setTags(prev => { const next = prev.filter(t => t.id !== id); saveTags(next); return next; });
  }, [saveTags]);

  return { tags, addTag, deleteTag, saveTags, setTags };
}