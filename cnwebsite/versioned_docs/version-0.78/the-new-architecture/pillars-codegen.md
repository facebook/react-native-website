---
id: pillars-codegen
title: Codegen
---

import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

**Codegen** 不算是新架构的主要组成部分，它是一个帮助我们避免编写重复代码的工具。**Codegen** 并非必选项，您仍然可以手写它所生成的代码，但是使用它来生成脚手架代码可以帮您节省不少时间。

React Native 会在每次构建 iOS 或 Android App 时调用 **Codegen**。您只需偶尔手动执行生成代码的脚本，以此声明需要生成哪些类型和文件。比方说，有个常见的场景就是开发 [**TurboModule**](./pillars-turbomodules) 和 [**Fabric 组件**](./pillars-fabric-components)。

本指引将指导您配置 **Codegen**，您将了解如何手动为每个平台调用 **Codegen**，以及它所生成的代码。

# 准备工作

您需要一个用于生成代码的 React Native App，即便您要自己手动调用 **Codegen**。

**Codegen** 代码生成过程与 App 的构建紧密相关，其脚本保存在 `react-native` 的 NPM 包中。

在本指引中，您需要使用 React Native CLI 创建一个工程，如下：

```sh
npx react-native init SampleApp --version 0.70.0
```

:::note 备注

本指引将预设您使用的是 0.70.0 及以上版本。对于之前的版本，Codegen 的配置内容稍有不同。
:::

然后，将调用 **Codegen** 的模块添加为 App 的一个 NPM 依赖：

```sh
yarn add <path/to/your/TurboModule_or_FabricComponent>
```

您可阅读 [TurboModule](pillars-turbomodules) 或 [Fabric 组件](pillars-fabric-components) 的开发章节，了解更多配置信息。

接下来的指引将默认您已经有个配置好的 `TurboModule` 或 `Fabric 组件`。

# iOS

## 运行 Codegen

针对 iOS 平台，需要在构建时调用 Node 脚本以调用 **Codegen** 生成代码。脚本保存在 `MyApp/node_modules/react_native/scripts/` 目录。

您需要运行的脚本文件为 `generate-artifacts.js`，此脚本将在 App 的所有依赖中检索符合特定要求的 JS 文件（查看 [TurboModules](pillars-turbomodules) 和 [Fabric 组件](pillars-fabric-components) 章节，了解更多细节），并生成 App 所需的代码。

您可以在 App 的根目录，执行以下命令调用脚本：

```sh
node node_modules/react_native/scripts/generate-artifacts.js \
    --path SampleApp/ \
    --outputPath <an/output/path> \
```

鉴于 App 内已经配置了 `TurboModules` 或/和 `Fabric 组件` 的依赖，**Codegen** 将找到这些依赖，并生成代码至您指定的路径。

## 生成的代码

假设您在 App 内运行 **Codegen** 并指定输出路径为 `codegen`，生成的目录文件结构如下：

```title="iOS Codegen output"
codegen
└── build
    └── generated
        └── ios
            ├── MyTurboModuleSpecs
            │   ├── MyTurboModuleSpecs-generated.mm
            │   └── MyTurboModuleSpecs.h
            ├── FBReactNativeSpec
            │   ├── FBReactNativeSpec-generated.mm
            │   └── FBReactNativeSpec.h
            ├── RCTThirdPartyFabricComponentsProvider.h
            ├── RCTThirdPartyFabricComponentsProvider.mm
            └── react
                └── renderer
                    └── components
                        ├── MyFabricComponent
                        │   ├── ComponentDescriptors.h
                        │   ├── EventEmitters.cpp
                        │   ├── EventEmitters.h
                        │   ├── Props.cpp
                        │   ├── Props.h
                        │   ├── RCTComponentViewHelpers.h
                        │   ├── ShadowNodes.cpp
                        │   └── ShadowNodes.h
                        └── rncore
                            ├── ComponentDescriptors.h
                            ├── EventEmitters.cpp
                            ├── EventEmitters.h
                            ├── Props.cpp
                            ├── Props.h
                            ├── RCTComponentViewHelpers.h
                            ├── ShadowNodes.cpp
                            └── ShadowNodes.h
```

`codegen` 目录自然是整个结构的根基，里面还有两个以上的嵌套目录：`build/generated`。

然后里面有一个 `ios` 目录，包含了：

- 为每个 TurboModule 单独创建的目录；
- RCTThirdPartyFabricComponentsProvider 的头文件（.h）和实现文件（.mm）；
- 保存了所有 Fabric 组件的基本目录 `react/renderer/components`。

在上面的例子中，里面包含了一个 TurboModule 还有一组 Fabric 组件。里面的组件 `FBReactNativeSpec` 和 `rncore` 都是由 React Native 生成的。这些模块即便您没有使用 TurbuModule 或 Fabric 组件都会自动生成，因为 React Native 需要使用它们来正常运行。

### TurboModules

每个 TurboModule 的目录都包含两个文件：接口文件和实现文件。

接口文件的命名与 TurboModule 相同，里面包含了用于初始化 JSI 接口的方法。

而接口文件的命名另外加上了 -generated 的后缀，里面包含了用于原生平台和 JS 之间交互的逻辑代码。

### Fabric 组件

每个 Fabric 组件目录内都包含了若干个文件。`ShadowNode` 是 Fabric 组件的基本元素，它代表在 React 抽象树上的一个节点。`ShadowNode` 表示的是一个 React 实体，因此它需要传入一些在 `Props` 文件定义的参数。有时候还另外需要一个 `EventEmitter`，它在相应的文件中定义。

