import { useRef, useEffect, useState, useCallback } from 'react';

// 自定义定时器Hook  
const useCustomTimer = (initialValue: number) => {
  // 存储当前的倒计时值  
  const [timerValue, setTimerValue] = useState(initialValue);

  // 存储定时器的引用  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 控制定时器的状态：开始、暂停、停止  
  const [timerStatus, setTimerStatus] = useState<'running' | 'paused' | 'stopped'>('stopped');

  // 启动定时器  
  const startTimer = useCallback(() => {
    if ((timerStatus === 'stopped' || timerStatus === 'paused') && timerValue > 0) {
      setTimerStatus('running');
      timerRef.current = setTimeout(() => {
        if (timerValue > 1) {
          setTimerValue(prev => prev - 1);
          startTimer(); // 递归调用以确保定时器持续运行  
        } else {
          setTimerValue(0);
          setTimerStatus('stopped'); // 倒计时结束，停止定时器  
        }
      }, 1000); // 假设每秒钟更新一次  
    }
  }, [timerStatus, timerValue]);

  // 暂停定时器  
  const pauseTimer = useCallback(() => {
    if (timerStatus === 'running') {
      clearTimeout(timerRef.current!); // 清除定时器
      setTimerStatus('paused');
    }
  }, [timerStatus]);

  // 停止并重置定时器  
  const stopTimer = useCallback(() => {
    clearTimeout(timerRef.current!); // 清除定时器    
    setTimerValue(initialValue); // 重置倒计时值  
    setTimerStatus('stopped'); // 设置状态为停止  
  }, [initialValue]);

  const resetTimer = useCallback((initialTime: number) => {
    setTimerValue(initialValue); // 重置初始值
  }, [initialValue]);

  // 清理函数，用于组件卸载时清除定时器  
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return {
    timerValue,
    timerStatus,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
  };
}

export default useCustomTimer;

// Note:
// 在这个hook中，我们使用了useState来管理当前的倒计时值（timerValue）和定时器的状态（timerStatus）。
// 我们还使用了useRef来存储定时器的引用，以便在需要时能够清除它。
// 我们还提供了几个函数来控制定时器的行为：startTimer用于启动定时器，pauseTimer用于暂停定时器，stopTimer用于停止并重置定时器。
// 最后，我们还在一个useEffect钩子中添加了清理函数，以确保在组件卸载时能够清除定时器。

// 为什么  clearTimeout(timerRef.current!) 要添加！？
// 在 TypeScript 中，当你有一个可能是 null 或 undefined 的值时，并且你确信在当前的上下文中这个值不会是 null 或 undefined，你可以使用非空断言操作符 ! 来告诉 TypeScript 编译器：“我确定这个值不是 null 或 undefined，所以请让我继续。”
// 在 useCustomTimer hook 的上下文中，timerRef.current 被初始化为 null，但之后它可能会被设置为一个 setTimeout 返回的 ID。当你调用 pauseTimer 或 stopTimer 时，你期望 timerRef.current 包含一个有效的定时器 ID，因此你可以安全地清除它。但是，由于 TypeScript 无法保证 timerRef.current 在这些函数调用时一定不是 null，它会抛出一个错误，除非你明确地告诉它这个值不是 null。
// 因此，timerRef.current! 中的 ! 是一个非空断言，它告诉 TypeScript 编译器：“我确定 timerRef.current 在这里不是 null。” 这允许你调用 clearTimeout 而不会收到类型错误。
// 然而，你应该总是小心使用非空断言，因为它们可能会隐藏潜在的错误。在这个例子中，由于你对 timerRef 的使用是合理的，并且你正确地设置了它的值，所以使用非空断言是安全的。但是，在其他情况下，过度依赖非空断言可能会导致难以调试的错误。
