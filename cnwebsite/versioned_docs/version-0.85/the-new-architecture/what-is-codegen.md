# 什么是 Codegen？

**Codegen** 是一个避免编写大量重复代码的工具。使用 Codegen **不是强制性的**：您可以手动编写所有生成的代码。但是，Codegen 生成的脚手架代码可以为您节省大量时间。

每次构建 iOS 或 Android 应用时，React Native 都会自动调用 Codegen。有时，您可能希望手动运行 Codegen 脚本以了解实际生成了哪些类型和文件：这是开发 [Turbo Native Modules](/docs/turbo-native-modules-introduction) 和 Fabric Native Components 时的常见场景。

## Codegen 的工作原理

**Codegen** 是一个与 React Native 应用紧密耦合的过程。Codegen 脚本位于 `react-native` NPM 包中，应用在构建时调用这些脚本。

Codegen 会爬取项目中的文件夹，从您在 `package.json` 中指定的目录开始，查找包含自定义模块和组件规范（或 specs）的特定 JS 文件。规范文件是用类型化方言编写的 JS 文件：React Native 目前支持 Flow 和 TypeScript。

每次 Codegen 找到一个规范文件时，它都会生成与之关联的样板代码。Codegen 生成一些 C++ 粘合代码，然后生成特定于平台的代码，Android 使用 Java，iOS 使用 Objective-C++。
