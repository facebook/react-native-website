---
id: layoutanimation
title: LayoutAnimation
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(95.23%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(4.77%)

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

当布局变化时，自动将视图运动到它们新的位置上。

一个常用的调用此 API 的办法是在状态更新前调用。

注意如果要在**Android**上使用此动画，则需要在代码中启用：

```
import { UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
```

上面这段代码应该写在任何组件加载之前，比如可以写到 index.js 的开头。

## 示例

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import React, { useState } from "react";
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const App = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setExpanded(!expanded);
        }}
      >
        <Text>Press me to {expanded ? "collapse" : "expand"}!</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={style.tile}>
          <Text>I disappear sometimes!</Text>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  tile: {
    background: "lightGrey",
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }
});

export default App;
```

---

# 文档

## 方法

### `configureNext()`

```jsx
static configureNext(config, onAnimationDidEnd?, onAnimationDidFail?)
```

计划下一次布局要发生的动画。

#### 参数：

| 名称               | 类型     | 必填 | 说明             |
| ------------------ | -------- | ---- | ---------------- |
| config             | object   | 是   | 看下面的说明     |
| onAnimationDidEnd  | function | 否   | 动画结束后的回调 |
| onAnimationDidFail | function | 否   | 动画失败后的回调 |

##### config

- `duration` 动画持续时间，单位是毫秒。
- `create`，配置创建新视图时的动画。（参阅`Anim`类型）
- `update`，配置被更新的视图的动画。（参阅`Anim`类型）

---

### `create()`

```jsx
static create(duration, type, creationProp)
```

用来创建`configureNext`所需的 config 参数的辅助函数。

示例：

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import React, { useState } from "react";
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [boxPosition, setBoxPosition] = useState("left");

  const toggleBox = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.spring,
        LayoutAnimation.Properties.scaleXY
      )
    );
    setBoxPosition(boxPosition === "left" ? "right" : "left");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Layout" onPress={toggleBox} />
      </View>
      <View
        style={[styles.box, boxPosition === "left" ? null : styles.moveRight]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue"
  },
  moveRight: {
    alignSelf: "flex-end",
    height: 200,
    width: 200
  },
  buttonContainer: {
    alignSelf: "center"
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import React, { Component } from "react";
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class App extends Component {
  state = {
    boxPosition: "left"
  };

  toggleBox = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.spring,
        LayoutAnimation.Properties.scaleXY
      )
    );
    this.setState({
      boxPosition: this.state.boxPosition === "left" ? "right" : "left"
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Toggle Layout" onPress={this.toggleBox} />
        </View>
        <View
          style={[
            styles.box,
            this.state.boxPosition === "left" ? null : styles.moveRight
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue"
  },
  moveRight: {
    alignSelf: "flex-end",
    height: 200,
    width: 200
  },
  buttonContainer: {
    alignSelf: "center"
  }
});

export default App;
```

</TabItem>
</Tabs>

## Properties

### Types

An enumeration of animation types to be used in the [`create`](layoutanimation.md#create) method, or in the `create`/`update`/`delete` configs for [`configureNext`](layoutanimation.md#configurenext). (example usage: `LayoutAnimation.Types.easeIn`)

| Types         |
| ------------- |
| spring        |
| linear        |
| easeInEaseOut |
| easeIn        |
| easeOut       |
| keyboard      |

---

### Properties

An enumeration of layout properties to be animated to be used in the [`create`](layoutanimation.md#create) method, or in the `create`/`update`/`delete` configs for [`configureNext`](layoutanimation.md#configurenext). (example usage: `LayoutAnimation.Properties.opacity`)

| Properties |
| ---------- |
| opacity    |
| scaleX     |
| scaleY     |
| scaleXY    |

---

### Presets

A set of predefined animation config.

| Presets       | Value                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| easeInEaseOut | `create(300, 'easeInEaseOut', 'opacity')`                                                                                                                             |
| linear        | `create(500, 'linear', 'opacity')`                                                                                                                                    |
| spring        | `{ duration: 700, create: { type: 'linear', property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 }, delete: { type: 'linear', property: 'opacity' } }` |

---

### easeInEaseOut

Shortcut to bind `configureNext()` methods with `Presets.easeInEaseOut`.

---

### linear

Shortcut to bind `configureNext()` methods with `Presets.linear`.

---

### spring

Shortcut to bind `configureNext()` methods with `Presets.spring`.

Example usage:

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import React, { useState } from "react";
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [firstBoxPosition, setFirstBoxPosition] = useState("left");
  const [secondBoxPosition, setSecondBoxPosition] = useState("left");
  const [thirdBoxPosition, setThirdBoxPosition] = useState("left");

  const toggleFirstBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFirstBoxPosition(firstBoxPosition === "left" ? "right" : "left");
  };

  const toggleSecondBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setSecondBoxPosition(secondBoxPosition === "left" ? "right" : "left");
  };

  const toggleThirdBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setThirdBoxPosition(thirdBoxPosition === "left" ? "right" : "left");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="EaseInEaseOut" onPress={toggleFirstBox} />
      </View>
      <View
        style={[
          styles.box,
          firstBoxPosition === "left" ? null : styles.moveRight
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button title="Linear" onPress={toggleSecondBox} />
      </View>
      <View
        style={[
          styles.box,
          secondBoxPosition === "left" ? null : styles.moveRight
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button title="Spring" onPress={toggleThirdBox} />
      </View>
      <View
        style={[
          styles.box,
          thirdBoxPosition === "left" ? null : styles.moveRight
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue"
  },
  moveRight: {
    alignSelf: "flex-end"
  },
  buttonContainer: {
    alignSelf: "center"
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import React, { Component } from "react";
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class App extends Component {
  state = {
    firstBoxPosition: "left",
    secondBoxPosition: "left",
    thirdBoxPosition: "left"
  };

  toggleFirstBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      firstBoxPosition:
        this.state.firstBoxPosition === "left" ? "right" : "left"
    });
  };

  toggleSecondBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({
      secondBoxPosition:
        this.state.secondBoxPosition === "left" ? "right" : "left"
    });
  };

  toggleThirdBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      thirdBoxPosition:
        this.state.thirdBoxPosition === "left" ? "right" : "left"
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="EaseInEaseOut" onPress={this.toggleFirstBox} />
        </View>
        <View
          style={[
            styles.box,
            this.state.firstBoxPosition === "left" ? null : styles.moveRight
          ]}
        />
        <View style={styles.buttonContainer}>
          <Button title="Linear" onPress={this.toggleSecondBox} />
        </View>
        <View
          style={[
            styles.box,
            this.state.secondBoxPosition === "left" ? null : styles.moveRight
          ]}
        />
        <View style={styles.buttonContainer}>
          <Button title="Spring" onPress={this.toggleThirdBox} />
        </View>
        <View
          style={[
            styles.box,
            this.state.thirdBoxPosition === "left" ? null : styles.moveRight
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue"
  },
  moveRight: {
    alignSelf: "flex-end"
  },
  buttonContainer: {
    alignSelf: "center"
  }
});

export default App;
```

</TabItem>
</Tabs>
