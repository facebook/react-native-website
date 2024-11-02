---
id: new-architecture-intro
title: 迁移到新架构
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

# 入门新架构

此迁移指南旨在为React Native的**库作者**和**应用程序开发者**提供。它概述了您需要遵循的步骤，以在您的**Android**和**iOS**库和应用中使用由**新的NativeModule系统（TurboModule）和新的渲染器（Fabric）**组成的新架构。

## 目录

本指南分为五个部分：

- **在第三方库中支持新架构**
  - [在JavaScript中支持新架构的预备工作](new-architecture-library-intro)
  - 在库中启用新架构
    - [Android](new-architecture-library-android)
    - [iOS](new-architecture-library-ios)
- **在应用中支持新架构**
  - [在应用中支持新架构的预备工作](new-architecture-app-intro)
  - 在应用中启用新的NativeModule系统（TurboModule）
    - [Android](new-architecture-app-modules-android)
    - [iOS](new-architecture-app-modules-ios)
  - 在应用中启用新的渲染器（Fabric）
    - [Android](new-architecture-app-renderer-android)
    - [iOS](new-architecture-app-renderer-ios)
- [**React 18和React Native**](react-18-and-react-native)
- [**故障排除**](new-architecture-troubleshooting)
- [**附录**](new-architecture-appendix)
