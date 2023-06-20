---
id: new-architecture-troubleshooting
title: Troubleshooting
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

This page contains resolutions to common problem you might face when migrating to the New Architecture.

## CocoaPods and Node Reset

The CocoaPods integration will see frequent updates as we rollout the New Architecture, and it is possible to end up with your workspace in a broken state after one of these changes. You may clean up any changes related to the codegen by performing some of these steps:

1. Run `bundle exec pod deintegrate` in your ios directory and then rerun `RCT_NEW_ARCH_ENABLED=1 bundle exec pod install`.
2. Delete `node_modules` and re-run `yarn install`.

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
As the New Architectecture relies on the NDK, you might face problems during your build.

React Native version 0.70 and 0.71 contains fixes for those build failures, and we invite you to update to those versions whenever possible.
