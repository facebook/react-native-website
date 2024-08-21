---
id: button
title: Button
---

一个简单的跨平台的按钮组件。可以进行一些简单的定制。

这个组件的样式是固定的。所以如果它的外观并不怎么搭配你的设计，那你需要使用 [`Pressable`](pressable) 组件来定制自己所需要的按钮，或者你也可以在 [github.com](github.com) 网站上搜索 'react native button' 来看看社区其他人的作品。

```tsx
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## 示例

```SnackPlayer name=Button%20Example
import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        The title and onPress handler are required. It is recommended to set
        accessibilityLabel to help make your app usable by everyone.
      </Text>
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        Adjust the color in a way that looks standard on each platform. On iOS,
        the color prop controls the color of the text. On Android, the color
        adjusts the background color of the button.
      </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        All interaction for the component are disabled.
      </Text>
      <Button
        title="Press me"
        disabled
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        This layout strategy lets the title define the width of the button.
      </Text>
      <View style={styles.fixToText}>
        <Button
          title="Left button"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="Right button"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

---

# 文档

## Props

### <div class="label required basic">必需</div>**`onPress`**

当用户点击按钮时要调用的处理函数。

| Type                                           |
| ---------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)})` |

---

### <div class="label required basic">必需</div>**`title`**

按钮内显示的文本。在安卓中，给定的标题将转换为大写形式。

| Type   |
| ------ |
| string |

---

### `accessibilityLabel`

为盲人无障碍访问功能显示的文本。

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div class="label ios">iOS</div>

一个指示屏幕阅读器在用户与元素交互时应使用哪种语言的值。它应遵循[BCP 47规范](https://www.rfc-editor.org/info/bcp47)。

有关更多信息，请参阅[iOS `accessibilityLanguage`文档]([***/nsobject/1615192-accessibilitylanguage](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage))。

| Type   |
| ------ |
| string |

---

### `accessibilityActions`

无障碍操作允许辅助技术以编程方式调用组件的操作。`accessibilityActions`属性应包含一个操作对象列表。每个操作对象应包含字段名称和标签。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibility-actions)。

| Type  | 必需 |
| ----- | -------- |
| array | No       |

---

### `onAccessibilityAction`

当用户执行可访问性操作时，将调用此函数。此函数的唯一参数是一个包含要执行的操作名称的事件。

有关更多信息，请参阅[可访问性指南](accessibility.md#accessibility-actions)。

| Type     | 必需 |
| -------- | -------- |
| function | No       |

---

### `color`

文本的颜色（iOS）或按钮的背景颜色（Android）。

```mdx-code-block
export function ColorDefaults() {
  return (
    <>
      <ins style={{ background: "#2196F3" }} className="color-box" />{" "}<code>'#2196F3'</code>
      {" "}<div className="label android">Android</div>
      <hr />
      <ins style={{ background: "#007AFF" }} className="color-box" />{" "}<code>'#007AFF'</code>
      {" "}<div className="label ios">iOS</div>
    </>
  );
}
```

| Type            | Default          |
| --------------- | ---------------- |
| [color](colors) | <ColorDefaults/> |

---

### `disabled`

如果为 `true`，则禁用此组件的所有交互。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `hasTVPreferredFocus` <div class="label tv">TV</div>

TV 平台上的首选焦点。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `nextFocusDown` <div class="label android">Android</div><div class="label tv">TV</div>

指定用户向下导航时接收焦点的下一个视图。请参阅 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div class="label android">Android</div><div class="label tv">TV</div>

指定用户向前导航时接收焦点的下一个视图。请参阅 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div class="label android">Android</div><div class="label tv">TV</div>

指定用户向左导航时接收焦点的下一个视图。请参阅 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div class="label android">Android</div><div class="label tv">TV</div>

指定用户向右导航时接收焦点的下一个视图。请参阅 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div class="label android">Android</div><div class="label tv">TV</div>

指定用户向上导航时接收焦点的下一个视图。请参阅 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp).

| Type   |
| ------ |
| number |

---

### `testID`

用于在端到端测试中定位此视图。

| Type   |
| ------ |
| string |

---

### `touchSoundDisabled` <div class="label android">Android</div>

如果为`true`，则不播放系统声音。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |
