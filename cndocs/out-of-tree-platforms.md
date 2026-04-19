---
id: out-of-tree-platforms
title: 多平台支持
---

React Native 不仅适用于 Android 和 iOS 设备——我们的合作伙伴和社区还维护着一些将 React Native 带到其他平台的项目，例如：

**合作伙伴项目**

- [React Native macOS](https://github.com/microsoft/react-native-macos) - 面向 macOS 和 Cocoa 的 React Native。
- [React Native Windows](https://github.com/microsoft/react-native-windows) - 面向 Microsoft Universal Windows Platform (UWP) 的 React Native。
- [React Native visionOS](https://github.com/callstack/react-native-visionos) - 面向 Apple visionOS 的 React Native。

**社区项目**

- [React Native tvOS](https://github.com/react-native-tvos/react-native-tvos) - 面向 Apple TV 和 Android TV 设备的 React Native。
- [React Native Web](https://github.com/necolas/react-native-web) - 基于 React DOM 在 Web 上运行 React Native。
- [React Native Skia](https://github.com/react-native-skia/react-native-skia) - 使用 [Skia](https://skia.org/) 作为渲染器的 React Native。目前支持 Linux 和 macOS。

## 创建你自己的 React Native 平台

目前，从零开始创建一个 React Native 平台的过程还没有非常完善的文档——新的架构（[Fabric](/blog/2018/06/14/state-of-react-native-2018)）旨在让平台维护更容易。

### 打包

自 React Native 0.57 起已支持通过 [Metro](https://metrobundler.dev/) 注册自定义平台。这意味着你可以向 `npx react-native bundle` 传递 `--platform example`，它就会查找带有 `.example.js` 后缀的 JavaScript 文件。

要将你的平台注册到 RNPM，模块名称必须匹配以下模式之一：

- `react-native-example` - 它会搜索所有以 `react-native-` 开头的顶级模块
- `@org/react-native-example` - 它会搜索任意 scope 下以 `react-native-` 开头的模块
- `@react-native-example/module` - 它会搜索所有位于名称以 `@react-native-` 开头的 scope 下的模块

你还需要在 `package.json` 中添加如下配置：

```json
{
  "rnpm": {
    "haste": {
      "providesModuleNodeModules": ["react-native-example"],
      "platforms": ["example"]
    }
  }
}
```

`"providesModuleNodeModules"` 是一个数组，其中的模块会被加入 Haste 模块搜索路径；`"platforms"` 也是一个数组，其中的平台后缀会被添加为有效平台。