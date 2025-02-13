# Codegen 命令行工具

调用 Gradle 或手动调用脚本可能很难记住，并且需要很多步骤。  

为了简化这个过程，我们创建了一个 CLI 工具，可以帮助你运行这些任务：**Codegen** 命令行工具。

```shell
npx react-native codegen [--path path] [--platform string] [--outputPath path]
```

此命令运行 [react-native-codegen](https://www.npmjs.com/package/react-native-codegen) 用于你的项目。以下选项可用：

- `--path` - `package.json` 的路径。默认路径是当前工作目录。
- `--platform` - 目标平台。支持的值：`android`, `ios`, `all`。默认值是 `all`。
- `--outputPath` - 输出路径。默认值是 `codegenConfig.outputDir` 中定义的值。

## 示例

- 从当前工作目录读取 `package.json`，根据其 `codegenConfig` 生成代码。

```shell
npx react-native codegen
```

- 从当前工作目录读取 `package.json`，根据其 `codegenConfig` 生成 iOS 代码。

```shell
npx react-native codegen --platform ios
```

- 从 `third-party/some-library` 读取 `package.json`，生成 Android 代码到 `third-party/some-library/android/generated`。

```shell
npx react-native codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## 将生成的代码包含到库中

**Codegen** 命令行工具对库开发者非常有用。它可以用于查看生成的代码，以了解需要实现哪些接口。或者，如果你希望在库中生成代码，也可以使用它。

此设置有几个好处：

- 不需要依赖应用来运行 **Codegen** 为你生成代码，生成的代码总是存在。
- 实现文件总是与生成的接口一致。
- 不需要包含两组文件来支持 Android 上的两种架构。你只需要保留新架构的文件，并保证它是向后兼容的。
- 不需要担心 **Codegen** 版本不匹配的问题，应用使用什么版本，生成的代码就使用什么版本。
- 由于所有原生代码都存在，可以将库的原生部分作为预构建的一部分来发布。

要启用此设置：

- 将 `includesGeneratedCode` 属性添加到库的 `package.json` 文件中的 `codegenConfig` 字段。将其值设置为 `true`。
- 运行 **Codegen** 本地使用 codegen CLI。
- 更新你的 `package.json` 以包含生成的代码。
- 更新你的 `podspec` 以包含生成的代码。
- 更新你的 `build.Gradle` 文件以包含生成的代码。
- 更新 `react-native.config.js` 中的 `cmakeListsPath`，以便 Gradle 不会在构建目录中查找 CMakeLists 文件，而是查找输出目录。
