import { useState, useCallback, useRef, useEffect } from "react";

export function useTimer() {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerIntervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (timerRunning) return;
    setTimerRunning(true);
    const id = window.setInterval(() => setTimerSeconds(s => s + 1), 1000);
    timerIntervalRef.current = id;
  }, [timerRunning]);

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
    if (timerIntervalRef.current !== null) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
  }, []);

  const resetTimer = useCallback(() => { pauseTimer(); setTimerSeconds(0); }, [pauseTimer]);

  useEffect(() => { return () => { if (timerIntervalRef.current !== null) clearInterval(timerIntervalRef.current); }; }, []);

  return { timerSeconds, timerRunning, startTimer, pauseTimer, resetTimer, setTimerSeconds, setTimerRunning };
}