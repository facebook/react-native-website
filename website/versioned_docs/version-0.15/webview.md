---
id: version-0.15-webview
title: WebView
original_id: webview
---

Renders a native WebView.

Note that WebView is only supported on iOS for now, see https://reactnative.dev/known-issues.md

### Props

- [`onShouldStartLoadWithRequest`](webview.md#onshouldstartloadwithrequest)
- [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
- [`contentInset`](webview.md#contentinset)
- [`html`](webview.md#html)
- [`injectedJavaScript`](webview.md#injectedjavascript)
- [`javaScriptEnabledAndroid`](webview.md#javascriptenabledandroid)
- [`onNavigationStateChange`](webview.md#onnavigationstatechange)
- [`bounces`](webview.md#bounces)
- [`renderError`](webview.md#rendererror)
- [`renderLoading`](webview.md#renderloading)
- [`scalesPageToFit`](webview.md#scalespagetofit)
- [`scrollEnabled`](webview.md#scrollenabled)
- [`startInLoadingState`](webview.md#startinloadingstate)
- [`style`](webview.md#style)
- [`url`](webview.md#url)

### Methods

- [`goForward`](webview.md#goforward)
- [`goBack`](webview.md#goback)
- [`reload`](webview.md#reload)
- [`updateNavigationState`](webview.md#updatenavigationstate)
- [`getWebViewHandle`](webview.md#getwebviewhandle)
- [`onLoadingStart`](webview.md#onloadingstart)
- [`onLoadingError`](webview.md#onloadingerror)
- [`onLoadingFinish`](webview.md#onloadingfinish)

---

# Reference

## Props

### `onShouldStartLoadWithRequest`

Allows custom handling of any webview requests by a JS handler. Return true or false from this method to continue loading the request.

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

### `injectedJavaScript`

Sets the JS to be injected when the webpage loads.

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

### `renderError`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderLoading`

| Type     | Required |
| -------- | -------- |
| function | No       |

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

### `getWebViewHandle()`

```jsx
getWebViewHandle():
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
