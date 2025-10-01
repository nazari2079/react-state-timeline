# React State Timeline

[![NPM Version](https://img.shields.io/npm/v/react-state-timeline.svg)](https://www.npmjs.com/package/react-state-timeline)
[![License](https://img.shields.io/github/license/nazari2079/react-state-timeline)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-website-blue)](https://nazari2079.github.io/react-state-timeline/)

React hook that tracks your state changes over time, with **undo/redo** and **timeline navigation**.

---

## ✨ Features

- 🔄 Undo / Redo support
- 🕓 Timeline of state changes
- 🎯 Go to any state by index
- ⚡ Simple API with a single hook
- 📦 Lightweight & dependency-free

---

## 📦 Installation

```bash
# with npm
npm install react-state-timeline

# with yarn
yarn add react-state-timeline

# with pnpm
pnpm add react-state-timeline
```

---

## 🚀 Usage

```tsx
import { useStateTimeline } from 'react-state-timeline';

function Counter() {
  const { state, setState, undo, redo, canUndo, canRedo } = useStateTimeline(0);

  return (
    <div>
      <p>Count: {state}</p>
      <button onClick={() => setState(state + 1)}>+</button>
      <button onClick={() => setState(state - 1)}>-</button>
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
    </div>
  );
}
```

---

## 📖 Documentation

Full documentation is available here:  
👉 [react-state-timeline docs](https://nazari2079.github.io/react-state-timeline/)

---

## 🔧 API

The hook returns:

| Name           | Type                      | Description                                        |
| -------------- | ------------------------- | -------------------------------------------------- |
| `state`        | `T`                       | Current state                                      |
| `setState`     | `(v: T) => void`          | Updates the state and pushes to history            |
| `timeline`     | `T[]`                     | Array of all states                                |
| `currentIndex` | `number`                  | Current timeline index                             |
| `goTo`         | `(index: number) => void` | Jump to a specific state in timeline               |
| `undo`         | `() => void`              | Go back one state                                  |
| `redo`         | `() => void`              | Go forward one state                               |
| `canUndo`      | `boolean`                 | Whether `undo` is available                        |
| `canRedo`      | `boolean`                 | Whether `redo` is available                        |
| `reset`        | `() => void`              | Reset to the initial state and clear the timeline. |

---

## 🛠 Development

```bash
# clone repo
git clone https://github.com/nazari2079/react-state-timeline.git
cd react-state-timeline

# install dependencies
npm install

# run docusaurus
npm run start:docs

# run tests
npm test
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check [issues page](https://github.com/nazari2079/react-state-timeline/issues).

---

## 📜 License

[MIT](./LICENSE) © 2025 [Mohammad Nazari](https://github.com/nazari2079)
