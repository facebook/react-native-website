---
id: troubleshooting
title: 问题排查
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

以下是搭建 React Native 环境时可能遇到的一些常见问题。如果你遇到的问题不在此列，请尝试在 [GitHub 上搜索相关 issue](https://github.com/facebook/react-native/issues/)。

### 端口被占用

[Metro bundler][metro] 运行在 8081 端口。如果该端口已被其他进程占用，你可以终止该进程，或者更改 bundler 使用的端口。

#### 终止占用 8081 端口的进程

执行以下命令查找占用 8081 端口的进程 ID：

```shell
sudo lsof -i :8081
```

然后执行以下命令终止该进程：

```shell
kill -9 <PID>
```

在 Windows 上，你可以使用[资源监视器](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows)找到占用 8081 端口的进程，然后通过任务管理器终止它。

#### 使用其他端口

你可以通过 `port` 参数配置 bundler 使用其他端口，在项目根目录下执行：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start -- --port=8088
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start --port 8088
```

</TabItem>
</Tabs>

你还需要更新应用，使其从新端口加载 JavaScript bundle。如果使用 Xcode 在真机上运行，可以在 `ios/__App_Name__.xcodeproj/project.pbxproj` 文件中将 `8081` 替换为你选择的端口号。

### NPM 锁定错误

如果在使用 React Native CLI 时遇到 `npm WARN locking Error: EACCES` 错误，请尝试执行以下命令：

```shell
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### 缺少 React 依赖库

如果你是手动将 React Native 添加到项目中的，请确保包含了所有使用到的相关依赖，如 `RCTText.xcodeproj`、`RCTImage.xcodeproj` 等。接下来，这些依赖生成的二进制文件需要链接到你的应用二进制文件。请使用 Xcode 项目设置中的 `Linked Frameworks and Binaries` 部分。更详细的步骤请参阅[链接原生库](linking-libraries-ios.md#content)。

如果你使用 CocoaPods，请确认在 `Podfile` 中添加了 React 及相关子规范（subspecs）。例如，如果你使用了 `<Text />`、`<Image />` 和 `fetch()` API，需要在 `Podfile` 中添加以下内容：

```
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

然后确保执行了 `pod install`，并且项目中已创建包含 React 的 `Pods/` 目录。CocoaPods 会提示你使用生成的 `.xcworkspace` 文件来使用这些已安装的依赖。

#### 作为 CocoaPod 使用时 React Native 编译失败

有一个名为 [cocoapods-fix-react-native](https://github.com/orta/cocoapods-fix-react-native) 的 CocoaPods 插件，可以处理使用依赖管理器时可能出现的源代码差异问题。

#### Argument list too long: recursive header expansion failed

在项目的构建设置中，`User Search Header Paths` 和 `Header Search Paths` 是两个用于指定 Xcode 查找代码中 `#import` 头文件位置的配置项。对于 Pods，CocoaPods 使用默认的特定文件夹数组来查找。请确保这些配置没有被覆盖，且配置的文件夹不会过大。如果某个文件夹非常大，Xcode 会尝试递归搜索整个目录并在某个时刻抛出上述错误。

要将 `User Search Header Paths` 和 `Header Search Paths` 构建设置恢复为 CocoaPods 设置的默认值，请在 Build Settings 面板中选中对应条目，然后按 Delete 键。这将移除自定义覆盖并恢复为 CocoaPods 的默认值。

### 无可用传输层

React Native 实现了 WebSocket 的 polyfill。这些 [polyfill](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js) 会在你通过 `import React from 'react'` 引入 react-native 模块时初始化。如果你加载了其他需要 WebSocket 的模块（如 [Firebase](https://github.com/facebook/react-native/issues/3645)），请确保在 react-native 之后加载/引入：

```
import React from 'react';
import Firebase from 'firebase';
```

## Shell Command Unresponsive 异常

如果遇到 ShellCommandUnresponsiveException 异常，例如：

```
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

请在终端中执行以下命令重启 ADB 服务器：

```
adb kill-server
adb start-server
```

## 无法启动 react-native package manager（Linux）

### 情况 1：错误 "code":"ENOSPC","errno":"ENOSPC"

此问题由 [inotify](https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers)（watchman 在 Linux 上使用）可监控的目录数量限制导致。要解决此问题，请在终端中执行以下命令：

```shell
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### 错误：spawnSync ./gradlew EACCES

如果在 macOS 上执行 `npm run android` 或 `yarn android` 时遇到上述错误，请尝试执行 `sudo chmod +x android/gradlew` 命令赋予 `gradlew` 文件可执行权限。

[metro]: https://metrobundler.dev/
