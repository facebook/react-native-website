---
title: 'Moving Towards a Stable JavaScript API (New Changes in 0.80)'
authors: [huntie, iwoplaza, jpiasecki, coado]
tags: [announcement]
date: 2025-06-09
---

In React Native 0.80, we're introducing two significant changes to React Native's JavaScript API — the deprecation of deep imports, and our new Strict TypeScript API. These are part of an ongoing effort to accurately define our API and offer dependable type safety to users and frameworks.

**Quick takeaways:**

- **Deep imports deprecation**: From 0.80, we're introducing deprecation warnings for deep imports from the `react-native` package.
- **Opt-in Strict TypeScript API**: We are moving to from-source TypeScript types and a new public API baseline under TypeScript. These enable stronger and more futureproof type accuracy, and will be a one-time breaking change. [Opt in](/blog/2025/06/09/moving-towards-a-stable-javascript-api#strict-typescript-api) via `compilerOptions` in your project's `tsconfig.json`.
- We'll work with the community over time to ensure that these changes work for everyone, before enabling the Strict TypeScript API by default in a future React Native release.

<!--truncate-->

## What's changing and why

We are moving to improve and stabilise React Native's public JavaScript API — i.e. what you get when you import `'react-native'`.

Historically, we've approximated this. React Native is authored in [Flow](https://flow.org/), but the community has long since moved to TypeScript in open source, which is how the public API is consumed and validated for compatibility. Our types have been (lovingly) [community-contributed](https://www.npmjs.com/package/@types/react-native), and since merged and aligned in our codebase. However, these have relied on manual maintenance and no automated tooling, introducing correctness gaps.

Additionally, our public JS API has been poorly defined in terms of module boundaries — e.g. internal `'react-native/Libraries/'` deep imports were reachable by app code, but could frequently change as we updated these internals.

In 0.80, we're addressing these issues by deprecating deep imports, and introducing a user opt-in to a new, generated API baseline in TypeScript. We're calling this our **Strict TypeScript API**. Ultimately, this is the groundwork to offer a stable React Native API in future.

## Deprecating deep imports from `react-native`

The main change we're making to our API today is deprecating the use of deep imports ([RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894)), with warnings in ESLint and the JS console. Deep imports of values and types should be updated to `react-native`'s root import.

```js title=""
// Before - import from subpath
import {Alert} from 'react-native/Libraries/Alert/Alert';

// After - import from `react-native`
import {Alert} from 'react-native';
```

This change reduces the total surface area of our JavaScript API into a fixed set of exports which we can control and make stable in a future release. We're targeting a removal of these import paths in 0.82.

:::info API feedback

Some APIs are not exported at root, and will become unavailable without deep imports. We have an **[open feedback thread](https://github.com/react-native-community/discussions-and-proposals/discussions/893)** and will be working with the community to finalize the exports in our public API. Please share your feedback!

:::

**Opting out**

Please bear in mind that we aim to remove deep imports from React Native's API in a future release, and these should instead be updated to the root import.

<details>
<summary>**Opting out of warnings**</summary>

#### ESLint

Disable the `no-deep-imports` rule using `overrides`.

<!-- prettier-ignore -->
```js title=".eslintrc.js"
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        '@react-native/no-deep-imports': 0,
      },
    },
  ]
```

#### Console warnings

Pass the `disableDeepImportWarnings` option to `@react-native/babel-preset`.

<!-- prettier-ignore -->
```js title="babel.config.js"
module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {disableDeepImportWarnings: true}]
  ],
};
```

Restart your app with `--reset-cache` to clear the Metro cache.

```sh title=""
npx @react-native-community/cli start --reset-cache
```

</details>
<details>
<summary>**Opting out of warnings (Expo)**</summary>

#### ESLint

Disable the `no-deep-imports` rule using `overrides`.

<!-- prettier-ignore -->
```js title=".eslintrc.js"
overrides: [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      '@react-native/no-deep-imports': 0,
    },
  },
];
```

#### Console warnings

Pass the `disableDeepImportWarnings` option to `babel-preset-expo`.

<!-- prettier-ignore -->
```js title="babel.config.js"
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', {disableDeepImportWarnings: true}]],
  };
};
```

Restart your app with `--clear` to clear the Metro cache.

```sh name=""
npx expo start --clear
```

</details>

## Strict TypeScript API (opt-in)

The Strict TypeScript API is a new set of TypeScript types in the `react-native` package, which can be opted into via your `tsconfig.json`. We're shipping these alongside our existing TS types, meaning you can choose to migrate when ready.

The new types are:

1. **Generated directly from our source code** — improving coverage and correctness, so you can expect stronger compatibility guarantees.
2. **Restricted to `react-native`'s index file** — more tightly defining our public API, and meaning we won't break the API when making internal file changes.

When the community is ready, the Strict TypeScript API will become our default API in future — synchronized with deep imports removal. This means it's a **good idea** to begin opting in, as you'll be ready for React Native's future stable JS API.

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

:::note Under the hood

This will instruct TypeScript to resolve `react-native` types from our new [`types_generated/`](https://www.npmjs.com/package/react-native?activeTab=code) dir, instead of the previous [`types/`](https://www.npmjs.com/package/react-native?activeTab=code) dir (manually maintained). No restart of TypeScript or your text editor is required.

:::

### Breaking: Deep imports are disallowed

As above, types under the Strict TypeScript API are now only resolvable from the main `'react-native'` import path, enforcing [package encapsulation](/blog/2023/06/21/package-exports-support), per our above deprecation.

```tsx
// Before - import from subpath
import {Alert} from 'react-native/Libraries/Alert/Alert';

// After - MUST import from `react-native`
import {Alert} from 'react-native';
```

:::tip Key win

We've scoped our public API to the exports of React Native's `index.js` file, which we carefully maintain. This means that file changes elsewhere in our codebase will no longer be breaking changes.

:::

### Breaking: Some type names / shapes have changed

Types are now generated from source, rather than manually maintained. In doing this:

- We've aligned differences that had built up from the community contributed types — and also increased the type coverage of our source code.
- We've intentionally updated some type names and type shapes, where there was scope to simplify or reduce ambiguity.

:::tip Key win

Because types are now generated from React Native's source code, you can be confident that the typechecker is **always accurate** for a given version of `react-native`.

:::

#### Example: Stricter exported symbols

The `Linking` API is now a single `interface`, rather than two exports. This follows for a number of other APIs ([see docs](/docs/strict-typescript-api)).

```tsx
// Before
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);

// After
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

#### Example: Fixed / more complete types

Previous manual type definitions left the opportunity for type gaps. Under generated Flow → TypeScript, these are no longer present (and at source, benefit from Flow's additional type validation for multi-platform code).

```tsx
import {Dimensions} from 'react-native';

// Before - Type error
// After - number | undefined
const {densityDpi} = Dimensions.get();
```

### Other breaking changes

Please refer to our [dedicated guide](/docs/strict-typescript-api) in the docs which details all breaking types changes and how to update your code.

## Rollout

We appreciate that any breaking change to React Native will take time for developers to update to in their apps.

#### Now — Opt-in launch (0.80)

The `"react-native-strict-api"` opt-in is stable in the 0.80 release.

- This is a one-time migration. We aim for apps and libraries to opt in at their own pace over the next couple of releases.
- Under either mode, nothing will change for your app at runtime — this affects TypeScript analysis only.
- **And**, we will take feedback on missing APIs, via our [dedicated feedback thread](https://github.com/react-native-community/discussions-and-proposals/discussions/893).

:::tip Recommended

The Strict TypeScript API will become our default API in future.

If you have time, it's worth testing the opt-in now in your `tsconfig.json`, to futureproof your app or library. This will immediately evaluate if there are any type errors introduced in your app under the Strict API. **There may be none(!)** — in which case, you're good to go.

:::

#### Future — Strict TypeScript API by default

In the future, we will require all codebases to use our Strict API, and will remove the legacy types.

The timeline for this will be based on community feedback. For at least the next two React Native releases, the Strict API will remain an opt-in.

## FAQs

<details>
<summary>
**I'm using subpath imports today. What should I do?**
</summary>

Please migrate to the root `'react-native'` import path.

- Subpath imports (e.g. `'react-native/Libraries/Alert/Alert'`) are becoming private APIs. Without preventing access to implementation files inside React Native, we can’t offer a stable JavaScript API.
- We want our deprecation warnings to motivate community feedback, which can be raised via our [centralized discussion thread](https://github.com/react-native-community/discussions-and-proposals/discussions/893), if you believe we are not exposing code paths that are crucial for your app. Where justified, we may promote APIs to the index export.

</details>

<details>
<summary>
**I'm a library maintainer. How does this change impact me?**
</summary>

Both apps and libraries can opt in at their own pace, since `tsconfig.json` will only affect the immediate codebase.

- Typically, `node_modules` is excluded from validation by the TypeScript server in a React Native project. Therefore, your package's exported type definitions are the source of truth.

**💡 We want feedback!** As with changed subpath imports, if you encounter any integration issues with the Strict API, please let us know [on GitHub](https://github.com/react-native-community/discussions-and-proposals/discussions/893).

</details>

<details>
<summary>
**Does this guarantee a final API for React Native yet?**
</summary>

Sadly, not yet. In 0.80, we've made a tooling investment so that React Native's existing JS API baseline can be accurately consumed via TypeScript — enabling future stable changes. We're formalizing the existing API you know and love.

In the future, we will take action to finalise the APIs we currently offer in core — across each language surface. API changes will be communicated via RFCs/announcements, and typically a deprecation cycle.

</details>

<details>
<summary>
**Why isn't React Native written in TypeScript?**
</summary>

React Native is core infrastructure at Meta. We test every merged change across our Family of Apps, before they hit general open source availability.

At this scale and sensitivity, correctness matters. The bottom line is that Flow offers us greater performance and greater strictness than TypeScript, including specific [multi-platform support for React Native](https://flow.org/en/docs/react/multiplatform/).

</details>

## Thanks

These changes were made possible by [Iwo Plaza](https://x.com/iwoplaza), [Jakub Piasecki](https://x.com/breskin67), [Dawid Małecki](https://github.com/coado), [Alex Hunt](https://x.com/huntie), and [Riccardo Cipolleschi](https://x.com/CipolleschiR).

Thanks also to [Pieter Vanderwerff](https://github.com/pieterv), [Rubén Norte](https://github.com/rubennorte), and [Rob Hogan](https://x.com/robjhogan) for their additional help and input.

:::note Learn more

<div style={{display: 'flex'}}>
<p style={{flex: 1, marginRight: 40, marginBottom: 0}}>
<strong style={{ display: 'block', marginTop: 8, marginBottom: 8 }}>Watch the talk!</strong>
<span style={{ display: 'block', marginBottom: 8 }}>We shared a deep dive into our motivations and the work behind the Strict TypeScript API at <strong>App.js 2025</strong>.</span>
**[View on YouTube](https://www.youtube.com/live/UTaJlqhTk2g?si=SDRmj80kss7hXuGG&t=6520)**
</p>
<img
  src="/blog/assets/0.80-js-stable-api-appjs.jpg"
  style={{ flexShrink: 0, width: '200px', aspectRatio: '16/9', objectFit: 'contain' }}
  alt="App.js 2025 Talk"
/>
</div>

:::
