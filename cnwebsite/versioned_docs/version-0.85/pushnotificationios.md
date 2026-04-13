---
id: pushnotificationios
title: '🗑️ PushNotificationIOS'
---

:::warning 已弃用
请改用[社区提供的替代方案](https://reactnative.directory/?search=notification)。
:::

<div className="banner-native-code-required">
  <h3>仅限原生代码项目</h3>
  <p>以下内容仅适用于暴露了原生代码的项目。如果你使用的是 Expo 托管工作流，请参阅 Expo 文档中的 <a href="https://docs.expo.dev/versions/latest/sdk/notifications/">Notifications</a> 指南以获取相应的替代方案。</p>
</div>

处理应用的通知，包括通知调度和权限管理。

---

## 入门指南

要启用推送通知，请先[在 Apple 配置你的通知](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server)以及服务端系统。

然后，在项目中[启用远程通知](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app#2980038)。这将自动启用所需的设置。

### 启用 `register` 事件支持

在你的 `AppDelegate.m` 中添加：

```objectivec
#import <React/RCTPushNotificationManager.h>
```

然后实现以下代码来处理远程通知注册事件：

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 // This will trigger 'register' events on PushNotificationIOS
 [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 // This will trigger 'registrationError' events on PushNotificationIOS
 [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}
```

### 处理通知

你需要在 `AppDelegate` 中实现 `UNUserNotificationCenterDelegate`：

```objectivec
#import <UserNotifications/UserNotifications.h>

@interface YourAppDelegate () <UNUserNotificationCenterDelegate>
@end
```

在应用启动时设置代理：

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  return YES;
}
```

#### 前台通知

实现 `userNotificationCenter:willPresentNotification:withCompletionHandler:` 来处理应用在前台时到达的通知。使用 completionHandler 来决定是否向用户显示通知，并相应地通知 `RCTPushNotificationManager`：

```objectivec
// Called when a notification is delivered to a foreground app.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:notification];
  // Decide if and how the notification will be shown to the user
  completionHandler(UNNotificationPresentationOptionNone);
}
```

#### 后台通知

实现 `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:` 来处理用户点击通知的情况，通常用于用户点击后台通知打开应用的场景。但是，如果你在 `userNotificationCenter:willPresentNotification:withCompletionHandler:` 中设置了显示前台通知，当用户点击前台通知时也会调用此方法。在这种情况下，你应该只在其中一个回调中通知 `RCTPushNotificationManager`。

如果点击通知导致了应用启动，请调用 `setInitialNotification:`。如果通知之前没有被 `userNotificationCenter:willPresentNotification:withCompletionHandler:` 处理，还需要调用 `didReceiveNotification:`：

```objectivec
- (void)  userNotificationCenter:(UNUserNotificationCenter *)center
  didReceiveNotificationResponse:(UNNotificationResponse *)response
           withCompletionHandler:(void (^)(void))completionHandler
{
  // This condition passes if the notification was tapped to launch the app
  if ([response.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier]) {
    // Allow the notification to be retrieved on the JS side using getInitialNotification()
    [RCTPushNotificationManager setInitialNotification:response.notification];
  }
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:response.notification];
  completionHandler();
}
```

---

# 参考文档

## 方法

### `presentLocalNotification()`

```tsx
static presentLocalNotification(details: PresentLocalNotificationDetails);
```

调度一个本地通知以立即展示。

**参数：**

| 名称    | 类型   | 必需 | 说明       |
| ------- | ------ | ---- | ---------- |
| details | object | 是   | 见下方说明 |

`details` 是一个包含以下字段的对象：

- `alertTitle`：作为通知提醒标题显示的文本。
- `alertBody`：通知提醒中显示的消息。
- `userInfo`：包含额外通知数据的对象（可选）。
- `category`：此通知的类别，可操作通知必需（可选）。例如带有回复或点赞等额外操作的通知。
- `applicationIconBadgeNumber`：作为应用图标角标显示的数字。此属性的默认值为 0，表示不显示角标（可选）。
- `isSilent`：如果为 true，通知将不带声音（可选）。
- `soundName`：通知触发时播放的声音（可选）。
- `alertAction`：已弃用。这曾用于 iOS 旧版的 UILocalNotification。

---

### `scheduleLocalNotification()`

```tsx
static scheduleLocalNotification(details: ScheduleLocalNotificationDetails);
```

调度一个本地通知以在未来展示。

**参数：**

| 名称    | 类型   | 必需 | 说明       |
| ------- | ------ | ---- | ---------- |
| details | object | 是   | 见下方说明 |

`details` 是一个包含以下字段的对象：

- `alertTitle`：作为通知提醒标题显示的文本。
- `alertBody`：通知提醒中显示的消息。
- `fireDate`：通知触发的时间。使用 `fireDate` 或 `fireIntervalSeconds` 来调度通知，`fireDate` 优先。
- `fireIntervalSeconds`：从现在起多少秒后显示通知。
- `userInfo`：包含额外通知数据的对象（可选）。
- `category`：此通知的类别，可操作通知必需（可选）。例如带有回复或点赞等额外操作的通知。
- `applicationIconBadgeNumber`：作为应用图标角标显示的数字。此属性的默认值为 0，表示不显示角标（可选）。
- `isSilent`：如果为 true，通知将不带声音（可选）。
- `soundName`：通知触发时播放的声音（可选）。
- `alertAction`：已弃用。这曾用于 iOS 旧版的 UILocalNotification。
- `repeatInterval`：已弃用。请改用 `fireDate` 或 `fireIntervalSeconds`。

---

### `cancelAllLocalNotifications()`

```tsx
static cancelAllLocalNotifications();
```

取消所有已调度的本地通知。

---

### `removeAllDeliveredNotifications()`

```tsx
static removeAllDeliveredNotifications();
```

从通知中心移除所有已送达的通知。

---

### `getDeliveredNotifications()`

```tsx
static getDeliveredNotifications(callback: (notifications: Object[]) => void);
```

获取当前显示在通知中心的应用通知列表。

**参数：**

| 名称     | 类型     | 必需 | 说明                       |
| -------- | -------- | ---- | -------------------------- |
| callback | function | 是   | 接收已送达通知数组的函数。 |

一个已送达的通知是包含以下字段的对象：

- `identifier`：此通知的标识符。
- `title`：此通知的标题。
- `body`：此通知的正文。
- `category`：此通知的类别（可选）。
- `userInfo`：包含额外通知数据的对象（可选）。
- `thread-id`：此通知的线程标识符（如果有的话）。

---

### `removeDeliveredNotifications()`

```tsx
static removeDeliveredNotifications(identifiers: string[]);
```

从通知中心移除指定的通知。

**参数：**

| 名称        | 类型  | 必需 | 说明             |
| ----------- | ----- | ---- | ---------------- |
| identifiers | array | 是   | 通知标识符数组。 |

---

### `setApplicationIconBadgeNumber()`

```tsx
static setApplicationIconBadgeNumber(num: number);
```

设置主屏幕上应用图标的角标数字。

**参数：**

| 名称   | 类型   | 必需 | 说明               |
| ------ | ------ | ---- | ------------------ |
| number | number | 是   | 应用图标的角标数字 |

---

### `getApplicationIconBadgeNumber()`

```tsx
static getApplicationIconBadgeNumber(callback: (num: number) => void);
```

获取主屏幕上应用图标当前的角标数字。

**参数：**

| 名称     | 类型     | 必需 | 说明                     |
| -------- | -------- | ---- | ------------------------ |
| callback | function | 是   | 处理当前角标数字的函数。 |

---

### `cancelLocalNotifications()`

```tsx
static cancelLocalNotifications(userInfo: Object);
```

取消与提供的 `userInfo` 中的字段匹配的所有已调度本地通知。

**参数：**

| 名称     | 类型   | 必需 | 说明 |
| -------- | ------ | ---- | ---- |
| userInfo | object | 否   |      |

---

### `getScheduledLocalNotifications()`

```tsx
static getScheduledLocalNotifications(
  callback: (notifications: ScheduleLocalNotificationDetails[]) => void,
);
```

获取当前已调度的本地通知列表。

**参数：**

| 名称     | 类型     | 必需 | 说明                               |
| -------- | -------- | ---- | ---------------------------------- |
| callback | function | 是   | 处理描述本地通知的对象数组的函数。 |

---

### `addEventListener()`

```tsx
static addEventListener(
  type: PushNotificationEventName,
  handler:
    | ((notification: PushNotification) => void)
    | ((deviceToken: string) => void)
    | ((error: {message: string; code: number; details: any}) => void),
);
```

为通知事件绑定监听器，包括本地通知、远程通知和通知注册结果。

**参数：**

| 名称    | 类型     | 必需 | 说明                           |
| ------- | -------- | ---- | ------------------------------ |
| type    | string   | 是   | 要监听的事件类型。见下方说明。 |
| handler | function | 是   | 监听器。                       |

有效的事件类型包括：

- `notification`：收到远程通知时触发。处理函数会接收一个 `PushNotificationIOS` 实例。这会处理在前台到达的通知以及用户点击后从后台打开应用的通知。
- `localNotification`：收到本地通知时触发。处理函数会接收一个 `PushNotificationIOS` 实例。这会处理在前台到达的通知以及用户点击后从后台打开应用的通知。
- `register`：用户成功注册远程通知时触发。处理函数会接收一个表示 deviceToken 的十六进制字符串。
- `registrationError`：用户注册远程通知失败时触发。通常由于 APNS 问题或设备是模拟器。处理函数会接收 `{message: string, code: number, details: any}`。

---

### `removeEventListener()`

```tsx
static removeEventListener(
  type: PushNotificationEventName,
);
```

移除事件监听器。在 `componentWillUnmount` 中执行此操作以防止内存泄漏。

**参数：**

| 名称 | 类型   | 必需 | 说明                                        |
| ---- | ------ | ---- | ------------------------------------------- |
| type | string | 是   | 事件类型。可选值参见 `addEventListener()`。 |

---

### `requestPermissions()`

```tsx
static requestPermissions(permissions?: PushNotificationPermissions[]);
```

向 iOS 请求通知权限，会弹出对话框提示用户。默认情况下会请求所有通知权限，但你可以选择性地指定要请求的权限。支持以下权限：

- `alert`
- `badge`
- `sound`

如果传入了一个映射对象，则只会请求值为真的权限。

此方法返回一个 Promise，在用户接受或拒绝请求后、或者权限之前已被拒绝时解析。Promise 解析为请求完成后的权限状态。

**参数：**

| 名称        | 类型  | 必需 | 说明                  |
| ----------- | ----- | ---- | --------------------- |
| permissions | array | 否   | alert、badge 或 sound |

---

### `abandonPermissions()`

```tsx
static abandonPermissions();
```

取消注册通过 Apple Push Notification service 接收的所有远程通知。

你应该只在极少数情况下调用此方法，例如当新版本的应用不再支持所有类型的远程通知时。用户可以通过"设置"应用临时阻止应用接收远程通知。通过此方法取消注册的应用始终可以重新注册。

---

### `checkPermissions()`

```tsx
static checkPermissions(
  callback: (permissions: PushNotificationPermissions) => void,
);
```

检查当前启用了哪些推送权限。

**参数：**

| 名称     | 类型     | 必需 | 说明       |
| -------- | -------- | ---- | ---------- |
| callback | function | 是   | 见下方说明 |

`callback` 会接收一个 `permissions` 对象：

- `alert: boolean`
- `badge: boolean`
- `sound: boolean`

---

### `getInitialNotification()`

```tsx
static getInitialNotification(): Promise<PushNotification | null>;
```

此方法返回一个 Promise。如果应用是通过推送通知启动的，Promise 会解析为一个 `PushNotificationIOS` 类型的对象，对应被点击的通知。否则解析为 `null`。

---

### `getAuthorizationStatus()`

```tsx
static getAuthorizationStatus(): Promise<number>;
```

此方法返回一个 Promise，解析为当前的通知授权状态。可能的值请参见 [UNAuthorizationStatus](https://developer.apple.com/documentation/usernotifications/unauthorizationstatus?language=objc)。

---

### `finish()`

```tsx
finish(result: string);
```

此方法适用于通过 [`application:didReceiveRemoteNotification:fetchCompletionHandler:`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc) 接收的远程通知。但是，此方法已被 `UNUserNotificationCenterDelegate` 取代，如果同时实现了 `application:didReceiveRemoteNotification:fetchCompletionHandler:` 和 `UNUserNotificationCenterDelegate` 的较新处理方法，则不会再调用此方法。

如果你仍然依赖 `application:didReceiveRemoteNotification:fetchCompletionHandler:`，需要在 iOS 端设置事件处理：

```objectivec
- (void)           application:(UIApplication *)application
  didReceiveRemoteNotification:(NSDictionary *)userInfo
        fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler
{
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:handler];
}
```

在 JS 端完成通知处理后，调用 `finish()` 来执行原生完成处理器。调用此方法时，传入最能描述操作结果的获取结果值。可能的值列表请参见 `PushNotificationIOS.FetchResult`。

如果你使用了 `application:didReceiveRemoteNotification:fetchCompletionHandler:`，你*必须*调用此处理器，并且应尽快调用。更多详情请参阅[官方文档](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc)。

---

### `getMessage()`

```tsx
getMessage(): string | Object;
```

`getAlert` 的别名，用于获取通知的主消息字符串。

---

### `getSound()`

```tsx
getSound(): string;
```

从 `aps` 对象中获取声音字符串。对于本地通知，此值为 `null`。

---

### `getCategory()`

```tsx
getCategory(): string;
```

从 `aps` 对象中获取类别字符串。

---

### `getAlert()`

```tsx
getAlert(): string | Object;
```

从 `aps` 对象中获取通知的主消息。另见别名：`getMessage()`。

---

### `getContentAvailable()`

```tsx
getContentAvailable(): number;
```

从 `aps` 对象中获取 content-available 数值。

---

### `getBadgeCount()`

```tsx
getBadgeCount(): number;
```

从 `aps` 对象中获取角标计数数值。

---

### `getData()`

```tsx
getData(): Object;
```

获取通知上的数据对象。

---

### `getThreadID()`

```tsx
getThreadID();
```

获取通知上的线程 ID。
