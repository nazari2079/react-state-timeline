import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useStateTimeline } from '../../../lib';

import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import StateTimelineDevTools from '../../../lib/components/devTools';

function Demo() {
  const { state, setState, timeline, currentIndex, undo, redo, canUndo, canRedo, goTo, reset } =
    useStateTimeline(0);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Demo</h1>
      <StateTimelineDevTools
        timeline={timeline}
        currentIndex={currentIndex}
        goTo={goTo}
      />

      <p>Current state: {state}</p>
      <div className={styles.exmapleButtonsContainer}>
        <button
          className="button button--primary"
          onClick={() => setState((s) => s + 1)}
        >
          Increment
        </button>
        <button
          className="button button--primary"
          onClick={() => setState((s) => s - 1)}
        >
          Decrement
        </button>
        <button
          className="button button--primary"
          onClick={undo}
          disabled={!canUndo}
        >
          Undo
        </button>
        <button
          className="button button--primary"
          onClick={redo}
          disabled={!canRedo}
        >
          Redo
        </button>
        <button
          className="button button--primary"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Timeline</h2>
        <div className={styles.timelineContainer}>
          {timeline.map((item, index) => (
            <div
              key={item.date.getTime()}
              style={{
                fontWeight: index === currentIndex ? 'bold' : 'normal',
              }}
            >
              {index + 1}. value: {item.value} - time: {item.date.toLocaleTimeString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img
            src={`${useBaseUrl('/img/logo-white.png')}`}
            alt="Logo"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '350px',
              marginBottom: '1rem',
            }}
          />
          <Heading
            as="h1"
            className="hero__title"
            style={{
              color: 'white',
            }}
          >
            {siteConfig.title}
          </Heading>
          <p
            className="hero__subtitle"
            style={{
              color: 'white',
            }}
          >
            {siteConfig.tagline}
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/introduction"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Demo />
      </main>
    </Layout>
  );
}
