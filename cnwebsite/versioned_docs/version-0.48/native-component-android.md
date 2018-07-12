---
id: version-0.48-native-component-android
title: 原生UI组件
original_id: native-component-android
---

在如今的App中，已经有成千上万的原生UI部件了——其中的一些是平台的一部分，另一些可能来自于一些第三方库，而且可能你自己还收藏了很多。React Native已经封装了大部分最常见的组件，譬如`ScrollView`和`TextInput`，但不可能封装全部组件。而且，说不定你曾经为自己以前的App还封装过一些组件，React Native肯定没法包含它们。幸运的是，在React Naitve应用程序中封装和植入已有的组件非常简单。

和原生模块向导一样，本向导也是一个相对高级的向导，我们假设你已经对Android编程颇有经验。本向导会引导你如何构建一个原生UI组件，带领你了解React Native核心库中`ImageView`组件的具体实现。

## ImageView样例

在这个例子里，我们来看看为了让JavaScript中可以使用ImageView，需要做哪些准备工作。

原生视图需要被一个`ViewManager`的派生类（或者更常见的，`SimpleViewManage`的派生类）创建和管理。一个`SimpleViewManager`可以用于这个场景，是因为它能够包含更多公共的属性，譬如背景颜色、透明度、Flexbox布局等等。

这些子类本质上都是单例——React Native只会为每个管理器创建一个实例。它们创建原生的视图并提供给`NativeViewHierarchyManager`，NativeViewHierarchyManager则会反过来委托它们在需要的时候去设置和更新视图的属性。`ViewManager`还会代理视图的所有委托，并给JavaScript发回对应的事件。

提供原生视图很简单：

1. 创建一个ViewManager的子类。
2. 实现`createViewInstance`方法。
3. 导出视图的属性设置器：使用`@ReactProp`（或`@ReactPropGroup`）注解。
4. 把这个视图管理类注册到应用程序包的`createViewManagers`里。
5. 实现JavaScript模块。

## 1. 创建`ViewManager`的子类

在这个例子里我们创建一个视图管理类`ReactImageManager`，它继承自`SimpleViewManager<ReactImageView>`。`ReactImageView`是这个视图管理类所管理的对象类型，这应当是一个自定义的原生视图。`getName`方法返回的名字会用于在JavaScript端引用这个原生视图类型。

```java
...

public class ReactImageManager extends SimpleViewManager<ReactImageView> {

  public static final String REACT_CLASS = "RCTImageView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }
```

## 2. 实现方法`createViewInstance`

视图在`createViewInstance`中创建，且应当把自己初始化为默认的状态。所有属性的设置都通过后续的`updateView`来进行。

```java
  @Override
  public ReactImageView createViewInstance(ThemedReactContext context) {
    return new ReactImageView(context, Fresco.newDraweeControllerBuilder(), mCallerContext);
  }
```

## 3. 通过`@ReactProp`（或`@ReactPropGroup`）注解来导出属性的设置方法。

要导出给JavaScript使用的属性，需要申明带有`@ReactProp`（或`@ReactPropGroup`）注解的设置方法。方法的第一个参数是要修改属性的视图实例，第二个参数是要设置的属性值。方法的返回值类型必须为`void`，而且访问控制必须被声明为`public`。JavaScript所得知的属性类型会由该方法第二个参数的类型来自动决定。支持的类型有：`boolean`, `int`, `float`, `double`, `String`, `Boolean`, `Integer`, `ReadableArray`, `ReadableMap`。

`@ReactProp`注解必须包含一个字符串类型的参数`name`。这个参数指定了对应属性在JavaScript端的名字。

除了`name`，`@ReactProp`注解还接受这些可选的参数：`defaultBoolean`, `defaultInt`, `defaultFloat`。这些参数必须是对应的基础类型的值（也就是`boolean`, `int`, `float`），这些值会被传递给setter方法，以免JavaScript端某些情况下在组件中移除了对应的属性。注意这个"默认"值只对基本类型生效，对于其他的类型而言，当对应的属性删除时，`null`会作为默认值提供给方法。

使用`@ReactPropGroup`来注解的设置方法和`@ReactProp`不同。请参见`@ReactPropGroup`注解类源代码中的文档来获取更多详情。

