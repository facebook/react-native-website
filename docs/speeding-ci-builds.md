---
id: speeding-ci-builds
title: Speeding Up CI Builds
---

You or your company may have set up a Continuous Integration (CI) environment to test your React Native application.

A fast CI service is important for 2 reasons:

- The more time CI machines are running, the more they cost.
- The longer the CI jobs take to run, the longer the development loop.

It is therefore important to try and minimize the time the CI environment spends building React Native.

## Disable Flipper for iOS

[Flipper](https://github.com/facebook/flipper) is a debugging tool shipped by default with React Native, to help developers debug and profile their React Native applications. However, Flipper is not required in CI: it is very unlikely that you or one of your collegue would have to debug the app built in the CI environment.

For iOS apps, Flipper is built every time the React Native framework is built and it may require some time to build, and this is time you can save.

Starting from React Native 0.71, we introduced a new flag in the template's Podfile: the [`NO_FLIPPER` flag](https://github.com/facebook/react-native/blob/main/packages/react-native/template/ios/Podfile#L20).

By default, the `NO_FLIPPER` flag is not set, therefore Flipper will be included by default in your app.

You can specify `NO_FLIPPER=1` when installing your iOS pods, to instruct React Native not to install Flipper. Typically, the command would look like this:

```shell
# from the root folder of the react native project
NO_FLIPPER=1 bundle exec pod install --project-directory=ios
```

Add this command in your CI environment to skip the installation of Flipper dependencies and thus saving time and money.

### Handle Transitive Dependencies

Your app may be using some libraries which depends on the Flipper pods. If that's your case, disabling flipper with the `NO_FLIPPER` flag may not be enough: your app may fail to build in this case.

The proper way to handle this case is to add a custom configuration for react native, instructing the app to properly install the transitive dependency. To achieve that:

1. If you don't have it already, create a new file called `react-native.config.js`.
2. Exclude explicitly the transitive dependency from the `dependencies` when the flag is turned on.

For example, the `react-native-flipper` library is an additional library that depends on Flipper. If your app uses that, you need to exclude it from the dependencies. Your `react-native.config.js` would look like this:

```js title="react-native.config.js"
module.exports = {
  // other fields
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? {'react-native-flipper': {platforms: {ios: null}}}
      : {}),
  },
};
```
