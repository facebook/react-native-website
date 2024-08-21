---
id: inputaccessoryview
title: InputAccessoryView
---

一个可以在iOS上自定义键盘输入辅助视图的组件。当`TextInput`获得焦点时，输入辅助视图显示在键盘上方。该组件可用于创建自定义工具栏。

要使用此组件，请将您的自定义工具栏包装在InputAccessoryView组件中，并设置一个`nativeID`。然后，将该`nativeID`作为您想要的任何`TextInput `的`inputAccessoryViewID'。一个基本的例子：

```SnackPlayer name=InputAccessoryView&supportedPlatforms=ios
import React, {useState} from 'react';
import {Button, InputAccessoryView, ScrollView, TextInput} from 'react-native';

const App = () => {
  const inputAccessoryViewID = 'uniqueID';
  const initialText = '';
  const [text, setText] = useState(initialText);

  return (
    <>
      <ScrollView keyboardDismissMode="interactive">
        <TextInput
          style={{
            padding: 16,
            marginTop: 50,
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setText}
          value={text}
          placeholder={'Please type here…'}
        />
      </ScrollView>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={() => setText(initialText)} title="Clear text" />
      </InputAccessoryView>
    </>
  );
};

export default App;
```

该组件还可用于创建粘性文本输入框（锚定在键盘顶部的文本输入框）。为此，用`InputAccessoryView`组件包裹一个`TextInput`，并不要设置`nativeID`。示例请参考[InputAccessoryViewExample.js](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/InputAccessoryView/InputAccessoryViewExample.js)。

---

# 文档

## Props

### `backgroundColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `nativeID`

一个用于将此 `InputAccessoryView` 与指定的 TextInput(s) 关联的 ID。

| 类型   |
| ------ |
| string |

---

### `style`

| 类型                         |
| ---------------------------- |
| [style](view-style-props.md) |

# 已知问题

- [react-native#18997](https://github.com/facebook/react-native/issues/18997): 不支持多行的`TextInput`
- [react-native#20157](https://github.com/facebook/react-native/issues/20157): 不能和底部 tab 栏一起使用
