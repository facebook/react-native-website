---
id: transforms
title: Transforms
---

Transforms are style properties that will help you modify the appearance and position of your components using 2D or 3D transformations. However, once you apply transforms, the layouts remain the same around the transformed component hence it might overlap with the nearby components. You can apply margin to the transformed component or the nearby components to prevent such overlaps. The following example increases the margin of the transformed component whenever it overlaps with the nearby components after a transform.

## Example

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

```SnackPlayer name=Transforms
import React from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.box}>
          <Text style={styles.infoText}>Original Object</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginVertical: 56,
              transform: [{ scale: 2 }]
            }
          ]}
        >
          <Text style={styles.infoText}>Scale by 2</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{ scaleX: 2 }]
            }
          ]}
        >
          <Text style={styles.infoText}>ScaleX by 2</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginVertical: 56,
              transform: [{ scaleY: 2 }]
            }
          ]}
        >
          <Text style={styles.infoText}>ScaleY by 2</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginVertical: 24,
              transform: [{ rotate: "45deg" }]
            }
          ]}
        >
          <Text style={styles.infoText}>Rotate by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }]
            }
          ]}
        >
          <Text style={styles.infoText}>Rotate X&Z by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginVertical: 24,
              transform: [{ rotateY: "45deg" }, { rotateZ: "45deg" }]
            }
          ]}
        >
          <Text style={styles.infoText}>Rotate Y&Z by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{ skewX: "45deg" }]
            }
          ]}
        >
          <Text style={styles.infoText}>SkewX by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginVertical: 56,
              transform: [{ skewY: "45deg" }]
            }
          ]}
        >
          <Text style={styles.infoText}>SkewY by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginVertical: 56,
              transform: [{ skewX: "30deg" }, { skewY: "30deg" }]
            }
          ]}
        >
          <Text style={styles.infoText}>Skew X&Y by 30 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{ translateX: -100 }]
            }
          ]}
        >
          <Text style={styles.infoText}>TranslateX by -100 </Text>
        </View>

        <View
          style={[
            styles.box,
            {
              marginBottom: 108,
              transform: [{ translateY: 100 }]
            }
          ]}
        >
          <Text style={styles.infoText}>TranslateY by 100 </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContentContainer: {
    alignItems: "center"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 8,
    color: "white",
    textAlign: "center"
  }
});
```

<block class="classical syntax" />

```SnackPlayer name=Transforms
import React, { Component } from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.box}>
            <Text style={styles.infoText}>Original Object</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginVertical: 56,
                transform: [{ scale: 2 }]
              }
            ]}
          >
            <Text style={styles.infoText}>Scale by 2</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                transform: [{ scaleX: 2 }]
              }
            ]}
          >
            <Text style={styles.infoText}>ScaleX by 2</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginVertical: 56,
                transform: [{ scaleY: 2 }]
              }
            ]}
          >
            <Text style={styles.infoText}>ScaleY by 2</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginVertical: 24,
                transform: [{ rotate: "45deg" }]
              }
            ]}
          >
            <Text style={styles.infoText}>Rotate by 45 deg</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }]
              }
            ]}
          >
            <Text style={styles.infoText}>Rotate X&Z by 45 deg</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginVertical: 24,
                transform: [{ rotateY: "45deg" }, { rotateZ: "45deg" }]
              }
            ]}
          >
            <Text style={styles.infoText}>Rotate Y&Z by 45 deg</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                transform: [{ skewX: "45deg" }]
              }
            ]}
          >
            <Text style={styles.infoText}>SkewX by 45 deg</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginVertical: 56,
                transform: [{ skewY: "45deg" }]
              }
            ]}
          >
            <Text style={styles.infoText}>SkewY by 45 deg</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginVertical: 56,
                transform: [{ skewX: "30deg" }, { skewY: "30deg" }]
              }
            ]}
          >
            <Text style={styles.infoText}>Skew X&Y by 30 deg</Text>
          </View>

          <View
            style={[
              styles.box,
              {
                transform: [{ translateX: -100 }]
              }
            ]}
          >
            <Text style={styles.infoText}>TranslateX by -100 </Text>
          </View>

          <View
            style={[
              styles.box,
              {
                marginBottom: 108,
                transform: [{ translateY: 100 }]
              }
            ]}
          >
            <Text style={styles.infoText}>TranslateY by 100 </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContentContainer: {
    alignItems: "center"
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 8,
    color: "white",
    textAlign: "center"
  }
});
```

<block class="endBlock syntax" />

---

# Reference

## Methods

### `decomposedMatrix`

> **Deprecated.** Use the [`transform`](transforms.md#transform) prop instead.

| Type                     | Required |
| ------------------------ | -------- |
| DecomposedMatrixPropType | No       |

---

### `rotation`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `scaleX`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `scaleY`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `transform`

`transform` accepts an array of transformation objects. Each object specifies the property that will be transformed as the key, and the value to use in the transformation. Objects should not be combined. Use a single key/value pair per object.

The rotate transformations require a string so that the transform may be expressed in degrees (deg) or radians (rad). For example:

`transform([{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }])`

The skew transformations require a string so that the transform may be expressed in degrees (deg). For example:

`transform([{ skewX: '45deg' }])`

| Type                                                                                                                                                                                                                                                                                                                                                    | Required |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| array of object: {perspective: number}, ,object: {rotate: string}, ,object: {rotateX: string}, ,object: {rotateY: string}, ,object: {rotateZ: string}, ,object: {scale: number}, ,object: {scaleX: number}, ,object: {scaleY: number}, ,object: {translateX: number}, ,object: {translateY: number}, ,object: {skewX: string}, ,object: {skewY: string} | No       |

---

### `transformMatrix`

> **Deprecated.** Use the [`transform`](transforms.md#transform) prop instead.

| Type                    | Required |
| ----------------------- | -------- |
| TransformMatrixPropType | No       |

---

### `translateX`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |

---

### `translateY`

| Type                                                                         | Required |
| ---------------------------------------------------------------------------- | -------- |
| deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.') | No       |
