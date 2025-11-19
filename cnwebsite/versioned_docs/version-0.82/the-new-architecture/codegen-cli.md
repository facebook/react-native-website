# Codegen CLI

调用 Gradle 或手动调用脚本可能很难记住，并且需要大量的仪式。

为了简化它，我们创建了一个可以帮助您运行这些任务的 CLI 工具：**Codegen** cli。此命令为您的项目运行 [@react-native/codegen](https://www.npmjs.com/package/@react-native/codegen)。可用选项如下：

```sh
npx @react-native-community/cli codegen --help
Usage: rnc-cli codegen [options]

Options:
  --verbose            Increase logging verbosity
  --path <path>        Path to the React Native project root. (default: "/Users/MyUsername/projects/my-app")
  --platform <string>  Target platform. Supported values: "android", "ios", "all". (default: "all")
  --outputPath <path>  Path where generated artifacts will be output to.
  -h, --help           display help for command
```

## 示例

- 从当前工作目录读取 `package.json`，根据其 codegenConfig 生成代码。

```shell
npx @react-native-community/cli codegen
```

- 从当前工作目录读取 `package.json`，在 codegenConfig 中定义的位置生成 iOS 代码。

```shell
npx @react-native-community/cli codegen --platform ios
```

- 从 `third-party/some-library` 读取 `package.json`，在 `third-party/some-library/android/generated` 中生成 Android 代码。

```shell
npx @react-native-community/cli codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## 将生成的代码包含到库中

Codegen CLI 是库开发者的绝佳工具。它可用于快速查看生成的代码，以了解您需要实现哪些接口。

通常，生成的代码不包含在库中，使用该库的应用负责在构建时运行 Codegen。
这对大多数情况都是一个很好的设置，但 Codegen 还提供了一种机制，通过 `includesGeneratedCode` 属性将生成的代码包含在库本身中。

重要的是要了解使用 `includesGeneratedCode = true` 的含义。包含生成的代码有几个好处，例如：

- 无需依赖应用为您运行 **Codegen**，生成的代码始终存在。
- 实现文件始终与生成的接口一致（这使您的库代码对 codegen 中的 API 更改更具弹性）。
- 无需包含两组文件以在 Android 上支持两种架构。您只能保留新架构，并且保证向后兼容。
- 由于所有原生代码都在那里，因此可以将库的原生部分作为预构建版本发送。

另一方面，您还需要注意一个缺点：

- 生成的代码将使用库中定义的 React Native 版本。因此，如果您的库随 React Native 0.76 一起发布，则生成的代码将基于该版本。这可能意味着生成的代码与使用**之前** React Native 版本的应用不兼容（例如，运行在 React Native 0.75 上的应用）。

## 启用 `includesGeneratedCode`

要启用此设置：

- 将 `includesGeneratedCode` 属性添加到库的 `package.json` 文件中的 `codegenConfig` 字段中。将其值设置为 `true`。
- 使用 codegen CLI 在本地运行 **Codegen**。
- 更新您的 `package.json` 以包含生成的代码。
- 更新您的 `podspec` 以包含生成的代码。
- 更新您的 `build.Gradle` 文件以包含生成的代码。
- 在 `react-native.config.js` 中更新 `cmakeListsPath`，以便 Gradle 不在构建目录中查找 CMakeLists 文件，而是在您的 outputDir 中查找。
