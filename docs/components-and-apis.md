---
id: components-and-apis
title: Core Components and APIs
---

React Native provides a number of built-in [Core Components](intro-react-native-components) ready for you to use in your app. You can find them all in the left sidebar (or menu above, if you are on a narrow screen). If you're not sure where to get started, take a look at the following categories:

- [Basic Components](#basic-components)
- [User Interface](#user-interface)
- [List Views](#list-views)
- [iOS-specific](#ios-components-and-apis)
- [Android-specific](#android-components-and-apis)
- [Others](#others)

You're not limited to the components and APIs bundled with React Native. React Native has a community of thousands of developers. If you're looking for a library that does something specific, please refer to [this guide about finding libraries](libraries#finding-libraries).

## Basic Components

Most apps will end up using one of these basic components.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="/docs/view">
      <h3>View</h3>
      <p>The most fundamental component for building a UI.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/text">
      <h3>Text</h3>
      <p>A component for displaying text.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/image">
      <h3>Image</h3>
      <p>A component for displaying images.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/textinput">
      <h3>TextInput</h3>
      <p>A component for inputting text into the app via a keyboard.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/scrollview">
      <h3>ScrollView</h3>
      <p>Provides a scrolling container that can host multiple components and views.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/stylesheet">
      <h3>StyleSheet</h3>
      <p>Provides an abstraction layer similar to CSS stylesheets.</p>
    </a>
  </div>
</div>

## User Interface

These common user interface controls will render on any platform.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="/docs/button">
      <h3>Button</h3>
      <p>A basic button component for handling touches that should render nicely on any platform.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/switch">
      <h3>Switch</h3>
      <p>Renders a boolean input.</p>
    </a>
  </div>
</div>

## List Views

Unlike the more generic [`ScrollView`](/docs/scrollview), the following list view components only render elements that are currently showing on the screen. This makes them a performant choice for displaying long lists of data.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="/docs/flatlist">
      <h3>FlatList</h3>
      <p>A component for rendering performant scrollable lists.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/sectionlist">
      <h3>SectionList</h3>
      <p>Like <code>FlatList</code>, but for sectioned lists.</p>
    </a>
  </div>
</div>

## iOS Components and APIs

Many of the following components provide wrappers for commonly used UIKit classes.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="/docs/actionsheetios">
      <h3>ActionSheetIOS</h3>
      <p>API to display an iOS action sheet or share sheet.</p>
    </a>
  </div>
</div>
## Android Components and APIs

Many of the following components provide wrappers for commonly used Android classes.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="/docs/backhandler">
      </a><h3><a href="/docs/backhandler">BackHandler</a></h3>
      <p>Detect hardware button presses for back navigation.</p>
    
  </div>
  <div className="component">
    <a href="/docs/drawerlayoutandroid">
      <h3>DrawerLayoutAndroid</h3>
      <p>Renders a <code>DrawerLayout</code> on Android.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/permissionsandroid">
      </a><h3><a href="/docs/permissionsandroid">PermissionsAndroid</a></h3>
      <p>Provides access to the permissions model introduced in Android M.</p>
    
  </div>
  <div className="component">
    <a href="/docs/toastandroid">
      <h3>ToastAndroid</h3>
      <p>Create an Android Toast alert.</p>
    </a>
  </div>
</div>

## Others

These components may be useful for certain applications. For an exhaustive list of components and APIs, check out the sidebar to the left (or menu above, if you are on a narrow screen).

<div className="component-grid">
  <div className="component">
    <a href="/docs/activityindicator">
      <h3>ActivityIndicator</h3>
      <p>Displays a circular loading indicator.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/alert">
      <h3>Alert</h3>
      <p>Launches an alert dialog with the specified title and message.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/animated">
      <h3>Animated</h3>
      <p>A library for creating fluid, powerful animations that are easy to build and maintain.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/dimensions">
      <h3>Dimensions</h3>
      <p>Provides an interface for getting device dimensions.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/keyboardavoidingview">
      <h3>KeyboardAvoidingView</h3>
      <p>Provides a view that moves out of the way of the virtual keyboard automatically.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/linking">
      <h3>Linking</h3>
      <p>Provides a general interface to interact with both incoming and outgoing app links.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/modal">
      <h3>Modal</h3>
      <p>Provides a simple way to present content above an enclosing view.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/pixelratio">
      <h3>PixelRatio</h3>
      <p>Provides access to the device pixel density.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/refreshcontrol">
      <h3>RefreshControl</h3>
      <p>This component is used inside a <code>ScrollView</code> to add pull to refresh functionality.</p>
    </a>
  </div>
  <div className="component">
    <a href="/docs/statusbar">
      <h3>StatusBar</h3>
      <p>Component to control the app status bar.</p>
    </a>
  </div>
</div>

