---
id: pillars
title: What Compose the New Architecture
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

The New Architecture is composed mainly of two pillars:

- [The New Native Module System - Turbo Modules](pillars-turbomodules)
- [The New Renderer - Fabric](pillars-fabric-components).

The core concepts of React Native still holds true in the New Architecture: Native Modules are the preferred way to create libraries that leverage some platform-specific API. Native Components are the preferred way to create reusable UI components, providing a native experience to the users.

TurboModules are the preferred way to create libraries that leverage some platform specific API. Fabric Components are the preferred way to create reusable UI components, providing a native experience to the users.

The main goal of this section is to drive the reader through a step-by-step guide to create their first Native Module or Component which is compatible with the New Architecture.

:::info
For the sake of this guide we're going to use the following **terminology**:

- **Legacy Native Components** & **Legacy Native Modules** - To refer to Modules and Components which are running on the old React Native architecture.
- **Fabric Native Components** & **Turbo Native Modules** - To refer to Modules and Components which have been adapted to work well with the New Architecture, namely the new renderer and the new Native Module System. For brevity you might find them referred as **Fabric Components** and **Turbo Modules**

:::

The next sections contain an high-level overview of the pillars, together with the steps to create them. To create one of these pillars, the steps are:

1. Define a JavaScript specification using Flow or TypeScript.
1. Configure the dependencies management system to generate code from the provided spec.
1. Implement the Native code.
1. Integrate the code in the app.

Finally, we dive a little deeper into the [Codegen](pillars-codegen) process that is required to create all the C++ types and files used by our components, including some useful steps to work comfortably while developing the component.

:::caution
The app has to run with the **New Architecture enabled to integrate a Turbo Native Module or a Fabric Native Component** in an app.

To create a new app adopting the New Architecture, refer to the [Using the App Template](use-app-template) section.
To migrate an existing app to the New Architecture, refer to the [Migration](../new-architecture-intro) guide.
:::
