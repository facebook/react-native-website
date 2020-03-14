---
id: version-0.19-webview
title: WebView
original_id: webview
---

Renders a native WebView.

### Props

- [View props...](view#props)

* [`renderLoading`](webview#renderloading)
* [`automaticallyAdjustContentInsets`](webview#automaticallyadjustcontentinsets)
* [`html`](webview#html)
* [`injectedJavaScript`](webview#injectedjavascript)
* [`onError`](webview#onerror)
* [`onLoad`](webview#onload)
* [`onLoadEnd`](webview#onloadend)
* [`onLoadStart`](webview#onloadstart)
* [`onNavigationStateChange`](webview#onnavigationstatechange)
* [`renderError`](webview#rendererror)
* [`contentInset`](webview#contentinset)
* [`startInLoadingState`](webview#startinloadingstate)
* [`style`](webview#style)
* [`url`](webview#url)
* [`domStorageEnabled`](webview#domstorageenabled)
* [`javaScriptEnabled`](webview#javascriptenabled)
* [`allowsInlineMediaPlayback`](webview#allowsinlinemediaplayback)
* [`bounces`](webview#bounces)
* [`onShouldStartLoadWithRequest`](webview#onshouldstartloadwithrequest)
* [`scalesPageToFit`](webview#scalespagetofit)
* [`scrollEnabled`](webview#scrollenabled)

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

### `renderLoading`

Function that returns a loading indicator.

| Type     | Required |
| -------- | -------- |
| function | No       |

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

### `onError`

Invoked when load fails

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoad`

Invoked when load finish

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadEnd`

Invoked when load either succeeds or fails

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadStart`

Invoked on load start

| Type     | Required |
| -------- | -------- |
| function | No       |

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

### `contentInset`

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

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

### `domStorageEnabled`

Used on Android only, controls whether DOM Storage is enabled or not

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `javaScriptEnabled`

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
