import React, { useState } from 'react';
import TimerComponent from './TimerComponent';

const TimeInput = () => {
  const [time, setTime] = useState('1000');
  const [inputError, setInputError] = useState('');
  const [timeAsNumber, setTimeAsNumber] = useState(Number(time));

  const handleChange = (inputValue: string) => {
    setTime(inputValue);
    const newTimeAsNumber = Number(inputValue);
    if (isNaN(newTimeAsNumber) || newTimeAsNumber <= 0) {
      setInputError('请输入大于0 的数字');
      setTimeAsNumber(0);
    } else {
      setInputError('');
      setTimeAsNumber(newTimeAsNumber);
    }
  }

  return (
    <>
      <label>
        请输入定时器初始值（大于0）：
        <input
          value={time}
          onChange={(e) => handleChange(e.target.value)}
        />
      </label>
      {timeAsNumber > 0 && <p>您输入的值是： {timeAsNumber}</p>}
      {inputError && <p>{inputError}</p>}
      <TimerComponent initialTime={timeAsNumber} />
    </>
  );
}

export default TimeInput;