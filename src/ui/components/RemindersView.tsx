import React, { useState, useRef, useEffect } from "react";
interface Reminder { id: string; title: string; durationMin: number; dueAt: number; }
interface Props { reminders: Reminder[]; onAddReminder: (title: string, durationMin: number) => void; onBack: () => void; }
export default function RemindersView({ reminders, onAddReminder, onBack }: Props) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("10");
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (titleRef.current) titleRef.current.focus(); }, []);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); const mins = Number(duration); if (![5, 10, 15].includes(mins)) return; onAddReminder(title, mins); setTitle(""); setDuration("10"); };
  return (
    <div className="reminders-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Reminders</span>
      </div>
      <form className="reminder-add-row" onSubmit={handleSubmit}>
        <input type="text" className="reminder-add-input" ref={titleRef} placeholder="Reminder title (e.g. Coffee break)" maxLength={100} required value={title} onChange={e => setTitle(e.target.value)} />
        <div className="reminder-duration-row" role="radiogroup" aria-label="Duration">
          {["5", "10", "15"].map(d => (
            <label key={d} className="duration-chip"><input type="radio" name="reminderDuration" value={d} checked={duration === d} onChange={() => setDuration(d)} /><span>{d} min</span></label>
          ))}
        </div>
        <button type="submit" className="reminder-add-confirm" aria-label="Confirm" title="Start reminder">OK</button>
      </form>
      <div className="reminder-list">
        {reminders.map(r => (
          <div key={r.id} className="reminder-row">
            <span className="reminder-title">{r.title}</span>
            <span className="reminder-meta">{r.durationMin} min</span>
          </div>
        ))}
      </div>
    </div>
  );
}