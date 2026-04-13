---
id: react-native-gradle-plugin
title: React Native Gradle Plugin
---

本指南描述了如何配置 **React Native Gradle Plugin**（通常称为 RNGP）来为 Android 构建 React Native 应用。

## 使用插件

React Native Gradle Plugin 作为单独的 NPM 包分发，并随 `react-native` 自动安装。

插件已为使用 `npx react-native init` 创建的新项目配置。如果你使用此命令创建应用，则不需要进行任何额外步骤来安装它。

如果你正在将 React Native 集成到现有项目中，请参阅 [对应页面](/docs/next/integration-with-existing-apps#configuring-gradle)：它包含有关如何安装插件的特定说明。

## 配置插件

默认情况下，插件会**开箱即用**，并使用合理的默认值。你应该参考本指南并仅在需要时自定义行为。

要配置插件，可以修改 `android/app/build.gradle` 中的 `react` 块：

```groovy
apply plugin: "com.facebook.react"

/**
 * This is the configuration block to customize your React Native Android app.
 * By default you don't need to apply any configuration, just uncomment the lines you need.
 */
react {
  // Custom configuration goes here.
}
```

每个配置键的描述如下：

### `root`

这是你的 React Native 项目的根文件夹，即 `package.json` 文件所在的位置。默认是 `..`。你可以按如下方式自定义：

```groovy
root = file("../")
```

### `reactNativeDir`

这是 `react-native` 包所在的文件夹。默认是 `../node_modules/react-native`。如果你在 Monorepo 中或在不同的包管理器中使用，可以调整 `reactNativeDir` 以适应你的设置。

你可以按如下方式自定义：

```groovy
reactNativeDir = file("../node_modules/react-native")
```

### `codegenDir`

这是 `react-native-codegen` 包所在的文件夹。默认是 `../node_modules/react-native-codegen`。如果你在 Monorepo 中或在不同的包管理器中使用，可以调整 `codegenDir` 以适应你的设置。

你可以按如下方式自定义：

```groovy
codegenDir = file("../node_modules/@react-native/codegen")
```

### `cliFile`

这是 React Native CLI 的入口文件。默认是 `../node_modules/react-native/cli.js`。入口文件是必需的，因为插件需要调用 CLI 来为应用生成捆绑包。

如果你在 Monorepo 中或在不同的包管理器中使用，可以调整 `cliFile` 以适应你的设置。

你可以按如下方式自定义：

```groovy
cliFile = file("../node_modules/react-native/cli.js")
```

### `debuggableVariants`

这是可调试变体的列表（有关变体的更多上下文，请参阅 [使用变体](#using-variants)）。

默认情况下，插件仅将 `debug` 视为可调试变体，而 `release` 则不是。如果你有其他变体（如 `staging`、`lite` 等），则需要相应调整。

列出的变体将不会带有已发布的捆绑包，因此你需要运行 Metro 来运行它们。

你可以按如下方式自定义：

```groovy
debuggableVariants = ["liteDebug", "prodDebug"]
```

### `nodeExecutableAndArgs`

这是用于所有脚本的 node 命令和参数的列表。默认是 `[node]`，但可以按如下方式自定义：

```groovy
nodeExecutableAndArgs = ["node"]
```

### `bundleCommand`

这是用于创建应用捆绑包的 `bundle` 命令的名称。如果你使用 [RAM Bundles](/docs/ram-bundles-inline-requires)，则此命令非常有用。默认是 `bundle`，但可以按如下方式自定义：

```groovy
bundleCommand = "ram-bundle"
```

### `bundleConfig`

这是传递给 `bundle --config <file>` 的配置文件的路径。默认是空（不提供配置文件）。有关捆绑配置文件的更多信息，请参阅 [CLI 文档](https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle)。可以按如下方式自定义：

```groovy
bundleConfig = file(../rn-cli.config.js)
```

### `bundleAssetName`

这是应该生成的捆绑包文件的名称。默认是 `index.android.bundle`。可以按如下方式自定义：

```groovy
bundleAssetName = "MyApplication.android.bundle"
```

### `entryFile`

这是用于捆绑包生成的入口文件。默认是搜索 `index.android.js` 或 `index.js`。可以按如下方式自定义：

```groovy
entryFile = file("../js/MyApplication.android.js")
```

### `extraPackagerArgs`

这是传递给 `bundle` 命令的额外标志的列表。可用标志的列表在 [CLI 文档](https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle) 中。默认是空。可以按如下方式自定义：

```groovy
extraPackagerArgs = []
```

### `hermesCommand`

这是 `hermesc` 命令的路径（Hermes 编译器）。React Native 附带了一个 Hermes 编译器版本，因此你通常不需要自定义此项。插件将使用正确的编译器。

### `hermesFlags`

这是传递给 `hermesc` 的标志列表。默认是 `["-O", "-output-source-map"]`。可以按如下方式自定义：

```groovy
hermesFlags = ["-O", "-output-source-map"]
```

### `enableBundleCompression`

Bundle 资源在打包到 `.apk` 中时是否应该被压缩。

禁用 `.bundle` 的压缩允许它直接内存映射到 RAM，从而改善启动时间——代价是在磁盘上产生更大的应用大小。请注意，`.apk` 的下载大小基本不受影响，因为 `.apk` 文件在下载前会被压缩。

默认情况下这是禁用的，你不应该启用它，除非你真的关心应用的磁盘空间。

## 使用 Flavors 与 Build Variants

在构建 Android 应用时，你可能希望使用 [自定义 Flavors](https://developer.android.com/studio/build/build-variants#product-flavors) 来从同一个项目中生成不同版本的 app。

请参阅 [官方 Android 指南](https://developer.android.com/studio/build/build-variants) 来配置自定义构建类型（如 `staging`）或自定义 Flavors（如 `full`、`lite` 等）。默认情况下，新应用有两个构建类型（`debug` 和 `release`），没有自定义 Flavors。

所有构建类型和 Flavors 的组合生成一组 **build variants**。例如，对于 `debug`/`staging`/`release` 构建类型和 `full`/`lite` Flavors，你将拥有 6 个 build variants：`fullDebug`、`fullStaging`、`fullRelease` 等等。

如果你使用除了 `debug` 和 `release` 之外的自定义变体，你需要通过 [`debuggableVariants`](#debuggablevariants) 配置来指示插件哪些变体是 **可调试** 的，如下所示：

```diff
apply plugin: "com.facebook.react"

react {
+ debuggableVariants = ["fullStaging", "fullDebug"]
}
```

这是必要的，因为插件将跳过所有 `debuggableVariants` 的 JS 捆绑：你需要运行 Metro 来运行它们。例如，如果你在 `debuggableVariants` 中列出 `fullStaging`，则无法将其发布到商店，因为它将缺少捆绑包。

## 插件在幕后做什么？

React Native Gradle Plugin 负责配置你的应用构建，以将 React Native 应用发布到生产环境中。插件还用于在第三方库中运行用于新架构的 [Codegen](/docs/the-new-architecture/pillars-codegen)。

以下是插件的责任总结：

- 为每个非可调试变体添加一个 `createBundle<Variant>JsAndAssets` 任务，负责调用 `bundle`、`hermesc` 和 `compose-source-map` 命令。
- 设置 `com.facebook.react:react-android` 和 `com.facebook.react:hermes-android` 的适当版本，从 `react-native` 的 `package.json` 中读取 React Native 版本。
- 设置适当的 Maven 仓库（Maven Central、Google Maven Repo、JSC 本地 Maven 仓库等），以使用所有必要的 Maven 依赖项。
- 设置 NDK，以便你可以构建使用新架构的应用。
- 设置 `buildConfigFields`，以便你可以在运行时知道是否启用了 Hermes 或新架构。
- 设置 Metro DevServer 端口作为 Android 资源，以便应用知道连接到哪个端口。
- 如果库或应用使用新架构的 Codegen，则调用 [React Native Codegen](/docs/the-new-architecture/pillars-codegen)。
