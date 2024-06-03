import { useState, useRef, useCallback, useEffect } from "react";

const useCustomTimer2 = (initialTime: number) => {
  const [timerValue, setTimerValue] = useState(initialTime);
  const [timerStatus, setTimerStatus] = useState<'running' | 'paused' | 'stopped'>('stopped');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    if ((timerStatus === 'paused' || timerStatus === 'stopped') && (timerValue > 0)) {
      setTimerStatus('running');
      timerRef.current = setTimeout(() => {
        if (timerValue > 1) {
          setTimerValue(time => time - 1);
          startTimer();
        } else {
          setTimerValue(0);
          setTimerStatus('stopped');
        }
      }, 1000);
    }
  }, [timerStatus, timerValue]);

  const pauseTimer = useCallback(() => {
    if (timerStatus === 'running') {
      setTimerStatus('paused');
      clearTimeout(timerRef.current!);
    }
  }, [timerStatus]);

  const stopTimer = useCallback(() => {
    setTimerStatus('stopped');
    clearTimeout(timerRef.current!);
    setTimerValue(initialTime);
  }, [initialTime]);

  const resetTimer = useCallback((initialTime: number) => {
    setTimerValue(initialTime);
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  return {
    timerValue,
    timerStatus,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer
  }
}

export default useCustomTimer2;