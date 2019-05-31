---
id: version-0.5-components-and-apis
title: Components and APIs
original_id: components-and-apis
---

React Native provides a number of built-in components. You will find a full list of components and APIs on the sidebar to the left. If you're not sure where to get started, take a look at the following categories:

- [Basic Components](components-and-apis.md#basic-components)
- [User Interface](components-and-apis.md#user-interface)
- [List Views](components-and-apis.md#list-views)
- [iOS-specific](components-and-apis.md#ios-components-and-apis)
- [Android-specific](components-and-apis.md#android-components-and-apis)
- [Others](components-and-apis.md#others)

You're not limited to the components and APIs bundled with React Native. React Native is a community of thousands of developers. If you're looking for a library that does something specific, search the npm registry for packages mentioning [react-native](https://www.npmjs.com/search?q=react-native&page=1&ranking=optimal), or check out [Awesome React Native](http://www.awesome-react-native.com/) for a curated list.

## Basic Components

Most apps will end up using one of these basic components. You'll want to get yourself familiarized with all of these if you're new to React Native.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="/react-native/docs/view">View</a></h3>
    <p>The most fundamental component for building a UI.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/text">Text</a></h3>
    <p>A component for displaying text.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/image">Image</a></h3>
    <p>A component for displaying images.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/textinput">TextInput</a></h3>
    <p>A component for inputting text into the app via a keyboard.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/scrollview">ScrollView</a></h3>
    <p>Provides a scrolling container that can host multiple components and views.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/stylesheet">StyleSheet</a></h3>
    <p>Provides an abstraction layer similar to CSS stylesheets.</p>
  </div>
</div>

## User Interface

Render common user interface controls on any platform using the following components. For platform specific components, keep reading.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="/react-native/docs/button">Button</a></h3>
    <p>A basic button component for handling touches that should render nicely on any platform.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/picker">Picker</a></h3>
    <p>Renders the native picker component on iOS and Android.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/slider">Slider</a></h3>
    <p>A component used to select a single value from a range of values.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/switch">Switch</a></h3>
    <p>Renders a boolean input.</p>
  </div>
</div>

## List Views

Unlike the more generic `ScrollView`, the following list view components only render elements that are currently showing on the screen. This makes them a great choice for displaying long lists of data.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="/react-native/docs/flatlist">FlatList</a></h3>
    <p>A component for rendering performant scrollable lists.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/sectionlist">SectionList</a></h3>
    <p>Like <code>FlatList</code>, but for sectioned lists.</p>
  </div>
</div>

## iOS Components and APIs

Many of the following components provide wrappers for commonly used UIKit classes.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="/react-native/docs/actionsheetios">ActionSheetIOS</a></h3>
    <p>API to display an iOS action sheet or share sheet.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/alertios">AlertIOS</a></h3>
    <p>Create an iOS alert dialog with a message or create a prompt for user input.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/datepickerios">DatePickerIOS</a></h3>
    <p>Renders a date/time picker (selector) on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/imagepickerios">ImagePickerIOS</a></h3>
    <p>Renders a image picker on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/navigatorios">NavigatorIOS</a></h3>
    <p>A wrapper around <code>UINavigationController</code>, enabling you to implement a navigation stack.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/progressviewios">ProgressViewIOS</a></h3>
    <p>Renders a <code>UIProgressView</a></code> on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/pushnotificationios">PushNotificationIOS</a></h3>
    <p>Handle push notifications for your app, including permission handling and icon badge number.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/segmentedcontrolios">SegmentedControlIOS</a></h3>
    <p>Renders a <code>UISegmentedControl</code> on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/tabbarios">TabBarIOS</a></h3>
    <p>Renders a <code>UITabViewController</code> on iOS. Use with <a href="tabbarios-item">TabBarIOS.Item</a>.</p>
  </div>
</div>

## Android Components and APIs

Many of the following components provide wrappers for commonly used Android classes.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="/react-native/docs/backhandler">BackHandler</a></h3>
    <p>Detect hardware button presses for back navigation.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/datepickerandroid">DatePickerAndroid</a></h3>
    <p>Opens the standard Android date picker dialog.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/drawerlayoutandroid">DrawerLayoutAndroid</a></h3>
    <p>Renders a <code>DrawerLayout</code> on Android.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/permissionsandroid">PermissionsAndroid</a></h3>
    <p>Provides access to the permissions model introduced in Android M.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/progressbarandroid">ProgressBarAndroid</a></h3>
    <p>Renders a <code>ProgressBar</code> on Android.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/timepickerandroid">TimePickerAndroid</a></h3>
    <p>Opens the standard Android time picker dialog.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/toastandroid">ToastAndroid</a></h3>
    <p>Create an Android Toast alert.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/toolbarandroid">ToolbarAndroid</a></h3>
    <p>Renders a <code>Toolbar</code> on Android.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/viewpagerandroid">ViewPagerAndroid</a></h3>
    <p>Container that allows to flip left and right between child views.</p>
  </div>
</div>

## Others

These components may come in handy for certain applications. For an exhaustive list of components and APIs, check out the sidebar to the left.

<div class="component-grid">
  <div class="component">
    <h3><a href="/react-native/docs/activityindicator">ActivityIndicator</a></h3>
    <p>Displays a circular loading indicator.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/alert">Alert</a></h3>
    <p>Launches an alert dialog with the specified title and message.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/animated">Animated</a></h3>
    <p>A library for creating fluid, powerful animations that are easy to build and maintain.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/clipboard">Clipboard</a></h3>
    <p>Provides an interface for setting and getting content from the clipboard on both iOS and Android.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/dimensions">Dimensions</a></h3>
    <p>Provides an interface for getting device dimensions.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/keyboardavoidingview">KeyboardAvoidingView</a></h3>
    <p>Provides a view that moves out of the way of the virtual keyboard automatically.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/linking">Linking</a></h3>
    <p>Provides a general interface to interact with both incoming and outgoing app links.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/modal">Modal</a></h3>
    <p>Provides a simple way to present content above an enclosing view.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/pixelratio">PixelRatio</a></h3>
    <p>Provides access to the device pixel density.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/refreshcontrol">RefreshControl</a></h3>
    <p>This component is used inside a <code>ScrollView</code> to add pull to refresh functionality.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/statusbar">StatusBar</a></h3>
    <p>Component to control the app status bar.</p>
  </div>
  <div class="component">
    <h3><a href="/react-native/docs/webview">WebView</a></h3>
    <p>A component that renders web content in a native view.</p>
  </div>
</div>
