# react-page-signals

CSS-first page scroll signals for React, without per-frame rerenders.

[日本語](./README.ja.md)

`react-page-signals` writes page scroll information to CSS custom properties and
`data-*` attributes. React mounts the observer; CSS handles the visual response.

## Features

- No React state updates while scrolling
- Updates batched with `requestAnimationFrame`
- Scroll progress, pixel position, direction, and threshold state
- Custom CSS variable and attribute names
- Restores previous values on cleanup
- SSR-safe and fully typed

## Install

```bash
pnpm add react-page-signals
```

## Usage

Call the hook once near the root of your app:

```tsx
import { usePageSignals } from "react-page-signals";

export function App() {
  usePageSignals();

  return <main>{/* Your page */}</main>;
}
```

It writes these values to `<html>` by default:

```html
<html
  style="--scroll-progress: 0.42; --scroll-y: 860px"
  data-scroll-direction="down"
  data-is-scrolled="true"
>
```

Use them from CSS:

```css
.progress-bar {
  transform: scaleX(var(--scroll-progress));
  transform-origin: left;
}

[data-scroll-direction="down"] .site-header {
  transform: translateY(-100%);
}

[data-is-scrolled="true"] .site-header {
  backdrop-filter: blur(16px);
}
```

## Options

```tsx
usePageSignals({
  scrolledThreshold: 80,
  progressVariable: "--reading-progress",
  scrollYVariable: "--reading-y",
  directionAttribute: "data-reading-direction",
  scrolledAttribute: "data-past-intro",
});
```

| Option | Default | Description |
| --- | --- | --- |
| `target` | `document.documentElement` | Element that receives the signals |
| `scrolledThreshold` | `24` | Pixels before the scrolled attribute becomes `true` |
| `progressVariable` | `--scroll-progress` | Unitless progress from `0` to `1` |
| `scrollYVariable` | `--scroll-y` | Current page scroll position in pixels |
| `directionAttribute` | `data-scroll-direction` | Receives `up`, `down`, or `none` |
| `scrolledAttribute` | `data-is-scrolled` | Receives `true` or `false` |
| `disabled` | `false` | Disables observation without conditionally calling the hook |

For non-React integrations, the package also exports `observePageSignals`. It
returns a cleanup function.

```ts
import { observePageSignals } from "react-page-signals";

const stop = observePageSignals();
stop();
```

## Development

```bash
pnpm install
pnpm dev
pnpm check
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

[MIT](./LICENSE) © Yusuke Mori
