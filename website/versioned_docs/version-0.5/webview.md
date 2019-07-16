---
id: version-0.5-webview
title: WebView
original_id: webview
---

### Props

- [`renderError`](webview.md#rendererror)
- [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
- [`contentInset`](webview.md#contentinset)
- [`html`](webview.md#html)
- [`javaScriptEnabledAndroid`](webview.md#javascriptenabledandroid)
- [`onNavigationStateChange`](webview.md#onnavigationstatechange)
- [`bounces`](webview.md#bounces)
- [`renderLoading`](webview.md#renderloading)
- [`scrollEnabled`](webview.md#scrollenabled)
- [`shouldInjectAJAXHandler`](webview.md#shouldinjectajaxhandler)
- [`startInLoadingState`](webview.md#startinloadingstate)
- [`style`](webview.md#style)
- [`url`](webview.md#url)

### Methods

- [`goForward`](webview.md#goforward)
- [`goBack`](webview.md#goback)
- [`reload`](webview.md#reload)
- [`updateNavigationState`](webview.md#updatenavigationstate)
- [`getWebWiewHandle`](webview.md#getwebwiewhandle)
- [`onLoadingStart`](webview.md#onloadingstart)
- [`onLoadingError`](webview.md#onloadingerror)
- [`onLoadingFinish`](webview.md#onloadingfinish)

---

# Reference

## Props

### `renderError`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `automaticallyAdjustContentInsets`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `contentInset`

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `html`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `javaScriptEnabledAndroid`

Used for android only, JS is enabled by default for WebView on iOS

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onNavigationStateChange`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `bounces`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `renderLoading`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `scrollEnabled`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `shouldInjectAJAXHandler`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `startInLoadingState`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `style`

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `url`

| Type   | Required |
| ------ | -------- |
| string | No       |

## Methods

### `goForward()`

```jsx
goForward();
```

---

### `goBack()`

```jsx
goBack();
```

---

### `reload()`

```jsx
reload();
```

---

### `updateNavigationState()`

```jsx
updateNavigationState((event: Event));
```

We return an event with a bunch of fields including: url, title, loading, canGoBack, canGoForward

---

### `getWebWiewHandle()`

```jsx
getWebWiewHandle():
```

---

### `onLoadingStart()`

```jsx
onLoadingStart((event: Event));
```

---

### `onLoadingError()`

```jsx
onLoadingError((event: Event));
```

---

### `onLoadingFinish()`

```jsx
onLoadingFinish((event: Event));
```
