---
id: cxx-cxxturbomodules
title: C++ Turbo Native Modules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

This guide shows you how to implement a Turbo Native Module using C++ only, a way to share the same implementation with any supported platform (Android, iOS, macOS or Windows).

Before continuing with this guide, please read the [Turbo Native Modules](./pillars-turbomodule.md) section. As a further reference, we prepared an example for the RNTester app ([NativeCxxModuleExample](https://github.com/facebook/react-native/tree/0.71-stable/packages/rn-tester/NativeCxxModuleExample)) and a sample run in our community repository ([run/pure-cxx-module](https://github.com/react-native-community/RNNewArchitectureApp/tree/run/pure-cxx-module)).

:::caution
C++ Turbo Native Modules work with the **New Architecture** enabled.
To migrate to the **New Architecture**, follow the [Migration guide](../new-architecture-intro)
:::

## How to Create a C++ Turbo Native Module

To create a C++ Turbo Native Module, you need to:

1. Define the JavaScript specification.
2. Configure Codegen to generate the scaffolding.
3. Register the native module.
4. Write the native code to finish implementing the module.

### Setup a Test App for the New Architecture

As first step, create a new application:

```sh
npx react-native init CxxTurboModulesGuide
cd CxxTurboModulesGuide
yarn install
```

On Android enable the New Architecture by modifying the `android/gradle.properties` file:

```diff
- newArchEnabled=false
+ newArchEnabled=true
```

On iOS enable the New Architecture when running `pod install` in the `ios` folder:

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

### Turbo Module Folder Setup

Create a `tm` folder inside the project. It will contain all C++ TurboModules of your application. The final result should look like this:

```sh
CxxTurboModulesGuide
├── android
├── ios
├── js
└── tm
```

## 1. JavaScript Specification

Create the following spec inside the `tm` folder:

<Tabs groupId="turbomodule-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="NativeSampleModule.ts"
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```js title="NativeSampleModule.js"
// @flow
import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
// import type {TurboModule} from 'react-native'; in future versions
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
): Spec);
```

</TabItem>
</Tabs>

## 2. Codegen Configuration

Next, you need to add some configuration for [**Codegen**](pillars-codegen.md).

# Application

Update your app's `package.json` file with the following entries:

```json title="package.json"
{
  // ...
  "description": "React Native with Cxx Turbo Native Modules",
  "author": "<Your Name> <your_email@your_provider.com> (https://github.com/<your_github_handle>)",
  "license": "MIT",
  "homepage": "https://github.com/<your_github_handle>/#readme",
  // ...
  "codegenConfig": {
    "name": "AppSpecs",
    "type": "all",
    "jsSrcsDir": "tm",
    "android": {
      "javaPackageName": "com.facebook.fbreact.specs"
    }
  }
}
```

It adds necessary properties which we will later re-use in the iOS `podspec` file and configures **Codegen** to search for specs inside the `tm` folder.

:::caution
C++ Turbo Native Modules don't autolink and need to be manually included into the app with the described steps below.
:::

### iOS: Create the `podspec` file

For iOS, you'll need to create a `AppTurboModules.podspec` file in the `tm` folder - which will look like:

```ruby title="AppTurboModules.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name            = "AppTurboModules"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "12.4" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }
  s.source_files    = "**/*.{h,cpp}"
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }
  install_modules_dependencies(s)
end
```

You need to add it as a dependency to your application in `ios/Podfile`, e.g., after the `use_react_native!(...)` section:

```ruby
if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
  pod 'AppTurboModules', :path => "./../tm"
end
```

### Android: `build.gradle`, `CMakeLists.txt`, `Onload.cpp`

For Android, you'll need to create a `CMakeLists.txt` file in the `tm` folder - which will look like:

```cmake
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(
        -fexceptions
        -frtti
        -std=c++17)

file(GLOB tm_SRC CONFIGURE_DEPENDS *.cpp)
add_library(tm STATIC ${tm_SRC})

target_include_directories(tm PUBLIC .)
target_include_directories(react_codegen_AppSpecs PUBLIC .)

target_link_libraries(tm
        jsi
        react_nativemodule_core
        react_codegen_AppSpecs)
```

It defines the `tm` folder as a source for native code and sets up necessary dependencies.

You need to add it as a dependency to your application in `android/app/build.gradle`, e.g., at the very end of that file:

```kotlin title="build.gradle"
android {
   externalNativeBuild {
       cmake {
           path "src/main/jni/CMakeLists.txt"
       }
   }
}
```

:::note
Ensure to pick the correct **android/app/build.gradle** file and not android/build.gradle.
:::

## 3. Module Registration

### iOS

To register a C++ Turbo Native Module in your app you will need to update `ios/CxxTurboModulesGuide/AppDelegate.mm` with the following entries:

```diff
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
+ #import <React/CoreModulesPlugins.h>
+ #import <ReactCommon/RCTTurboModuleManager.h>
+ #import <TurboModules/NativeSampleModule.h>

+ @interface AppDelegate () <RCTTurboModuleManagerDelegate> {}
+ @end

// ...

᠆ (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

+ #pragma mark RCTTurboModuleManagerDelegate

+ - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
+                                                       jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
+ {
+   if (name == "NativeSampleModule") {
+     return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
+   }
+   return nullptr;
+ }
```

This will instantiante a `NativeSampleModule` associated with the name `NativeSampleModule` as defined in our JavaScript spec file earlier.

### Android

Android apps aren't setup for native code compilation by default.

1.) Create the folder `android/app/src/main/jni`

2.) Copy `CMakeLists.txt` and `Onload.cpp` from [node_modules/react-native/ReactAndroid/cmake-utils/default-app-setup](https://github.com/facebook/react-native/tree/0.71-stable/ReactAndroid/cmake-utils/default-app-setup) into the `android/app/src/main/jni` folder.

Update `Onload.cpp` with the following entries:

```diff
// ...

#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncli.h>
+ #include <NativeSampleModule.h>

// ...

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string &name,
    const std::shared_ptr<CallInvoker> &jsInvoker) {
+ if (name == "NativeSampleModule") {
+   return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
+ }
  return nullptr;
}

// ...
```

Update `CMakeLists.txt` with the following entries, e.g., at the very end of that file:

```diff
// ...

# This file includes all the necessary to let you build your application with the New Architecture.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

+ # App needs to add and link against tm (TurboModules) folder
+ add_subdirectory(${REACT_ANDROID_DIR}/../../../tm/ tm_build)
+ target_link_libraries(${CMAKE_PROJECT_NAME} tm)
```

This will instantiante a `NativeSampleModule` associated with the name `NativeSampleModule` as defined in our JavaScript spec file earlier.

## 4. C++ Native Code

For the final step, you'll need to write some native code to connect the JavaScript side to the native platforms. This process requires two main steps:

- Run **Codegen** to see what it generates.
- Write your native code, implementing the generated interfaces.

### Run Codegen

:::info
Follow the [Codegen](./pillars-codegen) guide for general information.
:::

On iOS Codegen is run each time you execute in the `ios` folder:

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

You can inspect the generated `AppSpecsJSI.h` and `AppSpecsJSI-generated.cpp` files inside the `CxxTurboModulesGuide/ios/build/generated/ios` folder.

Those files are prefixed with `AppSpecs` as this matches the `codegenConfig.name` parameter added earlier to `package.json`.

On Android Codegen is run each time you execute:

```sh
yarn android
```

You can inspect the generated `AppSpecsJSI.h` and `AppSpecsJSI-generated.cpp` files inside the `CxxTurboModulesGuide/android/app/build/generated/source/codegen/jni` folder.

You only need to re-run codegen if you have changed your JavaScript spec.

The C++ function generated for our JavaScript spec file looks like:

```cpp
virtual jsi::String reverseString(jsi::Runtime &rt, jsi::String input) = 0;
```

You can directly work with the lower level `jsi::` types - but for convience C++ Turbo Native Modules automatically `bridge` into `std::` types for you.

### Implementation

Now create a `NativeSampleModule.h` file with the following content:

:::note
Due to current differences in the CMake and CocoaPod setup we need some creativity to include the correct Codegen header on each platform.
:::

```cpp
#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>) // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h") // CMake headers on Android
#include "AppSpecsJSI.h"
#endif
#include <memory>
#include <string>

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
 public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
};

} // namespace facebook::react
```

In this case you can use any C++ type which `bridges` to a `jsi::String` - default or [custom one](./cxx-custom-types.md). You can't specify an incompatible type such as `bool`, `float` or `std::vector<>` as it does not `bridge` to `jsi::String` and hence results in a compilation error.

Now add a `NativeSampleModule.cpp` file with an implementation for it:

```cpp
#include "NativeSampleModule.h"

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

} // namespace facebook::react
```

As we have added new C++ files run in the `ios` folder:

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

for iOS. In Xcode they appear under the `Pods` target in the `Development Pods \ TurboModules` subfolder.

You should now be able to compile your app both on Android and iOS.

```sh
CxxTurboModulesGuide
├── android
│   └── app
│       │── src
│       │   └── main
│       │       └── jni
│       │           ├── CMakeLists.txt
│       │           └── OnLoad.cpp
│       └── build.gradle (updated)
├── ios
│   └── CxxTurboModulesGuide
│       └── AppDelegate.mm (updated)
├── js
    └── App.tsx|jsx (updated)
└── tm
    ├── CMakeLists.txt
    ├── NativeSampleModule.h
    ├── NativeSampleModule.cpp
    ├── NativeSampleModule.ts|js
    └── TurboModules.podspec
```

## 5. Adding the C++ Turbo Native Module to your App

For demo purposes we can update our app's `App.tsx|jsx` with the following entries:

```diff
//...
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
+ import NativeSampleModule from './tm/NativeSampleModule';
//...
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
+         <Section title="Cxx TurboModule">
+          NativeSampleModule.reverseString(...) ={' '}
+          {NativeSampleModule.reverseString(
+            'the quick brown fox jumps over the lazy dog'
+          )}
+         </Section>;
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
//...
```

Run the app to see your C++ Turbo Native Module in action!

## App TurboModuleProvider [Optional]

You can avoid some code duplication once you added multiple C++ Turbo Native Modules by declaring an AppTurboModuleProvider:

```cpp title="AppTurboModuleProvider.h"
#pragma once

#include <ReactCommon/TurboModuleBinding.h>
#include <memory>
#include <string>

namespace facebook::react {

class AppTurboModuleProvider {
 public:
  std::shared_ptr<TurboModule> getTurboModule(
      const std::string& name,
      std::shared_ptr<CallInvoker> jsInvoker) const;
};

} // namespace facebook::react
```

And implementing it:

```cpp title="AppTurboModuleProvider.cpp"
#include "AppTurboModuleProvider.h"
#include "NativeSampleModule.h"

namespace facebook::react {

std::shared_ptr<TurboModule> AppTurboModuleProvider::getTurboModule(
    const std::string& name,
    std::shared_ptr<CallInvoker> jsInvoker) const {
  if (name == "NativeSampleModule") {
    return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
  }
  // Other C++ Turbo Native Modules for you app
  return nullptr;
}

} // namespace facebook::react
```

And then re-using it in `OnLoad.cpp` for Android and `AppDelegate.mm` for iOS, e.g., via:

```cpp
static facebook::react::AppTurboModuleProvider appTurboModuleProvider;
return appTurboModuleProvider.getTurboModule(name, jsInvoker);
```

in the corresponding functions.

## Calling OS specific APIs

You can still call OS specific functions in the compilation unit (e.g., `NS/CF` APIs on Apple or `Win32/WinRT` APIs on Windows) as long as the method signatures only use `std::` or `jsi::` types.

For Apple specific APIs you need to change the extension of your implementation file from `.cpp` to `.mm` to be able to consume `NS/CF` APIs.

## Extending C++ Turbo Native Modules

If you need to support some types that are not supported yet, have a look at [this other guide](./cxx-custom-types.md).
