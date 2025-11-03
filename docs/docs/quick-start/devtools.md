---
id: devtools
title: DevTools Panel
sidebar_position: 3
---

The **React State Timeline DevTools** is an optional debugging panel that helps you **inspect and navigate** your state history directly inside your app — no setup or extensions required.

It’s designed to work seamlessly with the `useStateTimeline` hook.

---

### Example

```tsx
import React from 'react';
import { useStateTimeline, StateTimelineDevTools } from 'react-state-timeline';

export default function CounterDemo() {
  const { state, setState, timeline, currentIndex, goTo } = useStateTimeline(0);

  return (
    <div>
      <p>Current state: {state}</p>
      <button onClick={() => setState((s) => s + 1)}>Increment</button>
      <button onClick={() => setState((s) => s - 1)}>Decrement</button>

      {/* Add the DevTools panel */}
      <StateTimelineDevTools
        timeline={timeline}
        currentIndex={currentIndex}
        goTo={goTo}
      />
    </div>
  );
}
```
