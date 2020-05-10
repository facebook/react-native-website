---
id: version-0.39-image
title: Image
original_id: image
---

A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.

This example shows both fetching and displaying an image from local storage as well as on from network.

```SnackPlayer
import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <Image
          style={{width: 50, height: 50}}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://reactjs.org/logo-og.png'}}
        />
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('DisplayAnImage', () => DisplayAnImage);
```

You can also add `style` to an image:

```SnackPlayer
import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stretch: {
    width: 50,
    height: 200
  }
});

class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.stretch}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent(
  'DisplayAnImageWithStyle',
  () => DisplayAnImageWithStyle
);
```

### GIF and WebP support on Android

By default, GIF and WebP are not supported on Android.

You will need to add some optional modules in `android/app/build.gradle`, depending on the needs of your app.

```
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  compile 'com.facebook.fresco:animated-base-support:0.11.0'

  // For animated GIF support
  compile 'com.facebook.fresco:animated-gif:0.11.0'

  // For WebP support, including animated WebP
  compile 'com.facebook.fresco:animated-webp:0.11.0'
  compile 'com.facebook.fresco:webpsupport:0.11.0'

  // For WebP support, without animations
  compile 'com.facebook.fresco:webpsupport:0.11.0'
}
```

Also, if you use GIF with ProGuard, you will need to add this rule in `proguard-rules.pro` :

```
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl {
  public AnimatedFactoryImpl(com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory, com.facebook.imagepipeline.core.ExecutorSupplier);
}
```

### Props

