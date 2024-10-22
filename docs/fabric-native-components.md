---
id: fabric-native-components-introduction
title: Fabric Native Components Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import {FabricNativeComponentsAndroid,FabricNativeComponentsIOS} from './\_fabric-native-components';

If you want to build _new_ React Native Components that wraps around a [Host Component](https://reactnative.dev/architecture/glossary#host-view-tree-and-host-view) like a [UIButton](https://developer.apple.com/documentation/uikit/uibutton?language=objc) on iOS or a special kind of [CheckBox](https://developer.android.com/reference/androidx/appcompat/widget/AppCompatCheckBox) on Android, you should use a Fabric Native Component.

This guide will show you how to build Fabric Native Component, by implementing a simple web view component. The steps to doing this are:

1. Define a JavaScript specification using Flow or TypeScript.
2. Configure the dependencies management system to generate code from the provided spec and to be auto-linked.
3. Implement the Native code.
4. Use the Component in an App.

# Creating the Native WebView Component

You're going to need a simple application to use the component:

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

Next you'll need to create a folders structure to hold our `RCTWebView` component:

```bash
mkdir -p Demo/{specs,android/app/src/main/java/com/webview}
```

This gives you the following layout where you'll working:

```
Demo
├── android/app/src/main/java/com/webview
└── ios
└── spec
```

## 1. Define Specification for Codegen

Your specification must be defined in either [TypeScript](https://www.typescriptlang.org/) or [Flow](https://flow.org/) (see [Codegen](the-new-architecture/what-is-codegen) documentation for more details). This is used by Codegen to generate the C++, Objective-C++ and Java to connect your platform code to the JavaScript runtime that React runs in.

Use this specification for our WebView Component:

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

The specification file must be named `<MODULE_NAME>NativeComponent.{ts,tsx}` to work with Codegen:

```typescript title="Demo/specs/WebViewNativeComponent.ts"
import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">
The specification file must be named `<MODULE_NAME>NativeComponent.{js,jsx}` to work with Codegen:

```flow title="Demo/RCTWebView/js/RCTWebViewNativeComponent.js":
// @flow strict-local

import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

export default (codegenNativeComponent<NativeProps>(
  // highlight-next-line
  'CustomWebView',
): HostComponent<NativeProps>);
```

</TabItem>
</Tabs>

As with Turbo Native Modules, you're able to have multiple specification files in the `specs/` directory. For more information about the types you can use, and the platform types these map to see the [appendix](appendix.md#codegen-typings).

## 2. Configure the Component for Codegen

```json title="Demo/RCTWebView/package.json"
{
  "name": "rtn-centered-text",
  "version": "0.0.1",
  "description": "Showcase a Fabric Native Component with centered text",
  // highlight-next-line
  "main": "js/RCTWebViewNativeComponent",
  "homepage": "https://github.com/your/package",
  "license": "MIT",
  "author": "Your name <and@your.email>",
  "repository": "https://github.com/your/package",
  "files": [
    "js",
    "android",
    "ios",
    "rtn-centered-text.podspec",
    "!android/build",
    "!ios/build"
  ],
  "keywords": ["react-native", "ios", "android"],
  "devDependencies": {},
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  },
  // highlight-start
  "codegenConfig": {
    "name": "AppSpecs",
    "type": "components",
    "jsSrcsDir": "specs",
    "android": {
      "javaPackageName": "com.webview.specs"
    }
  }
  // highlight-end
}
```

Next we need to configure our platform:

<!-- TODO: review this -->

- package management and build tooling
- native code

## 3. Building your Native Code

You should work through both the Android and iOS platforms:

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <FabricNativeComponentsAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <FabricNativeComponentsIOS />
    </TabItem>
</Tabs>

## 4. Use your Native Component

Update your generated `App.tsx` to:

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
          console.log('Script Loaded');
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
    backgroundColor: 'red',
  },
});

export default App;
```

## 5. Run your App using the RNCenteredText Component

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

| Android                                                   | iOS                                                   |
| --------------------------------------------------------- | ----------------------------------------------------- |
| ![](/docs/assets/fabric-native-component-app-android.png) | ![](/docs/assets/fabric-native-component-app-ios.png) |
