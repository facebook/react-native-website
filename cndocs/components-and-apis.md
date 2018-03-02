---
id: components-and-apis
title: 组件和API
---

React Native 提供了一些内置的组件。你可以在网站的左侧看到组件的完整列表。如果你不知道从哪看起，那么可以先看一下下面这个简单的分类：

* [基础组件](components-and-apis.md#基础组件)
* [交互控件](components-and-apis.md#交互控件)
* [列表视图](components-and-apis.md#列表视图)
* [iOS 独有组件](components-and-apis.md#iOS 独有的组件和 API)
* [Android 独有组件](components-and-apis.md#Android 独有的组件和 API)
* [其他](components-and-apis.md#其他)

需要说明的是，你不会被局限在这些内置组件上。React Native 是大开源社区的作品，所以你还可以在 github 或是 npm 上搜索到带有`react native`关键字的大量的第三方组件。

## 基础组件

大多数应用都会用到这里的基础组件。如果你是新手的话，那更应该先好好熟悉一下这些组件：

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="view.html">View</a></h3>
    <p>搭建用户界面的最基础组件。</p>
  </div>
  <div class="component">
    <h3><a href="text.html">Text</a></h3>
    <p>显示文本内容的组件。</p>
  </div>
  <div class="component">
    <h3><a href="image.html">Image</a></h3>
    <p>显示图片内容的组件</p>
  </div>
  <div class="component">
    <h3><a href="textinput.html">TextInput</a></h3>
    <p>文本输入框。</p>
  </div>
  <div class="component">
    <h3><a href="scrollview.html">ScrollView</a></h3>
    <p>可滚动的容器视图。</p>
  </div>
  <div class="component">
    <h3><a href="stylesheet.html">StyleSheet</a></h3>
    <p>提供类似CSS样式表的样式抽象层。</p>
  </div>
</div>

## 交互控件

提供一些常见的跨平台的交互控件。

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="button.html">Button</a></h3>
    <p>一个简单的跨平台的按钮控件。</p>
  </div>
  <div class="component">
    <h3><a href="picker.html">Picker</a></h3>
    <p>在iOS和Android上调用各自原生的选择器控件。</p>
  </div>
  <div class="component">
    <h3><a href="slider.html">Slider</a></h3>
    <p>滑动数值选择器。</p>
  </div>
  <div class="component">
    <h3><a href="switch.html">Switch</a></h3>
    <p>开关控件。</p>
  </div>
</div>

## 列表视图

和一般化用途的`ScrollView`不同，下面的列表组件只会渲染当前屏幕可见的元素，这样有利于显示大量的数据。

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="flatlist.html">FlatList</a></h3>
    <p>高性能的滚动列表组件。</p>
  </div>
  <div class="component">
    <h3><a href="sectionlist.html">SectionList</a></h3>
    <p>类似<code>FlatList</code>，但是多了分组显示。</p>
  </div>
</div>

## iOS 独有的组件和 API

Many of the following components provide wrappers for commonly used UIKit classes.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="actionsheetios.html">ActionSheetIOS</a></h3>
    <p>API to display an iOS action sheet or share sheet.</p>
  </div>
  <div class="component">
    <h3><a href="alertios.html">AlertIOS</a></h3>
    <p>Create an iOS alert dialog with a message or create a prompt for user input.</p>
  </div>
  <div class="component">
    <h3><a href="datepickerios.html">DatePickerIOS</a></h3>
    <p>Renders a date/time picker (selector) on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="imagepickerios.html">ImagePickerIOS</a></h3>
    <p>Renders a image picker on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="navigatorios.html">NavigatorIOS</a></h3>
    <p>A wrapper around <code>UINavigationController</code>, enabling you to implement a navigation stack.</p>
  </div>
  <div class="component">
    <h3><a href="progressviewios.html">ProgressViewIOS</a></h3>
    <p>Renders a <code>UIProgressView</a></code> on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="pushnotificationios.html">PushNotificationIOS</a></h3>
    <p>Handle push notifications for your app, including permission handling and icon badge number.</p>
  </div>
  <div class="component">
    <h3><a href="segmentedcontrolios.html">SegmentedControlIOS</a></h3>
    <p>Renders a <code>UISegmentedControl</code> on iOS.</p>
  </div>
  <div class="component">
    <h3><a href="tabbarios.html">TabBarIOS</a></h3>
    <p>Renders a <code>UITabViewController</code> on iOS. Use with <a href="tabbarios-item.html">TabBarIOS.Item</a>.</p>
  </div>
</div>

## Android 独有的组件和 API

Many of the following components provide wrappers for commonly used Android classes.

<div class="component-grid component-grid-border">
  <div class="component">
    <h3><a href="backhandler.html">BackHandler</a></h3>
    <p>Detect hardware button presses for back navigation.</p>
  </div>
  <div class="component">
    <h3><a href="datepickerandroid.html">DatePickerAndroid</a></h3>
    <p>Opens the standard Android date picker dialog.</p>
  </div>
  <div class="component">
    <h3><a href="drawerlayoutandroid.html">DrawerLayoutAndroid</a></h3>
    <p>Renders a <code>DrawerLayout</code> on Android.</p>
  </div>
  <div class="component">
    <h3><a href="permissionsandroid.html">PermissionsAndroid</a></h3>
    <p>Provides access to the permissions model introduced in Android M.</p>
  </div>
  <div class="component">
    <h3><a href="progressbarandroid.html">ProgressBarAndroid</a></h3>
    <p>Renders a <code>ProgressBar</code> on Android.</p>
  </div>
  <div class="component">
    <h3><a href="timepickerandroid.html">TimePickerAndroid</a></h3>
    <p>Opens the standard Android time picker dialog.</p>
  </div>
  <div class="component">
    <h3><a href="toastandroid.html">ToastAndroid</a></h3>
    <p>Create an Android Toast alert.</p>
  </div>
  <div class="component">
    <h3><a href="toolbarandroid.html">ToolbarAndroid</a></h3>
    <p>Renders a <code>Toolbar</code> on Android.</p>
  </div>
  <div class="component">
    <h3><a href="viewpagerandroid.html">ViewPagerAndroid</a></h3>
    <p>Container that allows to flip left and right between child views.</p>
  </div>
</div>

## 其他

下面的组件可能适用于一些特定场景。

<div class="component-grid">
  <div class="component">
    <h3><a href="activityindicator.html">ActivityIndicator</a></h3>
    <p>显示一个圆形的正在加载的符号。</p>
  </div>
  <div class="component">
    <h3><a href="alert.html">Alert</a></h3>
    <p>Launches an alert dialog with the specified title and message.</p>
  </div>
  <div class="component">
    <h3><a href="animated.html">Animated</a></h3>
    <p>A library for creating fluid, powerful animations that are easy to build and maintain.</p>
  </div>
  <div class="component">
    <h3><a href="cameraroll.html">CameraRoll</a></h3>
    <p>Provides access to the local camera roll / gallery.</p>
  </div>
  <div class="component">
    <h3><a href="clipboard.html">Clipboard</a></h3>
    <p>Provides an interface for setting and getting content from the clipboard on both iOS and Android.</p>
  </div>
  <div class="component">
    <h3><a href="dimensions.html">Dimensions</a></h3>
    <p>Provides an interface for getting device dimensions.</p>
  </div>
  <div class="component">
    <h3><a href="keyboardavoidingview.html">KeyboardAvoidingView</a></h3>
    <p>Provides a view that moves out of the way of the virtual keyboard automatically.</p>
  </div>
  <div class="component">
    <h3><a href="linking.html">Linking</a></h3>
    <p>Provides a general interface to interact with both incoming and outgoing app links.</p>
  </div>
  <div class="component">
    <h3><a href="modal.html">Modal</a></h3>
    <p>Provides a simple way to present content above an enclosing view.</p>
  </div>
  <div class="component">
    <h3><a href="pixelratio.html">PixelRatio</a></h3>
    <p>可以获取设备的像素密度。</p>
  </div>
  <div class="component">
    <h3><a href="refreshcontrol.html">RefreshControl</a></h3>
    <p>此组件用在<code>ScrollView</code>及其衍生组件的内部，用于添加下拉刷新的功能。</p>
  </div>
  <div class="component">
    <h3><a href="statusbar.html">StatusBar</a></h3>
    <p>用于控制应用顶部状态栏样式的组件。</p>
  </div>
  <div class="component">
    <h3><a href="webview.html">WebView</a></h3>
    <p>在原生视图中显示Web内容的组件。</p>
  </div>
</div>
