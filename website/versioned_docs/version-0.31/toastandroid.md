---
id: version-0.31-toastandroid
title: ToastAndroid
original_id: toastandroid
---

This exposes the native ToastAndroid module as a JS module. This has a function 'show' which takes the following parameters:

1. String message: A string with the text to toast
2. int duration: The duration of the toast. May be ToastAndroid.SHORT or ToastAndroid.LONG

There is also a function `showWithGravity` to specify the layout gravity. May be ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER

### Methods

- [`show`](toastandroid.md#show)
- [`showWithGravity`](toastandroid.md#showwithgravity)

### Properties

- [`SHORT`](toastandroid.md#short)
- [`LONG`](toastandroid.md#long)
- [`TOP`](toastandroid.md#top)
- [`BOTTOM`](toastandroid.md#bottom)
- [`CENTER`](toastandroid.md#center)

---

# Reference

## Methods

### `show()`

```javascript
static show(message, duration)
```

---

### `showWithGravity()`

```javascript
static showWithGravity(message, duration, gravity)
```

## Properties

### `SHORT`

```javascript
ToastAndroid.SHORT;
```

---

### `LONG`

```javascript
ToastAndroid.LONG;
```

---

### `TOP`

```javascript
ToastAndroid.TOP;
```

---

### `BOTTOM`

```javascript
ToastAndroid.BOTTOM;
```

---

### `CENTER`

```javascript
ToastAndroid.CENTER;
```
