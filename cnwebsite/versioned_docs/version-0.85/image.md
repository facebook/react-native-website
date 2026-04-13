---
id: image
title: Image
---

用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时本地图片、以及本地磁盘上的图片（如相册）。

下面的例子演示了如何分别从本地存储、网络以及以 `'data:'` URI 形式提供的数据中获取并显示图片。

:::note
对于网络图片和 data 图片，你需要手动指定图片的尺寸！
:::

## 示例

```SnackPlayer name=Image%20Example
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImage;
```

你也可以为图片添加 `style`：

```SnackPlayer name=Styled%20Image%20Example
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImageWithStyle;
```

## 在 Android 上支持 GIF 和 WebP

在自行构建原生代码时，Android 默认不支持 GIF 和 WebP。

根据应用需要在 `android/app/build.gradle` 中添加以下可选模块。

```groovy
dependencies {
  // 如果你的应用需要支持 Android 4.0（API level 14）之前的版本
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // 如果你需要支持 GIF 动图
  implementation 'com.facebook.fresco:animated-gif:3.6.0'

  // 如果你需要支持 WebP 格式（含 WebP 动图）
  implementation 'com.facebook.fresco:animated-webp:3.6.0'
  implementation 'com.facebook.fresco:webpsupport:3.6.0'

  // 如果只需要支持 WebP 静态图
  implementation 'com.facebook.fresco:webpsupport:3.6.0'
}
```

