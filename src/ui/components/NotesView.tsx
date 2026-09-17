import React from "react";
interface Note { id: string; title: string; text: string; updatedAt: number; }
interface Props { notes: Note[]; onBack: () => void; }
export default function NotesView({ notes, onBack }: Props) {
  return (
    <div className="note-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Notes</span>
      </div>
      <div className="note-list">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            <div className="note-item-copy"><div className="note-item-title">{note.title}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}