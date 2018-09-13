---
id: images
title: 图片
---

## 静态图片资源

React Native 提供了一个统一的方式来管理 iOS 和 Android 应用中的图片。要往 App 中添加一个静态图片，只需把图片文件放在代码文件夹中某处，然后像下面这样去引用它：

```javascript
<Image source={require("./my-icon.png")} />
```

> 注意，一些老文章和教程提到的`require('image!xxx')`的写法已经从 0.40 版本开始不再支持！

图片文件的查找会和 JS 模块的查找方式一样。在上面的这个例子里，是哪个组件引用了这个图片，Packager 就会去这个组件所在的文件夹下查找`my-icon.png`。并且，如果你有`my-icon.ios.png`和`my-icon.android.png`，Packager 就会根据平台而选择不同的文件。

你还可以使用`@2x`，`@3x`这样的文件名后缀，来为不同的屏幕精度提供图片。比如下面这样的代码结构：

```
.
├── button.js
└── img
    ├── check@2x.png
    └── check@3x.png
```

并且`button.js`里有这样的代码：

```javascript
<Image source={require("./img/check.png")} />
```

Packager 会打包所有的图片并且依据屏幕精度提供对应的资源。譬如说，iPhone 7 会使用`check@2x.png`，而 iPhone 7 plus 或是 Nexus 5 上则会使用`check@3x.png`。如果没有图片恰好满足屏幕分辨率，则会自动选中最接近的一个图片。

_注意_：如果你添加图片的时候 packager 正在运行，可能需要重启 packager 以便能正确引入新添加的图片。

这样会带来如下的一些好处:

1.  iOS 和 Android 一致的文件系统。
2.  图片和 JS 代码处在相同的文件夹，这样组件就可以包含自己所用的图片而不用单独去设置。
3.  不需要全局命名。你不用再担心图片名字的冲突问题了。
4.  只有实际被用到（即被 require）的图片才会被打包到你的 app。
5.  现在在开发期间，增加和修改图片不需要重新编译了，只要和修改 js 代码一样刷新你的模拟器就可以了。
6.  与访问网络图片相比，Packager 可以得知图片大小了，不需要在代码里再声明一遍尺寸。
7.  现在通过 npm 来分发组件或库可以包含图片了。

注意：为了使新的图片资源机制正常工作，require 中的图片名字必须是一个静态字符串（不能使用变量！因为 require 是在编译时期执行，而非运行时期执行！）。

```javascript
// 正确
<Image source={require("./my-icon.png")} />;

// 错误
var icon = this.props.active ? "my-icon-active" : "my-icon-inactive";
<Image source={require("./" + icon + ".png")} />;

// 正确
var icon = this.props.active
  ? require("./my-icon-active.png")
  : require("./my-icon-inactive.png");
<Image source={icon} />;
```

请注意：通过这种方式引用的图片资源包含图片的尺寸（宽度，高度）信息，如果你需要动态缩放图片（例如，通过 flex），你可能必须手动在 style 属性设置`{ width: null, height: null }`。

## 静态的非图片资源

