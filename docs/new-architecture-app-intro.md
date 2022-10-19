---
id: new-architecture-app-intro
title: Prerequisites for Applications
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

<NewArchitectureWarning/>

There are a few prerequisites that should be addressed before the New Architecture is enabled in your application.

## Use a React Native >= 0.68 Release

React Native released the support for the New Architecture with the release `0.68.0`.

This guide is written with the expectation that you’re using the latest React Native release. At the moment of writing, this is `0.71.0`. Beside this guide, you can leverage the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) to determine what other changes may be required for your project.

To update to the most recent version of React Native, you can run this command:

```bash
npx react-native upgrade
```

## Use Hermes

Hermes is an open-source JavaScript engine optimized for React Native. Hermes is enabled by default, and you have to explicitly disable it if you want to use JSC.

We highly recommend using Hermes in your application. With Hermes enabled, you can use the JavaScript debugger in Flipper to directly debug your JavaScript code.

Please [follow the instructions on the React Native website](hermes) to learn how to enable/disable Hermes.

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

Turbo Native Modules can be written using Objective-C or C++. In order to support both cases, any source files that include C++ code should use the `.mm` file extension. This extension corresponds to Objective-C++, a language variant that allows for the use of a combination of C++ and Objective-C in source files.

:::important

**Use Xcode to rename existing files** to ensure file references persist in your project. You might need to clean the build folder (_Project → Clean Build Folder_) before re-building the app. If the file is renamed outside of Xcode, you may need to click on the old `.m` file reference and Locate the new file.

:::

## iOS - Make your AppDelegate conform to `RCTAppDelegate`

The final step to configure iOS for the New Architecture is to extend a base class proided by React Native, called `RCTAppDelegate`.

This class provides a base implementation for all the required functionalities of the new architecture. If you need to customize some of them, you can override those methods, invoke `[super methodNameWith:parameters:];` collecting the returned value and customize the bits you need to customize.

1. Open the `ios/AppDelegate.h` file and update it as it follows:

```diff
- #import <React/RCTBridgeDelegate.h>
+ #import <React-RCTAppDelegate/RCTAppDelegate.h>
#import <UIKit/UIKit.h>

- @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
+ @interface AppDelegate : RCTAppDelegate

- @property (nonatomic, strong) UIWindow *window;

@end
```

2. Open the `ios/AppDelegate.mm` file and replace its content with the following:

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

Using the New Architecture on Android has some prerequisites that you need to meet:

1. Using Gradle version >= 7.x
2. Using Android Gradle Plugin >= 7.3.x (i.e. the `com.android.tools.build:gradle` dependency)

If you updated to React Native 0.68+, you already meet those prerequisites. If you don't meet them, consider updating those dependencies first.

## Android - React Native Gradle Plugin & Build from Source

The New Architecture relies on the React Native Gradle Plugin (from the `react-native-gradle-plugin` NPM package) to build and run your project.

Moreover, in this iteration of the guide you will build React Native from source.

If you updated your project to React Native 0.68+, you probably already have this configuration set up correctly.

If not make sure you edit the `android/settings.gradle` file as follows:

```diff
 rootProject.name = 'HelloWorld'
 apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
 include ':app'
+includeBuild('../node_modules/react-native-gradle-plugin')

+include(":ReactAndroid")
+project(":ReactAndroid").projectDir = file('../node_modules/react-native/ReactAndroid')
+include(":ReactAndroid:hermes-engine")
+project(":ReactAndroid:hermes-engine").projectDir = file('../node_modules/react-native/+ReactAndroid/hermes-engine')
```

Update the `android/build.gradle` file as follows:

```diff
buildscript {
    // ...
    dependencies {

        // Add those lines
+       classpath("com.facebook.react:react-native-gradle-plugin")
+       classpath("de.undercouch:gradle-download-task:4.1.2")
    }
}
```

And update the `android/app/build.gradle` file (please note that this file is different than the top level `build.gradle`) as follows:

```diff
dependencies {
  // ...
  if (enableHermes) {
-    def hermesPath = "../../node_modules/hermes-engine/android/";
-    debugImplementation files(hermesPath + "hermes-debug.aar")
-    releaseImplementation files(hermesPath + "hermes-release.aar")
+    //noinspection GradleDynamicVersion
+    implementation("com.facebook.react:hermes-engine:+") // From node_modules
  }
}

+ configurations.all {
+     resolutionStrategy.dependencySubstitution {
+         substitute(module("com.facebook.react:react-native"))
+                 .using(project(":ReactAndroid"))
+                 .because("On New Architecture we're building React Native from source")
+         substitute(module("com.facebook.react:hermes-engine"))
+                .using(project(":ReactAndroid:hermes-engine"))
+                .because("On New Architecture we're building Hermes from source")
+     }
+ }
```

## Android - Configure the NDK

:::caution

In this iteration of the guide you’re setting up the project to build from source. You might notice an increase in your build time because of this.
You can mitigate this by following the approach described in [Speeding up your Build phase](/docs/next/build-speed) guide.

:::

As Codegen will output some Java and some C++ code that needs to build, you need to configure the Android NDK to do so.

Edit your `android/app/build.gradle` file to include the **two** `externalNativeBuild` blocks detailed below inside the `android{}` block:

```groovy
android {
    defaultConfig {
        applicationId "com.awesomeproject"
        // ...

        // Add this block
        externalNativeBuild {
            cmake {
                arguments "-DPROJECT_BUILD_DIR=$buildDir",
                    "-DREACT_ANDROID_DIR=$rootDir/../node_modules/react-native/ReactAndroid",
                    "-DREACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build",
                    "-DANDROID_STL=c++_shared"
            }
        }
    }

    // Add this block
    externalNativeBuild {
        cmake {
            path "$projectDir/src/main/jni/CMakeLists.txt"
        }
    }
}
```

