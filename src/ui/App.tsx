import React from "react";
import useApp from "./useApp";

const appsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
);

export default function App() {
  const { activeView, applyView } = useApp();
  if (activeView === "apps") {
    return (
      <div className="toolbar grid-mode" id="toolbar">
        <div>
          <button className="back-btn" onClick={() => applyView("pill")} aria-label="Back" title="Back">Back</button>
          <span>Apps</span>
        </div>
      </div>
    );
  }
  return (
    <div className="toolbar" id="toolbar">
      <div className="pill-view">
        <button className="tool-btn" onClick={() => applyView("apps")} aria-label="Apps" title="Apps">{appsIcon}</button>
      </div>
    </div>
  );
}