---
id: new-architecture-app-intro
title: Prerequisites for Applications
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

<NewArchitectureWarning/>

There are a few prerequisites that should be addressed before the New Architecture is enabled in your application.

## Update to the latest React Native version

React Native released the support for the New Architecture with the release `0.68.0`.

This guide is written with the expectation that you’re using the [**latest** React Native release](https://github.com/facebook/react-native/releases/latest).

You can find instructions on how to upgrade in the page [upgrading to new versions](/docs/upgrading).

## Use Hermes

Hermes is an open-source JavaScript engine optimized for React Native. Hermes is enabled by default, and you have to explicitly disable it if you want to use JSC.

We highly recommend using Hermes in your application. With Hermes enabled, you can use the JavaScript debugger in Flipper to directly debug your JavaScript code.

Please [follow the instructions on the Hermes page](hermes) to learn how to enable/disable Hermes.

:::caution

**iOS:** If you opt out of using Hermes, you will need to replace `HermesExecutorFactory` with `JSCExecutorFactory` in any examples used throughout the rest of this guide.

:::

## iOS - Build the Project

After upgrading the project, there are a few changes you need to apply:

1. Target the proper iOS version. Open the `Podfile` and apply this change:

```diff
- platform :ios, '11.0'
+ platform :ios, '12.4'
```

2. Create a `.xcode.env` file to export the location of the NODE_BINARY. Navigate to the `ios` folder and run this command:

```sh
echo 'export NODE_BINARY=$(command -v node)' > .xcode.env
```

If you need it, you can also open the file and replace the `$(command -v node)` with the path to the node executable.
React Native also supports a local version of this file `.xcode.env.local`. This file is not synced with the repository to let you customize your local setup, if it differs from the Continuous Integration or the team one.

2. Fix an API change in the `AppDelegate.m`. Open this file and apply this change:

```diff
#if DEBUG
-       return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
+       return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
```

## iOS - Use Objective-C++ (`.mm` extension)

Turbo Native Modules can be written using Objective-C or C++. In order to support both cases, any source files in the user project space that include C++ code should use the `.mm` file extension. This extension corresponds to Objective-C++, a language variant that allows for the use of a combination of C++ and Objective-C in source files.

:::info

**Use Xcode to rename existing files** to ensure file references persist in your project. You might need to clean the build folder (_Project → Clean Build Folder_) before re-building the app. If the file is renamed outside of Xcode, you may need to click on the old `.m` file reference and Locate the new file.

:::

For example, if you use the template, your project structure for what concerns iOS should look like this:

```
AppName
├── ...
├── ios
│   ├── Podfile
│   ├── Podfile.lock
│   ├── Pods
│   │   └── ...
│   ├── AppName
│   │   ├── AppDelegate.h
│   │   ├── AppDelegate.mm
│   │   ├── Images.xcassets
│   │   ├── Info.plist
│   │   ├── LaunchScreen.storyboard
│   │   └── main.m
│   ├── AppName.xcodeproj
│   ├── AppName.xcworkspace
│   ├── AppNameTests
│   └── build
└── ...
```

All the `.m` files within the `AppName` inner folder should be renamed from `.m` to `.mm`. If you have packages that contains Objective-C code at the same level of the `AppName` folder, they should be renamed from `.m` to `.mm` too.

## iOS - Make your AppDelegate conform to `RCTAppDelegate`

The final step to configure iOS for the New Architecture is to extend a base class provided by React Native, called `RCTAppDelegate`.

This class provides a base implementation for all the required functionalities of the new architecture. If you need to customize some of them, you can override those methods, invoke `[super methodNameWith:parameters:];` collecting the returned value and customize the bits you need to customize.

1. Open the `ios/<AppName>/AppDelegate.h` file and update it as it follows:

```diff
- #import <React/RCTBridgeDelegate.h>
+ #import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>

- @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
+ @interface AppDelegate : RCTAppDelegate

- @property (nonatomic, strong) UIWindow *window;

@end
```

2. Open the `ios/<AppName>/AppDelegate.mm` (remember that you have to rename the `AppDelegate.m` to `AppDelegate.mm` first) file and replace its content with the following:

```objc
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate
  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"NameOfTheApp";
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
```

:::note
The `moduleName` has to be the same string used in the `[RCTRootView initWithBridge:moduleName:initialProperties]` call in the original `AppDelegate.mm` file.
:::

## iOS - Run pod install

```bash
// Run pod install with the flags
RCT_NEW_ARCH_ENABLED=1 pod install
```

## Android - Prerequisites

If you successfully updated your project to React Native `0.71.0`, you **already meet** all the prerequisites to use the New Architecture on Android.

You will only need to update your `android/gradle.properties` file as follows:

```diff
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
-newArchEnabled=false
+newArchEnabled=true
```

That's it!

It’s now time to run your Android app to verify that everything works correctly:

```bash
yarn react-native run-android
```

In your Metro terminal log, you will now see the following log to confirm that Fabric is running correctly:

```
BUNDLE ./App.js
LOG Running "App" with {"fabric":true,"initialProps":{"concurrentRoot": "true"},"rootTag":1}
```
