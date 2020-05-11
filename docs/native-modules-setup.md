---
id: native-modules-setup
title: Native Modules Setup
---

Native modules are usually distributed as npm packages, except that on top of the usual Javascript they will include some native code per platform. To understand more about npm packages you may find [this guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) useful.

To get set up with the basic project structure for a native module we will use the community tool called [Bob](https://github.com/react-native-community/bob). You can go ahead further and dive deep into how that library works, but for our needs we will only execute the basic `create` script:

```sh
npx @react-native-community/bob create react-native-awesome-module
```

Where `react-native-awesome-module` is the name you would like for the new module. After doing this you will navigate into `react-native-awesome-module` folder and bootstrap the example project by running:

```sh
yarn bootstrap
```

When the bootstrap is done, you will be able to start the example app by executing one of the following commands:

```sh
# Android app
yarn example android
# iOS app
yarn example ios
```

When all steps above are done, you will be able to continue with [Android Native Modules](native-modules-android) or [iOS Native Modules](native-modules-ios) guides to add in some code.

> For a less opinionated setup, have a look at the third party tool [create-react-native-module](https://github.com/brodybits/create-react-native-module).
