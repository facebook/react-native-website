# Pure C++ Turbo Native Modules

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Writing a module in C++ is the best way to share platform-agnostic code between Android and iOS. With pure C++ modules, you can write your logic only once and reuse it right away from all the platform, without the need of writing platform specific code.

In this guide, we will go through the creation of a pure C++ Turbo Native Module:

1. Create the JS specs
2. Configure Codegen to generate the scaffolding
3. Implement the Native logic
4. Register the module in the Android and iOS application
5. Test your changes in JS

The rest of this guide assume that you have created your application running the command:

```shell
npx @react-native-community/cli@latest init SampleApp --version 0.76.0
```

## 1. Create the JS specs

Pure C++ Turbo Native Modules are Turbo Native Modules. They needs a specification file (also called spec file) so that Codegen can create the scaffolding code for us. The Specification file is also what we use to access the Turbo Native Module in JS.

Specs files need to be written in a typed JS dialect. React native currently supports Flow or TypeScript

1. Inside the root folder of your app, create a new folder called `specs`.
2. Create a new file called `NativeSampleModule.ts`

:::warning
All Native Turbo Module spec files must have the prefix `Native`. Otherwise Codegen cannot pick them up.
:::

<Tabs groupId="tnm-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```ts
// @flow
import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";
// import type {TurboModule} from 'react-native'; in future versions
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
<TabItem value="typescript">

```ts
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
</Tabs>

## 2. Configure Codegen

The next step is to configure Codegen in your `package.json`. <!-- Add links to Codegen -->

1. Open the `package.json` file
2. Modify it as it follows:

```diff
{
  "name": "SampleApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "test": "jest"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-native": "0.76.0-rc.3"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@babel/runtime": "^7.25.0",
    "@react-native-community/cli": "15.0.0-alpha.2",
    "@react-native-community/cli-platform-android": "15.0.0-alpha.2",
    "@react-native-community/cli-platform-ios": "15.0.0-alpha.2",
    "@react-native/babel-preset": "0.76.0-rc.3",
    "@react-native/eslint-config": "0.76.0-rc.3",
    "@react-native/metro-config": "0.76.0-rc.3",
    "@react-native/typescript-config": "0.76.0-rc.3",
    "@types/react": "^18.2.6",
    "@types/react-test-renderer": "^18.0.0",
    "babel-jest": "^29.6.3",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "prettier": "2.8.8",
    "react-test-renderer": "18.3.1",
    "typescript": "5.0.4"
  },
  "engines": {
    "node": ">=18"
  },
+  "codegenConfig": {
+    "name": "AppSpecs",
+    "type": "modules",
+    "jsSrcsDir": "specs",
+    "android": {
+      "javaPackageName": "com.sampleapp.specs"
+    }
+  },
  "packageManager": "yarn@3.6.4"
}
```

This configuration tells Codegen to look for specs files in the `specs` folder. It also instruct Codegen to only generate code for `modules` and to namespace the generated code as `AppSpecs`.

## 3. Write the Native Code

Now that the Javascript side is set up, we can start implementing our Native Code.
