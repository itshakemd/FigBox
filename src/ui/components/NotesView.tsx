import React, { useState, useEffect, useRef } from "react";
interface Note { id: string; title: string; text: string; updatedAt: number; }
interface Props { notes: Note[]; activeNoteId: string | null; onOpenNote: (id: string) => void; onShowList: () => void; onAddNote: () => void; onUpdateNote: (title: string, text: string) => void; onBack: () => void; }
export default function NotesView({ notes, activeNoteId, onOpenNote, onShowList, onAddNote, onUpdateNote, onBack }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const activeNote = notes.find(n => n.id === activeNoteId) || null;
  const isEditorView = activeNoteId !== null;
  useEffect(() => { if (isEditorView && activeNote) { setTitle(activeNote.title); setText(activeNote.text); } }, [activeNoteId, activeNote, isEditorView]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; setTitle(val); if (activeNoteId) onUpdateNote(val, text); };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { const val = e.target.value; setText(val); if (activeNoteId) onUpdateNote(title, val); };
  if (isEditorView) {
    return (
      <div className="note-view">
        <div>
          <button className="back-btn" onClick={onShowList} aria-label="Back to notes" title="Back to notes">Back</button>
          <input className="note-title-input" type="text" maxLength={80} placeholder="Note title" aria-label="Note title" value={title} onChange={handleTitleChange} />
        </div>
        <textarea className="note-textarea" ref={textareaRef} placeholder="Write your note..." maxLength={10000} value={text} onChange={handleTextChange} />
      </div>
    );
  }
  return (
    <div className="note-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Notes</span>
        <button className="add-btn" onClick={onAddNote} aria-label="Add note" title="Add note">Add</button>
      </div>
      <div className="note-list">
        {notes.map(note => (
          <div key={note.id} className="note-item" tabIndex={0} role="button" aria-label={"Open " + note.title} onClick={() => onOpenNote(note.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenNote(note.id); } }}>
            <div className="note-item-copy"><div className="note-item-title">{note.title}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}