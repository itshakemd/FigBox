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
      <div className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span className="app-header-title">Links</span>
        <button className="add-btn" onClick={() => setShowForm(!showForm)} aria-label="Add link" title="Add"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
      </div>
      <form className="bookmark-add-row" onSubmit={handleSubmit} hidden={!showForm}>
        <input type="text" className="bookmark-add-input" placeholder="Name (optional)" maxLength={60} value={label} onChange={e => setLabel(e.target.value)} />
        <input type="text" className="bookmark-add-input" placeholder="https://example.com" maxLength={2000} required value={url} onChange={e => setUrl(e.target.value)} />
        <div className="bookmark-add-actions"><button type="submit" className="bookmark-add-confirm" aria-label="Confirm" title="Confirm"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div>
      </form>
      <div className={"bookmark-list" + (bookmarks.length === 0 ? " is-empty" : "")}>
        {bookmarks.length === 0 ? <div className="bookmark-empty">No links yet</div> :
          bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bookmark-row">
            <a className="bookmark-link-btn" href={bookmark.url} target="_blank" rel="noopener noreferrer" title={bookmark.url}>
              <span className="bookmark-link-icon"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6.8 9.2L9.2 6.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M7.6 4.3L8.6 3.3C9.6 2.3 11.2 2.3 12.2 3.3C13.2 4.3 13.2 5.9 12.2 6.9L11.2 7.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M8.4 11.7L7.4 12.7C6.4 13.7 4.8 13.7 3.8 12.7C2.8 11.7 2.8 10.1 3.8 9.1L4.8 8.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></span>
              <span className="bookmark-label">{bookmark.label}</span>
            </a>
            <button className="bookmark-delete" onClick={() => onDeleteBookmark(bookmark.id)} aria-label={"Delete " + bookmark.label} title="Delete"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          ))
        }
      </div>
    </div>
  );
}