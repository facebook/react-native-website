import CodeBlock from '@theme/CodeBlock';
import {getCurrentVersion} from '@site/src/getCurrentVersion';

# 使用 Codegen

本指南教您如何：

- 配置 **Codegen**。
- 为每个平台手动调用它。

它还描述了生成的代码。

## 前提条件

即使手动调用 **Codegen**，您也始终需要一个 React Native 应用来正确生成代码。

**Codegen** 过程与应用的构建紧密耦合，脚本位于 `react-native` NPM 包中。

为了本指南的目的，使用 React Native CLI 创建一个项目，如下所示：

<CodeBlock language="bash" title="shell">
{`npx @react-native-community/cli@latest init SampleApp --version ${getCurrentVersion()}`}
</CodeBlock>

**Codegen** 用于为您的自定义模块或组件生成粘合代码。有关如何创建它们的更多详细信息，请参阅 Turbo Native Modules 和 Fabric Native Components 的指南。

## 配置 **Codegen**

可以通过修改 `package.json` 文件来配置应用中的 **Codegen**。**Codegen** 由一个名为 `codegenConfig` 的自定义字段控制。

```json title="package.json"
  "codegenConfig": {
    "name": "<SpecName>",
    "type": "<types>",
    "jsSrcsDir": "<source_dir>",
    "android": {
      "javaPackageName": "<java.package.name>"
    },
    "ios": {
      "modules": {
        "TestModule": {
          "className": "<iOS-class-implementing-the-RCTModuleProvider-protocol>",
          "unstableRequiresMainQueueSetup": false,
          "conformsToProtocols": ["RCTImageURLLoader", "RCTURLRequestHandler", "RCTImageDataDecoder"],
        }
      },
      "components": {
        "TestComponent": {
          "className": "<iOS-class-implementing-the-component>"
        }
      }
    }
  },
```

您可以将此代码片段添加到您的应用中并自定义各个字段：

- `name:` Codegen 配置的名称。这将自定义 codegen 输出：文件名和代码。
- `type:`
  - `modules:` 仅为模块生成代码。
  - `components:` 仅为组件生成代码。
  - `all`: 为所有内容生成代码。
- `jsSrcsDir`: 所有规范文件所在的根文件夹。
- `android`: Android 的 Codegen 配置（全部可选）：
  - `.javaPackageName`: 配置 Android Java codegen 输出的包名称。
