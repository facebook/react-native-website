---
id: global-PerformanceObserver
title: PerformanceObserver
---

全局 [`PerformanceObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver) 类，按照 Web 规范定义。

## 示例

```ts
const observer = new PerformanceObserver(
  (list, observer, options) => {
    for (const entry of list.getEntries()) {
      console.log(
        'Received entry with type',
        entry.entryType,
        'and name',
        entry.name,
        'that started at',
        entry.startTime,
        'and took',
        entry.duration,
        'ms',
      );
    }
  },
);

observer.observe({entryTypes: ['mark', 'measure']});
```

---

# 参考

## 构造函数

### `PerformanceObserver()`

参见 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/PerformanceObserver)。

## 静态属性

### `supportedEntryTypes`

参见 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/supportedEntryTypes)。

返回 `['mark', 'measure', 'event', 'longtask', 'resource']`。

## 实例方法

### `observe()`

参见 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe)。

### `disconnect()`

参见 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/disconnect)。
