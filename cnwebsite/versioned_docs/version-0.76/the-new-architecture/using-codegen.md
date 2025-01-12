# 使用 Codegen

本指南将教你如何：

- 配置 Codegen。
- 手动为每个平台调用它。

它还描述了生成的代码。

## 前提条件

你总是需要一个 React Native 应用来正确生成代码，即使手动调用 Codegen。

Codegen 过程与应用的构建紧密耦合，脚本位于 `react-native` NPM 包中。

为了本指南，创建一个使用 React Native CLI 的项目，如下所示：

```bash
npx @react-native-community/cli@latest init SampleApp --version 0.76.0
```

**Codegen** 用于生成自定义模块或组件的粘合代码。有关如何创建它们的更多详细信息，请参阅 Turbo Native 模块和 Fabric Native 组件的指南。

<!-- TODO: add links -->

## 配置 Codegen

你可以通过修改 `package.json` 文件来配置 Codegen。Codegen 由一个名为 `codegenConfig` 的自定义字段控制。

```json title="package.json"
  "codegenConfig": {
    "name": "<SpecName>",
    "type": "<types>",
    "jsSrcsDir": "<source_dir>",
    "android": {
      "javaPackageName": "<java.package.name>"
    }
  },
```

你可以将此片段添加到你的应用中，并自定义各个字段：

- `name:` 这是用于创建包含规范的文件的名称。按照惯例，它应该有后缀 `Spec`，但这不是必须的。
- `type`: 我们需要生成的代码类型。允许的值是 `modules`, `components`, `all`。
  - `modules:` 如果你只需要为 Turbo 原生模块生成代码，请使用此值。
  - `components:` 如果你只需要为原生 Fabric 组件生成代码，请使用此值。
  - `all`: 如果你有组件和模块的混合，请使用此值。
- `jsSrcsDir`: 这是所有规范所在的根文件夹。
- `android.javaPackageName`: 这是 Android 特有的设置，让 Codegen 在自定义包中生成文件。

当 Codegen 运行时，它会在应用的所有依赖项中搜索遵循某些特定约定的 JS 文件，并生成所需的代码：

- Turbo 原生模块要求规范文件以 `Native` 开头。例如，`NativeLocalStorage.ts` 是一个有效的规范文件名。
- 原生 Fabric 组件要求规范文件以 `NativeComponent` 结尾。例如，`WebViewNativeComponent.tx` 是一个有效的规范文件名。

## 运行 Codegen

本指南的其余部分假设你已经在项目中设置了一个原生 Turbo 模块、一个原生 Fabric 组件或两者都有。我们还假设你已经在 `package.json` 中指定了 `jsSrcsDir` 的有效规范文件。

### Android

Android 的 Codegen 与 React Native Gradle 插件（RNGP）集成。RNGP 包含一个可以调用的任务，该任务读取 `package.json` 文件中定义的配置并执行 Codegen。要运行 gradle 任务，首先导航到项目的 `android` 文件夹。然后运行：

```bash
./gradlew generateCodegenArtifactsFromSchema
```

此任务调用 `generateCodegenArtifactsFromSchema` 命令，该命令在应用的所有导入项目（应用和所有链接到它的节点模块）中执行。生成的代码位于相应的 `node_modules/<dependency>` 文件夹中。例如，如果你有一个原生 Fabric 组件，其节点模块名为 `my-fabric-component`，生成的代码位于 `SampleApp/node_modules/my-fabric-component/android/build/generated/source/codegen` 路径。对于应用，代码生成在 `android/app/build/generated/source/codegen` 文件夹中。

#### 生成的代码

运行上述 gradle 命令后，你将在 `SampleApp/android/app/build` 文件夹中找到 Codegen 代码。结构将如下所示：

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

- `java` 包含平台特定的代码
- `jni` 包含 C++ 代码，以让 JS 和 Java 正确交互。

在 `java` 文件夹中，你可以找到原生 Fabric 组件生成的代码，位于 `com/facebook/viewmanagers` 子文件夹中。

- `<nativeComponent>ManagerDelegate.java` 包含 `ViewManager` 可以调用的方法。
- `<nativeComponent>ManagerInterface.java` 包含 `ViewManager` 的接口。

在 `jni` 文件夹中，最后是所有连接 JS 和 Android 的样板代码。

- `<codegenConfig.name>.h` this contains the interface of your custom C++ Turbo Native Modules.
- `<codegenConfig.name>-generated.cpp` 包含自定义 C++ Turbo 原生模块的粘合代码。
- `react/renderer/components/<codegenConfig.name>`: 包含自定义组件所需的粘合代码。

此结构是通过使用 `codegenConfig.type` 字段的值 `all` 生成的。如果你使用 `modules` 值，期望看不到 `react/renderer/components/` 文件夹。如果你使用 `components` 值，期望看不到其他文件。

### iOS

iOS 的 **Codegen** 依赖于一些在构建过程中调用的 Node 脚本。这些脚本位于 `SampleApp/node_modules/react-native/scripts/` 文件夹中。

主脚本是 `generate-Codegen-artifacts.js` 脚本。要调用该脚本，可以从应用的根文件夹运行以下命令：

```bash
node node_modules/react-native/scripts/generate-Codegen-artifacts.js \
    --path <path/to/your/app> \
    --outputPath <an/output/path> \
    --targetPlatform <android | ios>
```

其中：

- `--path` 是应用根文件夹的路径。
- `--outputPath` 是 **Codegen** 写入生成文件的目标路径。
- `--targetPlatform` 是你希望生成代码的平台。

#### 生成的代码

使用这些参数来运行：

```shell
node node_modules/react-native/scripts/generate-Codegen-artifacts.js \
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

这些生成的文件中的一部分被 React Native 核心使用。然后有一组文件，其名称与你在 `package.json` 中指定的 `codegenConfig.name` 字段相同。

- `<codegenConfig.name>/<codegenConfig.name>.h`: 包含自定义 iOS Turbo 原生模块的接口。
- `<codegenConfig.name>/<codegenConfig.name>-generated.mm`: 包含自定义 iOS Turbo 原生模块的粘合代码。
- `<codegenConfig.name>JSI.h`: 包含自定义 C++ Turbo 原生模块的接口。
- `<codegenConfig.name>JSI-generated.h`: 包含自定义 C++ Turbo 原生模块的粘合代码。
- `react/renderer/components/<codegenConfig.name>`: 此文件夹包含自定义组件所需的粘合代码。

此结构是通过使用 `codegenConfig.type` 字段的值 `all` 生成的。如果你使用 `modules` 值，期望看不到 `react/renderer/components/` 文件夹。如果你使用 `components` 值，期望看不到其他文件。
