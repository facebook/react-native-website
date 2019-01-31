---
id: version-0.58-communication-android
title: 和原生端通信
original_id: communication-android
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

通过[植入原生应用](integration-with-existing-apps.md)和[原生 UI 组件](native-component-android.md)两篇文档，我们学习了 React Native 和原生组件的互相整合。在整合的过程中，我们会需要在两个世界间互相通信。有些方法已经在其他的指南中提到了，这篇文章总结了所有可行的技术。

## 简介

React Native 是从 React 中得到的灵感，因此基本的信息流是类似的。在 React 中信息是单向的。我们维护着组件层次，在其中每个组件都仅依赖于它父组件和自己的状态。通过属性（props）我们将信息从上而下的从父组件传递到子元素。如果一个祖先组件需要自己子孙的状态，推荐的方法是传递一个回调函数给对应的子元素。

React Native 也运用了相同的概念。只要我们完全在框架内构建应用，就可以通过属性和回调函数来调动整个应用。但是，当我们混合 React Native 和原生组件时，我们需要一些特殊的，跨语言的机制来传递信息。

## 属性

属性是最简单的跨组件通信。因此我们需要一个方法从原生组件传递属性到 React Native 或者从 React Native 到原生组件。

### 从原生组件传递属性到 React Native

You can pass properties down to the React Native app by providing a custom implementation of `ReactActivityDelegate` in your main activity. This implementation should override `getLaunchOptions` to return a `Bundle` with the desired properties.

```
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

```
import React from 'react';
import {
  AppRegistry,
  View,
  Image
} from 'react-native';

class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return (
      <Image source={{uri: imgURI}} />
    );
  }
  render() {
    return (
      <View>
        {this.props.images.map(this.renderImage)}
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => ImageBrowserApp);
```

`ReactRootView` provides a read-write property `appProperties`. After `appProperties` is set, the React Native app is re-rendered with new properties. The update is only performed when the new updated properties differ from the previous ones.

```
Bundle updatedProps = mReactRootView.getAppProperties();
ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
        "http://foo.com/bar3.png",
        "http://foo.com/bar4.png"
));
updatedProps.putStringArrayList("images", imageList);

mReactRootView.setAppProperties(updatedProps);
```

It is fine to update properties anytime. However, updates have to be performed on the main thread. You use the getter on any thread.

There is no way to update only a few properties at a time. We suggest that you build it into your own wrapper instead.

> **_Note:_** Currently, JS functions `componentWillReceiveProps` and `componentWillUpdateProps` of the top level RN component will not be called after a prop update. However, you can access the new props in `componentWillMount` function.

### Passing properties from React Native to native

The problem exposing properties of native components is covered in detail in [this article](native-components-android.md#3-expose-view-property-setters-using-reactprop-or-reactpropgroup-annotation). In short, properties that are to be reflected in JavaScript needs to be exposed as setter method annotated with `@ReactProp`, then just use them in React Native as if the component was an ordinary React Native component.

### Limits of properties

The main drawback of cross-language properties is that they do not support callbacks, which would allow us to handle bottom-up data bindings. Imagine you have a small RN view that you want to be removed from the native parent view as a result of a JS action. There is no way to do that with props, as the information would need to go bottom-up.

Although we have a flavor of cross-language callbacks ([described here](native-modules-android.md#callbacks)), these callbacks are not always the thing we need. The main problem is that they are not intended to be passed as properties. Rather, this mechanism allows us to trigger a native action from JS, and handle the result of that action in JS.

## Other ways of cross-language interaction (events and native modules)

As stated in the previous chapter, using properties comes with some limitations. Sometimes properties are not enough to drive the logic of our app and we need a solution that gives more flexibility. This chapter covers other communication techniques available in React Native. They can be used for internal communication (between JS and native layers in RN) as well as for external communication (between RN and the 'pure native' part of your app).

React Native enables you to perform cross-language function calls. You can execute custom native code from JS and vice versa. Unfortunately, depending on the side we are working on, we achieve the same goal in different ways. For native - we use events mechanism to schedule an execution of a handler function in JS, while for React Native we directly call methods exported by native modules.

### Calling React Native functions from native (events)

Events are described in detail in [this article](native-components-android.md#events). Note that using events gives us no guarantees about execution time, as the event is handled on a separate thread.

Events are powerful, because they allow us to change React Native components without needing a reference to them. However, there are some pitfalls that you can fall into while using them:

* As events can be sent from anywhere, they can introduce spaghetti-style dependencies into your project.
* Events share namespace, which means that you may encounter some name collisions. Collisions will not be detected statically, which makes them hard to debug.
* If you use several instances of the same React Native component and you want to distinguish them from the perspective of your event, you'll likely need to introduce identifiers and pass them along with events (you can use the native view's `reactTag` as an identifier).

### Calling native functions from React Native (native modules)

Native modules are Java classes that are available in JS. Typically one instance of each module is created per JS bridge. They can export arbitrary functions and constants to React Native. They have been covered in detail in [this article](native-modules-android.md).

> **_Warning_**: All native modules share the same namespace. Watch out for name collisions when creating new ones.
