---
id: new-architecture-app-modules-ios
title: Enabling TurboModule on iOS
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

Make sure your application meets all the [prerequisites](new-architecture-app-intro).

## 1. Provide a TurboModuleManager Delegate

Add the following imports at the top of your bridge delegate (e.g. `AppDelegate.mm`):

```objc
#import <ReactCommon/RCTTurboModuleManager.h>
#import <React/CoreModulesPlugins.h>
```

You will also need to declare that your AppDelegate conforms to the `RCTTurboModuleManagerDelegate` protocol, as well as create an instance variable for our Turbo Module manager:

```objc
@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  // ...
  RCTTurboModuleManager *_turboModuleManager;
}
@end
```

To conform to the `RCTTurboModuleManagerDelegate` protocol, you will implement these three methods:

- `getModuleClassFromName:` - This method should return the Class for a native module. You may use the `RCTCoreModulesClassProvider()` method to handle the default, core modules.
- `getTurboModule:jsInvoker:` - This should return `nullptr`. This method may be used later to support C++ TurboModules.
- `getModuleInstanceFromClass:moduleClass:` - This method allows you to perform any side-effects when your TurboModules are initialized. This is the TurboModule analogue to your bridge delegate’s `extraModulesForBridge` method. At this time, you’ll need to initialize the default RCTNetworking and RCTImageLoader modules as indicated below.

#### TurboModuleManagerDelegate Example

Take note of `getModuleInstanceFromClass:` in the following example, as it includes some necessary instantiation of several core modules that you will need to include in your application. Eventually, this may not be required.

```objc title='AppDelegate.mm'
// ...

#import <React/RCTDataRequestHandler.h>
#import <React/RCTHTTPRequestHandler.h>
#import <React/RCTFileRequestHandler.h>
#import <React/RCTNetworking.h>
#import <React/RCTImageLoader.h>
#import <React/RCTGIFImageDecoder.h>
#import <React/RCTLocalAssetImageLoader.h>

#import <React/CoreModulesPlugins.h>

#import <ReactCommon/RCTTurboModuleManager.h>

// ...

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)
    getTurboModule:(const std::string &)name
         jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker {
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  // Set up the default RCTImageLoader and RCTNetworking modules.
  if (moduleClass == RCTImageLoader.class) {
    return [[moduleClass alloc] initWithRedirectDelegate:nil
        loadersProvider:^NSArray<id<RCTImageURLLoader>> *(RCTModuleRegistry * moduleRegistry) {
          return @ [[RCTLocalAssetImageLoader new]];
        }
        decodersProvider:^NSArray<id<RCTImageDataDecoder>> *(RCTModuleRegistry * moduleRegistry) {
          return @ [[RCTGIFImageDecoder new]];
        }];
  } else if (moduleClass == RCTNetworking.class) {
     return [[moduleClass alloc]
        initWithHandlersProvider:^NSArray<id<RCTURLRequestHandler>> *(
            RCTModuleRegistry *moduleRegistry) {
          return @[
            [RCTHTTPRequestHandler new],
            [RCTDataRequestHandler new],
            [RCTFileRequestHandler new],
          ];
        }];
  }
  // No custom initializer here.
  return [moduleClass new];
}
```

## 2. Install TurboModuleManager JavaScript Bindings

Next, you will create a `RCTTurboModuleManager` in your bridge delegate’s `jsExecutorFactoryForBridge:` method, and install the JavaScript bindings:

```objc
#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  // Add these lines to create a TurboModuleManager
  if (RCTTurboModuleEnabled()) {
    _turboModuleManager =
        [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                             delegate:self
                                            jsInvoker:bridge.jsCallInvoker];

    // Necessary to allow NativeModules to lookup TurboModules
    [bridge setRCTTurboModuleRegistry:_turboModuleManager];

    if (!RCTTurboModuleEagerInitEnabled()) {
      /**
       * Instantiating DevMenu has the side-effect of registering
       * shortcuts for CMD + d, CMD + i,  and CMD + n via RCTDevMenu.
       * Therefore, when TurboModules are enabled, we must manually create this
       * NativeModule.
       */
       [_turboModuleManager moduleForName:"DevMenu"];
    }
  }

  // Add this line...
  __weak __typeof(self) weakSelf = self;

  // If you want to use the `JSCExecutorFactory`, remember to add the `#import <React/JSCExecutorFactory.h>`
  // import statement on top.
  return std::make_unique<facebook::react::HermesExecutorFactory>(
    facebook::react::RCTJSIExecutorRuntimeInstaller([weakSelf, bridge](facebook::jsi::Runtime &runtime) {
      if (!bridge) {
        return;
      }

      // And add these lines to install the bindings...
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf) {
        facebook::react::RuntimeExecutor syncRuntimeExecutor =
            [&](std::function<void(facebook::jsi::Runtime & runtime_)> &&callback) { callback(runtime); };
        [strongSelf->_turboModuleManager installJSBindingWithRuntimeExecutor:syncRuntimeExecutor];
      }
    }));
}
```

## 3. Enable TurboModule System

Finally, enable TurboModules in your app by executing the following statement before React Native is initialized in your app delegate (e.g. within `didFinishLaunchingWithOptions:`):

```objc
RCTEnableTurboModule(YES);
```

#### Example

```objc
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTEnableTurboModule(YES);

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                            launchOptions:launchOptions];

  // ...

  return YES;
}
```
