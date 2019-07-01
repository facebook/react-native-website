---
id: version-0.5-image
title: Image
original_id: image
---

A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.

Example usage:

```
renderImages: function() {
  return (
    <View>
      <Image
        style={styles.icon}
        source={require('image!myIcon')}
      />
      <Image
        style={styles.logo}
        source={{uri: 'http://facebook.github.io/react/assets/logo_og.png'}}
      />
    </View>
  );
},
```

### Props

- [`accessibilityLabel`](image.md#accessibilitylabel)
- [`accessible`](image.md#accessible)
- [`capInsets`](image.md#capinsets)
- [`defaultSource`](image.md#defaultsource)
- [`onLayout`](image.md#onlayout)
- [`resizeMode`](image.md#resizemode)
- [`source`](image.md#source)
- [`style`](image.md#style)
- [`testID`](image.md#testid)

---

# Reference

## Props

### `accessibilityLabel`

Custom string to display for accessibility.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `accessible`

Whether this element should be revealed as an accessible element.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `capInsets`

When the image is resized, the corners of the size specified by capInsets will stay a fixed size, but the center content and borders of the image will be stretched. This is useful for creating resizable rounded buttons, shadows, and other resizable assets. More info on [Apple documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets)

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `defaultSource`

A static image to display while downloading the final image off the network.

| Type                  | Required |
| --------------------- | -------- |
| object: {uri: string} | No       |

---

### `onLayout`

Invoked on mount and layout changes with

{nativeEvent: { layout: {x, y, width, height}}}.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `resizeMode`

Determines how to resize the image when the frame doesn't match the raw image dimensions.

| Type                                | Required |
| ----------------------------------- | -------- |
| enum('cover', 'contain', 'stretch') | No       |

---

### `source`

`uri` is a string representing the resource identifier for the image, which could be an http address, a local file path, or the name of a static image resource (which should be wrapped in the `require('image!name')` function).

| Type                  | Required |
| --------------------- | -------- |
| object: {uri: string} | No       |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [Layout Props...](layout-props.md#props)

- [Transforms...](transforms.md#props)

- **`backgroundColor`**: string

- **`borderColor`**: string

- **`borderRadius`**: number

- **`borderWidth`**: number

- **`opacity`**: number

- **`resizeMode`**: Object.keys(ImageResizeMode)

- **`tintColor`**: string

---

### `testID`

A unique identifier for this element to be used in UI Automation testing scripts.

| Type   | Required |
| ------ | -------- |
| string | No       |
