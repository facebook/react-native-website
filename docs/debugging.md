---
id: debugging
title: Debugging
---

Debugging can be achieved for apps running in the emulator/simulator and for devices connected via USB. 
The debugging is a bit different for development done in windows vs. development on the mac, as outlined below.   

Debugging is possible in several ways:
 - Through logs
 - By viewing in Chrome tools 
 - By debugging the native code. 

An In-App Developer Menu can be shown at any time inside the app if built and run in debug mode:
![](/react-native/docs/assets/DeveloperMenu.png)

> The Developer Menu is disabled in release (production) builds.
Invoking the run in debug mode in an attached device or on the emulator/simulator will be explained below.


## Debugging on a Mac 

### For apps running in attached devices
When running from XCode on a device connected with firewire (the Mac equivalent to USB), remember to choose the correct type of target device in the XCode choice near the RUN button, and to have the device id set in the code. 

You can access the in-app developer menu by shaking your device.

Instead of recompiling your app every time you make a change, you can reload your app's JavaScript code instantly. To do so, select "Reload" from the Developer Menu


### Debugging apps running in the iOS simulator or Android emulator on a Mac
React Native supports a few keyboard shortcuts in the iOS Simulator/android emulator. They are described below. To enable them, open the Hardware menu, select Keyboard, and make sure that "**Connect Hardware Keyboard**" is checked.

- by invoking the in-app developer menu on the mac that is building and running the app. The in-app developer menu opens inside the simulated device. 
 
 To invoke the In-App Developer Menu, go in the mac to the simulator/emulator and: 
 - select "**Shake Gesture**" inside the Hardware menu in the Simulator/Emulator. 
 - **for iOS simulator on a Mac**: Use the `⌘D` keyboard shortcut 
 - **for Android emulator on a Mac**: Use the `⌘M` keyboard shortcut
 
Instead of recompiling your app every time you make a change, you can reload your app's JavaScript code instantly. To do so, select "Reload" from the Developer Menu or press `⌘R` in the iOS Simulator.

 
## Debuggin on Windows and Linux
It is advised under the android folder in you project to run `gradlew clean` before running your app.

### For apps running in attached devices
You can connect your device via USB and then run the app on the device and debug it. 

Check that your device is connected by running in a cmd window, in your project directory: 
    `adb devices`
    
It should show a number and then the word `device` if connected ok. 
 
In the project folder if you now run your app with `react-native run-android` it will run on tbe device in debug mode.

If you choose to debug remotely you can use Chrome Tools debugger to view the Javascript and logs. 
Please see below the section on Chrome Tools. 

### For apps running in the Android Emulator on Windows
In the Android Emulator use the `Ctrl+M` on Windows and Linux to access the debugger tools menu.

Alternatively, you can run the command `adb shell input keyevent 82` to open the dev menu (82 being the Menu key code).

Instead of recompiling your app every time you make a change, you can reload your app's JavaScript code instantly. To do so, select "Reload" from the Developer Menu or press `ctrl+R` in the iOS Simulator.

If you choose to debug remotely you can use Chrome Tools debugger to view the Javascript and logs. 
Please see below the section on Chrome Tools. 


## Automatic reloading

You can speed up your development times by having your app reload automatically any time your code changes. Automatic reloading can be enabled by selecting "Enable Live Reload" from the Developer Menu.

You may even go a step further and keep your app running as new versions of your files are injected into the JavaScript bundle automatically by enabling [Hot Reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html) from the Developer Menu. This will allow you to persist the app's state through reloads.

> There are some instances where hot reloading cannot be implemented perfectly. If you run into any issues, use a full reload to reset your app.

You will need to rebuild your app for changes to take effect in certain situations:

* You have added new resources to your native app's bundle, such as an image in `Images.xcassets` on iOS or the `res/drawable` folder on Android.
* You have modified native code (Objective-C/Swift on iOS or Java/C++ on Android).

## In-app Errors and Warnings

Errors and warnings are displayed inside your app in development builds.

### Errors

