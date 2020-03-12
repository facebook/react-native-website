---
id: version-0.16-webview
title: WebView
original_id: webview
---

Renders a native WebView.

Note that WebView is only supported on iOS for now, see https://reactnative.dev/known-issues.md

### Props

- [View props...](view#props)

* [`scrollEnabled`](webview#scrollenabled)
* [`automaticallyAdjustContentInsets`](webview#automaticallyadjustcontentinsets)
* [`contentInset`](webview#contentinset)
* [`html`](webview#html)
* [`injectedJavaScript`](webview#injectedjavascript)
* [`onNavigationStateChange`](webview#onnavigationstatechange)
* [`renderError`](webview#rendererror)
* [`renderLoading`](webview#renderloading)
* [`bounces`](webview#bounces)
* [`startInLoadingState`](webview#startinloadingstate)
* [`style`](webview#style)
* [`url`](webview#url)
* [`javaScriptEnabledAndroid`](webview#javascriptenabledandroid)
* [`allowsInlineMediaPlayback`](webview#allowsinlinemediaplayback)
* [`onShouldStartLoadWithRequest`](webview#onshouldstartloadwithrequest)
* [`scalesPageToFit`](webview#scalespagetofit)

### Methods

- [`goForward`](webview#goforward)
- [`goBack`](webview#goback)
- [`reload`](webview#reload)
- [`updateNavigationState`](webview#updatenavigationstate)
- [`getWebViewHandle`](webview#getwebviewhandle)
- [`onLoadingStart`](webview#onloadingstart)
- [`onLoadingError`](webview#onloadingerror)
- [`onLoadingFinish`](webview#onloadingfinish)

---

# Reference

## Props

### `scrollEnabled`

| Type | Required |
| ---- | -------- |
| bool | No       |

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

### `renderLoading`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `bounces`

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

---

### `javaScriptEnabledAndroid`

Used for android only, JS is enabled by default for WebView on iOS

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `allowsInlineMediaPlayback`

Determines whether HTML5 videos play inline or use the native full-screen controller. default value `false` **NOTE** : "In order for video to play inline, not only does this property need to be set to true, but the video element in the HTML document must also include the webkit-playsinline attribute."

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `onShouldStartLoadWithRequest`

Allows custom handling of any webview requests by a JS handler. Return true or false from this method to continue loading the request.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `scalesPageToFit`

Sets whether the webpage scales to fit the view and the user can change the scale.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

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
