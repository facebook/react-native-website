---
id: fabric-native-components-introduction
title: Fabric Native Components Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import {FabricNativeComponentsAndroid,FabricNativeComponentsIOS} from './\_fabric-native-components';

# Native Fabric Components

If you want to build _new_ React Native Components that wraps around a [Host Component](https://reactnative.dev/architecture/glossary#host-view-tree-and-host-view) like a [UIButton](https://developer.apple.com/documentation/uikit/uibutton?language=objc) on iOS or a custom kind of [CheckBox](https://developer.android.com/reference/androidx/appcompat/widget/AppCompatCheckBox) on Android, you should use a Fabric Native Component.

This guide will show you how to build Fabric Native Component, by implementing a centered text component. The steps to doing this are:

1. Define a JavaScript specification using Flow or TypeScript.
2. Implement the Native code.
3. Use the Component in an App.

## Creating the Fabric Native Centered Text Component

You're going to need an application to use the component:

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

Next you'll need to create a folders structure to hold our `RTNCenteredText` component:

```bash
mkdir -p Demo/js
```

This gives you the following layout:

```
Demo
├── android
├── ios
└── js
```

### 1. Define Specification for Codegen

Your specification must be defined in either [TypeScript](https://www.typescriptlang.org/) or [Flow](https://flow.org/) (see [Codegen](the-new-architecture/what-is-codegen) documentation for more details). This is used by Codegen to generate the C++, Objective-C++ and Java to connect your platform code to the JavaScript runtime that React runs in.

Use this specification for our Text Component:

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

The specification file must be named `<MODULE_NAME>NativeComponent.{ts,tsx}` to work with Codegen:

```typescript title="Demo/js/RTNCenteredTextNativeComponent.ts"
import type {ViewProps} from 'react-native';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {Int32} from 'react-native/libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  text?: string;
  // You can add other props here
}

export default codegenNativeComponent<NativeProps>(
  'RTNCenteredText',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">
The specification file must be named `<MODULE_NAME>NativeComponent.{js,jsx}` to work with Codegen:

```flow title="Demo/js/RTNCenteredTextNativeComponent.js":
// @flow strict-local

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native';
import type {Int32} from 'react-native/libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  text: ?string,
  margin?: Int32,
  // add other props here
|}>;

export default (codegenNativeComponent<NativeProps>(
  'RTNCenteredText',
): HostComponent<NativeProps>);
```

</TabItem>
</Tabs>

As with Turbo Native Modules, you're able to have multiple specification files in the `js/` directory. For more information about the types you can use, and the platform types these map to see the [appendix](/appendix.md).

## 2. Configure the Component for Codegen

Typically Fabric Nactive Components are distributed using npm, it's also how our Codegen is configured. Update the generated [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) to:

```json title="Demo/package.json"
     "start": "react-native start",
     "test": "jest"
   },
  // highlight-start
  "codegenConfig": {
    "name": "RTNCenteredTextSpecs",
    "type": "components",
    "jsSrcsDir": "js",
    "android": {
      "javaPackageName": "com.rtncenteredtext"
    }
  }
  // highlight-end
   "dependencies": {
```

Next we need to configure our platform:

- package management and build tooling
- native code

### 3. Building your Native Code

You should work through both the Android and iOS platforms:

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <FabricNativeComponentsAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <FabricNativeComponentsIOS />
    </TabItem>
</Tabs>

### 4. Use your Native Component

Update your generated `App.tsx` to:

```javascript title="Demo/App.tsx"
import React from 'react';
import {StyleSheet, View} from 'react-native';

import RTNCenteredText from './RTNCenteredText/js';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <RTNCenteredText text="Hello, World" style={styles.hello} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hello: {
    width: 100,
    height: 100,
  },
});

export default App;
```

### 5. Run your App using the RNCenteredText Component

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
