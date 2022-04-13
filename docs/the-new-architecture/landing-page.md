---
id: landing-page
title: Introduction
---

Starting in version 0.68, React Native provides a New Architecture that improves several aspects of how JavaScript code and host platforms can integrate, such as:

- synchronously measure and render React Native views at the same time as native views
- support for prioritization of events that update the app's layout, like user interactions
- improved type safety and consistency of communication between JavaScript and native code

This is made possible by these [Pillars of the New Architecture](pillars):

- [Fabric renderer and components](pillars-fabric-components), and the capabilities they offer for layout and interaction events
- [TurboModules](pillars-turbomodules), which supports faster loading of and communication with native code
- [CodeGen](pillars-codegen), which generates code you can use to interface with native modules, via static typing in JavaScript

## Get started with the New Architecture

### For app developers

To **create a new app** using the New Architecture, head over to [Creating a New Architecture App](use-app-template.md), which will get you up and running in a few easy steps with the new app template.

To **migrate an existing app** to the New Architecture, follow [Adopting the New Architecture](../new-architecture-intro.md).

### For library maintainers

First, you'll need to learn about the primary components of the New Architecture: TurboModules, Fabric, and CodeGen. Learn more about these concepts in the [Pillars](pillars) section.

Then, for a **how-to guide** on supporting the New Architecture, check out the [Migration](../new-architecture-library-info) guide.

For information on **supporting both the Old and New Architectures**, see the [Backwards Compatibility](backward-compatibility) guide.
