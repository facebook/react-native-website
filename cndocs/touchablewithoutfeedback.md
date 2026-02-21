---
id: touchablewithoutfeedback
title: TouchableWithoutFeedback
---

:::tip
如果你在寻找更全面且面向未来的触摸输入处理方式，请查看 [Pressable](pressable.md) API。
:::

除非有充分的理由，否则不要使用此组件。所有响应按压的元素在被触摸时都应该有视觉反馈。

`TouchableWithoutFeedback` 仅支持一个子元素。如果你需要多个子组件，请将它们包裹在一个 View 中。重要的是，`TouchableWithoutFeedback` 通过克隆子元素并应用响应器属性来工作。因此，任何中间组件都需要将这些属性传递给底层的 React Native 组件。

## 使用模式

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableWithoutFeedback>;
```

## 示例

```SnackPlayer name=TouchableWithoutFeedback
import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TouchableWithoutFeedbackExample = () => {
  const [count, setCount] = useState(0);

  const onPress = () => {
    setCount(count + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>Count: {count}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

export default TouchableWithoutFeedbackExample;
```

---

# 参考

## Props

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

指示当颜色反转打开时，此视图是否应被反转。设为 `true` 会告诉视图即使颜色反转打开也不要被反转。

更多信息请参阅[无障碍指南](accessibility.md#accessibilityignoresinvertcolors)。

| 类型    |
| ------- |
| Boolean |

---

### `accessible`

当为 `true` 时，表示该视图是一个无障碍元素。默认情况下，所有可触摸元素都是无障碍的。

| 类型 |
| ---- |
| bool |

---

### `accessibilityLabel`

覆盖用户与元素交互时屏幕阅读器读取的文本。默认情况下，标签通过遍历所有子元素并累积所有 `Text` 节点（以空格分隔）来构建。

| 类型   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

指示屏幕阅读器在用户与元素交互时应使用的语言。它应遵循 [BCP 47 规范](https://www.rfc-editor.org/info/bcp47)。

更多信息请参阅 [iOS `accessibilityLanguage` 文档](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)。

| 类型   |
| ------ |
| string |

---

### `accessibilityHint`

无障碍提示帮助用户理解，当无障碍标签不能明确说明操作结果时，执行操作后会发生什么。

| 类型   |
| ------ |
| string |

---

### `accessibilityRole`

`accessibilityRole` 向辅助技术的用户传达组件的用途。

`accessibilityRole` 可以是以下值之一：

- `'none'` - 元素没有角色时使用。
- `'button'` - 元素应被视为按钮时使用。
- `'link'` - 元素应被视为链接时使用。
- `'search'` - 文本框元素还应被视为搜索框时使用。
- `'image'` - 元素应被视为图像时使用。可与 button 或 link 组合使用。
- `'keyboardkey'` - 元素充当键盘按键时使用。
- `'text'` - 元素应被视为不可更改的静态文本时使用。
- `'adjustable'` - 元素可以被"调整"时使用（例如滑块）。
- `'imagebutton'` - 元素应被视为按钮且同时也是图像时使用。
- `'header'` - 元素作为内容区域的标题时使用（例如导航栏的标题）。
- `'summary'` - 元素可用于在应用首次启动时提供当前状况的快速摘要时使用。
- `'alert'` - 元素包含需要呈现给用户的重要文本时使用。
- `'checkbox'` - 元素表示复选框时使用，可以被选中、取消选中或处于混合选中状态。
- `'combobox'` - 元素表示组合框时使用，允许用户从多个选项中选择。
- `'menu'` - 组件是选项菜单时使用。
- `'menubar'` - 组件是多个菜单的容器时使用。
- `'menuitem'` - 用于表示菜单中的一个项目。
- `'progressbar'` - 用于表示显示任务进度的组件。
- `'radio'` - 用于表示单选按钮。
- `'radiogroup'` - 用于表示一组单选按钮。
- `'scrollbar'` - 用于表示滚动条。
- `'spinbutton'` - 用于表示打开选项列表的按钮。
- `'switch'` - 用于表示可以开关的切换开关。
- `'tab'` - 用于表示标签页。
- `'tablist'` - 用于表示标签页列表。
- `'timer'` - 用于表示计时器。
- `'toolbar'` - 用于表示工具栏（操作按钮或组件的容器）。

| 类型   |
| ------ |
| string |

---

### `accessibilityState`

向辅助技术的用户描述组件的当前状态。

更多信息请参阅[无障碍指南](accessibility.md#accessibilitystate-ios-android)。

| 类型                                                                                             |
| ------------------------------------------------------------------------------------------------ |
| object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` |

---

### `accessibilityActions`

无障碍操作允许辅助技术以编程方式调用组件的操作。`accessibilityActions` 属性应包含操作对象列表。每个操作对象应包含 name 和 label 字段。

更多信息请参阅[无障碍指南](accessibility.md#accessibility-actions)。

| 类型  |
| ----- |
| array |

---

### `aria-busy`

表示元素正在被修改，辅助技术可能需要等待更改完成后再通知用户更新。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-checked`

表示可选中元素的状态。此字段可以接受布尔值或 "mixed" 字符串来表示混合复选框。

| 类型              | 默认值 |
| ----------------- | ------ |
| boolean, 'mixed'  | false  |

---

### `aria-disabled`

表示元素是可感知的但已禁用，因此不可编辑或操作。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-expanded`

表示可展开元素当前是展开还是折叠状态。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-hidden`

表示元素是否对辅助技术隐藏。

例如，在一个包含兄弟视图 `A` 和 `B` 的窗口中，将视图 `B` 的 `aria-hidden` 设为 `true` 会使 VoiceOver 忽略 `B` 元素及其子元素。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-label`

定义一个标记交互元素的字符串值。

| 类型   |
| ------ |
| string |

---

### `aria-live` <div className="label android">Android</div>

表示元素将被更新，并描述用户代理、辅助技术和用户可以从实时区域期望的更新类型。

- **off** 无障碍服务不应播报此视图的变更。
- **polite** 无障碍服务应播报此视图的变更。
- **assertive** 无障碍服务应中断正在进行的语音以立即播报此视图的变更。

| 类型                                     | 默认值  |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

布尔值，表示 VoiceOver 是否应忽略接收者的兄弟视图中的元素。优先级高于 [`accessibilityViewIsModal`](#accessibilityviewismodal-ios) 属性。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-selected`

表示可选择元素当前是否被选中。

| 类型    |
| ------- |
| boolean |

### `onAccessibilityAction`

当用户执行无障碍操作时调用。此函数的唯一参数是一个包含要执行的操作名称的事件。

更多信息请参阅[无障碍指南](accessibility.md#accessibility-actions)。

| 类型     |
| -------- |
| function |

---

### `accessibilityValue`

表示组件的当前值。它可以是组件值的文本描述，或者对于基于范围的组件（如滑块和进度条），它包含范围信息（最小值、当前值和最大值）。

更多信息请参阅[无障碍指南](accessibility.md#accessibilityvalue-ios-android)。

| 类型                                                            |
| --------------------------------------------------------------- |
| object: `{min: number, max: number, now: number, text: string}` |

---

### `aria-valuemax`

表示基于范围的组件（如滑块和进度条）的最大值。优先级高于 `accessibilityValue` 属性中的 `max` 值。

| 类型   |
| ------ |
| number |

---

### `aria-valuemin`

表示基于范围的组件（如滑块和进度条）的最小值。优先级高于 `accessibilityValue` 属性中的 `min` 值。

| 类型   |
| ------ |
| number |

---

### `aria-valuenow`

表示基于范围的组件（如滑块和进度条）的当前值。优先级高于 `accessibilityValue` 属性中的 `now` 值。

| 类型   |
| ------ |
| number |

---

### `aria-valuetext`

表示组件的文本描述。优先级高于 `accessibilityValue` 属性中的 `text` 值。

| 类型   |
| ------ |
| string |

---

### `delayLongPress`

从 `onPressIn` 开始到调用 `onLongPress` 之前的持续时间（毫秒）。

| 类型   |
| ------ |
| number |

---

### `delayPressIn`

从触摸开始到调用 `onPressIn` 之前的延迟时间（毫秒）。

| 类型   |
| ------ |
| number |

---

### `delayPressOut`

从触摸释放到调用 `onPressOut` 之前的延迟时间（毫秒）。

| 类型   |
| ------ |
| number |

---

### `disabled`

如果为 true，则禁用此组件的所有交互。

| 类型 |
| ---- |
| bool |

---

### `hitSlop`

定义触摸可以从按钮多远的位置开始。在手指移出按钮时，此值会加到 `pressRetentionOffset` 上。

:::note
触摸区域不会超出父视图的边界，且如果触摸命中两个重叠的视图，兄弟视图的 Z-index 始终优先。
:::

| 类型                     |
| ------------------------ |
| [Rect](rect) 或 number   |

### `id`

用于从原生代码中定位此视图。优先级高于 `nativeID` 属性。

| 类型   |
| ------ |
| string |

---

### `onBlur`

当元素失去焦点时调用。

| 类型                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onFocus`

当元素获得焦点时调用。

| 类型                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onLayout`

在挂载和布局变化时调用。

| 类型                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onLongPress`

当 `onPressIn` 之后的时间超过 370 毫秒时调用。此时间段可通过 [`delayLongPress`](#delaylongpress) 自定义。

| 类型     |
| -------- |
| function |

---

### `onPress`

当触摸释放时调用，但如果被取消则不会调用（例如，被滚动视图抢夺了响应器锁定）。第一个函数参数是 [PressEvent](pressevent) 形式的事件。

| 类型     |
| -------- |
| function |

---

### `onPressIn`

在可触摸元素被按下时立即调用，甚至在 onPress 之前调用。这在发起网络请求时很有用。第一个函数参数是 [PressEvent](pressevent) 形式的事件。

| 类型     |
| -------- |
| function |

---

### `onPressOut`

在触摸释放后立即调用，甚至在 onPress 之前。第一个函数参数是 [PressEvent](pressevent) 形式的事件。

| 类型     |
| -------- |
| function |

---

### `pressRetentionOffset`

当滚动视图禁用时，定义手指可以从按钮移开多远才会取消激活按钮。取消激活后，尝试将手指移回，你会看到按钮再次被激活！在滚动视图禁用时来回移动多次试试。请确保传入常量以减少内存分配。

| 类型                     |
| ------------------------ |
| [Rect](rect) 或 number   |

---

### `nativeID`

| 类型   |
| ------ |
| string |

---

### `testID`

用于在端到端测试中定位此视图。

| 类型   |
| ------ |
| string |

---

### `touchSoundDisabled` <div className="label android">Android</div>

如果为 true，则触摸时不播放系统声音。

| 类型    |
| ------- |
| Boolean |
