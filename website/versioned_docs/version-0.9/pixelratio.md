---
id: version-0.9-pixelratio
title: PixelRatio
original_id: pixelratio
---

PixelRatio class gives access to the device pixel density.

There are a few use cases for using PixelRatio:

### Displaying a line that's as thin as the device permits

A width of 1 is actually pretty thick on devices with high pixel density (such as iPhone 4+ and many Android devices), we can make one that's thinner using a width of `1 / PixelRatio.get()`. It's a technique that works on all the devices independent of their pixel density.

```
style={{ borderWidth: 1 / PixelRatio.get() }}
```

### Fetching a correctly sized image

You should get a higher resolution image if you are on a high pixel density device. A good rule of thumb is to multiply the size of the image you display by the pixel ratio.

```
var image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />
```

### Methods

- [`get`](pixelratio.md#get)
- [`getFontScale`](pixelratio.md#getfontscale)
- [`getPixelSizeForLayoutSize`](pixelratio.md#getpixelsizeforlayoutsize)
- [`startDetecting`](pixelratio.md#startdetecting)

---

# Reference

## Methods

### `get()`

```jsx
static get()
```

Returns the device pixel density. Some examples:

- PixelRatio.get() === 1
  - [mdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 1.5
  - [hdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 2
  - iPhone 4, 4S
  - iPhone 5, 5c, 5s
  - iPhone 6, 7, 8
  - [xhdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 3
  - iPhone 6 Plus, 7 Plus, 8 Plus
  - iPhone X
  - Pixel, Pixel 2
  - [xxhdpi Android devices](https://material.io/tools/devices/)
- PixelRatio.get() === 3.5
  - Nexus 6
  - Pixel XL, Pixel 2 XL
  - [xxxhdpi Android devices](https://material.io/tools/devices/)

---

### `getFontScale()`

```jsx
static getFontScale()
```

Returns the scaling factor for font sizes. This is the ratio that is used to calculate the absolute font size, so any elements that heavily depend on that should use this to do calculations.

If a font scale is not set, this returns the device pixel ratio.

Currently this is only implemented on Android and reflects the user preference set in Settings > Display > Font size, on iOS it will always return the default pixel ratio. @platform android

---

### `getPixelSizeForLayoutSize()`

```jsx
static getPixelSizeForLayoutSize(layoutSize)
```

Converts a layout size (dp) to pixel size (px).

Guaranteed to return an integer number.

---

### `startDetecting()`

```jsx
static startDetecting()
```

// No-op for iOS, but used on the web. Should not be documented.
