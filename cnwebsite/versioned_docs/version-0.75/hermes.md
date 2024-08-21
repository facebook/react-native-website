---
id: hermes
title: 使用新的 Hermes 引擎
---

<a href="https://hermesengine.dev">
  <img width={300} height={300} className="hermes-logo" src="/docs/assets/HermesLogo.svg" style={{height: "auto"}}/>
</a>

[Hermes](https://hermesengine.dev) 是专门针对 React Native 应用而优化的全新开源 JavaScript 引擎。对于很多应用来说，启用 Hermes 引擎可以优化启动时间，减少内存占用以及空间占用。从 React Native 0.70 版本开始 Hermes 已经默认启用，无需开发者再做任何配置。

## Bundled Hermes

React Native 自带一个**捆绑版本**的 Hermes。
每当我们发布新版本的 React Native 时，我们都会为您构建一个 Hermes 版本。这将确保您使用的 Hermes 版本与您使用的 React Native 版本完全兼容。

历史上，我们在将 Hermes 版本与 React Native 版本匹配方面遇到了问题。这完全消除了这个问题，并为用户提供了与特定 React Native 版本兼容的 JS 引擎。

这个改变对 React Native 的用户来说是完全透明的。您仍然可以使用本页描述的命令禁用 Hermes。
您可以[在此页面上阅读更多有关技术实现的信息](/architecture/bundled-hermes)。

## 确认 Hermes 引擎是否启用

如果您最近从头开始创建了一个新的应用程序，则可以在欢迎视图中查看是否启用了 Hermes：

![在AwesomeProject中查看JS引擎状态的位置](/docs/assets/HermesApp.jpg)

一个名为`HermesInternal`的全局变量将在 JavaScript 中可用，可用于验证是否正在使用 Hermes：

```jsx
const isHermes = () => !!global.HermesInternal;
```

:::caution 注意
如果您使用了某种非标准的 JS bundle 加载方式，则可能会出现虽然`HermesInternal`变量存在，但并没有启用高度优化的预编译字节码的情况。请确认您正在使用`.hbc`文件，并按照以下详细说明进行测试前/测试后的性能比较。
:::

要了解 Hermes 的优势，请尝试编译应用的正式发布版本来进行测评。例如：

```shell
$ npx react-native run-android --variant release

# or for iOS:
$ npx react-native run-ios --configuration Release
```

这将在构建时将 JavaScript 编译为字节码，从而提高应用程序在设备上的启动速度。

## 使用 Google Chrome 的 DevTools 来调试 Hermes 上的 JS

Hermes 通过实现 Chrome 检查器协议来支持 Chrome 调试器。这意味着 Chrome 的工具可以直接在模拟器或实际物理设备上调试 Hermes 上运行的 JavaScript 代码。

:::info 提示
请注意，这与[调试](debugging#debugging-using-a-custom-javascript-debugger)文档部分中记录的应用内开发人员菜单中的“Remote JS Debugging”非常不同，后者实际上通过您的开发电脑上的 Chrome 的 V8 引擎来运行 JS 代码。
:::

Chrome 通过 Metro 连接到设备上运行的 Hermes，因此您需要知道 Metro 正在侦听的位置。通常这将在`localhost:8081`上，但这是[可配置的](https://facebook.github.io/metro/docs/configuration)。运行`yarn start`时，地址将在启动时写入 stdout。

一旦您知道 Metro 服务器正在侦听的位置，就可以使用以下步骤使用 Chrome 进行连接：

1. 在 Chrome 浏览器中导航到 `chrome://inspect`。

2. 使用 `Configure...` 按钮添加 Metro 服务器地址（通常为 `localhost:8081`，如上所述）。

![Chrome DevTools 设备页面中的 Configure 按钮](/docs/assets/HermesDebugChromeConfig.png)

![添加 Chrome DevTools 网络目标的对话框](/docs/assets/HermesDebugChromeMetroAddress.png)

3. 现在您应该看到一个名为 "Hermes React Native" 的目标，带有一个 "inspect" 链接，可以用来打开调试器。如果您没有看到 "inspect" 链接，请确保 Metro 服务器正在运行。![目标 inspect 链接](/docs/assets/HermesDebugChromeInspect.png)

4. 现在您可以使用 Chrome 调试工具。例如，要在下次运行某些 JavaScript 时设置断点，请单击暂停按钮，并触发您的应用程序中会导致 JavaScript 执行的操作。![调试工具中的暂停按钮](/docs/assets/HermesDebugChromePause.png)

## 在较早版本的 React Native 上启用 Hermes 引擎

Hermes 从 React Native 0.70 版本开始默认启用。下面会介绍如何在较早版本的 React Native 上启用 Hermes 引擎。
首先请确保你运行的 React Native 版本在 0.60.4 或以上。

如果你现有的项目运行的是较老的版本，那么必须要先[升级](/docs/upgrading)。升级之后请先确保应用仍然能正常工作，再往下看如何切换到 Hermes 引擎。

:::caution 关于兼容性的注意事项
Hermes 的各个版本需要严格匹配 RN 的版本。请查看[Hermes 的发布日志](https://github.com/facebook/hermes/releases)来确定其兼容的版本。若版本不匹配会导致应用直接崩溃。
:::

:::caution 对于 Windows 用户的注意事项
Hermes 需要 [Microsoft Visual C++ 2015 Redistributable](https://www.microsoft.com/en-us/download/details.aspx?id=48145)
:::

### Android

编辑 `android/app/gradle.properties` 文件并修改`hermesEnabled`项为 true：

```diff
# 使用此属性启用或禁用 Hermes JS 引擎。
# 如果设置为false，则将使用 JSC引擎。
hermesEnabled=true
```

:::note 备注
此属性自 React Native 0.71 版本开始才支持，如果在`gradle.properties` 文件中找不到，请在网站顶部导航条选择你当前的 React Native 版本，切换到那个版本的文档查看相应的操作。
:::

如果你使用 ProGuard，那么需要在 `proguard-rules.pro` 文件中添加如下规则：

```
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

如果在这之前已经编译过应用，那么需要清理下编译缓存：

```shell
$ cd android && ./gradlew clean
```

这样就完成了，然后可以正常编译并继续开发和部署了：

```shell
$ npx react-native run-android
```

:::note 备注 关于 Android App Bundles 格式的支持
Android app bundles 格式从 react-native 0.62.0 版本开始支持。
:::

### iOS

从 React Native 0.64 版本开始， Hermes 也支持在 iOS 上运行（且能够正常上架）。编辑`ios/Podfile`文件并做如下修改：

```diff
   use_react_native!(
     :path => config[:reactNativePath],
     # to enable hermes on iOS, change `false` to `true` and then install pods
     # By default, Hermes is disabled on Old Architecture, and enabled on New Architecture.
     # You can enable/disable it manually by replacing `flags[:hermes_enabled]` with `true` or `false`.
-    :hermes_enabled => flags[:hermes_enabled],
+    :hermes_enabled => true
   )
```

默认情况下，如果您使用新架构，则将使用 Hermes。通过指定诸如`true`或`false`之类的值，您可以根据需要启用/禁用 Hermes。

配置完成后，您可以使用以下命令安装 Hermes pods：

```shell
$ cd ios && pod install
```

就这样！您现在可以像往常一样开发和部署您的应用程序了：

```shell
$ npx react-native run-ios
```

## 切换回 JavaScriptCore 引擎

React Native 也仍然支持使用 JavaScriptCore 作为[运行环境](javascript-environment)。请按以下说明进行切换。

### Android

编辑 `android/app/gradle.properties` 文件并修改`hermesEnabled`项为 false：

```diff
# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=false
```

### iOS

编辑您的 `ios/Podfile` 文件并进行如下所示的更改：

```diff
   use_react_native!(
     :path => config[:reactNativePath],
     # Hermes is now enabled by default. Disable by setting this flag to false.
     # Upcoming versions of React Native may rely on get_default_flags(), but
     # we make it explicit here to aid in the React Native upgrade process.
-    :hermes_enabled => flags[:hermes_enabled],
+    :hermes_enabled => false,
   )
```
