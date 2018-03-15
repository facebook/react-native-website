---
id: image
title: Image
---

用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。

下面的例子分别演示了如何显示从本地缓存、网络甚至是以`'data:'`的 base64 uri 形式提供的图片。

> 请注意对于网络和 base64 数据的图片需要手动指定尺寸！

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('/react-native/img/favicon.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Image
          style={{width: 66, height: 58}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
        />
      </View>
    );
  }
}
```

你可以给图片添加`style`属性：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stretch: {
    width: 50,
    height: 200
  }
});

export default class DisplayAnImageWithStyle extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.stretch}
          source={require('/react-native/img/favicon.png')}
        />
      </View>
    );
  }
}
```

### 在 Android 上支持 GIF 和 WebP 格式图片

默认情况下 Android 是不支持 GIF 和 WebP 格式的。你需要在`android/app/build.gradle`文件中根据需要手动添加以下模块：

```
dependencies {
  // 如果你需要支持Android4.0(API level 14)之前的版本
  compile 'com.facebook.fresco:animated-base-support:1.3.0'

  // 如果你需要支持GIF动图
  compile 'com.facebook.fresco:animated-gif:1.3.0'

  // 如果你需要支持WebP格式，包括WebP动图
  compile 'com.facebook.fresco:animated-webp:1.3.0'
  compile 'com.facebook.fresco:webpsupport:1.3.0'

  // 如果只需要支持WebP格式而不需要动图
  compile 'com.facebook.fresco:webpsupport:1.3.0'
}
```

如果你在使用 GIF 的同时还使用了 ProGuard，那么需要在`proguard-rules.pro`中添加如下规则 :

```
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl {
  public AnimatedFactoryImpl(com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory, com.facebook.imagepipeline.core.ExecutorSupplier);
}
```

### 查看 Props

