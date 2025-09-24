import { useRef, useState } from 'react';

interface Timeline<T> {
  value: T;
  createdAt: Date;
}

const useStateTimeline = <T>(initialState: T) => {
  const [state, setInnerState] = useState(initialState);
  const timelineRef = useRef<Timeline<T>[]>([{ value: initialState, createdAt: new Date() }]);
  const indexRef = useRef(0);
  const canUndo = indexRef.current > 0;
  const canRedo = indexRef.current < timelineRef.current.length - 1;

  function addToTimeline(value: T) {
    if (indexRef.current < timelineRef.current.length - 1) {
      timelineRef.current = timelineRef.current.slice(0, indexRef.current + 1);
    }
    timelineRef.current.push({ value, createdAt: new Date() });
    indexRef.current = timelineRef.current.length - 1;
  }

  function setState(newState: T | ((prevState: T) => T)) {
    setInnerState((prevState) => {
      const value =
        typeof newState === 'function' ? (newState as (prevState: T) => T)(prevState) : newState;
      addToTimeline(value);
      return value;
    });
  }

  function goTo(index: number) {
    if (index < 0 || index >= timelineRef.current.length) {
      throw new Error('Index out of bounds');
    }
    indexRef.current = index;
    setInnerState(timelineRef.current[index].value);
  }

  function undo() {
    if (!canUndo) {
      throw new Error('No more states to undo');
    }
    goTo(indexRef.current - 1);
  }

  function redo() {
    if (!canRedo) {
      throw new Error('No more states to redo');
    }
    goTo(indexRef.current + 1);
  }

  function reset() {
    timelineRef.current = [{ value: initialState, createdAt: new Date() }];
    indexRef.current = 0;
    setInnerState(initialState);
  }

  return {
    state,
    setState,
    timeline: timelineRef.current,
    currentIndex: indexRef.current,
    goTo,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
  };
};

export default useStateTimeline;
