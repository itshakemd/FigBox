import React from "react";
import useApp from "./useApp";
import AppGrid from "./components/AppGrid";
import TimerView from "./components/TimerView";
import NotesView from "./components/NotesView";
import TasksView from "./components/TasksView";
import LinksView from "./components/LinksView";
import TagsView from "./components/TagsView";
import RemindersView from "./components/RemindersView";

const appsIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
);

export default function App() {
  const { activeView, bookmarks, notes, activeNoteId, tasks, tags, reminders, reminderNow, timerSeconds, timerRunning, addBookmark, deleteBookmark, addNote, deleteNote, openNote, showNoteList, updateNoteText, addTask, toggleTask, deleteTask, addTag, deleteTag, addReminder, cancelReminder, applyView, startTimer, pauseTimer, resetTimer, setTimerSeconds, setTimerRunning, ensureTickLoopIfAny } = useApp();

  const toolbarClass = ["toolbar", activeView === "apps" ? "grid-mode" : ""].filter(Boolean).join(" ");

  const renderView = () => {
    switch (activeView) {
      case "apps": return <AppGrid onTimerLaunch={() => { setTimerSeconds(0); setTimerRunning(false); applyView("timer"); }} onTasksLaunch={() => applyView("tasks")} onNoteLaunch={() => applyView("note")} onLinksLaunch={() => applyView("links")} onReminderLaunch={() => { ensureTickLoopIfAny(); applyView("reminders"); }} onTagsLaunch={() => applyView("tags")} onTimerActive={timerRunning} timerSeconds={timerSeconds} />;
      case "timer": return <TimerView timerSeconds={timerSeconds} timerRunning={timerRunning} onToggle={() => { if (timerRunning) pauseTimer(); else startTimer(); }} onReset={resetTimer} onBack={() => applyView("apps")} />;
      case "tasks": return <TasksView tasks={tasks} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} onBack={() => applyView("apps")} />;
      case "note": return <NotesView notes={notes} activeNoteId={activeNoteId} onOpenNote={openNote} onShowList={showNoteList} onAddNote={addNote} onDeleteNote={deleteNote} onUpdateNote={updateNoteText} onBack={() => applyView("apps")} />;
      case "links": return <LinksView bookmarks={bookmarks} onAddBookmark={addBookmark} onDeleteBookmark={deleteBookmark} onBack={() => applyView("apps")} />;
      case "tags": return <TagsView tags={tags} onAddTag={addTag} onDeleteTag={deleteTag} onBack={() => applyView("apps")} />;
      case "reminders": return <RemindersView reminders={reminders} now={reminderNow} onAddReminder={addReminder} onCancelReminder={cancelReminder} onBack={() => applyView("apps")} />;
      case "pill": return <div className="pill-view"><button className="tool-btn" onClick={() => applyView("apps")} aria-label="Apps" title="Apps">{appsIcon}</button></div>;
      default: return null;
    }
  };

  return <div className={toolbarClass} id="toolbar">{renderView()}</div>;
}