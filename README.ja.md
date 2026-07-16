# react-page-signals

Reactをスクロールのたびに再描画せず、ページの状態をCSSへ渡す小さなフックです。

[English](./README.md)

## 特徴

- スクロール中にReactのstateを更新しません
- 更新を`requestAnimationFrame`でまとめます
- 進捗、スクロール量、方向、しきい値の通過状態を提供します
- CSS変数名と`data-*`属性名を変更できます
- アンマウント時に変更前の値へ戻します
- SSRを壊さず、TypeScriptの型を同梱します

## インストール

```bash
pnpm add react-page-signals
```

## 使い方

アプリのルート付近で一度だけ呼び出します。

```tsx
import { usePageSignals } from "react-page-signals";

export function App() {
  usePageSignals();

  return <main>{/* ページの内容 */}</main>;
}
```

標準では`<html>`へ次の値が追加されます。

```html
<html
  style="--scroll-progress: 0.42; --scroll-y: 860px"
  data-scroll-direction="down"
  data-is-scrolled="true"
>
```

CSSからそのまま利用できます。

```css
.progress-bar {
  transform: scaleX(var(--scroll-progress));
  transform-origin: left;
}

[data-scroll-direction="down"] .site-header {
  transform: translateY(-100%);
}
```

## 開発

```bash
pnpm install
pnpm dev
pnpm check
```

バグ報告や変更を送る前に[CONTRIBUTING.md](./CONTRIBUTING.md)を確認してください。

## ライセンス

[MIT](./LICENSE) © Yusuke Mori
