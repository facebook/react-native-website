# 什么是 Codegen？

**Codegen** 是一个避免编写大量重复代码的工具。使用 **Codegen** 并不是必须的：您可以手动编写所有生成的代码。然而，**Codegen** 生成的脚手架代码可以节省您很多时间。

React Native 会在每次构建 iOS 或 Android 应用时自动调用 **Codegen**。偶尔，您可能需要手动运行 **Codegen** 脚本来了解实际生成的类型和文件：这在开发 Turbo Native Modules 和 Fabric Native Components 时很常见。

## Codegen 是如何工作的

**Codegen** 是一个与 React Native 应用紧密耦合的工具。**Codegen** 脚本位于 `react-native` NPM 包中，并在构建时调用这些脚本。

**Codegen** 会遍历您项目中的文件夹，从 `package.json` 中指定的目录开始，寻找包含特定 API 规范（或规范）的 JS 文件。规范文件是用一种类型化方言编写的 JS 文件：React Native 目前支持 Flow 和 TypeScript。

每当 **Codegen** 找到规范文件时，它会生成与该文件关联的脚手架代码。**Codegen** 会生成一些 C++ 粘合代码，然后生成特定于平台的代码，使用 Java 为 Android 生成代码，使用 Objective-C++ 为 iOS 生成代码。
