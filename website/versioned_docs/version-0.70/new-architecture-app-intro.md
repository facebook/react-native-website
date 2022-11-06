---
id: new-architecture-app-intro
title: Prerequisites for Applications
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

There are a few prerequisites that should be addressed before the New Architecture is enabled in your application.

## Use a React Native >= 0.68 release

React Native released the support for the New Architecture with the release `0.68.0`.

This guide is written with the expectation that you’re using the latest React Native release. At the moment of writing, this is `0.70.0`. Other than this guide, you can leverage the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) to determine what other changes may be required for your project.

To update to the most recent version of React Native, you can run this command:

```bash
npx react-native upgrade
```

### Android specifics

Using the New Architecture on Android has some prerequisites that you need to meet:

1. Using Gradle 7.x and Android Gradle Plugin 7.x
2. Using the **new React Gradle Plugin**
3. Building `react-native` **from Source**

You can update Gradle by running:

```bash
cd android && ./gradlew wrapper --gradle-version 7.3.3 --distribution-type=all
```

While the AGP version should be updated inside the **top-level** `build.gradle` file at the `com.android.tools.build:gradle` dependency line.

Now, you can edit your **top-level** `settings.gradle` file to include the following line at the end of the file:

```groovy
includeBuild('../node_modules/react-native-gradle-plugin')

include(":ReactAndroid")
project(":ReactAndroid").projectDir = file('../node_modules/react-native/ReactAndroid')
include(":ReactAndroid:hermes-engine")
project(":ReactAndroid:hermes-engine").projectDir = file('../node_modules/react-native/ReactAndroid/hermes-engine')
```

Then, open the `android/app/src/main/AndroidManifest.xml` file and add this line:

```diff
android:windowSoftInputMode="adjustResize"
+ android:exported="true">
<intent-filter>
```

Then, edit your **top-level Gradle file** to include the highlighted lines:

```groovy
buildscript {
    ext {
        buildToolsVersion = "31.0.0"
        minSdkVersion = 21
        compileSdkVersion = 31
        targetSdkVersion = 31
        if (System.properties['os.arch'] == "aarch64") {
            // For M1 Users we need to use the NDK 24 which added support for aarch64
            ndkVersion = "24.0.8215888"
        } else {
            // Otherwise we default to the side-by-side NDK version from AGP.
            ndkVersion = "21.4.7075529"
        }
    }

    // ...
    dependencies {
        // Make sure that AGP is at least at version 7.x
        classpath("com.android.tools.build:gradle:7.2.0")

        // Add those lines
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("de.undercouch:gradle-download-task:4.1.2")
    }
}
```

Edit your **module-level** **Gradle file** (usually `app/build.gradle[.kts]`) to include the following:

```diff
// ...

apply plugin: "com.android.application"

// ...

if (enableHermes) {
-    def hermesPath = "../../node_modules/hermes-engine/android/";
-    debugImplementation files(hermesPath + "hermes-debug.aar")
-    releaseImplementation files(hermesPath + "hermes-release.aar")
+    //noinspection GradleDynamicVersion
+    implementation("com.facebook.react:hermes-engine:+") { // From node_modules
+        exclude group:'com.facebook.fbjni'
+    }
} else {

// ...

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

// Run this once to be able to run the application with BUCK
// puts all compile dependencies into folder libs for BUCK to use
task copyDownloadableDepsToLibs(type: Copy) {

// ...

+ def isNewArchitectureEnabled() {
+     // To opt-in for the New Architecture, you can either:
+     // - Set `newArchEnabled` to true inside the `gradle.properties` file
+     // - Invoke gradle with `-newArchEnabled=true`
+     // - Set an environment variable `ORG_GRADLE_PROJECT_newArchEnabled=true`
+     return project.hasProperty("newArchEnabled") && project.newArchEnabled == "true"
+ }
```

Finally, it’s time to update your project to use the `react-native` dependency from source, rather than using a precompiled artifact from the NPM package. This is needed as the later setup will rely on building the native code from source.

Let’s edit your **module-level** `build.gradle` (the one inside `app/` folder) and change the following line:

```diff
dependencies {
-  implementation "com.facebook.react:react-native:+"  // From node_modules
+  implementation project(":ReactAndroid")  // From node_modules
```

