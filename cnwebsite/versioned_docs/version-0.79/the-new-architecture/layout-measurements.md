# 测量布局

有时，您需要测量当前布局以应用某些更改或做出决策并调用某些特定逻辑。

React Native 提供了一些原生方法来了解视图的测量值。

最推荐的方法是在 `useLayoutEffect` 钩子中调用这些方法：这将为您提供最新的测量值，并且当测量值计算完成后，您可以在同一帧中应用更改。

典型的代码如下所示：

```tsx
function AComponent(children) {
  const targetRef = React.useRef(null)

  useLayoutEffect(() => {
    targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
      //do something with the measurements
    });
  }, [ /* add dependencies here */]);

  return (
    <View ref={targetRef}>
     {children}
    <View />
  );
}
```

:::note 注意
这里描述的方法在大多数默认组件中都可用。然而，它们在不是直接由原生视图支持的复合组件中是不可用的。这通常包括您在应用中自定义的大多数组件。
:::

## measure(callback)

确定视图在屏幕上的位置 (`x` 和 `y`)、`width` 和 `height`。通过异步回调返回这些值。如果成功，回调将使用以下参数调用：

- `x`: 视图在视口中的 `x` 坐标（左上角）。
- `y`: 视图在视口中的 `y` 坐标（左上角）。
- `width`: 视图的 `width`。
- `height`: 视图的 `height`。
- `pageX`: 视图在视口中的 `x` 坐标（通常是整个屏幕）。
- `pageY`: 视图在视口中的 `y` 坐标（通常是整个屏幕）。

`measure()` 返回的 `width` 和 `height` 是视图在视口中的 `width` 和 `height`。

## measureInWindow(callback)

确定视图在窗口中的位置 (`x` 和 `y`) 并返回这些值通过异步回调。如果 React 根视图嵌套在另一个原生视图中，这将为您提供绝对坐标。如果成功，回调将使用以下参数调用：

- `x`: 视图在当前窗口中的 `x` 坐标。
- `y`: 视图在当前窗口中的 `y` 坐标。
- `width`: 视图的 `width`。
- `height`: 视图的 `height`。
