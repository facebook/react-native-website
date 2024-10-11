# Create a Library for Your Module

One of the foundational principles of software engineering is not to reinvent the wheel. Every programming language is full of libraries that solve recurrent problems and that other engineers can reuse to solve the same problems in their apps.

The same holds for React Native: there are hundreds of React Native libraries that might help you with your app. We collect React Native libraries in the [`reactnative.directory`](https://reactnative.directory) website, and this is a great resource to bookmark for every React Native developer.

Sometimes, you might be working on a module that is worth extracting in a separate library for code reuse. This can be a library that you want to reuse in all your apps, a library that you want to distribute to the ecosystem as an open source component, or even a library you'd like to sell.

In this guide, you'll learn:

- how to extract a module into a library
- how to use the new library as a local module
- how to distribute the library using NPM

## Extract the Module into a Library

The React native community came up with an amazing tool that can help us extracting an existing module into a library: the [`create-react-native-library`](https://callstack.github.io/react-native-builder-bob/create) tool. This tool creates all the scaffolding code to create a new library: all the configuration files and all files required by the various platforms. It also comes with a nice interactive menu to guide you through the creation of the library.

### 1. Create a Library

1. Start the creation process by running the command:

```sh
npx create-react-native-library@latest <Name of Your Library>
```

2. Add a name for your module. It must be a valid npm name, so it should be all lowercase. You can use `-` to separate words.
3. Add a description for the package.
4. Continue filling the form until you reach the question _"What type of library do you want to develop?"_
   ![What type of Library](/docs/assets/what-library.png)
5. For the sake of this guide, select the _Turbo module_ option
6. Then, you can choose whether you want a library that access the platform (Kotlin & Objective-C) or a sahred C++ library (C++ for Android and iOS). We are going to explore both: click [here](#kotlin--objective-c) for the platform one, or [here](#c++-library) for the C++ one
7. Finally, select the `Test App` as last option. This option creates the library with a separate app already configured within the library folder.

#### Kotlin & Objective-C

#### C++ Library

If you chose the C++ Library at step 6 of the interactive guide, the folder that has been created will look like this in Visual Studio Code:

![C++VisualStudio](/docs/assets/c++visualstudio code)

Feel free to explore the code that has been created for you. However, the most important parts for a C++ library are:

- The `cpp` folder: this is where we are going to write our C++ code.
- The `src` forder: this is where the JS code lives.

The `package.json` is already configured with all the information that we provided to the `create-react-native-library` tool, including the name and the description of the package. Notice that the `package.json` is also already configured to run codegen.

```json
  "codegenConfig": {
    "name": "RN<your module name>Spec",
    "type": "all",
    "jsSrcsDir": "src",
    "outputDir": {
      "ios": "ios/generated",
      "android": "android/generated"
    },
    "android": {
      "javaPackageName": "com.nativesamplemodule"
    }
  },
```

Finally the library contains already all the infrastruction to let the library be linked with iOS and Android.

### 2. Copy the Code over from Your App

The rest of the guide assumes that you have a local Turbo Native Module in your app, created following the guidelines shown in the other guides in the website.

1. Move the code you have in the `specs` folder in your app into the `src` folder created by the `create-react-native-library` folder.
2. Copy the native module over:

- Replace the code in the `android/src/main/java/com/<name-of-the-module>` with the code you wrote in the app for your native module, if any.
- Replace the code in the `ios` folder with the code you wrote in your app for your native module, if any.
- Replace the code in the `cpp` folder with the code you wrote in your app for your native module, if any.

3. Update all the references from the previous spec name (for example from `AppSpec`) to the new spec name, the one that is defined in the `codegenConfig` field of the library's `package.json`.
   That's it! You have moved all the required code out of your app and in a separate library.

## Use the Library as a Local Module.

Now that you have created your library, you can import it in your app by running the command:

```sh
yarn add <path/to/local/library>
```

Make sure that the path you use is the folder that contains the library's `package.json`.

If you choose **Kotlin & Objective-C** in step 6, the library should work out of the box for your Android and iOS app.

If you choose **C++ for Android and iOS** in step 6, it requires to register the C++ Turbomodule

1. In Xcode, open the `AppDelegate.mm` file
2. Modify it as it follows:

```diff
#import <React/RCTBundleURLProvider.h>
+ #import <RCTAppDelegate+Protected.h>
+ #import <LibraryName/ModuleHeaderFile.h>

// ...
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

+- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
+                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
+{
+  if (name == "<Name of your module>") {
+    return std::make_shared<facebook::react::<Type of your module>>(jsInvoker);
+  }
+
+  return [super getTurboModule:name jsInvoker:jsInvoker];
+}

@end
```

These steps are similar to the ones we show in the [_Pure C++ Turbo Native Modules_](/docs/the-new-architecture/pure-cxx-modules.md) guide to register a module in the AppDelegate.

Now, you can finally test the library in your app. Modify the `App.tsx` file as follows:

```diff
+ import <YourNativeModule> from '<library-name>/src/index'

//...

+ <YourNativeModule>.<nativeModuleMethod>
```

Notice that, being a local module that has not been built, you might have to reach out to the `src` folder to use the `index.ts` file.

## Publish the Library on NPM.

The setup to publish everything on NPM is already in place, thanks to `create-react-native-library`.

1. Install the dependencies in your module `yarn install`.
2. Build the library running `yarn prepare`.
3. Release it with `yarn release`.

After a while, you'll find your library on npm. To verify that, run:

```bash
npm view <package.name>
```

where `package.name` is the `name` you set up in the `package.json` file during the initialization of the library.
