---
id: transforms
title: 变换（Transform）
---

变换（Transform）是样式属性，可帮助您使用 2D 或 3D 变换修改组件的外观和位置。然而，即便使用了变换，使用变换的组件的布局并不会变化，因此可能会与附近的组件重叠。您可以对变换的组件、附近的组件应用边距，或对容器应用填充，以防止这种重叠。

## 示例

```SnackPlayer name=Transforms
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

const App = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <View style={styles.box}>
        <Text style={styles.text}>Original Object</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{scale: 2}],
          },
        ]}>
        <Text style={styles.text}>Scale by 2</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{scaleX: 2}],
          },
        ]}>
        <Text style={styles.text}>ScaleX by 2</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{scaleY: 2}],
          },
        ]}>
        <Text style={styles.text}>ScaleY by 2</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{rotate: '45deg'}],
          },
        ]}>
        <Text style={styles.text}>Rotate by 45 deg</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{rotateX: '45deg'}, {rotateZ: '45deg'}],
          },
        ]}>
        <Text style={styles.text}>Rotate X&Z by 45 deg</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{rotateY: '45deg'}, {rotateZ: '45deg'}],
          },
        ]}>
        <Text style={styles.text}>Rotate Y&Z by 45 deg</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{skewX: '45deg'}],
          },
        ]}>
        <Text style={styles.text}>SkewX by 45 deg</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{skewY: '45deg'}],
          },
        ]}>
        <Text style={styles.text}>SkewY by 45 deg</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{skewX: '30deg'}, {skewY: '30deg'}],
          },
        ]}>
        <Text style={styles.text}>Skew X&Y by 30 deg</Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{translateX: -50}],
          },
        ]}>
        <Text style={styles.text}>TranslateX by -50 </Text>
      </View>

      <View
        style={[
          styles.box,
          {
            transform: [{translateY: 50}],
          },
        ]}>
        <Text style={styles.text}>TranslateY by 50 </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: '#61dafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 8,
    color: '#000',
    textAlign: 'center',
  },
});

export default App;
```

---

# 文档

## Transform

`transform`接受一组变换对象或以空格分隔的字符串值。每个对象都指定将作为键进行变换的属性，以及在变换中使用的值。不应组合对象。每个对象使用单个键/值对。

旋转变换需要一个字符串，以便可以用度（deg）或弧度（rad）表示变换。例如：

```js
{
  transform: [{rotateX: '45deg'}, {rotateZ: '0.785398rad'}],
}
```

同样的效果也可以通过使用以空格分隔的字符串来实现：

```js
{
  transform: 'rotateX(45deg) rotateZ(0.785398rad)',
}
```

斜向变换需要一个字符串，以便可以用度数（度）表示变换。例如：

```js
{
  transform: [{skewX: '45deg'}],
}
```

| Type                                                                                                                                                                                                                                                                                                          | Required |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| array of objects: `{matrix: number[]}`, `{perspective: number}`, `{rotate: string}`, `{rotateX: string}`, `{rotateY: string}`, `{rotateZ: string}`, `{scale: number}`, `{scaleX: number}`, `{scaleY: number}`, `{translateX: number}`, `{translateY: number}`, `{skewX: string}`, `{skewY: string}` or string | No       |

---

### `decomposedMatrix`, `rotation`, `scaleX`, `scaleY`, `transformMatrix`, `translateX`, `translateY`

> **Deprecated.** Use the [`transform`](transforms#transform) prop instead.

## Transform Origin

`transformOrigin` 属性设置视图变换的原点。变换原点是应用变换的点。默认情况下，变换的原点是 `center`。

# 示例

```SnackPlayer name=TransformOrigin
import React, {useRef, useEffect} from 'react';
import {Animated, View, StyleSheet, SafeAreaView, Easing} from 'react-native';

const App = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.transformOriginWrapper}>
        <Animated.View
          style={[
            styles.transformOriginView,
            {
              transform: [{rotate: spin}],
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transformOriginWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  transformOriginView: {
    backgroundColor: 'pink',
    width: 100,
    height: 100,
    transformOrigin: 'top',
  },
});

export default App;
```

### Values

变换原点支持 `px`、`百分比` 和关键词 `top`、`left`、`right`、`bottom`、`center` 的值。

`transformOrigin` 属性可以使用一个、两个或三个值进行指定，其中每个值表示一个偏移。

#### 仅设置一个值：

- 值必须是`px`、`百分比`或关键词`left`、`center`、`right`、`top`和`bottom`之一。

```js
{
  transformOrigin: '20px',
  transformOrigin: 'bottom',
}
```

#### 同时设置两个值：

- 第一个值（x 偏移）必须是`px`、`百分比`或关键词`left`、`center`和`right`之一。
- 第二个值（y 偏移）必须是`px`、`百分比`或关键词`top`、`center`和`bottom`之一。

```js
{
  transformOrigin: '10px 2px',
  transformOrigin: 'left top',
  transformOrigin: 'top right',
}
```

#### 同时设置三个值：

- 第一和第二个值与两值语法相同。
- 第三个值（z 偏移）必须是`px`。它始终表示 Z 偏移。

```js
{
  transformOrigin: '2px 30% 10px',
  transformOrigin: 'right bottom 20px',
}
```

#### 数组语法

`transformOrigin` 还支持数组语法。这使得在使用动画 API 时更加方便。它还避免了字符串解析，因此应该更加高效。

```js
{
  // 可以仅使用数值
  transformOrigin: [10, 30, 40],
  // 也可以混合使用数值和百分数
  transformOrigin: [10, '20%', 0],
}
```

你可以参考 MDN 的关于 [Transform origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) 的指南获取额外信息。
