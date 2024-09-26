import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Key Concepts

The keys to integrating React Native components into your Android application are to:

1. Set up the correct directory structure.
2. Install the necessary NPM dependencies.
3. Adding React Native to your Gradle configuration.
4. Writing the TypeScript code for your first React Native screen.
5. Integrate React Native with your Android code using a ReactActivity.
6. Testing your integration by running the bundler and seeing your app in action.

## Using the Community Template

While you follow this guide, we suggest you to use the [React Native Community Template](https://github.com/react-native-community/template/) as reference. The template contains a **minimal Android app** and will help you understanding how to integrate React Native into an existing Android app.

## Prerequisites

Follow the guide on [setting up your development environment](set-up-your-environment) and using [React Native without a framework](getting-started-without-a-framework) to configure your development environment for building React Native apps for Android.
This guide also assumes you're familiar with the basics of Android development such as creating Activities and editing the `AndroidManifest.xml` file.

## 1. Set up directory structure

To ensure a smooth experience, create a new folder for your integrated React Native project, then **move your existing Android project** to the `/android` subfolder.

## 2. Install NPM dependencies

Go to the root directory and run the following command:

```
wget https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.75-stable/template/package.json
```

This will copy the `package.json` [file from the Community template](https://github.com/react-native-community/template/blob/0.75-stable/template/package.json) to your project.

Next, install the NPM packages by running:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

Installation process has created a new `/node_modules` folder. This folder stores all the JavaScript dependencies required to build your project.

Add `node_modules/` to your `.gitignore` file (here the [Community default one](https://github.com/react-native-community/template/blob/0.75-stable/template/_gitignore)).

## 3. Adding React Native to your app

### Configuring Gradle

React Native uses the React Native Gradle Plugin to configure your dependencies and project setup.

First, let's edit your `settings.gradle` file by adding those lines (as suggested from the [Community template](https://github.com/react-native-community/template/blob/0.76-stable/template/android/settings.gradle)):

```groovy
// Configures the React Native Gradle Settings plugin used for autolinking
pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
// If using .gradle.kts files:
// extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }
includeBuild("../node_modules/@react-native/gradle-plugin")

// Include your existing Gradle modules here.
// include(":app")
```

Then you need to open your top level `build.gradle` and include this line (as suggested from the [Community template](https://github.com/react-native-community/template/blob/0.76-stable/template/android/build.gradle)):

```diff
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.3.1")
+       classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

This makes sure the React Native Gradle Plugin (RNGP) is available inside your project.
Finally, add those lines inside your Applications's `build.gradle` file (it's a different `build.gradle` file usually inside your `app` folder - you can use the [Community template file as reference](https://github.com/react-native-community/template/blob/0.76-stable/template/android/app/build.gradle)):

```diff
apply plugin: "com.android.application"
+apply plugin: "com.facebook.react"

repositories {
    mavenCentral()
}

dependencies {
    // Other dependencies here
+   // Note: we intentionally don't specify the version number here as RNGP will take care of it.
+   // If you don't use the RNGP, you'll have to specify version manually.
+   implementation("com.facebook.react:react-android")
+   implementation("com.facebook.react:hermes-android")
}

+react {
+   // Needed to enable Autolinking - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
+   autolinkLibrariesWithApp()
+}
```

Finally, open your application `gradle.properties` files and add the following line (here the [Community template file as reference](https://github.com/react-native-community/template/blob/0.76-stable/template/android/gradle.properties)):

```diff
+reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
+newArchEnabled=true
+hermesEnabled=true
```

### Configuring your manifest

First, make sure you have the Internet permission in your `AndroidManifest.xml`:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

+   <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">
    </application>
</manifest>
```

Then you need to enable [cleartext traffic](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted) in your **debug** `AndroidManifest.xml`:

```diff
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
+       android:usesCleartextTraffic="true"
+       tools:targetApi="28"
    />
</manifest>
```

As usual, here the AndroidManifest.xml file from the Community template to use as a reference: [main](https://github.com/react-native-community/template/blob/0.76-stable/template/android/app/src/main/AndroidManifest.xml) and [debug](https://github.com/react-native-community/template/blob/0.76-stable/template/android/app/src/debug/AndroidManifest.xml)

This is needed as your application will communicate with your local bundler, [Metro][https://metrobundler.dev/], via HTTP.

Make sure you add this only to your **debug** manifest.

## 4. Writing the TypeScript Code

Now we will actually modify the native Android application to integrate React Native.

The first bit of code we will write is the actual React Native code for the new screen that will be integrated into our application.

### Create a `index.js` file

First, create an empty `index.js` file in the root of your React Native project.

`index.js` is the starting point for React Native applications, and it is always required. It can be a small file that `import`s other file that are part of your React Native component or application, or it can contain all the code that is needed for it.

Our index.js should look as follows (here the [Community template file as reference](https://github.com/react-native-community/template/blob/0.76-stable/template/index.js)):

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### Create a `App.tsx` file

Then, let's create a `App.tsx` file. This is a TypeScript file that will contain the React Native component that we will integrate into our Android application.

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.black
              : Colors.white,
            padding: 24,
          }}>
          <Text style={styles.title}>Step One</Text>
          <Text>
            Edit <Text style={styles.bold}>App.tsx</Text> to
            change this screen and see your edits.
          </Text>
          <Text style={styles.title}>See your changes</Text>
          <ReloadInstructions />
          <Text style={styles.title}>Debug</Text>
          <DebugInstructions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

Here the [Community template file as reference](https://github.com/react-native-community/template/blob/0.76-stable/template/App.tsx)

## 5. Integrating with your Android code

We now need to add some native code in order to start the React Native runtime and tell it to render our React components.

### Updating your Application class

First, we need to update your `Application` class to properly initialize React Native as follows:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```diff
package <your-package-here>;

import android.app.Application;
+import com.facebook.react.PackageList;
+import com.facebook.react.ReactApplication;
+import com.facebook.react.ReactHost;
+import com.facebook.react.ReactNativeHost;
+import com.facebook.react.ReactPackage;
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
+import com.facebook.react.defaults.DefaultReactHost;
+import com.facebook.react.defaults.DefaultReactNativeHost;
+import com.facebook.soloader.SoLoader;
+import java.util.List;

-class MainApplication extends Application {
+class MainApplication extends Application implements ReactApplication {
+ @Override
+ public ReactNativeHost getReactNativeHost() {
+   return new DefaultReactNativeHost(this) {
+     @Override
+     protected List<ReactPackage> getPackages() { return new PackageList(this).getPackages(); }
+     @Override
+     protected String getJSMainModuleName() { return "index"; }
+     @Override
+     public boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }
+     @Override
+     protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }
+     @Override
+     protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }
+   };
+ }

+ @Override
+ public ReactHost getReactHost() {
+   return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
+ }

  @Override
  public void onCreate() {
    super.onCreate();
+   SoLoader.init(this, false);
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     DefaultNewArchitectureEntryPoint.load();
+   }
  }
}
```

</TabItem>

<TabItem value="kotlin">

```diff
// package <your-package-here>

import android.app.Application
+import com.facebook.react.PackageList
+import com.facebook.react.ReactApplication
+import com.facebook.react.ReactHost
+import com.facebook.react.ReactNativeHost
+import com.facebook.react.ReactPackage
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
+import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
+import com.facebook.react.defaults.DefaultReactNativeHost
+import com.facebook.soloader.SoLoader

-class MainApplication : Application() {
+class MainApplication : Application(), ReactApplication {

+ override val reactNativeHost: ReactNativeHost =
+      object : DefaultReactNativeHost(this) {
+        override fun getPackages(): List<ReactPackage> = PackageList(this).packages
+        override fun getJSMainModuleName(): String = "index"
+        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
+        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
+        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
+      }

+ override val reactHost: ReactHost
+   get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
+   SoLoader.init(this, false)
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     load()
+   }
  }
}
```

</TabItem>
</Tabs>

As usual, here the [MainApplication.kt Community template file as reference](https://github.com/react-native-community/template/blob/0.76-stable/template/android/app/src/main/java/com/helloworld/MainApplication.kt)

#### Creating a `ReactActivity`

Finally, we need to create a new `Activity` that will extend `ReactActivity` and host the React Native code. This activity will be responsible for starting the React Native runtime and rendering the React component.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
// package <your-package-here>;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MyReactActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(this, getMainComponentName(), DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
// package <your-package-here>

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MyReactActivity : ReactActivity() {

    override fun getMainComponentName(): String = "HelloWorld"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

</TabItem>
</Tabs>

As usual, here the [MainActivity.kt Community template file as reference](https://github.com/react-native-community/template/blob/0.76-stable/template/android/app/src/main/java/com/helloworld/MainApplication.kt)

Whenever you create a new Activity, you need to add it to your `AndroidManifest.xml` file. You also need set the theme of `MyReactActivity` to `Theme.AppCompat.Light.NoActionBar` (or to any non-ActionBar theme) as otherwise your application will render an ActionBar on top of your React Native screen:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">

+     <activity
+       android:name=".MyReactActivity"
+       android:label="@string/app_name"
+       android:theme="@style/Theme.AppCompat.Light.NoActionBar">
+     </activity>
    </application>
</manifest>
```

Now your activity is ready to run some JavaScript code.

## 6. Test your integration

You have now done all the basic steps to integrate React Native with your current application. Now we will start the [Metro bundler](https://metrobundler.dev/) to build the TypeScript code of your application and have the server running on localhost to serve it.

First, you need to create a `metro.config.js` file in the root of your project as follows:

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

You can checkout the [metro.config.js file](https://github.com/react-native-community/template/blob/0.76-stable/template/metro.config.js) from the Community template file as reference.

Once you have the config file in place, you can run the bundler. Run the following command in the root directory of your project:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

Now build and run your Android app as normal.

Once you reach your React-powered Activity inside the app, it should load the JavaScript code from the development server and display:

![Screenshot](/docs/assets/EmbeddedAppAndroidVideo.gif)

### Creating a release build in Android Studio

You can use Android Studio to create your release builds too! It’s as quick as creating release builds of your previously-existing native Android app.

The React Native Gradle Plugin will take care of bundling the JS code inside your APK/App Bundle.

If you're not using Android Studio, you can create a release build with:

```
cd android
# For a Release APK
./gradlew :app:assembleRelease
# For a Release AAB
./gradlew :app:bundleRelease
```

### Now what?

At this point you can continue developing your app as usual. Refer to our [debugging](debugging) and [deployment](running-on-device) docs to learn more about working with React Native.
