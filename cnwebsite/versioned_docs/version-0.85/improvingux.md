---
id: improvingux
title: 改进用户体验
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 配置文本输入

在触屏手机上输入文本是一件有挑战性的事——小屏幕、软键盘。但根据你需要的数据类型，可以通过正确配置文本输入来简化这个过程：

- 自动聚焦第一个输入框
- 使用 placeholder 文本作为预期数据格式的示例
- 启用或禁用自动大写和自动纠错
- 选择键盘类型（例如 email、数字）
- 确保回车键聚焦到下一个输入框或提交表单

查看 [`TextInput` 文档](textinput.md) 了解更多配置选项。

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=TextInput%20form%20example&ext=js
import React, {useState, useRef} from 'react';
import {
  Alert,
  Text,
  StatusBar,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const emailInput = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = () => {
    Alert.alert(
      `Welcome, ${name}! Confirmation email has been sent to ${email}`,
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.description}>
          This demo shows how using available TextInput customizations can make
          forms much easier to use. Try completing the form and notice that
          different fields have specific optimizations and the return key
          changes from focusing next input to submitting the form.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Full Name"
        autoFocus={true}
        autoCapitalize="words"
        autoCorrect={true}
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={() => emailInput.current.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        ref={emailInput}
        placeholder="email@example.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="send"
        onSubmitEditing={submit}
        blurOnSubmit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    padding: 20,
    backgroundColor: '#282c34',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=TextInput%20form%20example&ext=tsx
import React, {useState, useRef} from 'react';
import {
  Alert,
  Text,
  StatusBar,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const emailInput = useRef<TextInput>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = () => {
    Alert.alert(
      `Welcome, ${name}! Confirmation email has been sent to ${email}`,
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.description}>
          This demo shows how using available TextInput customizations can make
          forms much easier to use. Try completing the form and notice that
          different fields have specific optimizations and the return key
          changes from focusing next input to submitting the form.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Full Name"
        autoFocus={true}
        autoCapitalize="words"
        autoCorrect={true}
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={() => emailInput.current?.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        ref={emailInput}
        placeholder="email@example.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="send"
        onSubmitEditing={submit}
        blurOnSubmit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    padding: 20,
    backgroundColor: '#282c34',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});

export default App;
```

</TabItem>
</Tabs>

## 键盘弹出时的布局管理

软键盘几乎会占据屏幕的一半空间。如果你有可能被键盘遮挡的交互式元素，请使用 [`KeyboardAvoidingView` 组件](keyboardavoidingview.md) 来确保它们仍然可以被访问。

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=KeyboardAvoidingView%20example&ext=js
import React, {useState, useRef} from 'react';
import {
  Alert,
  Text,
  Button,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const emailInput = useRef(null);
  const [email, setEmail] = useState('');

  const submit = () => {
    emailInput.current.blur();
    Alert.alert(`Confirmation email has been sent to ${email}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.description}>
          This demo shows how to avoid covering important UI elements with the
          software keyboard. Focus the email input below and notice that the
          Sign Up button and the text adjusted positions to make sure they are
          not hidden under the keyboard.
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          ref={emailInput}
          placeholder="email@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={submit}
          blurOnSubmit={true}
        />
        <View>
          <Button title="Sign Up" onPress={submit} />
          <Text style={styles.legal}>Some important legal fine print here</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    padding: 20,
    backgroundColor: '#282c34',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  legal: {
    margin: 10,
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=KeyboardAvoidingView%20example&ext=tsx
import React, {useState, useRef} from 'react';
import {
  Alert,
  Text,
  Button,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const emailInput = useRef<TextInput>(null);
  const [email, setEmail] = useState('');

  const submit = () => {
    emailInput.current?.blur();
    Alert.alert(`Confirmation email has been sent to ${email}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.description}>
          This demo shows how to avoid covering important UI elements with the
          software keyboard. Focus the email input below and notice that the
          Sign Up button and the text adjusted positions to make sure they are
          not hidden under the keyboard.
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          ref={emailInput}
          placeholder="email@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={submit}
          blurOnSubmit={true}
        />
        <View>
          <Button title="Sign Up" onPress={submit} />
          <Text style={styles.legal}>Some important legal fine print here</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    padding: 20,
    backgroundColor: '#282c34',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  legal: {
    margin: 10,
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;
```

</TabItem>
</Tabs>

## 放大可触控区域

在手机上精确点击按钮是很困难的。确保所有交互式元素的尺寸至少为 44x44。一种做法是给元素留出足够的空间，使用 `padding`、`minWidth` 和 `minHeight` 样式值。或者，你可以使用 [`hitSlop` 属性](touchablewithoutfeedback.md#hitslop) 来增加可交互区域，而不影响布局。以下是一个演示：

```SnackPlayer name=HitSlop%20example
import React from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.description}>
          This demo shows how using hitSlop can make interactive elements much
          easier to tap without changing their layout and size. Try pressing
          each button quickly multiple times and notice which one is easier to
          hit.
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity>
          <Text style={styles.label}>Without hitSlop</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <View style={styles.preview}>
          <TouchableOpacity
            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
            <Text style={styles.label}>With hitSlop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    padding: 20,
    backgroundColor: '#282c34',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#336699',
    textAlign: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  separator: {
    height: 50,
  },
  preview: {
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
});

export default App;
```

## 使用 Android 水波纹效果

Android API 21+ 使用 Material Design 水波纹效果，在用户触摸屏幕上的可交互区域时提供反馈。React Native 通过 [`TouchableNativeFeedback` 组件](touchablenativefeedback.md) 暴露了这一功能。使用这种触摸效果代替透明度或高亮，通常会让你的应用在平台上更加自然。不过需要注意的是，它在 iOS 或 Android API < 21 上不起作用，因此你需要在 iOS 上回退使用其他 Touchable 组件。你可以使用像 [react-native-platform-touchable](https://github.com/react-community/react-native-platform-touchable) 这样的库来处理平台差异。

```SnackPlayer name=Android%20Ripple%20example&supportedPlatforms=android
import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const SUPPORTS_NATIVE_FEEDBACK =
  Platform.OS === 'android' && Platform.Version >= 21;

const noop = () => {};
const defaultHitSlop = {top: 15, bottom: 15, right: 15, left: 15};

const ButtonsWithNativeFeedback = () => (
  <View style={styles.buttonContainer}>
    <TouchableNativeFeedback
      onPress={noop}
      background={TouchableNativeFeedback.Ripple('#06bcee', false)}
      hitSlop={defaultHitSlop}>
      <View style={styles.button}>
        <Text style={styles.text}>This is a ripple respecting borders</Text>
      </View>
    </TouchableNativeFeedback>
    <TouchableNativeFeedback
      onPress={noop}
      background={TouchableNativeFeedback.Ripple('#06bcee', true)}
      hitSlop={defaultHitSlop}>
      <View style={styles.button}>
        <Text style={styles.text}>
          This is ripple without borders, this is more useful for icons, eg: in
          tab bar
        </Text>
      </View>
    </TouchableNativeFeedback>
  </View>
);

const Buttons = () => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.button}
      onPress={noop}
      hitSlop={defaultHitSlop}>
      <Text style={styles.text}>This is opacity</Text>
    </TouchableOpacity>
    <TouchableHighlight
      style={styles.button}
      onPress={noop}
      hitSlop={defaultHitSlop}
      underlayColor="#06bcee">
      <Text style={styles.text}>This is highlight</Text>
    </TouchableHighlight>
  </View>
);

const App = () => (
  <View style={styles.container}>
    {SUPPORTS_NATIVE_FEEDBACK ? <ButtonsWithNativeFeedback /> : <Buttons />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 24,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    padding: 25,
    borderRadius: 5,
    backgroundColor: '#000',
    marginBottom: 30,
  },
});

export default App;
```

## 屏幕方向锁定

除非你使用了 `Dimensions` API 且没有处理屏幕方向变化，否则多种屏幕方向默认应该可以正常工作。如果你不想支持多种屏幕方向，可以将屏幕方向锁定为竖屏或横屏。

在 iOS 上，在 Xcode 的 General 选项卡和 Deployment Info 部分中，启用你想要支持的 Device Orientation（确保在做更改时已从 Devices 菜单中选择了 iPhone）。对于 Android，打开 AndroidManifest.xml 文件，在 activity 元素中添加 `'android:screenOrientation="portrait"'` 以锁定为竖屏，或添加 `'android:screenOrientation="landscape"'` 以锁定为横屏。

# 了解更多

[Material Design](https://material.io/) 和 [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) 是学习移动平台设计的优秀资源。
