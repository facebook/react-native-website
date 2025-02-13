---
id: keyboard
title: Keyboard
---


`Keyboard`模块用来控制键盘相关的事件。

### 用法示例

`Keyboard`模块可以监听原生键盘事件以做出相应回应，比如收回键盘。

```SnackPlayer name=Keyboard%20Example&supportedPlatforms=ios,android
import React, {useState, useEffect} from 'react';
import {Keyboard, Text, TextInput, StyleSheet, View} from 'react-native';

const Example = () => {
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Click here…"
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={style.status}>{keyboardStatus}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 10,
    textAlign: 'center',
  },
});

export default Example;
```

---

# 文档

## 方法

### `addListener()`

```tsx
static addListener: (
  eventType: KeyboardEventName,
  listener: KeyboardEventListener,
) => EmitterSubscription;
```

`addListener`用于注册一个 JavaScript 函数来监听处理原生键盘通知事件。

此方法会返回监听函数的引用。

**参数：**

| 名称                                                                     | 类型     | 说明                                                                    |
| ------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------ |
| eventName <div className="label basic two-lines required">Required</div> | string   | 用来指明要监听的事件，具体有以下几种: |
| callback <div className="label basic two-lines required">Required</div>  | function | 事件触发时调用的 js 函数       

**`eventName`**

事件为以下几种：

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

> 注意在 Android 上只有`keyboardDidShow`和`keyboardDidHide`事件有效。如果 Android 版本小于等于 10， 且`android:windowSoftInputMode`设置为`adjustNothing`，则没有任何事件有效。

---

### `dismiss()`

```tsx
static dismiss()
```

把弹出的键盘收回去，同时使当前的文本框失去焦点。

---

### `scheduleLayoutAnimation`

```tsx
static scheduleLayoutAnimation(event: KeyboardEvent);
```

用于将TextInput（或其他键盘附属视图）的大小或位置变化与键盘移动同步。

---

### `isVisible()`

```tsx
static isVisible(): boolean;
```

键盘当前是否弹出可见。

---

### `metrics()`

```tsx
static metrics(): KeyboardMetrics | undefined;
```

如果当前已经弹出软键盘，返回当前软键盘的尺寸。
