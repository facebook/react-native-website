---
id: linking
title: Linking
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>Projects with Native Code Only</h3>
  <p>
    The following section only applies to projects with native code exposed. If you are using the managed <code>expo-cli</code> workflow, see the guide on <a href="http://docs.expo.io/versions/latest/workflow/linking/">Linking</a> in the Expo documentation for the appropriate alternative.
  </p>
</div>

`Linking` gives you a general interface to interact with both incoming and outgoing app links.

Every Link (URL) has a URL Scheme, some websites are prefixed with `https://` or `http://` and the `http` is the URL Scheme. Let's call it scheme for short.

In addition to `https`, you're likely also familiar with the `mailto` scheme. When you open a link with the mailto scheme, your operating system will open an installed mail application. Similarly, there are schemes for making phone calls and sending SMS. Read more about [built-in URL](#built-in-url-schemes) schemes below.

Like using the mailto scheme, it's possible to link to other applications by using custom url schemes. For example, when you get a **Magic Link** email from Slack, the **Launch Slack** button is an anchor tag with an href that looks something like: `slack://secret/magic-login/other-secret`. Like with Slack, you can tell the operating system that you want to handle a custom scheme. When the Slack app opens, it receives the URL that was used to open it. This is often referred to as deep linking. Read more about how to [get the deep link](#get-the-deep-link) into your app.

Custom URL scheme isn't the only way to open your application on mobile. You don't want to use a custom URL scheme in links in the email because then the links would be broken on desktop. Instead, you want to use a regular `https` links such as `https://www.myapp.io/records/1234546`. and on mobile you want that link open your app. Android calls it **Deep Links** (Universal Links - iOS).

### Built-in URL Schemes

As mentioned in the introduction, there are some URL schemes for core functionality that exist on every platform. The following is a non-exhaustive list, but covers the most commonly used schemes.

| Scheme           | Description                                | iOS | Android |
| ---------------- | ------------------------------------------ | --- | ------- |
| `mailto`         | Open mail app, eg: mailto: support@expo.io | ✅  | ✅      |
| `tel`            | Open phone app, eg: tel:+123456789         | ✅  | ✅      |
| `sms`            | Open SMS app, eg: sms:+123456789           | ✅  | ✅      |
| `https` / `http` | Open web browser app, eg: https://expo.io  | ✅  | ✅      |

### Enabling Deep Links

If you want to enable deep links in your app, please read the below guide:

<Tabs groupId="syntax" defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

> For instructions on how to add support for deep linking on Android, refer to [Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters).

If you wish to receive the intent in an existing instance of MainActivity, you may set the `launchMode` of MainActivity to `singleTask` in `AndroidManifest.xml`. See [`<activity>`](http://developer.android.com/guide/topics/manifest/activity-element.html) documentation for more information.

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

</TabItem>
<TabItem value="ios">

> **NOTE:** On iOS, you'll need to add the `LinkingIOS` folder into your header search paths as described in step 3 [here](linking-libraries-ios#step-3). If you also want to listen to incoming app links during your app's execution, you'll need to add the following lines to your `*AppDelegate.m`:

```objectivec
// iOS 9.x or newer
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

If you're targeting iOS 8.x or older, you can use the following code instead:

```objectivec
// iOS 8.x or older
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

If your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html), you'll need to add the following code as well:

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

### Handling Deep Links

There are two ways to handle URLs that open your app.

#### 1. If the app is already open, the app is foregrounded and a Linking 'url' event is fired

You can handle these events with `Linking.addEventListener('url', callback)` - it calls `callback({ url })` with the linked URL

#### 2. If the app is not already open, it is opened and the url is passed in as the initialURL

You can handle these events with `Linking.getInitialURL()` - it returns a Promise that resolves to the URL, if there is one.

---

## Example

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

### Get the Deep Link

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

### Send Intents (Android)

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

# Reference

## Methods

### `addEventListener()`

