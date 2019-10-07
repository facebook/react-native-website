---
id: progressviewios
title: ProgressViewIOS
---

使用`ProgressViewIOS`来在iOS上渲染一个UIProgressView。

---

# 文档

## Props

### `progress`

当前的进度值（0到1之间）。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `progressImage`

一个可以拉伸的图片，用于显示进度条。

| 类型                   | 必填 |
| ---------------------- | -------- |
| Image.propTypes.source | 否       |

---

### `progressTintColor`

进度条本身染上的颜色。

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `progressViewStyle`

进度条的样式。

| 类型                   | 必填 |
| ---------------------- | -------- |
| enum('default', 'bar') | 否       |

---

### `trackImage`

一个可拉伸的图片，用于显示进度条后面的轨道。

| 类型                   | 必填 |
| ---------------------- | -------- |
| Image.propTypes.source | 否       |

---

### `trackTintColor`

进度条轨道染上的颜色。

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |
