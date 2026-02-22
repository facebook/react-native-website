---
id: components-and-apis
title: 核心组件和API
---

React Native 提供了一些内置的[核心组件](intro-react-native-components)供你使用。你可以在左侧的导航栏中找到所有组件的完整列表（如果你在窄屏设备上，请查看上方的菜单）。如果你不知道从哪看起，那么可以先看一下下面这个简单的分类：

- [基础组件](components-and-apis#基础组件)
- [交互控件](components-and-apis#交互控件)
- [列表视图](components-and-apis#列表视图)
- [Android 独有组件](components-and-apis#android-独有的组件和-api)
- [iOS 独有组件](components-and-apis#ios-独有的组件和-api)
- [其他](components-and-apis#其他)

需要说明的是，你不会被局限在这些内置组件上。React Native 有一个由数千名开发者组成的庞大社区。如果你正在寻找某个特定功能的库，请参阅[查找第三方库](libraries#finding-libraries)的指南。

## 基础组件

大多数应用都会用到这里的基础组件。

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./view">
      <h3>View</h3>
      <p>搭建用户界面的最基础组件。</p>
    </a>
  </div>
  <div className="component">
    <a href="./text">
      <h3>Text</h3>
      <p>显示文本内容的组件。</p>
    </a>
  </div>
  <div className="component">
    <a href="./image">
      <h3>Image</h3>
      <p>显示图片内容的组件。</p>
    </a>
  </div>
  <div className="component">
    <a href="./textinput">
      <h3>TextInput</h3>
      <p>通过键盘向应用输入文本的组件。</p>
    </a>
  </div>
  <div className="component">
    <a href="./pressable">
      <h3>Pressable</h3>
      <p>一个包装组件，可以检测其任何子组件上的各种按压交互阶段。</p>
    </a>
  </div>
  <div className="component">
    <a href="./scrollview">
      <h3>ScrollView</h3>
      <p>可滚动的容器视图，可以承载多个组件和视图。</p>
    </a>
  </div>
  <div className="component">
    <a href="./stylesheet">
      <h3>StyleSheet</h3>
      <p>提供类似 CSS 样式表的样式抽象层。</p>
    </a>
  </div>
</div>

## 交互控件

提供一些常见的跨平台的交互控件。

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./button">
      <h3>Button</h3>
      <p>一个简单的跨平台的按钮控件，在所有平台上都能良好渲染。</p>
    </a>
  </div>
  <div className="component">
    <a href="./switch">
      <h3>Switch</h3>
      <p>布尔值输入控件。</p>
    </a>
  </div>
</div>

## 列表视图

和一般化用途的[`ScrollView`](./scrollview)不同，下面的列表组件只会渲染当前屏幕可见的元素，这样有利于显示大量的数据。

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./flatlist">
      <h3>FlatList</h3>
      <p>高性能的滚动列表组件。</p>
    </a>
  </div>
  <div className="component">
    <a href="./sectionlist">
      <h3>SectionList</h3>
      <p>类似<code>FlatList</code>，但是多了分组显示。</p>
    </a>
  </div>
</div>

## Android 独有的组件和 API

下面的组件提供了对 Android 常用类的封装。

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./backhandler">
      <h3>BackHandler</h3>
      <p>监听并处理设备上的返回按钮。</p>
    </a>
  </div>
  <div className="component">
    <a href="./drawerlayoutandroid">
      <h3>DrawerLayoutAndroid</h3>
      <p>渲染一个<code>DrawerLayout</code>抽屉布局。</p>
    </a>
  </div>
  <div className="component">
    <a href="./permissionsandroid">
      <h3>PermissionsAndroid</h3>
      <p>对 Android M 引入的权限模型的封装。</p>
    </a>
  </div>
  <div className="component">
    <a href="./toastandroid">
      <h3>ToastAndroid</h3>
      <p>弹出一个 Android Toast 提示。</p>
    </a>
  </div>
</div>

## iOS 独有的组件和 API

下面的组件都是对常用的 UIKit 类的封装。

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./actionsheetios">
      <h3>ActionSheetIOS</h3>
      <p>用于显示 iOS 操作表或分享菜单的 API。</p>
    </a>
  </div>
</div>

## 其他

下面的组件可能适用于一些特定场景。如需完整的组件和 API 列表，请查看左侧的导航栏（窄屏上请查看上方菜单）。

<div className="component-grid">
  <div className="component">
    <a href="./activityindicator">
      <h3>ActivityIndicator</h3>
      <p>显示一个圆形的正在加载的指示器。</p>
    </a>
  </div>
  <div className="component">
    <a href="./alert">
      <h3>Alert</h3>
      <p>弹出一个提示框，显示指定的标题和信息。</p>
    </a>
  </div>
  <div className="component">
    <a href="./animated">
      <h3>Animated</h3>
      <p>易于构建和维护的动画库，可生成流畅而强大的动画。</p>
    </a>
  </div>
  <div className="component">
    <a href="./dimensions">
      <h3>Dimensions</h3>
      <p>获取设备尺寸的接口。</p>
    </a>
  </div>
  <div className="component">
    <a href="./keyboardavoidingview">
      <h3>KeyboardAvoidingView</h3>
      <p>一种视图容器，可以随虚拟键盘弹出而自动调整位置。</p>
    </a>
  </div>
  <div className="component">
    <a href="./linking">
      <h3>Linking</h3>
      <p>提供了一个通用的接口来与传入和传出的应用链接进行交互。</p>
    </a>
  </div>
  <div className="component">
    <a href="./modal">
      <h3>Modal</h3>
      <p>一种简单的在视图之上展示内容的方式。</p>
    </a>
  </div>
  <div className="component">
    <a href="./pixelratio">
      <h3>PixelRatio</h3>
      <p>获取设备的像素密度。</p>
    </a>
  </div>
  <div className="component">
    <a href="./refreshcontrol">
      <h3>RefreshControl</h3>
      <p>此组件用在<code>ScrollView</code>内部，用于添加下拉刷新功能。</p>
    </a>
  </div>
  <div className="component">
    <a href="./statusbar">
      <h3>StatusBar</h3>
      <p>用于控制应用顶部状态栏样式的组件。</p>
    </a>
  </div>
</div>
