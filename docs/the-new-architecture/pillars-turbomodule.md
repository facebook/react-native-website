---
id: pillars-turbomodules
title: TurboModules
---

This section contains a high-level introduction to TurboModules. It provides enough context to understand when a TurboModule is needed and how it roughly works.

This section must have a warning that it works only with the new architecture enabled. It points to the [migration section](../new-architecture-intro).

## How to create a Turbomodule

This section is a step-by-step guide to create a TurboModule from scratch. The list of subsections is roughly:

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

```typescript
```

</TabItem>
<TabItem value="typescript">

```typescript
```

</TabItem>
</Tabs>