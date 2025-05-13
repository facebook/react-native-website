---
id: typescript
title: 使用 TypeScript
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[TypeScript][ts] 是一种通过添加类型定义来扩展 JavaScript 的语言。新的 React Native 项目默认以 TypeScript 为目标，同时也支持 JavaScript 和 Flow。

## 使用 TypeScript 开始新项目

由 [React Native CLI](/docs/environment-setup#creating-a-new-application) 创建的新项目或使用 [Ignite][ignite] 等流行模板将默认使用 TypeScript。

TypeScript 也可以与 [Expo][expo] 一起使用，Expo 维护 TypeScript 模板，或者当向项目添加 `.ts` 或 `.tsx` 文件时，Expo 将提示您自动安装和配置 TypeScript。

```shell
npx create-expo-app --template
```

## 在已有的项目中添加 TypeScript

1. 将 TypeScript，类型文件，以及 ESLint 插件等依赖添加到项目中。

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -D @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript
```

</TabItem>
</Tabs>

:::note
该命令添加了每个依赖项的最新版本。版本可能需要更改，以匹配项目使用的现有软件包。您可以使用类似 [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) 的工具查看 React Native 提供的版本。
:::

2. 添加一个 TypeScript 配置文件。在项目的根目录中创建一个`tsconfig.json`：

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json"
}
```

3. 将 JavaScript 文件重命名为`* .tsx`:

> 请保留`./index.js`入口文件，否则可能将在打包生产版本时遇到问题。

4. 运行 `tsc` 对 TypeScript 文件进行类型检查。

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npx tsc
```

</TabItem>
<TabItem value="yarn">

```shell
yarn tsc
```

</TabItem>
</Tabs>

## 使用 JavaScript 而非 TypeScript

React Native 将新应用默认设置为 TypeScript，但仍可使用 JavaScript。具有 `.jsx` 或 `.js` 扩展名的文件将被视为 JavaScript 而非 TypeScript，并且不会进行类型检查。TypeScript 模块仍可导入 JavaScript 模块，反之亦然。

## TypeScript 和 React Native 是如何工作的

无需额外配置，和非 TypeScript 的 React Native 项目一样都是直接通过 [Babel][babel] 将您的文件转换为 JavaScript。我们建议您只使用 TypeScript 编译器`tsc`的类型检查功能（而不是编译）。如果您有已经存在的 TypeScript 代码需要迁移到 React Native，这里有一些关于使用 Babel 而不是 TypeScript 编译器的[注意事项][babel-7-caveats]。

## 用 TypeScript 写 React Native 的示例

可以用`interface`来为 React 的函数组件编写[Props][props]的类型（使用`React.FC<Props>`）。这样在后续编码的过程中，编辑器就会根据这一类型来做类型检查并提供自动补全。

```tsx title="components/Hello.tsx"
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const Hello: React.FC<Props> = ({
  name,
  baseEnthusiasmLevel = 0,
}) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () =>
    setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
    );

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Hello;
```

你可以在[TypeScript playground][tsplay]中更深入地探索语法。

## 参考资料（英文）

- [TypeScript Handbook][ts-handbook]
- [React's documentation on TypeScript][react-ts]
- [React + TypeScript Cheatsheets][cheat]

## 在 TypeScript 中使用自定义路径别名

To use custom path aliases with TypeScript, you need to set the path aliases to work from both Babel and TypeScript. Here's how:

1. Edit your `tsconfig.json` to have your [custom path mappings][path-map]. Set anything in the root of `src` to be available with no preceding path reference, and allow any test file to be accessed by using `tests/File.tsx`:

```diff
{
-  "extends": "@tsconfig/react-native/tsconfig.json"
+  "extends": "@tsconfig/react-native/tsconfig.json",
+  "compilerOptions": {
+    "baseUrl": ".",
+    "paths": {
+      "*": ["src/*"],
+      "tests": ["tests/*"],
+      "@components/*": ["src/components/*"],
+    },
+  }
}
```

2. Add [`babel-plugin-module-resolver`][bpmr] as a development package to your project:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install --save-dev babel-plugin-module-resolver
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev babel-plugin-module-resolver
```

