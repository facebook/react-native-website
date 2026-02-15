---
id: accessibilityinfo
title: AccessibilityInfo
---

有时候我们希望知道用户的设备是否正在运行读屏应用。`AccessibilityInfo` 正是用于此目的。你可以用它来查询读屏应用的当前状态，并且可以监听其状态变化。

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

# 文档

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

添加一个监听函数，支持的事件类型如下：

| 事件名称                                                                               | 描述                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityServiceChanged`<br/><div className="label two-lines android">Android</div> | 当启用某些服务（如 TalkBack、其他 Android 辅助技术和第三方辅助功能服务）时触发。事件处理程序的参数是一个布尔值。当启用某些辅助功能服务时，该布尔值为 `true`，否则为 `false`。                                                                                    |
| `announcementFinished`<br/><div className="label two-lines ios">iOS</div>                | 当屏幕阅读器完成播报时触发。事件处理程序的参数是一个字典，包含以下键：<ul><li>`announcement`：屏幕阅读器播报的字符串。</li><li>`success`：指示播报是否成功的布尔值。</li></ul>                                                                                  |
| `boldTextChanged`<br/><div className="label two-lines ios">iOS</div>                     | 当加粗文本切换状态改变时触发。事件处理程序的参数是一个布尔值。当启用加粗文本时，布尔值为 `true`，否则为 `false`。                                                                                                                                               |
| `grayscaleChanged`<br/><div className="label two-lines ios">iOS</div>                    | 当灰度切换的状态改变时触发。事件处理程序的参数是一个布尔值。当启用灰度时，布尔值为 `true`，否则为 `false`。                                                                                                                                                    |
| `invertColorsChanged`<br/><div className="label two-lines ios">iOS</div>                 | 当反转颜色切换的状态改变时触发。事件处理程序的参数是一个布尔值。当启用反转颜色时，布尔值为 `true`，否则为 `false`。                                                                                                                                             |
| `reduceMotionChanged`                                                                    | 当减少动画的状态改变时触发。事件处理程序的参数是一个布尔值。当启用减少动画（或在"开发者选项"中，"转换动画比例"为"关闭动画"）时，布尔值为 `true`，否则为 `false`。                                                                                               |
| `reduceTransparencyChanged`<br/><div className="label two-lines ios">iOS</div>           | 当减少透明度切换的状态改变时触发。事件处理程序的参数是一个布尔值。当启用减少透明度时，布尔值为 `true`，否则为 `false`。                                                                                                                                         |
| `screenReaderChanged`                                                                    | 当屏幕阅读器的状态发生变化时触发。事件处理程序的参数是一个布尔值。当启用屏幕阅读器时，该布尔值为 `true`，否则为 `false`。                                                                                                                                      |

---

### `announceForAccessibility()`

```tsx
static announceForAccessibility(announcement: string);
```

发送一个字符串给读屏应用朗读。

---

### `announceForAccessibilityWithOptions()`

```tsx
static announceForAccessibilityWithOptions(
  announcement: string,
  options: {queue?: boolean},
);
```

发送一个字符串给读屏应用朗读，并支持修改选项。默认情况下，播报将中断任何正在进行的语音，但在 iOS 上，可以通过在选项对象中设置 `queue` 为 `true` 来排队到现有的语音后面。

**参数：**

| 名称                                                              | 类型   | 描述                                                                                   |
| ----------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------- |
| announcement <div className="label basic required">Required</div> | string | 要播报的字符串                                                                         |
| options <div className="label basic required">Required</div>      | object | `queue` - 在正在进行的语音后面排队发布 <div className="label ios">iOS</div>            |

---

### `getRecommendedTimeoutMillis()` <div className="label android">Android</div>

```tsx
static getRecommendedTimeoutMillis(originalTimeout: number): Promise<number>;
```

获取用户需要的超时时间（以毫秒为单位）。此值在"辅助功能"设置中的"执行操作所需时间（辅助功能超时）"中设置。

**参数：**

| 名称                                                                 | 类型   | 描述                                                                           |
| -------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------ |
| originalTimeout <div className="label basic required">Required</div> | number | 如果未设置"辅助功能超时"，则返回的超时时间。以毫秒为单位指定。                 |

---

### `isAccessibilityServiceEnabled()` <div className="label android">Android</div>

```tsx
static isAccessibilityServiceEnabled(): Promise<boolean>;
```

查询是否启用了任何辅助功能服务。这包括 TalkBack 以及可能安装的任何第三方辅助功能应用。如果只想查询 TalkBack 是否启用，请使用 [isScreenReaderEnabled](#isscreenreaderenabled)。返回一个解析为布尔值的 Promise。当启用某些辅助功能服务时，结果为 `true`，否则为 `false`。

:::note
如果你只想检查 TalkBack 的状态，请使用 [`isScreenReaderEnabled`](#isscreenreaderenabled)。
:::

---

### `isBoldTextEnabled()` <div className="label ios">iOS</div>

```tsx
static isBoldTextEnabled(): Promise<boolean>:
```

查询是否启用了加粗文本。返回一个解析为布尔值的 Promise。当加粗文本已启用时，结果为 `true`；否则为 `false`。

---

### `isGrayscaleEnabled()` <div className="label ios">iOS</div>

```tsx
static isGrayscaleEnabled(): Promise<boolean>;
```

查询当前是否启用了灰度模式。返回一个解析为布尔值的 Promise。当灰度模式已启用时，结果为 `true`；否则为 `false`。

---

### `isInvertColorsEnabled()` <div className="label ios">iOS</div>

```tsx
static isInvertColorsEnabled(): Promise<boolean>;
```

查询反转颜色是否已启用。返回一个解析为布尔值的 Promise。当反转颜色已启用时，结果为 `true`；否则为 `false`。

---

### `isReduceMotionEnabled()`

```tsx
static isReduceMotionEnabled(): Promise<boolean>;
```

查询当前是否启用了减少动画。返回一个解析为布尔值的 Promise。当减少动画被启用时，结果为 `true`，否则为 `false`。

---

### `isReduceTransparencyEnabled()` <div className="label ios">iOS</div>

```tsx
static isReduceTransparencyEnabled(): Promise<boolean>;
```

查询当前是否启用了减少透明度。返回一个解析为布尔值的 Promise。当减少透明度已启用时，结果为 `true`，否则为 `false`。

---

### `isScreenReaderEnabled()`

```tsx
static isScreenReaderEnabled(): Promise<boolean>;
```

查询读屏应用当前是否开启。返回值为一个 Promise，最终解析值为一个布尔值。`true` 表示开启状态，`false` 反之。

---

### `prefersCrossFadeTransitions()` <div className="label ios">iOS</div>

```tsx
static prefersCrossFadeTransitions(): Promise<boolean>;
```

查询当前是否启用了减少动画和优先使用交叉淡入淡出过渡设置。返回一个解析为布尔值的 Promise。当优先使用交叉淡入淡出过渡被启用时，结果为 `true`，否则为 `false`。

---

### `setAccessibilityFocus()`

```tsx
static setAccessibilityFocus(reactTag: number);
```

将读屏软件的焦点设置到某个 React 组件上。

在 Android 上，等同于调用 `UIManager.sendAccessibilityEvent` 方法，并传入 `reactTag` 和 `UIManager.AccessibilityEventTypes.typeViewFocused` 参数。

:::note
确保你想要接收无障碍焦点的任何 `View` 都设置了 `accessible={true}` 属性。
:::