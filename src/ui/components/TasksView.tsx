import React from "react";
interface Task { id: string; text: string; done: boolean; }
interface Props { tasks: Task[]; onBack: () => void; }
export default function TasksView({ tasks, onBack }: Props) {
  return (
    <div className="tasks-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Tasks</span>
      </div>
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