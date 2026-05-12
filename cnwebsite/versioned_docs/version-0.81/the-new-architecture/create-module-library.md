# 创建模块库

React Native 有一个丰富的生态系统库来解决常见问题。我们在 [reactnative.directory](https://reactnative.directory) 网站上收集 React Native 库，这是一个很好的资源，值得每个 React Native 开发者收藏。

有时，你可能会开发一个模块，希望将其提取到一个单独的库中以供代码重用。这可以是一个你希望在所有应用中重用的库，一个你希望作为开源组件分发到生态系统的库，甚至是一个你希望出售的库。

在本指南中，你将学习：

- 如何将模块提取到一个库中
- 如何使用 NPM 分发库

## 将模块提取到一个库中

你可以使用 [`create-react-native-library`](https://callstack.github.io/react-native-builder-bob/create) 工具来创建一个新库。该工具设置了一个新的库，其中包含所有需要的样板代码：所有配置文件和各种平台所需的文件。它还带有一个交互式菜单，引导你完成库的创建过程。

要提取模块到一个单独的库中，你可以按照以下步骤操作：

1. 创建新库
2. 将代码从应用移动到库
3. 更新代码以反映新的结构
4. 发布它。

### 1. 创建库

1. 通过运行以下命令开始创建过程：

```sh
npx create-react-native-library@latest <Name of Your Library>
```

2. 为你的模块添加一个名称。它必须是一个有效的 npm 名称，所以应该全部是小写的。你可以使用 `-` 来分隔单词。
3. 为包添加一个描述。
4. 继续填写表单，直到你到达问题 _"你想要开发什么类型的库？"_
   ![What type of Library](/docs/assets/what-library.png)
5. 为了本指南的目的，选择 _Turbo 模块_ 选项。注意你可以创建新架构和旧架构的库。
6. 然后，你可以选择你想要一个访问平台的库（Kotlin 和 Objective-C）还是一个共享的 C++ 库（Android 和 iOS 的 C++）。
7. 最后，选择 `Test App` 作为最后一个选项。此选项创建一个已经配置在库文件夹中的单独应用的库。

一旦交互提示完成，工具会创建一个文件夹，其结构如下：

<img class="half-size" alt="Folder structure after initializing a new library." src="/docs/assets/turbo-native-modules/c++visualstudiocode.webp" />

随意探索工具为你创建的代码。然而，最重要的部分是：

- `android` 文件夹：这是 Android 代码所在的位置
- `cpp` 文件夹：这是 C++ 代码所在的位置
- `ios` 文件夹：这是 iOS 代码所在的位置
- `src` 文件夹：这是 JS 代码所在的位置

`package.json` 已经配置了所有信息，包括包的名称和描述。注意 `package.json` 也已经配置为运行 codegen。

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

最后，库已经包含所有基础设施，以便库可以与 iOS 和 Android 链接。

### 2. 将代码从应用复制到库

本指南的其余部分假设你有一个本地 Turbo Native 模块在你的应用中，遵循网站上其他指南中的指南：平台特定的 Turbo Native 模块，或 [跨平台的 Turbo Native 模块](./pure-cxx-modules)。但它也适用于组件和旧架构的模块和组件。你需要复制和更新你需要的文件。

1. **[旧架构不需要这一步]** 将你在应用的 `specs` 文件夹中的代码移动到 `create-react-native-library` 创建的 `src` 文件夹中。
2. 更新 `index.ts` 文件以正确导出 Turbo Native 模块规范，以便可以从库中访问它。例如：

```ts
import NativeSampleModule from './NativeSampleModule';

export default NativeSampleModule;
```

3. 复制原生模块：
   - 用你在应用中为原生模块编写的代码替换 `android/src/main/java/com/<name-of-the-module>` 中的代码，如果有的话。
   - 用你在应用中为原生模块编写的代码替换 `ios` 文件夹中的代码，如果有的话。
   - 用你在应用中为原生模块编写的代码替换 `cpp` 文件夹中的代码，如果有的话。

4. **[旧架构不需要这一步]** 更新所有从旧规范名称到新规范名称的引用，新规范名称在库的 `package.json` 文件的 `codegenConfig` 字段中定义。例如，如果应用的 `package.json` 中设置 `AppSpecs` 为 `codegenConfig.name`，而在库中称为 `RNNativeSampleModuleSpec`，则必须将 `AppSpecs` 的所有出现替换为 `RNNativeSampleModuleSpec`。

这就完成了！你已经将所有需要的代码从应用移动到一个单独的库中。

## 测试你的库

`create-react-native-library` 带有一个有用的示例应用，已配置为与库正常工作。这是一个很好的测试方法！

如果你查看 `example` 文件夹，你会发现一个与 [`react-native-community/template`](https://github.com/react-native-community/template) 创建的新 React Native 应用相同的结构。

要测试你的库：

1. 导航到 `example` 文件夹。
2. 运行 `yarn install` 来安装所有依赖项。
3. 对于 iOS 来说，你需要安装 CocoaPods：`cd ios && pod install`。
4. 使用 `yarn android` 从 `example` 文件夹构建和运行 Android。
5. 使用 `yarn ios` 从 `example` 文件夹构建和运行 iOS。

## 将你的库作为本地模块使用。

在某些情况下，你可能希望将库作为本地模块重用于你的应用，而不将其发布到 NPM。

在这种情况下，你可能会遇到一个场景，即你的库作为应用的兄弟文件夹存在。

```shell
Development
├── App
└── Library
```

你也可以在这种情况中使用 `create-react-native-library` 创建的库。

1. 通过导航到 `App` 文件夹并运行 `yarn add ../Library` 将你的库添加到应用中。
2. 对于 iOS 来说，导航到 `App/ios` 文件夹并运行 `bundle exec pod install` 来安装你的依赖项。
3. 更新 `App.tsx` 代码以导入库中的代码。例如：

```tsx
import NativeSampleModule from '../Library/src/index';
```

如果你现在运行你的应用，Metro 将找不到它需要提供给应用的 JS 文件。这是因为 Metro 将从 `App` 文件夹开始运行，并且无法访问位于 `Library` 文件夹中的 JS 文件。要解决这个问题，让我们更新 `metro.config.js` 文件，如下所示：

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

`watchFolders` 配置告诉 Metro 监视一些附加路径中的文件和更改，在这种情况下是 `../Library` 路径，其中包含你需要 `src/index` 文件。`resolver` 属性是必需的，以便为库提供应用使用的 React Native 代码。库可能会引用并导入 React Native 代码：没有额外的解析器，库中的导入将失败。

此时，你可以像往常一样构建和运行你的应用：

- 使用 `yarn android` 从 `example` 文件夹构建和运行 Android。
- 使用 `yarn ios` 从 `example` 文件夹构建和运行 iOS。

## 在 NPM 上发布库

发布到 NPM 的设置已经到位，感谢 `create-react-native-library`。

1. 在你的模块中安装依赖项 `yarn install`。
2. 运行 `yarn prepare` 构建库。
3. 使用 `yarn release` 发布它。

稍等片刻，你会在 NPM 上找到你的库。要验证这一点，运行：

```bash
npm view <package.name>
```

其中 `package.name` 是你设置的 `name`，在库的 `package.json` 文件中。

现在，你可以通过运行以下命令在你的应用中安装库：

```bash
yarn add <package.name>
```

:::note
对于 iOS 来说，每当安装一个带有原生代码的新模块时，你必须重新安装 CocoaPods，通过运行 `bundle exec pod install`（推荐）或 `pod install`（不推荐）。
:::

恭喜！你发布了你的第一个 React Native 库。
