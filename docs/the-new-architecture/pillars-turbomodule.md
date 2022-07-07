---
id: pillars-turbomodules
title: TurboModules
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

If you've worked with React Native, you may be familiar with the concept of [Native Modules](../native-modules-intro.md), which allow JavaScript and platform-native code to communicate over the React Native "bridge", which handles cross-platform serialization via JSON.

TurboModules are the next iteration on Native Modules that provide a few extra [benefits](./why):

- Strongly typed interfaces that are consistent across platforms
- The ability to create shared C++ code for use across platforms
- Lazy loading of modules, allowing for faster app startup
- The use of JSI, a JavaScript interface for native code, which allows for more efficient communication between native and JavaScript code than the bridge

This guide will show you how to create a basic TurboModule.

:::caution
TurboModules only work with the **New Architecture** enabled.
To migrate to the **New Architecture**, follow the [Migration guide](../new-architecture-intro)
:::

## How to Create a TurboModule

To create a TurboModule, we need to:

1. Define the JavaScript specification.
2. Configure the module so that CodeGen can generate the scaffolding.
3. Write the native code to finish implementing the module.

## 1. Folder Setup

In order to keep the module decoupled from the app, it's a good idea to define the module separately from the app, and then add it as a dependency to your app later. This is also what you'll do for writing TurboModules that can be released as open-source libraries later.

Next to your application, create a folder called `RTNCalculator`. (**RTN** stands for "**R**eact**T** **N**ative", and is a standard prefix for React Native modules).

Within `RTNCalculator`, create three subfolders: `js`, `ios`, and `android`.

The final result should look like this:

```sh
TurboModulesGuide
├── MyApp
└── RTNCalculator
    ├── android
    ├── ios
    └── js
```

## 2. JavaScript Specification

The **New Architecture** requires interfaces specified in a typed dialect of JavaScript (either [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/)). **Codegen** will use these specifications to generate code in strongly-typed languages, including C++, Objective-C++, and Java.

There are two requirements the file containing this specification must meet:

1. The file **must** be named `Native<MODULE_NAME>`, with a `.js` or `.jsx` extension when using Flow, or a `.ts`, or `.tsx` extension when using TypeScript. Codegen will only look for files matching this pattern.
2. The file must export a `TurboModuleRegistrySpec` object.

<Tabs groupId="turbomodule-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```typescript title="NativeCalculator.js"
// @flow
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}
export default (TurboModuleRegistry.get<Spec>(
  'RTNCalculator'
): ?Spec);
```

</TabItem>
<TabItem value="typescript">

```typescript title="NativeCalculator.ts"
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}

export default (TurboModuleRegistry.get<Spec>(
  'RTNCalculator'
) as Spec | null);
```

</TabItem>
</Tabs>

At the beginning of the spec files are the imports:

- The `TurboModule` type, which defines the base interface for all TurboModules
- The `TurboModuleRegistry` JavaScript module, which contains functions for loading TurboModules

The second section of the file contains the interface specification for the TurboModule. In this case, the interface defines the `add` function which takes two numbers and returns a promise that resolves to a number. This interface type **must** be named `Spec` for a TurboModule.

Finally, we invoke `TurboModuleRegistry.get`, passing the module's name, which will load the TurboModule if it's available. 

:::caution
We are writing JavaScript files importing types from libraries, without setting up a proper node module and installing its dependencies. Your IDE will not be able to resolve the import statements and you may see errors and warnings. This is expected and will not cause problems when you add the module to your app.
:::

## 3. Module Configuration

Next, you need to add some configuration for [**Codegen**](/docs/pillars-codegen.md) and auto-linking.

Some of these configuration files are shared between iOS and Android, while the others are platform-specific.

### Shared

The shared configuration is a `package.json` file that will be used by yarn when installing your module. Create the `package.json` file in the root of the `RTNCalculator` directory.

```json title="package.json"
{
  "name": "rtn-calculator",
  "version": "0.0.1",
  "description": "Add numbers with TurboModules",
  "react-native": "js/index",
  "source": "js/index",
  "files": [
    "js",
    "android",
    "ios",
    "rtn-calculator.podspec",
    "!android/build",
    "!ios/build",
    "!**/__tests__",
    "!**/__fixtures__",
    "!**/__mocks__"
  ],
  "keywords": [
    "react-native",
    "ios",
    "android"
  ],
  "repository": "https://github.com/<your_github_handle>/rtn-calculator",
  "author": "<Your Name> <your_email@your_provider.com> (https://github.com/<your_github_handle>)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/<your_github_handle>/rtn-calculator/issues"
  },
  "homepage": "https://github.com/<your_github_handle>/rtn-calculator#readme",
  "devDependencies": {},
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  },
  "codegenConfig": {
    "libraries": [
      {
        "name": "RTNCalculatorSpec",
        "type": "modules",
        "jsSrcsDir": "js"
      }
    ]
  }
}
```

### iOS: Create the `podspec` file

For iOS, you'll need to create a `rtn-calculator.podspec` file which will define the module as a dependency for your app. It will stay in the root of `RTNCalculator`, alongside the `ios` folder.

The file will look like this:

```ruby title="rnt-calculator.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_version = '2021.07.22.00'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name            = "rtn-calculator"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"

  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
    "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
