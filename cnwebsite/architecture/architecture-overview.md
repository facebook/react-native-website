---
id: architecture-overview
title: 架构概览
slug: /overview
---

:::info
欢迎来到架构概览！如果您刚开始使用 React Native，请参考<a href="/docs/getting-started">指南</a>部分。继续阅读以了解 React Native 的内部工作原理！
本文档仍在持续更新中。请时常回来查看新信息。
:::

架构概览旨在分享React Native内部工作原理的概念性概述。目标读者主要是生态库的开发者、核心贡献者和特别有好奇心的人。如果您是应用开发者，使用 React Native 并不要求您熟悉这些材料，但您仍然可以从这个概览中受益，因为它将让您深入了解 React Native 在幕后的工作方式。欢迎在<a href="https://github.com/reactwg/react-native-new-architecture/discussions/9">工作组内的讨论</a>中分享您对这一部分的反馈。

## 目录

- 渲染
  - [Fabric 渲染器](fabric-renderer)
  - [渲染流水线](render-pipeline)
  - [跨平台的实现](xplat-implementation)
  - [视图拍平](view-flattening)
  - [线程模型](threading-model)
- Build Tools
  - [Bundled Hermes](bundled-hermes)
- [术语表](glossary)