此外，**Codegen** 还生成了 `ComponentDescriptor.h` 和 `RCTComponentViewHelpers.h` 文件，前者用于 React Native 和 Fabric 正确获取组件的引用；后者包含了一些辅助函数和协议，用于在原生视图上被 JSI 正确调用。

您可参考[渲染器](/architecture/fabric-renderer)章节，了解更多关于 Fabric 运行机制的细节，

### RCTThirdPartyFabricComponentsProvider

`RCTThirdPartyFabricComponentsProvider` 由接口文件与实现文件组成，用于注册 Fabric 组件。React Native 在运行时通过此注册器获取相应 Fabric 组件的类，一旦 React Native 获取了组件的类，就可以将其进行实例化。

# Android

## 运行 Codegen

针对 Android 平台，生成代码需要执行一个 Gradle 任务。首先，您需要在 Android App 启用新架构，否则 Gradle 将执行失败。

1. 打开 `MyApp/android/gradle.properties`；
1. 将 `newArchEnabled` 由 `false` 修改为 `true`.

之后，打开 `SampleApp/android` 目录并执行命令：

```sh
./gradlew generateCodegenArtifactsFromSchema
```

此命令将在所有 App 导入的项目（包括 App 及其关联的 npm 模块）执行 `generateCodegenArtifactsFromSchema ` 任务，它会将代码生成到相应的 `node_modules/<dependency>` 目录。假如您有一个 Fabric 组件，其 npm 模块命名为 `my-fabric-component`，它的代码会生成在 `SampleApp/node_modules/my-fabric-component/android/build/generated/source/codegen` 目录。

## 生成的代码

一旦 Gradle 任务执行完毕，您就能看到所生成的不同结构的 TurboModule 或 Fabric 组件代码文件。以下标签页展示它们各自的目录文件结构：

<Tabs groupId="android-codegen" queryString defaultValue={constants.defaultNewArchFeature} values={constants.newArchFeatures}>
<TabItem value="turbomodules">

```sh
codegen
├── java
│   └── com
│       └── MyTurbomodule
│           └── MyTurbomodule.java
├── jni
│   ├── Android.mk
│   ├── MyTurbomodule-generated.cpp
│   ├── MyTurbomodule.h
│   └── react
│       └── renderer
│           └── components
│               └── MyTurbomodule
│                   ├── ComponentDescriptors.h
│                   ├── EventEmitters.cpp
│                   ├── EventEmitters.h
│                   ├── Props.cpp
│                   ├── Props.h
│                   ├── ShadowNodes.cpp
│                   └── ShadowNodes.h
└── schema.json
```

</TabItem>
<TabItem value="fabric-components">

```sh
codegen
├── java
│   └── com
│       └── facebook
│           └── react
│               └── viewmanagers
│                   ├── MyFabricComponentManagerDelegate.java
│                   └── MyFabricComponentManagerInterface.java
├── jni
│   ├── Android.mk
│   ├── CMakeLists.txt
│   ├── MyFabricComponent-generated.cpp
│   ├── MyFabricComponent.h
│   └── react
│       └── renderer
│           └── components
│               └── MyFabricComponent
│                   ├── ComponentDescriptors.h
│                   ├── EventEmitters.cpp
│                   ├── EventEmitters.h
│                   ├── Props.cpp
│                   ├── Props.h
│                   ├── ShadowNodes.cpp
│                   └── ShadowNodes.h
└── schema.json
```

</TabItem>
</Tabs>

Java 不能像 Objective-C++ 那样丝滑无缝地执行 C++ 代码。为了确保正常运行，**Codegen** 会在定义了 Java 原生接口的 `jni` 目录，生成一些 Java 和 C++ 之间的胶水代码。

需要注意的是，TurboModule 和 Fabric 组件分别使用不同的构建文件描述符：`Android.mk` 和`CMakeLists.txt`。Android App 将使用这两个描述符构建外部模块。

### TurboModule

`Codegen` 会在 `java` 包中创建一个抽象类，并与 TurboModule 使用相同命名，这个抽象类必须使用 JNI C++ 实现。

接着，C++ 文件将生成在 `jni` 目录。它们和 iOS 平台上的内容一样，里面有一个 `MyTurbomodule.h` 的接口文件，还有一个 `MyTurbomodule-generated.cpp` 的实现文件。前者是一个接口，用于让 React Native 为 TurboModule 初始化 JSI 接口；后者是一个实现文件，里面包含了 JS 与原生平台交互的逻辑代码。

### Fabric 组件

**Codegen** 的 Fabric 组件包含了 `MyFabricComponentManagerInterface.java` 和`MyFabricComponentManagerDelegate.java`，两者在 `java` 包内部。它们由原生的 `MyFabricComponentManager` 实现和调用，以便于在运行时能被正确加载（参考 [Fabric 组件](./pillars-fabric-components) 章节的指引，了解更多相关细节） 。

之后，有一层 JNI C++ 文件用于 Fabric 渲染组件。`ShadowNode` 是 Fabric 组件的基本元素，它代表在 React 抽象树上的一个节点。`ShadowNode` 表示的是一个 React 实体，因此它需要传入一些在 `Props` 文件定义的参数。有时候还另外需要一个 `EventEmitter`，它在相应的文件中定义。

**Codegen** 还创建了 `ComponentDescriptor.h` ，用于正确获取 Fabric 组件对象。
