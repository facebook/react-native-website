# What is Codegen?

**Codegen** is a tool to avoid writing a lot of repetitive code. Using Codegen **is not mandatory**: you can write all the generated manually. However, **Codegen** generates scaffolding code that could save you a lot of time.

React Native invokes **Codegen** automatically every time an iOS or Android app is built. Occasionally, you would like to manually run the **Codegen** scripts to know which types and files are actually generated: this is a common scenario when developing Turbo Native Modules and Fabric Native Components.

<!-- TODO: Add links to TM and FC -->

## How does Codegen works

**Codegen** is a process that is tightly coupled with a React Native app. The **Codegen** scripts live inside the `react-native` NPM package and the apps calls those scripts at build time.

**Codegen** crawls the folders in your project, starting form a directory you specify in your `package.json`, looking for some specific JS files that contains the specificiation (or specs) for your custom modules and components. Spec files are JS files written in a typed dialect: React Native currently supports Flow and TypeScript.

Every time **Codegen** finds a spec files, it generates the boilerplate code associated to it. **Codegen** generates some C++ glue-code and then it generates platform-specific code, using Java for Android and Objective-C++ for iOS.
