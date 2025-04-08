# iOS - Using Swift in Your Native Modules

Swift is the official and default language for developing native application on iOS.

The core of React Native is mainly written in C++ and the interoperability between Swift and C++ is not great, despite the [interoperability layer](https://www.swift.org/documentation/cxx-interop/) Apple developed and released in 2023.

In this guide, we will explore how you can write your Native Modules using Swift. It won't be a pure Swift implementation due to the incompatibilities between the languages, but it minimizes the amount of Objective-C++ glue code that you need to write. If you are migrating an existing Native Modules from the legacy architecture to the New Architecture, this approach should allow you to reuse most of the code.

This guide starts from the iOS implementation of the [Native Module](/docs/next/turbo-native-modules-introduction) guide.
Make sure to be familiar with that guide before diving into this one, potentially implementing the example in the guide.

## The Adapter pattern

The goal we have is to implement all our business logic using a Swift module and have a thin glue layer in Objective-C++ that is able to connect the app with the Swift implementation.

We can achieve this by leveraging the [Adapter](https://refactoring.guru/design-patterns/adapter) design pattern, where our _adaptee_ is the Swift Module and the Objective-C++ layer is the _adapter_.

The _adapter_ is created by React Native and it keep a reference to the _adaptee_, handling its lifecycle, and it forwards to the _adaptee_ all the methods invocation.

![Adapter Pattern](/docs/assets/AdapterPatternSwiftModules.png)

### Creating the Swift Module

The first step is to move the implementation from the Objective-C++ layer to the Swift Layer.

To achieve that, please follow these steps:

1. Create a new empty file in the Xcode project, and call it `NativeLocalStorage.swift`
2. Add the implementation in your Swift module like it follows:

```swift title="NativeLocalStorage.swift"
import Foundation

@objc public class NativeLocalStorage: NSObject {
  let userDefaults = UserDefaults(suiteName: "local-storage");


  @objc public func getItem(for key: String) -> String? {
    return userDefaults?.string(forKey: key)
  }

  @objc public func setItem(for key: String, value: String) {
    userDefaults?.set(value, forKey: key)
  }

  @objc public func removeItem(for key: String) {
    userDefaults?.removeObject(forKey: key)
  }

  @objc public  func clear() {
    userDefaults?.dictionaryRepresentation().keys.forEach { removeItem(for: $0) }
  }
}

```

Notice that you have to declare all the methods that you need to call from Objective-C as `public` and with the `@objc` annotation.
Remember also to make your class inherit from `NSObject`, otherwise it would not be possible to use it from Objective-C.

### Update the `RCTNativeLocalStorage` file

Then, we need to update the implementation of the `RCTNativeLocalStorage` to be able to create the Swift module and to call its methods.

1. Open the `RCTNativeLocalStorage.mm` file
2. Update it as it follows:

```diff title="RCTNativeLocalStorage.mm"
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"
+#import "SampleApp-Swift.h"

- static NSString *const RCTNativeLocalStorageKey = @"local-storage";

-@interface RCTNativeLocalStorage()
-@property (strong, nonatomic) NSUserDefaults *localStorage;
-@end

-@implementation RCTNativeLocalStorage
+@implementation RCTNativeLocalStorage {
+    NativeLocalStorage *storage;
+}

-RCT_EXPORT_MODULE(NativeLocalStorage)

 - (id) init {
   if (self = [super init]) {
-    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
+    storage = [NativeLocalStorage new];
   }
   return self;
 }

 - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
   return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
 }

 - (NSString * _Nullable)getItem:(NSString *)key {
-   return [self.localStorage stringForKey:key];
+   return [storage getItemFor:key];
 }

 - (void)setItem:(NSString *)value key:(NSString *)key {
-   [self.localStorage setObject:value forKey:key];
+   [storage setItemFor:key value:value];
 }

 - (void)removeItem:(NSString *)key {
-   [self.localStorage removeObjectForKey:key];
+   [storage removeItemFor:key];
 }

 - (void)clear {
-   NSDictionary *keys = [self.localStorage dictionaryRepresentation];
-   for (NSString *key in keys) {
-     [self removeItem:key];
-   }
+  [storage clear];
 }

++ (NSString *)moduleName
+{
+  return @"NativeLocalStorage";
+}

@end
```

The code is not really changed. Instead of creating a reference to the `NSUserDefaults` directly, we create a new `NativeLocalStorage` from ur swift implementation and, whenever a native module function is invoked, we forward that invocation to the `NativeLocalStorage` implemented in Swift.

Remember to import the `"SampleApp-Swift.h"` header. This is a header automatically generated by Xcode which contains the public API of your Swift files, in a format that is consumable by Objective-C. The `SampleApp` part of the header is actually your App name, so if you created the app with a name that is **not** `SampleApp`, you'll have to change it.

This approach introduces a bit of code duplication in the interfaces, but it allows you to reuse the Swift code you may already have in your codebase, with little extra effort.

### Implementing the Bridging Header

The last required step to connect the Swift code with the Objective-C++ counterpart is a Bridging Header.

A bridging header is an header where you can import all the Objective-C header files that needs to be visible by your swift code.

You might already have a bridging header in your codebase, but in case you haven't, you can create a new one by following these steps:

1. In Xcode, create a new file and call it `"SampleApp-Bridging-Header.h"`
2. Update the content of the `"SampleApp-Bridging-Header.h"` like this:

```diff title="SampleApp-Bridging-Header.h"
//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//

+ #import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
```

3. Link the Bridging header in your project:
   1. In the project navigator, select your app name (`SampleApp`, on the left)
   2. Click on `Build Settings`
   3. Filter for `"Bridging Header"`
   4. Add the relative path to the "Bridging Header", in the example it is `SampleApp-Bridging-Header.h`

![Bridging Header](/docs/assets/BridgingHeader.png)

## Build and Run Your App

Now you can follow the last step of the [Native Module's guide](/docs/turbo-native-modules-introduction#build-and-run-your-code-on-a-simulator) and you should see your app running with a Native Module written in Swift.
