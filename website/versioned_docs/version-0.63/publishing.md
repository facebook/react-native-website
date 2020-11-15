---
id: publishing-forks
title: Publish your own version of react native
---

## TL;DR

There is a docker image that helps you build the required Android sources without installing any additional tooling (other than [Docker](https://docs.docker.com/install/), which can be committed to a git branch as a fully functional React Native fork release.

Run this from a fork of the React Native [repo](https://github.com/facebook/react-native).

```
git checkout -d release/my-react-native-release
docker run --rm --name rn-build -v $PWD:/pwd -w /pwd reactnativecommunity/react-native-android /bin/sh -c "./gradlew installArchives"
git add android --force
git commit -a -m 'my react native forked release'
git push
```

Install it in your app project package.json.

```
"dependencies": {
    ...
    "react-native": "myName/react-native#release/my-react-native-release"
}
```

## Rationale

The recommended approach to working with React Native is to always update to the latest version. No support is provided on older versions and if you run into issues the contributors will always ask you to upgrade to the latest version before even looking at your particular issue. Sometimes, though, you are temporarily stuck on an older React Native version, but you require some changes from newer versions urgently (bugfixes) without having to do a full upgrade right now. This situation should be short lived by definition and once you have the time, the real solution is to upgrade to the latest version.

With this goal of a shortlived fork of React Native in mind, you can publish your own version of React Native. The facebook/react-native repository contains all the dependencies required to be used directly as a git dependency, except for the Android React Native library binary (.aar).

## Building

This binary needs to become available in your project's `node_modules/react-native/android` folder or directly in your gradle dependency of your Android app. You can achieve this in one of two ways: Git dependency branch, Android binary dependency through Maven.

To build the .aar React Native library, you can follow the steps to [build from source](https://github.com/facebook/react-native/wiki/Building-from-source#android) first to install all required tooling. Then to build the actual library, you can run the following in the root of your react-native checkout:

```$bash
./gradlew :ReactAndroid:installArchives --no-daemon
```

If you don't want to install the required toolchain for building from source, you can use a prebuilt docker image to create a react native binary;

```
docker run --rm --name rn-build -v $PWD:/pwd -w /pwd reactnativecommunity/react-native-android /bin/sh -c "./gradlew installArchives"
```

If you haven't used the Android NDK before or if you have a NDK version not exactly matching the required version for building React Native, this is the recommended approach.

The resulting binary can be made available to app projects in one of the two ways described below.

### Publishing to Maven/Nexus

Upload the binaries from the `android` folder to maven and point your Android app project gradle dependency for React Native to your Maven/Nexus dependency.

### Publishing to a git fork dependency

Instead of uploading to Maven/Nexus, you can add the binaries built in the previous steps to git, by changing the .gitignore and committing the binaries to your forked branch. This allows you to make your fork into a functioning git dependency for React Native app projects.

If you have changes that you want to actually merge to React Native, make them on another branch first and open a PR. To start making your dependency branch, make sure you are on a 'release/my-forked-release' branch, then merge any commits that you need from yourself or others into this branch. This release branch should never be merged into any other branch.

```$bash
# create .aar, then:
git add android --force
git commit -m 'my release commit'
git push
```

Now you can use this branch as a git dependency in your app project, by pointing your package.json dependency to this branch:

```
"dependencies": {
    ...
    "react-native": "my-name/react-native#release/my-forked-release,
    ...
}
```

No other modifications to your dependencies should be necessary for your native changes to be included in your project.
