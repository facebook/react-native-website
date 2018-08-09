---
id: version-0.56-webview
title: WebView
original_id: webview
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(96.67%), [yahoo.007](https://github.com/search?q=yahoo.007%40163.com+in%3Aemail&type=Users)(3.33%)

`WebView` 创建一个原生的 WebView，可以用于访问一个网页。

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

你可以使用这个组件进行网页的来回导航，并且为网页内容设置多方面的属性。

> **安全提示:** 目前, `onMessage` and `postMessage` 方法不能够指定源。当`WebView`加载某些非预期文档时可能导致跨站脚本攻击。请查阅 MDN 文档获取更多安全方面的细节[`Window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) .

### 查看 Props

* [View props...](view.md#props)

- [`allowsInlineMediaPlayback`](webview.md#allowsinlinemediaplayback)
- [`allowUniversalAccessFromFileURLs`](webview.md#allowUniversalAccessFromFileURLs)
- [`automaticallyAdjustContentInsets`](webview.md#automaticallyadjustcontentinsets)
- [`bounces`](webview.md#bounces)
- [`contentInset`](webview.md#contentinset)
- [`dataDetectorTypes`](webview.md#datadetectortypes)
- [`decelerationRate`](webview.md#decelerationrate)
- [`domStorageEnabled`](webview.md#domstorageenabled)
- [`geolocationEnabled`](webview.md#geolocationenabled)
- [`html`](webview.md#html)
- [`injectedJavaScript`](webview.md#injectedjavascript)
- [`injectJavaScript`](webview.md#injectjavascript)
- [`javaScriptEnabled`](webview.md#javascriptenabled)
- [`mediaPlaybackRequiresUserAction`](webview.md#mediaplaybackrequiresuseraction)
- [`mixedContentMode`](webview.md#mixedcontentmode)
- [`nativeConfig`](webview.md#nativeconfig)
- [`onError`](webview.md#onerror)
- [`onLoad`](webview.md#onload)
- [`onLoadEnd`](webview.md#onloadend)
- [`onLoadStart`](webview.md#onloadstart)
- [`onMessage`](webview.md#onmessage)
- [`onNavigationStateChange`](webview.md#onnavigationstatechange)
- [`onShouldStartLoadWithRequest`](webview.md#onshouldstartloadwithrequest)
- [`originWhitelist`](webview.md#originwhitelist)
- [`renderError`](webview.md#rendererror)
- [`renderLoading`](webview.md#renderloading)
- [`scalesPageToFit`](webview.md#scalespagetofit)
- [`scrollEnabled`](webview.md#scrollenabled)
- [`startInLoadingState`](webview.md#startinloadingstate)
- [`source`](webview.md#source)
- [`style`](webview.md#style)
- [`thirdPartyCookiesEnabled`](webview.md#thirdpartycookiesenabled)
- [`userAgent`](webview.md#useragent)
- [`url`](webview.md#url)

### 查看方法

* [`extraNativeComponentConfig`](webview.md#extranativecomponentconfig)
* [`goForward`](webview.md#goforward)
* [`goBack`](webview.md#goback)
* [`reload`](webview.md#reload)
* [`stopLoading`](webview.md#stoploading)

---

# 文档

## Props

### `allowUniversalAccessFromFileURLs`

Boolean that sets whether JavaScript running in the context of a file scheme URL should be allowed to access content from any origin. Including accessing content from other file scheme URLs. The default value is `false`.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `geolocationEnabled`

Set whether Geolocation is enabled in the `WebView`. The default value is `false`. Used only in Android.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `source`

在 WebView 中载入一段静态的 html 代码或是一个 url（还可以附带一些 header 选项）。

| 类型                                                                                                                | 必填 |
| ------------------------------------------------------------------------------------------------------------------- | ---- |
| object: {uri: string,method: string,headers: object,body: string}, ,object: {html: string,baseUrl: string}, ,number | 否   |

---

### `automaticallyAdjustContentInsets`

控制插入到导航栏，标签栏或者工具条之后的 web 内容是否自适应。默认为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `injectJavaScript`

在网页加载完成之后，还可以主动调用此方法（以 ref 形式调用）继续给 WebView 注入 JS 代码。注入后会立即执行。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `injectedJavaScript`

设置 js 字符串，在网页加载之前注入的一段 JS 代码。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `mediaPlaybackRequiresUserAction`

布尔值，控制 HTML5 音频和视频播放前是否需要用户点击。默认为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `nativeConfig`

覆盖渲染 WebView 的原生组件。启用一个 js 和初始 WebView 一样的定制的原生 WebView。

| 类型                                                       | 必填 |
| ---------------------------------------------------------- | ---- |
| object: {component: any,props: object,viewManager: object} | 否   |

---

### `onError`

当 `WebView`加载失败时调用的函数

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLoad`

当 `WebView`加载成功后执行的函数

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLoadEnd`

函数，当加载结束调用，不管是成功还是失败。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLoadStart`

当 `WebView`刚开始加载时调用的函数

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onMessage`

在 webview 内部的网页中调用 window.postMessage 方法时可以触发此属性对应的函数，从而实现网页和 RN 之间的数据交换。 设置此属性的同时会在 webview 中注入一个 postMessage 的全局函数并覆盖可能已经存在的同名实现。

网页端的 window.postMessage 只发送一个参数 data，此参数封装在 RN 端的 event 对象中，即 event.nativeEvent.data。data 只能是一个字符串。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onNavigationStateChange`

当导航状态发生变化的时候调用。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `renderError`

设置一个函数，返回一个视图用于显示错误。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `renderLoading`

设置一个函数，返回一个加载指示器。。为了使用这个属性必须将 startInLoadingState 属性设置为 true。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `scalesPageToFit`

布尔值，控制网页内容是否自动适配视图的大小，同时启用用户缩放功能。默认为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `onShouldStartLoadWithRequest`

允许为 webview 发起的请求运行一个自定义的处理函数。返回 true 或 false 表示是否要继续执行响应的请求。

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `originWhitelist`

List of origin strings to allow being navigated to. The strings allow wildcards and get matched against _just_ the origin (not the full URL). If the user taps to navigate to a new page but the new page is not in this whitelist, the URL will be handled by the OS. The default whitelisted origins are "http://*" and "https://*".

| 类型             | 必填 |
| ---------------- | ---- |
| array of strings | 否   |

---

### `startInLoadingState`

布尔值，控制`WebView`第一次加载时是否显示加载视图（如指示器）。当设置了`renderLoading`时必须将这个属性设置为`true` 才能正常显示。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `style`

设置 `WebView`的样式。

| 类型       | 必填 |
| ---------- | ---- |
| View.style | 否   |

---

### `decelerationRate`

指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如"normal"和"fast"，分别对应 UIScrollViewDecelerationRateNormal 和 UIScrollViewDecelerationRateFast。

* normal: 0.998
* fast: 0.99 (ios web view 默认)

| 类型                                  | 必填 | 平台 |
| ------------------------------------- | ---- | ---- |
| ScrollView.propTypes.decelerationRate | 否   | iOS  |

---

### `domStorageEnabled`

仅限 Android 平台。指定是否开启 DOM 本地存储。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `javaScriptEnabled`

布尔值，控制是否启用 JavaScript。仅在安卓下使用，因为 IOS 默认为启用 JavaScript。默认值为`true`。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `mixedContentMode`

指定混合内容模式。即 WebView 是否应该允许安全链接（https）页面中加载非安全链接（http）的内容,

* 'never' (默认) - WebView 不允许安全链接页面中加载非安全链接的内容
* 'always' - WebView 允许安全链接页面中加载非安全链接的内容。
* 'compatibility' - WebView 会尽量和浏览器当前对待此情况的行为一致

| 类型                                     | 必填 | 平台    |
| ---------------------------------------- | ---- | ------- |
| enum('never', 'always', 'compatibility') | 否   | Android |

---

### `thirdPartyCookiesEnabled`

布尔值，是否启用第三方 cookie。仅在安卓 Lollipop 版本或以上使用，因为安卓 Kitkat 以下版本和 IOS 系统默认都启用第三方 cookie。 默认为 `true`。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `userAgent`

设置 `WebView`的 user agent 字符串。目前仅支持 Android。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

---

### `allowsInlineMediaPlayback`

布尔值，控制 HTML5 视频是在内部播放(非全屏)还是使用原生的全屏控制器。默认为 `false`。

**注意** : 为了确保内联播放，除了这个属性需要被设置成`true`, 在 html 代码中视频元素也需要包含 `webkit-playsinline`属性。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `bounces`

布尔值，控制当 webview 内容到达底部时是否进行回弹。默认为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `contentInset`

webview 插入到滑动视图时距离边缘的距离。默认为`{top: 0, left: 0, bottom: 0, right: 0}`。

| 类型                                                               | 必填 | 平台 |
| ------------------------------------------------------------------ | ---- | ---- |
| object: {top: number, left: number, bottom: number, right: number} | 否   | iOS  |

---

### `dataDetectorTypes`

检测 webview 内容，并将指定类型的数据变成可点击的 URL。默认只对手机号码进行变换。

你可以提供单一类型或者数组类型。

可用的 `dataDetectorTypes` 如下:

* `'phoneNumber'`
* `'link'`
* `'address'`
* `'calendarEvent'`
* `'none'`
* `'all'`

| 类型                                                                                                                                                     | 必填 | 平台 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') | 否   | iOS  |

---

### `scrollEnabled`

控制是否在 `WebView`中启用滑动。默认为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `url`

**已过期.** 请使用 `source` 属性代替.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `html`

**已过期.** 请使用 `source` 属性代替.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

## 方法

### `extraNativeComponentConfig()`

```javascript
static extraNativeComponentConfig()
```

### `goForward()`

```javascript
goForward();
```

Go forward one page in the web view's history.

### `goBack()`

```javascript
goBack();
```

Go back one page in the web view's history.

### `reload()`

```javascript
reload();
```

Reloads the current page.

### `stopLoading()`

```javascript
stopLoading();
```

Stop loading the current page.

[1]: https://github.com/facebook/react-native/commit/da9a712a9e17942dcd05b8d955f0764c2026a4ad
