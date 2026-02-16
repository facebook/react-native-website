---
id: global-intersectionobserver
title: IntersectionObserver 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

全局 [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) 接口，遵循 Web 规范定义。它提供了一种异步观察目标元素与祖先元素或顶层文档视口交叉状态变化的方法。

---

# 参考

## 构造函数

### `IntersectionObserver()`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)。

创建一个新的 `IntersectionObserver` 对象，当检测到目标元素的可见性超过一个或多个 `threshold` 或 `rnRootThreshold` 值时，会执行指定的回调函数。

```ts
new IntersectionObserver(callback, options?)
```

#### 参数

**`callback`**

当目标元素的可见比例超过阈值时调用的函数。回调接收两个参数：

- `entries`：一个 [`IntersectionObserverEntry`](global-intersectionobserverentry) 对象数组，每个对象代表一个被超过的阈值——目标元素的可见程度相对于该阈值指定的百分比有所增加或减少。
- `observer`：调用该回调的 `IntersectionObserver` 实例。

**`options`**（可选）

一个可选对象，包含以下属性：

| 名称                 | 类型                             | 说明                                                                                                                                                                       |
| -------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`               | [Element](element-nodes) \| null | 目标的祖先元素，其边界矩形将被视为视口。如果未指定或为 `null`，则默认为根视口。                                                                                                 |
| `rootMargin`         | string                           | 计算交叉时添加到根边界框的偏移量字符串。默认为 `"0px 0px 0px 0px"`。                                                                                                          |
| `threshold`          | number \| number[]               | 一个数值或数值数组（范围 0.0 到 1.0），指定目标元素交叉面积与总边界框面积的比值。如果未设置 `rnRootThreshold`，则默认为 `[0]`。                                                      |
| `rnRootThreshold` ⚠️ | number \| number[]               | **React Native 特有。** 一个数值或数值数组（范围 0.0 到 1.0），指定交叉面积与根元素总面积的比值。                                                                                  |

## 实例属性

### `root`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root)。

用于进行交叉测试时作为边界框的元素或文档。

### `rootMargin`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin)。

计算交叉时应用于根边界框的偏移矩形。

### `rnRootThresholds` ⚠️

:::warning 非标准
这是 React Native 特有的扩展。
:::

一个按升序排列的根阈值列表，其中每个阈值是交叉面积与指定根视图（默认为视口）边界框面积的比值。

当观察目标的 `rnRootThresholds` 或 `thresholds` 中指定的任一阈值被超过时，会生成通知。

```ts
get rnRootThresholds(): ReadonlyArray<number> | null;
```

### `thresholds`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds)。

一个按升序排列的阈值列表，其中每个阈值是交叉面积与观察目标边界框面积的比值。

当观察目标的 `rnRootThresholds` 或 `thresholds` 中指定的任一阈值被超过时，会生成通知。

## 实例方法

### `disconnect()`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect)。

停止 `IntersectionObserver` 对象对所有目标的观察。

### `observe()`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe)。

告知 `IntersectionObserver` 开始观察指定的目标元素。

### `takeRecords()`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/takeRecords)。

返回所有已观察目标的 `IntersectionObserverEntry` 对象数组。

### `unobserve()`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve)。

告知 `IntersectionObserver` 停止观察指定的目标元素。
