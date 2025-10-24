---
id: new-architecture-troubleshooting
title: 常见问题
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

本页面会记录一些迁移到新架构时可能遇到的常见问题的解决方案。

## Xcode 编译报错

如果在 XCode 编译时碰到类似下面的报错:

**Command PhaseScriptExecution failed with a nonzero exit code**

此错误表示注入到 Xcode 构建管道中的 codegen 脚本已经提前退出。您可能会在自己的库或某一个核心 RN 库（FBReactNativeSpec，rncore）中遇到此问题。

打开`~/Library/Developer/Xcode/DerivedData`，查找以您的 Xcode 工作区命名的文件夹（例如“RNTesterPods-AAAA”，其中“AAAA”是一串字符）。在该文件夹中，转到 Build → Intermediates.noindex → Pods.build → Debug-iphonesimulator（或适用于您的 iOS 设备的等效文件夹）。在其中，查找以 codegen 库命名的文件夹，其中包含脚本错误。脚本阶段的日志可以在`DerivedSources`文件夹中找到，文件名为`codegen-LibraryName.log`。此日志输出应提供有关错误来源的一些说明。

## 重置 CocoaPods 与 Node

CocoaPods 集成将随着我们推出新架构而频繁更新，可能会在这些更改之后导致您的项目无法运行。您可以通过尝试执行以下步骤清理与代码生成相关的任何更改：

1. 在您的 ios 目录（或您的 Podfile 所在的任何位置）中运行 `pod deintegrate`，然后重新运行 `pod install`（或 `arch -x86_64 pod install`，如果在 Apple M1 芯片电脑中碰到运行问题的话）。
2. 删除 `Podfile.lock`，然后重新运行 `pod install`（或 `arch -x86_64 pod install`，如果在 Apple M1 芯片电脑中碰到运行问题的话）。
3. 删除 `node_modules`，然后重新运行 `yarn install`。
4. 删除您的代码生成工件，然后重新运行 `pod install`（或 `arch -x86_64 pod install`，如果在 Apple M1 芯片电脑中碰到运行问题的话），然后清理并构建您的 Xcode 项目。

## Folly 的版本问题

您的 podspec 中使用的 Folly 版本必须与当前 React Native 使用的版本匹配。如果在运行“pod install”后看到以下错误：

```
[!] CocoaPods could not find compatible versions for pod "RCT-Folly":
```

...这意味着当前的版本可能不匹配。检查下 `node_modules/react-native/React/FBReactNativeSpec/FBReactNativeSpec.podspec` 文件中的 `folly_version` 记录的版本。然后将你自己的 podspec 中的`folly_version`设为一致的版本。

## Android 编译时碰到内存不足的报错`OutOfMemoryException`

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
