import React, { useState } from "react";
interface Tag { id: string; name: string; nodeId: string | null; }
interface Props { tags: Tag[]; onAddTag: (name: string) => void; onNavigateToTag: (id: string) => void; onDeleteTag: (id: string) => void; onBack: () => void; }
export default function TagsView({ tags, onAddTag, onNavigateToTag, onDeleteTag, onBack }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!inputValue.trim()) return; onAddTag(inputValue.trim()); setInputValue(""); setShowForm(false); };
  return (
    <div className="tags-view">
      <div className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span className="app-header-title">Tags</span>
        <button className="add-btn" onClick={() => { setShowForm(!showForm); setInputValue(""); }} aria-label="Add tag" title="Add"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
      </div>
      <form className="tag-add-row" onSubmit={handleSubmit} hidden={!showForm}>
        <input type="text" className="tag-add-input" placeholder="Tag name" maxLength={80} required value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="submit" className="tag-add-confirm" aria-label="Confirm" title="Confirm"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </form>
      <div className={"tag-list" + (tags.length === 0 ? " is-empty" : "")}>
        {tags.length === 0 ? <div className="tag-empty">No tags yet</div> :
          tags.map(tag => (
          <div key={tag.id} className="tag-row">
            <button className="tag-link-btn" type="button" onClick={() => onNavigateToTag(tag.id)} title={"Jump to " + tag.name + " on the board"}>
              <span className="tag-link-icon"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M14 8.2L8.2 14C7.6 14.6 6.6 14.6 6 14L1.5 9.5C0.9 8.9 0.9 7.9 1.5 7.3L7.3 1.5C7.9 0.9 8.9 0.9 9.5 1.5L14 6C14.6 6.6 14.6 7.6 14 8.2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/></svg></span>
              <span className="tag-label">{tag.name}</span>
            </button>
            <button className="tag-delete" onClick={() => onDeleteTag(tag.id)} aria-label={"Delete tag " + tag.name} title="Delete (also removes card from board)"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          ))
        }
      </div>
    </div>
  );
}