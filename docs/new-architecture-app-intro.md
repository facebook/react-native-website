---
id: new-architecture-app-intro
title: Prerequisites for Applications
---

:::caution

This documentation is still **experimental** and details are subject to changes as we iterate. Feel free to share your feedback on the [react-native-website PR](https://github.com/facebook/react-native-website) for this page.

Moreover, it contains several **manual steps**. Please note that this won't be representative of the final developer experience once the New Architecture is stable. We're working on tools, templates and libraries to help you get started fast on the New Architecture, without having to go through the whole setup.

:::

There’s a few prerequisites that should be addressed before the new architecture is enabled in your application.

## Use a React Native nightly release

At this time, you must use a React Native nightly release in order to get access to the most up to date changes. Eventually, we will recommend targeting a minimum stable open source release.

This guide is written with the expectation that you’re using a specific nightly release. As new revisions of this guide are released, the target nightly release may be updated. The specific nightly version that we will be using throughout the rest of this guide is version `0.0.0-20220201-2008-79975d146`.

Before upgrading your app to a specific nightly release, we recommend upgrading your app to the latest open source release. By upgrading to a published open source release first, you will be able to take advantage of tools like the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) to determine what other changes may be required for your project.

As of this writing, the latest stable release is `0.67.2`. Once you have upgraded your project to this version successfully, you may proceed to targeting the `0.0.0-20220201-2008-79975d146` nightly release. You may target this nightly release the same way you’d target any other version of React Native:

```bash
yarn add react-native@0.0.0-20220201-2008-79975d146
```

## Install react-native-codegen

Make sure that you're using the latest version of the [`react-native-codegen`](https://www.npmjs.com/package/react-native-codegen) NPM package. At the time of writing it's `0.0.13`.

```bash
yarn add react-native-codegen
```

:::info

If you see an error like `***TypeError: RNCodegen.generateFromSchemas is not a function.***`, it means that you're using a older version of `react-native-codegen`.
Make sure you don't have an older version installed under the `node_modules/react-native/node_modules` folder. You can remove that or reinstall everything in node_modules to fix the problem.

:::

### Android specifics

Using the new architecture on Android has some prerequisites that you need to meet:

1. Using Gradle 7.x and Android Gradle Plugin 7.x
2. Using the **new React Gradle Plugin**
3. Building `react-native` **from Source**

You can update Gradle by running:

```bash
cd android && ./gradlew wrapper --gradle-version 7.3 --distribution-type=all
```

While the AGP version should be updated inside the **top level** `build.gradle` file at the `com.android.tools.build:gradle` dependency line.

If you’re set with it, let’s now install the new Gradle plugin which is distributed through a NPM package called [**`react-native-gradle-plugin`**](https://www.npmjs.com/package/react-native-gradle-plugin). You can do so with:

```bash
yarn add react-native-gradle-plugin
```

You can control if you have the package already installed by doing:

```bash
ls -la node_modules/react-native-gradle-plugin
```

Now, you can edit your **top level** `settings.gradle` file to include the following line at the end of the file:

```diff title='android/settings.gradle'
 include ':app'
+includeBuild('../node_modules/react-native-gradle-plugin')

+include(":ReactAndroid")
+project(":ReactAndroid").projectDir = file('../node_modules/react-native/ReactAndroid')
```

Then, edit your **top-level Gradle file** to include the highlighted lines:

```diff title='android/build.gradle'
buildscript {
    // ...
    dependencies {
        // Make sure that AGP is at least at version 7.x
-       classpath("com.android.tools.build:gradle:4.2.2")
+       classpath("com.android.tools.build:gradle:7.0.4")

+       classpath("com.facebook.react:react-native-gradle-plugin")
+       classpath("de.undercouch:gradle-download-task:4.1.2")
    }
}
```

Edit your **module-level** **Gradle file** (usually `app/build.gradle[.kts]`) to include the following:

```diff title='android/app/settings.gradle'
 apply plugin: "com.android.application"

+apply plugin: "com.facebook.react"

+react {
+    reactRoot = rootProject.file("../node_modules/react-native/")
+    codegenDir = rootProject.file("../node_modules/react-native-codegen/")
+}
```

Finally, it’s time to update your project to use the `react-native` dependency from source, rather than using a precompiled artifact from the NPM package. This is needed as the later setup will rely on building the native code from source.

Let’s edit your **module level** `build.gradle` (the one inside `app/` folder) and change the following line:

```diff title='android/app/build.gradle'
dependencies {
-  implementation "com.facebook.react:react-native:+"  // From node_modules
+  implementation project(":ReactAndroid")  // From node_modules
```

## Use Hermes

Hermes is an open-source JavaScript engine optimized for React Native. We highly recommend using Hermes in your application. With Hermes enabled, you will be able to use the JavaScript debugger in Flipper to directly debug your JavaScript code.

Please [follow the instructions on the React Native website](hermes) in order to enable Hermes in your application.

:::caution

**iOS:** If you opt out of using Hermes, you will need to replace `HermesExecutorFactory` with `JSCExecutorFactory` in any examples used throughout the rest of this guide.

:::

## iOS: Enable C++17 language feature support

Your Xcode project settings need to be updated to support C++17 language features.

**Instructions**

1. Select your project in the Project navigator on the left (e.g. MyXcodeApp)
2. Then, make sure your project is selected in the center pane (as opposed to a particular target in your project, e.g. MyXcodeApp under Project, not under Targets).
3. Go to Build Settings
4. Search for C++ Language Dialect or CLANG_CXX_LANGUAGE_STANDARD
5. Make sure **C++17** is selected from the dropdown menu (or enter "c++17" directly into the value box).

If done correctly, your diff will show the following changes to your project file:

```ruby
CLANG_CXX_LANGUAGE_STANDARD = "c++17"
```

:::info

Your project should also be configured to support Folly. This should be done automatically once the library dependency is picked up, so no further changes to your project are necessary.

:::

## iOS: Use Objective-C++ (`.mm` extension)

TurboModules can be written using Objective-C or C++. In order to support both cases, any source files that include C++ code should use the `.mm` file extension. This extension corresponds to Objective-C++, a language variant that allows for the use of a combination of C++ and Objective-C in source files.

:::info

Use Xcode to rename existing files to ensure file references persist in your project. You might need to clean the build folder (_Project → Clean Build Folder_) before re-building the app. If the file is renamed outside of Xcode, you may need to click on the old `.m` file reference and Locate the new file.

:::

## iOS: TurboModules: Ensure your App Provides an `RCTCxxBridgeDelegate`

In order to set up the TurboModule system, you will add some code to interact with the bridge in your AppDelegate. Before you start, go ahead and rename your AppDelegate file to use the `.mm` extension.

Now you will have your AppDelegate conform to `RCTCxxBridgeDelegate`. Start by adding the following imports at the top of your AppDelegate file:

```objc title='AppDelegate.mm'
#import <reacthermes/HermesExecutorFactory.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTJSIExecutorRuntimeInstaller.h>
```

Then, declare your app delegate as a `RCTCxxBridgeDelegate` provider:

```objc title='AppDelegate.mm'
@interface AppDelegate () <RCTCxxBridgeDelegate> {
  // ...
}
@end
```

To conform to the `RCTCxxBridgeDelegate` protocol, you will need to implement the `jsExecutorFactoryForBridge:` method. Typically, this is where you would return a `JSCExecutorFactory` or `HermesExecutorFactory`, and we will use it to install our TurboModules bindings later on.

You can implement the `jsExecutorFactoryForBridge:` method like this:

```objc title='AppDelegate.mm'
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
