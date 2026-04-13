---
id: native-modules-ios
title: iOS 原生模块
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NativeDeprecated />

欢迎阅读 iOS 原生模块指南。请先阅读[原生模块简介](native-modules-intro)以了解原生模块的基本概念。

## 创建一个日历原生模块

在本指南中，你将创建一个名为 `CalendarModule` 的原生模块，使你能够从 JavaScript 访问 Apple 的日历 API。最终你将能够从 JavaScript 调用 `CalendarModule.createCalendarEvent('Dinner Party', 'My House');`，从而触发一个创建日历事件的原生方法。

### 环境设置

首先，在 Xcode 中打开你的 React Native 应用中的 iOS 项目。你可以在 React Native 应用中找到 iOS 项目：

<figure>
  <img src="/docs/assets/native-modules-ios-open-project.png" width="500" alt="在 Xcode 中打开 React Native 应用的 iOS 项目" />
  <figcaption>查找 iOS 项目的位置</figcaption>
</figure>

我们推荐使用 Xcode 来编写原生代码。Xcode 是为 iOS 开发而构建的，使用它可以帮助你快速解决代码语法等小错误。

### 创建自定义原生模块文件

第一步是创建我们的主自定义原生模块头文件和实现文件。创建一个名为 `RCTCalendarModule.h` 的新文件

<figure>
  <img src="/docs/assets/native-modules-ios-add-class.png" width="500" alt="创建一个名为 RCTCalendarModule.h 的类" />
  <figcaption>在与 AppDelegate 相同的文件夹中创建自定义原生模块文件</figcaption>
</figure>

并添加以下内容：

```objectivec
//  RCTCalendarModule.h
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end

```

你可以使用任何适合你正在构建的原生模块的名称。将类命名为 `RCTCalendarModule` 是因为你正在创建一个日历原生模块。由于 ObjC 不像 Java 或 C++ 那样有语言级别的命名空间支持，惯例是在类名前添加一个子字符串。这可以是你的应用程序名称或基础设施名称的缩写。在本例中，RCT 代表 React。

如下所示，CalendarModule 类实现了 `RCTBridgeModule` 协议。原生模块是一个实现了 `RCTBridgeModule` 协议的 Objective-C 类。

接下来，让我们开始实现原生模块。在 Xcode 中使用 Cocoa Touch Class 创建对应的实现文件 `RCTCalendarModule.m`，放在同一个文件夹中，并包含以下内容：

```objectivec
// RCTCalendarModule.m
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end

```

### 模块名称

目前，你的 `RCTCalendarModule.m` 原生模块只包含一个 `RCT_EXPORT_MODULE` 宏，它会导出原生模块类并将其注册到 React Native。`RCT_EXPORT_MODULE` 宏还接受一个可选参数，指定模块在 JavaScript 代码中可访问的名称。

这个参数不是字符串字面量。在下面的示例中，传递的是 `RCT_EXPORT_MODULE(CalendarModuleFoo)`，而不是 `RCT_EXPORT_MODULE("CalendarModuleFoo")`。

```objectivec
// To export a module named CalendarModuleFoo
RCT_EXPORT_MODULE(CalendarModuleFoo);
```

然后可以在 JS 中这样访问原生模块：

```tsx
const {CalendarModuleFoo} = ReactNative.NativeModules;
```

如果你不指定名称，JavaScript 模块名将与 Objective-C 类名匹配，但会移除任何 "RCT" 或 "RK" 前缀。

让我们按照下面的示例，不带任何参数调用 `RCT_EXPORT_MODULE`。因此，模块将以 `CalendarModule` 的名称暴露给 React Native，因为这是移除了 RCT 前缀后的 Objective-C 类名。

```objectivec
// Without passing in a name this will export the native module name as the Objective-C class name with "RCT" removed
RCT_EXPORT_MODULE();
```

然后可以在 JS 中这样访问原生模块：

```tsx
const {CalendarModule} = ReactNative.NativeModules;
```

### 向 JavaScript 导出原生方法

