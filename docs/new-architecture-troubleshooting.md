---
id: new-architecture-troubleshooting
title: Troubleshooting
---

:::caution

This documentation is still **experimental** and details are subject to changes as we iterate. Feel free to share your feedback on the [react-native-website PR](https://github.com/facebook/react-native-website) for this page.

Moreover, it contains several **manual steps**. Please note that this won't be representative of the final developer experience once the New Architecture is stable. We're working on tools, templates and libraries to help you get started fast on the New Architecture, without having to go through the whole setup.

:::

This page contains resolutions to common problem you might face when migrating to the New Architecture.

## Xcode Build Issues

Should the XCode Build fail with:

**Command PhaseScriptExecution failed with a nonzero exit code**

This error indicates that the codegen script that is injected into the Xcode build pipeline has exited early. You may get this for either your own library, or one of the core RN libraries (FBReactNativeSpec, rncore).

Open `~/Library/Developer/Xcode/DerivedData`. and look for a folder named after your Xcode workspace (“RNTesterPods-AAAA” where “AAAA” is a string of characters). Within that folder, go to Build → Intermediates.noindex → Pods.build → Debug-iphonesimulator (or the equivalent for your iOS device, if applicable). Inside, look for the folder named after the codegen library has the script error. The logs for the script phase can be found within the DerivedSources folder, in a file named `codegen-LibraryName.log`. This log output should provide clarity on the source of the error.

## CocoaPods and Node Reset

The CocoaPods integration will see frequent updates as we rollout the New Architecture, and it is possible to end up with your workspace in a broken state after one of these changes. You may clean up any changes related to the codegen by performing some of these steps:

1. Run `pod deintegrate` in your ios directory (or wherever your Podfile is located) and re-run `pod install` (or `arch -x86_64 pod install`, in case of a Mac M1).
2. Delete `Podfile.lock` and re-run `pod install` (or `arch -x86_64 pod install`, in case of a Mac M1).
3. Delete `node_modules` and re-run `yarn install`.
4. Delete your codegen artifacts and re-run `pod install` (or `arch -x86_64 pod install`, in case of a Mac M1), then clean and build your Xcode project.

## Folly Version

As it happens, the Folly version used in your podspec must match whatever version is used in React Native at this time. If you see the following error after running `pod install`:

```
[!] CocoaPods could not find compatible versions for pod "RCT-Folly":
```

...you may have a version-mismatch. Take a look at your `node_modules/react-native/React/FBReactNativeSpec/FBReactNativeSpec.podspec` file and make note of the `folly_version` used there. Go back to your own podspec and set your `folly_version` to match.

## Android build is failing with `OutOfMemoryException`

If your Android Gradle builds are failing with: `OutOfMemoryException: Out of memory: Java heap space.` or similar errors related to low memory, you might need to increase the memory allocated to the JVM.

You can do that by editing the `gradle.properties` file in your `android/gradle.properties` folder:

```diff
 # Specifies the JVM arguments used for the daemon process.
 # The setting is particularly useful for tweaking memory settings.
 # Default value: -Xmx1024m -XX:MaxPermSize=256m
-# org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
+org.gradle.jvmargs=-Xmx4g -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

Make sure to uncomment the line and set the preferred memory size with the `-Xmx` parameter. 2Gb should be the minimum required and 4Gb is recommended.

## Android NDK and Mac with M1 Apple Silicon CPUs

We're aware of a series of incompatibilities between the Android NDK and Macs on M1 CPUs ([here](https://github.com/android/ndk/issues/1299) and [here](https://github.com/android/ndk/issues/1410)).
As you need to enable the NDK when building from source, you might face problems during your build.

The workaround at this stage is [suggested here](https://github.com/android/ndk/issues/1299).
As newer version of the Android SDK/NDK are released, we will update the documentation with the necessary steps.
