---
id: communication-android
title: 和原生端通信
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

通过[植入原生应用](integration-with-existing-apps)和[原生 UI 组件](native-components-android)两篇文档，我们学习了 React Native 和原生组件的互相整合。在整合的过程中，我们会需要在两个世界间互相通信。有些方法已经在其他的指南中提到了，这篇文章总结了所有可行的技术。

## 简介

React Native 是从 React 中得到的灵感，因此基本的信息流是类似的。在 React 中信息是单向的。我们维护着组件层次，在其中每个组件都仅依赖于它父组件和自己的状态。通过属性（props）我们将信息从上而下的从父组件传递到子元素。如果一个祖先组件需要自己子孙的状态，推荐的方法是传递一个回调函数给对应的子元素。

React Native 也运用了相同的概念。只要我们完全在框架内构建应用，就可以通过属性和回调函数来调动整个应用。但是，当我们混合 React Native 和原生组件时，我们需要一些特殊的，跨语言的机制来传递信息。

## 属性

属性是最简单的跨组件通信。因此我们需要一个方法从原生组件传递属性到 React Native 或者从 React Native 到原生组件。

### 从原生组件传递属性到 React Native

你可以通过在主activity中提供`ReactActivityDelegate`的自定义实现来将属性传递给React Native应用程序。这个实现应该重写`getLaunchOptions`方法，返回一个带有所需属性的`Bundle`对象。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
public class MainActivity extends ReactActivity {
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected Bundle getLaunchOptions() {
        Bundle initialProperties = new Bundle();
        ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
                "http://foo.com/bar1.png",
                "http://foo.com/bar2.png"
        ));
        initialProperties.putStringArrayList("images", imageList);
        return initialProperties;
      }
    };
  }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
class MainActivity : ReactActivity() {
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle {
                val imageList = arrayListOf("http://foo.com/bar1.png", "http://foo.com/bar2.png")
                val initialProperties = Bundle().apply { putStringArrayList("images", imageList) }
                return initialProperties
            }
        }
    }
}
```

</TabItem>
</Tabs>

```jsx
import React from 'react';
import { View, Image } from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{ uri: imgURI }} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`ReactRootView` 提供了一个可读写的属性 `appProperties`。在设置了 `appProperties` 后，React Native 应用会使用新的属性重新渲染。只有当新更新的属性与之前的属性不同时，才会执行更新。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
Bundle updatedProps = mReactRootView.getAppProperties();
ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
        "http://foo.com/bar3.png",
        "http://foo.com/bar4.png"
));
updatedProps.putStringArrayList("images", imageList);

mReactRootView.setAppProperties(updatedProps);
```

</TabItem>

<TabItem value="kotlin">

```kotlin
var updatedProps: Bundle = reactRootView.getAppProperties()
var imageList = arrayListOf("http://foo.com/bar3.png", "http://foo.com/bar4.png")
```

</TabItem>

</Tabs>

随时更新属性都是可以的。但是，更新操作必须在主线程上执行。你可以在任何线程上使用getter。

目前没有办法只更新部分属性。我们建议你自己构建一个包装器来实现这个功能。

> **_注意:_** 目前，在React Native的顶层组件中，JS函数`componentWillUpdateProps`不会在属性更新后被调用。然而，你可以在`componentDidMount`函数中访问新的props。

### 从React Native传递属性到原生组件

在[native-components-android#3-expose-view-property-setters-using-reactprop-or-reactpropgroup-annotation](native-components-android#3-expose-view-property-setters-using-reactprop-or-reactpropgroup-annotation)这篇文章中详细介绍了暴露原生组件属性的问题。简而言之，要将需要在JavaScript中反映的属性公开为带有`@ReactProp`注解的setter方法，然后在React Native中使用它们，就像该组件是普通的React Native组件一样。

### 属性的限制

跨语言属性的主要缺点是它们不支持回调函数，这将允许我们处理自下而上的数据绑定。想象一下，您有一个小型RN视图，您希望通过JS操作从原生父视图中移除它。使用props没有办法实现此目标，因为信息需要自下而上传递。

虽然我们有一种跨语言回调函数（[在此处描述](native-modules-android#callbacks)），但这些回调函数并不总是我们所需的东西。主要问题是它们不打算作为属性传递。相反，该机制允许我们从JS触发本地操作，并在JS中处理该操作的结果。

## 跨语言交互方式（事件和原生模块）

如前一章所述，在某些情况下使用属性存在一些限制。有时属性不足以驱动我们应用程序的逻辑，我们需要一种提供更大灵活性的解决方案。本章介绍了React Native中可用的其他通信技术。它们可以用于内部通信（在RN中JS和原生层之间）以及外部通信（在RN和您应用程序的“纯原生”部分之间）。

React Native使您能够执行跨语言函数调用。您可以从JS执行自定义原生代码，反之亦然。不幸的是，根据我们所工作的一侧，我们以不同方式实现相同目标。对于原生 - 我们使用事件机制来安排在JS中执行处理程序函数，而对于React Native，则直接调用由原生模块导出的方法。

### 从原生调用React Native函数（事件）

事件在[native-components-android#events](native-components-android#events)这篇文章中有详细描述。请注意，使用事件不能保证执行时间，因为事件是在单独线程上处理的。

事件非常强大，因为它们允许我们无需引用即可更改React Native组件。但是，在使用它们时可能会遇到一些陷阱：

- 由于事件可以从任何地方发送，因此可能会将意大利面式依赖关系引入项目。
- 事件共享命名空间，这意味着可能会遇到某些名称冲突。冲突不会被静态检测到，这使得调试变得困难。
- 如果您使用了多个相同的React Native组件实例，并且希望从事件的角度区分它们，则可能需要引入标识符并将其与事件一起传递（可以使用原生视图的`reactTag`作为标识符）。

### 从React Native调用原生函数（原生模块）

原生模块是在JS中可用的Java/Kotlin类。通常，每个JS桥接器都会创建一个模块实例。它们可以向React Native导出任意函数和常量。有关详细信息，请参阅[native-modules-android](native-modules-android)中对其进行了详细介绍。

> **_警告_**：所有原生模块共享相同的命名空间。
