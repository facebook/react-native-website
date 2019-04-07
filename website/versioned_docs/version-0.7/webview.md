---
id: version-0.7-webview
title: WebView
original_id: webview
---

### Props

- [`renderLoading`](webview.md#renderloading)
- [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
- [`contentInset`](webview.md#contentinset)
- [`html`](webview.md#html)
- [`javaScriptEnabledAndroid`](webview.md#javascriptenabledandroid)
- [`onNavigationStateChange`](webview.md#onnavigationstatechange)
- [`renderError`](webview.md#rendererror)
- [`bounces`](webview.md#bounces)
- [`scalesPageToFit`](webview.md#scalespagetofit)
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

### `renderLoading`

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

### `renderError`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `bounces`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `scalesPageToFit`

Used for iOS only, sets whether the webpage scales to fit the view and the user can change the scale

| Type | Required |
| ---- | -------- |
| bool | No       |

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

```javascript
goForward();
```

---

### `goBack()`

```javascript
goBack();
```

---

### `reload()`

```javascript
reload();
```

---

### `updateNavigationState()`

```javascript
updateNavigationState((event: Event));
```

We return an event with a bunch of fields including: url, title, loading, canGoBack, canGoForward

---

### `getWebWiewHandle()`

```javascript
getWebWiewHandle():
```

---

### `onLoadingStart()`

```javascript
onLoadingStart((event: Event));
```

---

### `onLoadingError()`

```javascript
onLoadingError((event: Event));
```

---

### `onLoadingFinish()`

```javascript
onLoadingFinish((event: Event));
```
