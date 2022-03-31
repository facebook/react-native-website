---
id: typescript
title: Using TypeScript
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[TypeScript][ts] is a language which extends JavaScript by adding type definitions, much like [Flow][flow]. While React Native is built in Flow, it supports both TypeScript _and_ Flow by default.

## Getting Started with TypeScript

If you're starting a new project, there are a few different ways to get started.

You can use the [TypeScript template][ts-template]:

```shell
npx react-native init MyApp --template react-native-template-typescript
```

:::note

If the above command is failing, you may have an old version of `react-native` or `react-native-cli` installed globally on your system. To fix the issue try uninstalling the CLI:

- `npm uninstall -g react-native-cli` or `yarn global remove react-native-cli`

and then run the `npx` command again.
Optionally, you can also use the command given below to get started with your template.

- `npx react-native --ignore-existing init MyApp --template react-native-template-typescript`

:::

You can use [Expo][expo] which has two TypeScript templates:

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -g expo-cli
expo init MyTSProject
```

</TabItem>
<TabItem value="yarn">

```shell
yarn global add expo-cli
expo init MyTSProject
```

</TabItem>
</Tabs>

Or you could use [Ignite][ignite], which also has a TypeScript template:

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -g ignite-cli
ignite new MyTSProject
```

</TabItem>
<TabItem value="yarn">

```shell
yarn global add ignite-cli
ignite new MyTSProject
```

</TabItem>
</Tabs>

## Adding TypeScript to an Existing Project

1. Add TypeScript and the types for React Native and Jest to your project.

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

</TabItem>
</Tabs>

2. Add a TypeScript config file. Create a `tsconfig.json` in the root of your project:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react-native",
    "lib": ["es2017"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

3. Create a `jest.config.js` file to configure Jest to use TypeScript

```js
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
```

4. Rename a JavaScript file to be `*.tsx`

> You should leave the `./index.js` entrypoint file as it is otherwise you may run into an issue when it comes to bundling a production build.

5. Run `yarn tsc` to type-check your new TypeScript files.

## How TypeScript and React Native works

Out of the box, transforming your files to JavaScript works via the same [Babel infrastructure][babel] as a non-TypeScript React Native project. We recommend that you use the TypeScript compiler only for type checking. If you have existing TypeScript code being ported to React Native, there are [one or two caveats][babel-7-caveats] to using Babel instead of TypeScript.

## What does React Native + TypeScript look like

You can provide an interface for a React Component's [Props](props) and [State](state) via `React.Component<Props, State>` which will provide type-checking and editor auto-completing when working with that component in JSX.

```tsx title="components/Hello.tsx"
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const Hello: React.FC<Props> = ({
  name,
  baseEnthusiasmLevel = 0
}) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(
    baseEnthusiasmLevel
  );

  const onIncrement = () =>
    setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0
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
    justifyContent: 'center'
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16
  }
});

export default Hello;
```

You can explore the syntax more in the [TypeScript playground][tsplay].

## Where to Find Useful Advice

- [TypeScript Handbook][ts-handbook]
- [React's documentation on TypeScript][react-ts]
- [React + TypeScript Cheatsheets][cheat] has a good overview on how to use React with TypeScript

## Using Custom Path Aliases with TypeScript

To use custom path aliases with TypeScript, you need to set the path aliases to work from both Babel and TypeScript. Here's how:

1. Edit your `tsconfig.json` to have your [custom path mappings][path-map]. Set anything in the root of `src` to be available with no preceding path reference, and allow any test file to be accessed by using `tests/File.tsx`:

```diff {2-7}
    "target": "esnext",
+     "baseUrl": ".",
+     "paths": {
+       "*": ["src/*"],
+       "tests": ["tests/*"],
+       "@components/*": ["src/components/*"],
+     },
    }
```

2. Add [`babel-plugin-module-resolver`][bpmr] as a development package to your project:

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
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

```diff {3-13}
{
  plugins: [
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
  ]
}
```

[react-ts]: https://reactjs.org/docs/static-type-checking.html#typescript
[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: /docs/javascript-environment#javascript-syntax-transformers
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheat]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: https://www.typescriptlang.org/docs/handbook/intro.html
[path-map]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[bpmr]: https://github.com/tleunen/babel-plugin-module-resolver
[expo]: https://expo.io
[ignite]: https://github.com/infinitered/ignite
[tsplay]: https://www.typescriptlang.org/play?strictNullChecks=false&jsx=3#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKFEljgG8AhAVxhggDsAaOAZRgCeAGyS8AFkiQweAFSQAPaXABqwJAHcAvnGy4CRdDAC0HFDGAA3JGSpUFteILBI4ABRxgAznAC8DKnBwpiBIAFxwnjBQwBwA5hSUgQBGKJ5IAKIcMGLMnsCpIAAySFZCAPzhHMwgSUhQCZq2lGickXAAEkhCQhDhyIYAdABiAMIAPO4QXgB8vnAAFPRBKCE8KWmZ2bn5nkUlXXMADHCaAJS+s-QBcC0cbQDaSFk5eQXFpTxpMJsvO3ulAF05v0MANcqIYGYkPN1hlnts3vshKcEtdbm1OABJDhoIghLJzebnHyzL4-BG7d5deZPLavSlIuAAajgAEYUWjWvBOAARJC4pD4+B+IkXCJScn0-7U2m-RGlOCzY5lOCyinSoRwIxsuDhQ4cyicu7wWIS+RoIQrMzATgAWRQUAA1t4RVUQCMxA7PJVqrUoMTZm6PV7FXBlXAAIJQKAoATzIOeqDeFnsgYAKwgMXm+AAhPhzuF8DZDYk4EQYMwoBwFtdAmNVBoIoIRD56JFhEhPANbpCYnVNNNa4E4GM5Iomx3W+2RF3YkQpDFYgOh8OOl0evR8ARGqXV4F6MEkDu98P6KbvubLSBrXaHc6afCpVTkce92MAPRjmCD3fD+tqdQfxPOsWDYTgVz3cwYBbAAibEBVSFw1SlGCINXdA0E7PIkmAIRgEEQoUFqIQfBgmIBSFVDfxPTh3Cw1ssRxPFaVfYCbggHooFIpIhGYJAqLY98gOAsZQPYDg0OHKDYL5BC0lVR8-gEti4AwrDgBwvCCKIrpSIAE35ZismUtjaKITxPAYjhZKMmBWOAlpONIog9JMvchIgj8G0AocvIA4SDU0VFmi5CcZzmfgO3ESQYG7AwYGhK5Sx7FA+ygcIktXTARHkcJWS4IcUDw2IOExBKQG9OAYMwrI6hggrfzTXJzEwAQRk4BKsnCaraTq65NAawI5xixcMqHTAOt4YAAC8wjgAAmQ5BuHCasgAdSQYBYjEGBCySDi9PwZbAmvKBYhiPKADZloGqgzmC+xoHgAzMBQZghHgTpuggBIgA
