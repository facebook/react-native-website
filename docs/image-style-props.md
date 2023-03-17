---
id: image-style-props
title: Image Style Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Examples

### Image Resize Mode

<Tabs groupId="syntax" queryString defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Image%20Resize%20Modes%20Function%20Component%20Example
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            resizeMode: 'cover',
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>resizeMode : cover</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: 'contain',
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>resizeMode : contain</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: 'stretch',
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>resizeMode : stretch</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: 'repeat',
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>resizeMode : repeat</Text>
      </View>
      <View>
        <Image
          style={{
            resizeMode: 'center',
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>resizeMode : center</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Image%20Resize%20Modes%20Class%20Component%20Example
import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{
              resizeMode: 'cover',
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>resizeMode : cover</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: 'contain',
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>resizeMode : contain</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: 'stretch',
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>resizeMode : stretch</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: 'repeat',
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>resizeMode : repeat</Text>
        </View>
        <View>
          <Image
            style={{
              resizeMode: 'center',
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>resizeMode : center</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

### Image Border

<Tabs groupId="syntax" queryString defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Function%20Component%20Example
import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          borderColor: 'red',
          borderWidth: 5,
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>borderColor & borderWidth</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Class%20Component%20Example
import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            borderColor: 'red',
            borderWidth: 5,
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>borderColor & borderWidth</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

### Image Border Radius

<Tabs groupId="syntax" queryString defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Style%20Border%20Radius%20Function%20Component%20Example
import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            borderTopRightRadius: 20,
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>borderTopRightRadius</Text>
      </View>
      <View>
        <Image
          style={{
            borderBottomRightRadius: 20,
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>borderBottomRightRadius</Text>
      </View>
      <View>
        <Image
          style={{
            borderBottomLeftRadius: 20,
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>borderBottomLeftRadius</Text>
      </View>
      <View>
        <Image
          style={{
            borderTopLeftRadius: 20,
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>borderTopLeftRadius</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Style%20Border%20Radius%20Class%20Component%20Example
import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{
              borderTopRightRadius: 20,
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>borderTopRightRadius</Text>
        </View>
        <View>
          <Image
            style={{
              borderBottomRightRadius: 20,
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>borderBottomRightRadius</Text>
        </View>
        <View>
          <Image
            style={{
              borderBottomLeftRadius: 20,
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>borderBottomLeftRadius</Text>
        </View>
        <View>
          <Image
            style={{
              borderTopLeftRadius: 20,
              height: 100,
              width: 200,
            }}
            source={require('@expo/snack-static/react-native-logo.png')}
          />
          <Text>borderTopLeftRadius</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

### Image Tint

<Tabs groupId="syntax" queryString defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Style%20tintColor%20Function%20Component
import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          tintColor: '#000000',
          resizeMode: 'contain',
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>tintColor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Style%20tintColor%20Class%20Component
import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            tintColor: '#000000',
            resizeMode: 'contain',
            height: 100,
            width: 200,
          }}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text>tintColor</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

</TabItem>
</Tabs>

# Reference

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

When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. This is useful in cases which are not supported by the Android implementation of rounded corners:

- Certain resize modes, such as `'contain'`
- Animated GIFs

A typical way to use this prop is with images displayed on a solid background and setting the `overlayColor` to the same color as the background.

For details of how this works under the hood, see [Fresco documentation](https://frescolib.org/docs/rounded-corners-and-circles.html).

| Type   |
| ------ |
| string |

---

### `resizeMode`

Determines how to resize the image when the frame doesn't match the raw image dimensions. Defaults to `cover`.

- `cover`: Scale the image uniformly (maintain the image's aspect ratio) so that:

  - Both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding)
  - At least one dimension of the scaled image will be equal to the corresponding dimension of the view (minus padding)

- `contain`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).

- `stretch`: Scale width and height independently, This may change the aspect ratio of the src.

- `repeat`: Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.

- `center`: Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in the view.

| Type                                                              | Default   |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `objectFit`

Determines how to resize the image when the frame doesn't match the raw image dimensions.

| Type                                                   | Default   |
| ------------------------------------------------------ | --------- |
| enum(`'cover'`, `'contain'`, `'fill'`, `'scale-down'`) | `'cover'` |

---

### `tintColor`

Changes the color of all the non-transparent pixels to the tintColor.

| Type               |
| ------------------ |
| [color](colors.md) |
