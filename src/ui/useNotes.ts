import { useState, useCallback, useRef } from "react";
import type { Note } from "./types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteSaveTimer, setNoteSaveTimer] = useState<number | null>(null);
  const noteIdCounter = useRef(0);

  const saveNotes = useCallback((n: Note[]) => {
    parent.postMessage({ pluginMessage: { type: "note-save", notes: n } }, "*");
  }, []);

  const getActiveNote = useCallback(() => notes.find(n => n.id === activeNoteId) || null, [notes, activeNoteId]);

  const flushNoteSave = useCallback(() => {
    if (noteSaveTimer !== null) { clearTimeout(noteSaveTimer); setNoteSaveTimer(null); }
    const note = getActiveNote();
    if (!note) return;
    note.updatedAt = Date.now();
    saveNotes(notes);
  }, [noteSaveTimer, getActiveNote, notes, saveNotes]);

  const openNote = useCallback((id: string) => { if (!notes.find(n => n.id === id)) return; setActiveNoteId(id); }, [notes]);
  const showNoteList = useCallback(() => { flushNoteSave(); setActiveNoteId(null); }, [flushNoteSave]);

  const addNote = useCallback(() => {
    noteIdCounter.current += 1;
    const note: Note = { id: `n${Date.now()}-${noteIdCounter.current}`, title: "Untitled note", text: "", updatedAt: Date.now() };
    setNotes(prev => { const next = [...prev, note]; saveNotes(next); return next; });
    setActiveNoteId(note.id);
  }, [saveNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => { const next = prev.filter(n => n.id !== id); if (activeNoteId === id) setActiveNoteId(null); saveNotes(next); return next; });
  }, [activeNoteId, saveNotes]);

  const updateNoteText = useCallback((title: string, text: string) => {
    setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, title, text, updatedAt: Date.now() } : n));
    if (noteSaveTimer !== null) clearTimeout(noteSaveTimer);
    const id = window.setTimeout(() => { setNoteSaveTimer(null); saveNotes(notes); }, 400);
    setNoteSaveTimer(id);
  }, [activeNoteId, noteSaveTimer, notes, saveNotes]);

  return { notes, activeNoteId, addNote, deleteNote, openNote, showNoteList, updateNoteText, saveNotes, setNotes };
}