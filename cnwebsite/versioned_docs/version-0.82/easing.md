---
id: easing
title: Easing
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Easing`模块实现了常见的动画缓动函数。 这个模块被[Animated.timing()](animated.md#timing)用于在动画中传达真实可信的运动。

你可以在 http://easings.net/ 查看一些常见的缓动函数的视觉展示。

### 查看预置动画

`Easing`模块通过以下几个方法提供了几种预置的动画：

* [`back`](easing.md#back) 提供了一个简单的动画，物体在向前移动之前稍微往后退
* [`bounce`](easing.md#bounce) 提供了一个弹跳的动画效果
* [`ease`](easing.md#ease) 提供了一个简单的惯性动画效果
* [`elastic`](easing.md#elastic) 提供了一个简单的弹簧交互效果

### 查看标准函数

目前提供了三种标准缓动函数：

* [`linear`](easing.md#linear)
* [`quad`](easing.md#quad)
* [`cubic`](easing.md#cubic)

[`poly`](easing.md#poly) 函数可用于实现四次方、五次方和其他更高阶的函数。

### 查看补充函数

此外还通过以下几个方法提供了几种数学函数：

* [`bezier`](easing.md#bezier) 提供了一个三次贝塞尔曲线
* [`circle`](easing.md#circle) 提供了一个圆形函数
* [`sin`](easing.md#sin) 提供了一个正弦函数
* [`exp`](easing.md#exp) 提供了一个指数函数

以下辅助函数用于修改其他缓动函数。

* [`in`](easing.md#in) 正向运行缓动函数
* [`inOut`](easing.md#inout) 使任何缓动函数对称化
* [`out`](easing.md#out) 反向运行缓动函数

## 示例

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Easing%20Demo&ext=js
import React from 'react';
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

const App = () => {
  let opacity = new Animated.Value(0);

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: true,
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
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>Press rows below to preview the Easing!</Text>
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
    </View>
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
import React from 'react';
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
import type {EasingFunction} from 'react-native';

const App = () => {
  let opacity = new Animated.Value(0);

  const animate = (easing: EasingFunction) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: true,
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
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>Press rows below to preview the Easing!</Text>
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
    </View>
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

# 文档

## 方法

### `step0()`

```tsx
static step0(n: number);
```

一个步进函数，对于任何正数的`n`返回1。

---

### `step1()`

```tsx
static step1(n: number);
```

一个步进函数，如果`n`大于或等于1，则返回1。

---

### `linear()`

```tsx
static linear(t: number);
```

线性函数，`f(t) = t`。位置与经过的时间一一对应。

http://cubic-bezier.com/#0,0,1,1

---

### `ease()`

```tsx
static ease(t: number);
```
使任何缓动函数成为对称的。缓动函数将在持续时间的前半部分向前运行，然后在剩余时间内向后运行。

http://cubic-bezier.com/#.42,0,1,1

---

### `quad()`

默认的弹性为1，会稍微超过一次。0的弹性不会超过，而大于1的弹性将会超过N次。

http://easings.net/#easeInElastic

---

### `back()`

```tsx
static back(s)
```

与`Animated.parallel()`一起使用，可以创建一个基本效果，在动画开始时对象会稍微向后移动。

---

### `bounce()`

```tsx
static bounce(t: number);
```

提供了一个基本的反弹效果。

http://easings.net/#easeInBounce

---

### `bezier()`

```tsx
static bezier(x1: number, y1: number, x2: number, y2: number);
```

提供了一个三次贝塞尔曲线，相当于CSS Transitions中的`transition-timing-function`。

可以在 http://cubic-bezier.com/ 找到一个有用的工具来可视化三次贝塞尔曲线。

---

### `in()`

```tsx
static in(easing: number);
```
以正向运行缓动函数。

---

### `out()`
```tsx
static out(easing: number);
```
以反向运行缓动函数。
 
---
 
 ###  `inOut()` 

 ``` tsx 
 static inOut (easing：number);  
 ```
使任何缓动函数对称。 缓动函数将在持续时间的前半部分正向运行，然后在剩余时间内反向运行。
