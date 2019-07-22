---
id: version-0.40-pushnotificationios
title: PushNotificationIOS
original_id: pushnotificationios
---

Handle push notifications for your app, including permission handling and icon badge number.

To get up and running, [configure your notifications with Apple](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW6) and your server-side system. To get an idea, [this is the Parse guide](https://parse.com/tutorials/ios-push-notifications).

[Manually link](linking-libraries-ios.md#manual-linking) the PushNotificationIOS library

- Add the following to your Project: `node_modules/react-native/Libraries/PushNotificationIOS/RCTPushNotification.xcodeproj`
- Add the following to `Link Binary With Libraries`: `libRCTPushNotification.a`
- Add the following to your `Header Search Paths`: `$(SRCROOT)/../node_modules/react-native/Libraries/PushNotificationIOS` and set the search to `recursive`

Finally, to enable support for `notification` and `register` events you need to augment your AppDelegate.

At the top of your `AppDelegate.m`:

`#import "RCTPushNotificationManager.h"`

And then in your AppDelegate implementation add the following:

```
 // Required to register for notifications
 - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
 {
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
 }
 // Required for the register event.
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
 {
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 }
 // Required for the notification event. You must call the completion handler after handling the remote notification.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
                                                        fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
 {
   [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
 }
 // Required for the registrationError event.
 - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
 {
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
 }
 // Required for the localNotification event.
 - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
 {
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
 }
```

### Methods

- [`presentLocalNotification`](pushnotificationios.md#presentLocalNotification)
- [`scheduleLocalNotification`](pushnotificationios.md#schedulelocalnotification)
- [`cancelAllLocalNotifications`](pushnotificationios.md#cancelalllocalnotifications)
- [`setApplicationIconBadgeNumber`](pushnotificationios.md#setapplicationiconbadgenumber)
- [`getApplicationIconBadgeNumber`](pushnotificationios.md#getapplicationiconbadgenumber)
- [`cancelLocalNotifications`](pushnotificationios.md#cancellocalnotifications)
- [`getScheduledLocalNotifications`](pushnotificationios.md#getscheduledlocalnotifications)
- [`addEventListener`](pushnotificationios.md#addeventlistener)
- [`removeEventListener`](pushnotificationios.md#removeeventlistener)
- [`requestPermissions`](pushnotificationios.md#requestpermissions)
- [`abandonPermissions`](pushnotificationios.md#abandonpermissions)
- [`checkPermissions`](pushnotificationios.md#checkpermissions)
- [`getInitialNotification`](pushnotificationios.md#getinitialnotification)
- [`constructor`](pushnotificationios.md#constructor)
- [`finish`](pushnotificationios.md#finish)
- [`getMessage`](pushnotificationios.md#getmessage)
- [`getSound`](pushnotificationios.md#getsound)
- [`getAlert`](pushnotificationios.md#getalert)
- [`getBadgeCount`](pushnotificationios.md#getbadgecount)
- [`getData`](pushnotificationios.md#getdata)

---

# Reference

## Methods

### `presentLocalNotification()`

```jsx
PushNotificationIOS.presentLocalNotification(details);
```

Schedules the localNotification for immediate presentation.

**Parameters:**

details is an object containing:

- `alertBody` : The message displayed in the notification alert.
- `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
- `soundName` : The sound played when the notification is fired (optional).
- `isSilent` : If true, the notification will appear without sound (optional).
- `category` : The category of this notification, required for actionable notifications (optional).
- `userInfo` : An optional object containing additional notification data.
- `applicationIconBadgeNumber` (optional) : The number to display as the app's icon badge. The default value of this property is 0, which means that no badge is displayed.

---

### `scheduleLocalNotification()`

```jsx
static scheduleLocalNotification(details)
```

Schedules the localNotification for future presentation.

details is an object containing:

- `fireDate` : The date and time when the system should deliver the notification.
- `alertBody` : The message displayed in the notification alert.
- `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
- `soundName` : The sound played when the notification is fired (optional).
- `category` : The category of this notification, required for actionable notifications (optional).
- `userInfo` : An optional object containing additional notification data.
- `applicationIconBadgeNumber` (optional) : The number to display as the app's icon badge. Setting the number to 0 removes the icon badge.
- `repeatInterval` : The interval to repeat as a string. Possible values: `minute`, `hour`, `day`, `week`, `month`, `year`.

---

### `cancelAllLocalNotifications()`

```jsx
static cancelAllLocalNotifications()
```

Cancels all scheduled localNotifications

---

### `setApplicationIconBadgeNumber()`

```jsx
static setApplicationIconBadgeNumber(number)
```

Sets the badge number for the app icon on the home screen

---

### `getApplicationIconBadgeNumber()`

```jsx
static getApplicationIconBadgeNumber(callback)
```

Gets the current badge number for the app icon on the home screen

---

### `cancelLocalNotifications()`

```jsx
static cancelLocalNotifications(userInfo)
```

Cancel local notifications.

Optionally restricts the set of canceled notifications to those notifications whose `userInfo` fields match the corresponding fields in the `userInfo` argument.

---

### `getScheduledLocalNotifications()`

```jsx
static getScheduledLocalNotifications(callback)
```

Gets the local notifications that are currently scheduled.

---

### `addEventListener()`

```jsx
static addEventListener(type, handler)
```

Attaches a listener to remote or local notification events while the app is running in the foreground or the background.

Valid events are:

- `notification` : Fired when a remote notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `localNotification` : Fired when a local notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `register`: Fired when the user registers for remote notifications. The handler will be invoked with a hex string representing the deviceToken.
- `registrationError`: Fired when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. The handler will be invoked with {message: string, code: number, details: any}.

---

### `removeEventListener()`

```jsx
static removeEventListener(type, handler)
```

Removes the event listener. Do this in `componentWillUnmount` to prevent memory leaks

---

### `requestPermissions()`

```jsx
static requestPermissions(permissions?)
```

Requests notification permissions from iOS, prompting the user's dialog box. By default, it will request all notification permissions, but a subset of these can be requested by passing a map of requested permissions. The following permissions are supported:

- `alert`
- `badge`
- `sound`

If a map is provided to the method, only the permissions with truthy values will be requested.

This method returns a promise that will resolve when the user accepts, rejects, or if the permissions were previously rejected. The promise resolves to the current state of the permission.

---

### `abandonPermissions()`

```jsx
static abandonPermissions()
```

Unregister for all remote notifications received via Apple Push Notification service.

You should call this method in rare circumstances only, such as when a new version of the app removes support for all types of remote notifications. Users can temporarily prevent apps from receiving remote notifications through the Notifications section of the Settings app. Apps unregistered through this method can always re-register.

---

### `checkPermissions()`

```jsx
static checkPermissions(callback)
```

See what push permissions are currently enabled. `callback` will be invoked with a `permissions` object:

- `alert` :boolean
- `badge` :boolean
- `sound` :boolean

---

### `getInitialNotification()`

```jsx
static getInitialNotification()
```

This method returns a promise that resolves to either the notification object if the app was launched by a push notification, or `null` otherwise.

---

### `constructor()`

```jsx
constructor(nativeNotif);
```

You will never need to instantiate `PushNotificationIOS` yourself. Listening to the `notification` event and invoking `getInitialNotification` is sufficient

---

### `finish()`

```jsx
finish(fetchResult);
```

This method is available for remote notifications that have been received via: `application:didReceiveRemoteNotification:fetchCompletionHandler:` https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/occ/intfm/UIApplicationDelegate/application:didReceiveRemoteNotification:fetchCompletionHandler:

Call this to execute when the remote notification handling is complete. When calling this block, pass in the fetch result value that best describes the results of your operation. You _must_ call this handler and should do so as soon as possible. For a list of possible values, see `PushNotificationIOS.FetchResult`.

If you do not call this method your background remote notifications could be throttled, to read more about it see the above documentation link.

---

### `getMessage()`

```jsx
getMessage();
```

An alias for `getAlert` to get the notification's main message string

---

### `getSound()`

```jsx
getSound();
```

Gets the sound string from the `aps` object

---

### `getAlert()`

```jsx
getAlert();
```

Gets the notification's main message from the `aps` object

---

### `getBadgeCount()`

```jsx
getBadgeCount();
```

Gets the badge count number from the `aps` object

---

### `getData()`

```jsx
getData();
```

Gets the data object on the notif
