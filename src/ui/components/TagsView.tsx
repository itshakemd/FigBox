import React, { useState } from "react";
interface Tag { id: string; name: string; nodeId: string | null; }
interface Props { tags: Tag[]; onAddTag: (name: string) => void; onNavigateToTag: (id: string) => void; onDeleteTag: (id: string) => void; onBack: () => void; }
export default function TagsView({ tags, onAddTag, onNavigateToTag, onDeleteTag, onBack }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!inputValue.trim()) return; onAddTag(inputValue.trim()); setInputValue(""); setShowForm(false); };
  return (
    <div className="tags-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Tags</span>
        <button className="add-btn" onClick={() => { setShowForm(!showForm); setInputValue(""); }} aria-label="Add tag" title="Add">Add</button>
      </div>
      <form className="tag-add-row" onSubmit={handleSubmit} hidden={!showForm}>
        <input type="text" className="tag-add-input" placeholder="Tag name" maxLength={80} required value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="submit" className="tag-add-confirm" aria-label="Confirm" title="Confirm">OK</button>
      </form>
      <div className="tag-list">
        {tags.map(tag => (
          <div key={tag.id} className="tag-row">
            <button className="tag-link-btn" type="button" onClick={() => onNavigateToTag(tag.id)} title={"Jump to " + tag.name + " on the board"}>
              <span className="tag-label">{tag.name}</span>
            </button>
            <button className="tag-delete" onClick={() => onDeleteTag(tag.id)} aria-label={"Delete tag " + tag.name} title="Delete (also removes card from board)">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}