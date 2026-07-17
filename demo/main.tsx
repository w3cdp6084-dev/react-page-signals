import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { usePageSignals } from "../src";
import "./styles.css";

const sections = [
  {
    number: "01",
    signal: "--scroll-progress",
    title: "Reading progress",
    copy: "Scale a progress bar from 0 to 1 as the reader moves down the page.",
  },
  {
    number: "02",
    signal: "data-scroll-direction",
    title: "Smart headers",
    copy: "Hide navigation while scrolling down and reveal it while scrolling up.",
  },
  {
    number: "03",
    signal: "data-is-scrolled",
    title: "Past-intro styles",
    copy: "Change a header, button, or layout after the reader leaves the intro.",
  },
];

function App() {
  usePageSignals({ scrolledThreshold: 80 });

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className="header">
        <a href="#top" className="brand">
          react-page-signals
        </a>
        <div className="header-end">
          <div className="signals" aria-label="Live page signals">
            <span className="direction direction-none">still</span>
            <span className="direction direction-up">scrolling up</span>
            <span className="direction direction-down">scrolling down</span>
            <span className="scrolled-state">past intro</span>
          </div>
          <a
            className="github-link"
            href="https://github.com/w3cdp6084-dev/react-page-signals"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Progress bars · smart headers · scrolled states</p>
          <h1>Scroll state.<br />Ready for CSS.</h1>
          <p className="intro">
            Build a reading-progress bar, a hide-on-scroll header, and
            past-intro styles with one tiny React hook.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#how-it-works">
              See the three examples <span aria-hidden="true">↓</span>
            </a>
            <code>usePageSignals();</code>
          </div>
        </section>

        <section className="steps" id="how-it-works">
          {sections.map((section) => (
            <article className="step" key={section.number}>
              <span>{section.number}</span>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
              <code>{section.signal}</code>
            </article>
          ))}
        </section>

        <section className="code-section">
          <p className="eyebrow">The whole idea</p>
          <pre>
            <code>{`usePageSignals();

.progress {
  transform: scaleX(var(--scroll-progress));
}

[data-scroll-direction="down"] .header {
  transform: translateY(-100%);
}`}</code>
          </pre>
        </section>
      </main>

      <footer>
        <span>MIT licensed</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
