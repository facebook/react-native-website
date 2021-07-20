## Key Concepts

The keys to integrating React Native components into your iOS application are to:

1. Set up React Native dependencies and directory structure.
2. Understand what React Native components you will use in your app.
3. Add these components as dependencies using CocoaPods.
4. Develop your React Native components in JavaScript.
5. Add a `RCTRootView` to your iOS app. This view will serve as the container for your React Native component.
6. Start the React Native server and run your native application.
7. Verify that the React Native aspect of your application works as expected.

## Prerequisites

Follow the React Native CLI Quickstart in the [environment setup guide](environment-setup) to configure your development environment for building React Native apps for iOS.

### 1. Set up directory structure

To ensure a smooth experience, create a new folder for your integrated React Native project, then copy your existing iOS project to a `/ios` subfolder.

### 2. Install JavaScript dependencies

Go to the root directory for your project and create a new `package.json` file with the following contents:

```
{
  "name": "MyReactNativeApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "yarn react-native start"
  }
}
```

Next, make sure you have [installed the yarn package manager](https://yarnpkg.com/lang/en/docs/install/).

Install the `react` and `react-native` packages. Open a terminal or command prompt, then navigate to the directory with your `package.json` file and run:

```shell
$ yarn add react-native
```

This will print a message similar to the following (scroll up in the yarn output to see it):

> warning "react-native@0.52.2" has unmet peer dependency "react@16.2.0".

This is OK, it means we also need to install React:

```shell
$ yarn add react@version_printed_above
```

Yarn has created a new `/node_modules` folder. This folder stores all the JavaScript dependencies required to build your project.

Add `node_modules/` to your `.gitignore` file.

### 3. Install CocoaPods

[CocoaPods](http://cocoapods.org) is a package management tool for iOS and macOS development. We use it to add the actual React Native framework code locally into your current project.

We recommend installing CocoaPods using [Homebrew](http://brew.sh/).

```shell
$ brew install cocoapods
```

> It is technically possible not to use CocoaPods, but that would require manual library and linker additions that would overly complicate this process.

## Adding React Native to your app

Assume the [app for integration](https://github.com/JoelMarcey/iOS-2048) is a [2048](https://en.wikipedia.org/wiki/2048_%28video_game%29) game. Here is what the main menu of the native application looks like without React Native.

![Before RN Integration](/docs/assets/react-native-existing-app-integration-ios-before.png)

### Command Line Tools for Xcode

Install the Command Line Tools. Choose "Preferences..." in the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

### Configuring CocoaPods dependencies

Before you integrate React Native into your application, you will want to decide what parts of the React Native framework you would like to integrate. We will use CocoaPods to specify which of these "subspecs" your app will depend on.

The list of supported `subspec`s is available in [`/node_modules/react-native/React.podspec`](https://github.com/facebook/react-native/blob/master/React.podspec). They are generally named by functionality. For example, you will generally always want the `Core` `subspec`. That will get you the `AppRegistry`, `StyleSheet`, `View` and other core React Native libraries. If you want to add the React Native `Text` library (e.g., for `<Text>` elements), then you will need the `RCTText` `subspec`. If you want the `Image` library (e.g., for `<Image>` elements), then you will need the `RCTImage` `subspec`.

You can specify which `subspec`s your app will depend on in a `Podfile` file. The easiest way to create a `Podfile` is by running the CocoaPods `init` command in the `/ios` subfolder of your project:

```shell
$ pod init
```

The `Podfile` will contain a boilerplate setup that you will tweak for your integration purposes.

> The `Podfile` version changes depending on your version of `react-native`. Refer to https://react-native-community.github.io/upgrade-helper/ for the specific version of `Podfile` you should be using.

Ultimately, your `Podfile` should look something similar to this:

```
# The target name is most likely the name of your project.
target 'NumberTileGame' do

  # Your 'node_modules' directory is probably in the root of your project,
  # but if not, adjust the `:path` accordingly
  pod 'FBLazyVector', :path => "../node_modules/react-native/Libraries/FBLazyVector"
  pod 'FBReactNativeSpec', :path => "../node_modules/react-native/Libraries/FBReactNativeSpec"
  pod 'RCTRequired', :path => "../node_modules/react-native/Libraries/RCTRequired"
  pod 'RCTTypeSafety', :path => "../node_modules/react-native/Libraries/TypeSafety"
  pod 'React', :path => '../node_modules/react-native/'
  pod 'React-Core', :path => '../node_modules/react-native/'
  pod 'React-CoreModules', :path => '../node_modules/react-native/React/CoreModules'
  pod 'React-Core/DevSupport', :path => '../node_modules/react-native/'
  pod 'React-RCTActionSheet', :path => '../node_modules/react-native/Libraries/ActionSheetIOS'
  pod 'React-RCTAnimation', :path => '../node_modules/react-native/Libraries/NativeAnimation'
  pod 'React-RCTBlob', :path => '../node_modules/react-native/Libraries/Blob'
  pod 'React-RCTImage', :path => '../node_modules/react-native/Libraries/Image'
  pod 'React-RCTLinking', :path => '../node_modules/react-native/Libraries/LinkingIOS'
  pod 'React-RCTNetwork', :path => '../node_modules/react-native/Libraries/Network'
  pod 'React-RCTSettings', :path => '../node_modules/react-native/Libraries/Settings'
  pod 'React-RCTText', :path => '../node_modules/react-native/Libraries/Text'
  pod 'React-RCTVibration', :path => '../node_modules/react-native/Libraries/Vibration'
  pod 'React-Core/RCTWebSocket', :path => '../node_modules/react-native/'

  pod 'React-cxxreact', :path => '../node_modules/react-native/ReactCommon/cxxreact'
  pod 'React-jsi', :path => '../node_modules/react-native/ReactCommon/jsi'
  pod 'React-jsiexecutor', :path => '../node_modules/react-native/ReactCommon/jsiexecutor'
  pod 'React-jsinspector', :path => '../node_modules/react-native/ReactCommon/jsinspector'
  pod 'ReactCommon/callinvoker', :path => "../node_modules/react-native/ReactCommon"
  pod 'ReactCommon/turbomodule/core', :path => "../node_modules/react-native/ReactCommon"
  pod 'Yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

end
```

After you have created your `Podfile`, you are ready to install the React Native pod.

```shell
$ pod install
```

You should see output such as:

```
Analyzing dependencies
Fetching podspec for `React` from `../node_modules/react-native`
Downloading dependencies
Installing React (0.62.0)
Generating Pods project
Integrating client project
Sending stats
Pod installation complete! There are 3 dependencies from the Podfile and 1 total pod installed.
```

> If this fails with errors mentioning `xcrun`, make sure that in Xcode in **Preferences > Locations** the Command Line Tools are assigned.

### Code integration

Now we will actually modify the native iOS application to integrate React Native. For our 2048 sample app, we will add a "High Score" screen in React Native.

#### The React Native component

The first bit of code we will write is the actual React Native code for the new "High Score" screen that will be integrated into our application.

##### 1. Create a `index.js` file

First, create an empty `index.js` file in the root of your React Native project.

`index.js` is the starting point for React Native applications, and it is always required. It can be a small file that `require`s other file that are part of your React Native component or application, or it can contain all the code that is needed for it. In our case, we will put everything in `index.js`.

##### 2. Add your React Native code

In your `index.js`, create your component. In our sample here, we will add a `<Text>` component within a styled `<View>`

```jsx
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class RNHighScores extends React.Component {
  render() {
    var contents = this.props['scores'].map((score) => (
      <Text key={score.name}>
        {score.name}:{score.value}
        {'\n'}
      </Text>
    ));
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>
          2048 High Scores!
        </Text>
        <Text style={styles.scores}>{contents}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

// Module name
AppRegistry.registerComponent('RNHighScores', () => RNHighScores);
```

> `RNHighScores` is the name of your module that will be used when you add a view to React Native from within your iOS application.

#### The Magic: `RCTRootView`

Now that your React Native component is created via `index.js`, you need to add that component to a new or existing `ViewController`. The easiest path to take is to optionally create an event path to your component and then add that component to an existing `ViewController`.

We will tie our React Native component with a new native view in the `ViewController` that will actually contain it called `RCTRootView` .

##### 1. Create an Event Path

You can add a new link on the main game menu to go to the "High Score" React Native page.

![Event Path](/docs/assets/react-native-add-react-native-integration-link.png)

##### 2. Event Handler

We will now add an event handler from the menu link. A method will be added to the main `ViewController` of your application. This is where `RCTRootView` comes into play.

When you build a React Native application, you use the [Metro bundler][metro] to create an `index.bundle` that will be served by the React Native server. Inside `index.bundle` will be our `RNHighScore` module. So, we need to point our `RCTRootView` to the location of the `index.bundle` resource (via `NSURL`) and tie it to the module.

We will, for debugging purposes, log that the event handler was invoked. Then, we will create a string with the location of our React Native code that exists inside the `index.bundle`. Finally, we will create the main `RCTRootView`. Notice how we provide `RNHighScores` as the `moduleName` that we created [above](#the-react-native-component) when writing the code for our React Native component.

First `import` the `RCTRootView` header.

```objectivec
#import <React/RCTRootView.h>
```

> The `initialProperties` are here for illustration purposes so we have some data for our high score screen. In our React Native component, we will use `this.props` to get access to that data.

```objectivec
- (IBAction)highScoreButtonPressed:(id)sender {
    NSLog(@"High Score Button Pressed");
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];

    RCTRootView *rootView =
      [[RCTRootView alloc] initWithBundleURL: jsCodeLocation
                                  moduleName: @"RNHighScores"
                           initialProperties:
                             @{
                               @"scores" : @[
                                 @{
                                   @"name" : @"Alex",
                                   @"value": @"42"
                                  },
                                 @{
                                   @"name" : @"Joel",
                                   @"value": @"10"
                                 }
                               ]
                             }
                               launchOptions: nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self presentViewController:vc animated:YES completion:nil];
}
```

> Note that `RCTRootView initWithURL` starts up a new JSC VM. To save resources and simplify the communication between RN views in different parts of your native app, you can have multiple views powered by React Native that are associated with a single JS runtime. To do that, instead of using `[RCTRootView alloc] initWithURL`, use [`RCTBridge initWithBundleURL`](https://github.com/facebook/react-native/blob/master/React/Base/RCTBridge.h#L93) to create a bridge and then use `RCTRootView initWithBridge`.

> When moving your app to production, the `NSURL` can point to a pre-bundled file on disk via something like `[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`. You can use the `react-native-xcode.sh` script in `node_modules/react-native/scripts/` to generate that pre-bundled file.

##### 3. Wire Up

Wire up the new link in the main menu to the newly added event handler method.

![Event Path](/docs/assets/react-native-add-react-native-integration-wire-up.png)

> One of the easier ways to do this is to open the view in the storyboard and right click on the new link. Select something such as the `Touch Up Inside` event, drag that to the storyboard and then select the created method from the list provided.

### Test your integration

You have now done all the basic steps to integrate React Native with your current application. Now we will start the [Metro bundler][metro] to build the `index.bundle` package and the server running on `localhost` to serve it.

##### 1. Add App Transport Security exception

Apple has blocked implicit cleartext HTTP resource loading. So we need to add the following our project's `Info.plist` (or equivalent) file.

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

> App Transport Security is good for your users. Make sure to re-enable it prior to releasing your app for production.

##### 2. Run the packager

To run your app, you need to first start the development server. To do this, run the following command in the root directory of your React Native project:

```shell
$ npm start
```

##### 3. Run the app

If you are using Xcode or your favorite editor, build and run your native iOS application as normal. Alternatively, you can run the app from the command line using:

```
# From the root of your project
$ npx react-native run-ios
```

In our sample application, you should see the link to the "High Scores" and then when you click on that you will see the rendering of your React Native component.

Here is the _native_ application home screen:

![Home Screen](/docs/assets/react-native-add-react-native-integration-example-home-screen.png)

Here is the _React Native_ high score screen:

![High Scores](/docs/assets/react-native-add-react-native-integration-example-high-scores.png)

> If you are getting module resolution issues when running your application please see [this GitHub issue](https://github.com/facebook/react-native/issues/4968) for information and possible resolution. [This comment](https://github.com/facebook/react-native/issues/4968#issuecomment-220941717) seemed to be the latest possible resolution.

### See the Code

You can examine the code that added the React Native screen to our sample app on [GitHub](https://github.com/JoelMarcey/iOS-2048/commit/9ae70c7cdd53eb59f5f7c7daab382b0300ed3585).

### Now what?

At this point you can continue developing your app as usual. Refer to our [debugging](debugging) and [deployment](running-on-device) docs to learn more about working with React Native.

[metro]: https://facebook.github.io/metro/
