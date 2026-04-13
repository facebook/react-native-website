---
id: linking
title: Linking
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Linking`提供了一个通用的接口来与传入和传出的 App 链接进行交互。

每个链接(URL)都有一个 URL Scheme，有些网站以 `https://` 或 `http://` 为前缀，而 `http` 就是 URL Scheme。我们简称它为 scheme。

除了 `https`，你可能还熟悉 `mailto` scheme。当您打开带有 mailto scheme 的链接时，操作系统将打开已安装的邮件应用程序。同样，也有打电话和发短信的 schemes。阅读下面关于[内置 URL schemes](#built-in-url-schemes) 方案的更多信息。

与使用 mailto scheme 一样，可以通过使用自定义 url scheme 链接到其他应用程序。例如，当你收到一封来自 Slack 的 **Magic Link** 邮件时，**Launch Slack** 按钮是一个 anchor 标记，带有一个 href，看起来类似与 `slack://secret/magic-login/other-secret`。就像 Slack 一样，你可以告诉操作系统你想要处理一个自定义 scheme。当 Slack 应用程序打开时，它会接收用于打开它的 URL。这通常被称为 Deep Links。阅读更多关于如何[获得 Deep Links](#get-the-deep-link) 到你的应用程序。

自定义 URL scheme 并不是在手机上打开应用程序的唯一方式。您不希望在电子邮件中的链接中使用自定义 URL scheme，因为这样链接在桌面上就会断开。相反，你想使用常规的 `https` 链接，如 `https://www.myapp.io/records/1234546`。在移动设备上，你希望这个链接打开你的应用程序。Android 称之为 **Deep Links** (Universal Links - iOS)。

### 内置 URL Schemes

正如在介绍中提到的，每个平台上都存在一些核心功能的 URL schemes。以下是一个非详尽的列表，但涵盖了最常用的方案。

| Scheme           | 说明                                         | iOS | Android |
| ---------------- | -------------------------------------------- | --- | ------- |
| `mailto`         | 打开 mail app, 例如: mailto: support@expo.io | ✅  | ✅      |
| `tel`            | 打开 phone app, 例如: tel:+123456789         | ✅  | ✅      |
| `sms`            | 打开 SMS app, 例如: sms:+123456789           | ✅  | ✅      |
| `https` / `http` | 打开 web browser app, 例如: https://expo.io  | ✅  | ✅      |

### 基本用法

### 启用 Deep Links

<div className="banner-native-code-required">
  <h3>仅适用于非沙盒项目</h3>
  <p>
    以下部分仅适用于 Native 项目。如果您正在使用 Expo 工作流，请参阅 Expo 文档中 <a href="https://docs.expo.dev/guides/linking/">Linking</a> 的指南，以获取正确替代方案。
  </p>
</div>

如果你想在你的应用程序中启用 Deep Links，请遵循以下指南：

<Tabs groupId="syntax" queryString defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

:::info
要了解更多如何在 Android 上支持深度链接的说明，请参阅[Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](https://developer.android.com/training/app-indexing/deep-linking.html#adding-filters)。
:::

如果要在现有的 MainActivity 中监听传入的 intent，那么需要在`AndroidManifest.xml`中将 MainActivity 的`launchMode`设置为`singleTask`。相关解释可参考[`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element.html)文档。

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

</TabItem>
<TabItem value="ios">

:::note
对于 iOS 来说，如果要在 App 启动后也监听传入的 App 链接，那么首先需要按照[步骤 3](linking-libraries-ios#step-3)中的说明将`LinkingIOS`文件夹添加到头文件搜索路径中。如果还想在 App 运行期间监听传入的 App 链接，那么需要在`*AppDelegate.m`中增加以下代码：

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```objc title="AppDelegate.mm"
// iOS 9.x 或更高版本
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

如果你的 app 用了 [Universal Links](https://developer.apple.com/ios/universal-links/)，需要正确的把下述代码添加进去：

```objc title="AppDelegate.mm"
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```

</TabItem>
<TabItem value="swift">

```swift title="AppDelegate.swift"
override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
  return RCTLinkingManager.application(app, open: url, options: options)
}
```

如果你的 app 用了 [Universal Links](https://developer.apple.com/ios/universal-links/)，需要正确的把下述代码添加进去：

```swift title="AppDelegate.swift"
override func application(
  _ application: UIApplication,
  continue userActivity: NSUserActivity,
  restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return RCTLinkingManager.application(
      application,
      continue: userActivity,
      restorationHandler: restorationHandler
    )
  }
```

</TabItem>
</Tabs>

:::

### 处理 Deep Links

有两种方法来处理打开应用程序的 URL。

#### 1. 如果应用程序已经打开，应用程序就会出现在前台，并触发一个链接 'url' 事件

你可以用 `Linking.addEventListener('url', callback)` 来处理这些事件——它使用链接的 URL 调用 `callback({ url })`

#### 2. 如果应用程序还没有打开，它就会被打开，并将 url 作为 initialURL 传入

你可以用 `Linking.getInitialURL()` 来处理这些事件——它会返回一个解析到 URL 的 Promise (如果有的话)。

---

## 示例

### Open Links and Deep Links (Universal Links)

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=js
import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

const OpenURLButton = ({url, children}) => {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=tsx
import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

### Open Custom Settings

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=js
import React, {useCallback} from 'react';
import {Button, Linking, StyleSheet, View} from 'react-native';

const OpenSettingsButton = ({children}) => {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=tsx
import React, {useCallback} from 'react';
import {Button, Linking, StyleSheet, View} from 'react-native';

type OpenSettingsButtonProps = {
  children: string;
};

const OpenSettingsButton = ({children}: OpenSettingsButtonProps) => {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

### 获取 Deep Link

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=js
import React, {useState, useEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
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
  }, []);

  return {url, processing};
};

const App = () => {
  const {url: initialUrl, processing} = useInitialURL();

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? 'Processing the initial url from a deep link'
          : `The deep link is: ${initialUrl || 'None'}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=tsx
import React, {useState, useEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
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
  }, []);

  return {url, processing};
};

const App = () => {
  const {url: initialUrl, processing} = useInitialURL();

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? 'Processing the initial url from a deep link'
          : `The deep link is: ${initialUrl || 'None'}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

### 发送 Intents (Android)

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=android&ext=js
import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const SendIntentButton = ({action, extras, children}) => {
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
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'com.facebook.katana',
          },
        ]}>
        App Notification Settings
      </SendIntentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&ext=tsx
import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

type SendIntentButtonProps = {
  action: string;
  children: string;
  extras?: Array<{
    key: string;
    value: string | number | boolean;
  }>;
};

const SendIntentButton = ({
  action,
  extras,
  children,
}: SendIntentButtonProps) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e: any) {
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
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'com.facebook.katana',
          },
        ]}>
        App Notification Settings
      </SendIntentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

# 文档

## 方法

### `addEventListener()`

```tsx
static addEventListener(
  type: 'url',
  handler: (event: {url: string}) => void,
): EmitterSubscription;
```

通过监听 `url` 事件类型并提供处理程序，为链接更改添加处理程序。

---

### `canOpenURL()`

```tsx
static canOpenURL(url: string): Promise<boolean>;
```

判断设备上是否有已经安装的应用可以处理指定的 URL。

本方法会返回一个`Promise`对象。当确定传入的 URL 可以被处理时，promise 就会返回，值的第一个参数是表示是否可以打开 URL。

如果无法检查 URL 是否可以打开，或者当目标为 Android 11 (SDK 30) 平台且您没有在 `AndroidManifest.xml` 中指定相关的 intent queries，则 `Promise` 将在 Android 上拒绝。类似地，在 iOS 上，如果你没有在 `Info.plist` 中的 `LSApplicationQueriesSchemes` 键中添加特定的 scheme，`Promise` 将被拒绝（见下文）。

**参数:**

| 名称                                                     | 类型   | 说明           |
| -------------------------------------------------------- | ------ | -------------- |
| url <div className="label basic required">Required</div> | string | 要打开的 URL。 |

:::note
对于 web 链接来说，协议头(`"http://"`, `"https://"`)不能省略！
:::

:::warning
此方法在 iOS 9+ 上有限制。根据[Apple 官方文档](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl)：

- 如果你的 app 链接了早期版本的 iOS 但运行在 iOS 9.0 或更高版本上，你可以调用此方法最多 50 次。达到该限制后，后续调用将始终解析为`false`。如果用户重新安装或升级 app，iOS 会重置该限制。
- 从 iOS 9 开始，你的 app 还需要在`Info.plist`中提供`LSApplicationQueriesSchemes`键，否则`canOpenURL()`将始终解析为`false`。
  :::

:::info
当目标为 Android 11 (SDK 30) 时，你必须在`AndroidManifest.xml`中指定要处理的 scheme 的 intent。可以在[这里](https://developer.android.com/guide/components/intents-common)找到常见 intent 的列表。

例如，要处理`https` scheme，需要在 manifest 中添加以下内容：

```
<manifest ...>
  <queries>
    <intent>
      <action android:name="android.intent.action.VIEW" />
      <data android:scheme="https"/>
    </intent>
  </queries>
</manifest>
```

:::

---

### `getInitialURL()`

```tsx
static getInitialURL(): Promise<string | null>;
```

If the app launch was triggered by an app link, it will give the link url, otherwise it will give `null`.

:::info
要支持 Android 上的深度链接，请参考 https://developer.android.com/training/app-indexing/deep-linking.html#handling-intents。
:::

:::tip
`getInitialURL` 在远程 JS 调试时可能返回`null`。请关闭调试器以确保能正常获取。
:::

---

### `openSettings()`

```tsx
static openSettings(): Promise<void>;
```

Open the Settings app and displays the app’s custom settings, if it has any.

---

### `openURL()`

```tsx
static openURL(url: string): Promise<any>;
```

Try to open the given `url` with any of the installed apps.

You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386" on Android or "https://maps.apple.com/?ll=37.484847,-122.148386" on iOS), a contact, or any other URL that can be opened with the installed apps.

The method returns a `Promise` object. If the user confirms the open dialog or the url automatically opens, the promise is resolved. If the user cancels the open dialog or there are no registered applications for the url, the promise is rejected.

**参数:**

| 名称                                                     | 类型   | 说明           |
| -------------------------------------------------------- | ------ | -------------- |
| url <div className="label basic required">Required</div> | string | 要打开的 URL。 |

:::note
如果系统不知道如何打开指定的 URL，此方法将失败。如果传入的是非 http(s) URL，最好先检查`canOpenURL()`。

对于 web URL，协议（`"http://"`、`"https://"`）必须相应设置！
:::

:::warning
此方法在模拟器中的行为可能不同，例如`"tel:"`链接在 iOS 模拟器中无法处理，因为没有拨号器 app。
:::

---

### `sendIntent()` <div className="label android">Android</div>

```tsx
static sendIntent(
  action: string,
  extras?: Array<{key: string; value: string | number | boolean}>,
): Promise<void>;
```

启动 Android intent 时携带 extras。

**参数:**

| 名称                                                        | 类型                                                       |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| action <div className="label basic required">Required</div> | string                                                     |
| extras                                                      | `Array<{key: string, value: string ｜ number ｜ boolean}>` |
