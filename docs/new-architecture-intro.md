---
id: new-architecture-intro
title: Adopting the New Architecture
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

# Getting Started with the New Architecture

This migration guide is designed for React Native **library authors** and **application developers**. It outlines the steps you need to follow to roll out the new Architecture, composed by the **new NativeModule system (TurboModule) and the new Renderer (Fabric)** to your **Android** and **iOS** libraries and apps.

## Table of Contents

The guide is divided into three sections:

- **Supporting the New Architecture in your Library**
  - [Prerequisites for Supporting the New Architecture in JavaScript](new-architecture-library-intro)
  - Enabling the New Architecture in your Library
    - [Android](new-architecture-library-android)
    - [iOS](new-architecture-library-ios)
- **Supporting the New Architecture in your App**
  - [Prerequisites for Supporting the New Architecture in your App](new-architecture-app-intro)
  - Enabling the New NativeModule System (TurboModule) in your App
    - [Android](new-architecture-app-modules-android)
    - [iOS](new-architecture-app-modules-ios)
  - Enabling the New Renderer (Fabric) in your App
    - [Android](new-architecture-app-renderer-android)
    - [iOS](new-architecture-app-renderer-ios)
- [**Appendix**](new-architecture-appendix)
