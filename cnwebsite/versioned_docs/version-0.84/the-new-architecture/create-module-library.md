# 为您的模块创建库

React Native 拥有丰富的库生态系统来解决常见问题。我们在 [reactnative.directory](https://reactnative.directory) 网站上收集 React Native 库，这是每个 React Native 开发者都值得收藏的绝佳资源。

有时，您可能正在开发一个值得提取为单独库以便代码重用的模块。这可以是您想在所有应用中重用的库，您想作为开源组件分发到生态系统的库，甚至是您想出售的库。

在本指南中，您将学习：

- 如何将模块提取到库中
- 如何使用 NPM 分发库

## 将模块提取到库中

您可以使用 [`create-react-native-library`](https://callstack.github.io/react-native-builder-bob/create) 工具创建新库。此工具设置了一个包含所有所需样板代码的新库：所有配置文件和各个平台所需的所有文件。它还带有一个不错的交互式菜单来指导您完成库的创建。

要将模块提取到单独的库中，您可以按照以下步骤操作：

1. 创建新库
2. 将代码从应用移动到库
3. 更新代码以反映新结构
4. 发布它。

### 1. 创建库

1. 通过运行命令开始创建过程：

```sh
npx create-react-native-library@latest <Name of Your Library>
```

2. 为您的模块添加名称。它必须是一个有效的 npm 名称，因此应该全部小写。您可以使用 `-` 来分隔单词。
3. 为包添加描述。
4. 继续填写表单，直到您到达问题 _"您想开发什么类型的库？"_
   ![什么类型的库](/docs/assets/what-library.png)
5. 为了本指南的目的，选择 _Turbo module_ 选项。请注意，您可以为新架构和旧架构创建库。
6. 然后，您可以选择是否想要一个访问平台的库（Kotlin 和 Objective-C）或共享的 C++ 库（Android 和 iOS 的 C++）。
7. 最后，选择 `Test App` 作为最后一个选项。此选项创建的库中已在库文件夹内配置了一个单独的应用。

一旦交互式提示完成，该工具会创建一个文件夹，其结构在 Visual Studio Code 中如下所示：

<img className="half-size" alt="初始化新库后的文件夹结构。" src="/docs/assets/turbo-native-modules/c++visualstudiocode.webp" />

随意探索为您创建的代码。但是，最重要的部分是：

- `android` 文件夹：这是 Android 代码所在的位置
- `cpp` 文件夹：这是 c++ 代码所在的位置
- `ios` 文件夹：这是 iOS 代码所在的位置
- `src` 文件夹：这是 JS 代码所在的位置。

`package.json` 已经配置了我们提供给 `create-react-native-library` 工具的所有信息，包括包的名称和描述。请注意，`package.json` 也已经配置为运行 Codegen。

```json
  "codegenConfig": {
    "name": "RN<your module name>Spec",
    "type": "all",
    "jsSrcsDir": "src",
    "outputDir": {
      "ios": "ios/generated",
      "android": "android/generated"
    },
    "android": {
      "javaPackageName": "com.<name-of-the-module>"
    }
  },
```

最后，该库已经包含了让库与 iOS 和 Android 链接的所有基础设施。

### 2. 从您的应用复制代码

本指南的其余部分假设您的应用中有一个本地 Turbo Native Module，按照网站中其他指南所示的指南创建：平台特定的 Turbo Native Modules，或[跨平台 Turbo Native Modules](./pure-cxx-modules)。但它也适用于组件和旧架构模块和组件。您需要调整需要复制和更新的文件。

<!-- TODO: add links for Turbo Native Modules -->

1. **[旧架构模块和组件不需要]** 将应用中 `specs` 文件夹中的代码移动到 `create-react-native-library` 文件夹创建的 `src` 文件夹中。
2. 更新 `index.ts` 文件以正确导出 Turbo Native Module 规范，使其可从库访问。例如：

```ts
import NativeSampleModule from './NativeSampleModule';

export default NativeSampleModule;
```

3. 复制原生模块：
   - 如果有的话，用您在应用中为原生模块编写的代码替换 `android/src/main/java/com/<name-of-the-module>` 中的代码。
   - 如果有的话，用您在应用中为原生模块编写的代码替换 `ios` 文件夹中的代码。
   - 如果有的话，用您在应用中为原生模块编写的代码替换 `cpp` 文件夹中的代码。

4. **[旧架构模块和组件不需要]** 将所有从旧规范名称到新规范名称的引用更新，即库的 `package.json` 的 `codegenConfig` 字段中定义的名称。例如，如果在应用 `package.json` 中您将 `AppSpecs` 设置为 `codegenConfig.name`，而在库中它被称为 `RNNativeSampleModuleSpec`，则必须将每次出现的 `AppSpecs` 替换为 `RNNativeSampleModuleSpec`。

就是这样！您已将所有所需代码从应用中移出并放入单独的库中。

## 测试您的库

`create-react-native-library` 附带一个有用的示例应用程序，该应用程序已经配置为与库正常工作。这是测试它的好方法！

如果您查看 `example` 文件夹，您可以找到与您可以从 [`react-native-community/template`](https://github.com/react-native-community/template) 创建的新 React Native 应用程序相同的结构。

要测试您的库：

1. 导航到 `example` 文件夹。
2. 运行 `yarn install` 以安装所有依赖项。
3. 仅对于 iOS，您需要安装 CocoaPods：`cd ios && pod install`。
4. 从 `example` 文件夹使用 `yarn android` 构建并运行 Android。
5. 从 `example` 文件夹使用 `yarn ios` 构建并运行 iOS。

## 将您的库用作本地模块

在某些情况下，您可能希望将库作为应用的本地模块重用，而不将其发布到 NPM。

在这种情况下，您可能最终会遇到库作为应用的兄弟目录的场景。

```shell
Development
├── App
└── Library
```

您也可以在这种情况下使用 `create-react-native-library` 创建的库。

1. 通过导航到 `App` 文件夹并运行 `yarn add ../Library` 将库添加到您的应用。
2. 仅对于 iOS，导航到 `App/ios` 文件夹并运行 `bundle exec pod install` 以安装您的依赖项。
3. 更新 `App.tsx` 代码以导入库中的代码。例如：

```tsx
import NativeSampleModule from '../Library/src/index';
```

如果您现在运行您的应用，Metro 将找不到它需要提供给应用的 JS 文件。这是因为 metro 将从 `App` 文件夹开始运行，并且无法访问位于 `Library` 文件夹中的 JS 文件。要解决此问题，让我们按如下方式更新 `metro.config.js` 文件

```diff
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
+ const path = require('path');

- const config = {}
+ const config = {
+  // Make Metro able to resolve required external dependencies
+  watchFolders: [
+    path.resolve(__dirname, '../Library'),
+  ],
+  resolver: {
+    extraNodeModules: {
+      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
+    },
+  },
+};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

`watchFolders` 配置告诉 Metro 监视一些额外路径中的文件和更改，在这种情况下是 `../Library` 路径，其中包含您需要的 `src/index` 文件。
`resolver` 属性是为库提供应用使用的 React Native 代码所必需的。库可能会引用和导入来自 React Native 的代码：如果没有额外的解析器，库中的导入将失败。

此时，您可以像往常一样构建和运行您的应用：

- 从 `example` 文件夹使用 `yarn android` 构建并运行 Android。
- 从 `example` 文件夹使用 `yarn ios` 构建并运行 iOS。

## 在 NPM 上发布库

由于 `create-react-native-library`，在 NPM 上发布所有内容的设置已经就位。

1. 在您的模块中安装依赖项 `yarn install`。
2. 运行 `yarn prepare` 构建库。
3. 使用 `yarn release` 发布它。

一段时间后，您将在 NPM 上找到您的库。要验证这一点，请运行：

```bash
npm view <package.name>
```

其中 `package.name` 是您在库初始化期间在 `package.json` 文件中设置的 `name`。

现在，您可以通过运行以下命令在应用程序中安装该库：

```bash
yarn add <package.name>
```

:::note
仅对于 iOS，每当您安装带有一些原生代码的新模块时，您必须重新安装 CocoaPods，方法是运行 `bundle exec pod install`（推荐）或 `pod install`（如果您不使用 Ruby 的 Bundler，则不推荐）。
:::

恭喜！您发布了您的第一个 React Native 库。
