---
id: backward-compatibility
title: What Backward Compatibility Is
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

Creating a backward compatible module is important to provide a library that works in both the **Old Architecture** and the **New Architecture**. Not all the users of your library will immediately jump on the New Architecture ship: it is a good thing that they will be able to use your library even if they are still using the old architecture.

The trick to create a good backward compatible module is to minimize the changes required to adopt the new version. In that way, users of the module can smoothly move to the new version and migrate to the New Architecture when they are ready, ideally by issuing one different command.

To achieve this result, we have to perform few changes in our **Turbo Native Module** and **Fabric Native Component** configurations. The steps we have to follow are:

1. **Update the installation configuration** to avoid using code that is not needed by the Old Architecture.
1. **Update the code** to support both architectures. Both Android and iOS build pipelines gives you mechanism to provide a library that will compile with the correct React Native Architecture.
1. **Configure the specs to load the proper implementation**, so that the JavaScript layer leverages the New Architecture when it is available.

:::info
The next sections requires that you are familiar with the [Pillars](pillars) of the **New Architecture**.
:::

- To create a backward compatible **Turbo Native Module**, follow [this guide](backward-compatibility-turbomodules).
- To create a backward compatible **Fabric Native Component**, follow [this guide](backward-compatibility-fabric-components).
