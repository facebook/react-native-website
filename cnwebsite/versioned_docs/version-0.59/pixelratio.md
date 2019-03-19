---
id: version-0.59-pixelratio
title: PixelRatio
original_id: pixelratio
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

PixelRatio 类提供了访问设备的像素密度的方法。

## 根据像素密度获取指定大小的图片

如果应用运行在一个高像素密度的设备上，显示的图片也应当分辨率更高。一个取得缩略图的好规则就是将显示尺寸乘以像素密度比：

```
var image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />
```

> 译注: 这段代码的意思是，如果你要在屏幕上摆放一个宽 200 高 100 的图片，那么首先要准备多个分辨率尺寸的图。`PixelRatio.getPixelSizeForLayoutSize(200)`方法会根据当前设备的 pixelratio 返回对应值，比如当前设备的 pixelratio 为 2，则返回 200 \* 2 = 400，最后生成的参数为{ width: 400, height: 200 }，然后开发者自己实现 getImage 方法，根据这一参数，返回最符合此尺寸的图片地址。

## 像素网格对齐

在 iOS 设备上，你可以给元素指定任意精度的坐标和尺寸，例如 29.674825。不过最终的物理屏幕上只会显示固定的坐标数。譬如 iPhone4 的分辨率是 640x960，而 iPhone6 是 750\*1334。iOS 会试图尽可能忠实地显示你指定的坐标，所以它采用了一种把一个像素分散到多个像素里的做法来欺骗眼睛。但这个作用的负面影响是显示出来的元素看起来会有一些模糊。

在实践中，我们发现开发者们并不想要这个特性，反而需要去做一些额外的工作来确保坐标与像素坐标对齐，来避免元素显得模糊。在 React Native 中，我们会自动对齐坐标到像素坐标。

我们做这个对齐的时候必须十分小心。如果你同时使用已经对齐的值和没有对齐的值，就会很容易产生一些因为近似导致的累积错误。即使这样的累积错误只发生一次，后果也可能会很严重，因为很可能会导致一个像素宽的边框最终突然消失或者显示为两倍的宽度。

在 React Native 中，所有 JS 中的东西，包括布局引擎，都使用任意精度的数值。我们只在主线程最后设置原生组件的位置和坐标的时候才去做对齐工作。而且，对齐是相对于屏幕进行的，而非相对于父元素进行，进一步避免近似误差的累积。

### 查看方法

- [`get`](pixelratio.md#get)
- [`getFontScale`](pixelratio.md#getfontscale)
- [`getPixelSizeForLayoutSize`](pixelratio.md#getpixelsizeforlayoutsize)
- [`roundToNearestPixel`](pixelratio.md#roundtonearestpixel)

---

# 文档

## 方法

### `get()`

```javascript
static get()
```

返回设备的像素密度，例如：

- PixelRatio.get() === 1
  - [mdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 1.5
  - [hdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 2
  - iPhone 4, 4S
  - iPhone 5, 5C, 5S
  - iPhone 6, 7, 8
  - [xhdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 3
  - iPhone 6 Plus, 7 Plus, 8 Plus
  - iPhone X, XS, XS Max
  - Pixel, Pixel 2
  - [xxhdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 3.5
  - Nexus 6
  - Pixel XL, Pixel 2 XL
  - [xxxhdpi Android devices](https://material.io/tools/devices/)

---

### `getFontScale()`

```javascript
static getFontScale()
```

返回字体大小缩放比例。这个比例可以用于计算绝对的字体大小，所以很多深度依赖字体大小的组件需要用此函数的结果进行计算。

如果没有设置字体缩放大小，它会直接返回设备的像素密度。

目前这个函数仅仅在 Android 设备上实现了，它会体现用户选项里的“设置 > 显示 > 字体大小”。在 iOS 设备上它会直接返回默认的像素密度。

---

### `getPixelSizeForLayoutSize()`

```javascript
static getPixelSizeForLayoutSize(layoutSize)
```

将一个布局尺寸(dp)转换为像素尺寸(px)。

一定会返回一个整数数值。

---

### `roundToNearestPixel()`

```javascript
static roundToNearestPixel(layoutSize)
```

Rounds a layout size (dp) to the nearest layout size that corresponds to an integer number of pixels. For example, on a device with a PixelRatio of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to exactly (8.33 \* 3) = 25 pixels.
