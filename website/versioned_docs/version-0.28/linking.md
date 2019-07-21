---
id: version-0.28-linking
title: Linking
original_id: linking
---

`Linking` gives you a general interface to interact with both incoming and outgoing app links.

### Basic Usage

#### Handling deep links

If your app was launched from an external url registered to your app you can access and handle it from any component you want with

```
componentDidMount() {
  var url = Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}
```

NOTE: For instructions on how to add support for deep linking on Android, refer to [Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters).

If you wish to receive the intent in an existing instance of MainActivity, you may set the `launchMode` of MainActivity to `singleTask` in `AndroidManifest.xml`. See [`<activity>`](http://developer.android.com/guide/topics/manifest/activity-element.html) documentation for more information.

```
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

NOTE: On iOS you'll need to link `RCTLinking` to your project by following the steps described [here](linking-libraries-ios.md#manual-linking). In case you also want to listen to incoming app links during your app's execution you'll need to add the following lines to you `*AppDelegate.m`:

```
#import "RCTLinkingManager.h"

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```

And then on your React component you'll be able to listen to the events on `Linking` as follows

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

#### Opening external links

To start the corresponding activity for a link (web URL, email, contact etc.), call

```
Linking.openURL(url).catch(err => console.error('An error occurred', err));
```

If you want to check if any installed app can handle a given URL beforehand you can call

```
Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
}).catch(err => console.error('An error occurred', err));
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

You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386"), a contact, or any other URL that can be opened with the installed apps.

NOTE: This method will fail if the system doesn't know how to open the specified URL. If you're passing in a non-http(s) URL, it's best to check {@code canOpenURL} first.

NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!

---

### `canOpenURL()`

```jsx
canOpenURL(url);
```

Determine whether or not an installed app can handle a given URL.

NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!

NOTE: As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key inside `Info.plist` or canOpenURL will always return false.

@param URL the URL to open

---

### `getInitialURL()`

```jsx
getInitialURL();
```

If the app launch was triggered by an app link, it will give the link url, otherwise it will give `null`

NOTE: To support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
