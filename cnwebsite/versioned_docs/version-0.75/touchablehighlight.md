---
id: touchablehighlight
title: TouchableHighlight
---

> 我们建议使用[Pressable](pressable.md)组件，它更具扩展性且会是官方未来力推的主流。

本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。

在底层实现上，实际会创建一个新的视图到视图层级中，如果使用的方法不正确，有时候会导致一些不希望出现的视觉效果。譬如没有给视图的 backgroundColor 显式声明一个不透明的颜色。

注意`TouchableHighlight`只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个 View 来包装它们。

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableHighlight>;
```

## 示例

```SnackPlayer name=TouchableHighlight%20Example
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const TouchableHighlightExample = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text>Touch Here</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count || null}</Text>
      </View>
    </View>
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

export default TouchableHighlightExample;
```

---

# 文档

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

继承所有的 [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

---

### `activeOpacity`

指定封装的视图在被触摸操作激活时以多少不透明度显示（0 到 1 之间，默认值为 0.85）。需要设置`underlayColor`。

| 类型   |
| ------ |
| number |

---

### `onHideUnderlay`

底层的颜色被隐藏的时候调用。

| 类型     |
| -------- |
| function |

---

### `onShowUnderlay`

当底层的颜色被显示的时候调用。

| 类型     |
| -------- |
| function |

---

### `style`

| 类型       |
| ---------- |
| View.style |

---

### `underlayColor`

有触摸操作时显示出来的底层的颜色。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `hasTVPreferredFocus` <div class="label ios">iOS</div>

_(Apple TV 专用)_ 是否允许在 Apple TV 上获取焦点。(请参考 [View](view.md) 组件的文档).

| 类型 |
| ---- |
| bool |

---

### `nextFocusDown` <div class="label android">Android</div>

TV 平台上向下选择焦点 (请参考 [View](view.md) 组件的文档).

| 类型   |
| ------ |
| number |

---

### `nextFocusForward` <div class="label android">Android</div>

TV 平台上向前选择焦点 (请参考 [View](view.md) 组件的文档).

| 类型   |
| ------ |
| number |

---

### `nextFocusLeft` <div class="label android">Android</div>

TV 平台上向左选择焦点 (请参考 [View](view.md) 组件的文档).

| 类型   |
| ------ |
| number |

---

### `nextFocusRight` <div class="label android">Android</div>

TV 平台上向右选择焦点 (请参考 [View](view.md) 组件的文档).

| 类型   |
| ------ |
| number |

---

### `nextFocusUp` <div class="label android">Android</div>

TV 平台上向上选择焦点 (请参考 [View](view.md) 组件的文档).

| 类型   |
| ------ |
| number |

---

### `testOnly_pressed`

用于做快照测试。

| 类型 |
| ---- |
| bool |
