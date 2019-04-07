---
id: version-0.18-image
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
        source={require('./myIcon.png')}
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

- [`testID`](image.md#testid)
- [`onLayout`](image.md#onlayout)
- [`onLoadEnd`](image.md#onloadend)
- [`onLoadStart`](image.md#onloadstart)
- [`resizeMode`](image.md#resizemode)
- [`source`](image.md#source)
- [`style`](image.md#style)
- [`onLoad`](image.md#onload)
- [`accessibilityLabel`](image.md#accessibilitylabel)
- [`accessible`](image.md#accessible)
- [`capInsets`](image.md#capinsets)
- [`defaultSource`](image.md#defaultsource)
- [`onError`](image.md#onerror)
- [`onProgress`](image.md#onprogress)

---

# Reference

## Props

### `testID`

A unique identifier for this element to be used in UI Automation testing scripts.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `onLayout`

Invoked on mount and layout changes with `{nativeEvent: {layout: {x, y, width, height}}}`.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadEnd`

Invoked when load either succeeds or fails

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadStart`

Invoked on load start

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `resizeMode`

Determines how to resize the image when the frame doesn't match the raw image dimensions.

'cover': Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).

'contain': Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).

'stretch': Scale width and height independently, This may change the aspect ratio of the src.

| Type                                | Required |
| ----------------------------------- | -------- |
| enum('cover', 'contain', 'stretch') | No       |

---

### `source`

`uri` is a string representing the resource identifier for the image, which could be an http address, a local file path, or the name of a static image resource (which should be wrapped in the `require('./path/to/image.png')` function).

| Type                           | Required |
| ------------------------------ | -------- |
| object: {uri: string}, ,number | No       |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [Layout Props...](layout-props.md#props)

- [Transforms...](transforms.md#props)

- **`backfaceVisibility`**: enum('visible', 'hidden')

- **`backgroundColor`**: [color](colors.md)

- **`borderColor`**: [color](colors.md)

- **`borderRadius`**: number

- **`borderWidth`**: number

- **`opacity`**: number

- **`overflow`**: enum('visible', 'hidden')

- **`resizeMode`**: Object.keys(ImageResizeMode)

- **`tintColor`**: [color](colors.md)

---

### `onLoad`

Invoked when load completes successfully

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `accessibilityLabel`

The text that's read by the screen reader when the user interacts with the image.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `accessible`

When true, indicates the image is an accessibility element.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `capInsets`

When the image is resized, the corners of the size specified by capInsets will stay a fixed size, but the center content and borders of the image will be stretched. This is useful for creating resizable rounded buttons, shadows, and other resizable assets. More info on [Apple documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets)

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       | iOS      |

---

### `defaultSource`

A static image to display while loading the image source.

| Type                           | Required | Platform |
| ------------------------------ | -------- | -------- |
| object: {uri: string}, ,number | No       | iOS      |

---

### `onError`

Invoked on load error with `{nativeEvent: {error}}`

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `onProgress`

Invoked on download progress with `{nativeEvent: {loaded, total}}`

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |
