---
id: out-of-tree-platforms
title: 多平台支持
---

React Native不仅适用于 Android 和 iOS - 还有社区支持的项目将其应用于其他平台，例如：

- [React Native Windows](https://github.com/Microsoft/react-native-windows) - React Native 支持 Microsoft Universal Windows Platform (UWP) 和 Windows Presentation Foundation (WPF)
- [React Native DOM](https://github.com/vincentriemer/react-native-dom) - 一个实验性的、全面的 React Native 到 web 的端口。（不要与[React Native Web](https://github.com/necolas/react-native-web)混淆，两者目标不同）
- [React Native Desktop](https://github.com/status-im/react-native-desktop) - 一个旨在通过 Qt 的 QML 将 React Native 带到桌面的项目。[React Native Ubuntu](https://github.com/CanonicalLtd/react-native/)的一个分支，已不再维护。
- [React Native macOS](https://github.com/ptmt/react-native-macos) - 针对 macOS 和 Cocoa 的实验性 React Native 分支
- [React Native tvOS](https://github.com/react-native-community/react-native-tvos) - 为 Apple tvOS 适配 React Native
- [alita](https://github.com/areslabs/alita) - 一个实验性的、综合性的 React Native 到微信小程序的端口
- [Proton Native](https://github.com/kusti8/proton-native) - React Native 的封装器，使用 Qt 面向 Linux、MacOS 和 Windows

## 创建你自己的 React Native 平台

目前，从头开始创建 React Native 平台的过程并没有很好的记录——即将到来的全新架构（[Fabric](https://facebook.github.io/react-native/blog/2018/06/14/state-of-react-native-2018)）的目标之一是使平台的维护更容易。

### 打包

从 React Native 0.57 开始，你现在可以使用 React Native 的 JavaScript 打包器[Metro](https://facebook.github.io/metro/)注册你的 React Native 平台。这意味着你可以将`--platform example`传递给`npx react-native bundle`，它会查找带有`.example.js`后缀的 JavaScript 文件。

要将你的平台注册到 RNPM，模块名称必须与以下模式之一匹配：

- `react-native-example` - 它会搜索所有以`react-native-`开头的顶级模块
- `@org/react-native-example` - 它会在所有范围内搜索以`react-native-`开头的模块
- `@react-native-example/module` - 它会在名称以`@react-native-`开头的范围内搜索所有模块

你还必须在`package.json`中设置一些内容，如下所示：

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

`"providesModuleNodeModules"`是一组将被添加到 Haste 模块搜索路径的模块，`"platforms"`则是一组将作为有效平台添加的平台后缀。
