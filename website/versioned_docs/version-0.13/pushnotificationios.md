---
id: version-0.13-pushnotificationios
title: PushNotificationIOS
original_id: pushnotificationios
---

Handle push notifications for your app, including permission handling and icon badge number.

To get up and running, [configure your notifications with Apple](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW6) and your server-side system. To get an idea, [this is the Parse guide](https://parse.com/tutorials/ios-push-notifications).

### Methods

- [`presentLocalNotification`](pushnotificationios.md#presentlocalnotification)
- [`scheduleLocalNotification`](pushnotificationios.md#schedulelocalnotification)
- [`setApplicationIconBadgeNumber`](pushnotificationios.md#setapplicationiconbadgenumber)
- [`getApplicationIconBadgeNumber`](pushnotificationios.md#getapplicationiconbadgenumber)
- [`addEventListener`](pushnotificationios.md#addeventlistener)
- [`requestPermissions`](pushnotificationios.md#requestpermissions)
- [`abandonPermissions`](pushnotificationios.md#abandonpermissions)
- [`checkPermissions`](pushnotificationios.md#checkpermissions)
- [`removeEventListener`](pushnotificationios.md#removeeventlistener)
- [`popInitialNotification`](pushnotificationios.md#popinitialnotification)
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

```jsx
static presentLocalNotification(details)
```

Schedules the localNotification for immediate presentation.

details is an object containing:

- `alertBody` : The message displayed in the notification alert.

---

### `scheduleLocalNotification()`

```jsx
static scheduleLocalNotification(details)
```

Schedules the localNotification for future presentation.

details is an object containing:

- `fireDate` : The date and time when the system should deliver the notification.
- `alertBody` : The message displayed in the notification alert.

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

### `addEventListener()`

```jsx
static addEventListener(type, handler)
```

Attaches a listener to remote notification events while the app is running in the foreground or the background.

Valid events are:

- `notification` : Fired when a remote notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `register`: Fired when the user registers for remote notifications. The handler will be invoked with a hex string representing the deviceToken.

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

### `removeEventListener()`

```jsx
static removeEventListener(type, handler)
```

Removes the event listener. Do this in `componentWillUnmount` to prevent memory leaks

---

### `popInitialNotification()`

```jsx
static popInitialNotification()
```

An initial notification will be available if the app was cold-launched from a notification.

The first caller of `popInitialNotification` will get the initial notification object, or `null`. Subsequent invocations will return null.

---

### `constructor()`

```jsx
constructor(nativeNotif);
```

You will never need to instansiate `PushNotificationIOS` yourself. Listening to the `notification` event and invoking `popInitialNotification` is sufficient

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
