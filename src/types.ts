export type ScrollDirection = "up" | "down" | "none";

export type CSSVariableName = `--${string}`;

export type DataAttributeName = `data-${string}`;

export type PageSignalsOptions = {
  /** Element that receives the CSS variables and data attributes. */
  target?: HTMLElement | null;
  /** Scroll distance in pixels before `data-is-scrolled` becomes `true`. */
  scrolledThreshold?: number;
  /** CSS custom property used for a unitless value between 0 and 1. */
  progressVariable?: CSSVariableName;
  /** CSS custom property used for the current scroll position in pixels. */
  scrollYVariable?: CSSVariableName;
  /** Data attribute that receives `up`, `down`, or `none`. */
  directionAttribute?: DataAttributeName;
  /** Data attribute that receives `true` or `false`. */
  scrolledAttribute?: DataAttributeName;
  /** Prevent observation without conditionally calling the hook. */
  disabled?: boolean;
};
