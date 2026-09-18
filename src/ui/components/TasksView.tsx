import React, { useState, useRef } from "react";
interface Task { id: string; text: string; done: boolean; }
interface Props { tasks: Task[]; onAddTask: (text: string) => void; onToggleTask: (id: string) => void; onDeleteTask: (id: string) => void; onBack: () => void; }
export default function TasksView({ tasks, onAddTask, onToggleTask, onDeleteTask, onBack }: Props) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (inputValue.trim()) { onAddTask(inputValue.trim()); setInputValue(""); } };
  return (
    <div className="tasks-view">
      <div className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span className="app-header-title">Tasks</span>
        <button className="add-btn" onClick={() => { setInputValue(""); inputRef.current?.focus(); }} aria-label="Add task" title="Add"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
      </div>
      <form className="task-add-row" onSubmit={handleSubmit}>
        <input type="text" className="task-add-input" ref={inputRef} placeholder="New task" maxLength={200} value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="submit" className="task-add-confirm" aria-label="Confirm" title="Confirm"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </form>
      <div className="task-list">
        {tasks.length === 0 ? <div className="task-empty">No tasks yet</div> :
          tasks.map(task => (
          <div key={task.id} className="task-row">
            <input type="checkbox" className="task-checkbox" checked={task.done} onChange={() => onToggleTask(task.id)} aria-label={'Mark ' + task.text + ' as done'} />
            <span className={'task-label' + (task.done ? ' done' : '')}>{task.text}</span>
            <button className="task-delete" onClick={() => onDeleteTask(task.id)} aria-label={'Delete ' + task.text} title="Delete"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
          </div>
          ))
        }
      </div>
    </div>
  );
}