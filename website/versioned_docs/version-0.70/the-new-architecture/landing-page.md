---
id: landing-page
title: Introduction
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

Starting from version 0.68, React Native provides the New Architecture, which offers developers new capabilities for building highly performant and responsive apps. Visit [Why a New Architecture](why) to learn more about what drove the decision to re-architect, and the benefits it provides.

In order to achieve these benefits, we had to rethink how Native Modules and Native Components work. This led us to develop the [Pillars of the New Architecture](pillars):

- [The New Native Module System - Turbo Modules](pillars-turbomodules), a framework to support efficient and flexible integration with native code
- [The New Native Renderer - Fabric](pillars-fabric-components), which offer improved capabilities, cross-platform consistency, and performance in rendering
- [The Codegen](pillars-codegen), which generates boilerplate C++ required by the New Architecture via static typing in JavaScript

## Get started with the New Architecture

### For app developers

To **create a new app** using the New Architecture, head over to [Creating a New Architecture App](use-app-template), which will get you up and running in a few quick steps with the new app template.

To **migrate an existing app** to the New Architecture, follow [Adopting the New Architecture](../new-architecture-intro).

### For library maintainers

First, read up on the core concepts outlined in the [Pillars](pillars) section.

Then, for a **how-to guide** on supporting the New Architecture, check out the [Migration](../new-architecture-library-intro) guide.

For information on **supporting both the Old and New Architectures**, see the [Backwards Compatibility](backward-compatibility) guide.
