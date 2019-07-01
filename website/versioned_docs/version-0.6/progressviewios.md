---
id: version-0.6-progressviewios
title: ProgressViewIOS
original_id: progressviewios
---

Use `ProgressViewIOS` to render a UIProgressView on iOS.

### Props

- [`progress`](progressviewios.md#progress)
- [`progressImage`](progressviewios.md#progressimage)
- [`progressTintColor`](progressviewios.md#progresstintcolor)
- [`progressViewStyle`](progressviewios.md#progressviewstyle)
- [`trackImage`](progressviewios.md#trackimage)
- [`trackTintColor`](progressviewios.md#tracktintcolor)

---

# Reference

## Props

### `progress`

The progress value (between 0 and 1).

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `progressImage`

A stretchable image to display as the progress bar.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `progressTintColor`

The tint color of the progress bar itself.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `progressViewStyle`

The progress bar style.

| Type                   | Required |
| ---------------------- | -------- |
| enum('default', 'bar') | No       |

---

### `trackImage`

A stretchable image to display behind the progress bar.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `trackTintColor`

The tint color of the progress bar track.

| Type   | Required |
| ------ | -------- |
| string | No       |
