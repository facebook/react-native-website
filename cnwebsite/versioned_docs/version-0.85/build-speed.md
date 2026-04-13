---
id: build-speed
title: 优化编译速度
---

构建 React Native 应用程序可能**昂贵**并且需要开发人员花费几分钟的时间。
随着您的项目不断增长，并且通常在拥有多个 React Native 开发人员的大型组织中，这可能会出现问题。

为了减轻这种性能影响，本页面分享了一些关于如何**缩短构建时间**的建议。

：：：信息

请注意，这些建议是高级功能，需要对本机构建工具的工作方式有一定的了解。

:::

## 在开发过程中仅构建一个 ABI（仅限 Android）

在本地构建 Android 应用程序时，默认情况下会构建所有 4 个 [应用程序二进制接口 (ABI)](https://developer.android.com/ndk/guides/abis)：`armeabi-v7a`、`arm64-v8a`、`x86` 和 `x86_64`。

但是，如果您在本地构建并测试模拟器或在物理设备上，则可能不需要构建所有这些。

这应该会将您的 **本机构建时间** 减少约 75%。

如果您使用的是 React Native CLI，则可以将 `--active-arch-only` 标志添加到 `run-android` 命令中。此标志将确保从正在运行的模拟器或插入的手机中获取正确的 ABI。为了确认这种方法工作正常，您将在控制台上看到一条类似“信息检测到的架构arm64-v8a”的消息。

```
$ yarn react-native run-android --active-arch-only

[ ... ]
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
Jetifier found 1037 file(s) to forward-jetify. Using 32 workers...
info JS server already running.
info Detected architectures arm64-v8a
info Installing the app...
```

该机制依赖于 `reactNativeArchitectures` Gradle 属性。

因此，如果您直接从命令行使用 Gradle 进行构建而不使用 CLI，则可以指定要构建的 ABI，如下所示：

```
$ ./gradlew :app:assembleDebug -PreactNativeArchitectures=x86,x86_64
```

如果您希望在 CI 上构建 Android 应用程序并使用矩阵来并行构建不同架构，这会很有用。

如果您愿意，您还可以使用项目的[顶级文件夹](https://github.com/facebook/react-native/blob/19cf70266eb8ca151aa0cc46ac4c09cb987b2ceb/template/android/gradle.properties#L30-L33)中的“gradle.properties”文件在本地覆盖此值：

```
# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

一旦您构建了应用程序的**发布版本**，请不要忘记删除这些标志，因为您想要构建适用于所有 ABI 而不仅仅是您在日常开发工作流程中使用的 ABI 的 apk/应用程序包。

## 启用配置缓存（仅限 Android）

从 React Native 0.79 开始，您还可以启用 Gradle 配置缓存。

当您使用“yarn android”运行 Android 构建时，您将执行由两个步骤组成的 Gradle 构建（[源](https://docs.gradle.org/current/userguide/build_lifecycle.html)）：

- 配置阶段，评估所有“.gradle”文件。
- 执行阶段，实际执行任务时编译 Java/Kotlin 代码等。

您现在将能够启用配置缓存，这将允许您在后续构建中跳过配置阶段。

当频繁更改本机代码时，这非常有用，因为它可以缩短构建时间。

例如，在这里您可以看到在本机代码发生更改后重建 RN-Tester 的重建速度有多快：

![gradle 配置缓存](/docs/assets/gradle-config-caching.gif)

您可以通过在“android/gradle.properties”文件中添加以下行来启用 Gradle 配置缓存：

```
org.gradle.configuration-cache=true
```

有关配置缓存的更多资源，请参阅 [Gradle 官方文档](https://docs.gradle.org/current/userguide/configuration_cache.html)。

## 使用 Maven 镜像（仅限 Android）

构建 Android 应用程序时，您的 Gradle 构建需要从 Maven Central 和互联网上的其他存储库下载必要的依赖项。

如果您的组织正在运行 Maven 存储库镜像，您应该考虑使用它，因为它将通过从镜像而不是从 Internet 下载工件来加快构建速度。

您可以通过在“android/gradle.properties”文件中指定“exclusiveEnterpriseRepository”属性来配置镜像：

```diff
# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

# Use this property to configure a Maven enterprise repository
# that will be used exclusively to fetch all of your dependencies.
+exclusiveEnterpriseRepository=https://my.internal.proxy.net/
```

通过设置此属性，您的构建将从您指定的存储库（而不是其他存储库）**独家**获取依赖项。

## 使用编译器缓存

如果您经常运行本机构建（C++ 或 Objective-C），您可能会受益于使用**编译器缓存**。

具体来说，您可以使用两种类型的缓存：本地编译器缓存和分布式编译器缓存。

### 本地缓存

:::信息
以下说明适用于 **Android 和 iOS**。
如果您只构建 Android 应用程序，那么您应该可以开始了。
如果您还构建 iOS 应用程序，请按照下面的 [Xcode 特定设置](#xcode-specific-setup) 部分中的说明进行操作。
:::

我们建议使用 [**ccache**](https://ccache.dev/) 来缓存本机构建的编译。
Ccache 的工作原理是包装 C++ 编译器、存储编译结果并跳过编译
如果最初存储的是中间编译结果。

大多数操作系统的包管理器中都提供了 Ccache。在 macOS 上，我们可以使用“brew install ccache”安装 ccache。
或者您可以按照[官方安装说明](https://github.com/ccache/ccache/blob/master/doc/install.md)从源安装。

然后，您可以进行两次干净的构建（例如，在 Android 上，您可以首先运行 `yarn react-native run-android`，删除 `android/app/build` 文件夹，然后再次运行第一个命令）。您会注意到第二个构建比第一个构建快得多（应该需要几秒钟而不是几分钟）。
在构建时，您可以验证“ccache”是否正常工作并检查缓存命中/未命中率“ccache -s”

```
$ ccache -s
Summary:
  Hits:             196 /  3068 (6.39 %)
    Direct:           0 /  3068 (0.00 %)
    Preprocessed:   196 /  3068 (6.39 %)
  Misses:          2872
    Direct:        3068
    Preprocessed:  2872
  Uncacheable:        1
Primary storage:
  Hits:             196 /  6136 (3.19 %)
  Misses:          5940
  Cache size (GB): 0.60 / 20.00 (3.00 %)
```

请注意，“ccache”聚合了所有构建的统计信息。您可以在构建之前使用“ccache --zero-stats”重置它们以验证缓存命中率。

如果您需要擦除缓存，可以使用“ccache --clear”来执行此操作

#### Xcode 特定设置

为了确保“ccache”在 iOS 和 Xcode 上正常工作，您需要在“ios/Podfile”中启用对 ccache 的 React Native 支持。

在编辑器中打开“ios/Podfile”并取消注释“ccache_enabled”行。

```ruby
  post_install do |installer|
    # https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
      # TODO: Uncomment the line below
      :ccache_enabled => true
    )
  end
```

#### 在 CI 上使用此方法

Ccache 在 macOS 上使用 `/Users/$USER/Library/Caches/ccache` 文件夹来存储缓存。
因此，您也可以在 CI 上保存和恢复相应的文件夹，以加快构建速度。

但是，有几点需要注意：

1. 在 CI 上，我们建议进行完全干净的构建，以避免缓存中毒问题。如果您遵循上一段中提到的方法，您应该能够在 4 个不同的 ABI 上并行化本机构建，并且您很可能不需要 CI 上的“ccache”。

2. `ccache` 依赖时间戳来计算缓存命中。这在 CI 上效果不佳，因为每次 CI 运行时都会重新下载文件。为了克服这个问题，您需要使用“compiler_check content”选项，该选项依赖于[散列文件内容](https://ccache.dev/manual/4.3.html)。

### 分布式缓存

与本地缓存类似，您可能需要考虑在本机构建中使用分布式缓存。
这对于经常进行本机构建的大型组织特别有用。

我们建议使用 [sccache](https://github.com/mozilla/sccache) 来实现此目的。
我们遵循 sccache [分布式编译快速入门](https://github.com/mozilla/sccache/blob/main/docs/DistributedQuickstart.md) 了解如何设置和使用此工具的说明。