**重要！** 在ReactJS里，修改一个属性会引发一次对设置方法的调用。有一种修改情况是，移除掉之前设置的属性。在这种情况下设置方法也一样会被调用，并且“默认”值会被作为参数提供（对于基础类型来说可以通过`defaultBoolean`、`defaultFloat`等`@ReactProp`的属性提供，而对于复杂类型来说参数则会设置为`null`）

```java
  @ReactProp(name = "src")
  public void setSrc(ReactImageView view, @Nullable String src) {
    view.setSource(src);
  }
  
  @ReactProp(name = "borderRadius", defaultFloat = 0f)
  public void setBorderRadius(ReactImageView view, float borderRadius) {
    view.setBorderRadius(borderRadius);
  }
  
  @ReactProp(name = ViewProps.RESIZE_MODE)
  public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
    view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
  }
```

## 4. 注册`ViewManager`

在Java中的最后一步就是把视图控制器注册到应用中。这和[原生模块](NativeModulesAndroid.md)的注册方法类似，唯一的区别是我们把它放到`createViewManagers`方法的返回值里。

```java
  @Override
  public List<ViewManager> createViewManagers(
                            ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new ReactImageManager()
    );
  }
```

## 5. 实现对应的JavaScript模块

整个过程的最后一步就是创建JavaScript模块并且定义Java和JavaScript之间的接口层。大部分过程都由React底层的Java和JavaScript代码来完成，你所需要做的就是通过`propTypes`来描述属性的类型。

```js
// ImageView.js

import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'ImageView',
  propTypes: {
    src: PropTypes.string,
    borderRadius: PropTypes.number,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
    ...View.propTypes // 包含默认的View的属性
  },
};

module.exports = requireNativeComponent('RCTImageView', iface);
```

`requireNativeComponent`通常接受两个参数，第一个参数是原生视图的名字，而第二个参数是一个描述组件接口的对象。组件接口应当声明一个友好的`name`，用来在调试信息中显示；组件接口还必须声明`propTypes`字段，用来对应到原生视图上。这个`propTypes`还可以用来检查用户使用View的方式是否正确。

注意，如果你还需要一个JavaScript组件来做一些除了指定`name`和`propTypes`以外的事情，譬如事件处理，你可以把原生组件用一个普通React组件封装。在这种情况下，`requireNativeComponent`的第二个参数变为用于封装的组件。这个在后文的`MyCustomView`例子里面用到。

_译注_：和原生模块不同，原生视图的前缀RCT不会被自动去掉。

# 事件

现在我们已经知道了怎么导出一个原生视图组件，并且我们可以在JS里很方便的控制它了。不过我们怎么才能处理来自用户的事件，譬如缩放操作或者拖动？当一个原生事件发生的时候，它应该也能触发JavaScript端视图上的事件，这两个视图会依据getId()而关联在一起。

```java
class MyCustomView extends View {
   ...
   public void onReceiveNativeEvent() {
      WritableMap event = Arguments.createMap();
      event.putString("message", "MyMessage");
      ReactContext reactContext = (ReactContext)getContext();
      reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
          getId(),
          "topChange",
          event);
    }
}
```

这个事件名`topChange`在JavaScript端映射到`onChange`回调属性上（这个映射关系在`UIManagerModuleConstants.java`文件里）。这个回调会被原生事件执行，然后我们通常会在封装组件里构造一个类似的API：

```js
// MyCustomView.js

class MyCustomView extends React.Component {
  constructor() {
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event: Event) {
    if (!this.props.onChangeMessage) {
      return;
    }
    this.props.onChangeMessage(event.nativeEvent.message);
  }
  render() {
    return <RCTMyCustomView {...this.props} onChange={this._onChange} />;
  }
}
MyCustomView.propTypes = {
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onChangeMessage: React.PropTypes.func,
  ...
};

var RCTMyCustomView = requireNativeComponent(`RCTMyCustomView`, MyCustomView, {
  nativeOnly: {onChange: true}
});
```

注意上面用到了`nativeOnly`。有时候有一些特殊的属性，想从原生组件中导出，但是又不希望它们成为对应React封装组件的属性。举个例子，`Switch`组件可能在原生组件上有一个`onChange`事件，然后在封装类中导出`onValueChange`回调属性。这个属性在调用的时候会带上Switch的状态作为参数之一。这样的话你可能不希望原生专用的属性出现在API之中，也就不希望把它放到`propTypes`里。可是如果你不放的话，又会出现一个报错。解决方案就是带上`nativeOnly`选项。