end
```

The `.podspec` file has to be a sibling of the `package.json` file and its name is the one we set in the `package.json`'s `name` property: `rtn-calculator`.

The first part of the file prepares some variables we will use throughout the rest of it. Then, there is a section that contains some information used to configure the pod, like its name, version, and description. Finally, we have a set of dependencies that are required by the New Architecture.

### Android: Create the `build.gradle` file

Next, create a `build.gradle` file in the `android` folder, with the following contents:

```kotlin title="build.gradle"
buildscript {
  ext.safeExtGet = {prop, fallback ->
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
  }
  repositories {
    google()
    gradlePluginPortal()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:7.1.1")
  }
}

apply plugin: 'com.android.library'
apply plugin: 'com.facebook.react'

android {
  compileSdkVersion safeExtGet('compileSdkVersion', 31)
}

repositories {
  maven {
    // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
    url "$projectDir/../node_modules/react-native/android"
  }
  mavenCentral()
  google()
}

dependencies {
  implementation 'com.facebook.react:react-native:+'
}

react {
    jsRootDir = file("../js/")
    libraryName = "RTNCalculator"
    codegenJavaPackageName = "com.RTNCalculator"
}
```

Of interest in the `build.gradle` file:

- The `react` block configures the CodeGen process. For Android, we need to specify:
  - the `jsRootDir`, which contains the relative path to the JavaScript specs
  - the `libraryName` we will use to link the library in the app.
  - the `codegenJavaPackageName` which corresponds to the name of the Java package we will use for the code generated by **CodeGen**.

## 4. Native Code

For the final step in getting your TurboModule ready to go, you'll need to write some native code to connect the JavaScript side to the native platforms. This process requires two main steps:

- Run **CodeGen** to see what it generates.
- Write your native code, implementing the generated interfaces.

When developing a React Native app that uses a TurboModule, it is responsibility of the app to actually generate the code using **CodeGen**. However, when developing a TurboModule as a library, we need to reference the generated code, and it is therefore useful to see what the app will generate.

As first step for both iOS and Android, this guide shows how to execute manually the scripts used by **CodeGen** to generate the required code. Further information on **CodeGen** can be found [here](/docs/pillars-codegen.md)

:::caution
The code generated by the **CodeGen** in this step should not be committed to the versioning system. React Native apps are able to generate the code when the app is built. This allows to avoid any ABI incompatibility and to ensure that a consistent version of the **CodeGen** is used.
:::

### iOS

#### Generate the code - iOS

To run Codegen for the iOS platform, we need to open a terminal and run the following command:

```sh title="Running CodeGen for iOS"
cd MyApp
yarn add ../RTNCalculator
cd ..
node MyApp/node_modules/react-native/scripts/generate-artifacts.js \
  --path MyApp/ \
  --outputPath RTNCalculator/generated/
```

This script first adds the `RTNCalculator` module to the app with `yarn add`. Then, it invokes Codegen via the `generate-artifacts.js` script.

The `--path` option specifies the path to the app, while the `--outputPath` option tells CodeGen where to output the generated code.

The output of this process is the following folder structure:

```sh
generated
└── build
    └── generated
        └── ios
            ├── FBReactNativeSpec
            │   ├── FBReactNativeSpec-generated.mm
            │   └── FBReactNativeSpec.h
            ├── RCTThirdPartyFabricComponentsProvider.h
            ├── RCTThirdPartyFabricComponentsProvider.mm
            ├── RTNCalculatorSpec
            │   ├── RTNCalculatorSpec-generated.mm
            │   └── RTNCalculatorSpec.h
            └── react
                └── renderer
                    └── components
                        └── rncore
                            ├── ComponentDescriptors.h
                            ├── EventEmitters.cpp
                            ├── EventEmitters.h
                            ├── Props.cpp
                            ├── Props.h
                            ├── RCTComponentViewHelpers.h
                            ├── ShadowNodes.cpp
                            └── ShadowNodes.h
