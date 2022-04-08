---
id: backward-compatibility
title: What Backward Compatibility Is
---

Creating a backward compatible module is important to provide a library that works in both the **Old Architecture** and the **New Architecture**. Not all the users of your library will immediately jump on the new architecture ship: it is a good thing that they will be able to use your library even if they are still using the old architecture.

The trick to create a good backward compatible module is to minimize the changes required to adopt the new version. In that way, users of the module can smoothly move to the new version and migrate to the new architecture when they are ready, ideally by issueing one different command.

To achieve this result, we have to perform few changes in our **TurboModule** and **Fabric Component** configurations. The steps we have to follow are:

1. **Update the installation configuration** to avoid downloading dependencies that are not needed by the Old Architecture.
1. **Update the code** to support both architectures. Both Android and iOS build pipelines gives you mechanism to provide a library that will compile with the correct React Native Architecture.
1. **Configure the specs to load the proper implementation**, so that the JavaScript layer leverages the New Architecture whan it is available.

:::info
The next sections requires that you are familiar with the [Pillars](pillars) of the **New Architecture**.
:::

- To create a backward compatible **TurboModule**, follow [this guide](backward-compatibility-turbomodules).
- To create a backward compatible **Fabric Component**, follow [this guide](backward-compatibility-fabric-components).
- If you have troubles while creating a backward compatible module, look at our [troubleshooting guide](backward-compatibility-troubleshooting).
