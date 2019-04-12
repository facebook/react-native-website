---
id: pushnotificationios
title: PushNotificationIOS
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

Handle push notifications for your app, including permission handling and icon badge number.

To get up and running, [configure your notifications with Apple](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW6) and your server-side system.

[Manually link](linking-libraries-ios.md#manual-linking) the PushNotificationIOS library

- Add the following to your Project: `node_modules/react-native/Libraries/PushNotificationIOS/RCTPushNotification.xcodeproj`
- Add the following to `Link Binary With Libraries`: `libRCTPushNotification.a`

Finally, to enable support for `notification` and `register` events you need to augment your AppDelegate.

At the top of your `AppDelegate.m`:

`#import <React/RCTPushNotificationManager.h>`

And then in your AppDelegate implementation add the following:

```objectivec
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

To show notifications while being in the foreground (available starting from iOS 10) add the following lines:

At the top of your `AppDelegate.m`:

`#import <UserNotifications/UserNotifications.h>`

And then in your AppDelegate implementation add the following:

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  return YES;
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}
```

Then enable Background Modes/Remote notifications to be able to use remote notifications properly. The easiest way to do this is via the project settings. Navigate to Targets -> Your App -> Capabilities -> Background Modes and check Remote notifications. This will automatically enable the required settings.

### Methods

- [`presentLocalNotification`](pushnotificationios.md#presentlocalnotification)
- [`scheduleLocalNotification`](pushnotificationios.md#schedulelocalnotification)
- [`cancelAllLocalNotifications`](pushnotificationios.md#cancelalllocalnotifications)
- [`removeAllDeliveredNotifications`](pushnotificationios.md#removealldeliverednotifications)
- [`getDeliveredNotifications`](pushnotificationios.md#getdeliverednotifications)
- [`removeDeliveredNotifications`](pushnotificationios.md#removedeliverednotifications)
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
- [`getCategory`](pushnotificationios.md#getcategory)
- [`getAlert`](pushnotificationios.md#getalert)
- [`getContentAvailable`](pushnotificationios.md#getcontentavailable)
- [`getBadgeCount`](pushnotificationios.md#getbadgecount)
- [`getData`](pushnotificationios.md#getdata)

---

# Reference

## Methods

### `presentLocalNotification()`

```javascript
PushNotificationIOS.presentLocalNotification(details);
```

Schedules the localNotification for immediate presentation.

**Parameters:**

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| details | object | Yes      | See below.  |

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

```javascript
PushNotificationIOS.scheduleLocalNotification(details);
```

Schedules the localNotification for future presentation.

**Parameters:**

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| details | object | Yes      | See below.  |

details is an object containing:

- `fireDate` : The date and time when the system should deliver the notification.
- `alertTitle` : The text displayed as the title of the notification alert.
- `alertBody` : The message displayed in the notification alert.
- `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
- `soundName` : The sound played when the notification is fired (optional).
- `isSilent` : If true, the notification will appear without sound (optional).
- `category` : The category of this notification, required for actionable notifications (optional).
- `userInfo` : An optional object containing additional notification data.
- `applicationIconBadgeNumber` (optional) : The number to display as the app's icon badge. Setting the number to 0 removes the icon badge.
- `repeatInterval` : The interval to repeat as a string. Possible values: `minute`, `hour`, `day`, `week`, `month`, `year`.

---

### `cancelAllLocalNotifications()`

```javascript
PushNotificationIOS.cancelAllLocalNotifications();
```

Cancels all scheduled localNotifications

---

### `removeAllDeliveredNotifications()`

```javascript
PushNotificationIOS.removeAllDeliveredNotifications();
```

Remove all delivered notifications from Notification Center

---

### `getDeliveredNotifications()`

```javascript
PushNotificationIOS.getDeliveredNotifications(callback);
```

Provides you with a list of the app’s notifications that are still displayed in Notification Center

**Parameters:**

| Name     | Type     | Required | Description                                                 |
| -------- | -------- | -------- | ----------------------------------------------------------- |
| callback | function | Yes      | Function which receive an array of delivered notifications. |

A delivered notification is an object containing:

- `identifier` : The identifier of this notification.
- `title` : The title of this notification.
- `body` : The body of this notification.
- `category` : The category of this notification, if has one.
- `userInfo` : An optional object containing additional notification data.
- `thread-id` : The thread identifier of this notification, if has one.

---

### `removeDeliveredNotifications()`

```javascript
PushNotificationIOS.removeDeliveredNotifications(identifiers);
```

Removes the specified notifications from Notification Center

**Parameters:**

| Name        | Type  | Required | Description                        |
| ----------- | ----- | -------- | ---------------------------------- |
| identifiers | array | Yes      | Array of notification identifiers. |

---

### `setApplicationIconBadgeNumber()`

```javascript
PushNotificationIOS.setApplicationIconBadgeNumber(number);
```

Sets the badge number for the app icon on the home screen

**Parameters:**