```

The relevant path for the TurboModule interface is `generated/build/generated/ios/RTNCalculatorSpec`.

See the [CodeGen](./pillars-codegen) section for further details on the generated files.

#### Write the Native iOS Code

Now add the Native code for your TurboModule. Create two files in the `RTNCalculator/ios` folder:

1. The `RTNCalculator.h`, a header file for the module.
2. The `RTNCalculator.mm`, the implementation of the module.

##### RTNCalculator.h

```objc title="RTNCalculator.h"
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNCalculator : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
```

This file defines the interface for the `RTNCalculator` module. Here, we can add any native method we may want to invoke on the view. For this guide, we don't need anything, therefore the interface is empty.


##### RTNCalculator.mm

```objc title="RTNCalculator.mm"
#import "RTNCalculatorSpec.h"
#import "RTNCalculator.h"

@implementation RTNCalculator

RCT_EXPORT_MODULE(RTNCalculator)

RCT_REMAP_METHOD(add, addA:(NSInteger)a
                      andB:(NSInteger)b
                withResolver:(RCTPromiseResolveBlock) resolve
                withRejecter:(RCTPromiseRejectBlock) reject)
{
    NSNumber *result = [[NSNumber alloc] initWithInteger:a+b];
    resolve(result);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}

@end
```

The most important call is to the `RCT_EXPORT_MODULE`, which is required to export the module so that React Native can load the TurboModule.

Then the `RCT_REMAP_METHOD` macro is used to expose the `add` method.

:::info
There are other macros that can be used to export modules and methods. You view the code that specifies them [here](https://github.com/facebook/react-native/blob/main/React/Base/RCTBridgeModule.h).
:::

TODO: more description?

### Android

Android follows similar steps to iOS. We have to generate the code for Android, and then we have to write some native code to make it work.

#### Generate the Code - Android

To generate the code for Android, we need to manually invoke CodeGen. This is done similarly to what we did for iOS: first, we need to add the package to the app and then we need to invoke a script.

```sh title="Running CodeGen for Android"
cd MyApp
yarn add ../RTNCalculator
cd android
./gradlew generateCodegenArtifactsFromSchema --rerun-tasks
```

This script first adds the package to the app, in the same way iOS does. Then, after moving to the `android` folder, it invokes a Gradle task to create the generated code.

:::note
To run **CodeGen**, you need to enable the **New Architecture** in the Android app. This can be done by opening the `gradle.properties` files and by switching the `newArchEnabled` property from `false` to `true`.
:::

The generated code is stored in the `MyApp/node_modules/rtn-calculator/android/build/generated/source/codegen` folder and it has this structure:

TODO: ordering issue. I can't actually get codegen to work at this point. Only works once I add the native files following. Probably similar issue for Fabric guide. Including generated file structure for later ease of use:

```title="Android generated code"
codegen
├── java
│   └── com
│       └── RTNCalculator
│           └── NativeCalculatorSpec.java
├── jni
│   ├── Android.mk
│   ├── RTNCalculator-generated.cpp
│   ├── RTNCalculator.h
│   └── react
│       └── renderer
│           └── components
│               └── RTNCalculator
│                   ├── ComponentDescriptors.h
│                   ├── EventEmitters.cpp
│                   ├── EventEmitters.h
│                   ├── Props.cpp
│                   ├── Props.h
│                   ├── ShadowNodes.cpp
│                   └── ShadowNodes.h
└── schema.json
```

#### Write the Native Android Code

The native code for the Android side of a TurboModule requires three more files:

1. An `AndroidManifest.xml` file.
2. A `RTNCalculatorModule.java` that implements the module.
4. A `RTNCalculatorPackage.java` that React Native uses to configure the library.

The final structure within the Android library should look like this:

```title="Android Folder Structure"
android
├── build.gradle
└── src
    └── main
        ├── AndroidManifest.xml
        └── java
            └── com
                └── RTNCalculator
                    ├── CalculatorModule.java
                    └── CalculatorPackage.java
```

##### AndroidManifest.xml

```xml title="AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.RTNCalculator">
</manifest>
```

This is a small manifest file that defines the package for our module.


##### CalculatorModule.java

```java title="CalculatorModule.java"
package com.RTNCalculator;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalculatorModule extends NativeCalculatorSpec {

    public static String NAME = "RTNCalculator";

    CalculatorModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public void add(double a, double b, Promise promise) {
        promise.resolve(a + b);
    }
}
```

This class implements the module itself, which extends the `NativeCalculatorSpec` that was generated from the `NativeCalculator` JavaScript specification file.

##### CalculatorPackage.java

```java title="CalculatorPackage.java"
package com.RTNCalculator;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

