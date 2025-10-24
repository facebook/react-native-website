---
id: debugging-release-builds
title: 调试发行版本
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 符号化堆栈跟踪

在发布版本中，React Native 应用如果触发了未处理的异常，其输出可能会被混淆并且难以阅读。

```shell
07-15 10:58:25.820 18979 18998 E AndroidRuntime: FATAL EXCEPTION: mqt_native_modules
07-15 10:58:25.820 18979 18998 E AndroidRuntime: Process: com.awesomeproject, PID: 18979 07-15 10:58:25.820 18979 18998 E AndroidRuntime: com.facebook.react.common.JavascriptException: Failed, js engine: hermes, stack:
07-15 10:58:25.820 18979 18998 E AndroidRuntime: p@1:132161
07-15 10:58:25.820 18979 18998 E AndroidRuntime: p@1:132084
07-15 10:58:25.820 18979 18998 E AndroidRuntime: f@1:131854
07-15 10:58:25.820 18979 18998 E AndroidRuntime: anonymous@1:131119
```

在上述堆栈跟踪中，类似`p@1:132161`的条目是经过压缩的函数名称和字节码偏移量。为了调试这些调用，我们希望将它们转换为文件、行和函数名称，例如`AwesomeProject/App.js:54:initializeMap`。这被称为**符号化**。

您可以通过将堆栈跟踪和生成的源映射传递给[`metro-symbolicate`](http://npmjs.com/package/metro-symbolicate)来对上述类似的经过压缩的函数名称和字节码进行符号化。


### 启用源映射（source map）

源映射是符号化堆栈跟踪所必需的。请确保在目标平台的构建配置中启用了源映射。

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

:::info
在 Android 上，默认情况下已经启用了源映射。
:::

要启用源映射生成，请确保在 `android/app/build.gradle` 中包含以下 `hermesFlags`。

```groovy
react {
    hermesFlags = ["-O", "-output-source-map"]
}
```

如果操作正确，您应该在 Metro 构建输出期间看到源映射的输出位置。

```text
Writing bundle output to:, android/app/build/generated/assets/react/release/index.android.bundle
Writing sourcemap output to:, android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
```

</TabItem>
<TabItem value="ios">

:::info
在iOS上，默认情况下禁用源映射。请按以下说明启用它们。
:::

要启用源映射生成：

- 打开 Xcode 并编辑“Bundle React Native code and images”构建阶段。
- 在其他导出项之上，添加具有所需输出路径的 `SOURCEMAP_FILE` 条目。

```diff
+ SOURCEMAP_FILE="$(pwd)/../main.jsbundle.map";
  WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
```

如果操作正确，您应该在 Metro 构建输出期间看到源映射的输出位置。

```text
Writing bundle output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle
Writing sourcemap output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle.map
```

</TabItem>
</Tabs>

### 使用 `metro-symbolicate`

有了生成的源映射，现在可以翻译我们的堆栈跟踪了。

```shell
# 打印使用说明
npx metro-symbolicate

# 从包含堆栈跟踪的文件中
npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map < stacktrace.txt

# 从 adb logcat（Android）
adb logcat -d | npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map
```

### 源映射注意事项

- 构建过程可能会生成多个源映射。确保使用示例中显示的位置的源映射。
- 确保您使用的源映射对应于崩溃应用的确切提交。源代码的小改动可能导致偏移的巨大差异。
- 如果 `metro-symbolicate` 立即成功退出，请确保输入来自管道或重定向，而不是终端。

