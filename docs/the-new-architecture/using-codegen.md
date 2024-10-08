# Using Codegen

This guide teaches how to:

- Configure **Codegen**.
- Invoke it manually for each platform.

It also describes the generated code.

## Prerequisites

You always need a React Native app to generate the code properly, even when invoking the **Codegen** manually.

The **Codegen** process is tightly coupled with the build of the app, and the scripts are located in the `react-native` NPM package.

For the sake of this guide, create a project using the React Native CLI as follows:

```bash
npx @react-native-community/cli@latest init SampleApp --version 0.76.0
```

**Codegen** is used to generate the glue-code for your custom modules or components. See the guides for Turbo Native Modules and Fabric Native Components for more details on how to create them.

<!-- TODO: add links -->

## Configuring **Codegen**

**Codegen** can be configured in your app by modifying the `package.json` file. **Codegen** is controlled by a custom field called `codegenConfig`.

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

You can add this snippet to your app and customise the various fields:

- `name:` This is the name that will be used to create files containig your specs. As a convention, It should have the suffix `Spec`, but this is not mandatory.
- `type`: the type of code we need to generate. Allowed values are `modules`, `components`, `all`.
  - `modules:` use this value if you only need to generate code for Turbo Native Modules.
  - `components:` use this value if you only need to generate code for Native Fabric Components.
  - `all`: use this value if you have a mixture of components and modules.
- `jsSrcsDir`: this is the root folder where all your specs live.
- `android.javaPackageName`: this is an android specific setting to let **Codegen** generate the files in a custom package.

When **Codegen** runs, it searches among all the dependencies of the app, looking for JS files that respects some specific conventions, and it generates the required code:

- Turbo Native Modules requires that the spec files are prefixed with `Native`. For example, `NativeLocalStorage.ts` is a valid name for a spec file.
- Native Fabric Components requires that the spec files are suffixed with `NativeComponent`. For example, `WebViewNativeComponent.tx` is a valid name for a spec file.

## Running **Codegen**

The rest of this guide assumes that you have a Native Turbo Module, a Native Fabric Component or both already set up in your project. We also assume that you have valid specification files in the `jsSrcsDir` specified in the `package.json`.

### Android

**Codegen** for Android is integrated with the React Native Gradle Plugin (RNGP). The RNGP contains a task that can be invoked that reads the configurations defined in the `package.json` file and execute **Codegen**. To run the gradle task, first navigate inside the `android `folder of your project. Then run:

```bash
./gradlew generateCodegenArtifactsFromSchema
```

This task invokes the `generateCodegenArtifactsFromSchema` command on all the the imported projects of the app (the app and all the node modules which are linked to it). It generates the code in the corresponding `node_modules/<dependency>` folder. For example, if you have a Fabric Native Component whose Node module is called `my-fabric-component`, the generated code is located in the `SampleApp/node_modules/my-fabric-component/android/build/generated/source/codegen` path. For the app, the code is generated in the `android/app/build/generated/source/codegen` folder.

#### The Generated Code

After running the gradle command above, you will find the codegen code in the `SampleApp/android/app/build` folder. The structure will look like this:

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

The generated code is split in two folders:

- `java` which contains the platform specific code
- `jni` which contains the C++ code required to let JS and Java interac correctly.

In the `java` folder, you can find the Fabric Native component generated code in the `com/facebook/viewmanagers` subfolder.

- the `<nativeComponent>ManagerDelegate.java` contains the methods that the `ViewManager` can call on the custom Native Component
- the `<nativeComponent>ManagerInterface.java` contains the interface of the `ViewManager`.

In the folder whose name was setup in the `codegenConfig.android.javaPackageName`, instead, you can find the abstract class that a Turbo Native Module has to implement to carry out its tasks.

In the `jni` folder, finally, there is all the boilerplate code to connect JS to Android.

- `<codegenConfig.name>.h` this contains the interface of your custom C++ Turbo Native Modules.
- `<codegenConfig.name>-generated.cpp` this contains the glue code of your custom custom C++ Turbo Native Modules.
- `react/renderer/components/<codegenConfig.name>`: this folder contains all the glue-code required by your custom component.

This structure has been generated by using the value `all` for the `codegenConfig.type` field. If you use the value `modules`, expect to see no `react/renderer/components/` folder. If you use the value `components`, expect not to see any of the other files.

### iOS

**Codegen** for iOS relies on some Node scripts that are invoked during the build process. The scripts are located in the `SampleApp/node_modules/react-native/scripts/` folder.

The main script is the `generate-Codegen-artifacts.js` script. To invoke the script, you can run this command from the root folder of your app:

```bash
node node_modules/react-native/scripts/generate-Codegen-artifacts.js \
    --path <path/to/your/app> \
    --outputPath <an/output/path> \
    --targetPlatform <android | ios>
```

where:

- `--path` is the path to the root folder of your app.
- `--outputPath` is the destination where **Codegen** will write the generated files.
- `--targetPlatform` is the platform you'd like to generate the code for.

#### The Generated Code

Running the script with these arguments:

```shell
node node_modules/react-native/scripts/generate-Codegen-artifacts.js \
    --path . \
    --outputPath ios/ \
    --targetPlatform ios
```

Will generate these files in the `ios/build` folder:

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

Part of these generated files are used by React Native in the Core. Then there are a set of files which contains the same name you specified in the package.json `codegenConfig.name` field.

- `<codegenConfig.name>/<codegenConfig.name>.h`: this contains the interface of your custom iOS Turbo Native Modules.
- `<codegenConfig.name>/<codegenConfig.name>-generated.mm`: this contains the glue code of your custom iOS Turbo Native Modules.
- `<codegenConfig.name>JSI.h`: this contains the interface of your custom C++ Turbo Native Modules.
- `<codegenConfig.name>JSI-generated.h`: this contains the glue code of your custom custom C++ Turbo Native Modules.
- `react/renderer/components/<codegenConfig.name>`: this folder contains all the glue-code required by your custom component.

This structure has been generated by using the value `all` for the `codegenConfig.type` field. If you use the value `modules`, expect to see no `react/renderer/components/` folder. If you use the value `components`, expect not to see any of the other files.
