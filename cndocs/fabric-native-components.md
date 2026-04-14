---
id: fabric-native-components-introduction
title: Fabric 原生 UI 组件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import {FabricNativeComponentsAndroid,FabricNativeComponentsIOS} from './\_fabric-native-components';

# 原生组件

如果你想构建一个 _新架构_ 的 React Native 组件，该组件可以包装一个 [Host Component](https://reactnative.dev/architecture/glossary#host-view-tree-and-host-view)，例如 Android 上的 [CheckBox](https://developer.android.com/reference/androidx/appcompat/widget/AppCompatCheckBox)，或者 iOS 上的 [UIButton](https://developer.apple.com/documentation/uikit/uibutton?language=objc)，你应该使用 Fabric 原生组件。

本指南将以实现一个 web 视图组件为例，展示如何构建 Fabric 原生组件。步骤如下：

1. 使用 Flow 或 TypeScript 定义一个 JavaScript 规范。
2. 配置依赖管理系统的代码生成功能，并自动链接。
3. 实现原生代码。
4. 在应用中使用该组件。

你需要一个普通的模板生成应用来使用该组件：

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

## 创建一个 WebView 组件

本指南将展示如何创建一个 Web View 组件。我们将使用 Android 的 [`WebView`](https://developer.android.com/reference/android/webkit/WebView) 组件和 iOS 的 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview?language=objc) 组件来创建该组件。

首先，创建一个文件夹结构来存放组件的代码：

```bash
mkdir -p Demo/{specs,android/app/src/main/java/com/webview}
```

这将创建以下布局，你将在其中工作：

```
Demo
├── android/app/src/main/java/com/webview
└── ios
└── specs
```

- `android/app/src/main/java/com/webview` 文件夹是存放 Android 代码的文件夹。
- `ios` 文件夹是存放 iOS 代码的文件夹。
- `specs` 文件夹是存放 Codegen 规范文件的文件夹。

## 1. 定义 Codegen 规范

你的规范必须使用 [TypeScript](https://www.typescriptlang.org/) 或 [Flow](https://flow.org/) 定义（更多详情请参阅 [Codegen](the-new-architecture/what-is-codegen) 文档）。这是由 Codegen 生成 C++、Objective-C++ 和 Java 代码，以连接你的平台代码到 React 运行的 JavaScript 运行时。

规范文件必须命名为 `<MODULE_NAME>NativeComponent.{ts|js}` 才能被 Codegen 识别。`NativeComponent` 后缀不仅是一个约定，实际上是由 Codegen 用于检测规范文件。

使用以下规范文件来创建 WebView 组件：

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="Demo/specs/WebViewNativeComponent.ts"
import type {
  CodegenTypes,
  HostComponent,
  ViewProps,
} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">

```ts title="Demo/RCTWebView/js/RCTWebViewNativeComponent.js":
// @flow strict-local

import type {CodegenTypes, HostComponent, ViewProps} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);

```

</TabItem>
</Tabs>

该规范文件由三部分组成，不包括导入：

- `WebViewScriptLoadedEvent` 是一个支持的数据类型，用于将数据从原生代码传递到 JavaScript。
- `NativeProps` 是定义可以在组件上设置的属性。
- `codegenNativeComponent` 语句允许我们为自定义组件生成代码，并定义用于匹配原生实现的名称。

与原生模块一样，你可以在 `specs/` 目录中拥有多个规范文件。更多信息请参阅 [附录](appendix.md#codegen-typings)。

## 2. 配置 Codegen 运行

该规范文件用于 React Native 的 Codegen 工具生成平台特定的接口和样板代码。为此，Codegen 需要知道在哪里找到我们的规范文件以及如何处理它。更新你的 `package.json` 文件：

```json package.json
    "start": "react-native start",
    "test": "jest"
  },
  // highlight-start
  "codegenConfig": {
    "name": "AppSpec",
    "type": "components",
    "jsSrcsDir": "specs",
    "android": {
      "javaPackageName": "com.webview"
    },
    "ios": {
      "componentProvider": {
        "CustomWebView": "RCTWebView"
      }
    }
  },
  // highlight-end
  "dependencies": {
```

配置好 Codegen 后，我们需要准备原生代码以连接到生成的代码。

请注意，对于 iOS，我们声明式地将规范导出的 JS 组件名称（`CustomWebView`）与将在原生实现组件的 iOS 类进行映射。

## 2. 构建原生代码

现在，是时候编写原生平台代码，以便当 React 需要渲染视图时，平台可以创建正确的原生视图并在屏幕上渲染它。

你应该分别在 Android 和 iOS 平台上工作。

:::note
本指南展示了如何创建一个仅适用于新架构的原生组件。如果你需要同时支持新架构和旧架构，请参阅我们的[向后兼容指南](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md)。

:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <FabricNativeComponentsAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <FabricNativeComponentsIOS />
    </TabItem>
</Tabs>

## 3. 使用你的原生组件

最后，你可以在应用中使用该组件。更新你的生成 `App.tsx` 文件：

```javascript title="Demo/App.tsx"
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import WebView from './specs/WebViewNativeComponent';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <WebView
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  webview: {
    width: '100%',
    height: '100%',
  },
});

export default App;
```

该代码创建了一个使用我们创建的 `WebView` 组件来加载 `react.dev` 网站的应用。

该应用还显示了一个当网页加载完成时弹出的警告。

## 4. 运行应用使用 WebView 组件

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
```bash
yarn run android
```
</TabItem>
<TabItem value="ios" label="iOS">
```bash
yarn run ios
```
</TabItem>
</Tabs>

|                                      Android                                      |                                     iOS                                      |
| :-------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img style={{ "max-height": "600px" }} src="/docs/assets/webview-android.webp" /> | <img style={{"max-height": "600px" }} src="/docs/assets/webview-ios.webp" /> |
