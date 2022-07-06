---
id: pillars
title: What Compose the New Architecture
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

The New Architecture is composed mainly by two pillars:

- [TurboModules](pillars-turbomodules)
- [Fabric Components](pillars-fabric-components).

TurboModules are the preferred way to create libraries that leverage some platform specific API. Fabric Components are the preferred way to create reusable UI components, providing a native experience to the users.

The main goal of this section is to drive the reader through a step-by-step guide to create their first TurboModule or Fabric Component.

The next sections contain an high-level overview of the pillars, together with the steps to create them. To create one of these pillars, the steps are:

1. Define a JavaScript specification using Flow or TypeScript.
1. Configure the dependencies management system to generate code from the provided spec.
1. Implement the Native code.
1. Integrate the code in the app.

Finally, we dive a little deeper into the [Codegen](pillars-codegen) process that is required to create all the C++ types and files used by our components, including some useful steps to work comfortably while developing the component.

:::caution
To integrate a TurboModule or a Fabric Component in an app, the app has to run with the New Architecture enabled.

To create a new app adopting the New Architecture, refer to the [Using the App Template](use-app-template) section.
To migrate an existing app to the New Architecture, refer to the [Migration](../new-architecture-intro) guide.
:::
