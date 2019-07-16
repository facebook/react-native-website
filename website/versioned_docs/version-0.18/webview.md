---
id: version-0.18-webview
title: WebView
original_id: webview
---

Renders a native WebView.

### Props

- [View props...](view.md#props)

* [`style`](webview.md#style)
* [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
* [`html`](webview.md#html)
* [`injectedJavaScript`](webview.md#injectedjavascript)
* [`onNavigationStateChange`](webview.md#onnavigationstatechange)
* [`renderError`](webview.md#rendererror)
* [`renderLoading`](webview.md#renderloading)
* [`startInLoadingState`](webview.md#startinloadingstate)
* [`contentInset`](webview.md#contentinset)
* [`url`](webview.md#url)
* [`domStorageEnabledAndroid`](webview.md#domstorageenabledandroid)
* [`javaScriptEnabledAndroid`](webview.md#javascriptenabledandroid)
* [`allowsInlineMediaPlayback`](webview.md#allowsinlinemediaplayback)
* [`bounces`](webview.md#bounces)
* [`onShouldStartLoadWithRequest`](webview.md#onshouldstartloadwithrequest)
* [`scalesPageToFit`](webview.md#scalespagetofit)
* [`scrollEnabled`](webview.md#scrollenabled)

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

### `style`

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `automaticallyAdjustContentInsets`

| Type | Required |
| ---- | -------- |
| bool | No       |

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

Function that returns a view to show if there's an error.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderLoading`

Function that returns a loading indicator.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `startInLoadingState`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `contentInset`

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `url`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `domStorageEnabledAndroid`

Used on Android only, controls whether DOM Storage is enabled or not

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `javaScriptEnabledAndroid`

Used on Android only, JS is enabled by default for WebView on iOS

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

### `bounces`

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

---

### `scrollEnabled`

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
