---
id: version-0.41-images
title: 图片
original_id: images
---

## 静态图片资源

从0.14版本开始，React Native提供了一个统一的方式来管理iOS和Android应用中的图片。要往App中添加一个静态图片，只需把图片文件放在代码文件夹中某处，然后像下面这样去引用它：

```javascript
<Image source={require('./my-icon.png')} />
```

图片文件的查找会和JS模块的查找方式一样。在上面的这个例子里，是哪个组件引用了这个图片，Packager就会去这个组件所在的文件夹下查找`my-icon.png`。并且，如果你有`my-icon.ios.png`和`my-icon.android.png`，Packager就会根据平台而选择不同的文件。

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
<Image source={require('./img/check.png')} />
```

Packager会打包所有的图片并且依据屏幕精度提供对应的资源。譬如说，iPhone 5s会使用`check@2x.png`，而Nexus 5上则会使用`check@3x.png`。如果没有图片恰好满足屏幕分辨率，则会自动选中最接近的一个图片。

_注意_：如果你添加图片的时候packager正在运行，可能需要重启packager以便能正确引入新添加的图片。

这样会带来如下的一些好处:

1. iOS和Android一致的文件系统。
2. 图片和JS代码处在相同的文件夹，这样组件就可以包含自己所用的图片而不用单独去设置。
3. 不需要全局命名。你不用再担心图片名字的冲突问题了。
4. 只有实际被用到（即被require）的图片才会被打包到你的app。
5. 现在在开发期间，增加和修改图片不需要重新编译了，只要和修改js代码一样刷新你的模拟器就可以了。
6. 与访问网络图片相比，Packager可以得知图片大小了，不需要在代码里再声明一遍尺寸。
7. 现在通过npm来分发组件或库可以包含图片了。

注意：为了使新的图片资源机制正常工作，require中的图片名字必须是一个静态字符串。  

```javascript
// 正确
<Image source={require('./my-icon.png')} />

// 错误
var icon = this.props.active ? 'my-icon-active' : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />

// 正确
var icon = this.props.active ? require('./my-icon-active.png') : require('./my-icon-inactive.png');
<Image source={icon} />
```

**本特性从0.14开始生效**。请注意：新的资源系统依靠修改打包脚本来实现，`react-native init`创建的新工程已经包含了这些修改：[Xcode](https://github.com/facebook/react-native/pull/3523)和[Gradle](https://github.com/facebook/react-native/commit/9dc036d2b99e6233297c55a3490bfc308e34e75f)。如果你的工程是在0.13或者更早版本创建的，你可能需要自行添加对应的代码来支持新的图片资源系统。请参考文档[升级版本](/docs/upgrading.html)文档中的升级操作说明。

## 使用混合App的图片资源

如果你在编写一个混合App（一部分UI使用React Native，而另一部分使用平台原生代码），也可以使用已经打包到App中的图片资源（通过Xcode的asset类目或者Android的drawable文件夹打包）：

```javascript
<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />
```

注意：这一做法并没有任何安全检查。你需要自己确保图片在应用中确实存在，而且还需要指定尺寸。


## 网络图片

很多要在App中显示的图片并不能在编译的时候获得，又或者有时候需要动态载入来减少打包后的二进制文件的大小。这些时候，与静态资源不同的是，`你需要手动指定图片的尺寸`。

```javascript
// 正确
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 400, height: 400}} />

// 错误
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
```

## 本地文件系统中的图片

参考[相册（CameraRoll）](cameraroll.html)这个例子来看如何使用在`Images.xcassets`以外的本地资源。

### 最合适的相册图片

iOS会为同一张图片在相册中保存多个不同尺寸的副本。为了性能考虑，从这些副本中挑出最合适的尺寸显得尤为重要。对于一处200x200大小的缩略图，显然不应该选择最高质量的3264x2448大小的图片。如果恰好有匹配的尺寸，那么React Native会自动为你选好。如果没有，则会选择最接近的尺寸进行缩放，但也至少缩放到比所需尺寸大出50%，以使图片看起来仍然足够清晰。这一切过程都是自动完成的，所以你不用操心自己去完成这些繁琐且易错的代码。

## 为什么不在所有情况下都自动指定尺寸呢?

`在浏览器中`，如果你不给图片指定尺寸，那么浏览器会首先渲染一个0x0大小的元素占位，然后下载图片，在下载完成后再基于正确的尺寸来渲染图片。这样做的最大问题是UI会在图片加载的过程中上下跳动，使得用户体验非常糟糕。

`在React Native`中我们有意避免了这一行为。如此一来开发者就需要做更多工作来提前知晓远程图片的尺寸（或宽高比），但我们相信这样可以带来更好的用户体验。然而，从已经打包好的应用资源文件中读取图片（使用`require('image!x')`语法）则`无需指定尺寸`，因为它们的尺寸在加载时就可以立刻知道。

比如这样一个引用`require('image!logo')`的实际输出结果可能是：

```javascript
{"__packager_asset":true,"isStatic":true,"path":"/Users/react/HelloWorld/iOS/Images.xcassets/react.imageset/logo.png","uri":"logo","width":591,"height":573}
```

## 资源属性是一个对象（object）

在React Native中，另一个值得一提的变动是我们把`src`属性改为了`source`属性，而且并不接受字符串，正确的值是一个带有`uri`属性的对象。 

```javascript
<Image source={{uri: 'something.jpg'}} />
```

深层次的考虑是，这样可以使我们在对象中添加一些元数据(metadata)。假设你在使用`require('./my-icon.png')`，那么我们就会在其中添加真实文件路径以及尺寸等信息（这只是举个例子，未来的版本中require的具体行为可能会变化）。此外这也是考虑了未来的扩展性，比如我们可能会加入精灵图（sprites）的支持：在输出`{uri: ...}`的基础上，我们可以进一步输出裁切信息`{uri: ..., crop: {left: 10, top: 50, width: 20, height: 40}}`，这样理论上就可以在现有的代码中无缝支持精灵图的切分。

对于开发者来说，则可以在其中标注一些有用的属性，例如图片的尺寸，这样可以使图片自己去计算将要显示的尺寸（而不必在样式中写死）。请在这一数据结构中自由发挥，存储你可能需要的任何图片相关的信息。

## 通过嵌套来实现背景图片

开发者们常面对的一种需求就是类似web中的背景图（`background-image`）。要实现这一用例，只需简单地创建一个`<Image>`组件，然后把需要背景图的子组件嵌入其中即可。

```javascript
return (
  <Image source={...}>
    <Text>Inside</Text>
  </Image>
);
```
## iOS边框圆角的注意事项
 
请注意下列边框圆角样式目前在iOS的图片组件上还不支持：
 
* `borderTopLeftRadius`
* `borderTopRightRadius`
* `borderBottomLeftRadius`
* `borderBottomRightRadius`

## 在主线程外解码图片

图片解码有可能会需要超过一帧的时间。在web上这是页面掉帧的一大因素，因为解码是在主线程中完成的。然而在React Native中，图片解码则是在另一线程中完成的。在实际开发中，一般对图片还没下载完成时的场景都做了处理（添加loading等），而图片解码时显示的占位符只占用几帧时间，并不需要你改动代码去额外处理。
