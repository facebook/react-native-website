---
id: version-0.55-touchableopacity
title: TouchableOpacity
original_id: touchableopacity
---

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

Opacity is controlled by wrapping the children in an Animated.View, which is added to the view hierarchy. Be aware that this can affect layout.

Example:

```
renderButton: function() {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('./myButton.png')}
      />
    </TouchableOpacity>
  );
},
```

### Example

```ReactNativeWebPlayer
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

 render() {
   return (
     <View style={styles.container}>
       <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Touch Here </Text>
       </TouchableOpacity>
       <View style={[styles.countContainer]}>
         <Text style={[styles.countText]}>
            { this.state.count !== 0 ? this.state.count: null}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})

AppRegistry.registerComponent('App', () => App)
```

### Props

- [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

* [`activeOpacity`](touchableopacity.md#activeopacity)
* [`tvParallaxProperties`](touchableopacity.md#tvparallaxproperties)
* [`hasTVPreferredFocus`](touchableopacity.md#hastvpreferredfocus)

### Methods

- [`setOpacityTo`](touchableopacity.md#setopacityto)

---

# Reference

## Props

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.2.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `tvParallaxProperties`

_(Apple TV only)_ Object with properties to control Apple TV parallax effects.

enabled: If true, parallax effects are enabled. Defaults to true. shiftDistanceX: Defaults to 2.0. shiftDistanceY: Defaults to 2.0. tiltAngle: Defaults to 0.05. magnification: Defaults to 1.0. pressMagnification: Defaults to 1.0. pressDuration: Defaults to 0.3. pressDelay: Defaults to 0.0.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| object | No       | iOS      |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

## Methods

### `setOpacityTo()`

```javascript
setOpacityTo((value: number), (duration: number));
```

Animate the touchable to a new opacity.
