---
id: environment-setup
title: Setting up the development environment
---

This page will help you install and build your first React Native app.

<strong>If you are new to mobile development</strong>, the easiest way to get started is with Expo CLI. Expo is a set of tools built around React Native and, while it has many [features](https://expo.io/features), the most relevant feature for us right now is that it can get you writing a React Native app within minutes. You will only need a recent version of Node.js and a phone or emulator. If you'd like to try out React Native directly in your web browser before installing any tools, you can try out [Snack](https://snack.expo.io/).

<strong>If you are already familiar with mobile development</strong>, you may want to use React Native CLI. It requires Xcode or Android Studio to get started. If you already have one of these tools installed, you should be able to get up and running within a few minutes. If they are not installed, you should expect to spend about an hour installing and configuring them.

<div class="toggler">
  <ul role="tablist" id="toggle-guide">
    <li id="quickstart" class="button-quickstart" aria-selected="false" role="tab" tabindex="0" aria-controls="quickstarttab" onclick="displayTab('guide', 'quickstart')">
      Expo CLI Quickstart
    </li>
    <li id="native" class="button-native" aria-selected="false" role="tab" tabindex="0" aria-controls="nativetab" onclick="displayTab('guide', 'native')">
      React Native CLI Quickstart
    </li>
  </ul>
</div>

<block class="quickstart mac windows linux ios android" />

Assuming that you have [Node 12 LTS](https://nodejs.org/en/download/) or greater installed, you can use npm to install the Expo CLI command line utility:

```sh
npm install -g expo-cli
```

Then run the following commands to create a new React Native project called "AwesomeProject":

```sh
expo init AwesomeProject

cd AwesomeProject
npm start # you can also use: expo start
```

This will start a development server for you.

<h2>Running your React Native application</h2>

Install the [Expo](https://expo.io) client app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the Camera app.

<h3>Modifying your app</h3>

Now that you have successfully run the app, let's modify it. Open `App.js` in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

<h3>That's it!</h3>

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>Now what?</h2>

Expo also has [docs](https://docs.expo.io) you can reference if you have questions specific to the tool. You can also ask for help at [Expo forums](https://forums.expo.io).

These tools help you get started quickly, but before committing to building your app with Expo CLI, [read about the limitations](https://docs.expo.io/versions/latest/introduction/why-not-expo/).

If you have a problem with Expo, before creating a new issue, please see if there's an existing issue about it:

- in the [Expo CLI issues](https://github.com/expo/expo-cli/issues) (for issues related to Expo CLI), or
- in the [Expo issues](https://github.com/expo/expo/issues) (for issues about the Expo client or SDK).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).

<h3>Running your app on a simulator or virtual device</h3>

Expo CLI allows you to run your React Native app on a physical device without setting up a development environment. If you want to run your app on the iOS Simulator or an Android Virtual Device, please refer to the instructions for "React Native CLI Quickstart" to learn how to install Xcode or set up your Android development environment.

Once you've set these up, you can launch your app on an Android Virtual Device by running `npm run android`, or on the iOS Simulator by running `npm run ios` (macOS only).

<h3>Caveats</h3>

Because you don't build any native code when using Expo to create a project, it's not possible to include custom native modules beyond the React Native APIs and components that are available in the Expo client app.

If you know that you'll eventually need to include your own native code, Expo is still a good way to get started. In that case you'll need to "[eject](https://docs.expo.io/versions/latest/workflow/customizing/)" eventually to create your own native builds. If you do eject, the "React Native CLI Quickstart" instructions will be required to continue working on your project.

Expo CLI configures your project to use the most recent React Native version that is supported by the Expo client app. The Expo client app usually gains support for a given React Native version about a week after the React Native version is released as stable. You can check [this document](https://docs.expo.io/versions/latest/sdk/overview/#sdk-version) to find out what versions are supported.

If you're integrating React Native into an existing project, you'll want to skip Expo CLI and go directly to setting up the native build environment. Select "React Native CLI Quickstart" above for instructions on configuring a native build environment for React Native.

<block class="native mac windows linux ios android" />

<p>Follow these instructions if you need to build native code in your project. For example, if you are integrating React Native into an existing application, or if you "ejected" from <a href="environment-setup" onclick="displayTab('guide', 'quickstart')">Expo</a>, you'll need this section.</p>

The instructions are a bit different depending on your development operating system, and whether you want to start developing for iOS or Android. If you want to develop for both Android and iOS, that's fine - you can pick one to start with, since the setup is a bit different.

<div class="toggler">
  <span>Development OS:</span>
  <span role="tablist" id="toggle-os">
    <button role="tab" class="button-mac" onclick="displayTab('os', 'mac')">macOS</button>
    <button role="tab" class="button-windows" onclick="displayTab('os', 'windows')">Windows</button>
    <button role="tab" class="button-linux" onclick="displayTab('os', 'linux')">Linux</button>
  </span>
</div>

<div class="toggler">
  <span>Target OS:</span>
  <span role="tablist" id="toggle-platform">
    <button role="tab" class="button-ios" onclick="displayTab('platform', 'ios')">iOS</button>
    <button role="tab" class="button-android" onclick="displayTab('platform', 'android')">Android</button>
  </span>
</div>

<block class="native linux windows ios" />

<h2>Unsupported</h2>

<blockquote><p>A Mac is required to build projects with native code for iOS. You can follow the <a href="environment-setup" onclick="displayTab('guide', 'quickstart')">Quick Start</a> to learn how to build your app using Expo instead.</p></blockquote>

<block class="native mac ios" />

<h2>Installing dependencies</h2>

You will need Node, Watchman, the React Native command line interface, and Xcode.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

<block class="native mac android" />

<h2>Installing dependencies</h2>

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.

<block class="native linux android" />

<h2>Installing dependencies</h2>

You will need Node, the React Native command line interface, a JDK, and Android Studio.

<block class="native windows android" />

<h2>Installing dependencies</h2>

You will need Node, the React Native command line interface, a JDK, and Android Studio.

<block class="native mac windows linux android" />

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

<block class="native mac ios android" />

<h3>Node &amp; Watchman</h3>

We recommend installing Node and Watchman using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```sh
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 10 or newer.

[Watchman](https://facebook.github.io/watchman) is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

<block class="native mac android" />

<h3>Java Development Kit</h3>

We recommend installing JDK using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```sh
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

If you have already installed JDK on your system, make sure it is JDK 8 or newer.

<block class="native linux android" />

<h3>Node</h3>

Follow the [installation instructions for your Linux distribution](https://nodejs.org/en/download/package-manager/) to install Node 10 or newer.

<block class='native windows android' />

<h3>Node, JDK</h3>

We recommend installing Node via [Chocolatey](https://chocolatey.org), a popular package manager for Windows.

React Native also requires [Java SE Development Kit (JDK)](https://openjdk.java.net/projects/jdk8/), which can be installed using Chocolatey as well.

Open an Administrator Command Prompt (right click Command Prompt and select "Run as Administrator"), then run the following command:

```powershell
choco install -y nodejs.install openjdk8
```

If you have already installed Node on your system, make sure it is Node 10 or newer. If you already have a JDK on your system, make sure it is version 8 or newer.

> You can find additional installation options on [Node's Downloads page](https://nodejs.org/en/download/).

> If you're using the latest version of Java Development Kit, you'll need to change the Gradle version of your project so it can recognize the JDK. You can do that by going to `{project root folder}\android\gradle\wrapper\gradle-wrapper.properties` and changing the `distributionUrl` value to upgrade the Gradle version. You can check out [here the latest releases of Gradle](https://gradle.org/releases/).

<block class="native mac ios" />

<h3>Xcode &amp; CocoaPods</h3>

The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 9.4 or newer.

<h4>Command Line Tools</h4>

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

<h4>Installing an iOS Simulator in Xcode</h4>

To install a simulator, open <strong>Xcode > Preferences...</strong> and select the <strong>Components</strong> tab. Select a simulator with the corresponding version of iOS you wish to use.

<h4>CocoaPods</h4>

[CocoaPods](https://cocoapods.org/) is built with Ruby and it will be installable with the default Ruby available on macOS. You can use a Ruby Version manager, however we recommend that you use the standard Ruby available on macOS unless you know what you're doing.

Using the default Ruby install will require you to use `sudo` when installing gems. (This is only an issue for the duration of the gem installation, though.)

```sh
sudo gem install cocoapods
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

<block class="native linux android" />

<h3>Java Development Kit</h3>

React Native requires at least the version 8 of the Java SE Development Kit (JDK). You may download and install [OpenJDK](http://openjdk.java.net) from [AdoptOpenJDK](https://adoptopenjdk.net/) or your system packager. You may also [Download and install Oracle JDK 14](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) if desired.

<block class="native mac linux windows android" />

<h3>Android development environment</h3>

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

<block class="native mac windows linux android" />

<h4>1. Install Android Studio</h4>

[Download and install Android Studio](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

<block class="native mac windows android" />

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- If you are not already using Hyper-V: `Performance (Intel ® HAXM)` ([See here for AMD or Hyper-V](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html))

<block class="native linux android" />

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

<block class="native mac windows linux android" />

Then, click "Next" to install all of these components.

> If the checkboxes are grayed out, you will have a chance to install these components later on.

Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

<h4>2. Install the Android SDK and NDK</h4>

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 10 (Q)` SDK and `20.1.5948944` NDK in particular. Additional Android SDKs and NDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

<block class="native mac android" />

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeMacOS.png)

<block class="native windows android" />

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeWindows.png)

<block class="native mac windows linux android" />

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under **Appearance & Behavior** → **System Settings** → **Android SDK**.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the `Android 10 (Q)` entry, then make sure the following items are checked:

- `Android SDK Platform 29`
- `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image`

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that `29.0.2` is selected.

After that, to install the Android NDK expand the "NDK (Side by side)" entry, then make sure that `20.1.5948944` is selected.

Finally, click "Apply" to download and install the Android SDK and NDK related build tools.

<h4>3. Configure the ANDROID_HOME environment variable</h4>

The React Native tools require some environment variables to be set up in order to build apps with native code.

<block class="native mac linux android" />

Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` (if you are using `zsh` then `~/.zprofile` or `~/.zshrc`) config file:

<block class="native mac android" />

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

<block class="native linux android" />

```sh
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

<block class="native mac linux android" />

> `.bash_profile` is specific to `bash`. If you're using another shell, you will need to edit the appropriate shell-specific config file.

Type `source $HOME/.bash_profile` for `bash` or `source $HOME/.zprofile` to load the config into your current shell. Verify that ANDROID_HOME has been set by running `echo $ANDROID_HOME` and the appropriate directories have been added to your path by running `echo $PATH`.

> Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under **Appearance & Behavior** → **System Settings** → **Android SDK**.

<block class="native windows android" />

1. Open the **Windows Control Panel.**
2. Click on **User Accounts,** then click **User Accounts** again
3. Click on **Change my environment variables**
4. Click on **New...** to create a new `ANDROID_HOME` user variable that points to the path to your Android SDK:

![ANDROID_HOME Environment Variable](/docs/assets/GettingStartedAndroidEnvironmentVariableANDROID_HOME.png)

The SDK is installed, by default, at the following location:

```powershell
%LOCALAPPDATA%\Android\Sdk
```

You can find the actual location of the SDK in the Android Studio "Settings" dialog, under **Appearance & Behavior** → **System Settings** → **Android SDK**.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

1. Open powershell
2. Copy and paste **Get-ChildItem -Path Env:\\** into powershell
3. Verify `ANDROID_HOME` has been added

<h4>4. Add platform-tools to Path</h4>

1. Open the **Windows Control Panel.**
2. Click on **User Accounts,** then click **User Accounts** again
3. Click on **Change my environment variables**
4. Select the **Path** variable.
5. Click **Edit.**
6. Click **New** and add the path to platform-tools to the list.

The default location for this folder is:

```powershell
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

<block class="native linux android" />

<h3>Watchman</h3>

Follow the [Watchman installation guide](https://facebook.github.io/watchman/docs/install/#buildinstall) to compile and install Watchman from source.

> [Watchman](https://facebook.github.io/watchman/docs/install/) is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance and increased compatibility in certain edge cases (translation: you may be able to get by without installing this, but your mileage may vary; installing this now may save you from a headache later).

<block class="native mac windows linux ios android" />

<h3>React Native Command Line Interface</h3>

React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.

<block class="native mac ios" />

<h2>Creating a new application</h2>

> If you previously installed a global `react-native-cli` package, please remove it as it may cause unexpected issues.

You can use React Native's built-in command line interface to generate a new project. Let's create a new React Native project called "AwesomeProject":

```sh
npx react-native init AwesomeProject
```

This is not necessary if you are integrating React Native into an existing application, if you "ejected" from Expo, or if you're adding iOS support to an existing React Native project (see [Platform Specific Code](platform-specific-code.md)). You can also use a third-party CLI to init your React Native app, such as [Ignite CLI](https://github.com/infinitered/ignite).

<h3>[Optional] Using a specific version or template</h3>

If you want to start a new project with a specific React Native version, you can use the `--version` argument:

```sh
npx react-native init AwesomeProject --version X.XX.X
```

You can also start a project with a custom React Native template, like TypeScript, with `--template` argument:

```sh
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

> **Note** If the above command is failing, you may have old version of `react-native` or `react-native-cli` installed globally on your pc. Try uninstalling the cli and run the cli using `npx`.

<block class="native mac windows linux android" />

<h2>Creating a new application</h2>

> If you previously installed a global `react-native-cli` package, please remove it as it may cause unexpected issues.

React Native has a built-in command line interface, which you can use to generate a new project. You can access it without installing anything globally using `npx`, which ships with Node.js. Let's create a new React Native project called "AwesomeProject":

```sh
npx react-native init AwesomeProject
```

This is not necessary if you are integrating React Native into an existing application, if you "ejected" from Expo, or if you're adding Android support to an existing React Native project (see [Platform Specific Code](platform-specific-code.md)). You can also use a third-party CLI to init your React Native app, such as [Ignite CLI](https://github.com/infinitered/ignite).

<h3>[Optional] Using a specific version or template</h3>

If you want to start a new project with a specific React Native version, you can use the `--version` argument:

```sh
npx react-native init AwesomeProject --version X.XX.X
```

You can also start a project with a custom React Native template, like TypeScript, with `--template` argument:

```sh
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

<block class="native mac windows linux android" />

<h2>Preparing the Android device</h2>

You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

<h3>Using a physical device</h3>

If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions [here](running-on-device.md).

<h3>Using a virtual device</h3>

If you use Android Studio to open `./AwesomeProject/android`, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:

![Android Studio AVD Manager](/docs/assets/GettingStartedAndroidStudioAVD.png)

If you have recently installed Android Studio, you will likely need to [create a new AVD](https://developer.android.com/studio/run/managing-avds.html). Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the **Q** API Level 29 image.

<block class="native linux android" />

> We recommend configuring [VM acceleration](https://developer.android.com/studio/run/emulator-acceleration.html#vm-linux) on your system to improve performance. Once you've followed those instructions, go back to the AVD Manager.

<block class="native windows android" />

> If you don't have HAXM installed, click on "Install HAXM" or follow [these instructions](https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows) to set it up, then go back to the AVD Manager.

<block class="native mac android" />

> If you don't have HAXM installed, follow [these instructions](https://github.com/intel/haxm/wiki/Installation-Instructions-on-macOS) to set it up, then go back to the AVD Manager.

<block class="native mac windows linux android" />

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

<block class="native mac ios" />

<h2>Running your React Native application</h2>

<h3>Step 1: Start Metro</h3>

First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—[Metro Docs](https://facebook.github.io/metro/docs/concepts)

To start Metro, run `npx react-native start` inside your React Native project folder:

```sh
npx react-native start
```

`react-native start` starts Metro Bundler.

> If you use the Yarn package manager, you can use `yarn` instead of `npx` when running React Native commands inside an existing project.

> If you're familiar with web development, Metro is a lot like webpack—for React Native apps. Unlike Kotlin or Java, JavaScript isn't compiled—and neither is React Native. Bundling isn't the same as compiling, but it can help improve startup performance and translate some platform-specific JavaScript into more JavaScript.

<h3>Step 2: Start your application</h3>

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```sh
npx react-native run-ios
```

You should see your new app running in the iOS Simulator shortly.

![AwesomeProject on iOS](/docs/assets/GettingStartediOSSuccess.png)

`npx react-native run-ios` is one way to run your app. You can also run it directly from within Xcode.

> If you can't get this to work, see the [Troubleshooting](troubleshooting.md#content) page.

<h3>Running on a device</h3>

The above command will automatically run your app on the iOS Simulator by default. If you want to run the app on an actual physical iOS device, please follow the instructions [here](running-on-device.md).

<block class="native mac windows linux android" />

<h2>Running your React Native application</h2>

<h3>Step 1: Start Metro</h3>

First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—[Metro Docs](https://facebook.github.io/metro/docs/concepts)

To start Metro, run `npx react-native start` inside your React Native project folder:

```sh
npx react-native start
```

`react-native start` starts Metro Bundler.

> If you use the Yarn package manager, you can use `yarn` instead of `npx` when running React Native commands inside an existing project.

> If you're familiar with web development, Metro is a lot like webpack—for React Native apps. Unlike Kotlin or Java, JavaScript isn't compiled—and neither is React Native. Bundling isn't the same as compiling, but it can help improve startup performance and translate some platform-specific JavaScript into more JavaScript.

<h3>Step 2: Start your application</h3>

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```sh
npx react-native run-android
```

If everything is set up correctly, you should see your new app running in your Android emulator shortly.

<block class="native mac android" />

![AwesomeProject on Android](/docs/assets/GettingStartedAndroidSuccessMacOS.png)

<block class="native windows android" />

![AwesomeProject on Android](/docs/assets/GettingStartedAndroidSuccessWindows.png)

<block class="native mac windows linux android" />

`npx react-native run-android` is one way to run your app - you can also run it directly from within Android Studio.

> If you can't get this to work, see the [Troubleshooting](troubleshooting.md#content) page.

<block class="native mac ios android" />

<h3>Modifying your app</h3>

Now that you have successfully run the app, let's modify it.

<block class="native mac ios" />

- Open `App.js` in your text editor of choice and edit some lines.
- Hit `⌘R` in your iOS Simulator to reload the app and see your changes!

<block class="native mac android" />

- Open `App.js` in your text editor of choice and edit some lines.
- Press the `R` key twice or select `Reload` from the Developer Menu (`⌘M`) to see your changes!

<block class="native windows linux android" />

<h3>Modifying your app</h3>

Now that you have successfully run the app, let's modify it.

- Open `App.js` in your text editor of choice and edit some lines.
- Press the `R` key twice or select `Reload` from the Developer Menu (`Ctrl + M`) to see your changes!

<block class="native mac ios android" />

<h3>That's it!</h3>

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<block class="native windows linux android" />

<h3>That's it!</h3>

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<block class="native mac ios" />

<h2>Now what?</h2>

- If you want to add this new React Native code to an existing application, check out the [Integration guide](integration-with-existing-apps.md).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).

<block class="native windows linux mac android" />

<h2>Now what?</h2>

- If you want to add this new React Native code to an existing application, check out the [Integration guide](integration-with-existing-apps.md).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).
