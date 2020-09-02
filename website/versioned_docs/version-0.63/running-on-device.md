---
id: running-on-device
title: Running On Device
---

It's always a good idea to test your app on an actual device before releasing it to your users. This document will guide you through the necessary steps to run your React Native app on a device and to get it ready for production.

If you used Expo CLI or Create React Native App to set up your project, you can preview your app on a device by scanning the QR code with the Expo app—but in order to build and run your app on a device, you will need to eject and install the native code dependencies from the [environment setup guide](environment-setup).

<div className="toggler">
  <ul role="tablist" id="toggle-platform">
    <li id="ios" className="button-ios" aria-selected="false" role="tab" tabIndex={0} aria-controls="iostab" onClick="displayTab('platform', 'ios')">
      iOS
    </li>
    <li id="android" className="button-android" aria-selected="false" role="tab" tabIndex={0} aria-controls="androidtab" onClick="displayTab('platform', 'android')">
      Android
    </li>
  </ul>
</div>

<block className="linux windows mac ios" />

<h2>Running your app on iOS devices</h2>

<block className="linux windows mac android" />

<h2>Running your app on Android devices</h2>

<block className="linux windows mac ios android" />

<div className="toggler">
  <span>Development OS:</span>
  <span role="tablist" id="toggle-os">
    <button role="tab" className="button-mac" onclick="displayTab('os', 'mac')">macOS</button>
    <button role="tab" className="button-linux" onclick="displayTab('os', 'linux')">Linux</button>
    <button role="tab" className="button-windows" onclick="displayTab('os', 'windows')">Windows</button>
  </span>
</div>

<block className="linux windows ios" />

A Mac is required in order to build your app for iOS devices. Alternatively, you can refer to our [environment setup guide](environment-setup) to learn how to build your app using Expo CLI, which will allow you to run your app using the Expo client app.

<block className="mac ios" />

### 1. Plug in your device via USB

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the `ios` folder in your project, then open the `.xcodeproj` file, or if you are using CocoaPods open `.xcworkspace`, within it using Xcode.

If this is your first time running an app on your iOS device, you may need to register your device for development. Open the **Product** menu from Xcode's menubar, then go to **Destination**. Look for and select your device from the list. Xcode will then register your device for development.

### 2. Configure code signing

