---
id: webview
title: WebView
---

`WebView` 创建一个原生的WebView，可以用于访问一个网页

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


> **安全提示:** 目前, `onMessage` and `postMessage` 方法不能够指定源。当`WebView`加载某些非预期文档时可能导致跨站脚本攻击。请查阅MDN文档获取更多安全方面的细节 [`Window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) .

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

## 属性

### `source`

在WebView中载入一段静态的html代码或是一个url（还可以附带一些header选项）。

| 类型                                                                                                                | 必填 |
| ------------------------------------------------------------------------------------------------------------------- | ---- |
| object: {uri: string,method: string,headers: object,body: string}, ,object: {html: string,baseUrl: string}, ,number | 否   |

---

### `automaticallyAdjustContentInsets`

控制插入到导航栏，标签栏或者工具条之后的web内容是否自适应。默认为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `injectJavaScript`

在网页加载完成之后，还可以主动调用此方法（以ref形式调用）继续给WebView注入JS代码。注入后会立即执行。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `injectedJavaScript`

设置js字符串，在网页加载之前注入的一段JS代码。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `mediaPlaybackRequiresUserAction`

布尔值，控制HTML5音频和视频播放前是否需要用户点击。默认为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `nativeConfig`


覆盖渲染WebView的原生组件。启用一个js和初始WebView一样的定制的原生WebView。

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

在webview内部的网页中调用window.postMessage方法时可以触发此属性对应的函数，从而实现网页和RN之间的数据交换。 设置此属性的同时会在webview中注入一个postMessage的全局函数并覆盖可能已经存在的同名实现。

网页端的window.postMessage只发送一个参数data，此参数封装在RN端的event对象中，即event.nativeEvent.data。data 只能是一个字符串。

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

设置一个函数，返回一个加载指示器。。为了使用这个属性必须将startInLoadingState 属性设置为true。

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

### `initialScale`

数值，控制初始视图比例。50代表50%，100代表100%。仅在安卓下使用

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

---

### `onShouldStartLoadWithRequest`


允许为webview发起的请求运行一个自定义的处理函数。返回true或false表示是否要继续执行响应的请求。

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `startInLoadingState`


布尔值，控制`WebView`第一次加载时是否显示加载视图（如指示器）。当设置了`renderLoading`时必须将这个属性设置为`true` 才能正常显示。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `style`

设置 `WebView`的style.

| 类型       | 必填 |
| ---------- | ---- |
| View.style | 否   |

---

### `decelerationRate`

指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如"normal"和"fast"，分别对应UIScrollViewDecelerationRateNormal 和UIScrollViewDecelerationRateFast。

* normal: 0.998
* fast: 0.99 (ios web view默认)

| 类型                                  | 必填 | 平台 |
| ------------------------------------- | ---- | ---- |
| ScrollView.propTypes.decelerationRate | 否   | iOS  |

---

### `domStorageEnabled`

仅限Android平台。指定是否开启DOM本地存储。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `javaScriptEnabled`

布尔值，控制是否启用JavaScript。仅在安卓下使用，因为IOS默认为启用JavaScript。默认值为`true`。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `mixedContentMode`

指定混合内容模式。即WebView是否应该允许安全链接（https）页面中加载非安全链接（http）的内容,

* 'never' (默认) - WebView不允许安全链接页面中加载非安全链接的内容
* 'always' - WebView允许安全链接页面中加载非安全链接的内容。
* 'compatibility' - WebView会尽量和浏览器当前对待此情况的行为一致


| 类型                                     | 必填 | 平台    |
| ---------------------------------------- | ---- | ------- |
| enum('never', 'always', 'compatibility') | 否   | Android |

---

### `thirdPartyCookiesEnabled`

布尔值，是否启用第三方cookie。仅在安卓Lollipop版本或以上使用，因为安卓Kitkat以下版本和IOS系统默认都启用第三方cookie。 默认为 `true`。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `userAgent`

设置 `WebView`安卓的用户代理.

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

---

### `allowsInlineMediaPlayback`

布尔值，控制HTML5视频是在内部播放(非全屏)还是使用原生的全屏控制器。默认为 `false`。

**注意** : 为了确保内联播放，除了这个属性需要被设置成`true`, 在html代码中视频元素也需要包含 `webkit-playsinline`属性。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `bounces`

布尔值，控制当webview内容到达底部时是否进行回弹。默认为 `true`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `contentInset`

webview插入到滑动视图时距离边缘的距离。默认为{top: 0, left: 0, bottom: 0, right: 0}

| 类型                                                               | 必填 | 平台 |
| ------------------------------------------------------------------ | ---- | ---- |
| object: {top: number, left: number, bottom: number, right: number} | 否   | iOS  |

---

### `dataDetectorTypes`

检测webview内容，并将指定类型的数据变成可点击的URL。默认只对手机号码进行变换。

你可以提供单一类型或者数组类型

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

## Methods

### `extraNativeComponentConfig()`

```javascript
static extraNativeComponentConfig()
```


  [1]: https://github.com/facebook/react-native/commit/da9a712a9e17942dcd05b8d955f0764c2026a4ad