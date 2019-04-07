---
id: version-0.49-maskedviewios
title: MaskedViewIOS
original_id: maskedviewios
---

Renders the child view with a mask specified in the `maskElement` prop.

```
import React from 'react';
import { MaskedView, Text, View } from 'react-native';

class MyMaskedView extends React.Component {
  render() {
    return (
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View style={styles.maskContainerStyle}>
            <Text style={styles.maskTextStyle}>
              Basic Mask
            </Text>
          </View>
        }
      >
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </MaskedView>
    );
  }
}
```

The above example will render a view with a blue background that fills its parent, and then mask that view with text that says "Basic Mask".

The alpha channel of the view rendered by the `maskElement` prop determines how much of the view's content and background shows through. Fully or partially opaque pixels allow the underlying content to show through but fully transparent pixels block that content.

### Props

- [View props...](view.md#props)

* [`maskElement`](maskedviewios.md#maskelement)

---

# Reference

## Props

### `maskElement`

| Type    | Required |
| ------- | -------- |
| element | Yes      |
