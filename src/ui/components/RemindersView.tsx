import React, { useState, useRef, useEffect } from "react";
interface Reminder { id: string; title: string; durationMin: number; dueAt: number; }
interface Props { reminders: Reminder[]; now: number; onAddReminder: (title: string, durationMin: number) => void; onCancelReminder: (id: string) => void; onBack: () => void; }
function formatRemain(secondsLeft: number): string { if (secondsLeft < 0) secondsLeft = 0; const m = Math.floor(secondsLeft / 60).toString().padStart(2, "0"); const s = (secondsLeft % 60).toString().padStart(2, "0"); return m + ":" + s; }
export default function RemindersView({ reminders, now, onAddReminder, onCancelReminder, onBack }: Props) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("10");
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (titleRef.current) titleRef.current.focus(); }, []);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); const mins = Number(duration); if (![5, 10, 15].includes(mins)) return; onAddReminder(title, mins); setTitle(""); setDuration("10"); };
  return (
    <div className="reminders-view">
      <div className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span className="app-header-title">Reminders</span>
        <button className="add-btn" onClick={() => { setTitle(""); setDuration("10"); }} aria-label="Add reminder" title="Add"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
      </div>
      <form className="reminder-add-row" onSubmit={handleSubmit}>
        <input type="text" className="reminder-add-input" ref={titleRef} placeholder="Reminder title (e.g. Coffee break)" maxLength={100} required value={title} onChange={e => setTitle(e.target.value)} />
        <div className="reminder-duration-row" role="radiogroup" aria-label="Duration">
          {["5", "10", "15"].map(d => (
            <label key={d} className="duration-chip"><input type="radio" name="reminderDuration" value={d} checked={duration === d} onChange={() => setDuration(d)} /><span>{d} min</span></label>
          ))}
        </div>
        <button type="submit" className="reminder-add-confirm" aria-label="Confirm" title="Start reminder"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </form>
      <div className="reminder-list">
        {reminders.map(r => {
          const remain = Math.max(0, Math.ceil((r.dueAt - now) / 1000));
          const total = r.durationMin * 60;
          const progress = total > 0 ? Math.max(0, Math.min(1, 1 - remain / total)) : 0;
          return (
            <div key={r.id} className="reminder-row">
              <button className="reminder-link-btn" title={"Reminder: " + r.title}>
                <div className="reminder-left-col">
                  <span className="reminder-icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.5 2 4 3.8 4 6.2V8.7L2.8 10.8H13.2L12 8.7V6.2C12 3.8 10.5 2 8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M6.5 13C6.8 13.6 7.4 14 8 14C8.6 14 9.2 13.6 9.5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></span>
                  <div className="reminder-texts"><span className="reminder-title">{r.title}</span><span className="reminder-meta">{r.durationMin} min</span></div>
                </div>
                <span className="reminder-countdown">{formatRemain(remain)}</span>
              </button>
              <div className="reminder-bar"><div className="reminder-bar-fill" style={{width: progress * 100 + "%"}} /></div>
              <button className="reminder-delete" onClick={() => onCancelReminder(r.id)} aria-label={"Cancel reminder " + r.title} title="Cancel"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}