除非明确告知，否则 React Native 不会将原生模块中的任何方法暴露给 JavaScript。这可以使用 `RCT_EXPORT_METHOD` 宏来完成。在 `RCT_EXPORT_METHOD` 宏中编写的方法是异步的，因此返回类型始终为 void。为了将 `RCT_EXPORT_METHOD` 方法的结果传递给 JavaScript，你可以使用回调或触发事件（下文会介绍）。让我们使用 `RCT_EXPORT_METHOD` 宏为 `CalendarModule` 原生模块设置一个原生方法。将其命名为 `createCalendarEvent()`，暂时让它接受 name 和 location 两个字符串参数。参数类型选项稍后会介绍。

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
}
```

:::note
请注意，使用 TurboModules 时将不再需要 `RCT_EXPORT_METHOD` 宏，除非你的方法依赖于 RCT 参数转换（参见下面的参数类型）。最终 React Native 将移除 `RCT_EXPORT_MACRO`，因此我们不鼓励使用 `RCTConvert`。相反，你可以在方法体内进行参数转换。
:::

在你完善 `createCalendarEvent()` 方法的功能之前，先在方法中添加一个控制台日志，这样你就可以从 React Native 应用中的 JavaScript 确认它已被调用。使用 React 的 `RCTLog` API。让我们在文件顶部导入该头文件，然后添加日志调用。

```objectivec
#import <React/RCTLog.h>
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
```

### 同步方法

你可以使用 `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD` 来创建同步的原生方法。

```objectivec
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
return [[UIDevice currentDevice] name];
}
```

该方法的返回类型必须是对象类型 (id)，并且应该可以序列化为 JSON。这意味着该方法只能返回 nil 或 JSON 值（例如 NSNumber、NSString、NSArray、NSDictionary）。

目前，我们不建议使用同步方法，因为同步调用方法可能会产生严重的性能问题，并为你的原生模块引入线程相关的错误。此外，请注意，如果你选择使用 `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`，你的应用程序将无法再使用 Google Chrome 调试器。这是因为同步方法要求 JS VM 与应用程序共享内存。对于 Google Chrome 调试器，React Native 运行在 Google Chrome 中的 JS VM 内，并通过 WebSockets 与移动设备进行异步通信。

### 测试你构建的内容

此时，你已经在 iOS 中为原生模块设置了基本的脚手架。通过在 JavaScript 中访问原生模块并调用其导出的方法来测试它。

在你的应用中找到一个位置来添加对原生模块 `createCalendarEvent()` 方法的调用。下面是一个你可以在应用中添加的组件 `NewModuleButton` 的示例。你可以在 `NewModuleButton` 的 `onPress()` 函数中调用原生模块。

```tsx
import React from 'react';
import {Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
```

为了从 JavaScript 访问你的原生模块，你需要先从 React Native 导入 `NativeModules`：

```tsx
import {NativeModules} from 'react-native';
```

然后你可以从 `NativeModules` 访问 `CalendarModule` 原生模块。

```tsx
const {CalendarModule} = NativeModules;
```

现在你已经可以访问 CalendarModule 原生模块了，你可以调用你的原生方法 `createCalendarEvent()`。以下是在 `NewModuleButton` 的 `onPress()` 方法中添加的代码：

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```

最后一步是重新构建 React Native 应用，以便可以使用最新的原生代码（包含你的新原生模块！）。在 React Native 应用所在的命令行中，运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

### 迭代构建

当你使用这些指南并迭代你的原生模块时，你需要进行原生重新构建应用程序，以便从 JavaScript 访问你最近的更改。这是因为你编写的代码位于应用程序的原生部分。虽然 React Native 的 metro 打包器可以监视 JavaScript 中的更改并即时重新构建 JS 包，但它不会对原生代码这样做。因此，如果你想测试最新的原生更改，你需要使用上述命令重新构建。

### 回顾✨

现在你应该能够在 JavaScript 中调用你的原生模块上的 `createCalendarEvent()` 方法。由于你在函数中使用了 `RCTLog`，你可以通过[在应用中启用调试模式](https://reactnative.dev/docs/debugging#chrome-developer-tools)并在 Chrome 或移动应用调试器 Flipper 中查看 JS 控制台来确认你的原生方法正在被调用。每次调用原生模块方法时，你都应该看到 `RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);` 消息。

<figure>
  <img src="/docs/assets/native-modules-ios-logs.png" width="1000" alt="日志图片" />
  <figcaption>Flipper 中的 iOS 日志</figcaption>
</figure>

此时你已经创建了一个 iOS 原生模块并从 React Native 应用中的 JavaScript 调用了它的方法。你可以继续阅读以了解更多内容，比如你的原生模块方法接受哪些参数类型，以及如何在原生模块中设置回调和 Promise。

## 超越日历原生模块

### 更好的原生模块导出方式

像上面那样从 `NativeModules` 中提取你的原生模块导入方式有点笨拙。

为了让你的原生模块的使用者不必每次都这样做，你可以为该模块创建一个 JavaScript 包装器。创建一个名为 NativeCalendarModule.js 的新 JavaScript 文件，内容如下：

```tsx
/**
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
export default CalendarModule;
```

这个 JavaScript 文件也是添加任何 JavaScript 端功能的好地方。例如，如果你使用像 TypeScript 这样的类型系统，你可以在这里为你的原生模块添加类型注解。虽然 React Native 还不支持从原生到 JS 的类型安全，但有了这些类型注解，你所有的 JS 代码都将具有类型安全。这些注解也将使你将来更容易切换到类型安全的原生模块。以下是一个为日历模块添加类型安全的示例：

```tsx
/**
 * This exposes the native CalendarModule module as a JS module. This has a
 * function 'createCalendarEvent' which takes the following parameters:
 *
 * 1. String name: A string representing the name of the event
 * 2. String location: A string representing the location of the event
 */
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}
export default CalendarModule as CalendarInterface;
```

在你的其他 JavaScript 文件中，你可以这样访问原生模块并调用它的方法：

```tsx
import NativeCalendarModule from './NativeCalendarModule';
NativeCalendarModule.createCalendarEvent('foo', 'bar');
```

:::note
这假设你导入 `CalendarModule` 的位置与 `NativeCalendarModule.js` 处于相同的目录层级。请根据需要更新相对导入路径。
:::

### 参数类型

当在 JavaScript 中调用原生模块方法时，React Native 会将参数从 JS 对象转换为其 Objective-C/Swift 对象对应物。例如，如果你的 Objective-C 原生模块方法接受一个 NSNumber，在 JS 中你需要用一个数字来调用该方法。React Native 会为你处理转换。下面是原生模块方法支持的参数类型及其 JavaScript 等价物的列表。

| Objective-C                                   | JavaScript         |
| --------------------------------------------- | ------------------ |
| NSString                                      | string, ?string    |
| BOOL                                          | boolean            |
| double                                        | number             |
| NSNumber                                      | ?number            |
| NSArray                                       | Array, ?Array      |
| NSDictionary                                  | Object, ?Object    |
| RCTResponseSenderBlock                        | Function (success) |
| RCTResponseSenderBlock, RCTResponseErrorBlock | Function (failure) |
| RCTPromiseResolveBlock, RCTPromiseRejectBlock | Promise            |

:::info
以下类型目前受支持，但在 TurboModules 中将不再支持。请避免使用它们。

- Function (failure) -> RCTResponseErrorBlock
- Number -> NSInteger
- Number -> CGFloat
- Number -> float
  :::

对于 iOS，你还可以使用 `RCTConvert` 类支持的任何参数类型来编写原生模块方法（有关支持的类型的详细信息，请参阅 [RCTConvert](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTConvert.h)）。RCTConvert 辅助函数都接受一个 JSON 值作为输入，并将其映射到原生 Objective-C 类型或类。

### 导出常量

原生模块可以通过重写原生方法 `constantsToExport()` 来导出常量。下面重写了 `constantsToExport()`，返回一个包含默认事件名称属性的字典，你可以在 JavaScript 中这样访问：

```objectivec
- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}
```

然后可以通过在 JS 中调用原生模块的 `getConstants()` 来访问该常量：

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);
```

从技术上讲，可以直接从 `NativeModule` 对象访问在 `constantsToExport()` 中导出的常量。这在 TurboModules 中将不再受支持，因此我们鼓励社区切换到上述方法，以避免将来需要进行不必要的迁移。

:::note
常量仅在初始化时导出，因此如果你在运行时更改 `constantsToExport()` 的值，不会影响 JavaScript 环境。
:::

对于 iOS，如果你重写了 `constantsToExport()`，那么你还应该实现 `+ requiresMainQueueSetup`，以便让 React Native 知道你的模块是否需要在主线程上初始化，在任何 JavaScript 代码执行之前。否则你会看到一个警告，提示将来你的模块可能会在后台线程上初始化，除非你明确使用 `+ requiresMainQueueSetup:` 选择退出。如果你的模块不需要访问 UIKit，那么你应该对 `+ requiresMainQueueSetup` 返回 NO。

### 回调

原生模块还支持一种特殊的参数——回调。回调用于将数据从 Objective-C 传递给 JavaScript 的异步方法。它们也可以用于从原生端异步执行 JS。

对于 iOS，回调使用 `RCTResponseSenderBlock` 类型实现。下面将回调参数 `myCallBack` 添加到 `createCalendarEventMethod()` 中：

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                location:(NSString *)location
                myCallback:(RCTResponseSenderBlock)callback)

```

然后你可以在原生函数中调用回调，提供你想要传递给 JavaScript 的任何结果，放在一个数组中。请注意，`RCTResponseSenderBlock` 只接受一个参数——要传递给 JavaScript 回调的参数数组。下面你将传回在先前调用中创建的事件的 ID。

:::info
重要的是要强调，回调并不是在原生函数完成后立即调用的——请记住通信是异步的。
:::

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
 NSInteger eventId = ...
 callback(@[@(eventId)]);

 RCTLogInfo(@"Pretending to create an event %@ at %@", title, location);
}

