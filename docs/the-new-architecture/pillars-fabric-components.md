---
id: pillars-fabric-components
title: Fabric Components
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

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

### Folder Setup

The easiest way to create a component is as a separate module we will then import as a dependency for our apps. This keeps the component decoupled from the app, and auto-linking makes it easy to manage.

For this guide, we are going to create a Fabric Component that centers some text on the screen.

Let's create a new folder at the same level of our app and let's call it `RTNCenteredText`.

In this folder, we are going to create three subfolders: `js`, `ios` and `android`.

The final result should look like this:

<figure>
  <img width="500" alt="Folder Structure for a Fabric Component" src="/docs/assets/NewArchitecture/AppFolderStructure.png"/>
  <figcaption>Initial folder structure for a Fabric Component.</figcaption>
</figure>

### JavaScript Specification

The **New Architecture** requires to specify a single source of truth for your component interfaces, using a typed dialect of JavaScript (either [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/)). We need a typed dialect because **Codegen** has to generate code in strongly-typed languages, including C++, Objective-C++ and Java.

Another important aspect of the JavaScript specification is the file name. A Component filename must end with the `NativeComponent.js` (or `jsx`, `ts`, `tsx`) suffix. For example, if you want to create a `MyFabricComponent` component, the specification file must be named `MyFabricComponentNativeComponent.js` (or any other supported extension). The **Codegen** process will look for files whose name ends with `NativeComponent` to generate the required code.

The following are the specification of our `RTNCenteredText` component in both Flow and TypeScript: let's create a `RTNCenteredText` file with the proper extension in the `js` folder.

<Tabs groupId="fabric-component-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```typescript
// @flow strict-local

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  text: ?string,
  // add other props here
|}>;

export default (codegenNativeComponent<NativeProps>(
   'RTNCenteredText',
): HostComponent<NativeProps>);
```

</TabItem>
<TabItem value="typescript">

```typescript
import type { ViewProps } from 'ViewPropTypes';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  ...ViewProps,
  text: string | null | undefined,
  // add other props here
}

export default codegenNativeComponent<NativeProps>(
  'RTNCenteredText'
) as HostComponent<NativeProps>;
```

</TabItem>
</Tabs>

Let's break these down a little.

At the beginning of the spec files, there are the imports. Here, we can import what we need from React Native and other dependencies if needed. The most important imports, that are present in all the Fabric Components, are:

- The `HostComponent`, which is the type our exported component needs to conform to;
- The `codegenNativeComponent` function, which is responsible to actually register the Component in the JS runtime.

The second section of the files contains the **props** of the component. [Props](https://reactnative.dev/docs/next/intro-react#props) (short for "properties") are component-specific information that let you customize React components. In this case, we want to control the `text` the Component will render.

Finally, we invoke the `codegenNativeComponent` generic function, passing the name we want to use for our Component. The returned value is then exported by the JavaScript file in order to be used by the app.

:::caution
We are writing JavaScript files importing types from libraries, without setting up a proper node module and installing its dependencies. The outcome of this is that your IDE may have troubles resolving the import statements and you may see errors and warnings.
These will disappear as soon as we add the the Fabric Component as a dependency of our React Native app.
:::

### Component Configuration

### Native Code

#### iOS

#### Android

### Adding the Fabric Component To Your App
