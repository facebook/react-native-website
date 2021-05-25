---
id: native-modules-setup
title: Native Modules Setup
---

Native modules are usually distributed as npm packages, except that on top of the usual JavaScript they will include some native code per platform. To understand more about npm packages you may find [this guide](https://docs.npmjs.com/getting-started/publishing-npm-packages) useful.

To get set up with the basic project structure for a native module we will use a third party tool [create-react-native-module](https://github.com/brodybits/create-react-native-module). You can go ahead further and dive deep into how that library works, for our needs we will only need:

```shell
$ yarn global add create-react-native-module
$ create-react-native-module MyLibrary
```

Where MyLibrary is the name you would like for the new module. After doing this you will navigate into `MyLibrary` folder and install the npm package to be locally available for your computer by doing:

```shell
$ yarn install
```

After this is done you can go to your main react app folder (which you created by doing `npx react-native init MyApp`)

- add your newly created module as a dependency in your package.json
- run `yarn install` to bring it along from your local npm repository.

After this, you will be able to continue to [Native Modules (iOS)](native-modules-ios) or [Native Modules (Android)](native-modules-android) to add in some code. Make sure to read the README.md within your `MyLibrary` Directory for platform-specific instructions on how to include the project.
