---
id: build-speed
title: 优化编译速度
---

构建 React Native 应用可能会非常**昂贵**，并且需要开发人员花费数分钟的时间。
随着项目规模的增长以及在拥有多个 React Native 开发人员的大型组织中，这可能成为一个问题。

为了减轻性能损失，本页面提供了一些建议来**改善您的构建时间**。

:::info
如果您注意到使用新架构在 Android 上构建时间较慢，请尽量升级 React Native 到最新版本。
:::

## 仅在开发过程中构建一个 ABI（仅适用于 Android）

在本地构建 Android 应用程序时，默认情况下会构建所有 4 个[应用程序二进制接口（ABIs）](https://developer.android.com/ndk/guides/abis)：`armeabi-v7a`，`arm64-v8a`，`x86`和 `x86_64`.

然而，如果您正在本地构建并测试模拟器或物理设备，则可能不需要构建所有这些 ABI。

这将减少约 75％的**原生编译时间**。

如果您使用 React Native CLI，请向 `run-android` 命令添加 `--active-arch-only` 标志。此标志将确保从运行的模拟器或插入的手机中选择正确的 ABI。要确认此方法是否正常工作，您将在控制台上看到类似于 `info Detected architectures arm64-v8a` 的消息。

```
$ yarn react-native run-android --active-arch-only

[ ... ]
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
Jetifier found 1037 file(s) to forward-jetify. Using 32 workers...
info JS server already running.
info Detected architectures arm64-v8a
info Installing the app...
```

这个机制依赖于`reactNativeArchitectures` Gradle 属性。

因此，如果你直接从命令行使用 Gradle 构建而不使用 CLI，你可以按照以下方式指定要构建的 ABI：

```
$ ./gradlew :app:assembleDebug -PreactNativeArchitectures=x86,x86_64
```

如果您希望在 CI 上构建 Android 应用程序并使用矩阵来并行化构建不同的架构，这将非常有用。

如果您愿意，您还可以在本地覆盖此值，在项目的[顶级文件夹](https://github.com/facebook/react-native/blob/19cf70266eb8ca151aa0cc46ac4c09cb987b2ceb/template/android/gradle.properties#L30-L33)中使用`gradle.properties`文件：

```
# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

一旦你构建了应用的**发布版本**，不要忘记移除这些标志，因为你希望构建一个适用于所有 ABI 而不仅仅是在日常开发流程中使用的那个的 apk/app bundle。

## 使用编译器缓存

如果您经常运行本地构建（无论是 C++ 还是 Objective-C），您可能会从使用**编译器缓存**中受益。

具体而言，您可以使用两种类型的缓存：本地编译器缓存和分布式编译器缓存。

### 本地缓存

:::info 提示  
以下说明适用于**Android 和 iOS**。
如果您只构建 Android 应用程序，那么您可以继续进行。
如果您还要构建 iOS 应用程序，请按照下面的[XCode 特定设置](#xcode-specific-setup)部分中的说明操作。
:::

我们建议使用[**ccache**](https://ccache.dev/)来缓存您的本地构建编译过程。
Ccache 通过包装 C++ 编译器，存储编译结果，并在原始存储了中间编译结果的情况下跳过编译。

要安装它，您可以按照[官方安装说明](https://github.com/ccache/ccache/blob/master/doc/INSTALL.md)进行操作。在 macOS 上，我们可以使用 `brew install ccache` 命令来安装 ccache。一旦安装完成，您可以按照以下步骤配置以缓存 NDK 的编译结果：

```
ln -s $(which ccache) /usr/local/bin/gcc
ln -s $(which ccache) /usr/local/bin/g++
ln -s $(which ccache) /usr/local/bin/cc
ln -s $(which ccache) /usr/local/bin/c++
ln -s $(which ccache) /usr/local/bin/clang
ln -s $(which ccache) /usr/local/bin/clang++
```

这将在`/usr/local/bin/`目录下创建名为`gcc`、`g++`等的符号链接，指向 `ccache`.

只要 `/usr/local/bin/` 在 `$PATH` 变量中位于 `/usr/bin/` 之前（这是默认设置），它就能正常工作。

您可以使用 `which` 命令验证其是否有效：

```
$ which gcc
/usr/local/bin/gcc
```

如果结果是 `/usr/local/bin/gcc`, 那么实际上您正在调用包装了 `gcc` 的 `ccache`.

:::caution 注意
请注意，这个`ccache`的设置将影响到您在计算机上运行的所有编译过程，不仅限于 React Native 相关的编译。使用时请自行承担风险。如果您无法安装/编译其他软件，可能是因为这个原因。如果是这种情况，您可以通过以下命令删除所创建的符号链接：

```
unlink /usr/local/bin/gcc
unlink /usr/local/bin/g++
unlink /usr/local/bin/cc
unlink /usr/local/bin/c++
unlink /usr/local/bin/clang
unlink /usr/local/bin/clang++
```

以恢复计算机到原始状态并使用默认编译器。
:::

然后你可以进行两次干净的构建（例如在 Android 上，你可以先运行`yarn react-native run-android`，删除`android/app/build`文件夹，然后再次运行第一个命令）。你会注意到第二次构建比第一次快得多（只需要几秒而不是几分钟）。
在构建过程中，你可以验证`ccache`是否正常工作，并检查缓存命中/未命中率 `ccache -s`

```
$ ccache -s
Summary:
  Hits:             196 /  3068 (6.39 %)
    Direct:           0 /  3068 (0.00 %)
    Preprocessed:   196 /  3068 (6.39 %)
  Misses:          2872
    Direct:        3068
    Preprocessed:  2872
Uncacheable:       	1
Primary storage:
Hits：             	196 /  	6136 （3.19%）
Misses：           	5940
Cache size (GB)：  	0.60 /  	20.00 （3.00%）
```

请注意，`ccache`将统计数据聚合到所有构建中。您可以使用 `ccache --zero-stats` 在构建之前重置它们以验证缓存命中率。

如果需要清除缓存，请使用 `ccache --clear`

#### XCode 特定设置

为了确保`ccache`在 iOS 和 XCode 中正常工作，您需要遵循一些额外的步骤：

1. 您必须修改 Xcode 和`xcodebuild`调用编译器命令的方式。默认情况下，它们使用*完全指定路径*来调用编译器二进制文件，因此不会使用安装在`/usr/local/bin`中的符号链接。您可以通过以下两种选项之一配置 Xcode 以使用相对名称来调用编译器：

- 如果您使用直接命令行，则可以在命令行上添加环境变量前缀： `CLANG=clang CLANGPLUSPLUS=clang++ LD=clang LDPLUSPLUS=clang++ xcodebuild <rest of xcodebuild command line>`
- 在您的 `ios/Podfile` 中添加一个 `post_install` 部分，在 `pod install` 步骤期间更改 Xcode 工作区中的编译器：

```ruby
  post_install do |installer|
    react_native_post_install(installer)

    # ...possibly other post_install items here

    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Using the un-qualified names means you can swap in different implementations, for example ccache
        config.build_settings["CC"] = "clang"
        config.build_settings["LD"] = "clang"
        config.build_settings["CXX"] = "clang++"
        config.build_settings["LDPLUSPLUS"] = "clang++"
      end
    end

    __apply_Xcode_12_5_M1_post_install_workaround(installer)
  end
```

2. 你需要一个 ccache 配置，允许一定程度的松散和缓存行为，以便在 Xcode 编译过程中注册缓存命中。如果通过环境变量进行配置，则与标准不同的 ccache 配置变量如下：

```bash
export CCACHE_SLOPPINESS=clang_index_store,file_stat_matches,include_file_ctime,include_file_mtime,ivfsoverlay,pch_defines,modules,system_headers,time_macros
export CCACHE_FILECLONE=true
export CCACHE_DEPEND=true
export CCACHE_INODECACHE=true
```

相同的设置也可以在`ccache.conf`文件或任何其他 ccache 提供的机制中进行配置。更多信息请参阅[官方 ccache 手册](https://ccache.dev/manual/4.3.html)。

#### 在 CI 上使用这种方法

Ccache 使用 macOS 上的 `/Users/$USER/Library/Caches/ccache` 文件夹来存储缓存。
因此，您可以在 CI 上保存和恢复相应的文件夹，以加快构建速度。

然而，有几点需要注意：

1. 在 CI 上，我们建议进行完全清理构建，以避免缓存污染问题。如果按照前面提到的方法进行操作，则应该能够将原生构建并行化为 4 种不同的 ABI，并且很可能不需要在 CI 上使用 `ccache`。

2. `ccache` 依赖于时间戳来计算缓存命中。这在 CI 上效果不佳，因为文件会在每次运行时重新下载。为了解决这个问题，您需要使用 `compiler_check content` 选项，该选项改用[对文件内容进行哈希](https://ccache.dev/manual/4.3.html)。

### 分布式缓存

与本地缓存类似，您可能希望考虑为原生构建使用分布式缓存。
这在频繁进行原生构建的大型组织中特别有用。

我们推荐使用[sccache](https://github.com/mozilla/sccache)来实现这一目标。
关于如何设置和使用该工具，请参阅 sccache 的[分布式编译快速入门指南](https://github.com/mozilla/sccache/blob/main/docs/DistributedQuickstart.md)。
