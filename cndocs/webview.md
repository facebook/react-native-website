---
id: webview
title: WebView
---

`WebView` renders web content in a native view.

```
import React, { Component } from 'react';
import { WebView } from 'react-native';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
    );
  }
}
```

You can use this component to navigate back and forth in the web view's history and configure various properties for the web content.

> **Security Warning:** Currently, `onMessage` and `postMessage` do not allow specifying an origin. This can lead to cross-site scripting attacks if an unexpected document is loaded within a `WebView` instance. Please refer to the MDN documentation for [`Window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) for more details on the security implications of this.

### Props

* [View props...](view.md#props)

- [`source`](webview.md#source)
- [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
- [`injectJavaScript`](webview.md#injectjavascript)
- [`injectedJavaScript`](webview.md#injectedjavascript)
- [`mediaPlaybackRequiresUserAction`](webview.md#mediaplaybackrequiresuseraction)
- [`nativeConfig`](webview.md#nativeconfig)
- [`onError`](webview.md#onerror)
- [`onLoad`](webview.md#onload)
- [`onLoadEnd`](webview.md#onloadend)
- [`onLoadStart`](webview.md#onloadstart)
- [`onMessage`](webview.md#onmessage)
- [`onNavigationStateChange`](webview.md#onnavigationstatechange)
- [`renderError`](webview.md#rendererror)
- [`renderLoading`](webview.md#renderloading)
- [`scalesPageToFit`](webview.md#scalespagetofit)
- [`initialScale`](webview.md#initialScale)
- [`onShouldStartLoadWithRequest`](webview.md#onshouldstartloadwithrequest)
- [`startInLoadingState`](webview.md#startinloadingstate)
- [`style`](webview.md#style)
- [`decelerationRate`](webview.md#decelerationrate)
- [`domStorageEnabled`](webview.md#domstorageenabled)
- [`javaScriptEnabled`](webview.md#javascriptenabled)
- [`mixedContentMode`](webview.md#mixedcontentmode)
- [`thirdPartyCookiesEnabled`](webview.md#thirdpartycookiesenabled)
- [`userAgent`](webview.md#useragent)
- [`allowsInlineMediaPlayback`](webview.md#allowsinlinemediaplayback)
- [`bounces`](webview.md#bounces)
- [`contentInset`](webview.md#contentinset)
- [`dataDetectorTypes`](webview.md#datadetectortypes)
- [`scrollEnabled`](webview.md#scrollenabled)
- [`url`](webview.md#url)
- [`html`](webview.md#html)

### Methods

* [`extraNativeComponentConfig`](webview.md#extranativecomponentconfig)

---

# 文档

## Props

### `source`

Loads static html or a uri (with optional headers) in the WebView.

| 类型                                                                                                                | 必填 |
| ------------------------------------------------------------------------------------------------------------------- | -------- |
| object: {uri: string,method: string,headers: object,body: string}, ,object: {html: string,baseUrl: string}, ,number | 否       |

---

### `automaticallyAdjustContentInsets`

Controls whether to adjust the content inset for web views that are placed behind a navigation bar, tab bar, or toolbar. The default value is `true`.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `injectJavaScript`

Function that accepts a string that will be passed to the WebView and executed immediately as JavaScript.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `injectedJavaScript`

Set this to provide JavaScript that will be injected into the web page when the view loads.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `mediaPlaybackRequiresUserAction`

Boolean that determines whether HTML5 audio and video requires the user to tap them before they start playing. The default value is `true`.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `nativeConfig`

Override the native component used to render the WebView. Enables a custom native WebView which uses the same JavaScript as the original WebView.

| 类型                                                       | 必填 |
| ---------------------------------------------------------- | -------- |
| object: {component: any,props: object,viewManager: object} | 否       |

---

### `onError`

Function that is invoked when the `WebView` load fails.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onLoad`

Function that is invoked when the `WebView` has finished loading.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onLoadEnd`

Function that is invoked when the `WebView` load succeeds or fails.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onLoadStart`

Function that is invoked when the `WebView` starts loading.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onMessage`

A function that is invoked when the webview calls `window.postMessage`. Setting this property will inject a `postMessage` global into your webview, but will still call pre-existing values of `postMessage`.

`window.postMessage` accepts one argument, `data`, which will be available on the event object, `event.nativeEvent.data`. `data` must be a string.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onNavigationStateChange`

Function that is invoked when the `WebView` loading starts or ends.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `renderError`

Function that returns a view to show if there's an error.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `renderLoading`

Function that returns a loading indicator.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `scalesPageToFit`

Boolean that controls whether the web content is scaled to fit the view and enables the user to change the scale. The default value is `true`.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `initialScale`

Number that controls whether the initial scale percentage of the view. 50 is 50%, 100 is 100%, etc. Used only in Android.

| 类型   | 必填 | 平台 |
| ------ | -------- | -------- |
| number | 否       | Android  |

---

### `onShouldStartLoadWithRequest`

Function that allows custom handling of any web view requests. Return `true` from the function to continue loading the request and `false` to stop loading.

| 类型     | 必填 | 平台 |
| -------- | -------- | -------- |
| function | 否       | iOS      |

---

### `startInLoadingState`

Boolean value that forces the `WebView` to show the loading view on the first load.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `style`

The style to apply to the `WebView`.

| 类型       | 必填 |
| ---------- | -------- |
| View.style | 否       |

---

### `decelerationRate`

A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. You may also use the string shortcuts `"normal"` and `"fast"` which match the underlying iOS settings for `UIScrollViewDecelerationRateNormal` and `UIScrollViewDecelerationRateFast` respectively:

* normal: 0.998
* fast: 0.99 (the default for iOS web view)

| 类型                                  | 必填 | 平台 |
| ------------------------------------- | -------- | -------- |
| ScrollView.propTypes.decelerationRate | 否       | iOS      |

---

### `domStorageEnabled`

Boolean value to control whether DOM Storage is enabled. Used only in Android.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | Android  |

---

### `javaScriptEnabled`

Boolean value to enable JavaScript in the `WebView`. Used on Android only as JavaScript is enabled by default on iOS. The default value is `true`.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | Android  |

---

### `mixedContentMode`

Specifies the mixed content mode. i.e WebView will allow a secure origin to load content from any other origin.

Possible values for `mixedContentMode` are:

* `'never'` (default) - WebView will not allow a secure origin to load content from an insecure origin.
* `'always'` - WebView will allow a secure origin to load content from any other origin, even if that origin is insecure.
* `'compatibility'` - WebView will attempt to be compatible with the approach of a modern web browser with regard to mixed content.

| 类型                                     | 必填 | 平台 |
| ---------------------------------------- | -------- | -------- |
| enum('never', 'always', 'compatibility') | 否       | Android  |

---

### `thirdPartyCookiesEnabled`

Boolean value to enable third party cookies in the `WebView`. Used on Android Lollipop and above only as third party cookies are enabled by default on Android Kitkat and below and on iOS. The default value is `true`.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | Android  |

---

### `userAgent`

Sets the user-agent for the `WebView`.

| 类型   | 必填 | 平台 |
| ------ | -------- | -------- |
| string | 否       | Android  |

---

### `allowsInlineMediaPlayback`

Boolean that determines whether HTML5 videos play inline or use the native full-screen controller. The default value is `false`.

**NOTE** : In order for video to play inline, not only does this property need to be set to `true`, but the video element in the HTML document must also include the `webkit-playsinline` attribute.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | iOS      |

---

### `bounces`

Boolean value that determines whether the web view bounces when it reaches the edge of the content. The default value is `true`.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | iOS      |

---

### `contentInset`

The amount by which the web view content is inset from the edges of the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.

| 类型                                                               | 必填 | 平台 |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | 否       | iOS      |

---

### `dataDetectorTypes`

Determines the types of data converted to clickable URLs in the web view's content. By default only phone numbers are detected.

You can provide one type or an array of many types.

Possible values for `dataDetectorTypes` are:

* `'phoneNumber'`
* `'link'`
* `'address'`
* `'calendarEvent'`
* `'none'`
* `'all'`

| 类型                                                                                                                                                     | 必填 | 平台 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') | 否       | iOS      |

---

### `scrollEnabled`

Boolean value that determines whether scrolling is enabled in the `WebView`. The default value is `true`.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | iOS      |

---

### `url`

**Deprecated.** Use the `source` prop instead.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `html`

**Deprecated.** Use the `source` prop instead.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

## Methods

### `extraNativeComponentConfig()`

```javascript
static extraNativeComponentConfig()
```
