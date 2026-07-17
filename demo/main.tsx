import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { usePageSignals } from "../src";
import "./styles.css";

const behaviors = [
  {
    number: "01",
    title: "The bar fills",
    copy: "The line at the very top follows your reading progress.",
    signal: "--scroll-progress",
  },
  {
    number: "02",
    title: "The header reacts",
    copy: "It gets out of the way going down and returns going up.",
    signal: "data-scroll-direction",
  },
  {
    number: "03",
    title: "The mode changes",
    copy: "After this intro, the header switches into reading mode.",
    signal: "data-is-scrolled",
  },
] as const;

function LiveSignals() {
  return (
    <aside className="live-signals" aria-label="Live page signals">
      <div className="live-heading">
        <span className="live-dot" aria-hidden="true" />
        Live signals
      </div>
      <dl>
        <div>
          <dt>Direction</dt>
          <dd>
            <span className="direction direction-none">Still</span>
            <span className="direction direction-up">↑ Up</span>
            <span className="direction direction-down">↓ Down</span>
          </dd>
        </div>
        <div>
          <dt>Page mode</dt>
          <dd>
            <span className="mode mode-intro">Intro</span>
            <span className="mode mode-reading">Reading</span>
          </dd>
        </div>
      </dl>
      <div className="mini-progress" aria-hidden="true">
        <span />
      </div>
    </aside>
  );
}

function App() {
  usePageSignals({ scrolledThreshold: 520 });

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span />
      </div>

      <header className="site-header">
        <a href="#top" className="brand">
          react-page-signals
        </a>
        <div className="header-mode" aria-hidden="true">
          <span className="header-mode-intro">Live demo</span>
          <span className="header-mode-reading">Reading mode</span>
        </div>
        <a
          className="github-link"
          href="https://github.com/w3cdp6084-dev/react-page-signals"
        >
          Source ↗
        </a>
      </header>

      <LiveSignals />

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <p className="demo-label">
              <span aria-hidden="true">●</span> This page is the demo
            </p>
            <h1>
              Scroll down.
              <br />
              Then scroll up.
            </h1>
            <div className="hero-bottom">
              <p>
                Watch the top bar, the header,
                <br />
                and the LIVE panel as you move.
              </p>
              <ol>
                <li>
                  <span>01</span> Progress fills
                </li>
                <li>
                  <span>02</span> Header hides &amp; returns
                </li>
                <li>
                  <span>03</span> Intro becomes reading mode
                </li>
              </ol>
            </div>
            <a className="scroll-cue" href="#article">
              Start scrolling <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <article className="article" id="article">
          <header className="article-header">
            <p className="section-label">You are using it right now</p>
            <h2>Scroll behavior without scroll-shaped React code.</h2>
            <p className="standfirst">
              Keep scrolling. The page is demonstrating the library while you
              read about it—no buttons, settings, or imagination required.
            </p>
            <div className="article-meta">
              <span>3 minute demo</span>
              <span>React + CSS</span>
            </div>
          </header>

          <section className="article-section">
            <p className="section-number">01 / Progress</p>
            <h3>Look at the very top edge.</h3>
            <p>
              The black line is the track. The bright line growing across it is
              driven by a CSS variable between zero and one. Nothing in this
              article component rerenders as you scroll.
            </p>
            <div className="inline-signal">
              <span>0</span>
              <div aria-hidden="true">
                <span />
              </div>
              <span>1</span>
            </div>
          </section>

          <blockquote>
            “The interaction is already happening. The explanation can come
            later.”
          </blockquote>

          <section className="article-section">
            <p className="section-number">02 / Direction</p>
            <h3>Now reverse direction.</h3>
            <p>
              Scroll up a little. The header returns immediately. Scroll down
              again and it moves out of the reading area. The LIVE panel shows
              the same direction value that CSS receives.
            </p>
          </section>

          <section className="article-section article-section-wide">
            <div>
              <p className="section-number">03 / Past intro</p>
              <h3>One page, two useful modes.</h3>
            </div>
            <p>
              At the top, the header belongs to the bold demo intro. Past that
              point, it becomes a compact reading tool. A single boolean
              attribute is enough for CSS to make the change.
            </p>
          </section>
        </article>

        <section className="explanation" id="explanation">
          <div className="explanation-heading">
            <p className="section-label">What just happened?</p>
            <h2>One hook.<br />Three CSS signals.</h2>
          </div>

          <div className="behavior-list">
            {behaviors.map((behavior) => (
              <article className="behavior" key={behavior.number}>
                <span className="behavior-number">{behavior.number}</span>
                <div>
                  <h3>{behavior.title}</h3>
                  <p>{behavior.copy}</p>
                </div>
                <code>{behavior.signal}</code>
              </article>
            ))}
          </div>

          <pre>
            <code>{`usePageSignals();

.progress {
  transform: scaleX(var(--scroll-progress));
}

[data-scroll-direction="down"] .header {
  transform: translateY(-100%);
}`}</code>
          </pre>

          <div className="closing">
            <p>
              That is the whole idea:
              <br />
              JavaScript observes. CSS responds.
            </p>
            <a href="https://github.com/w3cdp6084-dev/react-page-signals">
              View the source on GitHub ↗
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>react-page-signals · MIT</span>
        <a href="#top">Run the demo again ↑</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
