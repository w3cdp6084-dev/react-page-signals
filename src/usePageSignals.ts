import { useEffect } from "react";
import { observePageSignals } from "./observePageSignals";
import type { PageSignalsOptions } from "./types";

/**
 * Publishes page scroll information to CSS without rerendering React on scroll.
 */
export function usePageSignals(options: PageSignalsOptions = {}): void {
  const {
    target,
    scrolledThreshold,
    progressVariable,
    scrollYVariable,
    directionAttribute,
    scrolledAttribute,
    disabled,
  } = options;

  useEffect(
    () =>
      observePageSignals({
        target,
        scrolledThreshold,
        progressVariable,
        scrollYVariable,
        directionAttribute,
        scrolledAttribute,
        disabled,
      }),
    [
      target,
      scrolledThreshold,
      progressVariable,
      scrollYVariable,
      directionAttribute,
      scrolledAttribute,
      disabled,
    ],
  );
}
