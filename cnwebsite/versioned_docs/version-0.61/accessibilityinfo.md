---
id: version-0.61-accessibilityinfo
title: AccessibilityInfo
original_id: accessibilityinfo
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

有时候我们希望知道用户的设备是否正在运行读屏应用。`AccessibilityInfo`正是用于此目的。你可以用它来查询读屏应用的当前状态，并且可以监听其状态变化。

下面是一个使用`AccessibilityInfo`的小例子:

```jsx
class AccessibilityStatusExample extends React.Component {
  state = {
    reduceMotionEnabled: false,
    screenReaderEnabled: false,
  };

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      this._handleReduceMotionToggled,
    );
    AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      this._handleScreenReaderToggled,
    );

    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotionEnabled) => {
      this.setState({reduceMotionEnabled});
    });
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      this.setState({screenReaderEnabled});
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'reduceMotionChanged',
      this._handleReduceMotionToggled,
    );

    AccessibilityInfo.removeEventListener(
      'screenReaderChanged',
      this._handleScreenReaderToggled,
    );
  }

  _handleReduceMotionToggled = (reduceMotionEnabled) => {
    this.setState({reduceMotionEnabled});
  };

  _handleScreenReaderToggled = (screenReaderEnabled) => {
    this.setState({screenReaderEnabled});
  };

  render() {
    return (
      <View>
        <Text>
          The reduce motion is{' '}
          {this.state.reduceMotionEnabled ? 'enabled' : 'disabled'}.
        </Text>
        <Text>
          The screen reader is{' '}
          {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </View>
    );
  }
}
```

---

# 文档

## 方法

### `isBoldTextEnabled()`

```jsx
static isBoldTextEnabled()
```

**iOS-Only.** Query whether a bold text is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when bold text is enabled and `false` otherwise.

### `isGrayscaleEnabled()`

```jsx
static isGrayscaleEnabled()
```

**iOS-Only.** Query whether grayscale is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when grayscale is enabled and `false` otherwise.

### `isInvertColorsEnabled()`

```jsx
static isInvertColorsEnabled()
```

**iOS-Only.** Query whether invert colors is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when invert colors is enabled and `false` otherwise.

### `isReduceMotionEnabled()`

```jsx
static isReduceMotionEnabled()
```

Query whether reduce motion is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when reduce motion is enabled and `false` otherwise.

### `isReduceTransparencyEnabled()`

```jsx
static isReduceTransparencyEnabled()
```

**iOS-Only.** Query whether reduce transparency is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when a reduce transparency is enabled and `false` otherwise.

### `isScreenReaderEnabled()`

```jsx
static isScreenReaderEnabled()
```

查询读屏应用当前是否开启。返回值为一个 promise，最终解析值为一个布尔值。`true`表示开启状态，`false`反之。

---

### `addEventListener()`

```jsx
static addEventListener(eventName, handler)
```

添加一个监听函数，支持的事件类型如下：

- `boldTextChanged`: iOS-only event. Fires when the state of the bold text toggle changes. The argument to the event handler is a boolean. The boolean is `true` when bold text is enabled and `false` otherwise.
- `grayscaleChanged`: iOS-only event. Fires when the state of the gray scale toggle changes. The argument to the event handler is a boolean. The boolean is `true` when a gray scale is enabled and `false` otherwise.
- `invertColorsChanged`: iOS-only event. Fires when the state of the invert colors toggle changes. The argument to the event handler is a boolean. The boolean is `true` when invert colors is enabled and `false` otherwise.
- `reduceMotionChanged`: Fires when the state of the reduce motion toggle changes. The argument to the event handler is a boolean. The boolean is `true` when a reduce motion is enabled (or when "Transition Animation Scale" in "Developer options" is "Animation off") and `false` otherwise.
- `screenReaderChanged`: 读屏应用状态改变时触发。传递给监听函数的参数为布尔值，`true`表示开启状态，`false`反之。
- `reduceTransparencyChanged`: iOS-only event. Fires when the state of the reduce transparency toggle changes. The argument to the event handler is a boolean. The boolean is `true` when reduce transparency is enabled and `false` otherwise.
- `announcementFinished`: 仅 iOS 可用。在读屏软件完成一次朗读后触发。传递给监听函数的参数为一个字典，包含以下两个字段：
  - `announcement`: 读屏软件所读的字符串。
  - `success`: 此次朗读是否成功完成。

---

### `setAccessibilityFocus()`

```jsx
static setAccessibilityFocus(reactTag)
```

将读屏软件的焦点设置到某个 react 组件上。在 Android 上等同于调用 `UIManager.sendAccessibilityEvent(reactTag, UIManager.AccessibilityEventTypes.typeViewFocused);`。

---

### `announceForAccessibility()`

```jsx
static announceForAccessibility(announcement)
```

发送一个字符串给读屏应用朗读。

---

### `removeEventListener()`

```jsx
static removeEventListener(eventName, handler)
```

移除一个监听函数。
