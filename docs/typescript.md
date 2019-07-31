---
id: typescript
title: Using TypeScript with React Native
---

[TypeScript][ts] is a language which extends JavaScript to add type definitions, a lot like [Flow][flow] which React Native is built in. React Native supports TypeScript and Flow out of the box by default.

## Getting Started with TypeScript

If you're starting a new project, you can use the [TypeScript template][ts-template] to get you there faster:

```sh
react-native init MyAwesomeTSProject --template typescript
```

Alternatively, you can use some of the community bootstrapping tools which can get you to a complete app faster:

1. You can use Expo:

```sh
npm install -g expo-cli
expo init MyAwesomeTSProject
```

2. Or you could use Ignite:

```sh
npm install -g ignite-cli
ignite new MyAwesomeTSProject
```

## Adding TypeScript to an Existing Project

1. Add TypeScript, and the React Native and Jest types to your project. When you were using JavaScript these could have been added for you by your editor.

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

Transforming your files to JavaScript works via the same [Babel infrastructure][babel] as vanilla JavaScript, this means that you should not rely on TypeScript to transform your `ts` and `tsx` files, and it's worth noting there are [one or two caveats][babel-7-caveats] if you have existing TypeScript code to work with.

## What does React Native + TypeScript look like

You can provide an interface for a React Component's [Props][props] and [State][state] via `React.Component<Props, State>` which will provide type-checking and editor auto-completing when working with that component in JSX.

```ts
// components/Hello.tsx
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

const Hello: React.FC<Props> = (props) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(props.enthusiasmLevel);

  onIncrement = () => setEnthusiasmLevel(this.state.enthusiasmLevel + 1);
  onDecrement = () => setEnthusiasmLevel(this.state.enthusiasmLevel - 1);

  getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello{' '}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
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

You would need to set the path aliases to work from both babel and TypeScript. For TypeScript, edit your `tsconfig.json` to have your [custom path mappings][path-map]. In this case we'll make anything in the root of `src` available with no preceding path reference, and allow any test file to be access by using `test/File.tsx`.

```diff
    "target": "esnext",
+     "baseUrl": ".",
+     "paths": {
+       "*": ["src/*"],
+       "tests": ["tests/*"]
+     },
    }
```

Then you need to configure the Babel side, which is done by adding a new dependency: [`babel-plugin-module-resolver`][bpmr]

```sh
yarn add --dev babel-plugin-module-resolver
# or
npm install --save-dev babel-plugin-module-resolver
```

Next up you need to configure your `babel.config.js`:

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

Note that the syntax for both is different.

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
