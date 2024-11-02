---
id: layout-props
title: 布局属性
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

> 更多关于这些属性的详细示例可以在[Flexbox 布局](flexbox)页面上找到。

### 示例

以下示例展示了不同属性如何影响或塑造 React Native 布局。您可以尝试添加或删除 UI 中的正方形，同时更改属性`flexWrap`的值。

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=LayoutProps%20Example&ext=js
import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
  const justifyContents = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ];
  const alignItemsArr = [
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ];
  const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
  const directions = ['inherit', 'ltr', 'rtl'];
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  };

  const changeSetting = (value, options, setterFunction) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };
  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);
  return (
    <>
      <View style={{paddingTop: StatusBar.currentHeight}} />
      <View style={[styles.container, styles.playingSpace, hookedStyles]}>
        {squares.map(elem => elem)}
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.controlSpace}>
          <View style={styles.buttonView}>
            <Button
              title="Change Flex Direction"
              onPress={() =>
                changeSetting(flexDirection, flexDirections, setFlexDirection)
              }
            />
            <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Justify Content"
              onPress={() =>
                changeSetting(
                  justifyContent,
                  justifyContents,
                  setJustifyContent,
                )
              }
            />
            <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Align Items"
              onPress={() =>
                changeSetting(alignItems, alignItemsArr, setAlignItems)
              }
            />
            <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Direction"
              onPress={() => changeSetting(direction, directions, setDirection)}
            />
            <Text style={styles.text}>{directions[direction]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Flex Wrap"
              onPress={() => changeSetting(wrap, wraps, setWrap)}
            />
            <Text style={styles.text}>{wraps[wrap]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Add Square"
              onPress={() => setSquares([...squares, <Square />])}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Delete Square"
              onPress={() =>
                setSquares(squares.filter((v, i) => i !== squares.length - 1))
              }
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {textAlign: 'center'},
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 16).toString(16);
  });
};

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=LayoutProps%20Example&ext=tsx
import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const flexDirections = [
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ] as const;
  const justifyContents = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ] as const;
  const alignItemsArr = [
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ] as const;
  const wraps = ['nowrap', 'wrap', 'wrap-reverse'] as const;
  const directions = ['inherit', 'ltr', 'rtl'] as const;
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  };

  const changeSetting = (
    value: number,
    options: readonly unknown[],
    setterFunction: (index: number) => void,
  ) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };
  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);
  return (
    <>
      <View style={{paddingTop: StatusBar.currentHeight}} />
      <View style={[styles.container, styles.playingSpace, hookedStyles]}>
        {squares.map(elem => elem)}
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.controlSpace}>
          <View style={styles.buttonView}>
            <Button
              title="Change Flex Direction"
              onPress={() =>
                changeSetting(flexDirection, flexDirections, setFlexDirection)
              }
            />
            <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Justify Content"
              onPress={() =>
                changeSetting(
                  justifyContent,
                  justifyContents,
                  setJustifyContent,
                )
              }
            />
            <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Align Items"
              onPress={() =>
                changeSetting(alignItems, alignItemsArr, setAlignItems)
              }
            />
            <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Direction"
              onPress={() => changeSetting(direction, directions, setDirection)}
            />
            <Text style={styles.text}>{directions[direction]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Flex Wrap"
              onPress={() => changeSetting(wrap, wraps, setWrap)}
            />
            <Text style={styles.text}>{wraps[wrap]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Add Square"
              onPress={() => setSquares([...squares, <Square />])}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Delete Square"
              onPress={() =>
                setSquares(squares.filter((v, i) => i !== squares.length - 1))
              }
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {textAlign: 'center'},
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 16).toString(16);
  });
};