public class CalculatorPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
      if (name.equals(CalculatorModule.NAME)) {
          return new CalculatorModule(reactContext);
      } else {
          return null;
      }
  }


  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
      return () -> {
          final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
          moduleInfos.put(
                  CalculatorModule.NAME,
                  new ReactModuleInfo(
                          CalculatorModule.NAME,
                          CalculatorModule.NAME,
                          false, // canOverrideExistingModule
                          false, // needsEagerInit
                          true, // hasConstants
                          false, // isCxxModule
                          true // isTurboModule
          ));
          return moduleInfos;
      };
  }

}
```

This is the last piece of Native Code for Android. It defines the Package object that will be used by the app to load the module.

## 5. Adding the TurboModule to your App

Now you can install and use the TurboModule in your app.

### Shared

First of all, we need to add the NPM package which contains the Component to the app. This can be done with the following command:

```sh
cd MyApp
yarn add ../RTNCalculator
```

This command will add the `RTNCalculator` module to the `node_modules` of your app.

### iOS

Then, you need to install the new dependencies in your iOS project. To do so, run these commands:

```sh
cd ios
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

This command will look for all the dependencies of the project and it will install the iOS ones. The `RCT_NEW_ARCH_ENABLED=1` instruct **Cocoapods** that it has to run some additional operations to run **CodeGen**.

:::note
You may have to run `bundle install` once before you can use `RCT_NEW_ARCH_ENABLED=1 bundle exec pod install`. You won't need to run `bundle install` anymore, unless you need to change the Ruby dependencies.
:::

### Android

Android configuration requires slightly more steps in order to be able to use your new TurboModule.

First, to enable the **New Architecture**:

1. Open the `android/gradle.properties` file
2. Scroll down to the end of the file and switch the `newArchEnabled` property from `false` to `true`.

Then, to manually link your new TurboModule:

1. Open the `NewArchitecture/android/app/build.gradle` file and update the file as it follows:
    ```diff
        "PROJECT_BUILD_DIR=$buildDir",
        "REACT_ANDROID_DIR=$rootDir/../node_modules/react-native/ReactAndroid",
    -   "REACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build"
    +   "REACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build",
    +   "NODE_MODULES_DIR=$rootDir/../node_modules/"
        cFlags "-Wall", "-Werror", "-fexceptions", "-frtti", "-DWITH_INSPECTOR=1"
        cppFlags "-std=c++17"
    ```
1. Open the `NewArchitecture/android/app/src/main/jni/Android.mk` file and update the file as it follows:
    ```diff
        # If you wish to add a custom TurboModule or Fabric component in your app you
        # will have to include the following autogenerated makefile.
        # include $(GENERATED_SRC_DIR)/codegen/jni/Android.mk
    +
    +   include $(NODE_MODULES_DIR)/rtn-calculator/android/build/generated/source/codegen/jni/Android.mk
        include $(CLEAR_VARS)
    ```
1. In the same file above, go to the `LOCAL_SHARED_LIBRARIES` setting and add the following line:
    ```diff
        libreact_codegen_rncore \
    +   libreact_codegen_RTNCalculator \
        libreact_debug \
    ```
1. Open the `NewArchitecture/android/app/src/main/jni/MainApplicationModuleProvider.cpp` file and update the file as it follows:
    1. Add the import for the calculator:
        ```diff
            #include <answersolver.h>
        +   #include <RTNCalculator.h>
        ```
    1. Add the following check in the `MainApplicationModuleProvider` constructor:
        ```diff
            // auto module = samplelibrary_ModuleProvider(moduleName, params);
            // if (module != nullptr) {
            //    return module;
            // }

        +    auto module = RTNCalculator_ModuleProvider(moduleName, params);
        +    if (module != nullptr) {
        +        return module;
        +    }

            return rncore_ModuleProvider(moduleName, params);
        }
        ```

### JavaScript

Now you can use your TurboModule calculator in your app!

Here's an example App.js file using the `add` method:

```js title="App.js"
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, Text, Button} from 'react-native';
import RTNCalculator from 'rtn-calculator/js/NativeCalculator.js';

const App: () => Node = () => {
  const [result, setResult] = useState<number | null>(null);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <Text style={{marginLeft: 20, marginTop: 20}}>
        3+7={result ?? '??'}
      </Text>
      <Button
        title="Compute"
        onPress={async () => {
          const value = await RTNCalculator.add(3, 7);
          setResult(value);
        }}
      />
    </SafeAreaView>
  );
};
export default App;
```

Try this out to see your TurboModule in action!