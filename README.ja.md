# react-page-signals

読了プログレスバー、スクロール方向で隠れるヘッダー、ファーストビュー通過後のスタイルを、ひとつの小さなReactフックで作ります。

[デモを開く](https://w3cdp6084-dev.github.io/react-page-signals/) ·
[English](./README.md)

![読了プログレスバーとスクロールに反応するヘッダーのデモ](./media/preview.png)

## 何が作れる？

| 作れるUI | CSSで使う値 |
| --- | --- |
| 読了プログレスバー | `0`から`1`まで変化する`--scroll-progress` |
| 下スクロールで隠れ、上スクロールで戻るヘッダー | `data-scroll-direction` |
| ファーストビュー通過後に小さくなるヘッダー | `data-is-scrolled` |
| パララックスやスクロール連動の余白 | ピクセル値の`--scroll-y` |

フックはCSS変数と`data-*`属性を直接更新します。スクロール中にReactのstateを更新しません。

## 30秒で分かる使い方

アプリのルート付近で一度だけフックを呼びます。

```tsx
import { usePageSignals } from "react-page-signals";

export function App() {
  usePageSignals({ scrolledThreshold: 80 });

  return (
    <>
      <div className="reading-progress" />
      <header className="site-header">My site</header>
      <main>{/* 縦に長いページ */}</main>
    </>
  );
}
```

React側はこれで完了です。動きはCSSに書きます。

```css
.reading-progress {
  transform: scaleX(var(--scroll-progress));
  transform-origin: left;
}

[data-scroll-direction="down"] .site-header {
  transform: translateY(-100%);
}

[data-scroll-direction="up"] .site-header {
  transform: translateY(0);
}

[data-is-scrolled="true"] .site-header {
  backdrop-filter: blur(16px);
}
```

[デモページ](https://w3cdp6084-dev.github.io/react-page-signals/)をスクロールすると、3種類の利用例を確認できます。

## 現在のソースを試す

最初のnpm版はまだ公開していません。現在はGitHubからローカルで動かせます。

```bash
git clone https://github.com/w3cdp6084-dev/react-page-signals.git
cd react-page-signals
pnpm install
pnpm dev
```

Viteが表示したローカルURLをブラウザで開いてください。

## ページに追加される値

標準では`<html>`へ次の値が追加されます。

```html
<html
  style="--scroll-progress: 0.42; --scroll-y: 860px"
  data-scroll-direction="down"
  data-is-scrolled="true"
>
```

更新は`requestAnimationFrame`でまとめられ、フックの終了時には変更前の値へ戻ります。

## オプション

```tsx
usePageSignals({
  scrolledThreshold: 80,
  progressVariable: "--reading-progress",
  scrollYVariable: "--reading-y",
  directionAttribute: "data-reading-direction",
  scrolledAttribute: "data-past-intro",
});
```

| オプション | 初期値 | 内容 |
| --- | --- | --- |
| `target` | `document.documentElement` | 値を受け取る要素 |
| `scrolledThreshold` | `24` | スクロール済みになるまでのピクセル数 |
| `progressVariable` | `--scroll-progress` | `0`から`1`までの進捗 |
| `scrollYVariable` | `--scroll-y` | 現在のスクロール位置 |
| `directionAttribute` | `data-scroll-direction` | `up`、`down`、`none`のいずれか |
| `scrolledAttribute` | `data-is-scrolled` | `true`または`false` |
| `disabled` | `false` | フックを条件付きで呼ばずに監視を停止 |

## このプロジェクトの方針

- 小さく、CSS中心に保つ
- スクロール中にReactを再描画しない
- 設定なしでも役立つ初期値にする
- SSRとTypeScriptに対応する
- 終了時にページを元の状態へ戻す

## 開発

```bash
pnpm install
pnpm dev
pnpm check
```

変更を送る前に[CONTRIBUTING.md](./CONTRIBUTING.md)を確認してください。

## ライセンス

[MIT](./LICENSE) © Yusuke Mori