Register for an [Apple developer account](https://developer.apple.com/) if you don't have one yet.

Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown. Do the same for the tests target (it ends with Tests, and is below your main target).

**Repeat** this step for the **Tests** target in your project.

![](/docs/assets/RunningOnDeviceCodeSigning.png)

### 3. Build and Run your app

If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices pane (`⇧⌘2`). You can now press the **Build and run** button (`⌘R`) or select **Run** from the **Product** menu. Your app will launch on your device shortly.

![](/docs/assets/RunningOnDeviceReady.png)

> If you run into any issues, please take a look at Apple's [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) docs.

<block className="mac windows linux android" />

### 1. Enable Debugging over USB

Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to **Settings** → **About phone** → **Software information** and then tapping the `Build number` row at the bottom seven times. You can then go back to **Settings** → **Developer options** to enable "USB debugging".

### 2. Plug in your device via USB

Let's now set up an Android device to run our React Native projects. Go ahead and plug in your device via USB to your development machine.

<block className="linux android" />

Next, check the manufacturer code by using `lsusb` (on mac, you must first [install lsusb](https://github.com/jlhonora/lsusb)). `lsusb` should output something like this:

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 22b8:2e76 Motorola PCS
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

These lines represent the USB devices currently connected to your machine.

You want the line that represents your phone. If you're in doubt, try unplugging your phone and running the command again:

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

You'll see that after removing the phone, the line which has the phone model ("Motorola PCS" in this case) disappeared from the list. This is the line that we care about.

`Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`

From the above line, you want to grab the first four digits from the device ID:

`22b8:2e76`

In this case, it's `22b8`. That's the identifier for Motorola.

You'll need to input this into your udev rules in order to get up and running:

```sh
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

Make sure that you replace `22b8` with the identifier you get in the above command.

<block className="mac windows linux android" />

Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running `adb devices`.

```sh
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Seeing `device` in the right column means the device is connected. You must have **only one device connected** at a time.

### 3. Run your app

Type the following in your command prompt to install and launch your app on the device:

```sh
$ npx react-native run-android
```

> If you get a "bridge configuration isn't available" error, see [Using adb reverse](running-on-device.md#method-1-using-adb-reverse-recommended).

> Hint
>
> You can also use the `React Native CLI` to generate and run a `Release` build (e.g. `npx react-native run-android --variant=release`).

<block className="mac windows linux android ios" />

<block className="mac ios" />

<h2>Connecting to the development server</h2>

You can also iterate quickly on a device using the development server. You only have to be on the same Wi-Fi network as your computer. Shake your device to open the [Developer menu](debugging.md#accessing-the-in-app-developer-menu), then enable Live Reload. Your app will reload whenever your JavaScript code has changed.

![](/docs/assets/DeveloperMenu.png)

### Troubleshooting

> If you have any issues, ensure that your Mac and device are on the same network and can reach each other. Many open wireless networks with captive portals are configured to prevent devices from reaching other devices on the network. You may use your device's Personal Hotspot feature in this case.

When trying to connect to the development server you might get a [red screen with an error](debugging.md#in-app-errors-and-warnings) saying:

> Connection to [http://localhost:8081/debugger-proxy?role=client]() timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.

To solve this issue check the following points.

#### 1. Wi-Fi network.

Make sure your laptop and your phone are on the **same** Wi-Fi network.

#### 2. IP address

Make sure that the build script detected the IP address of your machine correctly (e.g. 10.0.1.123).

![](/docs/assets/XcodeBuildIP.png)

Open the **Report navigator** tab, select the last **Build** and search for `xip.io`. The IP address which gets embedded in the app should match your machines IP address plus the domain `.xip.io` (e.g. 10.0.1.123.xip.io)

#### 3. Network/router configuration

React Native uses the wildcard DNS service **xip.io** to address your device, as Apple ATS prohibits URLs with IP addresses instead of domain names, and developers' networks are often not set up to resolve local hostnames. Some routers have security features to prevent DNS Servers from resolving to anything in the local IP range.

Now check if you are able to resolve the xip.io address, by running `nslookup`.

```bash
$ nslookup 10.0.1.123.xip.io
```

If it doesn't resolve your local IP address either the **xip.io** service is down or more likely your router prevents it.

To still use xip.io behind your router:

- configure your phone to use Google DNS (8.8.8.8)
- disable the appropriate security feature in your router

<block className="mac windows linux android" />

<h2>Connecting to the development server</h2>

You can also iterate quickly on a device by connecting to the development server running on your development machine. There are several ways of accomplishing this, depending on whether you have access to a USB cable or a Wi-Fi network.

### Method 1: Using adb reverse (recommended)

<block className="mac windows linux android" />

You can use this method if your device is running Android 5.0 (Lollipop) or newer, it has USB debugging enabled, and it is connected via USB to your development machine.

<block className="mac windows linux android" />

Run the following in a command prompt:

```sh
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

To find the device name, run the following adb command:

```sh
$ adb devices
```

You can now enable Live reloading from the [Developer menu](debugging.md#accessing-the-in-app-developer-menu). Your app will reload whenever your JavaScript code has changed.

### Method 2: Connect via Wi-Fi

You can also connect to the development server over Wi-Fi. You'll first need to install the app on your device using a USB cable, but once that has been done you can debug wirelessly by following these instructions. You'll need your development machine's current IP address before proceeding.

<block className="mac android" />

You can find the IP address in **System Preferences** → **Network**.

<block className="windows android" />

Open the command prompt and type `ipconfig` to find your machine's IP address ([more info](http://windows.microsoft.com/en-us/windows/using-command-line-tools-networking-information)).

<block className="linux android" />

Open a terminal and type `/sbin/ifconfig` to find your machine's IP address.

<block className="mac windows linux android" />

<!-- alex ignore host -->

1. Make sure your laptop and your phone are on the **same** Wi-Fi network.
2. Open your React Native app on your device.
3. You'll see a [red screen with an error](debugging.md#in-app-errors-and-warnings). This is OK. The following steps will fix that.
4. Open the in-app [Developer menu](debugging.md#accessing-the-in-app-developer-menu).
5. Go to **Dev Settings** → **Debug server host & port for device**.
6. Type in your machine's IP address and the port of the local dev server (e.g. 10.0.1.1:8081).
7. Go back to the **Developer menu** and select **Reload JS**.

You can now enable Live reloading from the [Developer menu](debugging.md#accessing-the-in-app-developer-menu). Your app will reload whenever your JavaScript code has changed.

<block className="mac ios" />

<h2>Building your app for production</h2>

You have built a great app using React Native, and you are now itching to release it in the App Store. The process is the same as any other native iOS app, with some additional considerations to take into account.

> If you are using Expo then read the Expo Guide for [Building Standalone Apps](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/).

### 1. Enable App Transport Security

App Transport Security is a security feature introduced in iOS 9 that rejects all HTTP requests that are not sent over HTTPS. This can result in HTTP traffic being blocked, including the developer React Native server. ATS is disabled for `localhost` by default in React Native projects in order to make development easier.

You should re-enable ATS prior to building your app for production by removing the `localhost` entry from the `NSExceptionDomains` dictionary and setting `NSAllowsArbitraryLoads` to `false` in your `Info.plist` file in the `ios/` folder. You can also re-enable ATS from within Xcode by opening your target properties under the Info pane and editing the App Transport Security Settings entry.

> If your application needs to access HTTP resources on production, see [this post](http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/) to learn how to configure ATS on your project.

### 2. Configure release scheme

Building an app for distribution in the App Store requires using the `Release` scheme in Xcode. Apps built for `Release` will automatically disable the in-app Developer menu, which will prevent your users from inadvertently accessing the menu in production. It will also bundle the JavaScript locally, so you can put the app on a device and test whilst not connected to the computer.

To configure your app to be built using the `Release` scheme, go to **Product** → **Scheme** → **Edit Scheme**. Select the **Run** tab in the sidebar, then set the Build Configuration dropdown to `Release`.

![](/docs/assets/ConfigureReleaseScheme.png)

#### Pro Tips

As your App Bundle grows in size, you may start to see a blank screen flash between your splash screen and the display of your root application view. If this is the case, you can add the following code to `AppDelegate.m` in order to keep your splash screen displayed during the transition.

```objectivec
  // Place this code after "[self.window makeKeyAndVisible]" and before "return YES;"
  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
  UIViewController *vc = [sb instantiateInitialViewController];
  rootView.loadingView = vc.view;
```

The static bundle is built every time you target a physical device, even in Debug. If you want to save time, turn off bundle generation in Debug by adding the following to your shell script in the Xcode Build Phase `Bundle React Native code and images`:

```sh
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

### 3. Build app for release

You can now build your app for release by tapping `⌘B` or selecting **Product** → **Build** from the menu bar. Once built for release, you'll be able to distribute the app to beta testers and submit the app to the App Store.

> You can also use the `React Native CLI` to perform this operation using the option `--configuration` with the value `Release` (e.g. `npx react-native run-ios --configuration Release`).

<block className="mac windows linux android" />

<h2>Building your app for production</h2>

You have built a great app using React Native, and you are now itching to release it in the Play Store. The process is the same as any other native Android app, with some additional considerations to take into account. Follow the guide for [generating a signed APK](signed-apk-android.md) to learn more.