## Use Hermes

Hermes is an open-source JavaScript engine optimized for React Native. Hermes is enabled by default and you have to explicitly disable it if you want to use JSC.

We highly recommend using Hermes in your application. With Hermes enabled, you will be able to use the JavaScript debugger in Flipper to directly debug your JavaScript code.

Please [follow the instructions on the React Native website](hermes) to learn how to enable/disable Hermes.

:::caution

**iOS:** If you opt out of using Hermes, you will need to replace `HermesExecutorFactory` with `JSCExecutorFactory` in any examples used throughout the rest of this guide.

:::

### Android

To enable Hermes in Android, open the `android/app/build.gradle` and apply the following changes:

```diff
project.ext.react = [
-    enableHermes: true,  // clean and rebuild if changing
+    enableHermes: true,  // clean and rebuild if changing
]
// ...

}

if (enableHermes) {
-    def hermesPath = "../../node_modules/hermes-engine/android/";
-    debugImplementation files(hermesPath + "hermes-debug.aar")
-    releaseImplementation files(hermesPath + "hermes-release.aar")
+    //noinspection GradleDynamicVersion
+    implementation("com.facebook.react:hermes-engine:+") { // From node_modules
+        exclude group:'com.facebook.fbjni'
+    }
} else {
```

Moreover, you'll need to update the `proguard-rules`, adding the following ones:

```
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

After that, remember to cleanup the project, running

```sh
cd android
./gradlew clean
```

## iOS: Make the project build

After upgrading the project, there are a few changes you need to apply:

1. Fix an API change in the `AppDelegate.m`. Open this file and apply this change:

```diff
#if DEBUG
-       return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
+       return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
```

2. Target the proper iOS version. Open the `Podfile` and apply this change:

```diff
- platform :ios, '11.0'
+ platform :ios, '12.4'
```

3. Create an `.xcode.env` file to export the locaion of the NODE_BINARY. Navigate to the `ios` folder and run this command:

```sh
echo 'export NODE_BINARY=$(command -v node)' > .xcode.env
```

If you need it, you can also open the file and replace the `$(command -v node)` with the path to the node executable.
React Native supports also a local version of this file `.xcode.env.local`. This file is not synced with the repository to let you customize your local setup, if it differs from the Continuous Integration or the team one.

## iOS: Use Objective-C++ (`.mm` extension)

Turbo Native Modules can be written using Objective-C or C++. In order to support both cases, any source files that include C++ code should use the `.mm` file extension. This extension corresponds to Objective-C++, a language variant that allows for the use of a combination of C++ and Objective-C in source files.

:::info

Use Xcode to rename existing files to ensure file references persist in your project. You might need to clean the build folder (_Project → Clean Build Folder_) before re-building the app. If the file is renamed outside of Xcode, you may need to click on the old `.m` file reference and Locate the new file.

:::

## iOS: TurboModules: Ensure your App Provides an `RCTCxxBridgeDelegate`

In order to set up the TurboModule system, you will add some code to interact with the bridge in your AppDelegate. Before you start, go ahead and rename your AppDelegate file to use the `.mm` extension.

Now you will have your AppDelegate conform to `RCTCxxBridgeDelegate`. Start by adding the following imports at the top of your AppDelegate file:

```objc
#import <reacthermes/HermesExecutorFactory.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTJSIExecutorRuntimeInstaller.h>
```

Then, declare your app delegate as a `RCTCxxBridgeDelegate` provider:

```objc
@interface AppDelegate () <RCTCxxBridgeDelegate> {
  // ...
}
@end
```

To conform to the `RCTCxxBridgeDelegate` protocol, you will need to implement the `jsExecutorFactoryForBridge:` method. Typically, this is where you would return a `JSCExecutorFactory` or `HermesExecutorFactory`, and we will use it to install our TurboModules bindings later on.

You can implement the `jsExecutorFactoryForBridge:` method like this:

```objc
#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  return std::make_unique<facebook::react::HermesExecutorFactory>(facebook::react::RCTJSIExecutorRuntimeInstaller([bridge](facebook::jsi::Runtime &runtime) {
      if (!bridge) {
        return;
      }
    })
  );
}
```
