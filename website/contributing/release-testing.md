---
id: release-testing
title: How to test a release candidate
---

## Pre-requisites

- Have clone of `react-native` repo and be on the release candidate branch.

  ```bash
  # Checkout relevant branch
  react-native$ git checkout 0.66-stable
  react-native$ yarn install

  # I needed a .watchmanconfig because `npm start` would fail without it.
  react-native$ echo '{}' > .watchmanconfig
  ```

- Have Android and iOS development environment set-up. Follow instructions for macOS/iOS and macOS/Android from the [Environment Setup](/docs/environment-setup) guide.

  ### Additional steps for Android
  - Gradle should now install [the appropriate ndk](https://github.com/facebook/react-native/blob/31b64c2615f8af547b68aa6ccaaa244b9c5d3932/template/android/build.gradle#L9). Verify that you have in your path the `ANDROID_NDK` variable, pointing to it.
  - In case you are on macOS Catalina (or higher), you might also need to run `sudo xattr -r -d com.apple.quarantine /path/to/ndk` to avoid the e2e script to fail. That said, this should not happen anymore since from NDK 21 and higher the Android team started signing the NDK.\*

## Test Dimensions

Covered by running `test-manual-e2e.sh`, see [issue](https://github.com/facebook/react-native/issues/33015) about supporting those "manual" cases.

| Variant          | RNTester                 | Template App             |
| ---------------- | ------------------------ | ------------------------ |
| Android - JSC    | via `test-manual-e2e.sh` | via `test-manual-e2e.sh` |
| Android - Hermes | via `test-manual-e2e.sh` | manual                   |
| iOS - JSC        | via `test-manual-e2e.sh` | via `test-manual-e2e.sh` |
| iOS - Hermes     | via `test-manual-e2e.sh` | manual                   |

## Test Checklist

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
| **Tested - Android**         |                         |
| Fast Refresh                 | ✅/🚨/🙅‍♂️                |
| Debug/dev build on Emulator  | ✅/🚨/🙅‍♂️                |
| Debug/dev build on Device    | ✅/🚨/🙅‍♂️                |
| Production build             | ✅/🚨/🙅‍♂️                |
| Chrome remote debugger       | ✅/🚨/🙅‍♂️                |
| Hermes debugger              | ✅/🚨/🙅‍♂️                |
| Flipper debugger             | ✅/🚨/🙅‍♂️                |

## Steps

1. Delete `RNTester` and `RNTestProject` from your Android emulator and iOS simulator if leftover from previous test.
2. Remove any temporary files:
   ```bash
    git clean -fdx
   ```

3. Install dependencies:
   ```bash
    yarn install
    pushd packages/rn-tester
    pod install --repo-update
    popd
   ```

4. Go through **Test Checklist** for variants supported by `test-manual-e2e` script:

    ```bash
    # This will run you through the different variants in Test Dimensions table
    react-native$ ./scripts/test-manual-e2e.sh
    ```

5. Go through **Test Checklist** for Hermes enabled template app.

  :::info

  Note: Script will install template app at `/tmp/RNTestProject`.

  :::
- Enable Hermes for Android template app, clean, build and go through [Test Checklist](#test-checklist).
  
  ```bash
  # Update `/tmp/RNTestProject/android/app/build.gradle` to `enableHermes`
  project.ext.react = [
     enableHermes: true,  // clean and rebuild if changing
  ]

  # Clean and rebuild
  /tmp/RNTestProject/android$ ./gradlew clean
  /tmp/RNTestProject$ npx react-native run-android
  ```

- Enable Hermes for iOS template app, clean, build and go through [Test Checklist](#test-checklist).

  ```bash
  # Update `/tmp/RNTestProject/ios/Podfile` and then run `pod install`
  use_react_native!(
    :path => config[:reactNativePath],
    # to enable hermes on iOS, change `false` to `true` and then install pods
    :hermes_enabled => true
  )

  # Install pods and run
  /tmp/RNTestProject/ios$ pod install
  /tmp/RNTestProject$ npx react-native run-ios
  ```

## Other dimensions to consider

- Running your iOS project with `--release` configuration.
- Attempting to upload your app to TestFlight.