export default App;
```

</TabItem>
</Tabs>

---

# 文档

## 属性

### `alignContent`

`alignContent`控制行在交叉轴上的对齐方式,会覆盖父级元素设置的`alignContent`属性。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/align-content 来进一步了解。

| 类型                                                                                                 | 必需 |
| ---------------------------------------------------------------------------------------------------- | ---- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly') | 否   |

---

### `alignItems`

`alignItems` 属性用于控制子元素在交叉轴上的对齐方式。举个例子，如果子元素垂直排列,那么 `alignItems` 就决定了它们在水平方向上的对齐方式。它的用法类似 CSS 中的`align-items`(默认值为 stretch)。详情请参阅 https://developer.mozilla.org/en-US/docs/Web/CSS/align-items

| 类型                                                            | 必需 |
| --------------------------------------------------------------- | ---- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline') | 否   |

---

### `alignSelf`

`alignSelf` 控制子元素在纵向上的对齐方式，会覆盖父元素的 `alignItems` 属性。其作用类似于 CSS 中的`align-self`(默认值:auto)。详情请参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self

| 类型                                                                    | 必需 |
| ----------------------------------------------------------------------- | ---- |
| enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline') | 否   |

---

### `aspectRatio`

长宽比控制了节点未定义维度的尺寸。详情请参阅 https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio

- 对于设置了宽度/高度的节点，长宽比控制着未设置尺寸的一边大小。
- 对于设置了 flex 值的节点，若未设置其在交叉轴方向的尺寸，长宽比决定着该节点沿交叉轴的尺寸。
- 若节点使用了测量函数，长宽比将视同测量函数测量了 flex 值。
- 对于设置了 flex grow/shrink 的节点，若其在交叉轴方向的尺寸未设置，长宽比将决定该尺寸。
- 长宽比同时考虑了最小/最大尺寸约束。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `borderBottomWidth`

borderBottomWidth 与 CSS 中的 border-bottom-width 属性作用相同。详情请参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-width

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `borderEndWidth`

当方向为 `ltr` 时，`borderEndWidth` 等同于 `borderRightWidth`。当方向为 `rtl` 时，`borderEndWidth` 等同于 `borderLeftWidth`。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `borderLeftWidth`

`borderLeftWidth` 的作用类似于 CSS 中的 `border-left-width`。详情请参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-width

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `borderRightWidth`

`borderRightWidth` 的作用与 CSS 中的 `border-right-width` 属性类似。详情请参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-width

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `borderStartWidth`

当方向为 `ltr` 时，`borderStartWidth` 相当于 `borderLeftWidth`。当方向为 `rtl` 时，`borderStartWidth` 相当于 `borderRightWidth`。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `borderTopWidth`

`borderTopWidth` 的作用类似于 CSS 中的 `border-top-width`。详情请参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-width

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `borderWidth`

`borderWidth` 的作用类似于 CSS 中的 `border-width`。详情请参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `bottom`

`bottom` 是指将此组件底部边缘向下偏移的逻辑像素数。

它与 CSS 中的 `bottom` 类似，但在 React Native 中，您必须使用点或百分比。不支持 em 和其他单位。

有关 `bottom` 如何影响布局的更多详细信息，请参见 https://developer.mozilla.org/en-US/docs/Web/CSS/bottom

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `columnGap`

`columnGap` 的作用类似于 CSS 中的 `column-gap`。在 React Native 中仅支持像素单位。有关更多详细信息，请查看 https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `direction`

`direction`指定了用户界面的阅读顺序。`ltr`表示 left to right，即从左往右阅读。反之`rtl`为从右往左阅读。默认值为`inherit`，但根节点的值会根据用户所在地的不同而不同。访问 https://yogalayout.com/docs/layout-direction 来进一步了解。

| 类型                          | 必需 | 平台 |
| ----------------------------- | ---- | ---- |
| enum('inherit', 'ltr', 'rtl') | 否   | iOS  |

---

### `display`

`display`设置组件的显示类型。可用于元素的显示和隐藏。

它的表现和 CSS 上的`display`类似，但目前只支持'flex'和'none'两个值。默认值是'flex'。

| 类型                 | 必需 |
| -------------------- | ---- |
| enum('none', 'flex') | 否   |

---

### `end`

当`direction`设置为`ltr`时，`end`等同于`right`。当`direction`设置为`rtl`，`end`等同于`left`。

此样式的优先级高于`left`和`right`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `flex`

在 React Native 中`flex`的表现和 CSS 有些区别。`flex`在 RN 中只能为整数值，其具体表现请参考`yoga`布局引擎的文档，其地址为 https://github.com/facebook/yoga

当`flex`为一个正整数时，组件尺寸会具有弹性，并根据具体的 flex 值来按比例分配。比如两个组件在同一个父容器中，一个`flex`为 2，另一个`flex`为 1，则两者的尺寸比为 2：1。 `flex: <positive number>` equates to `flexGrow: <positive number>, flexShrink: 1, flexBasis: 0`.

当`flex`为 0 时，组件尺寸由`width`和`height`决定，此时不再具有弹性。

当`flex`为-1 时，组件尺寸一般还是由`width`和`height`决定。但是当空间不够时，组件尺寸会收缩到`minWidth`和`minHeight`所设定的值。

`flexGrow`、`flexShrink`、`flexBasis`和在 CSS 上表现一致。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `flexBasis`

`flexBasis` 是一种与轴无关的提供项目沿主轴默认大小的方式。设置一个子元素的 `flexBasis` 与其父元素为 `flexDirection: row` 的容器时设置该子元素的 `width` 类似，或者与其父元素为 `flexDirection: column` 的容器时设置该子元素的 `height` 类似。一个项目的 `flexBasis` 是该项目的默认大小，即在执行任何 `flexGrow` 和 `flexShrink` 计算之前项目的大小。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `flexDirection`

`flexDirection` 控制容器内子元素的排列方向。`row` 为从左到右排列,`column` 为从上到下排列,你可以猜测其他两种方式的效果。它的作用类似于 CSS 中的 `flex-direction` 属性，只不过默认值是 `column`。 访问 https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction 来进一步了解。

| 类型                                                   | 必需 |
| ------------------------------------------------------ | ---- |
| enum('row', 'row-reverse', 'column', 'column-reverse') | 否   |

---

### `flexGrow`

在设置 flexGrow 属性时,它描述了在主轴方向上容器中的剩余空间应该如何分配给子元素。在布局子元素后,容器将根据子元素的 flexGrow 值按比例分配剩余空间。
flexGrow 接受任意大于等于 0 的浮点数,默认值为 0。容器中剩余的空间将按子元素的 flexGrow 值加权分配。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `flexShrink`

[`flexShrink`](layout-props#flexshrink) 描述了在子元素的总大小超出主轴方向容器大小时，如何沿着主轴缩小子元素。`flexShrink` 与 `flexGrow` 非常相似，如果将任何溢出的大小视为负剩余空间，可以以相同的方式考虑它。这两个属性一起使用效果也很好，允许子元素根据需要进行扩展和收缩。

`flexShrink` 接受任何大于等于 0 的浮点值，其中 0 是默认值。容器会根据子元素的 `flexShrink` 值加权缩小其子元素。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `flexWrap`

`flexWrap` 控制子元素在到达弹性容器末端后是否可以换行。它的工作原理类似于 CSS 中的 `flex-wrap`（默认值：nowrap）。访问 https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap
以获取更多信息。注意，它不再与 `alignItems: stretch`（默认值）一起工作，因此您可能希望使用例如 `alignItems: flex-start`（破坏性变更详情：https://github.com/facebook/react-native/releases/tag/v0.28.0）。

| 类型                                   | 必需 |
| -------------------------------------- | ---- |
| enum('wrap', 'nowrap', 'wrap-reverse') | 否   |

---

### `gap`

`gap`效果和 CSS 中的`gap`一样。React Native 中仅支持像素单位。更多细节请参阅https://developer.mozilla.org/en-US/docs/Web/CSS/gap

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `height`

`height`用于设置组件的高度。

它的表现和 CSS 上的`height`类似， but in React Native 只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。 访问 https://developer.mozilla.org/en-US/docs/Web/CSS/height 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `justifyContent`

`justifyContent` 用于在主方向上对齐子元素。例如，如果子元素垂直流动，`justifyContent` 控制它们如何垂直对齐。它的作用类似于 CSS 中的 `justify-content`（默认值：flex-start）。 访问 https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content 来进一步了解。

| 类型                                                                                      | 必需 |
| ----------------------------------------------------------------------------------------- | ---- |
| enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly') | 否   |

---

### `left`

`left`值是指将本组件定位到距离左边多少个逻辑像素（左边的定义取决于`position`属性）。

它的表现和 CSS 上的`left`类似， but in React Native 只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

想了解 `left` 属性对布局的影响,请访问 https://developer.mozilla.org/zh-CN/docs/Web/CSS/left 查看更多细节。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `margin`

设置`margin`相当于同时设置`marginTop`、`marginLeft`、`marginBottom`以及`marginRight`。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/margin 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginBottom`

