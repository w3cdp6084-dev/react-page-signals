import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { observePageSignals } from "./observePageSignals";

describe("observePageSignals", () => {
  let queuedFrame: FrameRequestCallback | undefined;

  beforeEach(() => {
    document.documentElement.removeAttribute("style");
    document.documentElement.removeAttribute("data-scroll-direction");
    document.documentElement.removeAttribute("data-is-scrolled");

    setWindowNumber("scrollY", 0);
    setWindowNumber("innerHeight", 800);
    setElementNumber(document.documentElement, "scrollHeight", 1600);
    setElementNumber(document.body, "scrollHeight", 1600);

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      queuedFrame = callback;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    queuedFrame = undefined;
  });

  it("writes initial CSS variables and data attributes", () => {
    const stop = observePageSignals();
    const root = document.documentElement;

    expect(root.style.getPropertyValue("--scroll-progress")).toBe("0");
    expect(root.style.getPropertyValue("--scroll-y")).toBe("0px");
    expect(root.getAttribute("data-scroll-direction")).toBe("none");
    expect(root.getAttribute("data-is-scrolled")).toBe("false");

    stop();
  });

  it("updates progress and direction on the next animation frame", () => {
    const stop = observePageSignals({ scrolledThreshold: 40 });

    setWindowNumber("scrollY", 400);
    window.dispatchEvent(new Event("scroll"));
    queuedFrame?.(0);

    const root = document.documentElement;
    expect(root.style.getPropertyValue("--scroll-progress")).toBe("0.5");
    expect(root.style.getPropertyValue("--scroll-y")).toBe("400px");
    expect(root.getAttribute("data-scroll-direction")).toBe("down");
    expect(root.getAttribute("data-is-scrolled")).toBe("true");

    stop();
  });

  it("batches repeated events into one animation frame", () => {
    const stop = observePageSignals();

    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
    stop();
  });

  it("supports custom names and restores previous values on cleanup", () => {
    const target = document.createElement("div");
    target.style.setProperty("--reading-progress", "0.2");
    target.setAttribute("data-direction", "paused");

    const stop = observePageSignals({
      target,
      progressVariable: "--reading-progress",
      scrollYVariable: "--reading-y",
      directionAttribute: "data-direction",
      scrolledAttribute: "data-past-intro",
    });

    expect(target.style.getPropertyValue("--reading-progress")).toBe("0");
    expect(target.getAttribute("data-direction")).toBe("none");

    stop();

    expect(target.style.getPropertyValue("--reading-progress")).toBe("0.2");
    expect(target.style.getPropertyValue("--reading-y")).toBe("");
    expect(target.getAttribute("data-direction")).toBe("paused");
    expect(target.hasAttribute("data-past-intro")).toBe(false);
  });
});

function setWindowNumber(name: "scrollY" | "innerHeight", value: number) {
  Object.defineProperty(window, name, { configurable: true, value });
}

function setElementNumber(
  element: HTMLElement,
  name: "scrollHeight",
  value: number,
) {
  Object.defineProperty(element, name, { configurable: true, value });
}
