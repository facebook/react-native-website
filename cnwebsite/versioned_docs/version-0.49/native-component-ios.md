---
id: version-0.49-native-component-ios
title: 原生UI组件
original_id: native-component-ios
---

在如今的App中，已经有成千上万的原生UI部件了——其中的一些是平台的一部分，另一些可能来自于一些第三方库，而且可能你自己还收藏了很多。React Native已经封装了大部分最常见的组件，譬如`ScrollView`和`TextInput`，但不可能封装全部组件。而且，说不定你曾经为自己以前的App还封装过一些组件，React Native肯定没法包含它们。幸运的是，在React Naitve应用程序中封装和植入已有的组件非常简单。

和原生模块向导一样，本向导也是一个相对高级的向导，我们假设你已经对iOS编程颇有经验。本向导会引导你如何构建一个原生UI组件，带领你了解React Native核心库中`MapView`组件的具体实现。

## iOS MapView样例

假设我们要把地图组件植入到我们的App中——我们用到的是[`MKMapView`](https://developer.apple.com/library/prerelease/mac/documentation/MapKit/Reference/MKMapView_Class/index.html)，而现在只需要让它可以被Javascript重用。

原生视图都需要被一个`RCTViewManager`的子类来创建和管理。这些管理器在功能上有些类似“视图控制器”，但它们本质上都是单例 - React Native只会为每个管理器创建一个实例。它们创建原生的视图并提供给`RCTUIManager`，`RCTUIManager`则会反过来委托它们在需要的时候去设置和更新视图的属性。`RCTViewManager`还会代理视图的所有委托，并给JavaScript发回对应的事件。

提供原生视图很简单：

- 首先创建一个子类
- 添加`RCT_EXPORT_MODULE()`标记宏
- 实现`-(UIView *)view`方法

```objective-c
// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
```

接下来你需要一些Javascript代码来让这个视图变成一个可用的React组件：

```javascript
// MapView.js

var { requireNativeComponent } = require('react-native');

// requireNativeComponent 自动把这个组件提供给 "RNTMapManager"
module.exports = requireNativeComponent('RNTMap', null);
```

现在我们就已经实现了一个完整功能的地图组件了，诸如捏放和其它的手势都已经完整支持。但是现在我们还不能真正的从Javascript端控制它。(╯﹏╰)

## 属性

我们能让这个组件变得更强大的第一件事情就是要能够封装一些原生属性供Javascript使用。举例来说，我们希望能够禁用手指捏放操作，然后指定一个初始的地图可见区域。禁用捏放操作只需要一个布尔值类型的属性就行了，所以我们添加这么一行：

```objective-c
// RNTMapManager.m
RCT_EXPORT_VIEW_PROPERTY(pitchEnabled, BOOL)
```

注意我们现在把类型声明为`BOOL`类型——React Native用`RCTConvert`来在JavaScript和原生代码之间完成类型转换。如果转换无法完成，会产生一个“红屏”的报错提示，这样你就能立即知道代码中出现了问题。如果一切进展顺利，上面这个宏就已经包含了导出属性的全部实现。

现在要想禁用捏放操作，我们只需要在JS里设置对应的属性：

```javascript
// MyApp.js
<MapView pitchEnabled={false} />
```

但这样并不能很好的说明这个组件的用法——用户要想知道我们的组件有哪些属性可以用，以及可以取什么样的值，他不得不一路翻到Objective-C的代码。要解决这个问题，我们可以创建一个封装组件，并且通过`PropTypes`来说明这个组件的接口。

```javascript
// MapView.js
import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

var RNTMap = requireNativeComponent('RNTMap', MapView);

export default class MapView extends Component {
  static propTypes = {
    /**
    * 当这个属性被设置为true，并且地图上绑定了一个有效的可视区域的情况下，
    * 可以通过捏放操作来改变摄像头的偏转角度。
    * 当这个属性被设置成false时，摄像头的角度会被忽略，地图会一直显示为俯视状态。
    */
    pitchEnabled: PropTypes.bool,
  };
  render() {
    return <RNTMap {...this.props} />;
  }
}
```

_译注_：使用了封装组件之后，你还需要注意到module.exports导出的不再是requireNativeComponent的返回值，而是所创建的包装组件。

现在我们有了一个封装好的组件，还有了一些注释文档，用户使用起来也更方便了。注意我们现在把`requireNativeComponent`的第二个参数从null变成了用于封装的组件`MapView`。这使得React Native的底层框架可以检查原生属性和包装类的属性是否一致，来减少出现问题的可能。

现在，让我们添加一个更复杂些的`region`属性。我们首先添加原生代码：

```objective-c
// RNTMapManager.m
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, RNTMap)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
```

这段代码比刚才的一个简单的`BOOL`要复杂的多了。现在我们多了一个需要做类型转换的`MKCoordinateRegion`类型，还添加了一部分自定义的代码，这样当我们在JS里改变地图的可视区域的时候，视角会平滑地移动过去。在我们提供的函数体内，`json`代表了JS中传递的尚未解析的原始值。函数里还有一个`view`变量，使得我们可以访问到对应的视图实例。最后，还有一个`defaultView`对象，这样当JS给我们发送null的时候，可以把视图的这个属性重置回默认值。

你可以为视图编写任何你所需要的转换函数——下面就是`MKCoordinateRegion`的转换实现，它通过两个RCTConvert的扩展来完成：

```objective-c
@implementation RCTConvert(CoreLocation)

RCT_CONVERTER(CLLocationDegrees, CLLocationDegrees, doubleValue);
RCT_CONVERTER(CLLocationDistance, CLLocationDistance, doubleValue);

+ (CLLocationCoordinate2D)CLLocationCoordinate2D:(id)json
{
  json = [self NSDictionary:json];
  return (CLLocationCoordinate2D){
    [self CLLocationDegrees:json[@"latitude"]],
    [self CLLocationDegrees:json[@"longitude"]]
  };
}

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
```

这些转换函数被设计为可以安全的处理任何JS扔过来的JSON：当有任何缺少的键或者其它问题发生的时候，显示一个“红屏”的错误提示。

为了完成`region`属性的支持，我们还需要在`propTypes`里添加相应的说明（否则我们会立刻收到一个错误提示），然后就可以像使用其他属性一样使用了：

```javascript
// MapView.js

MapView.propTypes = {
  /**
   * 当这个属性被设置为true，并且地图上绑定了一个有效的可视区域的情况下，
   * 可以通过捏放操作来改变摄像头的偏转角度。
   * 当这个属性被设置成false时，摄像头的角度会被忽略，地图会一直显示为俯视状态。
   */
  pitchEnabled: React.PropTypes.bool,

  /**
   * 地图要显示的区域。
   *
   * 区域由中心点坐标和区域范围坐标来定义。
   * 
   */
  region: React.PropTypes.shape({
    /**
     * 地图中心点的坐标。
     */
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,

    /**
     * 最小/最大经、纬度间的距离。
     */
    latitudeDelta: React.PropTypes.number.isRequired,
    longitudeDelta: React.PropTypes.number.isRequired,
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
    return <MapView region={region} />;
  }

```

现在你可以看到region属性的整个结构已经加上了文档说明——将来可能我们会自动生成一些类似的代码，但目前还没有这样的手段。

有时候你的原生组件有一些特殊的属性希望导出，但并不希望它成为公开的接口。举个例子，`Switch`组件可能会有一个`onChange`属性用来传递原始的原生事件，然后导出一个`onValueChange`属性，这个属性在调用的时候会带上`Switch`的状态作为参数之一。这样的话你可能不希望原生专用的属性出现在API之中，也就不希望把它放到`propTypes`里。可是如果你不放的话，又会出现一个报错。解决方案就是带上额外的`nativeOnly`参数，像这样：

```javascript
var RCTSwitch = requireNativeComponent('RCTSwitch', Switch, {
  nativeOnly: { onChange: true }
});
```

## 事件

现在我们已经有了一个原生地图组件，并且从JS可以很容易的控制它了。不过我们怎么才能处理来自用户的事件，譬如缩放操作或者拖动来改变可视区域？关键的步骤是在`RNTMapManager`中声明一个事件处理函数的属性（onChange），来委托我们提供的所有视图，然后把事件传递给JavaScript。最终的代码看起来类似这样（比起完整的实现有所简化）：

```objective-c
// RNTMap.h

#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMap: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

@end
```

```objective-c
// RNTMap.m

#import "RNTMap.h"

@implementation RNTMap

@end
```

```objective-c
#import "RNTMapManager.h"

#import <MapKit/MapKit.h>

#import "RNTMap.h"
#import <React/UIView+React.h>

@interface RNTMapManager() <MKMapViewDelegate>
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

- (UIView *)view
{
  RNTMap *map = [RNTMap new];
  map.delegate = self;
  return map;
}

#pragma mark MKMapViewDelegate

- (void)mapView:(RNTMap *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}
```

如你所见，我们刚才通过继承`MKMapView`添加了事件处理函数，然后我们将`onChange`暴露出来，委托`RNTMapManager`代理其创建的所有视图。最后在委托方法`-mapView:regionDidChangeAnimated:`中，根据对应的视图调用事件处理函数并传递区域数据。调用`onChange`事件会触发JavaScript端的同名回调函数。这个回调会被原生事件执行，然后我们通常都会在封装组件里做一些处理，来使得API更简明：


```javascript
// MapView.js

class MapView extends React.Component {
  static propTypes = {
    /**
     * Callback that is called continuously when the user is dragging the map.
     */
    onChange: React.PropTypes.func,
    ...
  };
  _onChange = (event: Event) => {
    if (!this.props.onRegionChange) {
      return;
    }
    this.props.onRegionChange(event.nativeEvent);
  }
  render() {
    return <RNTMap {...this.props} onChange={this._onChange} />;
  }
}

class MapViewExample extends React.Component {
   onRegionChange(event: Event) {
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
       <MapView region={region} pitchEnabled={false} style={{flex: 1}} onChange={this.onRegionChange}/>
     );
   }  
 }
 
 // Module name
 +AppRegistry.registerComponent('MapViewExample', () => MapViewExample);
```

## 样式

因为我们所有的视图都是`UIView`的子类，大部分的样式属性应该直接就可以生效。但有一部分组件会希望使用自己定义的默认样式，例如`UIDatePicker`希望自己的大小是固定的。这个默认属性对于布局算法的正常工作来说很重要，但我们也希望在使用这个组件的时候可以覆盖这些默认的样式。`DatePickerIOS`实现这个功能的办法是通过封装一个拥有弹性样式的额外视图，然后在内层的视图上应用一个固定样式（通过原生传递来的常数生成）：

```javascript
// DatePickerIOS.ios.js

var RCTDatePickerIOSConsts = require('react-native').UIManager.RCTDatePicker.Constants;
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

```objective-c
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

本向导覆盖了包装原生组件所需了解的许多方面，不过你可能还有很多知识需要了解，譬如特殊的方式来插入和布局子视图。如果你想更深入了解，可以阅读`RNTMapManager`和其它的组件的[源代码](https://github.com/facebook/react-native/blob/master/React/Views)。

