---
id: flexbox
title: 使用Flexbox布局
---

我们在 React Native 中使用 flexbox 规则来指定某个组件的子元素的布局。Flexbox 可以在不同屏幕尺寸上提供一致的布局结构。

一般来说，使用`flexDirection`、`alignItems`和 `justifyContent`三个样式属性就已经能满足大多数布局需求。

> 译注：这里有一份[简易布局图解](http://weibo.com/1712131295/CoRnElNkZ?ref=collection&type=comment)，可以给你一个大概的印象。

> React Native 中的 Flexbox 的工作原理和 web 上的 CSS 基本一致，当然也存在少许差异。首先是默认值不同：`flexDirection`的默认值是`column`而不是`row`，而`flex`也只能指定一个数字值。

### Flex

[`flex`](layout-props#flex) will define how your items are going to **“fill”** over the available space along your main axis. Space will be divided according to each element's flex property.

In the following example the red, yellow and the green views are all children in the container view that have `flex: 1` set. The red view uses `flex: 1` , the yellow view uses `flex: 2` and the green view uses `flex: 3` . **1+2+3 = 6** which means that the red view will get `1/6` of the space, the yellow `2/6` of the space and the green `3/6` of the space.

![Flex](https://cdn-images-1.medium.com/max/800/1*PhCFmO5tYX_sZSyCd4vO3w.png)

#### Flex Direction

在组件的`style`中指定`flexDirection`可以决定布局的**主轴**。子元素是应该沿着**水平轴(`row`)**方向排列，还是沿着**竖直轴(`column`)**方向排列呢？默认值是**竖直轴(`column`)**方向。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { View } from 'react-native';

export default class FlexDirectionBasics extends Component {
  render() {
    return (
      // 尝试把`flexDirection`改为`column`看看
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

### Layout Direction

Layout direction specifies the direction in which children and text in a hierarchy should be laid out. Layout direction also affects what edge `start` and `end` refer to. By default React Native lays out with LTR layout direction. In this mode `start` refers to left and `end` refers to right.

- `LTR` (**default value**) Text and children and laid out from left to right. Margin and padding applied the start of an element are applied on the left side.

- `RTL` Text and children and laid out from right to left. Margin and padding applied the start of an element are applied on the right side.

#### Justify Content

在组件的 style 中指定`justifyContent`可以决定其子元素沿着**主轴**的**排列方式**。子元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：`flex-start`、`center`、`flex-end`、`space-around`、`space-between`以及`space-evenly`。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { View } from 'react-native';

export default class JustifyContentBasics extends Component {
  render() {
    return (
      // 尝试把`justifyContent`改为`center`看看
      // 尝试把`flexDirection`改为`row`看看
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

#### Align Items

在组件的 style 中指定`alignItems`可以决定其子元素沿着**次轴**（与主轴垂直的轴，比如若主轴方向为`row`，则次轴方向为`column`）的**排列方式**。子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：`flex-start`、`center`、`flex-end`以及`stretch`。

> 注意：要使`stretch`选项生效的话，子元素在次轴方向上不能有固定的尺寸。以下面的代码为例：只有将子元素样式中的`width: 50`去掉之后，`alignItems: 'stretch'`才能生效。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { View } from 'react-native';

export default class AlignItemsBasics extends Component {
  render() {
    return (
      // 尝试把`alignItems`改为`flex-start`看看
      // 尝试把`justifyContent`改为`flex-end`看看
      // 尝试把`flexDirection`改为`row`看看
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 100, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

### Align Self

[`alignSelf`](https://facebook.github.io/react-native/docs/layout-props#alignself) has the same options and effect as `alignItems` but instead of affecting the children within a container, you can apply this property to a single child to change its alignment within its parent. `alignSelf` overrides any option set by the parent with `alignItems`.

![Align Self](https://cdn-images-1.medium.com/max/800/1*J1JCoKwLCokX9JXVBvP71g.png)

### Align Content

[alignContent](https://facebook.github.io/react-native/docs/layout-props#aligncontent) defines the distribution of lines along the cross-axis. This only has effect when items are wrapped to multiple lines using `flexWrap`.

- `flex-start` (**default value**) Align wrapped lines to the start of the container's cross axis.

- `flex-end` Align wrapped lines to the end of the container's cross axis.

- `stretch` wrapped lines to match the height of the container's cross axis.

- `center` Align wrapped lines in the center of the container's cross axis.

- `space-between` Evenly space wrapped lines across the container's main axis, distributing remaining space between the lines.

- `space-around` Evenly space wrapped lines across the container's main axis, distributing remaining space around the lines. Compared to space between using space around will result in space being distributed to the begining of the first lines and end of the last line.

LEARN MORE [HERE](https://yogalayout.com/docs/align-content)

![Align Content](https://cdn-images-1.medium.com/max/800/1*cC2XFyCF_igp20Ombt4wBw.png)

### Flex Wrap

The [`flexWrap`](https://facebook.github.io/react-native/docs/layout-props#flexwrap) property is set on containers and controls what happens when children overflow the size of the container along the main axis. By default children are forced into a single line (which can shrink elements). If wrapping is allowed items are wrapped into multiple lines along the main axis if needed.

When wrapping lines `alignContent` can be used to specify how the lines are placed in the container. learn more [here](https://yogalayout.com/docs/flex-wrap)

![Flex Wrap](https://cdn-images-1.medium.com/max/800/1*_7v4uQhSsuCn1cfeOMVfrA.png)

### Flex Basis, Grow, and Shrink

- [`flexGrow`](https://facebook.github.io/react-native/docs/layout-props#flexgrow) describes how any space within a container should be distributed among its children along the main axis. After laying out its children, a container will distribute any remaining space according to the flex grow values specified by its children.

  flexGrow accepts any floating point value >= 0, with 0 being the default value. A container will distribute any remaining space among its children weighted by the child’s flex grow value.

- [`flexShrink`](https://facebook.github.io/react-native/docs/layout-props#flexshrink) describes how to shrink children along the main axis in the case that the total size of the children overflow the size of the container on the main axis. Flex shrink is very similar to flex grow and can be thought of in the same way if any overflowing size is considered to be negative remaining space. These two properties also work well together by allowing children to grow and shrink as needed.

  Flex shrink accepts any floating point value >= 0, with 1 being the default value. A container will shrink its children weighted by the child’s flex shrink value.

- [`flexBasis`](https://facebook.github.io/react-native/docs/layout-props#flexbasis) is an axis-independent way of providing the default size of an item along the main axis. Setting the flex basis of a child is similar to setting the `width` of that child if its parent is a container with `flexDirection: row` or setting the `height` of a child if its parent is a container with `flexDirection: column`. The flex basis of an item is the default size of that item, the size of the item before any flex grow and flex shrink calculations are performed.

LEARN MORE [HERE](https://yogalayout.com/docs/flex)

### Width and Height

The `width` property in Yoga specifies the width of the element's content area. Similarly height property specifies the `height` of the element's content area.

Both `width` and `height` can take following values:

- `auto` Is the **default Value**, React Native calculates the width/height for the element based on its content, whether that is other children, text, or an image.

- `pixels` Defines the width/height in absolute pixels. Depending on other styles set on the component, this may or may not be the final dimension of the node.

- `percentage` Defines the width or height in percentage of its parent's width or height respectively.

### Absolute & Relative Layout

The `position` type of an element defines how it is positioned within its parent.

`relative` (**default value**) By default an element is positioned relatively. This means an element is positioned according to the normal flow of the layout, and then offset relative to that position based on the values of `top`, `right`, `bottom`, and `left`. The offset does not affect the position of any sibling or parent elements.

`absolute` When positioned absolutely an element doesn't take part in the normal layout flow. It is instead laid out independent of its siblings. The position is determined based on the `top`, `right`, `bottom`, and `left` values.

![Absolute & Relative Layoutp](https://cdn-images-1.medium.com/max/800/1*NlPeRQCQK3Vb5nyjL0Mqxw.png)

#### 深入学习

Check out the interactive [yoga playground](https://yogalayout.com/playground) that you can use to get a better understanding of flexbox.

以上我们已经介绍了一些基础知识，但要运用好布局，我们还需要很多其他的样式。对于布局有影响的完整样式列表记录在[这篇文档中](layout-props.md)。

现在我们已经差不多可以开始真正的开发工作了。哦，忘了还有个常用的知识点：[如何使用 TextInput 组件来处理用户输入](handling-text-input.md)。
