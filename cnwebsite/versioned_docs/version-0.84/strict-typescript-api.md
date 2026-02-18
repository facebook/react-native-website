---
id: strict-typescript-api
title: 严格 TypeScript API（可选加入）
---

严格 TypeScript API 是我们未来稳定的 React Native JavaScript API 的预览版。

具体来说，这是 `react-native` npm 包的一套新的 TypeScript 类型，从 0.80 版本开始提供。这些类型提供了更强大、更面向未来的类型准确性，并将允许我们自信地将 React Native 的 API 演进为稳定的形状。选择加入严格 TypeScript API 会带来一些结构性类型差异，因此这是一次性的破坏性更改。

新类型具有以下特点：

1. **直接从我们的源代码生成** — 提高覆盖率和正确性，因此你可以期待更强的兼容性保证。
2. **限制在 `react-native` 的索引文件中** — 更严格地定义我们的公共 API，意味着我们在进行内部文件更改时不会破坏 API。

当社区准备好时，严格 TypeScript API 将在未来成为我们的默认 API — 与深度导入移除同步。

## 选择加入

我们将这些新类型与现有类型一起发布，这意味着你可以在准备好时选择迁移。我们鼓励早期采用者和新创建的应用通过 `tsconfig.json` 文件选择加入。

选择加入是一个**破坏性更改**，因为我们的一些新类型具有更新的名称和结构，尽管许多应用不会受到影响。你可以在下一节中了解每个破坏性更改。

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

:::note 底层原理

这将指示 TypeScript 从我们新的 [`types_generated/`](https://www.npmjs.com/package/react-native?activeTab=code) 目录解析 `react-native` 类型，而不是之前的 [`types/`](https://www.npmjs.com/package/react-native?activeTab=code) 目录（手动维护）。不需要重启 TypeScript 或你的编辑器。

:::

严格 TypeScript API 遵循我们的 [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894) 来移除 React Native 中的深度导入。因此，一些 API 不再在根目录中导出。这是有意的，目的是减少 React Native API 的整体表面积。

:::tip API 反馈

**发送反馈**：我们将与社区合作，在（至少）接下来的两个 React Native 版本中确定我们导出哪些 API。请在我们的[反馈线程](https://github.com/react-native-community/discussions-and-proposals/discussions/893)中分享你的反馈。

参见我们的[公告博客文章](/blog/2025/06/12/moving-towards-a-stable-javascript-api)，了解更多关于我们动机和时间表的信息。

:::

## 迁移指南

### Codegen 类型现在应从 `react-native` 包中导入

用于 codegen 的类型，如 `Int32`、`Double`、`WithDefault` 等，现在在单个 `CodegenTypes` 命名空间下可用。同样，`codegenNativeComponent` 和 `codegenNativeCommands` 现在可以从 react-native 包中导入，而不需要使用深度导入。

当未启用严格 API 时，命名空间 `CodegenTypes` 以及 `codegenNativeCommands` 和 `codegenNativeComponent` 也可以从 `react-native` 包中获取，以便第三方库更容易采用。

**之前**

```ts title=""
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

interface NativeProps extends ViewProps {
  enabled?: WithDefault<boolean, true>;
  size?: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

**之后**

```ts title=""
import {CodegenTypes, codegenNativeComponent} from 'react-native';

interface NativeProps extends ViewProps {
  enabled?: CodegenTypes.WithDefault<boolean, true>;
  size?: CodegenTypes.Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

### 移除 `*Static` 类型

**之前**

```tsx title=""
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);
```

**之后**

```tsx title=""
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

以下 API 之前被命名为 `*Static` 加上该类型的变量声明。在大多数情况下，有一个别名，使得值和类型在相同的标识符下导出，但有些是缺失的。

（例如，有一个 `AlertStatic` 类型、类型为 `AlertStatic` 的 `Alert` 变量和作为 `AlertStatic` 别名的 `Alert` 类型。但在 `PixelRatio` 的情况下，有一个 `PixelRatioStatic` 类型和该类型的 `PixelRatio` 变量，但没有额外的类型别名。）

**受影响的 API**

- `AlertStatic`
- `ActionSheetIOSStatic`
- `ToastAndroidStatic`
- `InteractionManagerStatic` (In this case there was no relevant `InteractionManager` type alias)
- `UIManagerStatic`
- `PlatformStatic`
- `SectionListStatic`
- `PixelRatioStatic` (In this case there was no relevant `PixelRatio` type alias)
- `AppStateStatic`
- `AccessibilityInfoStatic`
- `ImageResizeModeStatic`
- `BackHandlerStatic`
- `DevMenuStatic` (In this case there was no relevant `DevMenu` type alias)
- `ClipboardStatic`
- `PermissionsAndroidStatic`
- `ShareStatic`
- `DeviceEventEmitterStatic`
- `LayoutAnimationStatic`
- `KeyboardStatic` (In this case there was no relevant `Keyboard` type alias)
- `DevSettingsStatic` (In this case there was no relevant `DevSettings` type alias)
- `I18nManagerStatic`
- `EasingStatic`
- `PanResponderStatic`
- `NativeModulesStatic` (In this case there was no relevant `NativeModules` type alias)
- `LogBoxStatic`
- `PushNotificationIOSStatic`
- `SettingsStatic`
- `VibrationStatic`

### 一些核心组件现在是函数组件而不是类组件

- `View`
- `Image`
- `TextInput`
- `Modal`
- `Text`
- `TouchableWithoutFeedback`
- `Switch`
- `ActivityIndicator`
- `ProgressBarAndroid`
- `InputAccessoryView`
- `Button`
- `SafeAreaView`

由于这个变化，访问这些视图的 ref 类型需要使用 `React.ComponentRef<typeof View>` 模式，这对类组件和函数组件都按预期工作，例如：

```ts title=""
const ref = useRef<React.ComponentRef<typeof View>>(null);
```

## 其他破坏性更改

### Animated 类型的变化

Animated 节点之前是基于其插值输出的泛型类型。现在，它们是具有泛型 `interpolate` 方法的非泛型类型。

`Animated.LegacyRef` 不再可用。

### 可选属性的统一类型

在新类型中，每个可选属性都将被类型化为 `type | undefined`。

### 移除一些已废弃的类型

[`DeprecatedPropertiesAlias.d.ts`](https://github.com/facebook/react-native/blob/0.80-stable/packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts) 中列出的所有类型在严格 API 下都无法访问。

### 移除剩余的组件属性

一些在类型定义中定义但组件未使用或缺少定义的属性被移除了（例如：`Text` 上的 `lineBreakMode`、`ScrollView` 上的 `scrollWithoutAnimationTo`、在 transform 数组外定义的 transform 样式）。

### 之前可访问的私有类型帮助器现在可能被移除

由于之前类型定义的配置，每个定义的类型都可以从 `react-native` 包中访问。这包括没有显式导出的类型和仅供内部使用的帮助类型。

这方面的显著例子是与 StyleSheet 相关的类型（如 `RecursiveArray`、`RegisteredStyle` 和 `Falsy`）和 Animated 相关的类型（如 `WithAnimatedArray` 和 `WithAnimatedObject`）。
