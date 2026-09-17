import React from "react";
interface Props { timerSeconds: number; timerRunning: boolean; onToggle: () => void; onReset: () => void; onBack: () => void; }
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return m + ":" + s;
}
export default function TimerView({ timerSeconds, timerRunning, onToggle, onReset, onBack }: Props) {
  return (
    <div className="timer-view">
      <div>
        <button className="back-btn" onClick={onBack} aria-label="Back" title="Back">Back</button>
        <span>Timer</span>
      </div>
      <div className="timer-display">{formatTime(timerSeconds)}</div>
      <div className="timer-controls">
        <button className="timer-btn" onClick={onToggle} aria-label={timerRunning ? "Pause" : "Play"} title={timerRunning ? "Pause" : "Play"}>{timerRunning ? "Pause" : "Play"}</button>
        <button className="timer-btn" onClick={onReset} aria-label="Reset" title="Reset">Reset</button>
      </div>
    </div>
  );
}