---
id: version-0.60-native-components-ios
title: 原生UI组件
original_id: native-components-ios
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(99.61%), [2725285+biaji](https://github.com/search?q=2725285%2Bbiaji%40users.noreply.github.com+in%3Aemail&type=Users)(0.39%)

在如今的 App 中，已经有成千上万的原生 UI 部件了——其中的一些是平台的一部分，另一些可能来自于一些第三方库，而且可能你自己还收藏了很多。React Native 已经封装了大部分最常见的组件，譬如`ScrollView`和`TextInput`，但不可能封装全部组件。而且，说不定你曾经为自己以前的 App 还封装过一些组件，React Native 肯定没法包含它们。幸运的是，在 React Naitve 应用程序中封装和植入已有的组件非常简单。

和原生模块向导一样，本向导也是一个相对高级的向导，我们假设你已经对 iOS 编程颇有经验。本向导会引导你如何构建一个原生 UI 组件，带领你了解 React Native 核心库中`MapView`组件的具体实现。

## iOS MapView 示例

假设我们要把地图组件植入到我们的 App 中——我们用到的是[`MKMapView`](https://developer.apple.com/library/prerelease/mac/documentation/MapKit/Reference/MKMapView_Class/index.html)，而现在只需要让它可以在 Javascript 端使用。

原生视图都需要被一个`RCTViewManager`的子类来创建和管理。这些管理器在功能上有些类似“视图控制器”，但它们实际都是单例 - React Native 只会为每个管理器创建一个实例。它们创建原生的视图并提供给`RCTUIManager`，`RCTUIManager`则会反过来委托它们在需要的时候去设置和更新视图的属性。`RCTViewManager`还会代理视图的所有委托，并给 JavaScript 发回对应的事件。

提供原生视图很简单：

- 首先创建一个`RCTViewManager`的子类。
- 添加`RCT_EXPORT_MODULE()`宏标记。
- 实现`-(UIView *)view`方法。

```objectivec
// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
```

**注意：** 请不要在`-view`中给`UIView`实例设置`frame`或是`backgroundColor`属性。为了和 JavaScript 端的布局属性一致，React Native 会覆盖你所设置的值。 如果您需要这种粒度的操作的话，比较好的方法是用另一个`UIView`来封装你想操作的`UIView`实例，并返回外层的`UIView`。请参阅[Issue 2948](https://github.com/facebook/react-native/issues/2948)获取更多信息。

> 在上例中，我们的类名使用了`RNT`前缀以避免与其它框架产生命名冲突。苹果自有框架使用了两个字符的前缀，而 React Native 则使用`RCT`作为前缀。为避免命名冲突，我们建议您在自己的类中使用`RNT`以外的其它三字符前缀。

接下来你需要一些 Javascript 代码来让这个视图变成一个可用的 React 组件：

```jsx
// MapView.js

import { requireNativeComponent } from 'react-native';

// requireNativeComponent 自动把'RNTMap'解析为'RNTMapManager'
export default requireNativeComponent('RNTMap');

// MyApp.js

import MapView from './MapView.js';

...

render() {
  return <MapView style={{ flex: 1 }} />;
}
```

请确认此处使用了 `RNTMap` 。我们在此对 manager 使用了 require 操作，以暴露 manager 的视图，并于 Javascript 中使用。

**注意：** 在渲染时，不要忘记布局视图，否则您只能面对一个空荡荡的屏幕。

```jsx
  render() {
    return <MapView style={{flex: 1}} />;
  }
```

现在我们就已经实现了一个完整功能的地图组件了，诸如捏放和其它的手势都已经完整支持。但是现在我们还不能真正的从 Javascript 端控制它。(╯﹏╰)

## 属性

我们能让这个组件变得更强大的第一件事情就是要能够封装一些原生属性供 Javascript 使用。举例来说，我们希望能够禁用手指捏放操作，然后指定一个初始的地图可见区域。禁用捏放操作只需要一个布尔值类型的属性就行了，所以我们添加这么一行：

```objectivec
// RNTMapManager.m
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
```

注意我们现在把类型声明为`BOOL`类型——React Native 用`RCTConvert`来在 JavaScript 和原生代码之间完成类型转换。如果转换无法完成，会产生一个“红屏”的报错提示，这样你就能立即知道代码中出现了问题。如果一切进展顺利，上面这个宏就已经包含了导出属性的全部实现。

现在要想禁用捏放操作，我们只需要在 JS 里设置对应的属性：

```jsx
// MyApp.js
<MapView zoomEnabled={false} style={{flex: 1}} />
```

但这样并不能很好的说明这个组件的用法——用户要想知道我们的组件有哪些属性可以用，以及可以取什么样的值，他不得不一路翻到 Objective-C 的代码。要解决这个问题，我们可以创建一个封装组件，并且通过`PropTypes`来说明这个组件的接口。

```jsx
// MapView.js
import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent} from 'react-native';

class MapView extends React.Component {
  render() {
    return <RNTMap {...this.props} />;
  }
}

MapView.propTypes = {
  /**
   * A Boolean value that determines whether the user may use pinch
   * gestures to zoom in and out of the map.
   */
  zoomEnabled: PropTypes.bool,
};

var RNTMap = requireNativeComponent('RNTMap', MapView);

export default MapView;
```

现在我们有了一个封装好的组件，还有了一些注释文档，用户使用起来也更方便了。注意我们现在把`requireNativeComponent`的第二个参数从 null 变成了用于封装的组件`MapView`。这使得 React Native 的底层框架可以检查原生属性和包装类的属性是否一致，来减少出现问题的可能。

现在，让我们添加一个更复杂些的`region`属性。我们首先添加原生代码：

```objectivec
// RNTMapManager.m
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
```

这段代码比刚才的一个简单的`BOOL`要复杂的多了。现在我们多了一个需要做类型转换的`MKCoordinateRegion`类型，还添加了一部分自定义的代码，这样当我们在 JS 里改变地图的可视区域的时候，视角会平滑地移动过去。在我们提供的函数体内，`json`代表了 JS 中传递的尚未解析的原始值。函数里还有一个`view`变量，使得我们可以访问到对应的视图实例。最后，还有一个`defaultView`对象，这样当 JS 给我们发送 null 的时候，可以把视图的这个属性重置回默认值。

你可以为视图编写任何你所需要的转换函数——下面就是用 `RCTConvert` 实现的 `MKCoordinateRegion`。它使用了 ReactNative 中已经存在的 `RCTConvert+CoreLocation`:

```objectivec
// RNTMapManager.m

#import "RCTConvert+Mapkit.m"

// RCTConvert+Mapkit.h

#import <MapKit/MapKit.h>
#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert+CoreLocation.h>

@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end

@implementation RCTConvert(MapKit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json
{
  json = [self NSDictionary:json];
  return (MKCoordinateSpan){
    [self CLLocationDegrees:json[@"latitudeDelta"]],
    [self CLLocationDegrees:json[@"longitudeDelta"]]
  };
}

+ (MKCoordinateRegion)MKCoordinateRegion:(id)json
{
  return (MKCoordinateRegion){
    [self CLLocationCoordinate2D:json],
    [self MKCoordinateSpan:json]
  };
}

@end
```

这些转换函数被设计为可以安全的处理任何 JS 扔过来的 JSON：当有任何缺少的键或者其它问题发生的时候，显示一个“红屏”的错误提示。

为了完成`region`属性的支持，我们还需要在`propTypes`里添加相应的说明（否则我们会立刻收到一个错误提示），然后就可以像使用其他属性一样使用了：

```jsx
// MapView.js

MapView.propTypes = {
  /**
   * A Boolean value that determines whether the user may use pinch
   * gestures to zoom in and out of the map.
   */
  zoomEnabled: PropTypes.bool,

  /**
   * 地图要显示的区域。
   *
   * 区域由中心点坐标和区域范围坐标来定义。
   *
   */
  region: PropTypes.shape({
    /**
     * 地图中心点的坐标。
     */
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,

    /**
     * 最小/最大经、纬度间的距离。
     *
     */
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }),
};

// MyApp.js

render() {
  var region = {
    latitude: 37.48,
    longitude: -122.16,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  return (
    <MapView
      region={region}
      zoomEnabled={false}
      style={{ flex: 1 }}
    />
  );
}
```

现在你可以看到 region 属性的整个结构已经加上了文档说明——将来可能我们会自动生成一些类似的代码，但目前还没有实现。

有时候你的原生组件有一些特殊的属性希望导出，但并不希望它成为公开的接口。举个例子，`Switch`组件可能会有一个`onChange`属性用来传递原始的原生事件，然后导出一个`onValueChange`属性，这个属性在调用的时候会带上`Switch`的状态作为参数之一。这样的话你可能不希望原生专用的属性出现在 API 之中，也就不希望把它放到`propTypes`里。可是如果你不放的话，又会出现一个报错。解决方案就是带上额外的`nativeOnly`参数，像这样：

```jsx
var RCTSwitch = requireNativeComponent('RCTSwitch', Switch, {
  nativeOnly: {onChange: true},
});
```

## Events

事件

现在我们已经有了一个原生地图组件，并且从 JS 可以很容易的控制它了。不过我们怎么才能处理来自用户的事件，譬如缩放操作或者拖动来改变可视区域？

截至目前，我们从 manager 的 `-(UIView *)view` 方法返回了 `MKMapView` 实例。我们没法直接为 `MKMapView` 添加新的属性，所以我们只能创建一个 `MKMapView` 的子类用于我们自己的视图中。我们可以在这个子类中添加 `onRegionChange` 回调方法：

```objectivec
// RNTMapView.h

#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end

// RNTMapView.m

#import "RNTMapView.h"

@implementation RNTMapView

@end
```

需要注意的是，所有 `RCTBubblingEventBlock` 必须以 `on` 开头。然后在 `RNTMapManager`上声明一个事件处理函数属性，将其作为所暴露出来的所有视图的委托，并调用本地视图的事件处理将事件转发至 JS。

```objectivec{9,17,31-48}
// RNTMapManager.m

#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

#import "RNTMapView.h"
#import "RCTConvert+Mapkit.m"

@interface RNTMapManager : RCTViewManager <MKMapViewDelegate>
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
	[view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

- (UIView *)view
{
  RNTMapView *map = [RNTMapView new];
  map.delegate = self;
  return map;
}

#pragma mark MKMapViewDelegate

- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}
@end
```

在委托方法`-mapView:regionDidChangeAnimated:`中，根据对应的视图调用事件处理函数并传递区域数据。调用`onRegionChange`事件会触发 JavaScript 端的同名回调函数。这个回调会传递原生事件对象，然后我们通常都会在封装组件里来处理这个对象，以使 API 更简明：

```jsx
// MapView.js

class MapView extends React.Component {
  _onRegionChange = (event) => {
    if (!this.props.onRegionChange) {
      return;
    }

    // process raw event...
    this.props.onRegionChange(event.nativeEvent);
  }
  render() {
    return (
      <RNTMap
        {...this.props}
        onRegionChange={this._onRegionChange}
      />
    );
  }
}
MapView.propTypes = {
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onRegionChange: PropTypes.func,
  ...
};

// MyApp.js

class MyApp extends React.Component {
  onRegionChange(event) {
    // Do stuff with event.region.latitude, etc.
  }

  render() {
    var region = {
      latitude: 37.48,
      longitude: -122.16,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    return (
      <MapView
        region={region}
        zoomEnabled={false}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}
```

## Handling multiple native views

A React Native view can have more than one child view in the view tree eg.

```jsx
<View>
<MyNativeView />
<MyNativeView />
<Button />
</View>
```

In this example, the class `MyNativeView` is a wrapper for a `NativeComponent` and exposes methods, which will be called on the iOS platform. `MyNativeView` is defined in `MyNativeView.ios.js` and contains proxy methods of `NativeComponent`.

When the user interacts with the component, like clicking the button, the `backgroundColor` of `MyNativeView` changes. In this case `UIManager` would not know which `MyNativeView` should be handled and which one should change `backgroundColor`. Below you will find a solution to this problem:

```jsx
<View>
<MyNativeView ref={this.myNativeReference}>/>
<MyNativeView ref={this.myNativeReference2}>/>
<Button onPress={() => { this.myNativeReference.callNativeMethod() }}/>
</View>
```

Now the above component has a reference to a particular `MyNativeView` which allows us to use a specific instance of `MyNativeView`. Now the button can control which `MyNativeView` should change its `backgroundColor`. In this example let's assume that `callNativeMethod` changes `backgroundColor`.

`MyNativeView.ios.js` contains code as follow:

```jsx
class MyNativeView extends React.Component<> {
callNativeMethod = () => {
  UIManager.dispatchViewManagerCommand(
    ReactNative.findNodeHandle(this),
    UIManager.getViewManagerConfig('RNCMyNativeView').Commands
      .callNativeMethod,
    [],
  );
};
  render() {
  return <NativeComponent ref={NATIVE_COMPONENT_REF} />;
}
}
```

`callNativeMethod` is our custom iOS method which for example changes the `backgroundColor` which is exposed through `MyNativeView`. This method uses `UIManager.dispatchViewManagerCommand` which needs 3 parameters:

- (nonnull NSNumber \*)reactTag  -  id of react view.
- commandID:(NSInteger)commandID  -  Id of the native method that should be called
- commandArgs:(NSArray<id> \*)commandArgs  -  Args of the native method that we can pass from JS to native.

`RNCMyNativeViewManager.m`

```objectivec
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>
RCT_EXPORT_METHOD(callNativeMethod:(nonnull NSNumber*) reactTag) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      NativeView *view = viewRegistry[reactTag];
      if (!view || ![view isKindOfClass:[NativeView class]]) {
          RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
          return;
      }
      [view callNativeMethod];
  }];
}
```

Here the `callNativeMethod` is defined in the `RNCMyNativeViewManager.m` file and contains only one parameter which is `(nonnull NSNumber*) reactTag`. This exported function will find a particular view using `addUIBlock` which contains the `viewRegistry` parameter and returns the component based on `reactTag` allowing it to call the method on the correct component.

## 样式

因为我们所有的视图都是`UIView`的子类，大部分的样式属性应该直接就可以生效。但有一部分组件会希望使用自己定义的默认样式，例如`UIDatePicker`希望自己的大小是固定的。这个默认属性对于布局算法的正常工作来说很重要，但我们也希望在使用这个组件的时候可以覆盖这些默认的样式。`DatePickerIOS`实现这个功能的办法是通过封装一个拥有弹性样式的额外视图，然后在内层的视图上应用一个固定样式（通过原生传递来的常数生成）：

```jsx
// DatePickerIOS.ios.js

import { UIManager } from 'react-native';
var RCTDatePickerIOSConsts = UIManager.RCTDatePicker.Constants;
...
  render: function() {
    return (
      <View style={this.props.style}>
        <RCTDatePickerIOS
          ref={DATEPICKER}
          style={styles.rkDatePickerIOS}
          ...
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  rkDatePickerIOS: {
    height: RCTDatePickerIOSConsts.ComponentHeight,
    width: RCTDatePickerIOSConsts.ComponentWidth,
  },
});
```

常量`RCTDatePickerIOSConsts`在原生代码中导出，从一个组件的实际布局上获取到：

```objectivec
// RCTDatePickerManager.m

- (NSDictionary *)constantsToExport
{
  UIDatePicker *dp = [[UIDatePicker alloc] init];
  [dp layoutIfNeeded];

  return @{
    @"ComponentHeight": @(CGRectGetHeight(dp.frame)),
    @"ComponentWidth": @(CGRectGetWidth(dp.frame)),
    @"DatePickerModes": @{
      @"time": @(UIDatePickerModeTime),
      @"date": @(UIDatePickerModeDate),
      @"datetime": @(UIDatePickerModeDateAndTime),
    }
  };
}
```

本向导覆盖了包装原生组件所需了解的许多方面，不过你可能还有很多知识需要了解，譬如特殊的方式来插入和布局子视图。如果你想更深入了解，可以尝试阅读一些[源代码](https://github.com/facebook/react-native/blob/master/React/Views)。
