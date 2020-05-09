---
id: native-modules-setup
title: Native Modules Setup
---

Native modules are usually distributed as npm packages, except that on top of the usual Javascript they will include some native code per platform. To understand more about npm packages you may find [this guide](https://docs.npmjs.com/getting-started/publishing-npm-packages) useful.

To get set up with the basic project structure for a native module we will use the community tool [@react-native-community/bob](https://github.com/react-native-community/bob)\**. You can go ahead further and dive deep into how that library works, for our needs we will only need:

```sh
$ npx @react-native-community/bob create react-native-awesome-module
```

Where `react-native-awesome-module` is the name you would like for the new module. After doing this you will navigate into `react-native-awesome-module` folder and bootstrap the example project:

```sh
$ yarn bootstrap
```

After this is done, you'll be able to start the example app with the following command:

```sh
$ yarn example ios 
// or
$ yarn example android 
```

\** For a less opinionated setup, have a look at the third party tool [create-react-native-module](https://github.com/brodybits/create-react-native-module)

After this, you will be able to continue to [Native Modules (iOS)](native-modules-ios) or [Native Modules (Android)](native-modules-android) to add in some code.
