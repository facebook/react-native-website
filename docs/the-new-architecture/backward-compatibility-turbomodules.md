---
id: backward-compatibility-turbomodules
title: TurboModules as Native Modules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import BetaTS from './\_markdown_beta_ts_support.mdx';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

:::info
The creation of a backward compatible TurboModule requires the knowledge of how to create a TurboModule. To recall these concepts, have a look at this [guide](pillars-turbomodules).

TurboModules only works when the New Architecture is properly setup. If you already have a library that you want to migrate to the New Architecture, have a look at the [migration guide](../new-architecture-intro) as well.
:::

Creating a backward compatible TurboModule lets your users continue leverage your library, independently from the architecture they use. The creation of such a module requires a few steps:

1. Configure the library so that dependencies are prepared set up properly for both the Old and the New Architecture.
1. Update the codebase so that the New Architecture types are not compiled when not available.
1. Uniform the JavaScript API so that your user code won't need changes.

<BetaTS />

While the last step is the same for all the platforms, the first two steps are different for iOS and Android.

## Configure the TurboModule Dependencies

### <a name="dependencies-ios" />iOS

The Apple platform installs TurboModules using [Cocoapods](https://cocoapods.org) as dependency manager.

Every TurboModule defines a `podspec` that looks like this:

```ruby
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_version = '2021.07.22.00'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # Default fields for a valid podspec
  s.name            = "<TM Name>"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"
  # React Native Core dependency
  s.dependency "React-Core"

  # The following lines are required by the New Architecture.
  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
  s.pod_target_xcconfig    = {
      "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"

end
```

The **goal** is to avoid installing the dependencies when the app is prepared for the Old Architecture.

When we want to install the dependencies we use the following commands, depending on the architecture:

```sh
# For the Old Architecture, we use:
pod install

# For the New Architecture, we use:
RCT_NEW_ARCH_ENABLED=1 pod install
```

Therefore, we can leverage this environment variable in the `podspec` to exclude the settings and the dependencies that are related to the New Architecture:

```diff
+ if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    # The following lines are required by the New Architecture.
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    # ... other dependencies ...
    s.dependency "ReactCommon/turbomodule/core"
+ end
end
```

This `if` guard prevents the dependencies from being installed when the environment variable is not set.

### Android

To create a module that can work with both architectures, you need to configure Gradle to choose which files need to be compiled depending on the chosen architecture. This can be achieved by using **different source sets** in the Gradle configuration.

:::note
Please note that this is currently the suggested approach. While it might lead to some code duplication, it will ensure the maximum compatibility with both architectures. You will see how to reduce the duplication in the next section.
:::

To configure the TurboModule so that it picks the proper sourceset, you have to update the `build.gradle` file in the following way:

```diff title="build.gradle"
+// Add this function in case you don't have it already
+ def isNewArchitectureEnabled() {
+    return project.hasProperty("newArchEnabled") && project.newArchEnabled == "true"
+}


// ... other parts of the build file

defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 21)
        targetSdkVersion safeExtGet('targetSdkVersion', 31)
+        buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", isNewArchitectureEnabled().toString())
+    }
+
+    sourceSets {
+        main {
+            if (isNewArchitectureEnabled()) {
+                java.srcDirs += ['src/newarch']
+            } else {
+                java.srcDirs += ['src/oldarch']
+            }
+        }
    }
}
```

This changes do three main things:

1. The first lines define a function that returns whether the New Architecture is enabled or not.
2. The `buildConfigField` line defines a build configuration boolean field called `IS_NEW_ARCHITECTURE_ENABLED`, and initialize it using the function declared in the first step. This allows you to check at runtime if a user has specified the `newArchEnabled` property or not.
3. The last lines leverage the function declared in step one to decide which source sets we need to build, depending on the choosen architecture.

## Update the codebase

### iOS

The second step is to instruct Xcode to avoid compiling all the lines using the New Architecture types and files when we are building an app with the Old Architecture.

The file to change is the module implementation file, which is usually a `<your-module>.mm` file. That file is structured as follow:

- Some `#import` statements, among which there is a `<GeneratedSpec>.h` file.
- The module implementation, using the various `RCT_EXPORT_xxx` and `RCT_REMAP_xxx` macros.
- The `getTurboModule:` function, which uses the `<MyModuleSpecJSI>` type, generated by The New Architecture.

The **goal** is to make sure that the `TurboModule` still builds with the Old Architecture. To achieve that, we can wrap the `#import "<GeneratedSpec>.h"` and the `getTurboModule:` function into an `#ifdef RCT_NEW_ARCH_ENABLED` compilation directive, as shown in the following example:

```diff
#import "<MyModuleHeader>.h"
+ #ifdef RCT_NEW_ARCH_ENABLED
#import "<GeneratedSpec>.h"
+ #endif

// ... rest of your module

+ #ifdef RCT_NEW_ARCH_ENABLED
 - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
 {
    return std::make_shared<facebook::react::<MyModuleSpecJSI>>(params);
 }
+ #endif

@end
```

This snippet uses the same `RCT_NEW_ARCH_ENABLED` flag used in the previous [section](#dependencies-ios). When this flag is not set, Xcode skips the lines within the `#ifdef` during compilation and it does not include them into the compiled binary.

### Android

As we can't use conditional compilation blocks on Android, we will define two different source sets. This will allow to create a backward compatible TurboModule with the proper source that is loaded and compiled depending on the used architecture.

Therefore, you have to:

1. Create a Native Module in the `src/oldarch` path. See [this guide](../native-modules-intro) to learn how to create a Native Module.
2. Create a TurboModule in the `src/newarch` path. See [this guide](./pillars-turbomodules) to learn how to create a TurboModule

and then instruct Gradle to decide which implementation to pick.

Some files can be shared between a Native Module and a TurboModule: these should be created or moved into a folder that is loaded by both the architectures. These files are:

- the `<MyModule>Package.java` file used to load the module.
- a `<MyTurboModule>Impl.java` file where we can put the code that both the Native Module and the TurboModule has to execute.

The final folder structure looks like this:

```sh
my-module
├── android
│   ├── build.gradle
│   └── src
│       ├── main
│       │   ├── AndroidManifest.xml
│       │   └── java
│       │       └── com
│       │           └── MyModule
│       │               ├── MyModuleImpl.java
│       │               └── MyModulePackage.java
│       ├── newarch
│       │   └── java
│       │       └── com
│       │           └── MyModule.java
│       └── oldarch
│           └── java
│               └── com
│                   └── MyModule.java
├── ios
├── js
└── package.json
```

The code that should go in the `MyModuleImpl.java` and that can be shared by the Native Module and the TurboModule is, for example:

```java title="example of MyModuleImple.java"
package com.MyModule;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

public class MyModuleImpl {

    public static final String NAME = "MyModule";

    public void foo(double a, double b, Promise promise) {
        // implement the logic for foo and then invoke promise.resolve or
        // promise.reject.
    }
}
```

Then, the Native Module and the TurboModule can be updated with the following steps:

1. Create a private instance of the `MyModuleImpl` class.
2. Initialize the instance in the module constructor.
3. Use the private instance in the modules methods.

For example, for a Native Module:

```java title="Native Module using the Impl module"
public class MyModule extends ReactContextBaseJavaModule {

    // declare an instance of the implementation
    private MyModuleImpl implementation;

    CalculatorModule(ReactApplicationContext context) {
        super(context);
        // initialize the implementation of the module
        implementation = MyModuleImpl();
    }

    @Override
    public String getName() {
        // NAME is a static variable, so we can access it using the class name.
        return MyModuleImpl.NAME;
    }

    @ReactMethod
    public void foo(int a, int b, Promise promise) {
        // Use the implementation instance to execute the function.
        implementation.foo(a, b, promise);
    }
}
```

And, for a TurboModule:

```java title="TurboModule using the Impl module"
public class MyModule extends MyModuleSpec {
    // declare an instance of the implementation
    private MyModuleImpl implementation;

    CalculatorModule(ReactApplicationContext context) {
        super(context);
        // initialize the implementation of the module
        implementation = MyModuleImpl();
    }

    @Override
    @NonNull
    public String getName() {
        // NAME is a static variable, so we can access it using the class name.
        return MyModuleImpl.NAME;
    }

    @Override
    public void foo(double a, double b, Promise promise) {
        // Use the implementation instance to execute the function.
        implementation.foo(a, b, promise);
    }
}
```

For a step-by-step example on how to achieve this, have a look at [this repo](https://github.com/react-native-community/RNNewArchitectureLibraries/tree/feat/back-turbomodule).

## Unify the JavaScript specs

<BetaTS />

The last step makes sure that the JavaScript behaves transparently to chosen architecture.

For a TurboModule, the source of truth is the `Native<MyModule>.js` (or `.ts`) spec file. The app accesses the spec file like this:

```ts
import MyModule from 'your-module/src/index';
```

The **goal** is to conditionally `export` from the `index` file the proper object, given the architecture chosen by the user. We can achieve this with a code that looks like this:

<Tabs groupId="turbomodule-backward-compatibility"
      defaultValue={constants.defaultTurboModuleSpecLanguage}
      values={constants.turboModuleSpecLanguages}>
<TabItem value="Flow">

```ts
// @flow

import { NativeModules } from 'react-native'

const isTurboModuleEnabled = global.__turboModuleProxy != null;

const myModule = isTurboModuleEnabled ?
    require('./Native<MyModule>').default :
    NativeModules.<MyModule>;

export default myModule;
```

</TabItem>
<TabItem value="TypeScript">

```ts
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const myModule = isTurboModuleEnabled
  ? require('./Native<MyModule>').default
  : require('./<MyModule>').default;

export default myModule;
```

</TabItem>
</Tabs>

:::note
If you are using TypeScript and you want to follow the example, make sure to `export` the `NativeModule` in a separate `ts` file called `<MyModule>.ts`.
:::

Whether you are using Flow or TypeScript for your specs, we understand which architecture is running by checking whether the `global.__turboModuleProxy` object has been set or not.

:::caution
The `global.__turboModuleProxy` API may change in the future for a function that encapsulate this check.
:::

- If that object is `null`, the app has not enabled the TurboModule feature. It's running on the Old Architecture, and the fallback is to use the default [`NativeModule` implementation](../native-modules-intro).
- If that object is set, the app is running with the TurboModules enabled and it should use the `Native<MyModule>` spec to access the TurboModule.
