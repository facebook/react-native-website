---
id: pillars-turbomodules
title: TurboModules
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

If you've worked with React Native, you may be familiar with the concept of Native Modules, which allow JavaScript and platform-native code to communicate over the React Native "bridge", which handles cross-platform serialization via JSON.

TurboModules are the next iteration on Native Modules that provide a few extra [benefits](./why):

- Strongly typed interfaces that are consistent across platforms
- The ability to create shared C++ code for use across platforms
- Lazy loading of modules, allowing for faster app startup
- The use of JSI, a JavaScript interface for native code, which allows for more efficient communication between native and JavaScript code than the bridge

This guide will show you how to create a basic TurboModule.

:::caution
TurboModules only work with the **New Architecture** enabled.
To migrate to the **New Architecture**, follow the [Migration guide](../new-architecture-intro)
:::

## How to Create a TurboModule

To create a TurboModule, we need to:

1. Define a set of JavaScript specifications.
2. Configure the module and inspect the code created by Codegen.
3. Write the native code to finish implementing the module.

## 1. Folder Setup

In order to keep the module decoupled from the app, it's a good idea to define the module separately from the app, and then add it as a dependency to your app later.

Next to your application, create a folder called `RTNCalculator`. (**RTN** stands for "**R**eact**T** **N**ative", and is a standard prefix for React Native modules).

Within `RTNCalculator`, create three subfolders: `js`, `ios`, and `android`.

The final result should look like this:

```sh
TurboModulesGuide
├── MyApp
└── RTNCalculator
    ├── android
    ├── ios
    └── js
```

## 2. JavaScript Specification

The **New Architecture** requires interfaces specified in a typed dialect of JavaScript (either [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/)). **Codegen** will use these specifications to generate code in strongly-typed languages, including C++, Objective-C++, and Java.

There are two requirements the file containing this specification must meet:

1. The file **must** be named `Native<MODULE_NAME>`, with a `.js` or `.jsx` extension when using Flow, or a `.ts`, or `.tsx` extension when using TypeScript. Codegen will only look for files matching this pattern.
2. The file must export a `TurboModuleRegistrySpec` object.

<Tabs groupId="turbomodule-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```typescript title="NativeCalculator.js"
// @flow
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface RTNCalculatorSpec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}
export default (TurboModuleRegistry.get<RTNCalculatorSpec>(
  'RTNCalculator'
): ?RTNCalculatorSpec);
```

</TabItem>
<TabItem value="typescript">

```typescript title="NativeCalculator.ts"
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface RTNCalculatorSpec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}

export default (TurboModuleRegistry.get<RTNCalculatorSpec>(
  'RTNCalculator'
) as RTNCalculatorSpec | null);
```

</TabItem>
</Tabs>

At the beginning of the spec files are the imports:

- The `TurboModule` type, which defines the base interface for all TurboModules
- The `TurboModuleRegistry` JavaScript module, which contains functions for loading TurboModules

The second section of the file contains the interface specification for the TurboMOdule. In this case, the interface defines the `add` function which takes two numbers and returns a promise that resolves to a number.

Finally, we invoke `TurboModuleRegistry.get`, passing the module's name, which will load the TurboModule if it's available. 

:::caution
We are writing JavaScript files importing types from libraries, without setting up a proper node module and installing its dependencies. Your IDE will not be able to resolve the import statements and you may see errors and warnings. This is expected and will not cause problems when you add the module to your app.
:::

```json
