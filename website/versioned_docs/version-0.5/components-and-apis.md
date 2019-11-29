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
    <a href="./view">
      <h3>View</h3>
      <p>The most fundamental component for building a UI.</p>
    </a>
  </div>
  <div class="component">
    <a href="./text">
      <h3>Text</h3>
      <p>A component for displaying text.</p>
    </a>
  </div>
  <div class="component">
    <a href="./image">
      <h3>Image</h3>
      <p>A component for displaying images.</p>
    </a>
  </div>
  <div class="component">
    <a href="./textinput">
      <h3>TextInput</h3>
      <p>A component for inputting text into the app via a keyboard.</p>
    </a>
  </div>
  <div class="component">
    <a href="./scrollview">
      <h3>ScrollView</h3>
      <p>Provides a scrolling container that can host multiple components and views.</p>
    </a>
  </div>
  <div class="component">
    <a href="./stylesheet">
      <h3>StyleSheet</h3>
      <p>Provides an abstraction layer similar to CSS stylesheets.</p>
    </a>
  </div>
</div>

## User Interface

Render common user interface controls on any platform using the following components. For platform specific components, keep reading.

<div class="component-grid component-grid-border">
  <div class="component">
    <a href="./button">
      <h3>Button</h3>
      <p>A basic button component for handling touches that should render nicely on any platform.</p>
    </a>
  </div>
  <div class="component">
    <a href="./picker">
      <h3>Picker</h3>
      <p>Renders the native picker component on Android and iOS.</p>
    </a>
  </div>
  <div class="component">
    <a href="./slider">
      <h3>Slider</h3>
      <p>A component used to select a single value from a range of values.</p>
    </a>
  </div>
  <div class="component">
    <a href="./switch">
      <h3>Switch</h3>
      <p>Renders a boolean input.</p>
    </a>
  </div>
</div>

## List Views

Unlike the more generic [`ScrollView`](./scrollview.md), the following list view components only render elements that are currently showing on the screen. This makes them a great choice for displaying long lists of data.

<div class="component-grid component-grid-border">
  <div class="component">
    <a href="./flatlist">
      <h3>FlatList</h3>
      <p>A component for rendering performant scrollable lists.</p>
    </a>
  </div>
  <div class="component">
    <a href="./sectionlist">
      <h3>SectionList</h3>
      <p>Like <code>FlatList</code>, but for sectioned lists.</p>
    </a>
  </div>
</div>

## iOS Components and APIs

Many of the following components provide wrappers for commonly used UIKit classes.

<div class="component-grid component-grid-border">
  <div class="component">
    <a href="./actionsheetios">
      <h3>ActionSheetIOS</h3>
      <p>API to display an iOS action sheet or share sheet.</p>
    </a>
  </div>
  <div class="component">
    <a href="./alertios">
      <h3>AlertIOS</h3>
      <p>Create an iOS alert dialog with a message or create a prompt for user input.</p>
    </a>
  </div>
  <div class="component">
    <a href="./datepickerios">
      <h3>DatePickerIOS</h3>
      <p>Renders a date/time picker (selector) on iOS.</p>
    </a>
  </div>
  <div class="component">
    <a href="./imagepickerios">
      <h3>ImagePickerIOS</h3>
      <p>Renders a image picker on iOS.</p>
    </a>
  </div>
  <div class="component">
    <a href="./progressviewios">
      <h3>ProgressViewIOS</h3>
      <p>Renders a <code>UIProgressView</code> on iOS.</p>
    </a>
  </div>
  <div class="component">
    <a href="./pushnotificationios">
      <h3>PushNotificationIOS</h3>
      <p>Handle push notifications for your app, including permission handling and icon badge number.</p>
    </a>
  </div>
  <div class="component">
    <a href="./segmentedcontrolios">
      <h3>SegmentedControlIOS</h3>
      <p>Renders a <code>UISegmentedControl</code> on iOS.</p>
    </a>
  </div>
</div>

## Android Components and APIs