```

然后可以使用以下方式在 JavaScript 中访问此方法：

```tsx
const onSubmit = () => {
  CalendarModule.createCalendarEvent(
    'Party',
    '04-12-2020',
    eventId => {
      console.log(`Created a new event with id ${eventId}`);
    },
  );
};
```

原生模块应该只调用其回调一次。但是，它可以保存 callback 并在以后调用。此模式通常用于封装需要委托的 iOS API——请参阅 [`RCTAlertManager`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/CoreModules/RCTAlertManager.mm) 作为示例。如果回调从未被调用，则会泄漏一些内存。

有两种处理回调错误的方法。第一种是遵循 Node 的约定，将传递给回调数组的第一个参数视为错误对象。

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
  NSNumber *eventId = [NSNumber numberWithInt:123];
  callback(@[[NSNull null], eventId]);
}
```

在 JavaScript 中，你可以检查第一个参数以查看是否传递了错误：

```tsx
const onPress = () => {
  CalendarModule.createCalendarEventCallback(
    'testName',
    'testLocation',
    (error, eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

另一个选择是使用两个单独的回调：onFailure 和 onSuccess。

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title
                  location:(NSString *)location
                  errorCallback: (RCTResponseSenderBlock)errorCallback
                  successCallback: (RCTResponseSenderBlock)successCallback)
{
  @try {
    NSNumber *eventId = [NSNumber numberWithInt:123];
    successCallback(@[eventId]);
  }

  @catch ( NSException *e ) {
    errorCallback(@[e]);
  }
}
```

然后在 JavaScript 中，你可以为错误和成功响应分别添加回调：

```tsx
const onPress = () => {
  CalendarModule.createCalendarEventCallback(
    'testName',
    'testLocation',
    error => {
      console.error(`Error found! ${error}`);
    },
    eventId => {
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

如果你想向 JavaScript 传递类似错误的对象，请使用 [`RCTUtils.h`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTUtils.h) 中的 `RCTMakeError`。目前它只是向 JavaScript 传递一个 Error 形状的字典，但 React Native 的目标是在将来自动生成真正的 JavaScript Error 对象。你还可以提供一个 `RCTResponseErrorBlock` 参数，用于错误回调并接受一个 `NSError \* object`。请注意，此参数类型在 TurboModules 中将不被支持。

### Promises

原生模块还可以实现 Promise，这可以简化你的 JavaScript 代码，尤其是在使用 ES2016 的 `async/await` 语法时。当原生模块方法的最后一个参数是 `RCTPromiseResolveBlock` 和 `RCTPromiseRejectBlock` 时，其对应的 JS 方法将返回一个 JS Promise 对象。

将上面的代码重构为使用 Promise 而不是回调，如下所示：

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                 location:(NSString *)location
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
 NSInteger eventId = createCalendarEvent();
 if (eventId) {
    resolve(@(eventId));
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}

```

此方法的 JavaScript 对应方法返回一个 Promise。这意味着你可以在 async 函数中使用 `await` 关键字来调用它并等待结果：

```tsx
const onSubmit = async () => {
  try {
    const eventId = await CalendarModule.createCalendarEvent(
      'Party',
      'my house',
    );
    console.log(`Created a new event with id ${eventId}`);
  } catch (e) {
    console.error(e);
  }
};
```

### 向 JavaScript 发送事件

即使没有被 JavaScript 直接调用，原生模块也可以向 JavaScript 发送事件信号。例如，你可能想向 JavaScript 发送一个提醒，表示来自原生 iOS 日历应用的日历事件即将发生。最好的方法是子类化 `RCTEventEmitter`，实现 `supportedEvents` 并调用 `self sendEventWithName`：

更新你的头文件类以导入 `RCTEventEmitter` 并子类化 `RCTEventEmitter`：

```objectivec
//  CalendarModule.h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>
@end

```

JavaScript 代码可以通过在你的模块周围创建一个新的 `NativeEventEmitter` 实例来订阅这些事件。

如果你在没有监听器的情况下触发事件，将会收到一个资源浪费的警告。为了避免这种情况，并优化你的模块工作负载（例如取消订阅上游通知或暂停后台任务），你可以在 `RCTEventEmitter` 子类中覆盖 `startObserving` 和 `stopObserving`。

```objectivec
@implementation CalendarModule
{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (hasListeners) {// Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}

```

### 线程

除非原生模块提供自己的方法队列，否则它不应该对自己被调用时所处的线程做任何假设。目前，如果原生模块不提供方法队列，React Native 将为其创建一个单独的 GCD 队列并在其中调用其方法。请注意，这是一个实现细节，将来可能会改变。如果你想明确为原生模块提供方法队列，请在原生模块中重写 `(dispatch_queue_t) methodQueue` 方法。例如，如果它需要使用仅限主线程的 iOS API，应该通过以下方式指定：

```objectivec
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
```

类似地，如果一个操作可能需要很长时间才能完成，原生模块可以指定自己的队列来运行操作。再次强调，目前 React Native 会为你的原生模块提供一个单独的方法队列，但这是一个你不应该依赖的实现细节。如果你不提供自己的方法队列，将来你的原生模块的长时间运行操作可能会阻塞在其他不相关的原生模块上执行的异步调用。`RCTAsyncLocalStorage` 模块在这里创建了自己的队列，这样 React 队列就不会因为可能较慢的磁盘访问而被阻塞。

```objectivec
- (dispatch_queue_t)methodQueue
{
 return dispatch_queue_create("com.facebook.React.AsyncLocalStorageQueue", DISPATCH_QUEUE_SERIAL);
}
```

