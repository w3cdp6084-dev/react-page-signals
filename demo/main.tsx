import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { usePageSignals } from "../src";
import "./styles.css";

const sections = [
  {
    number: "01",
    title: "One hook",
    copy: "Call usePageSignals once near the root of your React app.",
  },
  {
    number: "02",
    title: "No scroll rerenders",
    copy: "The hook writes directly to CSS variables and data attributes.",
  },
  {
    number: "03",
    title: "Style anything",
    copy: "Build progress bars, directional headers, and scrolled states with CSS.",
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
        <div className="signals" aria-label="Live page signals">
          <span className="direction direction-none">still</span>
          <span className="direction direction-up">up</span>
          <span className="direction direction-down">down</span>
          <span className="scrolled-state">past intro</span>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">A tiny React hook</p>
          <h1>Scroll signals.<br />CSS reactions.</h1>
          <p className="intro">
            A CSS-first way to respond to page scroll without rerendering React
            on every frame.
          </p>
          <a className="scroll-cue" href="#how-it-works">
            Scroll to test it <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="steps" id="how-it-works">
          {sections.map((section) => (
            <article className="step" key={section.number}>
              <span>{section.number}</span>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
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
