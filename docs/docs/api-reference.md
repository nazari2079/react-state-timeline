---
id: api-reference
title: API Reference
sidebar_position: 3
---

# API Reference

The library exports the following:

- `useStateTimeline` — the main hook to manage state history
- `StateTimelineDevTools` — an optional UI panel to inspect the timeline visually

---

## useStateTimeline hook

```ts
useStateTimeline<T>(initialState: T)
```

**Description**

Creates a state with full timeline tracking — including undo, redo, and direct navigation between versions.

**Returns**

| Name           | Type                                      | Description                                        |
| -------------- | ----------------------------------------- | -------------------------------------------------- |
| `state`        | `T`                                       | Current state value.                               |
| `setState`     | `(newState: T \| (prev: T) => T) => void` | Updates the state and records it in the timeline.  |
| `timeline`     | `{ value: T; date: Date }[]`              | Full timeline of states with timestamps.           |
| `currentIndex` | `number`                                  | The current position in the timeline.              |
| `goTo`         | `(index: number) => void`                 | Jump to a specific index in the timeline.          |
| `undo`         | `() => void`                              | Move one step backward in the timeline.            |
| `redo`         | `() => void`                              | Move one step forward in the timeline.             |
| `canUndo`      | `boolean`                                 | Whether an undo is possible.                       |
| `canRedo`      | `boolean`                                 | Whether a redo is possible.                        |
| `reset`        | `() => void`                              | Reset to the initial state and clear the timeline. |

---

## StateTimelineDevTools component

```tsx
<StateTimelineDevTools>
```

**Description**

A floating **debug panel** that displays and controls the timeline recorded by `useStateTimeline`.  
It can be toggled open or closed and allows you to inspect, scroll through, and jump to previous states directly from the UI.

**Props**

| Name           | Type                                        | Required | Description                                                               |
| -------------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `timeline`     | `UseStateTimelineReturn<T>['timeline']`     | ✅ Yes   | The timeline array returned from `useStateTimeline`.                      |
| `currentIndex` | `UseStateTimelineReturn<T>['currentIndex']` | ❌ No    | The current index of the state within the timeline.                       |
| `goTo`         | `UseStateTimelineReturn<T>['goTo']`         | ❌ No    | Function to navigate to a specific state when a timeline item is clicked. |

---
