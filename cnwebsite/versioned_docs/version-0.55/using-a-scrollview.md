---
id: version-0.55-using-a-scrollview
title: 使用滚动视图
original_id: using-a-scrollview
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

[`ScrollView`](scrollview.md)是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。ScrollView 不仅可以垂直滚动，还能水平滚动（通过`horizontal`属性来设置）。

下面的示例代码创建了一个垂直滚动的`ScrollView`，其中还混杂了图片和文字组件。

注：下面的这个`./img/favicon.png`并不实际存在，请自己准备图片素材，并改为相对应的正确路径，具体请参考[图片文档](images.md)。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
      return (
        <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Text style={{fontSize:96}}>If you like</Text>
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Image source={require('/react-native/img/favicon.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}
```

ScrollViews can be configured to allow paging through views using swiping gestures by using the `pagingEnabled` props. Swiping horizontally between views can also be implemented on Android using the [ViewPagerAndroid](viewpagerandroid.md) component.

A ScrollView with a single item can be used to allow the user to zoom content. Set up the `maximumZoomScale` and `minimumZoomScale` props and your user will be able to use pinch and expand gestures to zoom in and out.

`ScrollView`适合用来显示数量不多的滚动元素。放置在`ScollView`中的所有组件都会被渲染，哪怕有些组件因为内容太长被挤出了屏幕外。如果你需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的`FlatList`组件。下面我们来看看[如何使用长列表](using-a-listview.md)。
