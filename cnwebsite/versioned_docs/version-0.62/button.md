---
id: version-0.62-button
title: Button
original_id: button
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

一个简单的跨平台的按钮组件。可以进行一些简单的定制。

这个组件的样式是固定的。所以如果它的外观并不怎么搭配你的设计，那你需要使用`TouchableOpacity`或是`TouchableNativeFeedback`组件来定制自己所需要的按钮，视频教程[如何制作一个按钮](http://v.youku.com/v_show/id_XMTQ5OTE3MjkzNg==.html?f=26822355&from=y1.7-1.3)讲述了完整的过程。或者你也可以在 github.com 网站上搜索 'react native button' 来看看社区其他人的作品。

```
import { Button } from 'react-native';
...

<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## 示例

```SnackPlayer name=Buttons
import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Constants from 'expo-constants';

const Separator = () => {
  return <View style={styles.separator} />;
}

const App = () => {
  return (
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
          Adjust the color in a way that looks standard on each platform. On
          iOS, the color prop controls the color of the text. On Android, the
          color adjusts the background color of the button.
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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

# 文档

## Props

### `onPress`

用户点击此按钮时所调用的处理函数

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `title`

按钮内显示的文本

| 类型   | 必填 |
| ------ | ---- |
| string | 是   |

---

### `accessibilityLabel`

用于给残障人士显示的文本（比如读屏应用可能会读取这一内容）

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `color`

文本的颜色(iOS)，或是按钮的背景色(Android)

| 类型            | 必填 |
| --------------- | ---- |
| [color](colors) | 否   |

---

### `disabled`

设置为 true 时此按钮将不可点击。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

### `nextFocusDown`

Designates the next view to receive focus when the user navigates down. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusForward`

Designates the next view to receive focus when the user navigates forward. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusLeft`

Designates the next view to receive focus when the user navigates left. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusRight`

Designates the next view to receive focus when the user navigates right. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusUp`

Designates the next view to receive focus when the user navigates up. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `touchSoundDisabled`

If true, doesn't play system sound on touch.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |
