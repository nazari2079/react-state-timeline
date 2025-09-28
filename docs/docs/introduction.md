---
id: introduction
title: Introduction
sidebar_position: 1
---

# React State Timeline

**React State Timeline** is a lightweight React hook that helps you **track your state changes over time**.  
It provides an easy way to implement **undo, redo, and timeline navigation** for any state in your app.

---

## Features

- 📜 Keeps a full timeline of your state changes
- ⏪ Undo & ⏩ Redo functionality
- 🎯 Jump to any state
- 🔄 Reset back to the initial state
- ⏱️ Each state is timestamped with creation time
- ⚡ Fully typed with TypeScript

---

## Installation

```bash
npm install react-state-timeline

# or with yarn
yarn add react-state-timeline

# or with pnpm
pnpm add react-state-timeline
```

## Peer Dependencies

The only required peer dependency is `react`. Please make sure React 16.8 or newer is installed in your project.

```json
"peerDependencies": {
  "react": ">=16.8",
}
```

## Usage

After installing the package, you can use it like this:

```tsx
import React from 'react';
import useStateTimeline from 'react-state-timeline';

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
