import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import StateTimelineDevTools from './index';
import { useEffect } from 'react';
import useStateTimeline from '../../hooks/useStateTimeline';

const TimelineWrapper = () => {
  const timelineState = useStateTimeline<number>(0);

  useEffect(() => {
    timelineState.setState(1);
    const timeout = setTimeout(() => {
      timelineState.setState(2);
    }, 50);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <StateTimelineDevTools {...timelineState} />;
};

describe('StateTimelineDevTools with useStateTimeline', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    render(<TimelineWrapper />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders toggle button', () => {
    expect(screen.getByTestId('toggleTimelinePanel')).toBeDefined();
  });

  it('opens and closes panel on button click', () => {
    const button = screen.getByTestId('toggleTimelinePanel');

    expect(screen.queryByText('useStateTimeline DevTools')).toBeNull();

    fireEvent.click(button);
    expect(screen.getByText('useStateTimeline DevTools')).toBeDefined();

    fireEvent.click(button);
    expect(screen.queryByText('useStateTimeline DevTools')).toBeNull();
  });

  it('displays timeline items from useStateTimeline', async () => {
    fireEvent.click(screen.getByTestId('toggleTimelinePanel'));

    expect(screen.getByText(JSON.stringify(1, null, 2))).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(JSON.stringify(2, null, 2))).toBeDefined();
    });
  });

  it('copies timeline item value to clipboard', () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    fireEvent.click(screen.getByTestId('toggleTimelinePanel'));

    const copyButtons = screen.getAllByText('Copy');
    expect(copyButtons.length).toBeGreaterThan(0);

    fireEvent.click(copyButtons[0]);
    expect(writeTextMock).toHaveBeenCalled();
  });

  it('closes panel when clicking outside', () => {
    const toggleButton = screen.getByTestId('toggleTimelinePanel');

    fireEvent.click(toggleButton);
    expect(screen.getByText('useStateTimeline DevTools')).toBeDefined();

    fireEvent.click(document);
    expect(screen.queryByText('useStateTimeline DevTools')).toBeNull();
  });

  it('highlights the current index', () => {
    fireEvent.click(screen.getByTestId('toggleTimelinePanel'));

    const items = screen.getAllByTestId('timelineItem');
    expect(items[items.length - 1].className).toContain('active');
  });
});
