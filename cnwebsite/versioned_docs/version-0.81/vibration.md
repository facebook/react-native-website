---
id: vibration
title: Vibration
---

使设备振动。

## 示例

```SnackPlayer name=Vibration&supportedPlatforms=ios,android
import React from 'react';
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const App = () => {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const PATTERN_DESC =
    Platform.OS === 'android'
      ? 'wait 1s, vibrate 2s, wait 3s'
      : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>Vibration API</Text>
      <View>
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
      <Separator />
      {Platform.OS === 'android'
        ? [
            <View>
              <Button
                title="Vibrate for 10 seconds"
                onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
              />
            </View>,
            <Separator />,
          ]
        : null}
      <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
      <Button
        title="Vibrate with pattern"
        onPress={() => Vibration.vibrate(PATTERN)}
      />
      <Separator />
      <Button
        title="Vibrate with pattern until cancelled"
        onPress={() => Vibration.vibrate(PATTERN, true)}
      />
      <Separator />
      <Button
        title="Stop vibration pattern"
        onPress={() => Vibration.cancel()}
        color="#FF0000"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

> Android apps should request the `android.permission.VIBRATE` permission by adding `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`.

> The Vibration API is implemented as a `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` call on iOS.

---

# 文档

## 方法

### `cancel()`

```tsx
static cancel();
```

Call this to stop vibrating after having invoked `vibrate()` with repetition enabled.

---

### `vibrate()`

```tsx
static vibrate(
  pattern?: number | number[],
  repeat?: boolean
);
```

触发一个固定持续时间的振动。

**在 Android 上，** 振动持续时间默认为 400 毫秒，可以通过将数字作为`pattern`参数的值来指定任意的振动持续时间。**在 iOS 上，** 振动持续时间固定在大约 400 毫秒左右。

`vibrate()`方法可以接受一个包含数字数组的`pattern`参数，这些数字代表以毫秒为单位的时间。你可以设置`repeat`为 true，在调用`cancel()`之前循环运行振动模式。

**在 Android 上，** `pattern`数组中的奇数索引表示振动持续时间，而偶数索引表示间隔时间。**在 iOS 上，** `pattern`数组中的数字表示间隔时间，因为振动持续时间是固定的。

**参数:**

| Name    | Type                                                                     | Default | Description                                                                                       |
| ------- | ------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| pattern | number <div className="label android">Android</div><hr/>array of numbers | `400`   | Vibration duration in milliseconds.<hr/>Vibration pattern as an array of numbers in milliseconds. |
| repeat  | boolean                                                                  | `false` | Repeat vibration pattern until `cancel()`.                                                        |
