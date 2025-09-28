---
id: usage-example
title: Usage Example
sidebar_position: 2
---

After installing the package, you can use it like this:

```tsx
import React from 'react';
import { useStateTimeline } from 'react-state-timeline';

export default function CounterDemo() {
  const { state, setState, timeline, currentIndex, undo, redo, canUndo, canRedo, reset } =
    useStateTimeline(0);

  return (
    <div>
      <p>Current state: {state}</p>

      <button onClick={() => setState((s) => s + 1)}>Increment</button>
      <button onClick={() => setState((s) => s - 1)}>Decrement</button>
      <button
        onClick={undo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
      >
        Redo
      </button>
      <button onClick={reset}>Reset</button>

      <h3>Timeline</h3>
      <ol>
        {timeline.map((item, index) => (
          <li
            key={index}
            style={{ fontWeight: index === currentIndex ? 'bold' : 'normal' }}
          >
            {item.value} ({item.date.toLocaleTimeString()})
          </li>
        ))}
      </ol>
    </div>
  );
}
```
