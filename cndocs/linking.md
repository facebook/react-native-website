---
id: linking
title: Linking
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>仅适用于非沙盒项目</h3>
  <p>
    The following section only applies to projects with native code exposed. If you are using the managed <code>expo-cli</code> workflow, see the guide on <a href="http://docs.expo.io/versions/latest/workflow/linking/">Linking</a> in the Expo documentation for the appropriate alternative.
  </p>
</div>

`Linking`提供了一个通用的接口来与传入和传出的 App 链接进行交互。

Every Link (URL) has a URL Scheme, some websites are prefixed with `https://` or `http://` and the `http` is the URL Scheme. Let's call it scheme for short.

In addition to `https`, you're likely also familiar with the `mailto` scheme. When you open a link with the mailto scheme, your operating system will open an installed mail application. Similarly, there are schemes for making phone calls and sending SMS. Read more about [built-in URL](#built-in-url-schemes) schemes below.

Like using the mailto scheme, it's possible to link to other applications by using custom url schemes. For example, when you get a **Magic Link** email from Slack, the **Launch Slack** button is an anchor tag with an href that looks something like: `slack://secret/magic-login/other-secret`. Like with Slack, you can tell the operating system that you want to handle a custom scheme. When the Slack app opens, it receives the URL that was used to open it. This is often referred to as deep linking. Read more about how to [get the deep link](#get-the-deep-link) into your app.

Custom URL scheme isn't the only way to open your application on mobile. You don't want to use a custom URL scheme in links in the email because then the links would be broken on desktop. Instead, you want to use a regular `https` links such as `https://www.myapp.io/records/1234546`. and on mobile you want that link open your app. Android calls it **Deep Links** (Universal Links - iOS).

### Built-in URL Schemes

As mentioned in the introduction, there are some URL schemes for core functionality that exist on every platform. The following is a non-exhaustive list, but covers the most commonly used schemes.

| Scheme           | 说明                                       | iOS | Android |
| ---------------- | ------------------------------------------ | --- | ------- |
| `mailto`         | Open mail app, eg: mailto: support@expo.io | ✅  | ✅      |
| `tel`            | Open phone app, eg: tel:+123456789         | ✅  | ✅      |
| `sms`            | Open SMS app, eg: sms:+123456789           | ✅  | ✅      |
| `https` / `http` | Open web browser app, eg: https://expo.io  | ✅  | ✅      |

### 基本用法

### 启用 Deep Links

If you want to enable deep links in your app, please the below guide:

<Tabs groupId="syntax" defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

> 要了解更多如何在 Android 上支持深度链接的说明，请参阅[Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters).

如果要在现有的 MainActivity 中监听传入的 intent，那么需要在`AndroidManifest.xml`中将 MainActivity 的`launchMode`设置为`singleTask`。相关解释可参考[`<activity>`](http://developer.android.com/guide/topics/manifest/activity-element.html)文档。

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

</TabItem>
<TabItem value="ios">

> **注意：** 对于 iOS 来说，如果要在 App 启动后也监听传入的 App 链接，那么首先需要在项目中链接`RCTLinking`，具体步骤请参考[手动链接](linking-libraries-ios.html#手动链接)这篇文档，然后需要在`AppDelegate.m`中增加以下代码：

```objectivec
// iOS 9.x 或更高版本
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

```objectivec
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

```objectivec
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```

</TabItem>
</Tabs>

### 处理 Deep Links

There are two ways to handle URLs that open your app.

#### 1. If the app is already open, the app is foregrounded and a Linking 'url' event is fired

You can handle these events with `Linking.addEventListener('url', callback)` -- it calls `callback({ url })` with the linked URL

#### 2. If the app is not already open, it is opened and the url is passed in as the initialURL

You can handle these events with `Linking.getInitialURL()` -- it returns a Promise that resolves to the URL, if there is one.

---

## 示例

### Open Links and Deep Links (Universal Links)

```SnackPlayer name=Linking%20Function%20Component%20Example&supportedPlatforms=ios,android
import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";

const supportedURL = "https://google.com";

const unsupportedURL = "slack://open?team=123456";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default App;
```

### Open Custom Settings

```SnackPlayer name=Linking%20Function%20Component%20Example&supportedPlatforms=ios,android
import React, { useCallback } from "react";
import { Button, Linking, StyleSheet, View } from "react-native";

const OpenSettingsButton = ({ children }) => {
  const handlePress = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <OpenSettingsButton>Open Settings</OpenSettingsButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default App;
```

### 获取 Deep Link

```SnackPlayer name=Linking%20Function%20Component%20Example&supportedPlatforms=ios,android
import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return { url, processing };
};

const App = () => {
  const { url: initialUrl, processing } = useInitialURL();

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? `Processing the initial url from a deep link`
          : `The deep link is: ${initialUrl || "None"}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default App;
```

### 发送 Intents (Android)

```SnackPlayer name=Linking%20Function%20Component%20Example&supportedPlatforms=android
import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";

const SendIntentButton = ({ action, extras, children }) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e) {
      Alert.alert(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
        Power Usage Summary
      </SendIntentButton>
      <SendIntentButton
        action="android.settings.APP_NOTIFICATION_SETTINGS"
        extras={[
          { "android.provider.extra.APP_PACKAGE": "com.facebook.katana" },
        ]}
      >
        App Notification Settings
      </SendIntentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default App;
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

> This method may behave differently in a simulator e.g. "tel:" links are not able to be handled in the iOS simulator as there's no access to the dialer app.

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

> getInitialURL may return `null` while debugging is enabled. Disable the debugger to ensure it gets passed.

---

### `sendIntent()`

```jsx
sendIntent(action: string, extras?: Array<{key: string, value: string | number | boolean}>)
```

> @platform android **Android-Only.** Launch an Android intent with extras (optional)
