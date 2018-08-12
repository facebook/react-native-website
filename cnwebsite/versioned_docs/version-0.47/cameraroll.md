---
id: version-0.47-cameraroll
title: CameraRoll
original_id: cameraroll
---

`CameraRoll`模块提供了访问本地相册的功能。在iOS上使用这个模块之前，你需要先链接`RCTCameraRoll`库，具体做法请参考[链接原生库](linking-libraries-ios.html)文档。

**译注**：本模块只提供了基本的访问图片的功能，并没有提供相册界面。对于多数开发者来说，可能第三方的[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)的功能更为完整易用（可多选、压缩、裁剪等）。

### iOS 10的权限要求
从iOS10开始，访问相册需要用户授权。你需要在`Info.plist`中添加一条名为`NSPhotoLibraryUsageDescription`的键，然后在其值中填写向用户请求权限的具体描述。编辑完成后这个键在Xcode中实际会显示为`Privacy - Photo Library Usage Description`。

### 截图
![cameraroll](/img/api/cameraroll.png)

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="saveimagewithtag"></a><span class="propType">static </span>saveImageWithTag<span class="propType">(tag)</span> <a class="hash-link" href="#saveimagewithtag">#</a></h4>
		<div>
			<p>保存一个图片到相册。</p>
			<p>@param {string} tag 在安卓上，本参数是一个本地URI，例如<code>"file:///sdcard/img.png"</code>.</p>
			<p>在iOS设备上可能是以下之一：</p>
			<ul>
				<li>本地URI</li>
				<li>资源库的标签</li>
				<li>非以上两种类型，表示图片数据将会存储在内存中（并且在本进程持续的时候一直会占用内存）。</li>
			</ul>
			<p>返回一个Promise，操作成功时返回新的URI。</p>
		</div>
	</div>
  <div class="prop">
    <h4 class="methodTitle"><a class="anchor" name="savetocameraroll"></a><span class="methodType">static </span>saveToCameraRoll<span class="methodType">(tag, type?)</span> <a class="hash-link" href="#savetocameraroll">#</a></h4>
      <div><p>把图片或视频保存到相册中。</p>
      <p>On Android, the tag must be a local image or video URI, such as <code>"file:///sdcard/img.png"</code>.</p><p>On iOS, the tag can be any image URI (including local, remote asset-library and base64 data URIs) or a local video file URI (remote or data URIs are not supported for saving video at this time).</p>
      <p>If the tag has a file extension of .mov or .mp4, it will be inferred as a video. Otherwise it will be treated as a photo. To override the automatic choice, you can pass an optional
<code>type</code> parameter that must be one of 'photo' or 'video'.</p><p>Returns a Promise which will resolve with the new URI.</p>
      </div>
  </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getphotos"></a><span class="propType">static </span>getPhotos<span class="propType">(params: object)</span> <a class="hash-link" href="#getphotos">#</a></h4>
		<div>
			<p>返回一个带有图片标识符对象的Promise。返回的对象的结构参见<a href="https://github.com/facebook/react-native/blob/0.23-stable/Libraries/CameraRoll/CameraRoll.js#L83" target="_blank"><code>getPhotosReturnChecker</code></a>。</p>
			<p> @param {object} 要求的参数结构参见<a href="https://github.com/facebook/react-native/blob/0.23-stable/Libraries/CameraRoll/CameraRoll.js#L45" target="_blank"><code>getPhotosParamChecker</code></a>. </p>
			<p> 返回一个Promise，操作成功时返回符合<a href="https://github.com/facebook/react-native/blob/0.23-stable/Libraries/CameraRoll/CameraRoll.js#L83" target="_blank"><code>getPhotosReturnChecker</code></a>结构的对象。</p>
		</div>
	</div>
</div>

### 例子

```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

const invariant = require('fbjs/lib/invariant');

const CameraRollView = require('./CameraRollView');

const AssetScaledImageExampleView = require('./AssetScaledImageExample');

class CameraRollExample extends React.Component {
  state = {
    groupTypes: 'SavedPhotos',
    sliderValue: 1,
    bigImages: true,
  };
  _cameraRollView: ?CameraRollView;
  render() {
    return (
      <View>
        <Switch
          onValueChange={this._onSwitchChange}
          value={this.state.bigImages}
        />
        <Text>{(this.state.bigImages ? 'Big' : 'Small') + ' Images'}</Text>
        <Slider
          value={this.state.sliderValue}
          onValueChange={this._onSliderChange}
        />
        <Text>{'Group Type: ' + this.state.groupTypes}</Text>
        <CameraRollView
          ref={(ref) => { this._cameraRollView = ref; }}
          batchSize={20}
          groupTypes={this.state.groupTypes}
          renderImage={this._renderImage}
        />
      </View>
    );
  }

  loadAsset = (asset) => {
    if (this.props.navigator) {
      this.props.navigator.push({
        title: 'Camera Roll Image',
        component: AssetScaledImageExampleView,
        backButtonTitle: 'Back',
        passProps: { asset: asset },
      });
    }
  };

  _renderImage = (asset) => {
    const imageSize = this.state.bigImages ? 150 : 75;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    const {location} = asset.node;
    const locationStr = location ? JSON.stringify(location) : 'Unknown location';
    return (
      <TouchableOpacity key={asset} onPress={ this.loadAsset.bind( this, asset ) }>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text style={styles.url}>{asset.node.image.uri}</Text>
            <Text>{locationStr}</Text>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _onSliderChange = (value) => {
    const options = CameraRoll.GroupTypesOptions;
    const index = Math.floor(value * options.length * 0.99);
    const groupTypes = options[index];
    if (groupTypes !== this.state.groupTypes) {
      this.setState({groupTypes: groupTypes});
    }
  };

  _onSwitchChange = (value) => {
    invariant(this._cameraRollView, 'ref should be set');
    this._cameraRollView.rendererChanged();
    this.setState({ bigImages: value });
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});

exports.title = 'Camera Roll';
exports.description = 'Example component that uses CameraRoll to list user\'s photos';
exports.examples = [
  {
    title: 'Photos',
    render(): React.Element<any> { return <CameraRollExample />; }
  }
];
```