`marginBottom`和 CSS 上的`margin-bottom`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginEnd`

当方向为 `ltr` 时，`marginEnd` 相当于 `marginRight`。当方向为 `rtl` 时，`marginEnd` 相当于 `marginLeft`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginHorizontal`

设置`marginHorizontal`相当于同时设置`marginLeft`和`marginRight`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginLeft`

`marginLeft`和 CSS 上的`margin-left`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginRight`

`marginRight`和 CSS 上的`margin-right`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginStart`

当方向为 `ltr` 时，`marginStart` 相当于 `marginLeft`。当方向为 `rtl` 时，`marginStart` 相当于 `marginRight`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginTop`

`marginTop`和 CSS 上的`margin-top`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `marginVertical`

设置`marginVertical`相当于同时设置`marginTop`和`marginBottom`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `maxHeight`

`maxHeight` 是该组件的最大高度，以逻辑像素为单位。

它的表现和 CSS 上的`max-height`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

访问 https://developer.mozilla.org/en-US/docs/Web/CSS/max-height 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `maxWidth`

`maxWidth` 是该组件的最大宽度，以逻辑像素为单位。

它的表现和 CSS 上的`max-width`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

访问 https://developer.mozilla.org/en-US/docs/Web/CSS/max-width 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `minHeight`

