import { useEffect, useRef, useState } from 'react';
import type { UseStateTimelineReturn } from '../../hooks/useStateTimeline';
import styles from './index.module.css';
interface StateTimelineDevToolsProps<T> {
  timeline: UseStateTimelineReturn<T>['timeline'];
  currentIndex?: UseStateTimelineReturn<T>['currentIndex'];
  goTo?: UseStateTimelineReturn<T>['goTo'];
}

const StateTimelineDevTools = <T,>(props: StateTimelineDevToolsProps<T>) => {
  const { timeline, currentIndex, goTo } = props;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleCopyValue(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: T) {
    e.stopPropagation();

    navigator.clipboard.writeText(JSON.stringify(value));
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Node;
    if (
      open &&
      panelRef.current &&
      !panelRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (open && panelRef.current) {
      const el = panelRef.current.querySelector('#list')!;
      el.scrollTop = el.scrollHeight;
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((p) => !p)}
        className={styles.toggleButton}
        ref={buttonRef}
      >
        React State Timeline
      </button>

      {open && (
        <div
          className={styles.panel}
          ref={panelRef}
        >
          <div className={styles.header}>
            <span className={styles.title}>useStateTimeline DevTools</span>
            <div className={styles.status}>
              <span className={styles.statusItem}>states length: {timeline.length}</span>
              {currentIndex !== undefined && (
                <span className={styles.statusItem}>current index: {currentIndex}</span>
              )}
            </div>
          </div>

          <div
            id="list"
            className={styles.list}
          >
            {timeline.map((item, i) => (
              <button
                key={item.date.getTime()}
                onClick={() => goTo?.(i)}
                className={`${styles.item} ${
                  i === currentIndex ? styles.active : ''
                } ${typeof goTo !== 'function' ? styles.disabled : ''}`}
              >
                <pre className={styles.value}>
                  <code>{JSON.stringify(item.value, null, 2)}</code>
                  <button
                    className={styles.copyButton}
                    onClick={(e) => handleCopyValue(e, item.value)}
                  >
                    Copy
                  </button>
                </pre>
                <div className={`${styles.time} ${i === currentIndex ? styles.activeTime : ''}`}>
                  {item.date.toLocaleTimeString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StateTimelineDevTools;
