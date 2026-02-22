---
id: easing
title: Easing
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Easing` 模块实现了常见的缓动函数。此模块被 [`Animated.timing()`](animated.md#timing) 使用，用于在动画中传达物理上可信的运动效果。

你可以在 https://easings.net/ 查看一些常见缓动函数的可视化效果。

### 预定义动画

`Easing` 模块通过以下方法提供了几种预定义动画：

- [`back`](easing.md#back) 提供了一种对象在向前运动之前先稍微后退的基础动画
- [`bounce`](easing.md#bounce) 提供了弹跳动画
- [`ease`](easing.md#ease) 提供了基础的惯性动画
- [`elastic`](easing.md#elastic) 提供了基础的弹簧交互效果

### 标准函数

提供了三种标准缓动函数：

- [`linear`](easing.md#linear)
- [`quad`](easing.md#quad)
- [`cubic`](easing.md#cubic)

[`poly`](easing.md#poly) 函数可用于实现四次方、五次方及其他更高次幂的函数。

### 额外函数

以下方法提供了额外的数学函数：

- [`bezier`](easing.md#bezier) 提供三次贝塞尔曲线
- [`circle`](easing.md#circle) 提供圆形函数
- [`sin`](easing.md#sin) 提供正弦函数
- [`exp`](easing.md#exp) 提供指数函数

以下辅助函数用于修改其他缓动函数：

- [`in`](easing.md#in) 正向运行缓动函数
- [`inOut`](easing.md#inout) 使任何缓动函数变为对称的
- [`out`](easing.md#out) 反向运行缓动函数

## 示例

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Easing%20Demo&ext=js
import React, {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Easing%20Demo&ext=tsx
import React, {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type EasingFunction,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = (easing: EasingFunction) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# 参考文档

## 方法

### `step0()`

```tsx
static step0(n: number);
```

阶跃函数，对任何 `n` 的正值返回 1。

---

### `step1()`

```tsx
static step1(n: number);
```

阶跃函数，当 `n` 大于等于 1 时返回 1。

---

### `linear()`

```tsx
static linear(t: number);
```

线性函数，`f(t) = t`。位置与已经过的时间成一比一的对应关系。

https://cubic-bezier.com/#0,0,1,1

---

### `ease()`

```tsx
static ease(t: number);
```

基础惯性交互，类似于物体缓慢加速的效果。

https://cubic-bezier.com/#.42,0,1,1

---

### `quad()`

```tsx
static quad(t: number);
```

二次函数，`f(t) = t * t`。位置等于已经过时间的平方。

https://easings.net/#easeInQuad

---

### `cubic()`

```tsx
static cubic(t: number);
```

三次函数，`f(t) = t * t * t`。位置等于已经过时间的立方。

https://easings.net/#easeInCubic

---

### `poly()`

```tsx
static poly(n: number);
```

幂函数。位置等于已经过时间的 N 次幂。

n = 4: https://easings.net/#easeInQuart n = 5: https://easings.net/#easeInQuint

---

### `sin()`

```tsx
static sin(t: number);
```

正弦函数。

https://easings.net/#easeInSine

---

### `circle()`

```tsx
static circle(t: number);
```

圆形函数。

https://easings.net/#easeInCirc

---

### `exp()`

```tsx
static exp(t: number);
```

指数函数。

https://easings.net/#easeInExpo

---

### `elastic()`

```tsx
static elastic(bounciness: number);
```

基础弹性交互，类似于弹簧来回振荡的效果。

默认弹性系数为 1，会稍微过冲一次。弹性系数为 0 时完全不会过冲，弹性系数 N > 1 时大约会过冲 N 次。

https://easings.net/#easeInElastic

---

### `back()`

```tsx
static back(s)
```

与 `Animated.parallel()` 配合使用，创建动画开始时对象稍微后退的基础效果。

---

### `bounce()`

```tsx
static bounce(t: number);
```

提供基础的弹跳效果。

https://easings.net/#easeInBounce

---

### `bezier()`

```tsx
static bezier(x1: number, y1: number, x2: number, y2: number);
```

提供三次贝塞尔曲线，等同于 CSS Transitions 的 `transition-timing-function`。

可以在 https://cubic-bezier.com/ 查看三次贝塞尔曲线的可视化工具。

---

### `in()`

```tsx
static in(easing: number);
```

正向运行缓动函数。

---

### `out()`

```tsx
static out(easing: number);
```

反向运行缓动函数。

---

### `inOut()`

```tsx
static inOut(easing: number);
```

使任何缓动函数变为对称的。缓动函数在前半段时间内正向运行，在后半段时间内反向运行。
