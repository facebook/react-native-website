---
id: release-testing
title: How to Test a Release
---

## Test source in the release branch

These steps needs to be followed by the release crew as part of the release process, to ensure that new versions published have a good level of stability.

### Pre-requisites

- Have a clone of `react-native` repo and be on the release branch (`0.XX-stable`).

  ```bash
  # Checkout relevant branch
  git checkout 0.66-stable

  # Optional: you might need a .watchmanconfig because `npm start` would fail without it.
  echo '{}' > .watchmanconfig
  ```

- Have Android and iOS development environment set-up. Follow instructions for macOS/iOS and macOS/Android from the [Environment Setup](/docs/environment-setup) guide.

  #### Additional steps for Android

  - Gradle should now install [the appropriate NDK](https://github.com/facebook/react-native/blob/main/template/android/build.gradle). Verify that you have in your path the `ANDROID_NDK` variable, pointing to it.
  - In case you are on macOS Catalina (or higher), you might also need to run `sudo xattr -r -d com.apple.quarantine /path/to/ndk` to avoid the e2e script to fail. (_That said, this should not happen anymore since from NDK 21 and higher the Android team started signing the NDK._)

### Steps

1. Delete `RNTester` and `RNTestProject` from your Android emulator and iOS simulator if leftover from previous test.
2. Remove any temporary files from the `react-native` repo:

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

4. Use the `test-manual-e2e` script to test `RNTester` and the template app (`RNTestProject`):

   ```bash
   # This will run you through the different variants in Test Dimensions table
   ./scripts/test-manual-e2e.sh
   ```

5. Turn on Hermes in the `RNTestProject` and ensures it builds successfully.

   - Enable Hermes for Android:

     ```bash
     # Update `/tmp/RNTestProject/android/app/build.gradle` to `enableHermes`
     project.ext.react = [
       enableHermes: true,  // clean and rebuild if changing
     ]

     # Clean and rebuild
     /tmp/RNTestProject/android$ ./gradlew clean
     /tmp/RNTestProject$ npx react-native run-android
     ```

   - Enable Hermes for iOS:

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

### Test Dimensions

Covered by running `test-manual-e2e.sh`, see [issue](https://github.com/facebook/react-native/issues/33015) about supporting those "manual" cases.

| Variant          | RNTester                 | Template App             |
| ---------------- | ------------------------ | ------------------------ |
| Android - JSC    | via `test-manual-e2e.sh` | via `test-manual-e2e.sh` |
| Android - Hermes | via `test-manual-e2e.sh` | manual                   |
| iOS - JSC        | via `test-manual-e2e.sh` | via `test-manual-e2e.sh` |
| iOS - Hermes     | via `test-manual-e2e.sh` | manual                   |

**Note well:** Starting from RN 0.70, Hermes is turned on by default so for the template app JSC will need to be manually tested by switching off Hermes.

### What to test?

Aside from verifying that the building process is successful, once the app spawn by `test-manual-e2e.sh` is up and running, we want to run a series of manual tests to ensure that some core functionalities work, like Fast Refresh and the Flipper debugger.

In the `RNTester` you want to also play around with the app and try different components: some important onces are `Flatlist`, `Image` and the "New Architecture Component" (should be the very last one in the list).

An important element of testing source in the release branch is that this process needs to be preferably be done twice, on two separate machines - there are multiple scenarios in which something might fail on a machine but not on another. By running tests on two computers, we want to reach a step of "double confirmation" that everything works fine.

## Testing an RC on a project - checklist

If you are a [release tester](./release-roles-responsibilities#release-tester-responsibilities), the ask for you is to set as dependency in your app the latest RC available and report in the related "Road to 0.XX" how it went ([example](https://github.com/reactwg/react-native-releases/discussions/26)). To help provide the relevant information, we have prepared this template: you can copy/pasted it in a comment and fill it accordingly.

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
