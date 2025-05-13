---
id: turbo-native-modules-ios
title: 'Turbo 原生模块：iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

现在我们来编写一些 iOS 平台代码，以确保 `localStorage` 在应用关闭后仍然可以持久保存数据。

## 准备你的 Xcode 项目

我们需要使用 Xcode 准备你的 iOS 项目。完成这 **6 步** 后，你将拥有一个实现 `NativeLocalStorageSpec` 接口的 `RCTNativeLocalStorage`。

1. 打开 CocoPods 生成的 Xcode workspace 文件：

```bash
cd ios
open TurboModuleExample.xcworkspace
```

<img class="half-size" alt="Open Xcode Workspace" src="/docs/assets/turbo-native-modules/xcode/1.webp" />

2. 右键点击应用，选择 <code>New Group</code>，将新组命名为 `NativeLocalStorage`。

<img class="half-size" alt="Right click on app and select New Group" src="/docs/assets/turbo-native-modules/xcode/2.webp" />

3. 在 `NativeLocalStorage` 组中，创建 <code>New</code>→<code>File from Template</code>。

<img class="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/3.webp" />

4. 使用 <code>Cocoa Touch Class</code> 模板。

<img class="half-size" alt="Use the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/4.webp"  />

5. 将类命名为 <code>RCTNativeLocalStorage</code>，并选择 <code>Objective-C</code> 语言。

<img class="half-size" alt="Create an Objective-C RCTNativeLocalStorage class" src="/docs/assets/turbo-native-modules/xcode/5.webp" />

6. 将 <code>RCTNativeLocalStorage.m</code> 重命名为 <code>RCTNativeLocalStorage.mm</code>，使其成为 Objective-C++ 文件。

<img class="half-size" alt="Convert to and Objective-C++ file" src="/docs/assets/turbo-native-modules/xcode/6.webp" />

## 使用 NSUserDefaults 实现 localStorage

首先更新 `RCTNativeLocalStorage.h`：

```objc title="NativeLocalStorage/RCTNativeLocalStorage.h"
//  RCTNativeLocalStorage.h
//  TurboModuleExample

#import <Foundation/Foundation.h>
// highlight-add-next-line
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

// highlight-remove-next-line
@interface RCTNativeLocalStorage : NSObject
// highlight-add-next-line
@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>

@end
```

然后更新实现，使用带有自定义 [suite name](https://developer.apple.com/documentation/foundation/nsuserdefaults/1409957-initwithsuitename) 的 `NSUserDefaults`。

```objc title="NativeLocalStorage/RCTNativeLocalStorage.mm"
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RCTNativeLocalStorage()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation RCTNativeLocalStorage

RCT_EXPORT_MODULE(NativeLocalStorage)

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}

- (void)setItem:(NSString *)value
          key:(NSString *)key {
  [self.localStorage setObject:value forKey:key];
}

- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

@end
```

重要注意事项：

- `RCT_EXPORT_MODULE` 导出并注册模块，使用我们在 JavaScript 环境中访问它的标识符：`NativeLocalStorage`。更多详情请参阅 [docs](./legacy/native-modules-ios#module-name)。
- 你可以使用 Xcode 跳转到 Codegen `@protocol NativeLocalStorageSpec`。你也可以使用 Xcode 为你生成 stub。

## 在模拟器上构建并运行你的代码

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">
```bash
npm run ios
```
</TabItem>
<TabItem value="yarn">
```bash
yarn run ios
```
</TabItem>
</Tabs>

<video width="30%" height="30%" playsinline="true" autoplay="true" muted="true" loop="true">
    <source src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/turbo-native-modules/turbo-native-modules-ios.webm" type="video/webm" />
    <source src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/turbo-native-modules/turbo-native-modules-ios.mp4" type="video/mp4" />
</video>
