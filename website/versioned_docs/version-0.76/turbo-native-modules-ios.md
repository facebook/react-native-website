---
id: turbo-native-modules-ios
title: 'Turbo Native Modules: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Now it's time to write some iOS platform code to make sure `localStorage` survives after the application is closed.

## Prepare your Xcode Project

We need to prepare your iOS project using Xcode. After completing these **6 steps** you'll have `RCTNativeLocalStorage` that implements the generated `NativeLocalStorageSpec` interface.

1. Open the CocoPods generated Xcode Workspace:

```bash
cd ios
open TurboModuleExample.xcworkspace
```

<img class="half-size" alt="Open Xcode Workspace" src="/docs/assets/turbo-native-modules/xcode/1.webp" />

2. Right click on app and select <code>New Group</code>, call the new group `NativeLocalStorage`.

<img class="half-size" alt="Right click on app and select New Group" src="/docs/assets/turbo-native-modules/xcode/2.webp" />

3. In the `NativeLocalStorage` group, create <code>New</code>→<code>File from Template</code>.

<img class="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/3.webp" />

4. Use the <code>Cocoa Touch Class</code>.

<img class="half-size" alt="Use the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/4.webp"  />

5. Name the Cocoa Touch Class <code>RCTNativeLocalStorage</code> with the <code>Objective-C</code> language.

<img class="half-size" alt="Create an Objective-C RCTNativeLocalStorage class" src="/docs/assets/turbo-native-modules/xcode/5.webp" />

6. Rename <code>RCTNativeLocalStorage.m</code> → <code>RCTNativeLocalStorage.mm</code> making it an Objective-C++ file.

<img class="half-size" alt="Convert to and Objective-C++ file" src="/docs/assets/turbo-native-modules/xcode/6.webp" />

## Implement localStorage with NSUserDefaults

Start by updating `RCTNativeLocalStorage.h`:

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

Then update our implementation to use `NSUserDefaults` with a custom [suite name](https://developer.apple.com/documentation/foundation/nsuserdefaults/1409957-initwithsuitename).

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

Important things to note:

- `RCT_EXPORT_MODULE` exports and registers the module using the identifier we'll use to access it in the JavaScript environment: `NativeLocalStorage`. See these [docs](./legacy/native-modules-ios#module-name) for more details.
- You can use Xcode to jump to the Codegen `@protocol NativeLocalStorageSpec`. You can also use Xcode to generate stubs for you.

## Build and run your code on a Simulator

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
    <source src="/docs/assets/turbo-native-modules/turbo-native-modules-ios.webm" type="video/webm" />
    <source src="/docs/assets/turbo-native-modules/turbo-native-modules-ios.mp4" type="video/mp4" />
</video>
