import React from "react";
interface Props { timerSeconds: number; timerRunning: boolean; onToggle: () => void; onReset: () => void; onBack: () => void; }
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return m + ":" + s;
}
export default function TimerView({ timerSeconds, timerRunning, onToggle, onReset, onBack }: Props) {
  const playIcon = !timerRunning;
  return (
    <div className="timer-view">
      <div className="app-header">
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5L3.5 7L8.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span className="app-header-title">Timer</span>
      </div>
      <div className="timer-display">{formatTime(timerSeconds)}</div>
      <div className="timer-controls">
        <button className="timer-btn" onClick={onToggle} aria-label={timerRunning ? "Pause" : "Play"} title={timerRunning ? "Pause" : "Play"}>
          {playIcon && <svg className="icon-play" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M4 2.5L11.5 7L4 11.5V2.5Z" fill="currentColor"/></svg>}
          {!playIcon && <svg className="icon-pause" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="2.5" width="2.6" height="9" rx="0.8" fill="currentColor"/><rect x="7.9" y="2.5" width="2.6" height="9" rx="0.8" fill="currentColor"/></svg>}
        </button>
        <button className="timer-btn" onClick={onReset} aria-label="Reset" title="Reset"><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 7A4.5 4.5 0 1 1 9.8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/><path d="M9.5 1.5L9.8 3.5L7.8 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></button>
      </div>
    </div>
  );
}