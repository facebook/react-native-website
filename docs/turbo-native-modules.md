---
id: turbo-native-modules-introduction
title: 'Turbo Native Modules: Introduction'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import {TurboNativeModulesAndroid, TurboNativeModulesIOS} from './\_turbo-native-modules-components';

If you want your React Native application code to interact with native platform API, you should use a Turbo Native Module. This guide will show you how to write one.

The basic steps are:

1. **Define a typed JavaScript specification** using one of the most popular JavaScript type annotation languages: Flow or TypeScript;
2. **Write you application code** using your specification
3. **Configure your dependency management system to run Codegen**, which converts the specification into native language interfaces;
4. **Write your native platform code using the generated interfaces** to write and hook your native code into the React Native runtime environment

Lets work through each of these steps by building a simple example.

# Native Persistent Storage

This guide will show you how to write a simple implementation of part of the [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev): `localStorage`. The API is simple and relatable to a React developer who might be writing application code on your project.

To make this work on mobile, we need to use 2 platform APIS:

- iOS: [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults), and
- Android: [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences).

## 1. Declare Typed Specification

React Native provides tooling called [Codegen](r), which will take a specification written in TypeScript or Flow and generate platform specific code for iOS and Android. The specification declares the methods and data types that will pass back and forth between your native code and the React Native JavaScript runtime. We call your specification and the native code you write to work with the Codegen interfaces a Turbo Native Module.

:::info
You can see all of the types you can use in your specification and the native types that are generated in the [Appendix](/appendix.md) documentation.
:::

Here is an implementation of the `localStorage` specification:\*

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript
import {TurboModule, TurboModuleRegistry} from 'react-native';

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

```flow
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

## 2. Write Application Code using the Turbo Native Module

Next you’ll need to put your application developer hat on and write some JavaScript. Using `NativeLocalStorage`, here’s a modified `App.tsx` that includes some text we want persisted, an input field and some buttons to update this value. Since we’re application developers, lets added add dark mode support for extra polish:

The `TurboModuleRegistry` supports 2 modes of retreiving a Turbo Native Module:

- `get<T>(name: string): T | null` which will return `null` if the Turbo Native Module is unavailable. This is typically a concern for teams doing fancy things where they ship the JS and native code separately.
- `getEnforcing<T>(name: string): T` which will throw an exception if the Turbo Native Module is unavailable. This is the simple case.
  Next you’ll need to put your application developer hat on and write some JavaScript. Using `NativeLocalStorage`, here’s a modified `App.tsx` that includes some text we want persisted, an input field and some buttons to update this value. Since we’re application developers, lets added add dark mode support for extra polish:

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  TextInput,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

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

## 3. Configure Codegen to run

The spec is used by the React Native Codegen tools to generate platform specific interfaces and boilerplate for us. To do this, Codegen needs to know where to find our spec and what to do with it. Update your package.json to include:

```diff
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
+  "codegenConfig": {
+    "name": "NativeLocalStorageSpec",
+    "type": "modules",
+    "jsSrcsDir": "specs",
+    "android": {
+      "javaPackageName": "com.nativelocalstorage"
+    }
+  },
   // highlight-add-end
   "dependencies": {
     "react": "18.3.1",
     "react-native": "0.75.3"
```

:::info
Codegen is called at build-time, but you can hook it into your preferred build too if you’d like. See [using Codegen](the-new-architecture/using-codegen) our more detailed documentation.
:::

With everything wired up for Codegen, we need to prepare our native code to hook into our generated code.

## 4. Write your Native Platform code:

With everything prepared, we're going to start writing native platform code. We do this in 2 parts:

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <TurboNativeModulesAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <TurboNativeModulesIOS/>
    </TabItem>
</Tabs>
