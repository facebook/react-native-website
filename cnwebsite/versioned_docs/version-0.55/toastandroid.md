---
id: version-0.55-toastandroid
title: ToastAndroid
original_id: toastandroid
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

本模块将原生的 ToastAndroid 模块导出为一个 JS 模块，用于在 Android 设备上显示一个悬浮的提示信息。本模块包含一个`show`方法接受以下的参数：

1.  String message: 一个字符串，表示将要显示的文本内容。
2.  int duration: 提示信息持续显示的时间。可以是`ToastAndroid.SHORT`或者`ToastAndroid.LONG`。

还有一个名为`showWithGravity`的方法可以指定弹出的位置。可选项有：ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER.

The 'showWithGravityAndOffset' function adds on the ability to specify offset These offset values will translate to pixels.

用法示例：

```jsx
ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
ToastAndroid.showWithGravity(
  "All Your Base Are Belong To Us",
  ToastAndroid.SHORT,
  ToastAndroid.CENTER
);
ToastAndroid.showWithGravityAndOffset(
  "A wild toast appeared!",
  ToastAndroid.LONG,
  ToastAndroid.BOTTOM,
  25,
  50
);
```

### 查看方法

- [`show`](toastandroid.md#show)
- [`showWithGravity`](toastandroid.md#showwithgravity)
- [`showWithGravityAndOffset`](toastandroid.md#showwithgravityandoffset)

### 查看属性

- [`SHORT`](toastandroid.md#short)
- [`LONG`](toastandroid.md#long)
- [`TOP`](toastandroid.md#top)
- [`BOTTOM`](toastandroid.md#bottom)
- [`CENTER`](toastandroid.md#center)

---

# 文档

## 方法

### `show()`

```jsx
static show(message, duration)
```

---

### `showWithGravity()`

```jsx
static showWithGravity(message, duration, gravity)
```

---

### `showWithGravityAndOffset()`

```jsx
static showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)
```

## 属性

### `SHORT`

```jsx
ToastAndroid.SHORT;
```

---

### `LONG`

```jsx
ToastAndroid.LONG;
```

---

### `TOP`

```jsx
ToastAndroid.TOP;
```

---

### `BOTTOM`

```jsx
ToastAndroid.BOTTOM;
```

---

### `CENTER`

```jsx
ToastAndroid.CENTER;
```
