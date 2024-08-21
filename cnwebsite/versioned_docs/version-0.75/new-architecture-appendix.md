---
id: new-architecture-appendix
title: Appendix
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';
import VerticalTable from '@site/core/VerticalTable';

<NewArchitectureWarning/>

## 一、术语

整个与新架构相关的指南将遵循以下**术语**：

- **传统原生组件** - 指运行在旧版 React Native 架构上的组件。
- **传统原生模块** - 指运行在旧版 React Native 架构上的模块。
- **Fabric 原生组件** - 指已经适配以与新架构（即新渲染器）良好协同工作的组件。为简洁起见，您可能会看到它们被称为**Fabric 组件**。
- **Turbo 原生模块** - 指已经适配以与新架构（即新原生模块系统）良好协同工作的模块。为简洁起见，您可能会看到它们被称为**Turbo 模块**。

## II. Flow 类型到原生类型的映射

您可以使用以下表格作为参考，了解每个平台支持哪些类型以及它们在各个平台上的映射关系：

### `string`

<VerticalTable data={[
['Nullable Support?', <code>?string</code>],
['Android (Java)', <code>String</code>],
['iOS', <code>NSString</code>],
]} />

### `boolean`

<VerticalTable data={[
['Nullable Support?', <code>?boolean</code>],
['Android (Java)', <code>Boolean</code>],
['iOS', <code>NSNumber</code>],
]} />

### 对象字面量

比起普通的`Object`来说我们更推荐使用对象字面量，其更具有类型安全性。

**示例:** `{| foo: string, ... |}`

<VerticalTable data={[
['Nullable Support?', <code>{`?{| foo: string, ...|}`}</code>],
['Android (Java)', '-'],
['iOS', '-'],
]} />

### `Object`