</TabItem>
</Tabs>

3. Finally, configure your `babel.config.js` (note that the syntax for your `babel.config.js` is different from your `tsconfig.json`):

```diff
{
   presets: ['module:metro-react-native-babel-preset'],
+  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           tests: ['./tests/'],
+           "@components": "./src/components",
+         }
+       }
+    ]
+  ]
}
```

[react-ts]: https://zh-hans.reactjs.org/docs/static-type-checking.html#typescript
[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: javascript-environment#javascript-syntax-transformers
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheat]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: http://www.typescriptlang.org/docs/home.html
[props]: props
[state]: state
[path-map]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[bpmr]: https://github.com/tleunen/babel-plugin-module-resolver
[expo]: https://expo.io
[ignite]: https://infinite.red/ignite
[tsplay]: https://www.typescriptlang.org/play/?strictNullChecks=false&esModuleInterop=true&jsx=3#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKFEljgG8AhAVxhggDsAaOAZRgCeAGyS8AFkiQweAFSQAPaXABqwJAHcAvnGy4CRdDAC0HFDGAA3JGSpUFteMA4wkUTOiRwACjjABnBio4YLhTECQALjg-GCgnAHMKShC4JGcxZj9gFD8QABkkKyEAfiiOZhAAI1ckzVtKNE4YuAAJJCEhCCjkQwA6ADEAYQAeHwh-AD44AF44AAowXz8AShmp+iCQxo5mgG00mAysnPzC9p4-KQBRdMzs3IKigF0ZxGIYXszRGDMkBaXegcjvdTkVlklNsFts1OABJDhoIjhZyvOaraZTS4wG6HO4nR7tOZzIF4h5nIRwAA+lLgAAZVgBqOAARnBkLg0PgnAAIkhEUhkfBZmi1tFrrdjmSikSSZLQe0qTT6XAjCy2ZR2Zy4PFrvI0EIUCAzMBOABZFBQADWAWF5RAgzEFr8ZQq1Sg6KmAEEoFAUAI5naHU64EzWb0AFYQJxzfAAQnw6pSRBgzCgHHm7JSw1UGmighE03oMWESD8vRwEBgmgmmZCwzkijzJcLxZEZfiRCkCWrtZSwTaHQg9HwBDqyT7E-oi3GZbCniZOuxeoNRvMZot1uJEpBBIp1LpyzHE+CwwA9A2YDWNeOJ9m1OomwWi-nS71Kqx2Dsezfjyecw-WyQFsXzLd82E4b9fyzFhwI4XsoPMGACwAIiMZD4N-TgfFLPxCx5PkkQOI8oIndA0Bw4BKmAIRgEEPIUGqIRpmQgATAiBQOdCfxIqEIE6KBmKIFiuJ4uBTyvUSz3-K8MLrf9HyA58S1Aj8IIknjhhgz9ZInRCUIZETRJCLCiD8XD6DhBFCOcYijLgMiKKomi6IY9pmKcflBUMuzGn45jKiEZgkG8qDxJ0uApPvdTb1PaT4MijRorgRMQjHMcqFPU8FL8KgtUAm0+BfcRJA+flfjmDYfwrGAokq38UBo+IOFhFwQGdAhyOcVx8C4eCGuAJreHaTAonwTqXCgHr2U0XqfzAz92rqidMBEeRuWAIgMBNDhRpwdQpu4kIQCcNoBrEGq4AAdlpWb6sa5rWva-AYmTNAxAOu6Bo4IahBGjqDm627j0qaA2KgAB1YAWMOKIAFYgeCGb2XmzhavglaFCiZkEb7MAUBYliEmUVxzDQBqohu6acY7EqEjRw7eP40aAGIAE52Y+49ME4GBwaQM6LvwEGhBYznEdmzRwSAA
