import React from "react";
import useApp from "./useApp";
import AppGrid from "./components/AppGrid";
import NotesView from "./components/NotesView";

const appsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
);

function Placeholder({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div>
      <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
      <span>{title}</span>
      <div>Coming soon</div>
    </div>
  );
}

export default function App() {
  const { activeView, notes, activeNoteId, addNote, deleteNote, openNote, showNoteList, updateNoteText, applyView } = useApp();

  const toolbarClass = ["toolbar", activeView === "apps" ? "grid-mode" : ""].filter(Boolean).join(" ");

  const renderView = () => {
    switch (activeView) {
      case "apps": return <AppGrid onTimerLaunch={() => applyView("timer")} onTasksLaunch={() => applyView("tasks")} onNoteLaunch={() => applyView("note")} onLinksLaunch={() => applyView("links")} onReminderLaunch={() => applyView("reminders")} onTagsLaunch={() => applyView("tags")} />;
      case "timer": return <Placeholder title="Timer" onBack={() => applyView("apps")} />;
      case "tasks": return <Placeholder title="Tasks" onBack={() => applyView("apps")} />;
      case "note": return <NotesView notes={notes} activeNoteId={activeNoteId} onOpenNote={openNote} onShowList={showNoteList} onAddNote={addNote} onDeleteNote={deleteNote} onUpdateNote={updateNoteText} onBack={() => applyView("apps")} />;
      case "links": return <Placeholder title="Links" onBack={() => applyView("apps")} />;
      case "tags": return <Placeholder title="Tags" onBack={() => applyView("apps")} />;
      case "reminders": return <Placeholder title="Reminders" onBack={() => applyView("apps")} />;
      case "pill": return <div className="pill-view"><button className="tool-btn" onClick={() => applyView("apps")} aria-label="Apps" title="Apps">{appsIcon}</button></div>;
      default: return null;
    }
  };

  return <div className={toolbarClass} id="toolbar">{renderView()}</div>;
}