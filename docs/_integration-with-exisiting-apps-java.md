## Key Concepts

The keys to integrating React Native components into your Android application are to:

1. Set up React Native dependencies and directory structure.
2. Develop your React Native components in JavaScript.
3. Add a `ReactRootView` to your Android app. This view will serve as the container for your React Native component.
4. Start the React Native server and run your native application.
5. Verify that the React Native aspect of your application works as expected.

## Prerequisites

Follow the React Native CLI Quickstart in the [environment setup guide](environment-setup) to configure your development environment for building React Native apps for Android.

### 1. Set up directory structure

To ensure a smooth experience, create a new folder for your integrated React Native project, then copy your existing Android project to an `/android` subfolder.

### 2. Install JavaScript dependencies

Go to the root directory for your project and create a new `package.json` file with the following contents:

```
{
  "name": "MyReactNativeApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "react-native start"
  }
}
```

Next, make sure you have [installed the Yarn package manager](https://yarnpkg.com/lang/en/docs/install/).

Install the `react` and `react-native` packages. Open a terminal or command prompt, then navigate to the directory with your `package.json` file and run:

```shell
$ yarn add react-native --exact
```

This will print a message similar to the following (scroll up in the yarn output to see it):

> warning "react-native@0.63.4" has unmet peer dependency "react@16.13.1".

This is OK, it means we also need to install React:

```shell
$ yarn add react@version_printed_above
```

Yarn has created a new `node_modules/` folder. This folder stores all the JavaScript dependencies required to build your project.

Add `node_modules/` to your `.gitignore` file.

## Adding React Native to your app

### Configuring Gradle build scripts

Add entries for the local React Native and JSC maven directories to the top-level `build.gradle`. Be sure to add it to the `allprojects` block, above other entries:

```gradle
allprojects {
    repositories {
        maven {
            // All of React Native (JS, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven {
            // Android JSC is installed from npm
            url "$rootDir/../node_modules/jsc-android/dist"
        }
        // ...
        google()
        jcenter()
    }
}
```

> Make sure that the path is correct! You shouldn’t run into any "Failed to resolve: com.facebook.react:react-native:0.x.x" errors after running Gradle sync in Android Studio.

Then, add the React Native and JSC dependencies to your app's `build.gradle` file:

```gradle
dependencies {
    implementation 'androidx.appcompat:appcompat:1.2.0'
    // ...
    // noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:+'  // From node_modules
    // noinspection GradleDynamicVersion
    implementation 'org.webkit:android-jsc:+'  // From node_modules
}
```

> The dynamic version specifier (`+`) will always resolve to the specific version downloaded into `node_modules/`.

#### Enable native modules autolinking

To use the power of [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md), we have to apply it a few places. First add the following entry to `settings.gradle`:

```gradle
apply from: "../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"; applyNativeModulesSettingsGradle(settings)
```

Next add the following entry at the very bottom of the `app/build.gradle`:

```gradle
apply from: "$rootDir/../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"; applyNativeModulesAppBuildGradle(project)
```

### Configuring AndroidManifest.xml

#### Permissions

Next, make sure you have the Internet permission in your `AndroidManifest.xml`:

    <uses-permission android:name="android.permission.INTERNET" />

If you need to access to the `DevSettingsActivity` add to your `AndroidManifest.xml`:

    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />

This is only used in dev mode when reloading JavaScript from the development server, so you can strip this in release builds if you need to.

#### SYSTEM_ALERT_WINDOW for dev menu

If your app is targeting Android `API level 23` or greater, make sure you have the `SYSTEM_ALERT_WINDOW` permission declared for the development build:

    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

This is required for certain features (e.g. "Perf Monitor") in the React Native dev menu to work correctly.

#### Cleartext Traffic (API level 28+)

> Starting with Android 9 (API level 28), cleartext traffic is disabled by default; this prevents your application from connecting to the [Metro bundler][metro]. The changes below allow cleartext traffic in debug builds.

Apply the `usesCleartextTraffic` option to your Debug `AndroidManifest.xml`:

```xml
<!-- ... -->
<application
  android:usesCleartextTraffic="true" tools:targetApi="28" >
  <!-- ... -->
</application>
<!-- ... -->
```

This is not required for Release builds.

To learn more about Network Security Config and the cleartext traffic policy [see this link](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted).

### Code integration

Now we will actually modify the native Android application to integrate React Native.

#### The React Native component

The first bit of code we will write is the actual React Native code for a "Hello World" screen that will be integrated into our application.

Create a file `index.js` in the root of your React Native project.
`index.js` is the starting point for React Native applications, and it is always required. It can be a small file that `require`s other file that are part of your React Native component or application, or it can contain all the code that is needed for it. In our case, we will use a `<Text>` component within a styled `<View>`:

```jsx
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello, World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent(
  'MyReactNativeApp',
  () => HelloWorld
);
```

#### The Magic: `ReactRootView`

Let's add some native code in order to start the React Native runtime and tell it to render our JS component. To do this, we're going to create an `Activity` that creates a `ReactRootView`, starts a React application inside it and sets it as the main content view.

```java
public class MyReactActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SoLoader.init(this, false);

        mReactRootView = new ReactRootView(this);
        List<ReactPackage> packages = new PackageList(getApplication()).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        // Remember to include them in `settings.gradle` and `app/build.gradle` too.

        mReactInstanceManager =
                ReactInstanceManager.builder()
                        .setApplication(getApplication())
                        .setCurrentActivity(this)
                        .setBundleAssetName("index.android.bundle")
                        .setJSMainModulePath("index")
                        .addPackages(packages)
                        .setUseDeveloperSupport(BuildConfig.DEBUG)
                        .setInitialLifecycleState(LifecycleState.RESUMED)
                        .build();
        // The string here (e.g. "MyReactNativeApp") has to match
        // the string in AppRegistry.registerComponent() in index.js
        mReactRootView.startReactApplication(mReactInstanceManager, "MyReactNativeApp", null);

        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

> Make sure the module name in `startReactApplication` matches the app key used in your index.js file (it’s the first argument to the `AppRegistry.registerComponent()` method).

Perform a "Sync Project files with Gradle" operation.

If you are using Android Studio, use `Alt + Enter` to add all missing imports in your MyReactActivity class. Be careful to use your package’s `BuildConfig` and not the one from the `facebook` package.

We need set the theme of `MyReactActivity` to `Theme.AppCompat.Light.NoActionBar` because some React Native UI components rely on this theme.

```xml
<activity
    android:name=".MyReactActivity"
    android:theme="@style/Theme.AppCompat.Light.NoActionBar" />
```

> A `ReactInstanceManager` can be shared by multiple activities and/or fragments. You will want to make your own `ReactFragment` or `ReactActivity` and have a singleton _holder_ that holds a `ReactInstanceManager`. When you need the `ReactInstanceManager` (e.g., to hook up the `ReactInstanceManager` to the lifecycle of those Activities or Fragments) use the one provided by the singleton.

Next, we need to pass some activity lifecycle callbacks to the `ReactInstanceManager` and `ReactRootView`:

```java
@Override
protected void onResume() {
    super.onResume();
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostResume(this, this);
    }
}

