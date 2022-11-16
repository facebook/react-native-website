---
id: release-testing
title: How to Test a Release
---

These steps needs to be followed by the release crew as part of the release process, to ensure that new versions published have a good level of stability.

:::info

An important element of testing source in the release branch is that this process needs to be preferably be done twice, on two separate machines - there are multiple scenarios in which something might fail on a machine but not on another. By running tests on two computers, we want to reach a step of double confirmation that everything works fine.
:::

## Pre-requisites

:::note

Currently, this flow can only be done on macOS machines.

:::

- Have a clone of `react-native` repo and be on the release branch (`0.XX-stable`).

  ```bash
  # Checkout relevant branch
  git checkout 0.66-stable

  # Optional: you might need a .watchmanconfig because `npm start` would fail without it.
  echo '{}' > .watchmanconfig
  ```

- Have Android and iOS development environment set-up. Follow instructions for `React Native CLI quickstart` for macOS/iOS and macOS/Android from the [Environment Setup](/docs/environment-setup) guide.

  #### Additional steps for Android

  - Gradle should now install [the appropriate NDK](https://github.com/facebook/react-native/blob/main/template/android/build.gradle). Verify that you have in your path the `ANDROID_NDK` variable, pointing to it.
  - In case you are on macOS Catalina (or higher), you might also need to run `sudo xattr -r -d com.apple.quarantine /path/to/ndk` to avoid the e2e script to fail. (_That said, this should not happen anymore since from NDK 21 and higher the Android team started signing the NDK._)

## Steps

### Clean up the local state

When testing locally, we want to ensure that we start from a clean slate to avoid caches polluting our testing.

1. Delete `RNTester` and `RNTestProject` from your Android emulator and iOS simulator if leftover from previous test.
2. Remove any temporary files from the `react-native` repo:

   ```bash
    git clean -fdx
   ```

   For `main` branch, and versions of RN >=0.71, you can instead use `yarn test-e2e-local-clean`.

3. Install dependencies:

   ```bash
    yarn install
   ```

### Generating the projects

The local testing for a release consist of running the [test project](https://github.com/facebook/react-native/tree/main/packages/rn-tester) of the react-native repository, `RNTester`, which contains an in-depth list of components implementations, and generating a fresh new project based on the local code, `RNTestProject`, that will simulate accurately how a `react-native init` project will behave.

To generate the the right project with the specific configuration desired, you can use the command

```bash
yarn test-e2e-local [options]
```

Followed by the wanted options:

```bash
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  -t, --target      [choices: "RNTester", "RNTestProject"] [default: "RNTester"]
  -p, --platform                    [choices: "iOS", "Android"] [default: "iOS"]
  -h, --hermes                                         [boolean] [default: true]
```

#### Versions older than 71

You need to use the interactive script run you through the different variants in [Test Dimensions](#test-dimensions):

```bash
./scripts/test-manual-e2e.sh
```

This script will ask you to select which platform and which project you want to test, and then to execute a series of extra steps during the process. Bear in mind, when testing RNTester on Android, you need to start the Android emulator ahead of time or it will fail.

## What to test?

Aside from verifying that the building process is successful, once the app spawn by the script is up and running, we want to run a series of manual tests to ensure that some core functionalities work, like Fast Refresh and the Flipper debugger.

In the `RNTester` you want to also play around with the app and try different components: some important onces are `Flatlist`, `Image` and the "New Architecture Component" (should be the very last one in the list).

### Test Dimensions

To ensure that we cover the most use cases, we need to ensure we test all these different combination of configurations:

- RNTester + iOS + Hermes
- RNTester + iOS + JSC
- RNTester + Android + Hermes
- RNTester + Android + JSC
- RNTestProject + iOS + Hermes
- RNTestProject + iOS + JSC
- RNTestProject + Android + Hermes
- RNTestProject + Android + JSC

:::note

Bear in mind that RNTester project is already onboarded in the new architecture. `RNTestProject` is not - new architecture mode needs to be [enabled](/docs/the-new-architecture/use-app-template#enable-the-new-architecture) and tested separately.
:::

## Testing pre-releases (RC) on production apps

During the Release Candidate (RC) phase of a release cycle, we ask for the community to set as dependency in their apps the latest RC available and report in the related "Road to 0.XX" how it performs ([example](https://github.com/reactwg/react-native-releases/discussions/26)).

To help provide the relevant information, we have prepared this template they can use as blueprint for what is important to test - they can copy/pasted it in a comment and fill it accordingly.

```markdown
| Link to branch:              |                         |
| ---------------------------- | :---------------------- |
| **Project info**             |                         |
| Name                         |                         |
| Starting RN version          | <add me, ex. RN 0.65.1> |
| Hermes on iOS                | yes/no                  |
| Hermes on Android            | yes/no                  |
| **Tested - iOS**             |                         |
| Fast Refresh                 | ✅/🚨/🙅‍♂️                |
| Debug/dev build on Simulator | ✅/🚨/🙅‍♂️                |
| Debug/dev build on Device    | ✅/🚨/🙅‍♂️                |
| Production build             | ✅/🚨/🙅‍♂️                |
| Chrome remote debugger       | ✅/🚨/🙅‍♂️                |
| Hermes debugger              | ✅/🚨/🙅‍♂️                |
| Flipper debugger             | ✅/🚨/🙅‍♂️                |
| Deploy to TestFlight         | ✅/🚨/🙅‍♂️                |
| **Tested - Android**         |                         |
| Fast Refresh                 | ✅/🚨/🙅‍♂️                |
| Debug/dev build on Emulator  | ✅/🚨/🙅‍♂️                |
| Debug/dev build on Device    | ✅/🚨/🙅‍♂️                |
| Production build             | ✅/🚨/🙅‍♂️                |
| Chrome remote debugger       | ✅/🚨/🙅‍♂️                |
| Hermes debugger              | ✅/🚨/🙅‍♂️                |
| Flipper debugger             | ✅/🚨/🙅‍♂️                |
```
