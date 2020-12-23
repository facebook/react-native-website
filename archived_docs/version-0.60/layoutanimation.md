---
id: version-0.60-layoutanimation
title: LayoutAnimation
original_id: layoutanimation
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

当布局变化时，自动将视图运动到它们新的位置上。

一个常用的调用此 API 的办法是调用`LayoutAnimation.configureNext`，然后调用`setState`。

注意如果要在**Android**上使用此动画，则需要在代码中启用：

```
import { UIManager } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
```

上面这段代码应该写在任何组件加载之前，比如可以写到 index.js 的开头。

### 查看方法

* [`configureNext`](layoutanimation.md#configurenext)
* [`create`](layoutanimation.md#create)

### 查看属性

* [`Types`](layoutanimation.md#types)
* [`Properties`](layoutanimation.md#properties)
* [`Presets`](layoutanimation.md#presets)
* [`easeInEaseOut`](layoutanimation.md#easeineaseout)
* [`linear`](layoutanimation.md#linear)
* [`spring`](layoutanimation.md#spring)

---

# 文档

## 方法

### `configureNext()`

```jsx
static configureNext(config, onAnimationDidEnd?)
```

计划下一次布局要发生的动画。

#### 参数：

| 名称              | 类型     | 必填 | 说明                                |
| ----------------- | -------- | ---- | ----------------------------------- |
| config            | object   | 是   | 看下面的说明。                      |
| onAnimationDidEnd | function | 否   | 动画结束后的回调。目前仅 iOS 可用。 |

##### config

* `duration` 动画持续时间，单位是毫秒。
* `create`，配置创建新视图时的动画。（参阅`Anim`类型）
* `update`，配置被更新的视图的动画。（参阅`Anim`类型）

---

### `create()`

```jsx
static create(duration, type, creationProp)
```

用来创建`configureNext`所需的 config 参数的辅助函数。

---

## 属性

An enumerate of object property to be animated, used in [`create`](layoutanimation.md#create) method.

| Properties |
| ---------- |
| opacity    |
| scaleX     |
| scaleY     |
| scaleXY    |

---

### Presets

A set of predefined animation config.

| Presets       | Value                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| easeInEaseOut | `create(300, 'easeInEaseOut', 'opacity')`                                                                                                                             |
| linear        | `create(500, 'linear', 'opacity')`                                                                                                                                    |
| spring        | `{ duration: 700, create: { type: 'linear', property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 }, delete: { type: 'linear', property: 'opacity' } }` |

---

### easeInEaseOut

Shortcut to bind `configureNext()` methods with `Presets.easeInEaseOut`.

---

### linear

Shortcut to bind `configureNext()` methods with `Presets.linear`.

---

### spring

Shortcut to bind `configureNext()` methods with `Presets.spring`.