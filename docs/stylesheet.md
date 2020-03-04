---
id: stylesheet
title: StyleSheet
---

A StyleSheet is an abstraction similar to CSS StyleSheets

Creates a StyleSheet style reference from the given object:

```SnackPlayer name=Create
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const isActive = true;

export default App = () => (
  <View style={styles.container}>
    <Text style={[styles.title, isActive && styles.activeTitle]}>Inside</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 4,
    backgroundColor: '#eaeaea'
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
```

Code quality:

- By moving styles away from the render function, you're making the code easier to understand.
- Naming the styles is a good way to add meaning to the low level components in the render function.

---

# Reference

## Methods

### `setStyleAttributePreprocessor()`

```jsx
static setStyleAttributePreprocessor(property, process)
```

WARNING: EXPERIMENTAL. Breaking changes will probably happen a lot and will not be reliably announced. The whole thing might be deleted, who knows? Use at your own risk.

Sets a function to use to pre-process a style property value. This is used internally to process color and transform values. You should not use this unless you really know what you are doing and have exhausted other options.

### `flatten`

Flattens an array of style objects, into one aggregated style object. Alternatively, this method can be used to lookup IDs, returned by `StyleSheet.register`.

> _NOTE_: Exercise caution as abusing this can tax you in terms of optimizations. IDs enable optimizations through the bridge and memory in general. Referring to style objects directly will deprive you of these optimizations.

Example:

```SnackPlayer name=Flatten
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default App = () => (
  <View>
    <Text style={styles}>Inside</Text>
  </View>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },

});

const lists = StyleSheet.create({
  listItem: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  selectedListItem: {
    color: 'green',
  },
});

const styles = StyleSheet.flatten([page.text, lists.selectedListItem]);
// returns { flex: 1, fontSize: 16, color: 'green' }
```

This method internally uses `StyleSheetRegistry.getStyleByID(style)` to resolve style objects represented by IDs. Thus, an array of style objects (instances of `StyleSheet.create()`), are individually resolved to, their respective objects, merged as one and then returned. This also explains the alternative use.

---

### `compose`

Combines two styles such that `style2` will override any styles in `style1`. If either style is falsy, the other one is returned without allocating an array, saving allocations and maintaining reference equality for PureComponent checks.

```SnackPlayer name=Compose
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default App = () => (
  <View style={container}>
    <Text style={text}>Inside</Text>
  </View>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
});

const lists = StyleSheet.create({
  listItem: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'yellow',
  },
  selectedListItem: {
    fontStyle: 'italic',
    color: 'green',
  },
});

const container = StyleSheet.compose(page.container, lists.listItem);
const text = StyleSheet.compose(page.text, lists.selectedListItem);
```

## Properties

### `hairlineWidth`

This is defined as the width of a thin line on the platform. It can be used as the thickness of a border or division between two elements. Example:

```SnackPlayer name=hairlineWidth
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default App = () => (
  <View>
    <Text style={space.separator}>Inside</Text>
  </View>
);

const space = StyleSheet.create({
  separator: {
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
```

This constant will always be a round number of pixels (so a line defined by it can look crisp) and will try to match the standard width of a thin line on the underlying platform. However, you should not rely on it being a constant size, because on different platforms and screen densities its value may be calculated differently.

A line with hairline width may not be visible if your simulator is downscaled.

---

### `absoluteFill`

A very common pattern is to create overlays with position absolute and zero positioning (`position: 'absolute', left: 0, right: 0, top: 0, bottom: 0`), so `absoluteFill` can be used for convenience and to reduce duplication of these repeated styles. If you want, absoluteFill can be used to create a customized entry in a StyleSheet, e.g.:

```SnackPlayer name=absoluteFill
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default App = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Text style={styles.text}>1</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.text}>2</Text>
    </View>
    <View style={styles.box3}>
      <Text style={styles.text}>3</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  box2: {
    ...StyleSheet.absoluteFill,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box3: {
    position: 'absolute',
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  text: {
    color: '#FFF',
    fontSize: 80
  }
});

```

---

### `absoluteFillObject`

Sometimes you may want `absoluteFill` but with a couple tweaks - `absoluteFillObject` can be used to create a customized entry in a `StyleSheet`, e.g.:

```SnackPlayer name=absoluteFillObject
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default App = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Text style={styles.text}>1</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.text}>2</Text>
    </View>
    <View style={styles.box3}>
      <Text style={styles.text}>3</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  box2: {
    ...StyleSheet.absoluteFill,
    top: 120,
    left: 50,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box3: {
    ...StyleSheet.absoluteFillObject,
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  text: {
    color: '#FFF',
    fontSize: 80
  }
});
```

---

### `absoluteFill` vs. `absoluteFillObject`

Currently, there is no difference between using `absoluteFill` vs. `absoluteFillObject`.
