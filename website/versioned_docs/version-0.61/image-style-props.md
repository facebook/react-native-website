---
id: version-0.61-image-style-props
title: Image Style Props
original_id: image-style-props
---

### Examples

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=Function%20Component%20Display%20An%20Image%20With%20Style%20resizeMode
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cover: {
    resizeMode: 'cover',
    height: 100,
    width: 200
  },
  contain: {
    resizeMode: 'contain',
    height: 100,
    width: 200
  },
  stretch: {
    resizeMode: 'stretch',
    height: 100,
    width: 200
  },
  repeat: {
    resizeMode: 'repeat',
    height: 100,
    width: 200
  },
  center: {
    resizeMode: 'center',
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  }
});

export default function DisplayAnImageWithStyle() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.cover}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.contain}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.stretch}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.repeat}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.repeat}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.center}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </View>
  );
}
```

<block class="classical syntax" />

```SnackPlayer name=Image%20Style%20Props%20Class%20Component%20Display%20An%20Image%20With%20Style%20resizeMode
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cover: {
    resizeMode: 'cover',
    height: 100,
    width: 200
  },
  contain: {
    resizeMode: 'contain',
    height: 100,
    width: 200
  },
  stretch: {
    resizeMode: 'stretch',
    height: 100,
    width: 200
  },
  repeat: {
    resizeMode: 'repeat',
    height: 100,
    width: 200
  },
  center: {
    resizeMode: 'center',
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  }
});

export default class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.cover}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.contain}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.stretch}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.repeat}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.repeat}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.center}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
      </View>
    );
  }
}
```

<block class="endBlock syntax" />

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=Function%20Component%20Display%20An%20Image%20With%20Style%20borderTopRightRadius%20borderBottomRightRadius%20borderBottomLeftRadius%20borderTopLeftRadius
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoBorderTopRightRadius: {
    borderTopRightRadius: 20,
    height: 100,
    width: 200
  },
  demoBorderBottomRightRadius: {
    borderBottomRightRadius: 20,
    height: 100,
    width: 200
  },
  demoBorderBottomLeftRadius: {
    borderBottomLeftRadius: 20,
    height: 100,
    width: 200
  },
  demoBorderTopLeftRadius: {
    borderTopLeftRadius: 20,
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  }
});

export default function DisplayAnImageWithStyle() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.demoBorderTopRightRadius}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.demoBorderBottomRightRadius}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.demoBorderBottomLeftRadius}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.demoBorderTopLeftRadius}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </View>
  );
}
```

<block class="classical syntax" />

```SnackPlayer name=Image%20Style%20Props%20Class%20Component%20Display%20An%20Image%20With%20Style%20borderTopRightRadius%20borderBottomRightRadius%20borderBottomLeftRadius%20borderTopLeftRadius
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoBorderTopRightRadius: {
    borderTopRightRadius: 20,
    height: 100,
    width: 200
  },
  demoBorderBottomRightRadius: {
    borderBottomRightRadius: 20,
    height: 100,
    width: 200
  },
  demoBorderBottomLeftRadius: {
    borderBottomLeftRadius: 20,
    height: 100,
    width: 200
  },
  demoBorderTopLeftRadius: {
    borderTopLeftRadius: 20,
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  }
});

export default class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.demoBorderTopRightRadius}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.demoBorderBottomRightRadius}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.demoBorderBottomLeftRadius}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={styles.demoBorderTopLeftRadius}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
      </View>
    );
  }
}
```

<block class="endBlock syntax" />

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=Function%20Component%20Display%20An%20Image%20With%20Style%20borderColor%20borderRadius%20borderWidth
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoImage: {
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 5,
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default function DisplayAnImageWithStyle() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.demoImage}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </View>
  );
}
```

<block class="classical syntax" />

```SnackPlayer name=Image%20Style%20Props%20Class%20Component%20Display%20An%20Image%20With%20Style%20borderColor%20borderRadius%20borderWidth
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoImage: {
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 5,
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  }
});

export default class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.demoImage}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
      </View>
    );
  }
}
```

<block class="endBlock syntax" />

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=Function%20Component%20Display%20An%20Image%20With%20Style%20tintColor
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoImageTintColor: {
    tintColor: '#000000',
    resizeMode: 'contain',
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  },
});

export default function DisplayAnImageWithStyle() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.demoImageTintColor}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </View>
  );
}
```

<block class="classical syntax" />

```SnackPlayer name=Image%20Style%20Props%20Class%20Component%20Display%20An%20Image%20With%20Style%20tintColor
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  demoImageTintColor: {
    tintColor: '#000000',
    resizeMode: 'contain',
    height: 100,
    width: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  },
});

export default function DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.demoImageTintColor}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
      </View>
    );
  }
}
```

<block class="endBlock syntax" />

### Props

- [`borderTopRightRadius`](image-style-props.md#bordertoprightradius)
- [`backfaceVisibility`](image-style-props.md#backfacevisibility)
- [`borderBottomLeftRadius`](image-style-props.md#borderbottomleftradius)
- [`borderBottomRightRadius`](image-style-props.md#borderbottomrightradius)
- [`borderColor`](image-style-props.md#bordercolor)
- [`borderRadius`](image-style-props.md#borderradius)
- [`borderTopLeftRadius`](image-style-props.md#bordertopleftradius)
- [`backgroundColor`](image-style-props.md#backgroundcolor)
- [`borderWidth`](image-style-props.md#borderwidth)
- [`opacity`](image-style-props.md#opacity)
- [`overflow`](image-style-props.md#overflow)
- [`resizeMode`](image-style-props.md#resizemode)
- [`tintColor`](image-style-props.md#tintcolor)
- [`overlayColor`](image-style-props.md#overlaycolor)

---

# Reference

## Props

### `borderTopRightRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `backfaceVisibility`

| Type                      | Required |
| ------------------------- | -------- |
| enum('visible', 'hidden') | No       |

---

### `borderBottomLeftRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderBottomRightRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderColor`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `borderRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopLeftRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `backgroundColor`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `borderWidth`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `opacity`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `overflow`

| Type                      | Required |
| ------------------------- | -------- |
| enum('visible', 'hidden') | No       |

---

### `resizeMode`

| Type                                                    | Required |
| ------------------------------------------------------- | -------- |
| enum('cover', 'contain', 'stretch', 'repeat', 'center') | No       |

---

### `tintColor`

Changes the color of all the non-transparent pixels to the tintColor.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `overlayColor`

When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. This is useful in cases which are not supported by the Android implementation of rounded corners:

- Certain resize modes, such as 'contain'
- Animated GIFs

A typical way to use this prop is with images displayed on a solid background and setting the `overlayColor` to the same color as the background.

For details of how this works under the hood, see https://frescolib.org/docs/rounded-corners-and-circles.html

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |
