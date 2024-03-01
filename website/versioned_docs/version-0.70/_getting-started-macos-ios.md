import RemoveGlobalCLI from './\_remove-global-cli.md';

## Installing dependencies

You will need Node, Watchman, the React Native command line interface, a Ruby version manager, Xcode and CocoaPods.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

### Node & Watchman

We recommend installing Node and Watchman using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```shell
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 14 or newer.

[Watchman](https://facebook.github.io/watchman) is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

### Ruby

React Native uses a `.ruby-version` file to make sure that your version of Ruby is aligned with what is needed. Currently, macOS 13.2 is shipped with Ruby 2.6.10, which is **not** what is required by this version of React Native (2.7.5). Our suggestion is to install a Ruby version manager and to install the proper version of Ruby in your system.

Some common Ruby version manager are:

- [rbenv](https://github.com/rbenv/rbenv)
- [RVM](https://rvm.io/)
- [chruby](https://github.com/postmodern/chruby)
- [asdf-vm](https://github.com/asdf-vm) with the [asdf-ruby](https://github.com/asdf-vm/asdf-ruby) plugin

To check what is your current version of Ruby, you can run this command:

```
ruby --version
```

React Native uses [this version](https://github.com/facebook/react-native/blob/v0.70.7/.ruby-version) of Ruby. You can also find which version your specific project needs in the `.ruby-version` file at root of your RN project.

### Bundler

[Bundler](https://bundler.io/) is a Ruby gem that helps managing the Ruby dependencies of your project. We need Ruby to install CocoaPods and using Bundler will make sure that all the dependencies are aligned and that the project works properly.

If you want to learn more about why we need this tool, you can read [this article](https://bundler.io/guides/rationale.html#bundlers-purpose-and-rationale).

### Xcode

Please use the **latest version** of Xcode.

The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

#### Installing an iOS Simulator in Xcode

To install a simulator, open <strong>Xcode > Preferences...</strong> and select the <strong>Components</strong> tab. Select a simulator with the corresponding version of iOS you wish to use.

#### CocoaPods

[CocoaPods](https://cocoapods.org/) is built with Ruby and it will be installable with the default Ruby available on macOS.

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

### React Native Command Line Interface

React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.

## Creating a new application

<RemoveGlobalCLI />

You can use React Native's built-in command line interface to generate a new project. Let's create a new React Native project called "AwesomeProject":

```shell
npx react-native init AwesomeProject
```

This is not necessary if you are integrating React Native into an existing application, or if you've installed [Expo](https://docs.expo.dev/bare/installing-expo-modules/) in your project, or if you're adding Android support to an existing React Native project (see [Integration with Existing Apps](integration-with-existing-apps.md)). You can also use a third-party CLI to init your React Native app, such as [Ignite CLI](https://github.com/infinitered/ignite).

:::info

If you are having trouble with iOS, try to reinstall the dependencies by running:

1. `cd ios` to navigate to the
2. `bundle install` to install Bundler
   1. If needed: install a [Ruby Version Manager](#ruby) and update the Ruby version
3. `bundle exec pod install` to install the iOS dependencies.

:::

### [Optional] Using a specific version or template

If you want to start a new project with a specific React Native version, you can use the `--version` argument:

```shell
npx react-native init AwesomeProject --version X.XX.X
```

You can also start a project with a custom React Native template, like TypeScript, with `--template` argument:

```shell
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

> **Note** If the above command is failing, you may have old version of `react-native` or `react-native-cli` installed globally on your pc. Try uninstalling the cli and run the cli using `npx`.

### [Optional] Configuring your environment

Starting from React Native version 0.69, it is possible to configure the Xcode environment using the `.xcode.env` file provided by the template.

The `.xcode.env` file contains an environment variable to export the path to the `node` executable in the `NODE_BINARY` variable.
This is the **suggested approach** to decouple the build infrastructure from the system version of `node`. You should customize this variable with your own path or your own `node` version manager, if it differs from the default.

On top of this, it's possible to add any other environment variable and to source the `.xcode.env` file in your build script phases. If you need to run script that requires some specific environment, this is the **suggested approach**: it allows to decouple the build phases from a specific environment.

## Running your React Native application

### Step 1: Start Metro

First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—[Metro Docs](https://metrobundler.dev/docs/concepts)

To start Metro, run `npx react-native start` inside your React Native project folder:

```shell
npx react-native start
```

`react-native start` starts Metro Bundler.

> If you use the Yarn package manager, you can use `yarn` instead of `npx` when running React Native commands inside an existing project.

> If you're familiar with web development, Metro is a lot like webpack—for React Native apps. Unlike Swift or Objective-C, JavaScript isn't compiled—and neither is React Native. Bundling isn't the same as compiling, but it can help improve startup performance and translate some platform-specific JavaScript into more widely supported JavaScript.

### Step 2: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```shell
npx react-native run-ios
```

You should see your new app running in the iOS Simulator shortly.

![AwesomeProject on iOS](/docs/assets/GettingStartediOSSuccess.png)

`npx react-native run-ios` is one way to run your app. You can also run it directly from within Xcode.

> If you can't get this to work, see the [Troubleshooting](troubleshooting.md) page.

### Running on a device

The above command will automatically run your app on the iOS Simulator by default. If you want to run the app on an actual physical iOS device, please follow the instructions [here](running-on-device.md).

### Modifying your app

Now that you have successfully run the app, let's modify it.

- Open `App.js` in your text editor of choice and edit some lines.
- Hit `⌘R` in your iOS Simulator to reload the app and see your changes!

### That's it!

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

## Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](integration-with-existing-apps.md).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).
