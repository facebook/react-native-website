---
id: landing-page
title: 新架构介绍
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

从 0.68 版本开始，React Native 提供了新架构，它为开发者提供了构建高性能和响应式应用的新功能。请访问["为何要设计新架构"](why)来了解更多关于促使我们决定重新架构的原因，以及它提供的好处。

为了实现这些好处，我们必须重新思考本地模块和本地组件的工作方式。这促使我们开发了[新架构的支柱](Pillars)。

- [新的原生模块体系 - Turbo Modules](pillars-turbomodules)，一个支持与原生代码高效、灵活集成的框架。
- [Fabric 渲染器和组件](pillars-fabric-components)，它提供了更好的功能、跨平台的一致性和渲染性能。
- [Codegen](pillars-codegen)，它通过 JavaScript 的静态类型化，生成新架构所需的 C++ 模板。

## 开始使用新架构

### 对于应用程序开发者

要**使用新架构创建一个新的应用**，请查看[创建新架构应用](use-app-template)，它将引导你在几个快速步骤中使用新的应用模板。

要**将现有的应用**迁移到新架构，请查看[迁移到新架构](../new-architecture-intro)。

### 对于库维护者

首先，阅读一下[支柱](pillars)部分中概述的核心概念。

然后，对于支持新架构的**方法指南**，请查看[第三方库的迁移指南](../new-architecture-library-intro)。

关于**支持新旧架构的信息**，请看 [向后兼容指南](backward-compatibility) 。
