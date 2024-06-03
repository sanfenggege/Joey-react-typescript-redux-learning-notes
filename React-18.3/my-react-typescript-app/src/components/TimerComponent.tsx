import React, { useEffect, useState } from 'react';
import useCustomTimer2 from '../hooks/CustomTime2';
// import useCustomTimer from '../hooks/CustomTimer';

interface TimerComponentProps {
  initialTime: number;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ initialTime }) => {
  const { timerValue, timerStatus, startTimer, pauseTimer, stopTimer, resetTimer } = useCustomTimer2(initialTime);
  const [pausedValue, setPausedValue] = useState<'重新开始' | '暂停'>('暂停');

  useEffect(() => {
    resetTimer(initialTime);
  }, [initialTime, resetTimer]);

  const handleStart = () => {
    startTimer();
    setPausedValue('暂停');
  }

  const handlePause = () => {
    if (pausedValue === '暂停') {
      setPausedValue('重新开始');
      pauseTimer();
    } else {
      setPausedValue('暂停');
      startTimer();
    }
  }

  const handleStop = () => {
    stopTimer();
    setPausedValue('暂停');
  }

  return (
    <div>
      <p>倒计时: {timerValue}</p>
      <p>状态: {timerStatus}</p>
      <button onClick={handleStart} disabled={(timerStatus === 'running') || pausedValue === '重新开始'}>开始</button>
      <button onClick={handlePause} disabled={timerStatus === 'stopped'}>{pausedValue}</button>
      <button onClick={handleStop} disabled={timerStatus === 'stopped'}>停止</button>
    </div>
  );
}

export default TimerComponent;