```jsx
addEventListener(type, handler);
```

Add a handler to Linking changes by listening to the `url` event type and providing the handler.

---

### `canOpenURL()`

```jsx
canOpenURL(url);
```

Determine whether or not an installed app can handle a given URL.

The method returns a `Promise` object. When it is determined whether or not the given URL can be handled, the promise is resolved and the first parameter is whether or not it can be opened.

The `Promise` will reject on Android if it was impossible to check if the URL can be opened or when targetting Android 11 (SDK 30) if you didn't specify the relevant intent queries in `AndroidManifest.xml`. Similarly on iOS, the promise will reject if you didn't add the specific scheme in the `LSApplicationQueriesSchemes` key inside `Info.plist` (see bellow).

**Parameters:**

| Name                                                     | Type   | Description      |
| -------------------------------------------------------- | ------ | ---------------- |
| url <div className="label basic required">Required</div> | string | The URL to open. |

> For web URLs, the protocol (`"http://"`, `"https://"`) must be set accordingly!

> This method has limitations on iOS 9+. From [the official Apple documentation](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl):
>
> - If your app is linked against an earlier version of iOS but is running in iOS 9.0 or later, you can call this method up to 50 times. After reaching that limit, subsequent calls always return false. If the user reinstalls or upgrades the app, iOS resets the limit.
>
> As of iOS 9, your app also needs to provide the `LSApplicationQueriesSchemes` key inside `Info.plist` or `canOpenURL()` will always return `false`.

> When targeting Android 11 (SDK 30) you must specify the intents for the schemes you want to handle in `AndroidManifest.xml`. A list of common intents can be found [here](https://developer.android.com/guide/components/intents-common).
>
> For example to handle `https` schemes the following needs to be added to your manifest:
>
> ```
> <manifest ...>
>     <queries>
>         <intent>
>             <action android:name="android.intent.action.VIEW" />
>             <data android:scheme="https"/>
>         </intent>
>     </queries>
> </manifest>
> ```

---

### `getInitialURL()`

```jsx
getInitialURL();
```

If the app launch was triggered by an app link, it will give the link url, otherwise it will give `null`.

> To support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents

> getInitialURL may return `null` while debugging is enabled. Disable the debugger to ensure it gets passed.

---

### `openSettings()`

```jsx
openSettings();
```

Open the Settings app and displays the app’s custom settings, if it has any.

---

### `openURL()`

```jsx
openURL(url);
```

Try to open the given `url` with any of the installed apps.

You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386" on Android or "http://maps.apple.com/?ll=37.484847,-122.148386" on iOS), a contact, or any other URL that can be opened with the installed apps.

The method returns a `Promise` object. If the user confirms the open dialog or the url automatically opens, the promise is resolved. If the user cancels the open dialog or there are no registered applications for the url, the promise is rejected.

**Parameters:**

| Name                                                     | Type   | Description      |
| -------------------------------------------------------- | ------ | ---------------- |
| url <div className="label basic required">Required</div> | string | The URL to open. |

> This method will fail if the system doesn't know how to open the specified URL. If you're passing in a non-http(s) URL, it's best to check `canOpenURL()` first.

> For web URLs, the protocol (`"http://"`, `"https://"`) must be set accordingly!

> This method may behave differently in a simulator e.g. `"tel:"` links are not able to be handled in the iOS simulator as there's no access to the dialer app.

---

### `removeEventListener()`

```jsx
removeEventListener(type, handler);
```

> **Deprecated.** Use the `remove()` method on the event subscription returned by [`addEventListener()`](#addeventlistener).

---

### `sendIntent()` <div class="label android">Android</div>

```jsx
sendIntent(action, extras);
```

Launch an Android intent with extras.

**Parameters:**

| Name                                                        | Type                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| action <div className="label basic required">Required</div> | string                                                       |
| extras                                                      | array of `{key: string, value: string \| number \| boolean}` |
