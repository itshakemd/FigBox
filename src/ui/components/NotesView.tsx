import React, { useState, useEffect, useRef } from "react";
interface Note { id: string; title: string; text: string; updatedAt: number; }
interface Props { notes: Note[]; activeNoteId: string | null; onOpenNote: (id: string) => void; onShowList: () => void; onAddNote: () => void; onDeleteNote: (id: string) => void; onShowOnBoard: (id: string) => void; onUpdateNote: (title: string, text: string) => void; onBack: () => void; }
function formatNoteDate(timestamp: number): string { if (!timestamp) return ""; return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" }); }
export default function NotesView({ notes, activeNoteId, onOpenNote, onShowList, onAddNote, onDeleteNote, onShowOnBoard, onUpdateNote, onBack }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const activeNote = notes.find(n => n.id === activeNoteId) || null;
  const isEditorView = activeNoteId !== null;
  useEffect(() => { if (isEditorView && activeNote) { setTitle(activeNote.title); setText(activeNote.text); } }, [activeNoteId, activeNote, isEditorView]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; setTitle(val); if (activeNoteId) onUpdateNote(val, text); };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { const val = e.target.value; setText(val); if (activeNoteId) onUpdateNote(title, val); };
  return (
    <div className="note-view">
      {isEditorView ? (
        <div className="note-editor">
          <div className="app-header">
            <button className="back-btn" onClick={onShowList} aria-label="Back to notes" title="Back to notes"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <input className="note-title-input" type="text" maxLength={80} placeholder="Note title" aria-label="Note title" value={title} onChange={handleTitleChange} />
            <button className="note-delete" onClick={() => { if (activeNoteId) onDeleteNote(activeNoteId); }} aria-label="Delete note" title="Delete note"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          <textarea className="note-textarea" ref={textareaRef} placeholder="Write your note..." maxLength={10000} value={text} onChange={handleTextChange} />
        </div>
      ) : (
        <div className="note-list-view">
          <div className="app-header">
            <button className="back-btn" onClick={onBack} aria-label="Back" title="Back"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <span className="app-header-title">Notes</span>
            <button className="add-btn" onClick={onAddNote} aria-label="Add note" title="Add note"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          <div className={"note-list" + (notes.length === 0 ? " is-empty" : "")}>
            {notes.length === 0 ? <div className="note-empty">No notes yet</div> :
              [...notes].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).map(note => (
              <div key={note.id} className="note-item" tabIndex={0} role="button" aria-label={"Open " + note.title} onClick={() => onOpenNote(note.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenNote(note.id); } }}>
                <div className="note-item-copy"><div className="note-item-title">{note.title}</div><div className="note-item-preview">{note.text.trim().replace(/\s+/g, " ") || "Empty note"}</div></div>
                <span className="note-item-date">{formatNoteDate(note.updatedAt)}</span>
                <button className="note-item-board" type="button" onClick={(e) => { e.stopPropagation(); onShowOnBoard(note.id); }} aria-label={"Show " + note.title + " on board"} title="Show on board"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 8L13.5 13.5M10.5 13.5H13.5V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button className="note-item-delete" onClick={(e) => { e.stopPropagation(); onDeleteNote(note.id); }} aria-label={"Delete " + note.title} title="Delete note"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
              </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}