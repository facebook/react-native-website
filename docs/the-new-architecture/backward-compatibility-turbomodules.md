---
id: backward-compatibility-turbomodules
title: TurboModules as Native Modules
---

This section describes the required steps to ensure that a TurboModule can be used as a Native Module.

The section explains:

- How to avoid installing dependencies when they are not needed
- The usage of compilation pragmas to avoid compiling code that requires types from the codegen
- API uniformity in JS, so that they don’t have to import different files
