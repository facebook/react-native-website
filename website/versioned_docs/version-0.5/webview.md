---
id: version-0.5-webview
title: WebView
original_id: webview
---

### Props

- [`renderError`](webview#rendererror)
- [`automaticallyAdjustContentInsets`](webview#automaticallyadjustcontentinsets)
- [`contentInset`](webview#contentinset)
- [`html`](webview#html)
- [`javaScriptEnabledAndroid`](webview#javascriptenabledandroid)
- [`onNavigationStateChange`](webview#onnavigationstatechange)
- [`bounces`](webview#bounces)
- [`renderLoading`](webview#renderloading)
- [`scrollEnabled`](webview#scrollenabled)
- [`shouldInjectAJAXHandler`](webview#shouldinjectajaxhandler)
- [`startInLoadingState`](webview#startinloadingstate)
- [`style`](webview#style)
- [`url`](webview#url)

### Methods

- [`goForward`](webview#goforward)
- [`goBack`](webview#goback)
- [`reload`](webview#reload)
- [`updateNavigationState`](webview#updatenavigationstate)
- [`getWebWiewHandle`](webview#getwebwiewhandle)
- [`onLoadingStart`](webview#onloadingstart)
- [`onLoadingError`](webview#onloadingerror)
- [`onLoadingFinish`](webview#onloadingfinish)

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

| Type               | Required |
| ------------------ | -------- |
| [View](view#style) | No       |

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
