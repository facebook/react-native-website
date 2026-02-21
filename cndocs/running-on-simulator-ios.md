---
id: running-on-simulator-ios
title: 在 iOS 模拟器上运行
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 启动模拟器

当你完成了 React Native 项目的初始化后，可以在新建的项目目录中运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

如果一切配置都正确，你应该很快就能看到你的应用在 iOS 模拟器中运行起来。

## 指定模拟的设备类型

你可以使用 `--simulator` 参数，在其后加上要使用的设备名称（字符串形式）来指定要模拟的设备。默认设备为 `"iPhone 14"`。如果你想在 iPhone SE（第三代）上运行应用，可以运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone SE (3rd generation)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone SE (3rd generation)"
```

</TabItem>
</Tabs>

设备名称对应于 Xcode 中可用的设备列表。你可以在终端中运行 `xcrun simctl list devices` 来查看可用的设备名称。

### 指定设备版本

如果你安装了多个 iOS 版本，还需要指定对应的版本。例如，要在 iPhone 14 Pro (16.0) 上运行应用，可以运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

</TabItem>
</Tabs>

## 指定 UDID

你可以指定从 `xcrun simctl list devices` 命令返回的设备 UDID。例如，要使用 UDID 为 `AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA` 的设备运行应用，可以运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
</Tabs>
