---
id: version-0.25-webview
title: WebView
original_id: webview
---

Renders a native WebView.

### Props

- [View props...](view.md#props)

* [`scalesPageToFit`](webview.md#scalespagetofit)
* [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
* [`onShouldStartLoadWithRequest`](webview.md#onshouldstartloadwithrequest)
* [`injectedJavaScript`](webview.md#injectedjavascript)
* [`mediaPlaybackRequiresUserAction`](webview.md#mediaplaybackrequiresuseraction)
* [`onError`](webview.md#onerror)
* [`onLoad`](webview.md#onload)
* [`onLoadEnd`](webview.md#onloadend)
* [`onLoadStart`](webview.md#onloadstart)
* [`onNavigationStateChange`](webview.md#onnavigationstatechange)
* [`renderError`](webview.md#rendererror)
* [`renderLoading`](webview.md#renderloading)
* [`contentInset`](webview.md#contentinset)
* [`source`](webview.md#source)
* [`startInLoadingState`](webview.md#startinloadingstate)
* [`style`](webview.md#style)
* [`decelerationRate`](webview.md#decelerationrate)
* [`domStorageEnabled`](webview.md#domstorageenabled)
* [`javaScriptEnabled`](webview.md#javascriptenabled)
* [`allowsInlineMediaPlayback`](webview.md#allowsinlinemediaplayback)
* [`bounces`](webview.md#bounces)
* [`scrollEnabled`](webview.md#scrollenabled)
* [`url`](webview.md#url)
* [`html`](webview.md#html)

### Methods

- [`goForward`](webview.md#goforward)
- [`goBack`](webview.md#goback)
- [`reload`](webview.md#reload)
- [`getWebViewHandle`](webview.md#getwebviewhandle)

---

# Reference

## Props

### `scalesPageToFit`

Sets whether the webpage scales to fit the view and the user can change the scale.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `automaticallyAdjustContentInsets`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onShouldStartLoadWithRequest`

Allows custom handling of any webview requests by a JS handler. Return true or false from this method to continue loading the request.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `injectedJavaScript`

Sets the JS to be injected when the webpage loads.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `mediaPlaybackRequiresUserAction`

Determines whether HTML5 audio & videos require the user to tap before they can start playing. The default value is `false`.

| Type | Required |
| ---- | -------- |
| bool | No       |

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

### `renderLoading`

Function that returns a loading indicator.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `contentInset`

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `source`

Loads static html or a uri (with optional headers) in the WebView.

| Type                                                                                                                | Required |
| ------------------------------------------------------------------------------------------------------------------- | -------- |
| object: {uri: string,method: string,headers: object,body: string}, ,object: {html: string,baseUrl: string}, ,number | No       |

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

### `decelerationRate`

A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. You may also use string shortcuts `"normal"` and `"fast"` which match the underlying iOS settings for `UIScrollViewDecelerationRateNormal` and `UIScrollViewDecelerationRateFast` respectively.

- normal: 0.998
- fast: 0.99 (the default for iOS WebView)

| Type                                  | Required | Platform |
| ------------------------------------- | -------- | -------- |
| ScrollView.propTypes.decelerationRate | No       | iOS      |

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

### `scrollEnabled`

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `url`

**Deprecated.** Use the `source` prop instead.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `html`

**Deprecated.** Use the `source` prop instead.

| Type   | Required |
| ------ | -------- |
| string | No       |

## Methods

### `goForward()`

```javascript
goForward();
```

Go forward one page in the webview's history.

---

### `goBack()`

```javascript
goBack();
```

Go back one page in the webview's history.

---

### `reload()`

```javascript
reload();
```

Reloads the current page.

---

### `getWebViewHandle()`

```javascript
getWebViewHandle():
```

Returns the native webview node.
