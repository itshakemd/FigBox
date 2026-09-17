import React, { useState, useRef } from "react";
interface Task { id: string; text: string; done: boolean; }
interface Props { tasks: Task[]; onAddTask: (text: string) => void; onBack: () => void; }
export default function TasksView({ tasks, onAddTask, onBack }: Props) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (inputValue.trim()) { onAddTask(inputValue.trim()); setInputValue(""); } };
  return (
    <div className="tasks-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Tasks</span>
        <button className="add-btn" onClick={() => { setInputValue(""); inputRef.current?.focus(); }} aria-label="Add task" title="Add">Add</button>
      </div>
      <form className="task-add-row" onSubmit={handleSubmit}>
        <input type="text" className="task-add-input" ref={inputRef} placeholder="New task" maxLength={200} value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="submit" className="task-add-confirm" aria-label="Confirm" title="Confirm">OK</button>
      </form>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-row">
            <span className="task-label">{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}