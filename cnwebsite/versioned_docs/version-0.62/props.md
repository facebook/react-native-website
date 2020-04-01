---
id: version-0.62-props
title: Props（属性）
original_id: props
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

大多数组件在创建时就可以使用各种参数来进行定制。用于定制的这些参数就称为`props`（属性）。

以常见的基础组件`Image`为例，在创建一个图片时，可以传入一个名为`source`的 prop 来指定要显示的图片的地址，以及使用名为`style`的 prop 来控制其尺寸。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { Image } from 'react-native';

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}} />
    );
  }
}
```

译注：在 iOS 上使用 http 链接的图片地址可能不会显示，参见[这篇说明修改](https://segmentfault.com/a/1190000002933776)。从 Android9 开始，也会默认阻止 http 请求，请参考[相关配置](https://blog.csdn.net/qq_40347548/article/details/86766932)

请注意`{pic}`外围有一层括号，我们需要用括号来把`pic`这个变量嵌入到 JSX 语句中。括号的意思是括号内部为一个 js 变量或表达式，需要执行后取值。因此我们可以把任意合法的 JavaScript 表达式通过括号嵌入到 JSX 语句中。

自定义的组件也可以使用`props`。通过在不同的场景使用不同的属性定制，可以尽量提高自定义组件的复用范畴。只需在`render`函数中引用`this.props`，然后按需处理即可。下面是一个例子：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}
```

我们在`Greeting`组件中将`name`作为一个属性来定制，这样可以复用这一组件来制作各种不同的“问候语”。上面的例子把`Greeting`组件写在 JSX 语句中，用法和内置组件并无二致——这正是 React 体系的魅力所在——如果你想搭建一套自己的基础 UI 框架，那就放手做吧！

上面的例子出现了一样新的名为[`View`](view.md)的组件。[`View`](view.md) 常用作其他组件的容器，来帮助控制布局和样式。

仅仅使用`props`和基础的[`Text`](text.md)、[`Image`](image.md)以及[`View`](view.md)组件，你就已经足以编写各式各样的 UI 组件了。要学习如何动态修改你的界面，那就需要进一步[学习 State（状态）的概念](state.md)。
