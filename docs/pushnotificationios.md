---
id: pushnotificationios
title: '🚧 PushNotificationIOS'
---

> **Deprecated.** Use [@react-native-community/push-notification-ios](https://github.com/react-native-community/react-native-push-notification-ios) instead.

<div class="banner-native-code-required">
  <h3>Projects with Native Code Only</h3>
  <p>
    The following section only applies to projects with native code exposed. If you are using the managed <code>expo-cli</code> workflow, see the guide on <a href="https://docs.expo.io/versions/latest/sdk/notifications/">Notifications</a> in the Expo documentation for the appropriate alternative.
  </p>
</div>

Handle push notifications for your app, including permission handling and icon badge number.

To get up and running, [configure your notifications with Apple](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW6) and your server-side system.

React Native version equal or higher than 0.60.0:

- Autolinking in 0.60.0 handles the linking for you!

React Native versions lower than 0.60.0:

Add the PushNotificationIOS library to your Podfile: ./ios/Podfile

- CocoaPods:

  - Add the PushNotificationIOS library to your Podfile: ./ios/Podfile

    ```ruby
    target 'myAwesomeApp' do
      # Pods for myAwesomeApp
      pod 'React-RCTPushNotification', :path => '../node_modules/react-native/Libraries/PushNotificationIOS'
    end
    ```

- [Manually link](linking-libraries-ios.md#manual-linking) the PushNotificationIOS library:
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

---

# Reference

## Methods

### `presentLocalNotification()`

```jsx
PushNotificationIOS.presentLocalNotification(details);
```

Schedules the localNotification for immediate presentation.

**Parameters:**

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| details | object | Yes      | See below.  |

details is an object containing:

- `alertBody` : The message displayed in the notification alert.
- `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view". Note that Apple no longer shows this in iOS 10 +
- `alertTitle` : The text displayed as the title of the notification alert.
- `soundName` : The sound played when the notification is fired (optional).
- `isSilent` : If true, the notification will appear without sound (optional).
- `category` : The category of this notification, required for actionable notifications (optional).
- `userInfo` : An object containing additional notification data (optional).
- `applicationIconBadgeNumber` The number to display as the app's icon badge. The default value of this property is 0, which means that no badge is displayed (optional).

---

### `scheduleLocalNotification()`

```jsx
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
- `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view". Note that Apple no longer shows this in iOS 10 +
- `soundName` : The sound played when the notification is fired (optional).
- `isSilent` : If true, the notification will appear without sound (optional).
- `category` : The category of this notification, required for actionable notifications (optional).
- `userInfo` : An object containing additional notification data (optional).
- `applicationIconBadgeNumber` The number to display as the app's icon badge. Setting the number to 0 removes the icon badge (optional).
- `repeatInterval` : The interval to repeat as a string. Possible values: `minute`, `hour`, `day`, `week`, `month`, `year` (optional).

---

### `cancelAllLocalNotifications()`

```jsx
PushNotificationIOS.cancelAllLocalNotifications();
```

Cancels all scheduled localNotifications

---

### `removeAllDeliveredNotifications()`

```jsx
PushNotificationIOS.removeAllDeliveredNotifications();
```

Remove all delivered notifications from Notification Center

---

### `getDeliveredNotifications()`

```jsx
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
- `category` : The category of this notification (optional).
- `userInfo` : An object containing additional notification data (optional).
- `thread-id` : The thread identifier of this notification, if has one.

---

### `removeDeliveredNotifications()`

```jsx
PushNotificationIOS.removeDeliveredNotifications(identifiers);
```

Removes the specified notifications from Notification Center

**Parameters:**

| Name        | Type  | Required | Description                        |
| ----------- | ----- | -------- | ---------------------------------- |
| identifiers | array | Yes      | Array of notification identifiers. |

---

### `setApplicationIconBadgeNumber()`

```jsx
PushNotificationIOS.setApplicationIconBadgeNumber(number);
```

Sets the badge number for the app icon on the home screen

**Parameters:**

| Name   | Type   | Required | Description                    |
| ------ | ------ | -------- | ------------------------------ |
| number | number | Yes      | Badge number for the app icon. |

---

### `getApplicationIconBadgeNumber()`

```jsx
PushNotificationIOS.getApplicationIconBadgeNumber(callback);
```

Gets the current badge number for the app icon on the home screen

**Parameters:**

| Name     | Type     | Required | Description                                              |
| -------- | -------- | -------- | -------------------------------------------------------- |
| callback | function | Yes      | A function that will be passed the current badge number. |

---

### `cancelLocalNotifications()`

```jsx
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

```jsx
PushNotificationIOS.getScheduledLocalNotifications(callback);
```

Gets the local notifications that are currently scheduled.

**Parameters:**

| Name     | Type     | Required | Description                                                                        |
| -------- | -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | function | Yes      | A function that will be passed an array of objects describing local notifications. |

---

### `addEventListener()`

```jsx
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

```jsx
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

```jsx
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

```jsx
PushNotificationIOS.abandonPermissions();
```

Unregister for all remote notifications received via Apple Push Notification service.

You should call this method in rare circumstances only, such as when a new version of the app removes support for all types of remote notifications. Users can temporarily prevent apps from receiving remote notifications through the Notifications section of the Settings app. Apps unregistered through this method can always re-register.

---

### `checkPermissions()`

```jsx
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

```jsx
PushNotificationIOS.getInitialNotification();
```

This method returns a promise. If the app was launched by a push notification, this promise resolves to an object of type `PushNotificationIOS`. Otherwise, it resolves to `null`.

---

### `constructor()`

```jsx
constructor(nativeNotif);
```

You will never need to instantiate `PushNotificationIOS` yourself. Listening to the `notification` event and invoking `getInitialNotification` is sufficient.

---

### `finish()`

```jsx
finish(fetchResult);
```

This method is available for remote notifications that have been received via: `application:didReceiveRemoteNotification:fetchCompletionHandler:` https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc

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

### `getCategory()`

```jsx
getCategory();
```

Gets the category string from the `aps` object

---

### `getAlert()`

```jsx
getAlert();
```

Gets the notification's main message from the `aps` object

---

### `getContentAvailable()`

```jsx
getContentAvailable();
```

Gets the content-available number from the `aps` object

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

Gets the data object on the notification

---

### `getThreadID()`

```jsx
getThreadID();
```

Gets the thread ID on the notification