Finally, you need to create two files that are required to build the native code correctly:

- A CMake file with the compilation instructions (similar to a `build.gradle` for Android/Java)
- An `OnLoad.cpp` file which, as the name says, will be loaded when your app starts.

Create a file inside the `android/app/src/main/jni` folder called `CMakeLists.txt` with the following content:

```cmake title="CMakeLists.txt"
cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(appmodules)

# This file includes all the necessary to let you build your application with the New Architecture.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)
```

And create the `android/app/src/main/jni/OnLoad.cpp` file with the following content:

```cpp title="OnLoad.cpp"
#include <DefaultComponentsRegistry.h>
#include <DefaultTurboModuleManagerDelegate.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncli.h>

namespace facebook {
namespace react {

void registerComponents(
    std::shared_ptr<ComponentDescriptorProviderRegistry const> registry) {
  // Custom Fabric Components go here. You can register custom
  // components coming from your App or from 3rd party libraries here.
  //
  // providerRegistry->add(concreteComponentDescriptorProvider<
  //        AocViewerComponentDescriptor>());

  // By default we just use the components autolinked by RN CLI
  rncli_registerProviders(registry);
}

std::shared_ptr<TurboModule> provideModules(
    const std::string &name,
    const JavaTurboModule::InitParams &params) {
  // Here you can provide your own module provider for TurboModules coming from
  // either your application or from external libraries. The approach to follow
  // is similar to the following (for a library called `samplelibrary`):
  //
  // auto module = samplelibrary_ModuleProvider(moduleName, params);
  // if (module != nullptr) {
  //    return module;
  // }
  // return rncore_ModuleProvider(moduleName, params);

  // By default we just use the module providers autolinked by RN CLI
  return rncli_ModuleProvider(name, params);
}

} // namespace react
} // namespace facebook

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
  return facebook::jni::initialize(vm, [] {
    facebook::react::DefaultTurboModuleManagerDelegate::
        moduleProvidersFromEntryPoint = &facebook::react::provideModules;
    facebook::react::DefaultComponentsRegistry::
        registerComponentDescriptorsFromEntryPoint =
            &facebook::react::registerComponents;
  });
}
```

When the app loads, this file will take care of registering the Native Components and Modules which provide native sources. By default we only provide the autolinked libraries as this allows you to use those libraries.

This is the only C++ file you'll have to add to your project, and the infrastructure will take care of the rest.

## Android - Update your Java classes

To simplify how to enable the New Architecture on Android, you can use some utility classes that will take care of all the setup without you having to worry about it.

Those classes are all located inside the `com.facebook.react.defaults` package and are all named `Defaults*`.

### Update the React Native Host

First, update your `ReactNativeHost` as follows (usually located in your `MainApplication.java` file):

<Tabs groupId="android-language" defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```diff title="MainApplication.java"
+import com.facebook.react.defaults.DefaultReactNativeHost;

   private final ReactNativeHost mReactNativeHost =
-      new ReactNativeHost(this) {
+      new DefaultReactNativeHost(this) {

         @Override
         public boolean getUseDeveloperSupport() {
           return BuildConfig.DEBUG;
         }

+        @Override
+        public boolean isNewArchEnabled() {
+          return true;
+        }
```

</TabItem>
<TabItem value="kotlin">

```diff title="MainApplication.kt"
+import com.facebook.react.defaults.DefaultReactNativeHost

   val reactNativeHost =
-      ReactNativeHost(this) {
+      DefaultReactNativeHost(this) {

         override fun getUseDeveloperSupport() = BuildConfig.DEBUG
+        override fun isNewArchEnabled() = true

       }
```

</TabItem>
</Tabs>

### Update the your application OnCreate

Still inside your `MainApplication` method `onCreate`, make sure that the New Architecture infrastructure is loaded correctly:

<Tabs groupId="android-language" defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```diff title="MainApplication.java"
+import com.facebook.react.defaults.DefaultNativeEntryPoint;

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // Make sure it's called after SoLoader.init
+   ReactFeatureFlags.useTurboModules = true;
+   DefaultNativeEntryPoint.load();
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
```

</TabItem>
<TabItem value="kotlin">

```diff title="MainApplication.kt"
+import com.facebook.react.defaults.DefaultNativeEntryPoint

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, /* native exopackage */ false)
    // Make sure it's called after SoLoader.init
+   ReactFeatureFlags.useTurboModules = true
+   DefaultNativeEntryPoint.load()
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
```

</TabItem>
</Tabs>

### Update your Activity Delegate

Finally, update your `MainActivity.java` file by providing a React Activity Delegate:

<Tabs groupId="android-language" defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```diff title="MainActivity.java"
+import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

+ @Override
+ protected ReactActivityDelegate createReactActivityDelegate() {
+   return new DefaultReactActivityDelegate(
+       this,
+       getMainComponentName(),
+       true, // Here we enable Fabric
+       true, // Here we enable Concurrent React Features
+       );
+ }

}
```

</TabItem>
<TabItem value="kotlin">

```diff title="MainApplication.kt"
+import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity : ReactActivity {

+ @Override
+ override protected fun createReactActivityDelegate() =
+   DefaultReactActivityDelegate(
+       this,
+       mainComponentName,
+       true, // Here we enable Fabric
+       true, // Here we enable Concurrent React Features
+   )

}
```

</TabItem>
</Tabs>

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
