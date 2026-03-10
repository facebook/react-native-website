---
id: accessibilityinfo
title: AccessibilityInfo
---

有时我们需要知道设备当前是否启用了读屏器。`AccessibilityInfo` API 就是为此而设计的。你可以用它查询读屏器当前状态，也可以监听状态变化事件。

## 示例

```SnackPlayer name=AccessibilityInfo%20Example&supportedPlatforms=android,ios
import React, {useState, useEffect} from 'react';
import {AccessibilityInfo, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      isReduceMotionEnabled => {
        setReduceMotionEnabled(isReduceMotionEnabled);
      },
    );
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      isScreenReaderEnabled => {
        setScreenReaderEnabled(isScreenReaderEnabled);
      },
    );

    AccessibilityInfo.isReduceMotionEnabled().then(isReduceMotionEnabled => {
      setReduceMotionEnabled(isReduceMotionEnabled);
    });
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    });

    return () => {
      reduceMotionChangedSubscription.remove();
      screenReaderChangedSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.status}>
          The reduce motion is {reduceMotionEnabled ? 'enabled' : 'disabled'}.
        </Text>
        <Text style={styles.status}>
          The screen reader is {screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    margin: 30,
  },
});

export default App;
```

---

# 参考

## 方法

### `addEventListener()`

```tsx
static addEventListener(
  eventName: AccessibilityChangeEventName | AccessibilityAnnouncementEventName,
  handler: (
    event: AccessibilityChangeEvent | AccessibilityAnnouncementFinishedEvent,
  ) => void,
): EmitterSubscription;
```

添加事件处理函数。支持的事件如下：

