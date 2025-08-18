---
id: pillars
title: 新架构的两大支柱
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

新架构主要由两大支柱组成：

- [新的原生模块体系 - Turbo Modules](pillars-turbomodules)
- [新的渲染器 - Fabric](pillars-fabric-components)

TurboModules 是创建利用某些平台特定 API 的库的首选方法。Fabric 组件是创建可重用 UI 组件的首选方法，为用户提供原生体验。

本节的主要目标是通过逐步指南引导读者创建他们的第一个 TurboModule 或 Fabric 组件。

接下来的几节包含支柱的高级概述，以及创建它们的步骤。要创建这些支柱中的一个，步骤如下：

1. 使用 Flow 或 TypeScript 定义 JavaScript 规范。
2. 配置依赖管理系统以从提供的规范生成代码。
3. 实现原生代码。
4. 将代码集成到应用程序中。

最后，我们深入探讨了[Codegen](pillars-codegen)过程，该过程需要创建我们的组件使用的所有 C++类型和文件，包括一些在开发组件时提升效率的有用步骤。

:::caution 注意
注意要将 TurboModule 或 Fabric 组件集成到应用中，应用必须启用新架构。

要创建采用新架构的新应用，请参阅[使用应用模板](use-app-template) 部分。要将现有应用迁移到新架构，请参阅[迁移](../new-architecture-intro)指南。
:::
