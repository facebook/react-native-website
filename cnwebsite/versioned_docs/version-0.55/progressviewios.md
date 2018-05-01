---
id: version-0.55-progressviewios
title: ProgressViewIOS
original_id: progressviewios
---

Use `ProgressViewIOS` to render a UIProgressView on iOS.

### Props

* [View props...](view.md#props)

- [`progress`](progressviewios.md#progress)
- [`progressImage`](progressviewios.md#progressimage)
- [`progressTintColor`](progressviewios.md#progresstintcolor)
- [`progressViewStyle`](progressviewios.md#progressviewstyle)
- [`trackImage`](progressviewios.md#trackimage)
- [`trackTintColor`](progressviewios.md#tracktintcolor)

---

# 文档

## Props

### `progress`

The progress value (between 0 and 1).

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `progressImage`

A stretchable image to display as the progress bar.

| 类型                   | 必填 |
| ---------------------- | -------- |
| Image.propTypes.source | 否       |

---

### `progressTintColor`

The tint color of the progress bar itself.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `progressViewStyle`

The progress bar style.

| 类型                   | 必填 |
| ---------------------- | -------- |
| enum('default', 'bar') | 否       |

---

### `trackImage`

A stretchable image to display behind the progress bar.

| 类型                   | 必填 |
| ---------------------- | -------- |
| Image.propTypes.source | 否       |

---

### `trackTintColor`

The tint color of the progress bar track.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |
