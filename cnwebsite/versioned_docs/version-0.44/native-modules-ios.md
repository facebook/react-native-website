---
id: version-0.44-native-modules-ios
title: 原生模块
original_id: native-modules-ios
---

有时候App需要访问平台API，但React Native可能还没有相应的模块封装；或者你需要复用Objective-C、Swift或C++代码，而不是用JavaScript重新实现一遍；又或者你需要实现某些高性能、多线程的代码，譬如图片处理、数据库、或者各种高级扩展等等。

我们把React Native设计为可以在其基础上编写真正的原生代码，并且可以访问平台所有的能力。这是一个相对高级的特性，我们并不认为它应当在日常开发的过程中经常出现，但具备这样的能力是很重要的。如果React Native还不支持某个你需要的原生特性，你应当可以自己实现该特性的封装。

本文是关于如何封装原生模块的高级向导，我们假设您已经具备Objective-C或者Swift，以及iOS核心库（Foundation、UIKit）的相关知识。

## iOS 日历模块演示

本向导将会用[iOS日历API](https://developer.apple.com/library/mac/documentation/DataManagement/Conceptual/EventKitProgGuide/Introduction/Introduction.html)作为示例。我们的目标就是在Javascript中可以访问到iOS的日历功能。

在React Native中，一个“原生模块”就是一个实现了“RCTBridgeModule”协议的Objective-C类，其中RCT是ReaCT的缩写。

```objective-c
// CalendarManager.h
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface CalendarManager : NSObject <RCTBridgeModule>
@end
```

为了实现`RCTBridgeModule`协议，你的类需要包含`RCT_EXPORT_MODULE()`宏。这个宏也可以添加一个参数用来指定在Javascript中访问这个模块的名字。如果你不指定，默认就会使用这个Objective-C类的名字。

```objective-c
// CalendarManager.m
@implementation CalendarManager

RCT_EXPORT_MODULE();

@end
```

你必须明确的声明要给Javascript导出的方法，否则React Native不会导出任何方法。声明通过`RCT_EXPORT_METHOD()`宏来实现：

```objective-c
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
```

现在从Javascript里可以这样调用这个方法：

```javascript
import { NativeModules } from 'react-native';
var CalendarManager = NativeModules.CalendarManager;
CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
```

> **注意**: Javascript方法名
>
> 导出到Javascript的方法名是Objective-C的方法名的第一个部分。React Native还定义了一个`RCT_REMAP_METHOD()`宏，它可以指定Javascript方法名。当许多方法的第一部分相同的时候用它来避免在Javascript端的名字冲突。

桥接到Javascript的方法返回值类型必须是`void`。React Native的桥接操作是异步的，所以要返回结果给Javascript，你必须通过回调或者触发事件来进行。（参见本文档后面的部分）

## 参数类型

`RCT_EXPORT_METHOD` 支持所有标准JSON类型，包括：

- string (`NSString`)
- number (`NSInteger`, `float`, `double`, `CGFloat`, `NSNumber`)
- boolean (`BOOL`, `NSNumber`)
- array (`NSArray`) 包含本列表中任意类型
- object (`NSDictionary`) 包含string类型的键和本列表中任意类型的值
- function (`RCTResponseSenderBlock`)

除此以外，任何`RCTConvert`类支持的的类型也都可以使用(参见[`RCTConvert`](https://github.com/facebook/react-native/blob/master/React/Base/RCTConvert.h)了解更多信息)。`RCTConvert`还提供了一系列辅助函数，用来接收一个JSON值并转换到原生Objective-C类型或类。

在我们的`CalendarManager`例子里，我们需要把事件的时间交给原生方法。我们不能在桥接通道里传递Date对象，所以需要把日期转化成字符串或数字来传递。我们可以这么实现原生函数：

```objective-c
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)secondsSinceUnixEpoch)
{
  NSDate *date = [RCTConvert NSDate:secondsSinceUnixEpoch];
}
```

或者这样：

```objective-c
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSString *)ISO8601DateString)
{
  NSDate *date = [RCTConvert NSDate:ISO8601DateString];
}
```

不过我们可以依靠自动类型转换的特性，跳过手动的类型转换，而直接这么写：

```objective-c
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSDate *)date)
{
  // Date is ready to use!
}
```

在Javascript既可以这样：

```javascript
CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey', date.getTime()); // 把日期以unix时间戳形式传递
```

也可以这样：

```javascript
CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey', date.toISOString()); // 把日期以ISO-8601的字符串形式传递
```

两个值都会被转换为正确的`NSDate`类型。但如果提供一个不合法的值，譬如一个`Array`，则会产生一个“红屏”报错信息。

随着`CalendarManager.addEvent`方法变得越来越复杂，参数的个数越来越多，其中有一些可能是可选的参数。在这种情况下我们应该考虑修改我们的API，用一个dictionary来存放所有的事件参数，像这样：

```objective-c
#import <React/RCTConvert.h>

RCT_EXPORT_METHOD(addEvent:(NSString *)name details:(NSDictionary *)details)
{
  NSString *location = [RCTConvert NSString:details[@"location"]];
  NSDate *time = [RCTConvert NSDate:details[@"time"]];
  ...
}
```

然后在JS里这样调用：

```javascript
CalendarManager.addEvent('Birthday Party', {
  location: '4 Privet Drive, Surrey',
  time: date.toTime(),
  description: '...'
})
```

> **注意**: 关于数组和映射
>
> Objective-C并没有提供确保这些结构体内部值的类型的方式。你的原生模块可能希望收到一个字符串数组，但如果JavaScript在调用的时候提供了一个混合number和string的数组，你会收到一个`NSArray`，里面既有`NSNumber`也有`NSString`。对于数组来说，`RCTConvert`提供了一些类型化的集合，譬如`NSStringArray`或者`UIColorArray`，你可以用在你的函数声明中。对于映射而言，开发者有责任自己调用`RCTConvert`的辅助方法来检测和转换值的类型。

## 回调函数

> **警告**
>
> 本章节内容目前还处在实验阶段，因为我们还并没有太多的实践经验来处理回调函数。

原生模块还支持一种特殊的参数——回调函数。它提供了一个函数来把返回值传回给JavaScript。

```objective-c
RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  NSArray *events = ...
  callback(@[[NSNull null], events]);
}
```

`RCTResponseSenderBlock`只接受一个参数——传递给JavaScript回调函数的参数数组。在上面这个例子里我们用Node.js的常用习惯：第一个参数是一个错误对象（没有发生错误的时候为null），而剩下的部分是函数的返回值。

```javascript
CalendarManager.findEvents((error, events) => {
  if (error) {
    console.error(error);
  } else {
    this.setState({events: events});
  }
})
```

原生模块通常只应调用回调函数一次。但是，它可以保存callback并在将来调用。这在封装那些通过“委托函数”来获得返回值的iOS API时最为常见。[`RCTAlertManager`](https://github.com/facebook/react-native/blob/master/React/Modules/RCTAlertManager.m)中就属于这种情况。

如果你想传递一个更接近`Error`类型的对象给Javascript，可以用[`RCTUtils.h`](https://github.com/facebook/react-native/blob/master/React/Base/RCTUtils.h)提供的`RCTMakeError`函数。现在它仅仅是发送了一个和Error结构一样的dictionary给Javascript，但我们考虑在将来版本里让它产生一个真正的`Error`对象。

> **注意**
>
> 如果你传递了回调函数，那么在原生端就必须执行它（如果传递了两个，比如onSuccess和onFail，那么执行其中一个即可），否则会导致内存泄漏。

## Promises

__译注__：这一部分涉及到较新的js语法和特性，不熟悉的读者建议先阅读ES6的相关书籍和文档。

原生模块还可以使用promise来简化代码，搭配ES2016(ES7)标准的`async/await`语法则效果更佳。如果桥接原生方法的最后两个参数是`RCTPromiseResolveBlock`和`RCTPromiseRejectBlock`，则对应的JS方法就会返回一个Promise对象。

我们把上面的代码用promise来代替回调进行重构：

```objective-c
RCT_REMAP_METHOD(findEvents,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *events = ...
  if (events) {
    resolve(events);
  } else {
    reject(error);
  }
}
```

现在JavaScript端的方法会返回一个Promise。这样你就可以在一个声明了`async`的异步函数内使用`await`关键字来调用，并等待其结果返回。（虽然这样写着看起来像同步操作，但实际仍然是异步的，并不会阻塞执行来等待）。

```js
async function updateEvents() {
  try {
    var events = await CalendarManager.findEvents();

    this.setState({ events });
  } catch (e) {
    console.error(e);
  }
}

updateEvents();
```

## 多线程

原生模块不应对自己被调用时所处的线程做任何假设。React Native在一个独立的串行GCD队列中调用原生模块的方法，但这属于实现的细节，并且可能会在将来的版本中改变。通过实现方法`- (dispatch_queue_t)methodQueue`，原生模块可以指定自己想在哪个队列中被执行。具体来说，如果模块需要调用一些必须在主线程才能使用的API，那应当这样指定：

```objective-c
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
```

类似的，如果一个操作需要花费很长时间，原生模块不应该阻塞住，而是应当声明一个用于执行操作的独立队列。举个例子，`RCTAsyncLocalStorage`模块创建了自己的一个queue，这样它在做一些较慢的磁盘操作的时候就不会阻塞住React本身的消息队列：

```objective-c
- (dispatch_queue_t)methodQueue
{
  return dispatch_queue_create("com.facebook.React.AsyncLocalStorageQueue", DISPATCH_QUEUE_SERIAL);
}
```

指定的`methodQueue`会被你模块里的所有方法共享。如果你的方法中“只有一个”是耗时较长的（或者是由于某种原因必须在不同的队列中运行的），你可以在函数体内用`dispatch_async`方法来在另一个队列执行，而不影响其他方法：

```objective-c
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    // 在这里执行长时间的操作
    ...
    // 你可以在任何线程/队列中执行回调函数
    callback(@[...]);
  });
}
```

> **注意**: 在模块之间共享分发队列
>
> `methodQueue`方法会在模块被初始化的时候被执行一次，然后会被React Native的桥接机制保存下来，所以你不需要自己保存队列的引用，除非你希望在模块的其它地方使用它。但是，如果你希望在若干个模块中共享同一个队列，则需要自己保存并返回相同的队列实例；仅仅是返回相同名字的队列是不行的。

## 依赖注入
bridge会自动注册实现了`RCTBridgeModule`协议的模块，但是你可能也希望能够初始化自定义的模块实例（这样可以注入依赖）。
 
要实现这个功能，你需要实现`RCTBridgeDelegate`协议，初始化`RCTBridge`，并且在初始化方法里指定代理。然后用初始化好的`RCTBridge`实例初始化一个`RCTRootView`。
 
```objective-c
id<RCTBridgeDelegate> moduleInitialiser = [[classThatImplementsRCTBridgeDelegate alloc] init];

RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:moduleInitialiser launchOptions:nil];

RCTRootView *rootView = [[RCTRootView alloc]
                        initWithBridge:bridge
                            moduleName:kModuleName
                     initialProperties:nil];
```

## 导出常量

原生模块可以导出一些常量，这些常量在JavaScript端随时都可以访问。用这种方法来传递一些静态数据，可以避免通过bridge进行一次来回交互。

```objective-c
- (NSDictionary *)constantsToExport
{
  return @{ @"firstDayOfTheWeek": @"Monday" };
}
```

Javascript端可以随时同步地访问这个数据：

```javascript
console.log(CalendarManager.firstDayOfTheWeek);
```

但是注意这个常量仅仅在初始化的时候导出了一次，所以即使你在运行期间改变`constantToExport`返回的值，也不会影响到JavaScript环境下所得到的结果。

### 枚举常量

用`NS_ENUM`定义的枚举类型必须要先扩展对应的RCTConvert方法才可以作为函数参数传递。

假设我们要导出如下的`NS_ENUM`定义：

```objc
typedef NS_ENUM(NSInteger, UIStatusBarAnimation) {
    UIStatusBarAnimationNone,
    UIStatusBarAnimationFade,
    UIStatusBarAnimationSlide,
};
```

你需要这样来扩展RCTConvert类：

```objc
@implementation RCTConvert (StatusBarAnimation)
  RCT_ENUM_CONVERTER(UIStatusBarAnimation, (@{ @"statusBarAnimationNone" : @(UIStatusBarAnimationNone),
                                               @"statusBarAnimationFade" : @(UIStatusBarAnimationFade),
                                               @"statusBarAnimationSlide" : @(UIStatusBarAnimationSlide)}),
                      UIStatusBarAnimationNone, integerValue)
@end
```

接着你可以这样定义方法并且导出enum值作为常量：

```objc
- (NSDictionary *)constantsToExport
{
  return @{ @"statusBarAnimationNone" : @(UIStatusBarAnimationNone),
            @"statusBarAnimationFade" : @(UIStatusBarAnimationFade),
            @"statusBarAnimationSlide" : @(UIStatusBarAnimationSlide) }
};

RCT_EXPORT_METHOD(updateStatusBarAnimation:(UIStatusBarAnimation)animation
                                completion:(RCTResponseSenderBlock)callback)
```

你的枚举现在会用上面提供的选择器进行转换（上面的例子中是`integerValue`），然后再传递给你导出的函数。

## 给Javascript发送事件

即使没有被JavaScript调用，原生模块也可以给JavaScript发送事件通知。最好的方法是继承`RCTEventEmitter`，实现`suppportEvents`方法并调用`self sendEventWithName:`。

```objective-c
// CalendarManager.h
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CalendarManager : RCTEventEmitter <RCTBridgeModule>

@end
```
```objective-c
// CalendarManager.m
#import "CalendarManager.h"

@implementation CalendarManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminder"];
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
}

@end
```
JavaScript代码可以创建一个包含你的模块的`NativeEventEmitter`实例来订阅这些事件。

```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';
const { CalendarManager } = NativeModules;

const calendarManagerEmitter = new NativeEventEmitter(CalendarManager);

const subscription = calendarManagerEmitter.addListener(
  'EventReminder',
  (reminder) => console.log(reminder.name)
);
...
// 别忘了取消订阅，通常在componentWillUnmount生命周期方法中实现。
subscription.remove();
```
更多给JavaScript发送事件的例子请看[`RCTLocationObserver`](https://github.com/facebook/react-native/blob/master/Libraries/Geolocation/RCTLocationObserver.m)。


## 优化无监听处理的事件

如果你发送了一个事件却没有任何监听处理，则会因此收到一个资源警告。要优化因此带来的额外开销，你可以在你的`RCTEventEmitter`子类中覆盖`startObserving`和`stopObserving`方法。

```objective-c
@implementation CalendarManager
{
  bool hasListeners;
}

// 在添加第一个监听函数时触发
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
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}
```

## 从Swift导出

Swift不支持宏，所以从Swift向React Native导出类和函数需要多做一些设置，但是大致与Objective-C是相同的。

假设我们已经有了一个一样的`CalendarManager`，不过是用Swift实现的类:

```swift
// CalendarManager.swift

@objc(CalendarManager)
class CalendarManager: NSObject {

  @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
  }

}
```

> **注意**: 你必须使用@objc标记来确保类和函数对Objective-C公开。

接着，创建一个私有的实现文件，并将必要的信息注册到React Native中。

```objc
// CalendarManagerBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)

@end
```

请注意，一旦你[在IOS中混用2种语言](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html), 那就还需要一个额外的桥接头文件，称作“bridging header”，用来导出Objective-C文件给Swift。如果你是通过Xcode菜单中的`File>New File`来创建的Swift文件，Xcode会自动为你创建这个头文件。在这个头文件中，你需要引入`RCTBridgeModule.h`。

```objc
// CalendarManager-Bridging-Header.h
#import <React/RCTBridgeModule.h>
```

同样的，你也可以使用`RCT_EXTERN_REMAP_MODULE`和`RCT_EXTERN_REMAP_METHOD`来改变导出模块和方法的JavaScript调用名称。
了解更多信息，请参阅[`RCTBridgeModule`](https://github.com/facebook/react-native/blob/master/React/Base/RCTBridgeModule.h).


