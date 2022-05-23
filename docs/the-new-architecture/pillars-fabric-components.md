---
id: pillars-fabric-components
title: Fabric Components
---

A Fabric Component is a UI component rendered on the screen using the [Fabric Renderer](https://reactnative.dev/architecture/fabric-renderer).

Using Fabric Components instead of Native Components allows us to reap all the [benefits](./why) of the **New Architecture**. Specifically, we are able to leverage JSI to efficiently connect the Native UI code JavaScript.

A Fabric Component is created starting from a **JavaScript specification**. This, with the help of [**CodeGen**](./pillars-codegen), will create some C++ code, integrated in the platform native layer and shared among all the React Native platforms. The C++ code is boilerplate code that the component-specific logic needs to use to be properly used by React Native. After the component-specific logic has been connected with the generated code, the component can be integrated in the app.

The following section will guide you through the creation of a Fabric Component, step-by-step.

:::caution
Fabric Components only works with the **New Architecture** enabled.
To migrate to the **New Architecture**, follow the [Migration guide](../new-architecture-intro)
:::

## How to Create a Fabric Components

To create a Fabric Component, we have to follow these steps:

- Define a set of JavaScript specifications.
- Configure the component so that it can be consumed by an app.
- Write the native code required to make it work.

Once these steps are done, the component is ready to be consumed by an app. Therefore, the guide shows how to add it to an app, leveraging _autolinking_, and how to reference it from the JavaScript code.

### Javascript Specification

### Component Configuration

### Native Code

#### iOS

#### Android

### Adding the Fabric Component To Your App
