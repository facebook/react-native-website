---
title: Using TypeScript with React Native (Updated)
author: Jan Hesters
authorTitle: Full Stack Developer
authorURL: https://medium.com/@jan.hesters
authorImageURL: https://avatars2.githubusercontent.com/u/31096420?s=400&u=03ba2db630e7e86a9a84497a410b59e741d9280b&v=4
authorTwitter: geromekevin
category: engineering
---

In this tutorial, you are going to learn how to set up a React Native project with TypeScript.

**Note:** This tutorial assumes that you are familiar with [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and [React](https://reactjs.org/tutorial/tutorial.html). Otherwise, you might first want to read up on them.

---

An older [blog post](http://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native) on the React Native site describes how to set up React Native with TypeScript. It's a little outdated, though.

Things have changed since then. Since version 0.57 the framework ships with TypeScript support. And there is an [excellent template](https://github.com/emin93/react-native-template-typescript) for RN with TypeScript. This post is an update and an enhancement for the instructions of that old article. In addition to [Jest](https://jestjs.io/), we will also go into detail on how to set up linting, [Enzyme](https://airbnb.io/enzyme/) and [React Native Testing Library](https://www.npmjs.com/package/react-native-testing-library). Let's get started.

## 1. Creating the Project

Using the React Native CLI and [Emin](https://emin.ch/)'s template we can generate the project with TypeScript pre-installed.

```sh
react-native init myapp --template typescript && node myapp/setup.js && cd myapp
```

It's as easy as that 👏🏻.

## 2. Setting Up TSLint

Next, we want to set up linting. I like a combination of three rules:

1. [tslint-eslint-rules](https://www.npmjs.com/package/tslint-eslint-rules)
2. [tslint-react](https://github.com/palantir/tslint-react)
3. [tslint-config-prettier](https://www.npmjs.com/package/tslint-config-prettier)

You can check out what the respective configuration does by clicking on it. Let's install these rules together with TSLint now.

```sh
npm install --save-dev tslint tslint-eslint-rulestslint-react tslint-config-prettier
```

Consequently, we want to set up a `tslint.json` file. In it, you can fine-tune your linting configuration (below you'll see my personal preference).

```json
{
  "extends": [
    "tslint:recommended",
    "tslint-eslint-rules",
    "tslint-react",
    "tslint-config-prettier"
  ],
  "jsRules": {},
  "rules": {
    "interface-name": false,
    "jsx-no-lambda": false,
    "object-literal-sort-keys": false,
    "quotemark": [true, "single", "jsx-double"]
  }
}
```

You might also want to change the `lib` key in your `tsconfig.json` from `["es6"]` to `["es2017"]` to have access to newer syntax such as `Object.value`.

If your editor supports TSLint integration, it should already complain about the empty `Props` interface in `App.tsx`^1. If your editor does not, add the following value to your `scripts` key in your `package.json`:

```json
"lint": "tslint --project tsconfig.json"
```

Now you can lint using your terminal.

```sh
npm run lint
```

If you set up everything correctly, this will yell at you about the empty interface in `App.js`.

## 3. Setting Up Jest

Jest is already installed by default 🎁. We do need to install [ts-jest](https://www.npmjs.com/package/ts-jest), though.

```sh
npm install --save-dev ts-jest
```

And we need to configure it for TypeScript. Add the following to the `jest` key in your `package.json` so that Jest looks for TypeScript files and knows how to transform them.

```json
"jest": {
  "preset": "react-native",
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "\\.(ts|tsx)$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.jest.json"
    }
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$"
}
```

Create a file called `App.test.tsx`. In it, we will create a basic test to see if Jest works.

```tsx
// Add 'export' to fake this being a module to silence TSLint.
export const add = (a: number, b: number) => a + b;

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 1)).toEqual(2);
  });
});
```

Run `npm test` to see if it works.

```sh
PASS  ./App.test.tsx
  add
    ✓ should add two numbers (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.503s
Ran all test suites.
```

Tada 🎉. It works.

---

**Note:** Most people either use Enzyme or React Native Testing Library. So you probably only want to follow one of 4. a) and 4. b).

## 4. a) Setting Up Enzyme

Enzyme requires 5 packages, two of which are types. Let's install them.

```sh
npm install --save-dev enzyme enzyme-adapter-react-16 react-dom @types/enzyme @types/enzyme-adapter-react-16
```

Moreover, we need to configure Enzyme. Create a folder in your project’s root directory called tests/ and create a file called setup.js in it.

```js
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
```

This file tells Enzyme to use the adapter for React 16.

Jest needs to know about this setup file. Modify the `jest` key in your `package.json` to include the following:

```json
"jest: {
  // ...
  "setupFiles": [
    "./tests/setup.js"
  ]
}
```

We can test our installation by writing a simple test with Enzyme in `App.test.tsx`.

```tsx
import { shallow } from "enzyme";
import React from "react";
import App from "./App";

const createTestProps = (props: object) => ({
  ...props
});

describe("App", () => {
  const props = createTestProps({});
  const wrapper = shallow<App>(<App {...props} />);

  describe("rendering", () => {
    it("should render a <View />", () => {
      expect(wrapper.find("View")).toHaveLength(1);
    });
  });
});
```

Run the test: `npm test`.

```sh
PASS  ./App.test.tsx
  App
    rendering
      ✓ should render a <View /> (8ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.034s
Ran all test suites.
```

Success, Enzyme runs 🕺🏻.

## 4. b) Setting Up React Native Testing Library

We only need one package for React Native Testing Library.

```sh
npm install --save-dev react-native-testing-library
```

And again a simple test to see if it works.

```tsx
import React from "react";
import { render } from "react-native-testing-library";
import App from "./App";

const createTestProps = (props?: object) => ({
  ...props
});

describe("App", () => {
  const props = createTestProps();
  const { getByText } = render(<App {...props} />);

  it("should render a welcome", () => {
    expect(getByText(/welcome/i)).toBeDefined();
  });
});
```

Run `npm test`.

```sh
PASS  ./App.test.tsx
  App
    ✓ should render a welcome (1831ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.982s
Ran all test suites.
```

Well done 🐐! Your React Native project is configured with TypeScript.

## Next steps

If you are new to React Native check out the [beginner tutorial](http://facebook.github.io/react-native/docs/tutorial). Otherwise, happy coding! ⚛️

## Footnotes

1. If your editor supports TSLint integration but does not yell at you at this point, you might need to restart your editor for the changes to take effect.