In-app errors are displayed in a full screen alert with a red background inside your app. This screen is known as a RedBox. You can use `console.error()` to manually trigger one.

### Warnings

Warnings will be displayed on screen with a yellow background. These alerts are known as YellowBoxes. Click on the alerts to show more information or to dismiss them.

As with a RedBox, you can use `console.warn()` to trigger a YellowBox.

YellowBoxes can be disabled during development by using `console.disableYellowBox = true;`. Specific warnings can be ignored programmatically by setting an array of prefixes that should be ignored:

```javascript
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
```

In CI/Xcode, YellowBoxes can also be disabled by setting the `IS_TESTING` environment variable.

> RedBoxes and YellowBoxes are automatically disabled in release (production) builds.

## Chrome Developer Tools

For apps created **without** the React-Native-Create-App,for Android 5.0+ devices connected via USB, you need to use the [`adb` command line tool](http://developer.android.com/tools/help/adb.html) to setup port forwarding from the device to your computer:

`adb reverse tcp:8081 tcp:8081`

Alternatively, select "Dev Settings" from the Developer Menu, then update the "Debug server host for device" setting to match the IP address of your computer.

> If you run into any issues, it may be possible that one of your Chrome extensions is interacting in unexpected ways with the debugger. Try disabling all of your extensions and re-enabling them one-by-one until you find the problematic extension.

To debug the JavaScript code in Chrome, select "Debug JS Remotely" from the Developer Menu.

This will open a new tab in your Chrome broswer at [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui).

To select **Debug JS Remotely**: 
 - Select `Tools → Developer Tools` from the Chrome Menu to open the [Developer Tools](https://developer.chrome.com/devtools).
 - for macOS: `⌘⌥I` 
 - for windows: `Ctrl+Shift+I`. 
 
 You may also want to enable [Pause On Caught Exceptions](http://stackoverflow.com/questions/2233339/javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors/17324511#17324511) for a better debugging experience.

> Note: the React Developer Tools Chrome extension does not work with React Native, but you can use its standalone version instead. Read [this section](debugging.md#react-developer-tools) to learn how.

### Debugging using a custom JavaScript debugger

To use a custom JavaScript debugger in place of Chrome Developer Tools, set the `REACT_DEBUGGER` environment variable to a command that will start your custom debugger. You can then select "Debug JS Remotely" from the Developer Menu to start debugging.

The debugger will receive a list of all project roots, separated by a space. For example, if you set `REACT_DEBUGGER="node /path/to/launchDebugger.js --port 2345 --type ReactNative"`, then the command `node /path/to/launchDebugger.js --port 2345 --type ReactNative /path/to/reactNative/app` will be used to start your debugger.

> Custom debugger commands executed this way should be short-lived processes, and they shouldn't produce more than 200 kilobytes of output.

## React Developer Tools

You can use [the standalone version of React Developer Tools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) to debug the React component hierarchy. To use it, install the `react-devtools` package globally:

```
npm install -g react-devtools
```

Now run `react-devtools` from the terminal to launch the standalone DevTools app:

```
react-devtools
```

![React DevTools](/react-native/docs/assets/ReactDevTools.png)

It should connect to your simulator within a few seconds.

> Note: if you prefer to avoid global installations, you can add `react-devtools` as a project dependency. Add the `react-devtools` package to your project using `npm install --save-dev react-devtools`, then add `"react-devtools": "react-devtools"` to the `scripts` section in your `package.json`, and then run `npm run react-devtools` from your project folder to open the DevTools.

### Integration with React Native Inspector

Open the in-app developer menu and choose "Toggle Inspector". It will bring up an overlay that lets you tap on any UI element and see information about it:

![React Native Inspector](/react-native/docs/assets/Inspector.gif)

However, when `react-devtools` is running, Inspector will enter a special collapsed mode, and instead use the DevTools as primary UI. In this mode, clicking on something in the simulator will bring up the relevant components in the DevTools:

![React DevTools Inspector Integration](/react-native/docs/assets/ReactDevToolsInspector.gif)

You can choose "Toggle Inspector" in the same menu to exit this mode.

### Inspecting Component Instances

When debugging JavaScript in Chrome, you can inspect the props and state of the React components in the browser console.

First, follow the instructions for debugging in Chrome to open the Chrome console.

Make sure that the dropdown in the top left corner of the Chrome console says `debuggerWorker.js`. **This step is essential.**

Then select a React component in React DevTools. There is a search box at the top that helps you find one by name. As soon as you select it, it will be available as `$r` in the Chrome console, letting you inspect its props, state, and instance properties.

![React DevTools Chrome Console Integration](/react-native/docs/assets/ReactDevToolsDollarR.gif)

## Performance Monitor

You can enable a performance overlay to help you debug performance problems by selecting "Perf Monitor" in the Developer Menu.

<hr style="margin-top:25px; margin-bottom:25px;"/>

# Debugging in Ejected Apps

<div class="banner-crna-ejected" style="margin-top:25px">
  <h3>Projects with Native Code Only</h3>
  <p>
    The remainder of this guide only applies to projects made with <code>react-native init</code>
    or to those made with Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

## Accessing console logs

You can display the console logs for an iOS or Android app by using the following commands in a terminal while the app is running:

```
$ react-native log-ios
$ react-native log-android
```

You may also access these through `Debug → Open System Log...` in the iOS Simulator or by running `adb logcat *:S ReactNative:V ReactNativeJS:V` in a terminal while an Android app is running on a device or emulator.

> If you're using Create React Native App, console logs already appear in the same terminal output as the packager.

### Debugging with [Stetho](http://facebook.github.io/stetho/) on Android

Follow this guide to enable Stetho for Debug mode:

1. In `android/app/build.gradle`, add these lines in the `dependencies` section:

   ```gradle
    debugCompile 'com.facebook.stetho:stetho:1.5.0'
    debugCompile 'com.facebook.stetho:stetho-okhttp3:1.5.0'
   ```

> The above will configure Stetho v1.5.0. You can check at http://facebook.github.io/stetho/ if a newer version is available.

2. Create the following Java classes to wrap the Stetho call, one for release and one for debug:

   ```java
   // android/app/src/release/java/com/{yourAppName}/StethoWrapper.java

   public class StethoWrapper {

       public static void initialize(Context context) {
           // NO_OP
       }

       public static void addInterceptor() {
           // NO_OP
       }
   }
   ```

   ```java
   // android/app/src/debug/java/com/{yourAppName}/StethoWrapper.java

   public class StethoWrapper {
       public static void initialize(Context context) {
         Stetho.initializeWithDefaults(context);
       }

       public static void addInterceptor() {
         final OkHttpClient baseClient = OkHttpClientProvider.createClient();
         OkHttpClientProvider.setOkHttpClientFactory(new OkHttpClientFactory() {
           @Override
           public OkHttpClient createNewNetworkModuleClient() {
             return baseClient.newBuilder()
                 .addNetworkInterceptor(new StethoInterceptor())
                 .build();
           }
         });
       }
   }
   ```

3. Open `android/app/src/main/java/com/{yourAppName}/MainApplication.java` and replace the original `onCreate` function:

```java
  public void onCreate() {
      super.onCreate();

      if (BuildConfig.DEBUG) {
          StethoWrapper.initialize(this);
          StethoWrapper.addInterceptor();
      }

      SoLoader.init(this, /* native exopackage */ false);
    }
```

4. Open the project in Android Studio and resolve any dependency issues. The IDE should guide you through this steps after hovering your pointer over the red lines.

5. Run `react-native run-android`.

6. In a new Chrome tab, open: `chrome://inspect`, then click on the 'Inspect device' item next to "Powered by Stetho".

## Debugging native code

When working with native code, such as when writing native modules, you can launch the app from Android Studio or Xcode and take advantage of the native debugging features (setting up breakpoints, etc.) as you would in case of building a standard native app.

The project file for XCode is in the ios folder and for Android Studio is in android folder. 
