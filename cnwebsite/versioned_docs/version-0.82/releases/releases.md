---
id: releases
title: 发布概览
---

import ReleasesTable from '@site/src/components/releases/ReleasesTable';

React Native 的新版本**每两个月**发布一次，通常每年会有六（6）个新的次版本。

以下是最近和即将发布的 React Native 版本的时间表和当前状态：

<ReleasesTable />

表格中呈现的不同支持级别定义如下：

- **Future（未来）**
  - 在新版本分支被切出后，创建新的候选版本（Release Candidates）以允许社区测试即将到来的版本非常重要。新的 RC 版本会以很快的节奏发布，只要可行就会立即发布。
- **Active（活跃）**
  - 处于活跃支持中的稳定版本会频繁接收更新。最新稳定版具有最高优先级，在其稳定周期开始时（.0 版本发布后），会尽快进行多次补丁以稳定版本，并确保社区获得良好的升级体验。
- **End of Cycle（周期结束）**
  - 处于此支持级别的版本将接收较少的补丁，除非需要解决一些重要的回归问题。一旦下一个版本成为新的最新稳定版，在周期结束的版本移至不受支持之前，将产生最后一个补丁版本，其中包含最新收到的挑选请求。
- **Unsupported（不受支持）**
  - 当版本处于不受支持阶段时，不会有新的版本发布。只有非常重要的回归可能会创建此规则的例外；建议使用不受支持版本的代码库尽快升级。

## 对稳定性的承诺

为了支持用户升级 React Native 版本，我们承诺维护**最新的 3 个次版本系列**（例如，当 0.78 是最新版本时，维护 0.78.x、0.77.x 和 0.76.x）。

对于这些版本，我们将定期发布更新和错误修复。

您可以在 [react-native-releases 工作组](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md)上阅读更多关于我们的支持政策。

有关我们的版本控制以及我们认为什么是破坏性变更的更多信息，请访问我们的[版本策略](./releases/versioning-policy)页面。
