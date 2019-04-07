---
id: version-0.31-pushnotificationios
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
 // Required for the notification event.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
 {
  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
 }
 // Required for the localNotification event.
 - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
 {
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
 }
 - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
 {
   NSLog(@"%@", error);
 }
```

### Methods

- [`presentLocalNotification`](pushnotificationios.md#presentlocalnotification)
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
- [`getMessage`](pushnotificationios.md#getmessage)
- [`getSound`](pushnotificationios.md#getsound)
- [`getAlert`](pushnotificationios.md#getalert)
- [`getBadgeCount`](pushnotificationios.md#getbadgecount)
- [`getData`](pushnotificationios.md#getdata)

---

# Reference

## Methods

### `presentLocalNotification()`

```javascript
static presentLocalNotification(details)
```

Schedules the localNotification for immediate presentation.

details is an object containing:

- `alertBody` : The message displayed in the notification alert.
- `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
- `soundName` : The sound played when the notification is fired (optional).
- `category` : The category of this notification, required for actionable notifications (optional).
- `userInfo` : An optional object containing additional notification data.
- `applicationIconBadgeNumber` (optional) : The number to display as the app's icon badge. The default value of this property is 0, which means that no badge is displayed.

---

### `scheduleLocalNotification()`

```javascript
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

---

### `cancelAllLocalNotifications()`

```javascript
static cancelAllLocalNotifications()
```

Cancels all scheduled localNotifications

---

### `setApplicationIconBadgeNumber()`

```javascript
static setApplicationIconBadgeNumber(number)
```

Sets the badge number for the app icon on the home screen

---

### `getApplicationIconBadgeNumber()`

```javascript
static getApplicationIconBadgeNumber(callback)
```

Gets the current badge number for the app icon on the home screen

---

### `cancelLocalNotifications()`

```javascript
static cancelLocalNotifications(userInfo)
```

Cancel local notifications.

Optionally restricts the set of canceled notifications to those notifications whose `userInfo` fields match the corresponding fields in the `userInfo` argument.

---

### `getScheduledLocalNotifications()`

```javascript
static getScheduledLocalNotifications(callback)
```

Gets the local notifications that are currently scheduled.

---

### `addEventListener()`

```javascript
static addEventListener(type, handler)
```

Attaches a listener to remote or local notification events while the app is running in the foreground or the background.

Valid events are:

- `notification` : Fired when a remote notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `localNotification` : Fired when a local notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `register`: Fired when the user registers for remote notifications. The handler will be invoked with a hex string representing the deviceToken.

---

### `removeEventListener()`

```javascript
static removeEventListener(type, handler)
```

Removes the event listener. Do this in `componentWillUnmount` to prevent memory leaks

---

### `requestPermissions()`

```javascript
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

```javascript
static abandonPermissions()
```

Unregister for all remote notifications received via Apple Push Notification service.

You should call this method in rare circumstances only, such as when a new version of the app removes support for all types of remote notifications. Users can temporarily prevent apps from receiving remote notifications through the Notifications section of the Settings app. Apps unregistered through this method can always re-register.

---

### `checkPermissions()`

```javascript
static checkPermissions(callback)
```

See what push permissions are currently enabled. `callback` will be invoked with a `permissions` object:

- `alert` :boolean
- `badge` :boolean
- `sound` :boolean

---

### `getInitialNotification()`

```javascript
static getInitialNotification()
```

If the app launch was triggered by a push notification, it will give the notification object, otherwise it will give `null`

---

### `constructor()`

```javascript
constructor(nativeNotif);
```

You will never need to instantiate `PushNotificationIOS` yourself. Listening to the `notification` event and invoking `getInitialNotification` is sufficient

---

### `getMessage()`

```javascript
getMessage();
```

An alias for `getAlert` to get the notification's main message string

---

### `getSound()`

```javascript
getSound();
```

Gets the sound string from the `aps` object

---

### `getAlert()`

```javascript
getAlert();
```

Gets the notification's main message from the `aps` object

---

### `getBadgeCount()`

```javascript
getBadgeCount();
```

Gets the badge count number from the `aps` object

---

### `getData()`

```javascript
getData();
```

Gets the data object on the notif