@Override
protected void onPause() {
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostPause(this);
    }
    super.onPause();
}

@Override
protected void onDestroy() {
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostDestroy(this);
    }
    if (mReactRootView != null) {
        mReactRootView.unmountReactApplication();
    }
    super.onDestroy();
}
```

We also need to pass back button events to React Native:

```java
@Override
public void onBackPressed() {
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
    } else {
        super.onBackPressed();
    }
}
```

This allows JavaScript to control what happens when the user presses the hardware back button (e.g. to implement navigation). When JavaScript doesn't handle the back button press, your `invokeDefaultOnBackPressed` method will be called. By default this finishes your `Activity`.

Additionally, when integrating Native Modules which use `startActivityForResult`, your Activity needs to pass the result to the `onActivityResult` method of the `ReactInstanceManager` instance:

```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    mReactInstanceManager.onActivityResult(this, requestCode, resultCode, data);
}
```

Finally, we need to hook up the dev menu. On a device, this can be activated by shaking the device, or by pressing the hardware menu button (`Ctrl + M`/`Cmd + M` when using an Android emulator). For both devices and emulators, the dev menu can also be brought up by sending key event 82, which corresponds to the menu key: `adb shell input keyevent 82`.

```java
@Override
public boolean onKeyUp(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
        mReactInstanceManager.showDevOptionsDialog();
        return true;
    }
    return super.onKeyUp(keyCode, event);
}
```

Now your activity is ready to run some JavaScript code.

### Test your integration

You have now done all the basic steps to integrate React Native with your current application. Now we will start the [Metro bundler][metro] to build the `index.bundle` package and the server running on localhost to serve it.

#### 1. Run the packager

To run your app, you need to first start the development server. To do this, run the following command in the root directory of your React Native project:

```shell
$ yarn start
```

#### 2. Run the app

Now build and run your Android app as normal.

Once you reach your React-powered activity inside the app, it should load the JavaScript code from the development server and display:

![Screenshot](/docs/assets/EmbeddedAppAndroid.png)

#### Creating a release build in Android Studio

You can use Android Studio to create your release builds too! It’s as quick as creating release builds of your previously-existing native Android app. There’s one additional step, which you’ll have to do before every release build. You need to execute the following to create a React Native bundle, which will be included with your native Android app:

```shell
$ yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

> Don’t forget to replace the paths with correct ones and create the assets folder if it doesn’t exist.

Now, create a release build of your native app from within Android Studio as usual and you should be good to go!

### Now what?

At this point you can continue developing your app as usual. Refer to our [debugging](debugging) and [deployment](running-on-device) docs to learn more about working with React Native.

[metro]: https://facebook.github.io/metro/