| 事件名                                                                                 | 说明                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityServiceChanged`<br/><div className="label two-lines android">Android</div> | 当 TalkBack、其他 Android 辅助技术或第三方无障碍服务被启用时触发。处理函数参数为布尔值：当任一无障碍服务启用时为 `true`，否则为 `false`。                                                                                                                                                     |
| `announcementFinished`<br/><div className="label two-lines ios">iOS</div>                | 当读屏器完成播报时触发。处理函数参数是一个对象，包含：<ul><li>`announcement`：读屏器播报的文本。</li><li>`success`：是否成功播报的布尔值。</li></ul>                                                                                                                                            |
| `boldTextChanged`<br/><div className="label two-lines ios">iOS</div>                     | 当“粗体文本”开关状态变化时触发。参数为布尔值：启用为 `true`，否则为 `false`。                                                                                                                                                                                                                    |
| `grayscaleChanged`<br/><div className="label two-lines ios">iOS</div>                    | 当“灰度”开关状态变化时触发。参数为布尔值：启用为 `true`，否则为 `false`。                                                                                                                                                                                                                        |
| `invertColorsChanged`<br/><div className="label two-lines ios">iOS</div>                 | 当“反转颜色”开关状态变化时触发。参数为布尔值：启用为 `true`，否则为 `false`。                                                                                                                                                                                                                    |
| `reduceMotionChanged`                                                                      | 当“减少动态效果”开关状态变化时触发。参数为布尔值：启用为 `true`，否则为 `false`。（在 Android 上，“开发者选项”中的“过渡动画比例”设为“动画关闭”也会返回 `true`。）                                                                                                                             |
| `reduceTransparencyChanged`<br/><div className="label two-lines ios">iOS</div>           | 当“降低透明度”开关状态变化时触发。参数为布尔值：启用为 `true`，否则为 `false`。                                                                                                                                                                                                                  |
| `screenReaderChanged`                                                                       | 当读屏器状态变化时触发。参数为布尔值：启用为 `true`，否则为 `false`。                                                                                                                                                                                                                            |

---

### `announceForAccessibility()`

```tsx
static announceForAccessibility(announcement: string);
```

发送一段字符串，让读屏器播报。

---

### `announceForAccessibilityWithOptions()`

```tsx
static announceForAccessibilityWithOptions(
  announcement: string,
  options: {queue?: boolean},
);
```

发送一段字符串让读屏器播报，并可附带选项。默认会打断当前播报；在 iOS 上可通过将 `queue` 设为 `true`，把新播报排队到当前播报之后。

**参数：**

| 名称                                                              | 类型   | 说明                                                                                  |
| ----------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| announcement <div className="label basic required">Required</div> | string | 要播报的字符串                                                                          |
| options <div className="label basic required">Required</div>      | object | `queue` - 是否排队到当前播报之后 <div className="label ios">iOS</div>                |

---

### `getRecommendedTimeoutMillis()` <div className="label android">Android</div>

```tsx
static getRecommendedTimeoutMillis(originalTimeout: number): Promise<number>;
```

获取用户建议的超时时长（毫秒）。
该值来自“辅助功能”设置中的“执行操作所需时间（辅助功能超时）”。

**参数：**

| 名称                                                                 | 类型   | 说明                                                                                     |
| -------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| originalTimeout <div className="label basic required">Required</div> | number | 当“辅助功能超时”未设置时返回的超时值（毫秒）。                                            |

---

### `isAccessibilityServiceEnabled()` <div className="label android">Android</div>

```tsx
static isAccessibilityServiceEnabled(): Promise<boolean>;
```

检查是否启用了任意无障碍服务。它不仅包含 TalkBack，也包括已安装的第三方无障碍应用。若只检查 TalkBack，请使用 [isScreenReaderEnabled](#isscreenreaderenabled)。
返回 Promise，解析为布尔值：有无障碍服务启用时为 `true`，否则为 `false`。

:::note
如果你只想检查 TalkBack 状态，请使用 [`isScreenReaderEnabled`](#isscreenreaderenabled)。
:::

---

### `isBoldTextEnabled()` <div className="label ios">iOS</div>

```tsx
static isBoldTextEnabled(): Promise<boolean>:
```

查询是否启用了粗体文本。返回 Promise，启用为 `true`，否则为 `false`。

---

### `isGrayscaleEnabled()` <div className="label ios">iOS</div>

```tsx
static isGrayscaleEnabled(): Promise<boolean>;
```

查询是否启用了灰度显示。返回 Promise，启用为 `true`，否则为 `false`。

---

### `isInvertColorsEnabled()` <div className="label ios">iOS</div>

```tsx
static isInvertColorsEnabled(): Promise<boolean>;
```

查询是否启用了反转颜色。返回 Promise，启用为 `true`，否则为 `false`。

---

### `isReduceMotionEnabled()`

```tsx
static isReduceMotionEnabled(): Promise<boolean>;
```

查询是否启用了减少动态效果。返回 Promise，启用为 `true`，否则为 `false`。

---

### `isReduceTransparencyEnabled()` <div className="label ios">iOS</div>

```tsx
static isReduceTransparencyEnabled(): Promise<boolean>;
```

查询是否启用了降低透明度。返回 Promise，启用为 `true`，否则为 `false`。

---

### `isScreenReaderEnabled()`

```tsx
static isScreenReaderEnabled(): Promise<boolean>;
```

查询是否启用了读屏器。返回 Promise，启用为 `true`，否则为 `false`。

---

### `prefersCrossFadeTransitions()` <div className="label ios">iOS</div>

```tsx
static prefersCrossFadeTransitions(): Promise<boolean>;
```

查询是否同时启用了“减少动态效果”与“偏好交叉淡入淡出过渡”。返回 Promise，启用为 `true`，否则为 `false`。

---

### 🗑️ `setAccessibilityFocus()`

```tsx
static setAccessibilityFocus(reactTag: number);
```

将无障碍焦点设置到某个 React 组件。

在 Android 上，它会调用 `UIManager.sendAccessibilityEvent`，并传入 `reactTag` 与 `UIManager.AccessibilityEventTypes.typeViewFocused`。

:::note
确保希望接收无障碍焦点的 `View` 设置了 `accessible={true}`。
:::
