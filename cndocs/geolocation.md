---
id: geolocation
title: Geolocation
---

地理定位（Geolocation）API 遵循[web 标准](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)。

正因为如此，此 API 和在浏览器上使用方法一致，都是直接访问全局的`navigator.geolocation`对象，并不需要额外`import`，

React-Native 0.60版本以上该模块已经迁移至 `@react-native-community/geolocation` 需要 `yarn add @react-native-community/geolocation` 并手动引入使用。

On Android, this uses the [android.location API](https://developer.android.com/reference/android/location/package-summary). This API is not recommended by Google because it is less accurate and slower than the recommended [Google Location Services API](https://developer.android.com/training/location/). In order to use it with React Native, use the [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service) module.

> 译注 1：本 API 在安卓上需要谷歌框架支持，因而无法在国内使用，请在 github 上搜索百度或高德等国内第三方封装替代库。

> 译注 2：地理定位只用于返回经纬度数据，无法得出具体地名。如果需要通过经纬度数据查询具体地名，则需要额外的“逆地理编码”（即通过经纬度查询地图数据库得到地名）。一般第三方的地图封装带有此功能。

> 译注 3：在 iOS 模拟器上，默认定位地址在苹果总部，美国西海岸。

### Configuration and Permissions

<div class="banner-crna-ejected">
  <h3>Projects with Native Code Only</h3>
  <p>
    This section only applies to projects made with <code>react-native init</code>
    or to those made with Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

#### iOS

你需要在 Info.plist 中增加`NSLocationWhenInUseUsageDescription`字段来启用定位功能。如果你是用`react-native init`命令来创建项目，则定位会被默认启用。

In order to enable geolocation in the background, you need to include the 'NSLocationAlwaysUsageDescription' key in Info.plist and add location as a background mode in the 'Capabilities' tab in Xcode.

如果你是使用 CocoaPods 来引入 React Native，那么请确保你在使用本 API 前引入了`RCTGeolocation`模块。 sub-podspec.

#### Android

要请求访问地理位置的权限，你需要在`AndroidManifest.xml`文件中加入如下一行：

`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`

如果 Android 设备 API 版本>=18（即 Android 4.3 及以上），则位置信息还会包含额外的布尔值`mocked`，表示此位置信息可能由某服务模拟得出。

如果 Android 设备 API 版本>=18（即 Android 6.0 及以上），则需要额外的步骤来检查权限，即使用[`PermissionsAndroid API`](permissionsandroid.md)来检查 ACCESS_FINE_LOCATION 权限。 不这么做的话可能导致应用崩溃闪退。

### 查看方法

* [`setRNConfiguration`](geolocation.md#setrnconfiguration)
* [`requestAuthorization`](geolocation.md#requestauthorization)
* [`getCurrentPosition`](geolocation.md#getcurrentposition)
* [`watchPosition`](geolocation.md#watchposition)
* [`clearWatch`](geolocation.md#clearwatch)
* [`stopObserving`](geolocation.md#stopobserving)

---

# 文档

## 方法

### `setRNConfiguration()`

```jsx
geolocation.setRNConfiguration(config);
```

Sets configuration options that will be used in all location requests.

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| config | object | 是   | 看下面的说明 |

Supported options:

* `skipPermissionRequests` (boolean, iOS-only) - Defaults to `false`. If `true`, you must request permissions before using Geolocation APIs.

---

### `requestAuthorization()`

```jsx
geolocation.requestAuthorization();
```

Request suitable Location permission based on the key configured on pList. If NSLocationAlwaysUsageDescription is set, it will request Always authorization, although if NSLocationWhenInUseUsageDescription is set, it will request InUse authorization.

---

### `getCurrentPosition()`

```jsx
geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);
```

成功时会调用 geo_success 回调，参数中包含最新的位置信息。

**参数：**

| 名称        | 类型     | 必填 | 说明                           |
| ----------- | -------- | ---- | ------------------------------ |
| geo_success | function | 是   | 成功时调用，传回最新的位置信息 |
| geo_error   | function | 否   | 出错时调用                     |
| geo_options | object   | 否   | 看下面的说明                   |

支持的选项：

* `timeout` (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to INFINITY.
* `maximumAge` (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. 默认为无限大。
* `enableHighAccuracy` (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.

---

### `watchPosition()`

```jsx
geolocation.watchPosition(success, [error], [options]);
```

持续监听位置，每当位置变化之后都调用 success 回调。返回一个`watchId`（整型）。

**参数：**

| 名称    | 类型     | 必填 | 说明           |
| ------- | -------- | ---- | -------------- |
| success | function | 是   | 位置变化后调用 |
| error   | function | 否   | 出错时调用     |
| options | object   | 否   | 看下面的说明   |

Supported options:

* `timeout` (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to INFINITY.
* `maximumAge` (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. 默认为无限大。
* `enableHighAccuracy` (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.
* `distanceFilter` (m) - The minimum distance from the previous location to exceed before returning a new location. Set to 0 to not filter locations. Defaults to 100m.
* `useSignificantChanges` (bool) - Uses the battery-efficient native significant changes APIs to return locations. Locations will only be returned when the device detects a significant distance has been breached. Defaults to FALSE.

---

### `clearWatch()`

```jsx
geolocation.clearWatch(watchID);
```

**参数：**

| 名称    | 类型   | 必填 | 说明                             |
| ------- | ------ | ---- | -------------------------------- |
| watchID | number | 是   | 由`watchPosition()`方法返回的 id |

---

### `stopObserving()`

```jsx
geolocation.stopObserving();
```

Stops observing for device location changes. In addition, it removes all listeners previously registered.

Notice that this method has only effect if the `geolocation.watchPosition(successCallback, errorCallback)` method was previously invoked.
