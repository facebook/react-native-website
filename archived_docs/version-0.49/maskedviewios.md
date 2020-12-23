---
id: version-0.49-maskedviewios
title: MaskedViewIOS
original_id: maskedviewios
---

Renders the child view with a mask specified in the `maskElement` prop.

```js
import React from 'react';
import { MaskedViewIOS, Text, View } from 'react-native';

class MyMaskedView extends React.Component {
  render() {
    return (
      <MaskedViewIOS
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
      </MaskedViewIOS>
    );
  }
}
```

The above example will render a view with a blue background that fills its parent, and then mask that view with text that says "Basic Mask".

The alpha channel of the view rendered by the `maskElement` prop determines how much of the view's content and background shows through. Fully or partially opaque pixels allow the underlying content to show through but fully transparent pixels block that content.


### 属性
<div class="props">
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="viewproptypes"></a><a href="viewproptypes.html#props">ViewPropTypes props...</a> <a class="hash-link" href="#viewproptypes">#</a></h4>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="maskelement"></a>maskElement: <span class="propType">element</span> <a class="hash-link" href="d#maskelement">#</a></h4>
  </div>
</div>
