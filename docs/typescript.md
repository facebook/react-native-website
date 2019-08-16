---
id: typescript
title: Using TypeScript with React Native
---

[TypeScript][ts] is a language which extends JavaScript to add type definitions, much like [Flow][flow]. While React Native is built in Flow, it supports both TypeScript _and_ Flow by default.

## Getting Started with TypeScript

If you're starting a new project, there are a few different ways to get started. You can use the [default TypeScript template][ts-template]:

```sh
react-native init MyTSProject --template typescript
```

You can use [Expo][expo] which has two TypeScript templates:

```sh
npm install -g expo-cli
expo init MyTSProject
```

Or you could use [Ignite][ignite], which also has a TypeScript template:

```sh
npm install -g ignite-cli
ignite new MyTSProject
```

## Adding TypeScript to an Existing Project

1. Add TypeScript and the React Native and Jest types to your project. (When you were using JavaScript these could have been added for you by your editor.)

```sh
yarn add typescript @types/jest @types/react @types/react-native @types/react-test-renderer
# or for npm
npm install --save-dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

2. Add a TypeScript config file. Create a `tsconfig.json` in the root of your project:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

4. Rename a JavaScript file to be `*.tsx`

5. Run `yarn tsc` to type-check your new TypeScript files.

## How TypeScript and React Native works

You should not rely on TypeScript to transform your `ts` and `tsx` files into JavaScript! Transforming your files to JavaScript works via the same [Babel infrastructure][Babel] as vanilla JavaScript. If you have existing TypeScript code, there are [one or two caveats][babel-7-caveats].

## What does React Native + TypeScript look like

You can provide an interface for a React Component's [Props][props] and [State][state] via `React.Component<Props, State>` which will provide type-checking and editor auto-completing when working with that component in JSX.

```tsx
// components/Hello.tsx
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

const Hello: React.FC<Props> = (props) => {
    const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(props.enthusiasmLevel);

    const onIncrement = () => setEnthusiasmLevel((enthusiasmLevel || 0) + 1);
    const onDecrement = () => setEnthusiasmLevel((enthusiasmLevel || 0) - 1);

    const getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');
    return (
        <View style={styles.root}>
        <Text style={styles.greeting}>
            Hello{' '}
            {props.name + getExclamationMarks(enthusiasmLevel || 0)}
        </Text>

        <View style={styles.buttons}>
            <View style={styles.button}>
            <Button
                title="-"
                onPress={onDecrement}
                accessibilityLabel="decrement"
                color="red"
            />
            </View>

            <View style={styles.button}>
            <Button
                title="+"
                onPress={onIncrement}
                accessibilityLabel="increment"
                color="blue"
            />
            </View>
        </View>
        </View>
    );
    }
}

// styles
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttons: {
       flexDirection: 'row',
        minHeight: 70,
        alignItems: 'stretch',
        alignSelf: 'center',
        borderWidth: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 0,
    },
    greeting: {
        color: '#999',
        fontWeight: 'bold',
    },
});
```

## Where to Find Useful Advice

- [TypeScript Handbook][ts-handbook]
- [React's documentation on TypeScript][react-ts]
- [React + TypeScript Cheatsheets][cheat] has a good overview on how to use React with TypeScript

## Using Custom Path Aliases with TypeScript

To use custom path aliases with TypeScript, you need to set the path aliases to work from both babel and TypeScript. Here's how:

1. Edit your `tsconfig.json` to have your [custom path mappings][path-map]. Set anything in the root of `src` to be available with no preceding path reference, and allow any test file to be accessed by using `test/File.tsx`:

```diff
    "target": "esnext",
+     "baseUrl": ".",
+     "paths": {
+       "*": ["src/*"],
+       "tests": ["tests/*"]
+     },
    }
```

2. Configure the Babel side done by adding a new dependency, [`babel-plugin-module-resolver`][bpmr]:

```sh
yarn add --dev babel-plugin-module-resolver
# or
npm install --save-dev babel-plugin-module-resolver
```

3. Finally, configure your `babel.config.js` (note that the syntax for your `babel.config.js` is different from your `tsconfig.json`):

```diff
{
  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           "test/*": "./test/"],
+         }
+       }
+     ]
  ]
}
```

[react-ts]: https://reactjs.org/docs/static-type-checking.html#typescript
[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: /react-native/docs/javascript-environment#javascript-syntax-transformers
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheats]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: http://www.typescriptlang.org/docs/home.html
[props]: /react-native/docs/props.html
[state]: /react-native/docs/state.html
[path-map]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[bpmr]: https://github.com/tleunen/babel-plugin-module-resolver
[expo]: https://expo.io
[ignite]: https://infinite.red/ignite