- `ios`: iOS 的 Codegen 配置（全部可选）：
  - `.modules[moduleName]:`
    - `.className`: 此模块的 ObjC 类。或者，如果它是 [纯 C++ 模块](/docs/next/the-new-architecture/pure-cxx-modules)，则为其 `RCTModuleProvider` 类。
    - `.unstableRequiresMainQueueSetup`: 在运行任何 JavaScript 之前，在 UI 线程上初始化此模块。
    - `.conformsToProtocols`: 注释此模块符合以下哪些协议：[`RCTImageURLLoader`](https://github.com/facebook/react-native/blob/00d5caee9921b6c10be8f7d5b3903c6afe8dbefa/packages/react-native/Libraries/Image/RCTImageURLLoader.h#L26-L81)、[`RCTURLRequestHandler`](https://github.com/facebook/react-native/blob/00d5caee9921b6c10be8f7d5b3903c6afe8dbefa/packages/react-native/React/Base/RCTURLRequestHandler.h#L11-L52)、[`RCTImageDataDecoder`](https://github.com/facebook/react-native/blob/00d5caee9921b6c10be8f7d5b3903c6afe8dbefa/packages/react-native/Libraries/Image/RCTImageDataDecoder.h#L15-L53)。
  - `.components[componentName]`:
    - `.className`: 此组件的 ObjC 类（例如：`TextInput` -> `RCTTextInput`）。

当 **Codegen** 运行时，它会在应用的所有依赖项中搜索，查找符合某些特定约定的 JS 文件，并生成所需的代码：

- Turbo Native Modules 要求规范文件以 `Native` 为前缀。例如，`NativeLocalStorage.ts` 是规范文件的有效名称。
- Native Fabric Components 要求规范文件以 `NativeComponent` 为后缀。例如，`WebViewNativeComponent.ts` 是规范文件的有效名称。

## 运行 **Codegen**

本指南的其余部分假设您的项目中已经设置了 Native Turbo Module、Native Fabric Component 或两者都有。我们还假设您在 `package.json` 中指定的 `jsSrcsDir` 中有有效的规范文件。

### Android

Android 的 **Codegen** 与 React Native Gradle Plugin (RNGP) 集成。RNGP 包含一个可以调用的任务，该任务读取 `package.json` 文件中定义的配置并执行 **Codegen**。要运行 gradle 任务，首先导航到项目的 `android` 文件夹。然后运行：

```bash
./gradlew generateCodegenArtifactsFromSchema
```

此任务在应用的所有导入项目（应用和链接到它的所有 node 模块）上调用 `generateCodegenArtifactsFromSchema` 命令。它在相应的 `node_modules/<dependency>` 文件夹中生成代码。例如，如果您有一个 Fabric Native Component，其 Node 模块名为 `my-fabric-component`，则生成的代码位于 `SampleApp/node_modules/my-fabric-component/android/build/generated/source/codegen` 路径中。对于应用，代码在 `android/app/build/generated/source/codegen` 文件夹中生成。

#### 生成的代码

运行上述 gradle 命令后，您将在 `SampleApp/android/app/build` 文件夹中找到 codegen 代码。结构如下所示：

```
build
└── generated
    └── source
        └── codegen
            ├── java
            │   └── com
            │       ├── facebook
            │       │   └── react
            │       │       └── viewmanagers
            │       │           ├── <nativeComponent>ManagerDelegate.java
            │       │           └── <nativeComponent>ManagerInterface.java
            │       └── sampleapp
            │           └── NativeLocalStorageSpec.java
            ├── jni
            │   ├── <codegenConfig.name>-generated.cpp
            │   ├── <codegenConfig.name>.h
            │   ├── CMakeLists.txt
            │   └── react
            │       └── renderer
            │           └── components
            │               └── <codegenConfig.name>
            │                   ├── <codegenConfig.name>JSI-generated.cpp
            │                   ├── <codegenConfig.name>.h
            │                   ├── ComponentDescriptors.cpp
            │                   ├── ComponentDescriptors.h
            │                   ├── EventEmitters.cpp
            │                   ├── EventEmitters.h
            │                   ├── Props.cpp
            │                   ├── Props.h
            │                   ├── ShadowNodes.cpp
            │                   ├── ShadowNodes.h
            │                   ├── States.cpp
            │                   └── States.h
            └── schema.json
```

生成的代码分为两个文件夹：

- `java` 包含特定于平台的代码
- `jni` 包含让 JS 和 Java 正确交互所需的 C++ 代码。

在 `java` 文件夹中，您可以在 `com/facebook/viewmanagers` 子文件夹中找到 Fabric Native component 生成的代码。

- `<nativeComponent>ManagerDelegate.java` 包含 `ViewManager` 可以在自定义 Native Component 上调用的方法
- `<nativeComponent>ManagerInterface.java` 包含 `ViewManager` 的接口。

在名称在 `codegenConfig.android.javaPackageName` 中设置的文件夹中，您可以找到 Turbo Native Module 必须实现以执行其任务的抽象类。

最后，在 `jni` 文件夹中，有所有将 JS 连接到 Android 的样板代码。

- `<codegenConfig.name>.h` 包含您的自定义 C++ Turbo Native Modules 的接口。
- `<codegenConfig.name>-generated.cpp` 包含您的自定义 C++ Turbo Native Modules 的粘合代码。
- `react/renderer/components/<codegenConfig.name>`: 此文件夹包含您的自定义组件所需的所有粘合代码。

此结构是通过为 `codegenConfig.type` 字段使用值 `all` 生成的。如果您使用值 `modules`，则不会看到 `react/renderer/components/` 文件夹。如果您使用值 `components`，则不会看到任何其他文件。

### iOS

iOS 的 **Codegen** 依赖于在构建过程中调用的一些 Node 脚本。这些脚本位于 `SampleApp/node_modules/react-native/scripts/` 文件夹中。

主脚本是 `generate-codegen-artifacts.js` 脚本。要调用脚本，您可以从应用的根文件夹运行此命令：

```bash
node node_modules/react-native/scripts/generate-codegen-artifacts.js

Usage: generate-codegen-artifacts.js -p [path to app] -t [target platform] -o [output path]

Options:
      --help            Show help                                      [boolean]
      --version         Show version number                            [boolean]
  -p, --path            Path to the React Native project root.        [required]
  -t, --targetPlatform  Target platform. Supported values: "android", "ios",
                        "all".                                        [required]
  -o, --outputPath      Path where generated artifacts will be output to.
```

其中：

- `--path` 是应用根文件夹的路径。
- `--outputPath` 是 **Codegen** 将写入生成文件的目标位置。
- `--targetPlatform` 是您想要为其生成代码的平台。

#### 生成的代码

使用以下参数运行脚本：

```shell
node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ios/ \
    --targetPlatform ios
```

将在 `ios/build` 文件夹中生成这些文件：

```
build
└── generated
    └── ios
        ├── <codegenConfig.name>
        │   ├── <codegenConfig.name>-generated.mm
        │   └── <codegenConfig.name>.h
        ├── <codegenConfig.name>JSI-generated.cpp
        ├── <codegenConfig.name>JSI.h
        ├── FBReactNativeSpec
        │   ├── FBReactNativeSpec-generated.mm
        │   └── FBReactNativeSpec.h
        ├── FBReactNativeSpecJSI-generated.cpp
        ├── FBReactNativeSpecJSI.h
        ├── RCTModulesConformingToProtocolsProvider.h
        ├── RCTModulesConformingToProtocolsProvider.mm
        └── react
            └── renderer
                └── components
                    └── <codegenConfig.name>
                        ├── ComponentDescriptors.cpp
                        ├── ComponentDescriptors.h
                        ├── EventEmitters.cpp
                        ├── EventEmitters.h
                        ├── Props.cpp
                        ├── Props.h
                        ├── RCTComponentViewHelpers.h
                        ├── ShadowNodes.cpp
                        ├── ShadowNodes.h
                        ├── States.cpp
                        └── States.h
```

其中一些生成的文件被 React Native Core 使用。然后有一组文件包含您在 package.json `codegenConfig.name` 字段中指定的相同名称。

- `<codegenConfig.name>/<codegenConfig.name>.h`: 包含您的自定义 iOS Turbo Native Modules 的接口。
- `<codegenConfig.name>/<codegenConfig.name>-generated.mm`: 包含您的自定义 iOS Turbo Native Modules 的粘合代码。
- `<codegenConfig.name>JSI.h`: 包含您的自定义 C++ Turbo Native Modules 的接口。
- `<codegenConfig.name>JSI-generated.h`: 包含您的自定义 C++ Turbo Native Modules 的粘合代码。
- `react/renderer/components/<codegenConfig.name>`: 此文件夹包含您的自定义组件所需的所有粘合代码。

此结构是通过为 `codegenConfig.type` 字段使用值 `all` 生成的。如果您使用值 `modules`，则不会看到 `react/renderer/components/` 文件夹。如果您使用值 `components`，则不会看到任何其他文件。
