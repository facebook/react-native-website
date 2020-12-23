---
id: version-0.46-pixelratio
title: PixelRatio
original_id: pixelratio
---

PixelRatio类提供了访问设备的像素密度的方法。

使用PixelRatio有如下几种常用情形：

### 根据像素密度获取指定大小的图片

如果应用运行在一个高像素密度的设备上，显示的图片也应当分辨率更高。一个取得缩略图的好规则就是将显示尺寸乘以像素密度比：

```jsx
var image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />
```
__译注__: 这段代码的意思是，如果你要在屏幕上摆放一个宽200高100的图片，那么首先要准备多个分辨率尺寸的图。`PixelRatio.getPixelSizeForLayoutSize(200)`方法会根据当前设备的pixelratio返回对应值，比如当前设备的pixelratio为2，则返回 200 * 2 = 400，最后生成的参数为{ width: 400, height: 200 }，然后开发者自己实现getImage方法，根据这一参数，返回最符合此尺寸的图片地址。

### 方法

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="get"></a><span class="propType">static </span>get<span class="propType">()</span> <a class="hash-link" href="#get">#</a></h4>
        <div>
            <p>返回设备的像素密度，例如：</p>
            <ul>
                <li>PixelRatio.get() === 1<ul><li>mdpi Android 设备 (160 dpi)</li></ul></li>
                <li>PixelRatio.get() === 1.5<ul><li>hdpi Android 设备 (240 dpi)</li></ul></li>
                <li>PixelRatio.get() === 2<ul><li>iPhone 4, 4S</li><li>iPhone 5, 5c, 5s</li><li>iPhone 6</li><li>xhdpi Android 设备 (320 dpi)</li></ul></li>
                <li>PixelRatio.get() === 3<ul><li>iPhone 6 plus</li><li>xxhdpi Android 设备 (480 dpi)</li></ul></li>
                <li>PixelRatio.get() === 3.5<ul><li>Nexus 6</li></ul></li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="getfontscale"></a><span class="propType">static </span>getFontScale<span class="propType">()</span> <a class="hash-link" href="#getfontscale">#</a></h4>
        <div>
            <p>返回字体大小缩放比例。这个比例可以用于计算绝对的字体大小，所以很多深度依赖字体大小的组件需要用此函数的结果进行计算。</p>
            <p>如果没有设置字体大小，它会直接返回设备的像素密度。</p>
            <p>目前这个函数仅仅在Android设备上实现了，它会体现用户选项里的“设置 &gt; 显示 &gt; 字体大小”。在iOS设备上它会直接返回默认的像素密度。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="getpixelsizeforlayoutsize"></a><span class="propType">static </span>getPixelSizeForLayoutSize<span class="propType">(layoutSize: number)</span> <a class="hash-link" href="#getpixelsizeforlayoutsize">#</a></h4>
        <div>
            <p>将一个布局尺寸(dp)转换为像素尺寸(px)。</p>
            <p>一定会返回一个整数数值。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="startdetecting"></a><span class="propType">static </span>startDetecting<span class="propType">()</span> <a class="hash-link" href="#startdetecting">#</a></h4>
        <div>
            <p>// 本函数在移动设备上没有作用。</p>
        </div>
    </div>
</div>

### 描述

## 像素网格对齐

在iOS设备上，你可以给元素指定任意精度的坐标和尺寸，例如29.674825。不过最终的物理屏幕上只会显示固定的坐标数。譬如iPhone4的分辨率是640x960，而iPhone6是750*1334。iOS会试图尽可能忠实地显示你指定的坐标，所以它采用了一种把一个像素分散到多个像素里的做法来欺骗眼睛。但这个作用的负面影响是显示出来的元素看起来会有一些模糊。

在实践中，我们发现开发者们并不想要这个特性，反而需要去做一些额外的工作来确保坐标与像素坐标对齐，来避免元素显得模糊。在React Native中，我们会自动对齐坐标到像素坐标。

我们做这个对齐的时候必须十分小心。如果你同时使用已经对齐的值和没有对齐的值，就会很容易产生一些因为近似导致的累积错误。即使这样的累积错误只发生一次，后果也可能会很严重，因为很可能会导致一个像素宽的边框最终突然消失或者显示为两倍的宽度。

在React Native中，所有JS中的东西，包括布局引擎，都使用任意精度的数值。我们只在主线程最后设置原生组件的位置和坐标的时候才去做对齐工作。而且，对齐是相对于屏幕进行的，而非相对于父元素进行，进一步避免近似误差的累积。
