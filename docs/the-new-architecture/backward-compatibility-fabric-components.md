---
id: backward-compatibility-fabric-components
title: Fabric Components as Native Components
---

This section describes the required steps to ensure that a Fabric Component can be used as a Native Component.

The section should explain:

- How to avoid installing dependencies when they are not needed
- The usage of compilation pragmas to avoid compiling code that requires types from the codegen
- API uniformity in JS, so that they don’t have to import different files