指定的 `methodQueue` 将由你模块中的所有方法共享。如果你的方法中只有一个方法是长时间运行的（或者由于某种原因需要在不同的队列中运行），你可以在方法体内使用 `dispatch_async` 在另一个队列中执行该特定方法的代码，而不会影响其他方法：

```objectivec
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
 dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
   // 在后台线程上执行长时间运行的代码
   ...
   // 你可以从任何线程/队列调用回调
   callback(@[...]);
 });
}

```

:::info 在模块之间共享调度队列
`methodQueue` 方法会在模块初始化时调用一次，然后由 React Native 保留，因此你自己不需要保留对该队列的引用，除非你希望在模块中使用它。但是，如果你希望在多个模块之间共享同一个队列，那么你需要确保为每个模块保留并返回相同的队列实例。
:::

### 依赖注入

React Native 会自动创建和初始化任何注册的原生模块。但是，你可能希望创建和初始化自己的模块实例，例如注入依赖项。

你可以通过创建一个实现 `RCTBridgeDelegate` 协议的类来实现这一点，用该委托初始化一个 `RCTBridge`，并用初始化的桥接器初始化一个 `RCTRootView`。

```objectivec
id<RCTBridgeDelegate> moduleInitialiser = [[classThatImplementsRCTBridgeDelegate alloc] init];

RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:moduleInitialiser launchOptions:nil];

RCTRootView *rootView = [[RCTRootView alloc]
                        initWithBridge:bridge
                            moduleName:kModuleName
                     initialProperties:nil];
```

### 导出 Swift 模块

Swift 不支持宏，因此在 React Native 中向 JavaScript 暴露原生模块及其方法需要更多的设置。不过，它的工作方式基本相同。假设你有一个相同的 `CalendarModule`，但它是用 Swift 实现的类：

```swift
// CalendarModule.swift

@objc(CalendarModule)
class CalendarModule: NSObject {

 @objc(addEvent:location:date:)
 func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
   // Date is ready to use!
 }

 @objc
 func constantsToExport() -> [String: Any]! {
   return ["someKey": "someValue"]
 }

}
```

:::note
使用 `@objc` 修饰符以确保类和函数正确导出到 Objective-C 运行时非常重要。
:::

然后创建一个私有实现文件，将所需信息注册到 React Native：

```objectivec
// CalendarModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarModule, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)

@end
```

如果你不熟悉 Swift 和 Objective-C，当你[在 iOS 项目中混合使用两种语言](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html)时，你还需要一个额外的桥接头文件，称为 bridging header，用于将 Objective-C 文件暴露给 Swift。如果你通过 Xcode 菜单中的 `File>New File` 添加 Swift 文件，Xcode 会自动为你创建这个头文件。你需要在这个头文件中导入 `RCTBridgeModule.h`。

```objectivec
// CalendarModule-Bridging-Header.h
#import <React/RCTBridgeModule.h>
```

你还可以使用 `RCT_EXTERN_REMAP_MODULE` 和 `_RCT_EXTERN_REMAP_METHOD` 来更改你正在导出的模块或方法的 JavaScript 名称。更多信息请参阅 [`RCTBridgeModule`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTBridgeModule.h)。

:::note
制作第三方模块时的重要注意事项：只有 Xcode 9 及更高版本才支持在静态库中使用 Swift。为了在使用模块中包含的 iOS 静态库中的 Swift 时构建 Xcode 项目，你的主应用项目必须包含 Swift 代码和桥接头文件本身。如果你的应用项目不包含任何 Swift 代码，一个解决方法是添加一个空的 .swift 文件和一个空的桥接头文件。
:::

### 保留方法名

#### invalidate()

在 iOS 上，原生模块可以通过实现 `invalidate()` 方法来符合 [RCTInvalidating](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTInvalidating.h) 协议。当原生桥接失效时（例如在开发模式重新加载时），可以[调用](https://github.com/facebook/react-native/blob/0.62-stable/ReactCommon/turbomodule/core/platform/ios/RCTTurboModuleManager.mm#L456)此方法。请根据需要使用此机制为你的原生模块执行必要的清理工作。
