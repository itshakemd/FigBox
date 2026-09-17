import React from "react";
import useApp from "./useApp";

const appsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
);
const tagIcon = (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M14 8.2L8.2 14C7.6 14.6 6.6 14.6 6 14L1.5 9.5C0.9 8.9 0.9 7.9 1.5 7.3L7.3 1.5C7.9 0.9 8.9 0.9 9.5 1.5L14 6C14.6 6.6 14.6 7.6 14 8.2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/></svg>
);

export default function App() {
  const { activeView } = useApp();
  if (activeView !== "pill") return null;
  return (
    <div className="toolbar" id="toolbar">
      <div className="pill-view">
        <button className="tool-btn" aria-label="Apps" title="Apps">{appsIcon}</button>
        <button className="tool-btn" aria-label="Tags" title="Tags">{tagIcon}</button>
      </div>
    </div>
  );
}