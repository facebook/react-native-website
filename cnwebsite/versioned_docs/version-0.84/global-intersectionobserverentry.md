---
id: global-intersectionobserverentry
title: IntersectionObserverEntry 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

[`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) 接口，遵循 Web 规范定义。它描述了目标元素与其根容器在特定时刻的交叉状态。

`IntersectionObserverEntry` 的实例通过 [`IntersectionObserver`](global-intersectionobserver) 回调函数的 `entries` 参数传递。

---

# 参考

## 实例属性

### `boundingClientRect`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/boundingClientRect)。

返回目标元素的边界矩形，类型为 `DOMRectReadOnly`。

### `intersectionRatio`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRatio)。

返回 `intersectionRect` 与 `boundingClientRect` 的面积比值。

### `intersectionRect`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRect)。

返回表示目标可见区域的 `DOMRectReadOnly`。

### `isIntersecting`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting)。

一个布尔值，当目标元素与交叉观察器的根元素相交时为 `true`。如果为 `true`，表示 `IntersectionObserverEntry` 描述的是进入交叉状态的转换；如果为 `false`，表示从交叉状态变为非交叉状态。

### `rnRootIntersectionRatio` ⚠️

:::warning 非标准
这是 React Native 特有的扩展。
:::

返回 `intersectionRect` 与 `rootBounds` 的面积比值。

```ts
get rnRootIntersectionRatio(): number;
```

这与 `intersectionRatio` 类似，但计算的是相对于根元素边界框的比值，而非目标元素的边界框。这对应于 `rnRootThreshold` 选项，允许你判断根区域被目标元素覆盖的百分比。

### `rootBounds`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/rootBounds)。

返回交叉观察器根元素的 `DOMRectReadOnly`。

### `target`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/target)。

与根元素交叉状态发生变化的 `Element`。

### `time`

参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/time)。

一个 `DOMHighResTimeStamp`，表示相对于 `IntersectionObserver` 时间原点的交叉记录时间。
