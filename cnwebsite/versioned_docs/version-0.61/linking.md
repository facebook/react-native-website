---
id: version-0.61-linking
title: Linking
original_id: linking
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(98.25%), [kt.tian](https://github.com/search?q=kt.tian%40gmail.com+in%3Aemail&type=Users)(1.75%)

<div class="banner-crna-ejected">
  <h3>仅用在原生代码的项目</h3>
  <p>
    本节仅适用于使用 <code>react-native init</code> 或使用 Create React Native App 创建的项目，这些项目已经弹出。 有关"弹出"的详细信息，请参阅 Create React Native App 代码库中的<a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">指南</a>。
  </p>
</div>

`Linking`提供了一个通用的接口来与传入和传出的 App 链接进行交互。

### 基本用法

#### 处理链接

如果你的应用被其注册过的外部 url 调起，则可以在任何组件内这样获取和处理它：

```
componentDidMount() {
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}
```

> 要了解更多如何在 Android 上支持深度链接的说明，请参阅[Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters).

如果要在现有的 MainActivity 中监听传入的 intent，那么需要在`AndroidManifest.xml`中将 MainActivity 的`launchMode`设置为`singleTask`。相关解释可参考[`<activity>`](http://developer.android.com/guide/topics/manifest/activity-element.html)文档。

```
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

注： 对于 iOS 来说，如果要在 App 启动后也监听传入的 App 链接，那么首先需要在项目中链接`RCTLinking`，具体步骤请参考[手动链接](linking-libraries-ios.html#手动链接)这篇文档，然后需要在`AppDelegate.m`中增加以下代码：

```
// iOS 9.x 或更高版本
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

```
// iOS 8.x 或更低版本
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

如果你的 app 用了 [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)，需要正确的把下述代码添加进去：

```
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
  restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```

然后你的 React 组件就可以监听`Linking`的相关事件：

```
componentDidMount() {
  Linking.addEventListener('url', this._handleOpenURL);
},
componentWillUnmount() {
  Linking.removeEventListener('url', this._handleOpenURL);
},
_handleOpenURL(event) {
  console.log(event.url);
}
```

#### 打开外部链接

要启动一个链接相对应的应用（打开浏览器、邮箱或者其它的应用），只需调用：

```
Linking.openURL(url).catch(err => console.error('An error occurred', err));
```

如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法：

```
Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
}).catch(err => console.error('An error occurred', err));
```

---

# 文档

## 方法

### `constructor()`

```jsx
constructor();
```

---

### `addEventListener()`

```jsx
addEventListener(type, handler);
```

添加一个监听 Linking 变化的事件。type 参数应填`url`，并提供一个处理函数。

---

### `removeEventListener()`

```jsx
removeEventListener(type, handler);
```

删除一个事件处理函数。type 参数应填`url`。

---

### `openURL()`

```jsx
openURL(url);
```

尝试使用设备上已经安装的应用打开指定的`url`。

你还可以使用其他类型的 URL，比如一个地理位置（形如"geo:37.484847,-122.148386"或是一个通讯录名片，只要是可以通过已安装的应用打开的即可。

本方法会返回一个`Promise`对象。如果用户在弹出的对话框中点击了确认或是 url 自动打开了，则 promise 成功完成。如果用户在弹出的对话框中点击取消或是没有对应应用可以处理此类型的 url，则 promise 会失败。

**参数：**

| 名称 | 类型   | 必填 | 说明         |
| ---- | ------ | ---- | ------------ |
| url  | string | 是   | 要打开的 URL |

> 如果系统不知道如何处理给定的 URL，则此方法会调用失败。如果你传入的 URL 不是一个 http 链接，则最好先通过{@code canOpenURL}方法检查一下。

> 对于 web 链接来说，协议头("http://", "https://")不能省略！

---

### `canOpenURL()`

```jsx
canOpenURL(url);
```

判断设备上是否有已经安装的应用可以处理指定的 URL。

本方法会返回一个`Promise`对象。当确定传入的 URL 可以被处理时，promise 就会返回，值的第一个参数是表示是否可以打开 URL。

The `Promise` will reject on Android if it was impossible to check if the URL can be opened, and on iOS if you didn't add the specific scheme in the `LSApplicationQueriesSchemes` key inside `Info.plist` (see bellow).

**参数：**

| 名称 | 类型   | 必填 | 说明         |
| ---- | ------ | ---- | ------------ |
| url  | string | 是   | 要打开的 URL |

> 对于 web 链接来说，协议头("http://", "https://")不能省略！

> 对于 iOS 9 来说，你需要在`Info.plist`中添加`LSApplicationQueriesSchemes`字段，否则`canOpenURL`可能一直返回 false。

> This method has limitations on iOS 9+. From [the official Apple documentation](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl):

> If your app is linked against an earlier version of iOS but is running in iOS 9.0 or later, you can call this method up to 50 times. After reaching that limit, subsequent calls always return false. If the user reinstalls or upgrades the app, iOS resets the limit.

---

### `openSettings()`

 ```jsx
openSettings();
```

Open the Settings app and displays the app’s custom settings, if it has any.

---

### `getInitialURL()`

```jsx
getInitialURL();
```

如果应用是被一个链接调起的，则会返回相应的链接地址。否则它会返回`null`。

> 如果要在 Android 上支持深度链接，请参阅<http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents>

---

### `sendIntent()`

```jsx
sendIntent(action: string, extras?: Array<{key: string, value: string | number | boolean}>)
```

> @platform android
**Android-Only.** Launch an Android intent with extras (optional)