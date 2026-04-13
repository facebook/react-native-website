---
id: communication-android
title: 原生端与 React Native 的通信
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

通过[植入原生应用](integration-with-existing-apps)和[原生 UI 组件](legacy/native-components-android)两篇文档，我们学习了如何将 React Native 嵌入原生组件，以及反过来的做法。在混合使用的过程中，我们不可避免地需要在这两个世界之间进行通信。有些方法已经在其他指南中提到了，这篇文章总结了所有可用的通信技术。

## 简介

React Native 从 React 中获得灵感，因此基本的信息流是类似的。React 中的信息流是单向的。我们维护着一个组件层级结构，其中每个组件仅依赖于其父组件和自身的内部状态。我们通过属性（props）实现这一点：数据以自顶向下的方式从父组件传递到子组件。如果祖先组件需要依赖后代组件的状态，则应该向下传递一个回调函数，供后代组件调用来更新祖先组件的状态。

React Native 同样适用这一概念。只要我们完全在框架内构建应用，就可以通过属性和回调函数来驱动整个应用。但是，当我们混合 React Native 和原生组件时，我们需要一些特殊的、跨语言的机制来在它们之间传递信息。

## 属性

属性是最直接的跨组件通信方式。因此我们需要一种方法，既能从原生端向 React Native 传递属性，也能从 React Native 向原生端传递属性。

### 从原生端向 React Native 传递属性

你可以通过在主 Activity 中自定义 `ReactActivityDelegate` 的实现来向 React Native 应用传递属性。该实现应该重写 `getLaunchOptions` 方法，返回一个包含所需属性的 `Bundle` 对象。

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
                "https://dummyimage.com/600x400/ffffff/000000.png",
                "https://dummyimage.com/600x400/000000/ffffff.png"
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
                val imageList = arrayListOf("https://dummyimage.com/600x400/ffffff/000000.png", "https://dummyimage.com/600x400/000000/ffffff.png")
                val initialProperties = Bundle().apply { putStringArrayList("images", imageList) }
                return initialProperties
            }
        }
    }
}
```

</TabItem>
</Tabs>

```tsx
import React from 'react';
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{uri: imgURI}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`ReactRootView` 提供了一个可读写的属性 `appProperties`。在设置了 `appProperties` 后，React Native 应用会使用新的属性重新渲染。只有当新的属性与之前的属性不同时，才会执行更新。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
Bundle updatedProps = mReactRootView.getAppProperties();
ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
        "https://dummyimage.com/600x400/ff0000/000000.png",
        "https://dummyimage.com/600x400/ffffff/ff0000.png"
));
updatedProps.putStringArrayList("images", imageList);

mReactRootView.setAppProperties(updatedProps);
```

</TabItem>

<TabItem value="kotlin">

```kotlin
var updatedProps: Bundle = reactRootView.getAppProperties()
var imageList = arrayListOf("https://dummyimage.com/600x400/ff0000/000000.png", "https://dummyimage.com/600x400/ffffff/ff0000.png")
```

</TabItem>

</Tabs>

随时更新属性都是可以的。但是，更新操作必须在主线程上执行。getter 方法可以在任何线程上调用。

目前没有方法只更新部分属性。我们建议你在此基础上构建自己的包装器来实现这个功能。

:::info
目前，顶层 RN 组件的 JS 函数 `componentWillUpdateProps` 不会在属性更新后被调用。但是，你可以在 `componentDidMount` 函数中访问新的 props。
:::

### 从 React Native 向原生端传递属性

暴露原生组件属性的问题在[这篇文章](legacy/native-components-android#3-expose-view-property-setters-using-reactprop-or-reactpropgroup-annotation)中有详细介绍。简而言之，要在 JavaScript 中反映的属性需要公开为带有 `@ReactProp` 注解的 setter 方法，然后在 React Native 中像使用普通 React Native 组件一样使用它们。

### 属性的限制

跨语言属性的主要缺点是不支持回调函数，这意味着无法处理自下而上的数据绑定。假设你有一个小型 RN 视图，希望通过 JS 操作将其从原生父视图中移除。使用 props 无法实现这个目标，因为信息需要自下而上传递。

虽然我们有一种跨语言回调机制（[在此描述](legacy/native-modules-android#callbacks)），但这些回调并不总是能满足需求。主要问题在于它们并非设计为通过属性传递。该机制允许我们从 JS 触发原生操作，并在 JS 中处理该操作的结果。

## 其他跨语言交互方式（事件和原生模块）

如前所述，使用属性在某些场景下存在限制。有时属性不足以驱动应用的逻辑，我们需要更灵活的方案。本节介绍 React Native 中其他可用的通信技术，它们既可以用于内部通信（RN 中 JS 与原生层之间），也可以用于外部通信（RN 与你应用的"纯原生"部分之间）。

React Native 支持跨语言函数调用。你可以从 JS 执行自定义原生代码，反之亦然。不过，根据调用方向的不同，实现方式也有所不同。对于原生端——我们使用事件机制来调度 JS 中处理函数的执行；而对于 React Native 端——则直接调用原生模块导出的方法。

### 从原生端调用 React Native 函数（事件）

事件的详细说明请参阅[这篇文章](legacy/native-components-android#events)。请注意，使用事件无法保证执行时间，因为事件是在单独的线程上处理的。

事件非常强大，因为它允许我们无需持有引用就能更改 React Native 组件。但是，在使用时需要注意以下陷阱：

- 由于事件可以从任何地方发送，可能会给项目带来复杂的依赖关系。
- 事件共享命名空间，这意味着可能会遇到名称冲突。冲突无法被静态检测到，因此难以调试。
- 如果你使用了多个相同 React Native 组件的实例，并且希望从事件的角度区分它们，则可能需要引入标识符并将其随事件一起传递（可以使用原生视图的 `reactTag` 作为标识符）。

### 从 React Native 调用原生函数（原生模块）

原生模块是在 JS 中可用的 Java/Kotlin 类。通常每个 JS 桥接器会创建一个模块实例。它们可以向 React Native 导出任意函数和常量。详细内容请参阅[这篇文章](legacy/native-modules-android)。

:::warning
所有原生模块共享同一个命名空间。创建新模块时请注意避免名称冲突。
:::
