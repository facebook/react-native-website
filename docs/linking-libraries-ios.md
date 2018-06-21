---
id: linking-libraries-ios
title: Linking Libraries (iOS)
---

For most applications, [React Native's Automatic Linking](linking-libraries.md) should be sufficient. In some cases, you will not be able to automatically link, and must link your binaries by hand. For most applications this will mean dragging and dropping a handful of files, as documented below.

### Manual linking

#### Step 1

If the library has native code, there must be a `.xcodeproj` file inside it's folder. Drag this file to your project on Xcode (usually under the `Libraries` group on Xcode);

![](/react-native/docs/assets/AddToLibraries.png)

#### Step 2

Click on your main project file (the one that represents the `.xcodeproj`) select `Build Phases` and drag the static library from the `Products` folder inside the Library you are importing to `Link Binary With Libraries`

![](/react-native/docs/assets/AddToBuildPhases.png)

#### Step 3

Not every library will need this step, what you need to consider is:

_Do I need to know the contents of the library at compile time?_

What that means is, are you using this library on the native side or only in JavaScript? If you are only using it in JavaScript, you are good to go!

If you do need to call it from native, then we need to know the library's headers. To achieve that you have to go to your project's file, select `Build Settings` and search for `Header Search Paths`. There you should include the path to your library. (This documentation used to recommend using `recursive`, but this is no longer recommended, as it can cause subtle build failures, especially with CocoaPods.)

![](/react-native/docs/assets/AddToSearchPaths.png)
