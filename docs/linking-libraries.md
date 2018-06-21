---
id: linking-libraries
title: Linking Libraries
---

Every app is different, and some apps use device features which others do not. Having every possible feature bundled within React Native would cause your application to be too big, so by default React Native only includes the basics. Using a feature called "static linking", you can add additional native capabilities if your project needs them.

React Native attempts to make static linking as easy as possible using the `react-native link` command, documented below. You can also use the native platform tools to manually link libraries (for [iOS](linking-libraries-ios.md) or [Android](native-modules-android.md)), as you might for a native-only project.

_All the libraries we ship with React Native live in the `Libraries` folder in the root of the repository. Some of them are pure JavaScript, and you only need to `require` them. Other libraries also rely on native code and must be linked._

## Here are the few steps to link your libraries that contain native code

### Automatic linking

#### Step 1

Install a library with native dependencies:

```bash
$ npm install <library-with-native-dependencies> --save
```

> **_Note:_** the `--save` flag is very important for this step. React Native will only link the libraries specified within `dependencies` in your `package.json` file.

#### Step 2

Link your native dependencies:

```bash
$ react-native link
```

Done! All libraries with native dependencies should be successfully linked to your iOS/Android project.

> **_Note:_** If your iOS project is using CocoaPods (contains `Podfile`) and linked library has `podspec` file, then `react-native link` will link library using Podfile. To support non-trivial Podfiles add `# Add new pods below this line` comment to places where you expect pods to be added.

> **_Note:_** It is also possible to manually specify a library to link (instead of all libraries) with `$ npm link <library-with-native-dependencies>`

### Packaging native code with your library

The above is useful for people building apps with React Native, but what if you're building a library for others to use in their apps? By default, `react-native link` will link any libraries contained within the `ios` and `android` folders at the module root into the parent project.

#### Copying assets

To specify that the bundler should copy your custom assets you can pass an array of relative directory paths (not file paths) in the `rnpm.assets` array:

```json
...
"rnpm": {
  "assets": ["./fonts"]
},
...
```
