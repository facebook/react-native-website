---
id: version-0.57-accessibilityinfo
title: AccessibilityInfo
original_id: accessibilityinfo
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

有时候我们希望知道用户的设备是否正在运行读屏应用。`AccessibilityInfo`正是用于此目的。你可以用它来查询读屏应用的当前状态，并且可以监听其状态变化。

下面是一个使用`AccessibilityInfo`的小例子:

```javascript
class ScreenReaderStatusExample extends React.Component {
  state = {
    screenReaderEnabled: false
  };

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      "change",
      this._handleScreenReaderToggled
    );
    AccessibilityInfo.fetch().then(isEnabled => {
      this.setState({
        screenReaderEnabled: isEnabled
      });
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      "change",
      this._handleScreenReaderToggled
    );
  }

  _handleScreenReaderToggled = isEnabled => {
    this.setState({
      screenReaderEnabled: isEnabled
    });
  };

  render() {
    return (
      <View>
        <Text>
          The screen reader is{" "}
          {this.state.screenReaderEnabled ? "enabled" : "disabled"}.
        </Text>
      </View>
    );
  }
}
```

### 查看方法

- [`fetch`](accessibilityinfo.md#fetch)
- [`addEventListener`](accessibilityinfo.md#addeventlistener)
- [`setAccessibilityFocus`](accessibilityinfo.md#setaccessibilityfocus)
- [`announceForAccessibility`](accessibilityinfo.md#announceforaccessibility)
- [`removeEventListener`](accessibilityinfo.md#removeeventlistener)

---

# 文档

## 方法

### `fetch()`

```javascript
static fetch()
```

查询读屏应用当前是否开启。返回值为一个 promise，最终解析值为一个布尔值。`true`表示开启状态，`false`反之。

---

### `addEventListener()`

```javascript
static addEventListener(eventName, handler)
```

添加一个监听函数，支持的事件类型如下：

- `change`: 读屏应用状态改变时触发。传递给监听函数的参数为布尔值，`true`表示开启状态，`false`反之。
- `announcementFinished`: 仅 iOS 可用。在读屏软件完成一次朗读后触发。传递给监听函数的参数为一个字典，包含以下两个字段：
  - `announcement`: 读屏软件所读的字符串。
  - `success`: 此次朗读是否成功完成。

---

### `setAccessibilityFocus()`

```javascript
static setAccessibilityFocus(reactTag)
```

将读屏软件的焦点设置到某个 react 组件上。在 Android 上等同于调用 `UIManager.sendAccessibilityEvent(reactTag, UIManager.AccessibilityEventTypes.typeViewFocused);`。

---

### `announceForAccessibility()`

```javascript
static announceForAccessibility(announcement)
```

仅 iOS 可用。发送一个字符串给读屏应用朗读。

---

### `removeEventListener()`

```javascript
static removeEventListener(eventName, handler)
```

移除一个监听函数。
