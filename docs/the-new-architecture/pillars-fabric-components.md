---
id: pillars-fabric-components
title: Fabric Components
---

This section contains a high-level introduction to Fabric components. It provides enough context to understand when a Fabric component is needed and how it roughly works.
It points to the [Renderer](https://reactnative.dev/architecture/fabric-renderer) section of the [Architecture](https://reactnative.dev/architecture/overview) tab for a deep dive into the technical details.

This section must have a warning that it works only with the new architecture enabled. It points to the [migration section](../new-architecture-intro).

## How to Create a Fabric Components

This section is a step-by-step guide to create a Fabric component from scratch. The list of subsections is roughly:

- JS spec (with all the supported features)
- Configuration (package.json, cocoapods, gradle, …) and CodeGen
- Native code (one section for iOS and one for Android)
- Integration in an App (`yarn add` and how to connect the JS specs to the app itself)
- Troubleshooting (common issues and how to solve them)
