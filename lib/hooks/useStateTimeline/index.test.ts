import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useStateTimeline from './index';

describe('useStateTimeline', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => useStateTimeline(0));
    expect(result.current.state).toBe(0);
    expect(result.current.timeline.length).toBe(1);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.timeline[0].value).toBe(0);
    expect(result.current.timeline[0].createdAt).toBeInstanceOf(Date);
  });

  it('sets state and updates timeline', () => {
    const { result } = renderHook(() => useStateTimeline(0));

    act(() => result.current.setState(1));
    act(() => result.current.setState(2));

    expect(result.current.state).toBe(2);
    expect(result.current.currentIndex).toBe(2);
    expect(result.current.timeline.map((t) => t.value)).toEqual([0, 1, 2]);
    result.current.timeline.forEach((entry) => {
      expect(entry.createdAt).toBeInstanceOf(Date);
    });
  });

  it('undo and redo update state and index correctly', () => {
    const { result } = renderHook(() => useStateTimeline(0));

    act(() => result.current.setState(1));
    act(() => result.current.setState(2));

    // Undo
    act(() => result.current.undo());
    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);

    act(() => result.current.undo());
    expect(result.current.state).toBe(0);
    expect(result.current.currentIndex).toBe(0);

    // Redo
    act(() => result.current.redo());
    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);

    act(() => result.current.redo());
    expect(result.current.state).toBe(2);
    expect(result.current.currentIndex).toBe(2);
  });

  it('goTo changes state correctly', () => {
    const { result } = renderHook(() => useStateTimeline(0));

    act(() => result.current.setState(1));
    act(() => result.current.setState(2));

    act(() => result.current.goTo(1));
    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);

    act(() => result.current.goTo(0));
    expect(result.current.state).toBe(0);
    expect(result.current.currentIndex).toBe(0);
  });

  it('reset restores initial state and timeline', () => {
    const { result } = renderHook(() => useStateTimeline(0));

    act(() => result.current.setState(1));
    act(() => result.current.setState(2));
    act(() => result.current.reset());

    expect(result.current.state).toBe(0);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.timeline.length).toBe(1);
    expect(result.current.timeline[0].value).toBe(0);
  });

  it('handles functional setState', () => {
    const { result } = renderHook(() => useStateTimeline(0));

    act(() => result.current.setState((prev) => prev + 5));
    expect(result.current.state).toBe(5);
    expect(result.current.timeline[result.current.currentIndex].value).toBe(5);
  });

  describe('errors', () => {
    it('throws error on undo when cannot undo', () => {
      const { result } = renderHook(() => useStateTimeline(0));
      expect(() => act(() => result.current.undo())).toThrow('No more states to undo');
    });

    it('throws error on redo when cannot redo', () => {
      const { result } = renderHook(() => useStateTimeline(0));
      expect(() => act(() => result.current.redo())).toThrow('No more states to redo');
    });

    it('throws error when goTo index is out of bounds', () => {
      const { result } = renderHook(() => useStateTimeline(0));
      expect(() => act(() => result.current.goTo(-1))).toThrow('Index out of bounds');
      expect(() => act(() => result.current.goTo(10))).toThrow('Index out of bounds');
    });
  });
});