:::note
推荐使用[对象字面量](#object-literal)。
:::

<VerticalTable data={[
['Nullable Support?', <code>?Object</code>],
['Android (Java)', <code>ReadableMap</code>],
['iOS', <><code>@{}</code> (untyped dictionary)</>],
]} />

### `Array<*>`

<VerticalTable data={[
['Nullable Support?', <code>{`?Array<*>`}</code>],
['Android (Java)', <code>ReadableArray</code>],
['iOS', <><code>NSArray</code> (or <code>RCTConvertVecToArray</code> when used inside objects)</>],
]} />

### `Function`

<VerticalTable data={[
['Nullable Support?', <code>?Function</code>],
['Android (Java)', '-'],
['iOS', '-'],
]} />

### `Promise<*>`

<VerticalTable data={[
['Nullable Support?', <code>{`?Promise<*>`}</code>],
['Android (Java)', <code>com.facebook.react.bridge.Promise</code>],
['iOS', <><code>RCTPromiseResolve</code> and <code>RCTPromiseRejectBlock</code></>],
]} />

### 类型联合

类型联合仅支持作为回调函数。

**Example:** `'SUCCESS' | 'FAIL'`

<VerticalTable data={[
['Nullable Support?', 'Only as callbacks.'],
['Android (Java)', '-'],
['iOS', '-'],
]} />

### 回调函数

回调函数没有类型检查，并且被泛化为`Object`。

**Example:** `() =>`

<VerticalTable data={[
['Nullable Support?', 'Yes'],
['Android (Java)', <code>com.facebook.react.bridge.Callback</code>],
['iOS', <code>RCTResponseSenderBlock</code>],
]} />

:::note
您可能还会发现参考 React Native 中核心模块的 JavaScript 规范很有用。这些规范位于 React Native 存储库中的`Libraries/`目录内。
:::

## III. TypeScript 到原生类型映射

您可以使用以下表格作为参考，了解支持的类型以及它们在每个平台上的映射关系：

### `string`

<VerticalTable data={[
['Nullable Support?', <code>{`string | null`}</code>],
['Android (Java)', <code>String</code>],
['iOS', <code>NSString</code>],
]} />

### `boolean`

<VerticalTable data={[
['Nullable Support?', <code>{`boolean | null`}</code>],
['Android (Java)', <code>Boolean</code>],
['iOS', <code>NSNumber</code>],
]} />

### `number`

<VerticalTable data={[
['Nullable Support?', 'No'],
['Android (Java)', <code>double</code>],
['iOS', <code>NSNumber</code>],
]} />

### Object literal

This is recommended over using plain `Object`, for type safety.

**Example:** `{| foo: string, ... |}`

<VerticalTable data={[
['Nullable Support?', <code>{`{| foo: string, ...|} | null`}</code>],
['Android (Java)', '-'],
['iOS', '-'],
]} />

### `Object`

:::note
Recommended to use [Object literal](#object-literal-1) instead.
:::

<VerticalTable data={[
['Nullable Support?', <code>{`Object | null`}</code>],
['Android (Java)', <code>ReadableMap</code>],
['iOS', <><code>@{}</code> (untyped dictionary)</>],
]} />

### `Array<*>`

<VerticalTable data={[
['Nullable Support?', <code>{`Array<*> | null`}</code>],
['Android (Java)', <code>ReadableArray</code>],
['iOS', <><code>NSArray</code> (or <code>RCTConvertVecToArray</code> when used inside objects)</>],
]} />

### `Function`

<VerticalTable data={[
['Nullable Support?', <code>?{`Function | null`}</code>],
['Android (Java)', '-'],
['iOS', '-'],
]} />

### `Promise<*>`

<VerticalTable data={[
['Nullable Support?', <code>{`Promise<*> | null`}</code>],
['Android (Java)', <code>com.facebook.react.bridge.Promise</code>],
['iOS', <><code>RCTPromiseResolve</code> and <code>RCTPromiseRejectBlock</code></>],
]} />

### Type Unions

Type unions are only supported as callbacks.

**Example:** `'SUCCESS' | 'FAIL'`

<VerticalTable data={[
['Nullable Support?', 'Only as callbacks.'],
['Android (Java)', '-'],
['iOS', '-'],
]} />

### Callbacks

Callback functions are not type checked, and are generalized as `Object`s.

**Example:** `() =>`

<VerticalTable data={[
['Nullable Support?', 'Yes'],
['Android (Java)', <code>com.facebook.react.bridge.Callback</code>],
['iOS', <code>RCTResponseSenderBlock</code>],
]} />

您可能还会发现参考 React Native 中核心模块的 JavaScript 规范很有用。这些规范位于 React Native 存储库的`Libraries/`目录内。

## IV. 在开发过程中调用代码生成

> 本节包含特定于 React Native v0.66 的信息。

通常在构建时调用 Codegen，但是您可能会发现按需生成原生接口代码以进行故障排除很有用。

如果您希望手动调用 codegen，有两个选项：

1. 直接调用 Gradle 任务（Android）。
2. 手动调用脚本。

### Android - 直接调用 Gradle 任务

您可以通过调用以下任务来触发 Codegen：

```bash
./gradlew generateCodegenArtifactsFromSchema --rerun-tasks
```

额外的 `--rerun-tasks` 标志被添加以确保 Gradle 忽略对该任务的 `UP-TO-DATE` 检查。在正常开发过程中，您不应该需要它。

`generateCodegenArtifactsFromSchema` 任务通常在 `preBuild` 任务之前运行，因此您不需要手动调用它，但它将在构建之前触发。

### 手动调用脚本

或者，您可以直接调用 Codegen，绕过 Gradle 插件或 CocoaPods 基础设施。
可以使用以下命令完成此操作。

现在您已经配置了 Gradle 插件或 CocoaPods 库，所以要提供的参数看起来会非常熟悉。

#### 生成模式文件

首先，您需要从 JavaScript 源代码中生成一个模式文件。只有在 JavaScript 规范发生更改时才需要执行此操作。生成此模式的脚本作为`react-native-codegen`包的一部分提供。如果在 React Native 应用程序内运行此脚本，可以直接使用位于`node_modules`目录下的该包：

```bash
node node_modules/react-native-codegen/lib/cli/combine/combine-js-to-schema-cli.js \
  <output_file_schema_json> <javascript_sources_dir>
```

> `react-native-codegen`的源代码可在 React Native 存储库中找到，位于`packages/react-native-codegen`目录下。如果需要从源代码构建自己的`react-native-codegen`包，请在该目录中运行 `yarn install` 和 `yarn build`. 在大多数情况下，您不需要这样做。

#### 生成原生代码构件

一旦您拥有用于本地模块或组件的架构文件，您可以使用第二个脚本为库生成实际的原生代码构件。您可以使用前一个脚本生成的相同架构文件。

```bash
node node_modules/react-native/scripts/generate-specs-cli.js \
  --platform <ios|android> \
  --schemaPath <generated_schema_json_file> \
  --outputDir <output_dir> \
  [--libraryName library_name] \
  [--javaPackageName java_package_name] \
  [--libraryType all(default)|modules|components]
```

> **注意：** Codegen 的输出构件位于 build 文件夹中，不应提交到版本控制系统。
> 它们仅供参考。

##### 示例

以下是调用 Codegen 脚本的基本示例，用于为提供原生模块的库生成原生 iOS 界面代码。此库的 JavaScript 规范源文件位于`js/`子目录中，而该库的原生代码期望在`ios`子目录中可用原生接口。

```bash
# 生成模式 - 仅在JS规范更改时需要执行
node node_modules/react-native-codegen/lib/cli/combine/combine-js-to-schema-cli.js /tmp/schema.json ./js

# 生成原生代码构件
node node_modules/react-native/scripts/generate-specs-cli.js \
  --platform ios \
  --schemaPath /tmp/schema.json \
  --outputDir ./ios \
  --libraryName MyLibSpecs \
  --libraryType modules
```

在上面的示例中，代码生成脚本将会生成几个文件：`MyLibSpecs.h` 和 `MyLibSpecs-generated.mm`，以及一些 `.h` 和 `.cpp` 文件，全部位于 `ios` 目录下。

## V. 关于现有应用的注意事项

本指南提供了迁移基于 React Native 提供的默认应用模板的应用程序的说明。如果您的应用程序与模板有所偏离，或者您正在使用从未基于该模板构建过的应用程序，则以下部分可能会对您有所帮助。

### 查找桥接代理

本指南假设`AppDelegate`被配置为桥接代理。如果您不确定哪个是您的桥接代理，请在`RCTBridge`和`RCTCxxBridge`中设置断点，运行您的应用，并检查 `self.delegate`.