* [`style`](image.md#style)
* [`blurRadius`](image.md#blurradius)
* [`onLayout`](image.md#onlayout)
* [`onLoad`](image.md#onload)
* [`onLoadEnd`](image.md#onloadend)
* [`onLoadStart`](image.md#onloadstart)
* [`resizeMode`](image.md#resizemode)
* [`source`](image.md#source)
* [`loadingIndicatorSource`](image.md#loadingindicatorsource)
* [`onError`](image.md#onerror)
* [`testID`](image.md#testid)
* [`resizeMethod`](image.md#resizemethod)
* [`accessibilityLabel`](image.md#accessibilitylabel)
* [`accessible`](image.md#accessible)
* [`capInsets`](image.md#capinsets)
* [`defaultSource`](image.md#defaultsource)
* [`onPartialLoad`](image.md#onpartialload)
* [`onProgress`](image.md#onprogress)

### 查看方法

* [`getSize`](image.md#getsize)
* [`prefetch`](image.md#prefetch)
* [`abortPrefetch`](image.md#abortprefetch)
* [`queryCache`](image.md#querycache)
* [`resolveAssetSource`](image.md#resolveassetsource)

---

# 文档

## Props

### `style`

`ImageResizeMode` is an `Enum` for different image resizing modes, set via the `resizeMode` style property on `Image` components. The values are `contain`, `cover`, `stretch`, `center`, `repeat`.

| 类型  | 必填 |
| ----- | ---- |
| style | 否   |

* [Layout Props...](layout-props.md#props)

* [Shadow Props...](shadow-props.md#props)

* [Transforms...](transforms.md#props)

* **`borderTopRightRadius`**: number

* **`backfaceVisibility`**: enum('visible', 'hidden')

* **`borderBottomLeftRadius`**: number

* **`borderBottomRightRadius`**: number

* **`borderColor`**: [color](colors.md)

* **`borderRadius`**: number

* **`borderTopLeftRadius`**: number

* **`backgroundColor`**: [color](colors.md)

* **`borderWidth`**: number

* **`opacity`**: number

* **`overflow`**: enum('visible', 'hidden')

* **`resizeMode`**: Object.keys(ImageResizeMode)

* **`tintColor`**: [color](colors.md)

  Changes the color of all the non-transparent pixels to the tintColor.

* **`overlayColor`**: string (_Android_)

  When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. This is useful in cases which are not supported by the Android implementation of rounded corners:

  * Certain resize modes, such as 'contain'
  * Animated GIFs

  A typical way to use this prop is with images displayed on a solid background and setting the `overlayColor` to the same color as the background.

  For details of how this works under the hood, see http://frescolib.org/docs/rounded-corners-and-circles.html

---

### `blurRadius`

blurRadius(模糊半径)：为图片添加一个指定半径的模糊滤镜。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `onLayout`

当元素加载或者布局改变的时候调用，参数为：`{nativeEvent: {layout: {x, y, width, height}}}`.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLoad`

加载成功完成时调用此回调函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLoadEnd`

加载结束后，不论成功还是失败，调用此回调函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLoadStart`

加载开始时调用。

示例：`onLoadStart={(e) => this.setState({loading: true})}`

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `resizeMode`

决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。

* `cover`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有 padding 内衬的话，则相应减去）。**译注**：这样图片完全覆盖甚至超出容器，容器中不留任何空白。

* `contain`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有 padding 内衬的话，则相应减去）。**译注**：这样图片完全被包裹在容器中，容器中可能留有空白。

* `stretch`: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。

* `repeat`: 重复平铺图片直到填满容器。图片会维持原始尺寸。仅 iOS 可用。

* `center`: 居中不拉伸。

| 类型                                                    | 必填 |
| ------------------------------------------------------- | ---- |
| enum('cover', 'contain', 'stretch', 'repeat', 'center') | 否   |

---

### `source`

The image source (either a remote URL or a local file resource).

This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments. The native side will then choose the best `uri` to display based on the measured size of the image container. A `cache` property can be added to control how networked request interacts with the local cache.

The currently supported formats are `png`, `jpg`, `jpeg`, `bmp`, `gif`, `webp` (Android only), `psd` (iOS only).

| 类型                | 必填 |
| ------------------- | ---- |
| ImageSourcePropType | 否   |

---

### `loadingIndicatorSource`

Similarly to `source`, this property represents the resource used to render the loading indicator for the image, displayed until image is ready to be displayed, typically after when it got downloaded from network.

| 类型                                  | 必填 |
| ------------------------------------- | ---- |
| array of ImageSourcePropTypes, number | 否   |

> Can accept a number as returned by `require('./image.jpg')`

---

### `onError`

Invoked on load error with `{nativeEvent: {error}}`.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `testID`

A unique identifier for this element to be used in UI Automation testing scripts.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `resizeMethod`

The mechanism that should be used to resize the image when the image's dimensions differ from the image view's dimensions. Defaults to `auto`.

* `auto`: Use heuristics to pick between `resize` and `scale`.

* `resize`: A software operation which changes the encoded image in memory before it gets decoded. This should be used instead of `scale` when the image is much larger than the view.

* `scale`: The image gets drawn downscaled or upscaled. Compared to `resize`, `scale` is faster (usually hardware accelerated) and produces higher quality images. This should be used if the image is smaller than the view. It should also be used if the image is slightly bigger than the view.

More details about `resize` and `scale` can be found at http://frescolib.org/docs/resizing.html.

| 类型                            | 必填 | 平台    |
| ------------------------------- | ---- | ------- |
| enum('auto', 'resize', 'scale') | 否   | Android |

---

### `accessibilityLabel`

The text that's read by the screen reader when the user interacts with the image.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| node | 否   | iOS  |

---

### `accessible`

When true, indicates the image is an accessibility element.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `capInsets`

当图片被缩放的时候，capInsets 指定的角上的尺寸会被固定而不进行缩放，而中间和边上其他的部分则会被拉伸。这在制作一些可变大小的圆角按钮、阴影、以及其它资源的时候非常有用（译注：这就是常说的九宫格或者.9 图。了解更多信息，可以参见[苹果官方文档](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets)。

| 类型                                                               | 必填 | 平台 |
| ------------------------------------------------------------------ | ---- | ---- |
| object: {top: number, left: number, bottom: number, right: number} | 否   | iOS  |

---

### `defaultSource`

在读取图片时默认显示的加载提示图片。仅限 iOS 使用。（译注：Android 怎么办？可以使用另一张图片绝对定位盖住当前图片，在当前图片加载完成后撤掉）。

| 类型           | 必填 | 平台 |
| -------------- | ---- | ---- |
| object, number | 否   | iOS  |

If passing an object, the general shape is `{uri: string, width: number, height: number, scale: number}`:

* `uri` - a string representing the resource identifier for the image, which should be either a local file path or the name of a static image resource (which should be wrapped in the `require('./path/to/image.png')` function).
* `width`, `height` - can be specified if known at build time, in which case these will be used to set the default `<Image/>` component dimensions.
* `scale` - used to indicate the scale factor of the image. Defaults to 1.0 if unspecified, meaning that one image pixel equates to one display point / DIP.

If passing a number:

* `number` - Opaque type returned by something like `require('./image.jpg')`.

---

### `onPartialLoad`

Invoked when a partial load of the image is complete. The definition of what constitutes a "partial load" is loader specific though this is meant for progressive JPEG loads.

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `onProgress`

Invoked on download progress with `{nativeEvent: {loaded, total}}`.

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

## 方法

### `getSize()`

```javascript
Image.getSize(uri, success, [failure]);
```

Retrieve the width and height (in pixels) of an image prior to displaying it. This method can fail if the image cannot be found, or fails to download.

In order to retrieve the image dimensions, the image may first need to be loaded or downloaded, after which it will be cached. This means that in principle you could use this method to preload images, however it is not optimized for that purpose, and may in future be implemented in a way that does not fully load/download the image data. A proper, supported way to preload images will be provided as a separate API.

Does not work for static image resources.

**参数：**

| 名称    | 类型     | 必填 | 说明                                                                                                 |
| ------- | -------- | ---- | ---------------------------------------------------------------------------------------------------- |
| uri     | string   | 是   | The location of the image.                                                                           |
| success | function | 是   | The function that will be called if the image was successfully found and width and height retrieved. |
| failure | function | 否   | The function that will be called if there was an error, such as failing toto retrieve the image.     |

---

### `prefetch()`

```javascript
Image.prefetch(url);
```

Prefetches a remote image for later use by downloading it to the disk cache

**参数：**

| 名称 | 类型   | 必填 | 说明                              |
| ---- | ------ | ---- | --------------------------------- |
| url  | string | 是   | The remote location of the image. |

---

### `abortPrefetch()`

```javascript
Image.abortPrefetch(requestId);
```

中断预加载操作。仅 Android 可用。

**参数：**

| 名称      | 类型   | 必填 | 说明                         |
| --------- | ------ | ---- | ---------------------------- |
| requestId | number | 是   | Id as returned by prefetch() |

---

### `queryCache()`

```javascript
Image.queryCache(urls);
```

Perform cache interrogation. Returns a mapping from URL to cache status, such as "disk" or "memory". If a requested URL is not in the mapping, it means it's not in the cache.

**参数：**

| 名称 | 类型  | 必填 | 说明                                       |
| ---- | ----- | ---- | ------------------------------------------ |
| urls | array | 是   | List of image URLs to check the cache for. |

---

### `resolveAssetSource()`

```javascript
Image.resolveAssetSource(source);
```

Resolves an asset reference into an object which has the properties `uri`, `width`, and `height`.

**参数：**

| 名称   | 类型           | 必填 | 说明                                                                         |
| ------ | -------------- | ---- | ---------------------------------------------------------------------------- |
| source | number, object | 是   | A number (opaque type returned by require('./foo.png')) or an `ImageSource`. |

> `ImageSource` is an object like `{ uri: '<http location || file path>' }`
