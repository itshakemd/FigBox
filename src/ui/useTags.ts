import { useState, useCallback, useRef } from "react";
import type { Tag } from "./types";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagPendingId, setTagPendingId] = useState<string | null>(null);
  const [tagPendingName, setTagPendingName] = useState<string>("");
  const tagIdCounter = useRef(0);

  const saveTags = useCallback((t: Tag[]) => { parent.postMessage({ pluginMessage: { type: "tags-save", tags: t } }, "*"); }, []);

  const addTag = useCallback((name: string) => {
    const trimmed = name.trim(); if (!trimmed) return;
    tagIdCounter.current += 1;
    const pendingId = `g${Date.now()}-${tagIdCounter.current}`;
    setTagPendingName(trimmed); setTagPendingId(pendingId);
    parent.postMessage({ pluginMessage: { type: "tag-create", id: pendingId, name: trimmed } }, "*");
  }, []);

  const navigateToTag = useCallback((id: string) => {
    const tag = tags.find(t => t.id === id); if (!tag || !tag.nodeId) return;
    parent.postMessage({ pluginMessage: { type: "tag-navigate", nodeId: tag.nodeId } }, "*");
  }, [tags]);

  const deleteTag = useCallback((id: string) => {
    const tag = tags.find(t => t.id === id); if (tag && tag.nodeId) { parent.postMessage({ pluginMessage: { type: "tag-delete-node", nodeId: tag.nodeId } }, "*"); }
    setTags(prev => { const next = prev.filter(t => t.id !== id); saveTags(next); return next; });
  }, [tags, saveTags]);

  return { tags, tagPendingId, tagPendingName, tagIdCounter, addTag, navigateToTag, deleteTag, saveTags, setTags, setTagPendingId, setTagPendingName };
}