上面描述的`require`语法也可以用来静态地加载你项目中的声音、视频或者文档文件。大多数常见文件类型都支持，包括`.mp3`, `.wav`, `.mp4`, `.mov`, `.htm` 和 `.pdf`等（完整列表请看 [packager defaults](https://github.com/facebook/react-native/blob/master/local-cli/util/Config.js#L68))。

你也可以创建自己的配置文件来支持其他类型的文件。具体的配置可以参考[packager config file](https://github.com/facebook/metro/blob/master/packages/metro/src/defaults.js#L14-L44)。

需要注意的是视频必须指定尺寸而不能使用`flex`样式，因为我们目前还不能从非图片资源中获取到尺寸信息。对于直接链接到 Xcode 或者 Android 资源文件夹的视频，则不会有这个限制。

## 使用混合 App 的图片资源

如果你在编写一个混合 App（一部分 UI 使用 React Native，而另一部分使用平台原生代码），也可以使用已经打包到 App 中的图片资源（以拖拽的方式放置在 Xcode 的 asset 类目中，或是放置在 Android 的 drawable 目录里）。注意此时只使用文件名，不带路径也不带后缀：

```javascript
<Image source={{ uri: "app_icon" }} style={{ width: 40, height: 40 }} />
```

对于放置在 Android 的 assets 目录中的图片，还可以使用`asset:/` 前缀来引用：

```javascript
<Image
  source={{ uri: "asset:/app_icon.png" }}
  style={{ width: 40, height: 40 }}
/>
```

注意：这些做法并没有任何安全检查。你需要自己确保图片在应用中确实存在，而且还需要指定尺寸。

## 网络图片

很多要在 App 中显示的图片并不能在编译的时候获得，又或者有时候需要动态载入来减少打包后的二进制文件的大小。这些时候，与静态资源不同的是，`你需要手动指定图片的尺寸`。同时我们强烈建议你使用 https 以满足 iOS [App Transport Security](https://segmentfault.com/a/1190000002933776) 的要求。

```javascript
// 正确
<Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
       style={{width: 400, height: 400}} />

// 错误
<Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} />
```

### 网络图片的请求参数

你可以在 Image 组件的 source 属性中指定一些请求参数，如下面的示例：

```javascript
<Image
  source={{
    uri: "https://facebook.github.io/react/logo-og.png",
    method: "POST",
    headers: {
      Pragma: "no-cache"
    },
    body: "Your Body goes here"
  }}
  style={{ width: 400, height: 400 }}
/>
```

## Uri 数据图片

有时候你可能拿到的是图片的 base64 数据，此时可以使用`'data:'`格式来显示图片。请注意，`你需要手动指定图片的尺寸`。

> 建议仅对非常小的图片使用 base64 数据，比如一些小图标。

```javascript
// 请记得指定宽高！
<Image
  style={{
    width: 51,
    height: 51,
    resizeMode: "contain"
  }}
  source={{
    uri:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
  }}
/>
```

### 缓存控制（仅 iOS）

在某些情况下你可能仅仅想展示一张已经在本地缓存的图片，例如一个低分辨率的占位符，直到高分辨率的图片可用。又或者你无所谓图片是否过时，而且也不在乎显示过时的图片，节省带宽相对更重要。缓存资源属性提供给了你控制网络层与缓存交互的方式。

- `default`: 使用原生平台默认策略。
- `reload`: URL 的数据将从原始地址加载。不使用现有的缓存数据。
- `force-cache`: 现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则从原始地址加载。
- `only-if-cached`: 现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则不尝试从原始地址加载，并且认为请求是失败的。

```javascript
<Image
  source={{
    uri: "https://facebook.github.io/react/logo-og.png",
    cache: "only-if-cached"
  }}
  style={{ width: 400, height: 400 }}
/>
```

## 本地文件系统中的图片

参考[相册（CameraRoll)](cameraroll.md)这个例子来看如何使用在`Images.xcassets`以外的本地资源。

### 最合适的相册图片

iOS 会为同一张图片在相册中保存多个不同尺寸的副本。为了性能考虑，从这些副本中挑出最合适的尺寸显得尤为重要。对于一处 200x200 大小的缩略图，显然不应该选择最高质量的 3264x2448 大小的图片。如果恰好有匹配的尺寸，那么 React Native 会自动为你选好。如果没有，则会选择最接近的尺寸进行缩放，但也至少缩放到比所需尺寸大出 50%，以使图片看起来仍然足够清晰。这一切过程都是自动完成的，所以你不用操心自己去完成这些繁琐且易错的代码。

## 为什么不在所有情况下都自动指定尺寸呢?

`在浏览器中`，如果你不给图片指定尺寸，那么浏览器会首先渲染一个 0x0 大小的元素占位，然后下载图片，在下载完成后再基于正确的尺寸来渲染图片。这样做的最大问题是 UI 会在图片加载的过程中上下跳动，使得用户体验非常糟糕。

`在React Native`中我们有意避免了这一行为。如此一来开发者就需要做更多工作来提前知晓远程图片的尺寸（或宽高比），但我们相信这样可以带来更好的用户体验。然而，读取本地静态图片（使用`require('./my-icon.png')`语法）则`无需指定尺寸`，因为它们的尺寸在加载时就可以立刻知道。

比如这样一个引用`require('./my-icon.png')`的实际输出结果可能是：

```javascript
{"__packager_asset":true,"uri":"my-icon.png","width":591,"height":573}
```

## 资源属性是一个对象（object）

在 React Native 中，另一个值得一提的变动是我们把`src`属性改为了`source`属性，而且并不接受字符串，正确的值是一个带有`uri`属性的对象。

```javascript
<Image source={{ uri: "something.jpg" }} />
```

深层次的考虑是，这样可以使我们在对象中添加一些元数据(metadata)。假设你在使用`require('./my-icon.png')`，那么我们就会在其中添加真实文件路径以及尺寸等信息（这只是举个例子，未来的版本中 require 的具体行为可能会变化）。此外这也是考虑了未来的扩展性，比如我们可能会加入精灵图（sprites）的支持：在输出`{uri: ...}`的基础上，我们可以进一步输出裁切信息`{uri: ..., crop: {left: 10, top: 50, width: 20, height: 40}}`，这样理论上就可以在现有的代码中无缝支持精灵图的切分。

对于开发者来说，则可以在其中标注一些有用的属性，例如图片的尺寸，这样可以使图片自己去计算将要显示的尺寸（而不必在样式中写死）。请在这一数据结构中自由发挥，存储你可能需要的任何图片相关的信息。

## 背景图片与嵌套写法

开发者们常面对的一种需求就是类似 web 中的背景图（`background-image`）。要实现这一用例，只需使用`<ImageBackground>`组件（其 props 与`<Image>`完全相同），然后把需要背景图的子组件嵌入其中即可。

也可能你并不需要使用`<ImageBackground>`，因为它的实现其实非常简单，实质就是对图片使用了绝对定位。你可以阅读其[源码](https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageBackground.js)然后思考你是否有更好更简单的布局方案。

```javascript
return (
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
);
```

注意你必须指定宽高样式。

## iOS 边框圆角的注意事项

请注意下列边框圆角样式目前在 iOS 的图片组件上还不支持：

- `borderTopLeftRadius`
- `borderTopRightRadius`
- `borderBottomLeftRadius`
- `borderBottomRightRadius`

## 在主线程外解码图片

图片解码有可能会需要超过一帧的时间。在 web 上这是页面掉帧的一大因素，因为解码是在主线程中完成的。然而在 React Native 中，图片解码则是在另一线程中完成的。在实际开发中，一般对图片还没下载完成时的场景都做了处理（添加 loading 等），而图片解码时显示的占位符只占用几帧时间，并不需要你改动代码去额外处理。