Many of the following components provide wrappers for commonly used Android classes.

<div class="component-grid component-grid-border">
  <div class="component">
    <a href="./backhandler">
      <h3>BackHandler</a></h3>
      <p>Detect hardware button presses for back navigation.</p>
    </a>
  </div>
  <div class="component">
    <a href="./datepickerandroid">
      <h3>DatePickerAndroid</h3>
      <p>Opens the standard Android date picker dialog.</p>
    </a>
  </div>
  <div class="component">
    <a href="./drawerlayoutandroid">
      <h3>DrawerLayoutAndroid</h3>
      <p>Renders a <code>DrawerLayout</code> on Android.</p>
    </a>
  </div>
  <div class="component">
    <a href="./permissionsandroid">
      <h3>PermissionsAndroid</a></h3>
      <p>Provides access to the permissions model introduced in Android M.</p>
    </a>
  </div>
  <div class="component">
    <a href="./progressbarandroid">
      <h3>ProgressBarAndroid</h3>
      <p>Renders a <code>ProgressBar</code> on Android.</p>
    </a>
  </div>
  <div class="component">
    <a href="./timepickerandroid">
      <h3>TimePickerAndroid</h3>
      <p>Opens the standard Android time picker dialog.</p>
    </a>
  </div>
  <div class="component">
    <a href="./toastandroid">
      <h3>ToastAndroid</h3>
      <p>Create an Android Toast alert.</p>
    </a>
  </div>
  <div class="component">
    <a href="./toolbarandroid">
      <h3>ToolbarAndroid</h3>
      <p>Renders a <code>Toolbar</code> on Android.</p>
    </a>
  </div>
  <div class="component">
    <a href="./viewpagerandroid">
      <h3>ViewPagerAndroid</h3>
      <p>Container that allows to flip left and right between child views.</p>
    </a>
  </div>
</div>

## Others

These components may come in handy for certain applications. For an exhaustive list of components and APIs, check out the sidebar to the left.

<div class="component-grid">
  <div class="component">
    <a href="./activityindicator">
      <h3>ActivityIndicator</h3>
      <p>Displays a circular loading indicator.</p>
    </a>
  </div>
  <div class="component">
    <a href="./alert">
      <h3>Alert</h3>
      <p>Launches an alert dialog with the specified title and message.</p>
    </a>
  </div>
  <div class="component">
    <a href="./animated">
      <h3>Animated</h3>
      <p>A library for creating fluid, powerful animations that are easy to build and maintain.</p>
    </a>
  </div>
  <div class="component">
    <a href="./clipboard">
      <h3>Clipboard</h3>
      <p>Provides an interface for setting and getting content from the clipboard on both Android and iOS.</p>
    </a>
  </div>
  <div class="component">
    <a href="./dimensions">
      <h3>Dimensions</h3>
      <p>Provides an interface for getting device dimensions.</p>
    </a>
  </div>
  <div class="component">
    <a href="./keyboardavoidingview">
      <h3>KeyboardAvoidingView</h3>
      <p>Provides a view that moves out of the way of the virtual keyboard automatically.</p>
    </a>
  </div>
  <div class="component">
    <a href="./linking">
      <h3>Linking</h3>
      <p>Provides a general interface to interact with both incoming and outgoing app links.</p>
    </a>
  </div>
  <div class="component">
    <a href="./modal">
      <h3>Modal</h3>
      <p>Provides a simple way to present content above an enclosing view.</p>
    </a>
  </div>
  <div class="component">
    <a href="./pixelratio">
      <h3>PixelRatio</h3>
      <p>Provides access to the device pixel density.</p>
    </a>
  </div>
  <div class="component">
    <a href="./refreshcontrol">
      <h3>RefreshControl</h3>
      <p>This component is used inside a <code>ScrollView</code> to add pull to refresh functionality.</p>
    </a>
  </div>
  <div class="component">
    <a href="./statusbar">
      <h3>StatusBar</h3>
      <p>Component to control the app status bar.</p>
    </a>
  </div>
</div>
