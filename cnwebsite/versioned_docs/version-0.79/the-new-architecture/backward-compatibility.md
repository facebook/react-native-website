---
id: backward-compatibility
title: 向后兼容的意义
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

创建一个向后兼容的模块很重要，这样可以实现在**旧架构**和**新架构**中都能工作的库。并不是所有用户都会立刻转到新架构，最好在他们使用旧架构时仍然保持兼容。

创建一个良好的向后兼容模块的要点是尽可能减少迁移到新版本所需的更改。这样用户就可以平稳地转到新版本，并在准备好时迁移到新架构，理想情况下最好只用输入一行不同的命令。

为了实现这一结果，我们必须对**TurboModule**和**Fabric Component**的配置进行几次更改。下面是需要的步骤：

1. **更新安装配置**，以避免使用旧架构不需要的代码。
2. **更新代码**，以支持两个架构。Android 和 iOS 构建流水线都提供了一种方法，使得库能够与正确的 React Native 架构一起编译。
3. **配置加载正确实现的规范**，以便 JavaScript 层在可用时利用新架构。

:::info 提示
接下来的部分要求您熟悉**新架构**的[支柱](pillars)。
:::

- 要创建向后兼容的**TurboModule**，请遵循此[指南](backward-compatibility-turbomodules)。
- 要创建向后兼容的**Fabric 组件**, 请遵循此[指南](backward-compatibility-fabric-components)。
