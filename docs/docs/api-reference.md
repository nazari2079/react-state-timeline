---
id: api-reference
title: API Reference
sidebar_position: 3
---

# API Reference

The library exports a single hook:

```ts
useStateTimeline<T>(initialState: T)
```

---

## Returned values

| Name           | Type                                      | Description                                        |
| -------------- | ----------------------------------------- | -------------------------------------------------- |
| `state`        | `T`                                       | Current state value.                               |
| `setState`     | `(newState: T \| (prev: T) => T) => void` | Updates the state and records it in the timeline.  |
| `timeline`     | `{ value: T; createdAt: Date }[]`         | Full timeline of states with timestamps.           |
| `currentIndex` | `number`                                  | The current position in the timeline.              |
| `goTo`         | `(index: number) => void`                 | Jump to a specific index in the timeline.          |
| `undo`         | `() => void`                              | Move one step backward in the timeline.            |
| `redo`         | `() => void`                              | Move one step forward in the timeline.             |
| `canUndo`      | `boolean`                                 | Whether an undo is possible.                       |
| `canRedo`      | `boolean`                                 | Whether a redo is possible.                        |
| `reset`        | `() => void`                              | Reset to the initial state and clear the timeline. |

---
