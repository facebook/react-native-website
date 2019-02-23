---
id: building-from-source
title: Building React Native from source
---

You will need to build React Native from source if you want to work on a new feature/bug fix, try out the latest features which are not released yet, or maintain your own fork with patches that cannot be merged to the core.

## Android

### Prerequisites

Assuming you have the Android SDK installed, run `android` to open the Android SDK Manager.

Make sure you have the following installed:

1. Android SDK version 28 (compileSdkVersion in [`build.gradle`](https://github.com/facebook/react-native/blob/master/ReactAndroid/build.gradle))
2. SDK build tools version 28.0.3 (buildToolsVersion in [`build.gradle`](https://github.com/facebook/react-native/blob/master/ReactAndroid/build.gradle))
3. Android Support Repository >= 28 (for Android Support Library)
4. Android NDK (download links and installation instructions below)

#### [Point Gradle to your Android SDK](#gradle-android-sdk):

**Step 1:** Set environment variables through your local shell.

Note: Files may vary based on shell flavor. See below for examples from common shells.

* bash: `.bash_profile` or `.bashrc`
* zsh: `.zprofile` or `.zshrc`
* ksh: `.profile` or `$ENV`

Example:

```
export ANDROID_SDK=/Users/your_unix_name/android-sdk-macosx
export ANDROID_NDK=/Users/your_unix_name/android-ndk/android-ndk-r17c
```

**Step 2:** Create a `local.properties` file in the `android` directory of your react-native app with the following contents:

Example:

```
sdk.dir=/Users/your_unix_name/android-sdk-macosx
ndk.dir=/Users/your_unix_name/android-ndk/android-ndk-r17c
```

#### Download links for Android NDK

1. Mac OS (64-bit) - http://dl.google.com/android/repository/android-ndk-r17c-darwin-x86_64.zip
2. Linux (64-bit) - http://dl.google.com/android/repository/android-ndk-r17c-linux-x86_64.zip
3. Windows (64-bit) - http://dl.google.com/android/repository/android-ndk-r17c-windows-x86_64.zip
4. Windows (32-bit) - http://dl.google.com/android/repository/android-ndk-r17c-windows-x86.zip

You can find further instructions on the [official page](https://developer.android.com/ndk/index.html).

### Building the source

#### 1. Installing the fork

First, you need to install `react-native` from your fork. For example, to install the master branch from the official repo, run the following:

```sh
npm install --save github:facebook/react-native#master
```

Alternatively, you can clone the repo to your `node_modules` directory and run `npm install` inside the cloned repo.

#### 2. Adding gradle dependencies

Add `gradle-download-task` as dependency in `android/build.gradle`:

```gradle
...
    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
        classpath 'de.undercouch:gradle-download-task:3.4.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
...
```

#### 3. Adding the `:ReactAndroid` project

Add the `:ReactAndroid` project in `android/settings.gradle`:

```gradle
...
include ':ReactAndroid'

project(':ReactAndroid').projectDir = new File(
    rootProject.projectDir, '../node_modules/react-native/ReactAndroid')
...
```

Modify your `android/app/build.gradle` to use the `:ReactAndroid` project instead of the pre-compiled library, e.g. - replace `implementation 'com.facebook.react:react-native:+'` with `implementation project(':ReactAndroid')`:

```gradle
...
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}'

    implementation project(':ReactAndroid')

    ...
}
...
```

#### 4. Making 3rd-party modules use your fork

If you use 3rd-party React Native modules, you need to override their dependencies so that they don't bundle the pre-compiled library. Otherwise you'll get an error while compiling - `Error: more than one library with package name 'com.facebook.react'`.

Modify your `android/app/build.gradle`, and add:

```gradle
configurations.all {
    exclude group: 'com.facebook.react', module: 'react-native'
}
```

### Building from Android Studio

From the Welcome screen of Android Studio choose "Import project" and select the `android` folder of your app.

You should be able to use the _Run_ button to run your app on a device. Android Studio won't start the packager automatically, you'll need to start it by running `npm start` on the command line.

### Additional notes

Building from source can take a long time, especially for the first build, as it needs to download ~200 MB of artifacts and compile the native code. Every time you update the `react-native` version from your repo, the build directory may get deleted, and all the files are re-downloaded. To avoid this, you might want to change your build directory path by editing the `~/.gradle/init.gradle` file:

```gradle
gradle.projectsLoaded {
    rootProject.allprojects {
        buildDir = "/path/to/build/directory/${rootProject.name}/${project.name}"
    }
}
```

### Troubleshooting

Gradle build fails in `ndk-build`. See the section about `local.properties` file above.

## Testing your Changes

If you made changes to React Native and submit a pull request, all tests will run on your pull request automatically. To run the tests locally, see [Testing your Changes](testing.md).

## Making your changes available

See the [Publishing your own version of react native](publishing.md) for several options to make your changes available for your and other app projects.
