import type {
  CSSVariableName,
  DataAttributeName,
  PageSignalsOptions,
  ScrollDirection,
} from "./types";

const defaultProgressVariable = "--scroll-progress";
const defaultScrollYVariable = "--scroll-y";
const defaultDirectionAttribute = "data-scroll-direction";
const defaultScrolledAttribute = "data-is-scrolled";

type SavedStyle = {
  name: CSSVariableName;
  value: string;
  priority: string;
};

type SavedAttribute = {
  name: DataAttributeName;
  value: string | null;
};

/**
 * Starts writing page-level scroll signals to CSS variables and data attributes.
 * Returns a cleanup function that restores the target's previous values.
 */
export function observePageSignals(
  options: PageSignalsOptions = {},
): () => void {
  if (
    options.disabled ||
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    return () => undefined;
  }

  const target = options.target ?? document.documentElement;
  if (!target) return () => undefined;

  const threshold = Math.max(0, options.scrolledThreshold ?? 24);
  const progressVariable =
    options.progressVariable ?? defaultProgressVariable;
  const scrollYVariable = options.scrollYVariable ?? defaultScrollYVariable;
  const directionAttribute =
    options.directionAttribute ?? defaultDirectionAttribute;
  const scrolledAttribute =
    options.scrolledAttribute ?? defaultScrolledAttribute;

  const savedStyles: SavedStyle[] = [progressVariable, scrollYVariable].map(
    (name) => ({
      name,
      value: target.style.getPropertyValue(name),
      priority: target.style.getPropertyPriority(name),
    }),
  );
  const savedAttributes: SavedAttribute[] = [
    directionAttribute,
    scrolledAttribute,
  ].map((name) => ({ name, value: target.getAttribute(name) }));

  let lastY = Math.max(0, window.scrollY);
  let direction: ScrollDirection = "none";
  let frameId: number | null = null;

  const update = () => {
    frameId = null;

    const currentY = Math.max(0, window.scrollY);
    if (currentY > lastY) direction = "down";
    if (currentY < lastY) direction = "up";

    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight ?? 0,
    );
    const maxScroll = Math.max(0, documentHeight - window.innerHeight);
    const progress =
      maxScroll === 0 ? 0 : Math.min(1, Math.max(0, currentY / maxScroll));

    target.style.setProperty(progressVariable, String(progress));
    target.style.setProperty(scrollYVariable, `${currentY}px`);
    target.setAttribute(directionAttribute, direction);
    target.setAttribute(scrolledAttribute, String(currentY > threshold));

    lastY = currentY;
  };

  const scheduleUpdate = () => {
    if (frameId !== null) return;
    frameId = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);

  return () => {
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    if (frameId !== null) window.cancelAnimationFrame(frameId);

    for (const style of savedStyles) {
      if (style.value) {
        target.style.setProperty(style.name, style.value, style.priority);
      } else {
        target.style.removeProperty(style.name);
      }
    }

    for (const attribute of savedAttributes) {
      if (attribute.value === null) {
        target.removeAttribute(attribute.name);
      } else {
        target.setAttribute(attribute.name, attribute.value);
      }
    }
  };
}
