---
id: image-style-props
title: 图片样式属性
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(69.22%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(30.78%)

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 示例

### Image Resize Mode

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Image%20Resize%20Modes%20Function%20Component%20Example
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            resizeMode: "cover",
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>resizeMode : cover</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: "contain",
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>resizeMode : contain</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: "stretch",
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>resizeMode : stretch</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: "repeat",
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>resizeMode : repeat</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: "center",
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>resizeMode : center</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Image%20Resize%20Modes%20Class%20Component%20Example
import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{
              resizeMode: "cover",
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>resizeMode : cover</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: "contain",
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>resizeMode : contain</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: "stretch",
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>resizeMode : stretch</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: "repeat",
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>resizeMode : repeat</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: "center",
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>resizeMode : center</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

### Image Border

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Function%20Component%20Example
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          borderColor: "red",
          borderWidth: 5,
          height: 100,
          width: 200
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>borderColor & borderWidth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Class%20Component%20Example
import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            borderColor: "red",
            borderWidth: 5,
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>borderColor & borderWidth</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

### Image Border Radius

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Style%20Border%20Radius%20Function%20Component%20Example
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            borderTopRightRadius: 20,
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>borderTopRightRadius</Text>
      </View>
      <View>
        <Image
          style={{
            borderBottomRightRadius: 20,
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>borderBottomRightRadius</Text>
      </View>
      <View>
        <Image
          style={{
            borderBottomLeftRadius: 20,
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>borderBottomLeftRadius</Text>
      </View>
      <View>
        <Image
          style={{
            borderTopLeftRadius: 20,
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>borderTopLeftRadius</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Style%20Border%20Radius%20Class%20Component%20Example
import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{
              borderTopRightRadius: 20,
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>borderTopRightRadius</Text>
        </View>
        <View>
          <Image
            style={{
              borderBottomRightRadius: 20,
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>borderBottomRightRadius</Text>
        </View>
        <View>
          <Image
            style={{
              borderBottomLeftRadius: 20,
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>borderBottomLeftRadius</Text>
        </View>
        <View>
          <Image
            style={{
              borderTopLeftRadius: 20,
              height: 100,
              width: 200
            }}
            source={require("@expo/snack-static/react-native-logo.png")}
          />
          <Text>borderTopLeftRadius</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

### Image Tint

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Style%20tintColor%20Function%20Component
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          tintColor: "#000000",
          resizeMode: "contain",
          height: 100,
          width: 200
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>tintColor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Style%20tintColor%20Class%20Component
import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            tintColor: "#000000",
            resizeMode: "contain",
            height: 100,
            width: 200
          }}
          source={require("@expo/snack-static/react-native-logo.png")}
        />
        <Text>tintColor</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

# 文档

## Props

### `backfaceVisibility`

The property defines whether or not the back face of a rotated image should be visible.

| Type                          | Default     |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `backgroundColor`

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomRightRadius`

| Type   |
| ------ |
| number |

---

### `borderColor`

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `borderRadius`

| Type   |
| ------ |
| number |

---

### `borderTopLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderTopRightRadius`

| Type   |
| ------ |
| number |

---

### `borderWidth`

| Type   |
| ------ |
| number |

---

### `opacity`

Set an opacity value for the image. The number should be in the range from `0.0` to `1.0`.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `overflow`

| Type                          | Default     |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `overlayColor` <div class="label android">Android</div>

当图片有圆角的时候，指定一个颜色用于填充圆角处的空白。虽然一般情况下圆角处是透明的，但在某些情况下，Android 并不支持圆角透明，比如：

- 某些 resize 模式比如'contain'
- GIF 动画

常见的用法就是在不能圆角透明时，设置`overlayColor`和背景色一致。

详细说明可参考<https://frescolib.org/docs/rounded-corners-and-circles.html>。

| 类型   |
| ------ |
| string |

---

### `resizeMode`

| 类型                                                              | 默认值    |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `tintColor`

为所有非透明的像素指定一个颜色。

| 类型               |
| ------------------ |
| [color](colors.md) |