`minHeight` 是该组件的最小高度，以逻辑像素为单位。

它的表现和 CSS 上的`min-height`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

访问 https://developer.mozilla.org/en-US/docs/Web/CSS/min-height 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `minWidth`

`minWidth` 是该组件的最小宽度，以逻辑像素为单位。

它的表现和 CSS 上的`min-width`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

访问 https://developer.mozilla.org/en-US/docs/Web/CSS/min-width 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `overflow`

`overflow` 控制子元素的测量和显示方式。`overflow: hidden` 会导致视图被裁剪，而 `overflow: scroll` 会导致视图独立于其父元素的主轴进行测量。它的工作原理类似于 CSS 中的 `overflow`（默认值：visible）。 访问 https://developer.mozilla.org/en/docs/Web/CSS/overflow 来进一步了解。

| 类型                                | 必需 |
| ----------------------------------- | ---- |
| enum('visible', 'hidden', 'scroll') | 否   |

---

### `padding`

设置`padding`相当于同时设置`paddingTop`、`paddingBottom`、`paddingLeft`以及`paddingRight`。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/padding 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingBottom`

`paddingBottom`和 CSS 上的`padding-bottom`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingEnd`

当方向为 `ltr` 时,`paddingEnd` 相当于 `paddingRight`。当方向为 `rtl` 时,`paddingEnd` 相当于 `paddingLeft`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingHorizontal`

设置`paddingHorizontal`相当于同时设置`paddingLeft`和`paddingRight`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingLeft`

`paddingLeft`和 CSS 上的`padding-left`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingRight`

`paddingRight`和 CSS 上的`padding-right`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingStart`

当方向为 `ltr` 时，`paddingStart` 等同于 `paddingLeft`。当方向为 `rtl` 时，`paddingStart` 等同于 `paddingRight`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingTop`

`paddingTop`和 CSS 上的`padding-top`表现一致。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `paddingVertical`

设置`paddingVertical`相当于同时设置`paddingTop`和`paddingBottom`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `position`

在 React Native 中，`position`与常规 CSS 类似，但默认情况下所有元素都设置为`relative`，因此`absolute`定位始终是相对于父元素的。

如果您想要使用特定数量的逻辑像素相对于其父元素来定位子元素，请将子元素设置为具有`absolute`位置。

如果您想要将子元素相对于不是其父元素的对象进行定位，请不要为此使用样式。请使用组件树。

有关 React Native 和 CSS 之间`position`差异的更多详细信息，请参见 https://github.com/facebook/yoga

| 类型                         | 必需 |
| ---------------------------- | ---- |
| enum('absolute', 'relative') | 否   |

---

### `right`

`right`值是指将本组件定位到距离右边多少个逻辑像素（右边的定义取决于`position`属性）。

它的表现和 CSS 上的`right`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

访问 https://developer.mozilla.org/en-US/docs/Web/CSS/right 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `rowGap`

`rowGap` 的功能类似于 CSS 中的 `row-gap`。React Native 仅支持像素单位。有关更多详细信息，请查看 https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `start`

当`direction`设置为`ltr`时，`start`等同于`left`。当`direction`设置为`rtl`，`start`等同于`right`。

此样式的优先级高于`left`、`right`和`end`。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `top`

`top`值是指将本组件定位到距离顶部多少个逻辑像素（顶部的定义取决于`position`属性）。

它的表现和 CSS 上的`top`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。

访问 https://developer.mozilla.org/en-US/docs/Web/CSS/top 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `width`

`width`设置组件的宽度。

它的表现和 CSS 上的`width`类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。 访问 https://developer.mozilla.org/en-US/docs/Web/CSS/width 来进一步了解。

| 类型           | 必需 |
| -------------- | ---- |
| number, string | 否   |

---

### `zIndex`

`zIndex`控制着组件的堆叠覆盖顺序。多数情况下你不会用到此样式。默认情况下组件按其在文档树的顺序依次渲染，所以在代码结构上靠后的组件会覆盖前面的组件（如果它们在布局上有重叠的部分）。有时候在写一些动画或者自定义的模态窗口时，你可能会需要设置`zIndex`样式来改变层叠覆盖顺序。

它的表现和 CSS 上的`z-index`一致——`zIndex`大的在上面。这里面的`z`意味着三维空间中的`z轴`，你可以想象成垂直于手机屏幕指向你的眼睛的坐标轴。访问 https://developer.mozilla.org/en-US/docs/Web/CSS/z-index 来进一步了解。

在 iOS 上，使用`zIndex`可能需要`View`彼此为兄弟节点才能生效。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---