- [`testID`](image.md#testid)
- [`onError`](image.md#onerror)
- [`onLoad`](image.md#onload)
- [`onLoadEnd`](image.md#onloadend)
- [`onLoadStart`](image.md#onloadstart)
- [`resizeMode`](image.md#resizemode)
- [`source`](image.md#source)
- [`style`](image.md#style)
- [`onLayout`](image.md#onlayout)
- [`resizeMethod`](image.md#resizemethod)
- [`accessibilityLabel`](image.md#accessibilitylabel)
- [`accessible`](image.md#accessible)
- [`blurRadius`](image.md#blurradius)
- [`capInsets`](image.md#capinsets)
- [`defaultSource`](image.md#defaultsource)
- [`onPartialLoad`](image.md#onpartialload)
- [`onProgress`](image.md#onprogress)

### Methods

- [`getSize`](image.md#getsize)
- [`prefetch`](image.md#prefetch)

---

# Reference

## Props

### `testID`

A unique identifier for this element to be used in UI Automation testing scripts.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `onError`

Invoked on load error with `{nativeEvent: {error}}`.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoad`

Invoked when load completes successfully.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadEnd`

Invoked when load either succeeds or fails.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLoadStart`

Invoked on load start.

e.g., `onLoadStart={(e) => this.setState({loading: true})}`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `resizeMode`

Determines how to resize the image when the frame doesn't match the raw image dimensions.

- `cover`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding).

- `contain`: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding).

- `stretch`: Scale width and height independently, This may change the aspect ratio of the src.

- `repeat`: Repeat the image to cover the frame of the view. The image will keep its size and aspect ratio. (iOS only)

| Type                                                    | Required |
| ------------------------------------------------------- | -------- |
| enum('cover', 'contain', 'stretch', 'repeat', 'center') | No       |

---

### `source`

The image source (either a remote URL or a local file resource).

This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments. The native side will then choose the best `uri` to display based on the measured size of the image container.

| Type                | Required |
| ------------------- | -------- |
| ImageSourcePropType | No       |

---

### `style`

> `ImageResizeMode` is an `Enum` for different image resizing modes, set via the `resizeMode` style property on `Image` components. The values are `contain`, `cover`, `stretch`, `center`, `repeat`.

| Type  | Required |
| ----- | -------- |
| style | No       |

- [Layout Props...](layout-props.md#props)

- [Shadow Props...](shadow-props.md#props)

- [Transforms...](transforms.md#props)

- **`borderTopRightRadius`**: number

- **`backfaceVisibility`**: enum('visible', 'hidden')

- **`borderBottomLeftRadius`**: number

- **`borderBottomRightRadius`**: number

- **`borderColor`**: [color](colors.md)

- **`borderRadius`**: number

- **`borderTopLeftRadius`**: number

- **`backgroundColor`**: [color](colors.md)

- **`borderWidth`**: number

- **`opacity`**: number

- **`overflow`**: enum('visible', 'hidden')

- **`resizeMode`**: Object.keys(ImageResizeMode)

- **`tintColor`**: [color](colors.md)

  Changes the color of all the non-transparent pixels to the tintColor.

- **`overlayColor`**: string (_Android_)

  When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. This is useful in cases which are not supported by the Android implementation of rounded corners:

  - Certain resize modes, such as 'contain'
  - Animated GIFs

  A typical way to use this prop is with images displayed on a solid background and setting the `overlayColor` to the same color as the background.

  For details of how this works under the hood, see http://frescolib.org/rounded-corners-and-circles.md

---

### `onLayout`

Invoked on mount and layout changes with `{nativeEvent: {layout: {x, y, width, height}}}`.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `resizeMethod`

The mechanism that should be used to resize the image when the image's dimensions differ from the image view's dimensions. Defaults to `auto`.

- `auto`: Use heuristics to pick between `resize` and `scale`.

- `resize`: A software operation which changes the encoded image in memory before it gets decoded. This should be used instead of `scale` when the image is much larger than the view.

- `scale`: The image gets drawn downscaled or upscaled. Compared to `resize`, `scale` is faster (usually hardware accelerated) and produces higher quality images. This should be used if the image is smaller than the view. It should also be used if the image is slightly bigger than the view.

More details about `resize` and `scale` can be found at http://frescolib.org/resizing-rotating.md.

| Type                            | Required | Platform |
| ------------------------------- | -------- | -------- |
| enum('auto', 'resize', 'scale') | No       | Android  |

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

### `blurRadius`

blurRadius: the blur radius of the blur filter added to the image

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `capInsets`

When the image is resized, the corners of the size specified by `capInsets` will stay a fixed size, but the center content and borders of the image will be stretched. This is useful for creating resizable rounded buttons, shadows, and other resizable assets. More info in the [official Apple documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets).

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       | iOS      |

---

### `defaultSource`

A static image to display while loading the image source.

- `uri` - a string representing the resource identifier for the image, which should be either a local file path or the name of a static image resource (which should be wrapped in the `require('./path/to/image.png')` function).
- `width`, `height` - can be specified if known at build time, in which case these will be used to set the default `<Image/>` component dimensions.
- `scale` - used to indicate the scale factor of the image. Defaults to 1.0 if unspecified, meaning that one image pixel equates to one display point / DIP.
- `number` - Opaque type returned by something like `require('./image.jpg')`.

| Type                                                                      | Required | Platform |
| ------------------------------------------------------------------------- | -------- | -------- |
| object: {uri: string,width: number,height: number,scale: number}, ,number | No       | iOS      |

---

### `onPartialLoad`

Invoked when a partial load of the image is complete. The definition of what constitutes a "partial load" is loader specific though this is meant for progressive JPEG loads.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `onProgress`

Invoked on download progress with `{nativeEvent: {loaded, total}}`.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

## Methods

### `getSize()`

```jsx
static getSize(uri: string, success: function, failure: function):
```

Retrieve the width and height (in pixels) of an image prior to displaying it. This method can fail if the image cannot be found, or fails to download.

In order to retrieve the image dimensions, the image may first need to be loaded or downloaded, after which it will be cached. This means that in principle you could use this method to preload images, however it is not optimized for that purpose, and may in future be implemented in a way that does not fully load/download the image data. A proper, supported way to preload images will be provided as a separate API.

**Parameters:**

| Name    | Type     | Required | Description                                                                                        |
| ------- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
| uri     | string   | Yes      | The location of the image.                                                                         |
| success | function | Yes      | The function that will be called if the image was sucessfully found and widthand height retrieved. |
| failure | function | Yes      | The function that will be called if there was an error, such as failing toto retrieve the image.   |

---

### `prefetch()`

```jsx
static prefetch(url: string):
```

Prefetches a remote image for later use by downloading it to the disk cache

**Parameters:**

| Name | Type   | Required | Description                       |
| ---- | ------ | -------- | --------------------------------- |
| url  | string | Yes      | The remote location of the image. |
