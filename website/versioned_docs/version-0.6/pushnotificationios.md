---
id: version-0.6-pushnotificationios
title: PushNotificationIOS
original_id: pushnotificationios
---

Handle push notifications for your app, including permission handling and icon badge number.

To get up and running, [configure your notifications with Apple](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringPushNotifications/ConfiguringPushNotifications.html) and your server-side system. To get an idea, [this is the Parse guide](https://parse.com/tutorials/ios-push-notifications).

### Methods

- [`setApplicationIconBadgeNumber`](pushnotificationios.md#setapplicationiconbadgenumber)
- [`getApplicationIconBadgeNumber`](pushnotificationios.md#getapplicationiconbadgenumber)
- [`addEventListener`](pushnotificationios.md#addeventlistener)
- [`requestPermissions`](pushnotificationios.md#requestpermissions)
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

### `addEventListener()`

```javascript
static addEventListener(type, handler)
```

Attaches a listener to remote notification events while the app is running in the foreground or the background.

Valid events are:

- `notification` : Fired when a remote notification is received. The handler will be invoked with an instance of `PushNotificationIOS`.
- `register`: Fired when the user registers for remote notifications. The handler will be invoked with a hex string representing the deviceToken.

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

### `removeEventListener()`

```javascript
static removeEventListener(type, handler)
```

Removes the event listener. Do this in `componentWillUnmount` to prevent memory leaks

---

### `popInitialNotification()`

```javascript
static popInitialNotification()
```

An initial notification will be available if the app was cold-launched from a notification.

The first caller of `popInitialNotification` will get the initial notification object, or `null`. Subsequent invocations will return null.

---

### `constructor()`

```javascript
constructor(nativeNotif);
```

You will never need to instansiate `PushNotificationIOS` yourself. Listening to the `notification` event and invoking `popInitialNotification` is sufficient

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
