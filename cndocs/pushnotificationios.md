---
id: pushnotificationios
title: PushNotificationIOS
---

<div class="banner-crna-ejected">
  <h3>Projects with Native Code Only</h3>
  <p>
    This section only applies to projects made with <code>react-native init</code>
    or to those made with Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

本模块帮助你处理应用的推送通知，包括权限控制以及应用图标上的角标数（未读消息数）。

要使用推送通知功能，首先[在苹果后台配置推送通知服务](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW6)并且准备好服务端的系统。

首先请[手动链接](linking-libraries-ios.md)PushNotificationIOS的库（以下操作如果不熟悉，请自行补习Xcode的使用教程）：  

- 将`node_modules/react-native/Libraries/PushNotificationIOS/RCTPushNotification.xcodeproj`文件拖到Xcode界面中
- 在Xcode的`Link Binary With Libraries`中添加`libRCTPushNotification.a`

然后你需要在AppDelegate中启用推送通知的支持以及注册相应的事件。

在`AppDelegate.m`开头：

```objective-c
#import <React/RCTPushNotificationManager.h>
```

然后在AppDelegate实现中添加如下的代码：

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

### 查看方法

* [`presentLocalNotification`](pushnotificationios.md#presentlocalnotification)
* [`scheduleLocalNotification`](pushnotificationios.md#schedulelocalnotification)
* [`cancelAllLocalNotifications`](pushnotificationios.md#cancelalllocalnotifications)
* [`removeAllDeliveredNotifications`](pushnotificationios.md#removealldeliverednotifications)
* [`getDeliveredNotifications`](pushnotificationios.md#getdeliverednotifications)
* [`removeDeliveredNotifications`](pushnotificationios.md#removedeliverednotifications)
* [`setApplicationIconBadgeNumber`](pushnotificationios.md#setapplicationiconbadgenumber)
* [`getApplicationIconBadgeNumber`](pushnotificationios.md#getapplicationiconbadgenumber)
* [`cancelLocalNotifications`](pushnotificationios.md#cancellocalnotifications)
* [`getScheduledLocalNotifications`](pushnotificationios.md#getscheduledlocalnotifications)
* [`addEventListener`](pushnotificationios.md#addeventlistener)
* [`removeEventListener`](pushnotificationios.md#removeeventlistener)
* [`requestPermissions`](pushnotificationios.md#requestpermissions)
* [`abandonPermissions`](pushnotificationios.md#abandonpermissions)
* [`checkPermissions`](pushnotificationios.md#checkpermissions)
* [`getInitialNotification`](pushnotificationios.md#getinitialnotification)
* [`constructor`](pushnotificationios.md#constructor)
* [`finish`](pushnotificationios.md#finish)
* [`getMessage`](pushnotificationios.md#getmessage)
* [`getSound`](pushnotificationios.md#getsound)
* [`getCategory`](pushnotificationios.md#getcategory)
* [`getAlert`](pushnotificationios.md#getalert)
* [`getContentAvailable`](pushnotificationios.md#getcontentavailable)
* [`getBadgeCount`](pushnotificationios.md#getbadgecount)
* [`getData`](pushnotificationios.md#getdata)

---

# 文档

## Methods

### `presentLocalNotification()`

```javascript
PushNotificationIOS.presentLocalNotification(details);
```

Schedules the localNotification for immediate presentation.

**参数：**

| 名称    | 类型   | 必填 | 说明         |
| ------- | ------ | ---- | ------------ |
| details | object | 是   | 看下面的说明 |

details is an object containing:

* `alertBody` : The message displayed in the notification alert.
* `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
* `soundName` : The sound played when the notification is fired (optional).
* `isSilent` : If true, the notification will appear without sound (optional).
* `category` : The category of this notification, required for actionable notifications (optional).
* `userInfo` : An optional object containing additional notification data.
* `applicationIconBadgeNumber` (optional) : The number to display as the app's icon badge. The default value of this property is 0, which means that no badge is displayed.

---

### `scheduleLocalNotification()`

```javascript
PushNotificationIOS.scheduleLocalNotification(details);
```

Schedules the localNotification for future presentation.

**参数：**

| 名称    | 类型   | 必填 | 说明         |
| ------- | ------ | ---- | ------------ |
| details | object | 是   | 看下面的说明 |

details is an object containing:

* `fireDate` : The date and time when the system should deliver the notification.
* `alertTitle` : The text displayed as the title of the notification alert.
* `alertBody` : The message displayed in the notification alert.
* `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
* `soundName` : The sound played when the notification is fired (optional).
* `isSilent` : If true, the notification will appear without sound (optional).
* `category` : The category of this notification, required for actionable notifications (optional).
* `userInfo` : An optional object containing additional notification data.
* `applicationIconBadgeNumber` (optional) : The number to display as the app's icon badge. Setting the number to 0 removes the icon badge.
* `repeatInterval` : The interval to repeat as a string. Possible values: `minute`, `hour`, `day`, `week`, `month`, `year`.

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

**参数：**

| 名称     | 类型     | 必填 | 说明                                                        |
| -------- | -------- | ---- | ----------------------------------------------------------- |
| callback | function | 是   | Function which receive an array of delivered notifications. |

A delivered notification is an object containing:

* `identifier` : The identifier of this notification.
* `title` : The title of this notification.
* `body` : The body of this notification.
* `category` : The category of this notification, if has one.
* `userInfo` : An optional object containing additional notification data.
* `thread-id` : The thread identifier of this notification, if has one.

---

### `removeDeliveredNotifications()`

```javascript
PushNotificationIOS.removeDeliveredNotifications(identifiers);
```

Removes the specified notifications from Notification Center

**参数：**

| 名称        | 类型  | 必填 | 说明                               |
| ----------- | ----- | ---- | ---------------------------------- |
| identifiers | array | 是   | Array of notification identifiers. |

---

### `setApplicationIconBadgeNumber()`

```javascript
PushNotificationIOS.setApplicationIconBadgeNumber(number);
```

Sets the badge number for the app icon on the home screen

**参数：**

| 名称   | 类型   | 必填 | 说明                           |
| ------ | ------ | ---- | ------------------------------ |
| number | number | 是   | Badge number for the app icon. |

---

### `getApplicationIconBadgeNumber()`

```javascript
PushNotificationIOS.getApplicationIconBadgeNumber(callback);
```

Gets the current badge number for the app icon on the home screen

**参数：**

| 名称     | 类型     | 必填 | 说明                                                     |
| -------- | -------- | ---- | -------------------------------------------------------- |
| callback | function | 是   | A function that will be passed the current badge number. |

---

### `cancelLocalNotifications()`

```javascript
PushNotificationIOS.cancelLocalNotifications(userInfo);
```

Cancel local notifications.

Optionally restricts the set of canceled notifications to those notifications whose `userInfo` fields match the corresponding fields in the `userInfo` argument.

**参数：**

| 名称     | 类型   | 必填 | 说明 |
| -------- | ------ | ---- | ---- |
| userInfo | object | 否   |      |

---

### `getScheduledLocalNotifications()`

```javascript
PushNotificationIOS.getScheduledLocalNotifications(callback);
```

Gets the local notifications that are currently scheduled.

**参数：**

| 名称     | 类型     | 必填 | 说明                                                                               |
| -------- | -------- | ---- | ---------------------------------------------------------------------------------- |
| callback | function | 是   | A function that will be passed an array of objects describing local notifications. |

---

### `addEventListener()`

```javascript
PushNotificationIOS.addEventListener(type, handler);
```

Attaches a listener to remote or local notification events while the app is running in the foreground or the background.

**参数：**

| 名称    | 类型     | 必填 | 说明        |
| ------- | -------- | ---- | ----------- |
| type    | string   | 是   | Event type. |
| handler | function | 是   | Listener.   |

Valid events are:

* `notification` : Fired when a remote notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
* `localNotification` : Fired when a local notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
* `register`: Fired when the user registers for remote notifications. The handler will be invoked with a hex string representing the deviceToken.
* `registrationError`: Fired when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. The handler will be invoked with {message: string, code: number, details: any}.

---

### `removeEventListener()`

```javascript
PushNotificationIOS.removeEventListener(type, handler);
```

Removes the event listener. Do this in `componentWillUnmount` to prevent memory leaks

**参数：**

| 名称    | 类型     | 必填 | 说明        |
| ------- | -------- | ---- | ----------- |
| type    | string   | 是   | Event type. |
| handler | function | 是   | Listener.   |

---

### `requestPermissions()`

```javascript
PushNotificationIOS.requestPermissions([permissions]);
```

Requests notification permissions from iOS, prompting the user's dialog box. By default, it will request all notification permissions, but a subset of these can be requested by passing a map of requested permissions. The following permissions are supported:

* `alert`
* `badge`
* `sound`

If a map is provided to the method, only the permissions with truthy values will be requested.

This method returns a promise that will resolve when the user accepts, rejects, or if the permissions were previously rejected. The promise resolves to the current state of the permission.

**参数：**

| 名称        | 类型  | 必填 | 说明                   |
| ----------- | ----- | ---- | ---------------------- |
| permissions | array | 否   | alert, badge, or sound |

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

**参数：**

| 名称     | 类型     | 必填 | 说明         |
| -------- | -------- | ---- | ------------ |
| callback | function | 是   | 看下面的说明 |

`callback` will be invoked with a `permissions` object:

* `alert` :boolean
* `badge` :boolean
* `sound` :boolean

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

Gets the data object on the notif
