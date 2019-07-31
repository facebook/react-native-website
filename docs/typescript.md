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

Or if you're using expo:

```sh
npm install -g expo-cli
expo init MyAwesomeTSProject
```

and pick one of the TypeScript templates.

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

interface State {
  enthusiasmLevel: number;
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    };
  }

  onIncrement = () =>
    this.setState({enthusiasmLevel: this.state.enthusiasmLevel + 1});

  onDecrement = () =>
    this.setState({enthusiasmLevel: this.state.enthusiasmLevel - 1});

  getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');

  render() {
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
- [React + TypeScript Cheatsheets][cheat] has a good overview on how to use React with TypeScript

[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: /react-native/docs/javascript-environment#javascript-syntax-transformers
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheats]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: http://www.typescriptlang.org/docs/home.html
[props]: /react-native/docs/props.html
[state]: /react-native/docs/state.html
