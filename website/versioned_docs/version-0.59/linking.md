---
id: version-0.59-linking
title: Linking
original_id: linking
---

<div class="banner-crna-ejected">
  <h3>Projects with Native Code Only</h3>
  <p>
    This section only applies to projects made with <code>react-native init</code>
    or to those made with <code>expo init</code> or Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

`Linking` gives you a general interface to interact with both incoming and outgoing app links.

### Basic Usage

#### Handling deep links

If your app was launched from an external url registered to your app you can access and handle it from any component you want with

```jsx
componentDidMount() {
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}
```

> For instructions on how to add support for deep linking on Android, refer to [Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters).

If you wish to receive the intent in an existing instance of MainActivity, you may set the `launchMode` of MainActivity to `singleTask` in `AndroidManifest.xml`. See [`<activity>`](http://developer.android.com/guide/topics/manifest/activity-element.html) documentation for more information.

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

NOTE: On iOS, you'll need to link `RCTLinking` to your project by following the steps described [here](linking-libraries-ios.md#manual-linking). If you also want to listen to incoming app links during your app's execution, you'll need to add the following lines to your `*AppDelegate.m`:

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

And then on your React component you'll be able to listen to the events on `Linking` as follows

```jsx
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

#### Opening external links

To start the corresponding activity for a link (web URL, email, contact etc.), call

```jsx
Linking.openURL(url).catch((err) => console.error('An error occurred', err));
```

If you want to check if any installed app can handle a given URL beforehand you can call

```jsx
Linking.canOpenURL(url)
  .then((supported) => {
    if (!supported) {
      console.log("Can't handle url: " + url);
    } else {
      return Linking.openURL(url);
    }
  })
  .catch((err) => console.error('An error occurred', err));
```

### Methods

- [`constructor`](linking.md#constructor)
- [`addEventListener`](linking.md#addeventlistener)
- [`removeEventListener`](linking.md#removeeventlistener)
- [`openURL`](linking.md#openurl)
- [`canOpenURL`](linking.md#canopenurl)
- [`getInitialURL`](linking.md#getinitialurl)

---

# Reference

## Methods

### `constructor()`

```jsx
constructor();
```

---

### `addEventListener()`

```jsx
addEventListener(type, handler);
```

Add a handler to Linking changes by listening to the `url` event type and providing the handler

---

### `removeEventListener()`

```jsx
removeEventListener(type, handler);
```

Remove a handler by passing the `url` event type and the handler

---

### `openURL()`

```jsx
openURL(url);
```

Try to open the given `url` with any of the installed apps.

You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386" on Android or "http://maps.apple.com/?ll=37.484847,-122.148386" on iOS), a contact, or any other URL that can be opened with the installed apps.

The method returns a `Promise` object. If the user confirms the open dialog or the url automatically opens, the promise is resolved. If the user cancels the open dialog or there are no registered applications for the url, the promise is rejected.

**Parameters:**

| Name | Type   | Required | Description      |
| ---- | ------ | -------- | ---------------- |
| url  | string | Yes      | The URL to open. |

> This method will fail if the system doesn't know how to open the specified URL. If you're passing in a non-http(s) URL, it's best to check {@code canOpenURL} first.

> For web URLs, the protocol ("http://", "https://") must be set accordingly!

---

### `canOpenURL()`

```jsx
canOpenURL(url);
```

Determine whether or not an installed app can handle a given URL.

The method returns a `Promise` object. When it is determined whether or not the given URL can be handled, the promise is resolved and the first parameter is whether or not it can be opened.

The `Promise` will reject on Android if it was impossible to check if the URL can be opened, and on iOS if you didn't add the specific scheme in the `LSApplicationQueriesSchemes` key inside `Info.plist` (see bellow).

**Parameters:**

| Name | Type   | Required | Description      |
| ---- | ------ | -------- | ---------------- |
| url  | string | Yes      | The URL to open. |

> For web URLs, the protocol ("http://", "https://") must be set accordingly!

> As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key inside `Info.plist` or canOpenURL will always return false.

> This method has limitations on iOS 9+. From [the official Apple documentation](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl):

> If your app is linked against an earlier version of iOS but is running in iOS 9.0 or later, you can call this method up to 50 times. After reaching that limit, subsequent calls always return false. If the user reinstalls or upgrades the app, iOS resets the limit.

---

### `getInitialURL()`

```jsx
getInitialURL();
```

If the app launch was triggered by an app link, it will give the link url, otherwise it will give `null`

> To support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
