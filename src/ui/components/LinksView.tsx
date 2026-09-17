import React from "react";
interface Bookmark { id: string; url: string; label: string; }
interface Props { bookmarks: Bookmark[]; onDeleteBookmark: (id: string) => void; onBack: () => void; }
export default function LinksView({ bookmarks, onDeleteBookmark, onBack }: Props) {
  return (
    <div className="bookmark-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Links</span>
      </div>
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