| Name   | Type   | Required | Description                    |
| ------ | ------ | -------- | ------------------------------ |
| number | number | Yes      | Badge number for the app icon. |

---

### `getApplicationIconBadgeNumber()`

```javascript
PushNotificationIOS.getApplicationIconBadgeNumber(callback);
```

Gets the current badge number for the app icon on the home screen

**Parameters:**

| Name     | Type     | Required | Description                                              |
| -------- | -------- | -------- | -------------------------------------------------------- |
| callback | function | Yes      | A function that will be passed the current badge number. |

---

### `cancelLocalNotifications()`

```javascript
PushNotificationIOS.cancelLocalNotifications(userInfo);
```

Cancel local notifications.

Optionally restricts the set of canceled notifications to those notifications whose `userInfo` fields match the corresponding fields in the `userInfo` argument.

**Parameters:**

| Name     | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| userInfo | object | No       |             |

---

### `getScheduledLocalNotifications()`

```javascript
PushNotificationIOS.getScheduledLocalNotifications(callback);
```

Gets the local notifications that are currently scheduled.

**Parameters:**

| Name     | Type     | Required | Description                                                                        |
| -------- | -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | function | Yes      | A function that will be passed an array of objects describing local notifications. |

---

### `addEventListener()`

```javascript
PushNotificationIOS.addEventListener(type, handler);
```

Attaches a listener to remote or local notification events while the app is running in the foreground or the background.

**Parameters:**

| Name    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| type    | string   | Yes      | Event type. |
| handler | function | Yes      | Listener.   |

Valid events are:

- `notification` : Fired when a remote notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `localNotification` : Fired when a local notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `register`: Fired when the user registers for remote notifications. The handler will be invoked with a hex string representing the deviceToken.
- `registrationError`: Fired when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. The handler will be invoked with {message: string, code: number, details: any}.

---

### `removeEventListener()`

```javascript
PushNotificationIOS.removeEventListener(type, handler);
```

Removes the event listener. Do this in `componentWillUnmount` to prevent memory leaks

**Parameters:**

| Name    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| type    | string   | Yes      | Event type. |
| handler | function | Yes      | Listener.   |

---

### `requestPermissions()`

```javascript
PushNotificationIOS.requestPermissions([permissions]);
```

Requests notification permissions from iOS, prompting the user's dialog box. By default, it will request all notification permissions, but a subset of these can be requested by passing a map of requested permissions. The following permissions are supported:

- `alert`
- `badge`
- `sound`

If a map is provided to the method, only the permissions with truthy values will be requested.

This method returns a promise that will resolve when the user accepts, rejects, or if the permissions were previously rejected. The promise resolves to the current state of the permission.

**Parameters:**

| Name        | Type  | Required | Description            |
| ----------- | ----- | -------- | ---------------------- |
| permissions | array | No       | alert, badge, or sound |

---

### `abandonPermissions()`

```javascript
PushNotificationIOS.abandonPermissions();
```

Unregister for all remote notifications received via Apple Push Notification service.

You should call this method in rare circumstances only, such as when a new version of the app removes support for all types of remote notifications. Users can temporarily prevent apps from receiving remote notifications through the Notifications section of the Settings app. Apps unregistered through this method can always re-register.

---

### `checkPermissions()`

```javascript
PushNotificationIOS.checkPermissions(callback);
```

See what push permissions are currently enabled.

**Parameters:**

| Name     | Type     | Required | Description |
| -------- | -------- | -------- | ----------- |
| callback | function | Yes      | See below.  |

`callback` will be invoked with a `permissions` object:

- `alert` :boolean
- `badge` :boolean
- `sound` :boolean

---

### `getInitialNotification()`

```javascript
PushNotificationIOS.getInitialNotification();
```

This method returns a promise. If the app was launched by a push notification, this promise resolves to an object of type `PushNotificationIOS`. Otherwise, it resolves to `null`.

---

### `constructor()`

```javascript
constructor(nativeNotif);
```

You will never need to instantiate `PushNotificationIOS` yourself. Listening to the `notification` event and invoking `getInitialNotification` is sufficient.

---

### `finish()`

```javascript
finish(fetchResult);
```

This method is available for remote notifications that have been received via: `application:didReceiveRemoteNotification:fetchCompletionHandler:` https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/occ/intfm/UIApplicationDelegate/application:didReceiveRemoteNotification:fetchCompletionHandler:

Call this to execute when the remote notification handling is complete. When calling this block, pass in the fetch result value that best describes the results of your operation. You _must_ call this handler and should do so as soon as possible. For a list of possible values, see `PushNotificationIOS.FetchResult`.

If you do not call this method your background remote notifications could be throttled, to read more about it see the above documentation link.

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

### `getCategory()`

```javascript
getCategory();
```

Gets the category string from the `aps` object

---

### `getAlert()`

```javascript
getAlert();
```

Gets the notification's main message from the `aps` object

---

### `getContentAvailable()`

```javascript
getContentAvailable();
```

Gets the content-available number from the `aps` object

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

Gets the data object on the notification
