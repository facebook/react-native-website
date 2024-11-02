## 一、术语

整个与新架构相关的指南将遵循以下**术语**：

- **Spec** - TypeScript or Flow code that describes the API for a Turbo Native Module or Fabric Native component. Used by **Codegen** to generate boilerplate code.

- **Fabric 原生组件** - 指已经适配以与新架构（即新渲染器）良好协同工作的组件。为简洁起见，您可能会看到它们被称为**Fabric 组件**。
- **Turbo 原生模块** - 指已经适配以与新架构（即新原生模块系统）良好协同工作的模块。为简洁起见，您可能会看到它们被称为**Turbo 模块**。
- **传统原生组件** - 指运行在旧版 React Native 架构上的组件。
- **传统原生模块** - 指运行在旧版 React Native 架构上的模块。

## II. Codegen 类型

您可以使用以下表格作为参考，了解每种类型在不同平台上的支持情况：

| Flow                                                                       | TypeScript                                          | Flow Nullable Support                                   | TypeScript Nullable Support                          | Android (Java)                       | iOS (ObjC)                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| `string`                                                                   | `string`                                            | `?string`                                               | <code>string &#124; null</code>                      | `string`                             | `NSString`                                                     |
| `boolean`                                                                  | `boolean`                                           | `?boolean`                                              | <code>boolean &#124; null</code>                     | `Boolean`                            | `NSNumber`                                                     |
| Object Literal<br /><code>&#123;&#124; foo: string, ...&#124;&#125;</code> | <code>&#123; foo: string, ...&#125; as const</code> | <code>?&#123;&#124; foo: string, ...&#124;&#125;</code> | <code>?&#123; foo: string, ...&#125; as const</code> | \-                                   | \-                                                             |
| Object [[1](#notes)]                                                       | Object [[1](#notes)]                                | `?Object`                                               | <code>Object &#124; null</code>                      | `ReadableMap`                        | `@` (untyped dictionary)                                       |
| <code>Array&lt;T&gt;</code>                                                | <code>Array&lt;T&gt;</code>                         | <code>?Array&lt;T&gt;</code>                            | <code>Array&lt;T&gt; &#124; null</code>              | `ReadableArray`                      | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |
| `Function`                                                                 | `Function`                                          | `?Function`                                             | <code>Function &#124; null</code>                    | \-                                   | \-                                                             |
| <code>Promise&lt;T&gt;</code>                                              | <code>Promise&lt;T&gt;</code>                       | <code>?Promise&lt;T&gt;</code>                          | <code>Promise&lt;T&gt; &#124; null</code>            | `com.facebook.react.bridge.Promise`  | `RCTPromiseResolve` and `RCTPromiseRejectBlock`                |
| Type Unions<br /><code>'SUCCESS'&#124;'FAIL'</code>                        | Type Unions<br /><code>'SUCCESS'&#124;'FAIL'</code> | Only as callbacks                                       |                                                      | \-                                   | \-                                                             |
| Callbacks<br />`() =>`                                                     | Callbacks<br />`() =>`                              | Yes                                                     |                                                      | `com.facebook.react.bridge.Callback` | `RCTResponseSenderBlock`                                       |
| `number`                                                                   | `number`                                            | No                                                      |                                                      | `double`                             | `NSNumber`                                                     |

### Notes:

<b>[1]</b> 我们强烈建议使用对象字面量而不是对象。

:::info
您也可以参考 React Native 核心模块的 JavaScript 规范。这些位于 React Native 仓库的 [`Libraries/`](https://github.com/facebook/react-native/tree/main/packages/react-native/Libraries) 目录中。
:::
