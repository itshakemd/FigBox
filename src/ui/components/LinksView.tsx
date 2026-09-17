import React, { useState } from "react";
interface Bookmark { id: string; url: string; label: string; }
interface Props { bookmarks: Bookmark[]; onAddBookmark: (rawUrl: string, rawLabel: string) => void; onDeleteBookmark: (id: string) => void; onBack: () => void; }
function normalizeUrl(rawUrl: string): string { const trimmed = rawUrl.trim(); if (!trimmed) return ""; if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return trimmed; return "https://" + trimmed; }
function deriveLabel(url: string): string { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; } }
export default function LinksView({ bookmarks, onAddBookmark, onDeleteBookmark, onBack }: Props) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); const u = normalizeUrl(url); if (!u) return; const l = label.trim() || deriveLabel(u); onAddBookmark(u, l); setLabel(""); setUrl(""); setShowForm(false); };
  return (
    <div className="bookmark-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Links</span>
        <button className="add-btn" onClick={() => setShowForm(!showForm)} aria-label="Add link" title="Add">Add</button>
      </div>
      <form className="bookmark-add-row" onSubmit={handleSubmit} hidden={!showForm}>
        <input type="text" className="bookmark-add-input" placeholder="Name (optional)" maxLength={60} value={label} onChange={e => setLabel(e.target.value)} />
        <input type="text" className="bookmark-add-input" placeholder="https://example.com" maxLength={2000} required value={url} onChange={e => setUrl(e.target.value)} />
        <div className="bookmark-add-actions"><button type="submit" className="bookmark-add-confirm" aria-label="Confirm" title="Confirm">OK</button></div>
      </form>
      <div className="bookmark-list">
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bookmark-row">
            <span className="bookmark-label">{bookmark.label}</span>
            <button className="bookmark-delete" onClick={() => onDeleteBookmark(bookmark.id)} aria-label={"Delete " + bookmark.label} title="Delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}