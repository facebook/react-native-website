---
id: turbo-native-modules-introduction
title: 'Turbo 原生模块介绍'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import {TurboNativeModulesAndroid, TurboNativeModulesIOS} from './\_turbo-native-modules-components';

# 原生模块

你的 React Native 应用代码可能需要与 React Native 或现有库未提供的原生平台 API 进行交互。你可以使用 **Turbo 原生模块** 自己编写集成代码。本指南将向你展示如何编写一个。

基本步骤如下：

1. **定义一个类型化的 JavaScript 规范**，使用最流行的 JavaScript 类型注解语言之一：Flow 或 TypeScript；
2. **配置你的依赖管理工具以运行 Codegen**，将规范转换为原生语言接口；
3. **编写你的应用代码**，使用你的规范；
4. **编写你的原生平台代码**，使用生成的接口，将你的原生代码连接到 React Native 运行时环境。

让我们通过构建一个示例 Turbo 原生模块来逐步完成这些步骤。本指南的其余部分假设你已经使用以下命令创建了应用：

```shell
npx @react-native-community/cli init TurboModuleExample --version 0.76.0
```

## 本地持久存储

本指南将向你展示如何编写一个 [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev) 的实现：`localStorage`。该 API 与可能正在你的项目中编写应用代码的 React 开发者相关。

要在移动设备上实现此功能，我们需要使用 Android 和 iOS 的原生API：

- Android: [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences), 和
- iOS: [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults).

### 1. 声明类型化的规范

React Native 提供了一个名为 [Codegen](/the-new-architecture/what-is-codegen.md) 的工具，它接受用 TypeScript 或 Flow 编写的规范，并为 Android 和 iOS 生成平台特定的代码。规范声明了将在你的原生代码和 React Native JavaScript 运行时之间传递的方法和数据类型。一个 Turbo 原生模块既是你的规范，也是你编写的原生代码，以及从你的规范生成的 Codegen 接口。

要创建一个规范文件：

1. 在你的应用的根文件夹中创建一个名为 `specs` 的新文件夹。
2. 创建一个名为 `NativeLocalStorage.ts` 的新文件。

:::info
你可以在 [附录](/appendix.md) 文档中看到可以在规范中使用的类型以及生成的原生类型。
:::

以下是一个 `localStorage` 规范的实现：

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="specs/NativeLocalStorage.ts"
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
) as Spec;
```

</TabItem>
<TabItem value="flow">

```flow title="NativeLocalStorage.js"
import type {TurboModule} from 'react-native';
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
}
```

</TabItem>
</Tabs>

### 2. 配置 Codegen 运行

规范用于 React Native Codegen 工具生成平台特定的接口和样板代码。为此，Codegen 需要知道在哪里找到我们的规范以及如何处理它。更新你的 `package.json` 以包含：

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "NativeLocalStorageSpec",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.nativelocalstorage"
     }
   },
   // highlight-add-end
   "dependencies": {
```

准备好 Codegen 后，我们需要准备我们的原生代码以连接到生成的代码。

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
Codegen 通过 `generateCodegenArtifactsFromSchema` Gradle 任务执行：

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

这是在你构建 Android 应用时自动运行的。
</TabItem>
<TabItem value="ios" label="iOS">
Codegen 作为 CocoaPods 生成的项目中自动添加的脚本阶段的一部分运行。

```bash
cd ios
bundle install
bundle exec pod install
```

输出将如下所示：

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

</TabItem>
</Tabs>

### 3. 使用 Turbo 原生模块编写应用代码

使用 `NativeLocalStorage`，以下是一个修改后的 `App.tsx`，它包含一些需要持久化的文本、一个输入字段和一些按钮来更新此值。

`TurboModuleRegistry` 支持两种检索 Turbo 原生模块的模式：

- `get<T>(name: string): T | null` 如果 Turbo 原生模块不可用，将返回 `null`。
- `getEnforcing<T>(name: string): T` 如果 Turbo 原生模块不可用，将抛出异常。假设模块总是可用。

```tsx title="App.tsx"
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem(editingValue ?? EMPTY);
    setValue('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
```

### 4. 编写你的原生平台代码

准备好所有内容后，我们将开始编写原生平台代码。我们分两部分进行：

:::note
本指南展示了如何创建一个仅适用于新架构的 Turbo 原生模块。如果你需要同时支持新架构和旧架构，请参考我们的 [向后兼容指南](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md)。
:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <TurboNativeModulesAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <TurboNativeModulesIOS/>
    </TabItem>
</Tabs>