:::note
以上列出的版本可能并非最新。请在主仓库的 [`packages/react-native/gradle/libs.versions.toml`](https://github.com/facebook/react-native/blob/main/packages/react-native/gradle/libs.versions.toml) 中查看特定标签版本所使用的 Fresco 版本。
:::

---

# 参考

## Props

### [View Props](view.md#props)

继承 [View Props](view#props)。

---

### `accessible`

当为 true 时，表示图片是一个无障碍元素。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `accessibilityLabel`

用户与图片交互时，读屏器会朗读的文字。

| 类型   |
| ------ |
| string |

---

### `alt`

定义图片的替代文本描述，用户与图片交互时读屏器会朗读这段文字。使用该属性会自动将此元素标记为可访问。

| 类型   |
| ------ |
| string |

---

### `blurRadius`

模糊滤镜的模糊半径。

| 类型   |
| ------ |
| number |

:::tip
在 iOS 上最好将 `blurRadius` 设置为大于 `5`。
:::

---

### `capInsets` <div className="label ios">iOS</div>

当图片被缩放时，`capInsets` 指定的角会保持固定尺寸，而中间内容和边框会被拉伸。这在制作可变尺寸的圆角按钮、阴影以及其他可拉伸资源时非常有用。更多信息参见[苹果官方文档](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets)。

| Type         |
| ------------ |
| [Rect](rect) |

---

### `crossOrigin`

指定获取图片资源时使用的 CORS 模式，行为与 HTML 的 `crossorigin` 属性类似。

- `anonymous`：图片请求中不会携带用户凭证。
- `use-credentials`：在图片请求中将 `Access-Control-Allow-Credentials` 设为 `true`。

| Type                                     | Default       |
| ---------------------------------------- | ------------- |
| enum(`'anonymous'`, `'use-credentials'`) | `'anonymous'` |

---

### `defaultSource`

加载图片源时显示的静态占位图。

| Type                             |
| -------------------------------- |
| [ImageSource](image#imagesource) |

:::note
在 Android 的 debug 构建中会忽略此属性。
:::

---

### `fadeDuration` <div className="label android">Android</div>

渐变动画的持续时间（毫秒）。

| Type   | Default |
| ------ | ------- |
| number | `300`   |

---

### `height`

图片组件的高度。

| 类型   |
| ------ |
| number |

---

### `loadingIndicatorSource`

与 `source` 类似，此属性表示用于渲染加载指示器的资源。加载指示器会在图片准备好显示之前显示，通常是网络下载完成之后。

| Type                                                  |
| ----------------------------------------------------- |
| [ImageSource](image#imagesource) (`uri` only), number |

---

### `onError`

加载出错时调用。

| 类型                                |
| ----------------------------------- |
| (`{nativeEvent: {error} }`) => void |

---

### `onLayout`

组件挂载时及布局变更时调用。

| 类型                                                    |
| ------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)} => void` |

---

### `onLoad`

加载成功完成时调用。

**示例：** `onLoad={({nativeEvent: {source: {width, height}}}) => setImageRealSize({width, height})}`

| 类型                                                                |
| ------------------------------------------------------------------- |
| `md ({nativeEvent: [ImageLoadEvent](image#imageloadevent)} => void` |

---

### `onLoadEnd`

加载结束（无论成功还是失败）时调用。

| 类型       |
| ---------- |
| () => void |

---

### `onLoadStart`

开始加载时调用。

**示例：** `onLoadStart={() => this.setState({loading: true})}`

| 类型       |
| ---------- |
| () => void |

---

### `onPartialLoad` <div className="label ios">iOS</div>

当图片部分加载完成时调用。什么是“部分加载”由具体的加载器定义，此属性主要用于渐进式 JPEG。

| 类型       |
| ---------- |
| () => void |

---

### `onProgress`

下载进度回调。

| 类型                                        |
| ------------------------------------------- |
| (`{nativeEvent: {loaded, total} }`) => void |

---

### `progressiveRenderingEnabled` <div className="label android">Android</div>

当为 `true` 时启用渐进式 JPEG 流式加载 - https://frescolib.org/docs/progressive-jpegs。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `referrerPolicy`

指示获取资源时使用哪种引用者策略。设置图片请求中的 `Referrer-Policy` 头部，行为与 HTML 的 `referrerpolicy` 属性类似。

| Type                                                                                                                                                                                     | Default                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| enum(`'no-referrer'`, `'no-referrer-when-downgrade'`, `'origin'`, `'origin-when-cross-origin'`, `'same-origin'`, `'strict-origin'`, `'strict-origin-when-cross-origin'`, `'unsafe-url'`) | `'strict-origin-when-cross-origin'` |

---

### `ref`

一个 ref setter，在组件挂载时会被赋值为对应的[元素节点](element-nodes)。

---

### `resizeMethod` <div className="label android">Android</div>

当图片尺寸与图片视图尺寸不一致时决定使用的缩放机制。默认为 `auto`。

- `auto`：在 `resize` 和 `scale` 之间使用启发式算法选择。

- `resize`：在解码前先在内存中修改编码后的图片（软件操作）。当图片远大于视图时应使用此选项。

- `scale`：对图片进行缩小或放大。与 `resize` 相比通常更快（通常硬件加速），且画质更高。当图片尺寸小于或略大于视图时应优先使用。

- `none`：不做采样，按原始分辨率显示图片。仅在少数情况下使用，因为当尝试渲染占用过多内存的图片时 Android 会抛出运行时异常。

关于 `resize` 和 `scale` 的更多细节参见 https://frescolib.org/docs/resizing。

| Type                                            | Default  |
| ----------------------------------------------- | -------- |
| enum(`'auto'`, `'resize'`, `'scale'`, `'none'`) | `'auto'` |

---

### `resizeMode`

当组件尺寸与图片原始尺寸不匹配时决定如何调整图片大小。默认值为 `cover`。

- `cover`：在保持图片宽高比的前提下缩放，使图片的宽高都大于等于视图对应尺寸（减去 padding），且至少有一个维度等于视图对应尺寸（减去 padding）。

- `contain`：在保持图片宽高比的前提下缩放，使图片的宽高都小于等于视图对应尺寸（减去 padding）。

- `stretch`：宽高分别缩放，可能改变图片比例。

- `repeat`：重复平铺图片以覆盖整个视图。图片保持自身尺寸和比例，除非大于视图，在这种情况下会按比例缩小以容纳在视图中。

- `center`：在两个维度上将图片居中。如果图片大于视图，会按比例缩小以容纳在视图中。

| Type                                                              | Default   |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `resizeMultiplier` <div className="label android">Android</div>

当 `resizeMethod` 设为 `resize` 时，目标尺寸会先乘以该值，剩余的缩放由 `scale` 完成。默认值 `1.0` 表示按目标尺寸设计位图大小。大于 `1.0` 会将调整尺寸设为大于目标尺寸的值，最终位图会从硬件尺寸缩小。默认值为 `1.0`。

此属性在目标尺寸很小而源图很大时最有用。`resize` 会下采样，源图与目标差距较大时常会导致模糊。通过 multiplier，可让解码后的图片比目标稍大但又比源图小（如果源图足够大）。这允许通过对放大后的图片进行缩放来减少伪影。

如果源图尺寸为 200x200，目标为 24x24，将 `resizeMultiplier` 设为 `2.0` 会让 Fresco 下采样到 48x48。Fresco 会选择最接近的 2 的幂（因此是 50x50）并解码到该尺寸。若不使用 multiplier，最近的 2 的幂为 25x25，得到的图片将由系统缩小。

| 类型   | 默认值 |
| ------ | ------ |
| number | `1.0`  |

---

### `source`

图片源（远程 URL 或本地文件资源）。

该属性还可以包含多个远程 URL，并为它们指定宽高以及比例等 URI 参数。原生端会根据图片容器的测量尺寸选择最佳的 `uri`。可以添加 `cache` 属性控制网络请求与本地缓存的交互（更多信息参见[图片缓存控制](images#cache-control)）。

目前支持的格式有 `png`、`jpg`、`jpeg`、`bmp`、`gif`、`webp`、`psd`（仅 iOS）。此外 iOS 还支持若干 RAW 格式。请查阅 Apple 文档了解当前支持的相机型号（iOS 12 参见 https://support.apple.com/en-ca/HT208967）。

请注意：`webp` 格式在 iOS 上仅在与 JavaScript 代码一起打包时才受支持。

| Type                             |
| -------------------------------- |
| [ImageSource](image#imagesource) |

---

### `src`

表示图片远程 URL 的字符串。优先级高于 `source`。

**示例：** `src={'https://reactnative.dev/img/tiny_logo.png'}`

| 类型   |
| ------ |
| string |

---

### `srcSet`

表示逗号分隔的候选图片源列表的字符串。每个图片源包含一个图片 URL 和一个像素密度描述符。未指定时默认 `1x`。

如果 `srcSet` 中没有 `1x` 描述符，`src` 的值（如果提供）会作为 `1x` 源使用。

该属性的优先级高于 `src` 和 `source`。

**示例：** `srcSet={'https://reactnative.dev/img/tiny_logo.png 1x, https://reactnative.dev/img/header_logo.svg 2x'}`

| 类型   |
| ------ |
| string |

---

### `style`

| Type                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Image Style Props](image-style-props#props), [Layout Props](layout-props#props), [Shadow Props](shadow-props#props), [Transforms](transforms#props) |

---

### `testID`

用于 UI 自动化测试脚本的唯一标识符。

| 类型   |
| ------ |
| string |

---

### `tintColor`

将所有非透明像素的颜色替换为 `tintColor`。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `width`

图片组件的宽度。

| 类型   |
| ------ |
| number |

## 方法

### `abortPrefetch()` <div className="label android">Android</div>

```tsx
static abortPrefetch(requestId: number);
```

中断预加载请求。

**参数：**

| 名称                                                           | 类型   | 说明                         |
| -------------------------------------------------------------- | ------ | ---------------------------- |
| requestId <div className="label basic required">Required</div> | number | `prefetch()` 返回的请求 id。 |

---

### `getSize()`

```tsx
static getSize(uri: string): Promise<{width: number, height: number}>;
```

在显示图片前获取图片的宽高（像素）。若找不到图片或下载失败，该方法会失败。

为了获取图片尺寸，可能需要先加载或下载图片，之后会被缓存。这意味着理论上可以用该方法预加载图片，但它并未为此优化，并且未来的实现可能不会完整加载图片数据。将会提供更合适的预加载 API。

**参数：**

| <div className="wideColumn">名称</div>                   | 类型   | 说明         |
| -------------------------------------------------------- | ------ | ------------ |
| uri <div className="label basic required">Required</div> | string | 图片的位置。 |

---

### `getSizeWithHeaders()`

```tsx
static getSizeWithHeaders(
  uri: string,
  headers: {[index: string]: string}
): Promise<{width: number, height: number}>;
```

在显示图片前获取图片的宽高（像素），并可以为请求提供自定义头。若找不到图片或下载失败，该方法会失败。此方法不适用于静态图片资源。

为了获取图片尺寸，可能需要先加载或下载图片，之后会被缓存。这意味着理论上可以用该方法预加载图片，但它并未为此优化，并且未来的实现可能不会完整加载图片数据。将会提供更合适的预加载 API。

**参数：**

| <div className="wideColumn">名称</div>                       | 类型   | 说明           |
| ------------------------------------------------------------ | ------ | -------------- |
| uri <div className="label basic required">Required</div>     | string | 图片的位置。   |
| headers <div className="label basic required">Required</div> | object | 请求所需的头。 |

---

### `prefetch()`

```tsx
await Image.prefetch(url);
```

预加载远程图片，将其下载到磁盘缓存。返回的 Promise 会解析为布尔值。

**参数：**

| 名称                                                     | 类型                                                  | 说明                                  |
| -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| url <div className="label basic required">Required</div> | string                                                | 图片的远程地址。                      |
| callback                                                 | function <div className="label android">Android</div> | 将会被调用并携带 `requestId` 的函数。 |

---

### `queryCache()`

```tsx
static queryCache(
  urls: string[],
): Promise<Record<string, 'memory' | 'disk' | 'disk/memory'>>;
```

查询缓存。返回的 Promise 解析为 URL 到缓存状态的映射，如 "disk"、"memory" 或 "disk/memory"。如果请求的 URL 不在映射中，表示它不在缓存里。

**参数：**

| 名称                                                      | 类型  | 说明                   |
| --------------------------------------------------------- | ----- | ---------------------- |
| urls <div className="label basic required">Required</div> | array | 要查询缓存的图片 URL。 |

---

### `resolveAssetSource()`

```tsx
static resolveAssetSource(source: ImageSourcePropType): {
  height: number;
  width: number;
  scale: number;
  uri: string;
};
```

将一个资源引用解析为包含 `uri`、`scale`、`width` 和 `height` 属性的对象。

**参数：**

| <div className="wideColumn">名称</div>                      | 类型                                     | 说明                                                             |
| ----------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| source <div className="label basic required">Required</div> | [ImageSource](image#imagesource), number | 由 `require('./foo.png')` 返回的不透明数字，或一个 ImageSource。 |

## 类型定义

### ImageCacheEnum <div className="label ios">iOS</div>

用于设置可能被缓存响应的缓存处理或策略的枚举。

| Type                                                               | Default     |
| ------------------------------------------------------------------ | ----------- |
| enum(`'default'`, `'reload'`, `'force-cache'`, `'only-if-cached'`) | `'default'` |

- `default`：使用原生平台的默认策略。
- `reload`：数据将从源站重新加载，不使用已有缓存。
- `force-cache`：优先使用现有缓存，无论其过期时间；若没有缓存则从源站加载。
- `only-if-cached`：只使用已有缓存，无论过期时间；若没有缓存则不会去源站请求并视为失败。

### ImageLoadEvent

在 `onLoad` 回调中返回的对象。

| 类型   |
| ------ |
| object |

**属性：**

| 名称   | 类型   | 说明                            |
| ------ | ------ | ------------------------------- |
| source | object | [source 对象](#source-object)。 |

#### Source Object

**属性：**

| 名称   | 类型   | 说明               |
| ------ | ------ | ------------------ |
| width  | number | 已加载图片的宽度。 |
| height | number | 已加载图片的高度。 |
| uri    | string | 图片资源标识符。   |

### ImageSource

| Type                             |
| -------------------------------- |
| object, array of objects, number |

**当以对象或对象数组形式传入时的属性：**

| <div className="wideColumn">名称</div>     | 类型                                       | 说明                                                                                                    |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| uri                                        | string                                     | 图片资源标识符，可以是 http 地址、本地文件路径或静态图片资源的名称。                                    |
| width                                      | number                                     | 若在构建时已知，可以指定该值并作为 `<Image/>` 组件的默认宽度。                                          |
| height                                     | number                                     | 若在构建时已知，可以指定该值并作为 `<Image/>` 组件的默认高度。                                          |
| scale                                      | number                                     | 指示图片的缩放因子。默认为 `1.0`，表示一个图片像素等于一个显示点/DIP。                                  |
| bundle<div className="label ios">iOS</div> | string                                     | 图片所在的 iOS 资源 bundle，若不设置则默认为 `[NSBundle mainBundle]`。                                  |
| method                                     | string                                     | 使用的 HTTP 方法，未指定时默认为 `'GET'`。                                                              |
| headers                                    | object                                     | 随远程图片请求发送的 HTTP 头对象。                                                                      |
| body                                       | string                                     | 随请求发送的 HTTP body。必须是有效的 UTF-8 字符串，会原样发送，不会做额外编码（如 URL 转义或 base64）。 |
| cache<div className="label ios">iOS</div>  | [ImageCacheEnum](image#imagecacheenum-ios) | 决定请求如何处理可能的缓存响应。                                                                        |

**当以 number 传入时：**

- `number`：类似 `require('./image.jpg')` 返回的不透明类型。
