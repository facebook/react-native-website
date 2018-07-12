---
id: version-0.47-platform-specific-code
title: 特定平台代码
original_id: platform-specific-code
---

在制作跨平台的App时，多半会碰到针对不同平台编写不同代码的需求。最直接的方案就是把组件放置到不同的文件夹下： 

```sh
/common/components/   
/android/components/   
/ios/components/
```

另一个选择是根据平台不同在组件的文件命名上加以区分，如下：

```sh
BigButtonIOS.js
BigButtonAndroid.js
```

但除此以外React Native还提供了另外两种简单区分平台的方案：

## 特定平台扩展名
React Native会检测某个文件是否具有`.ios.`或是`.android.`的扩展名，然后根据当前运行的平台加载正确对应的文件。 

假设你的项目中有如下两个文件：

```sh
BigButton.ios.js
BigButton.android.js
```

这样命名组件后你就可以在其他组件中直接引用，而无需关心当前运行的平台是哪个。

```javascript
import BigButton from './components/BigButton';
```

React Native会根据运行平台的不同引入正确对应的组件。

还有个实用的方法是Platform.select()，它可以以Platform.OS为key，从传入的对象中返回对应平台的值，见下面的示例：

```javascript
import { Platform, StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },
});
```

上面的代码会根据平台的不同返回不同的container样式——iOS上背景色为红色，而android为蓝色。

这一方法可以接受任何合法类型的参数，因此你也可以直接用它针对不同平台返回不同的组件，像下面这样：


```javascript
var Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```


## 平台模块
React Native提供了一个检测当前运行平台的模块。如果组件只有一小部分代码需要依据平台定制，那么这个模块就可以派上用场。

```javascript
import { Platform, StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  height: (Platform.OS === 'ios') ? 200 : 100,
});
```

`Platform.OS`在iOS上会返回`ios`，而在Android设备或模拟器上则会返回`android`。

### 检测iOS版本
在iOS上，`Version`属性是`-[UIDevice systemVersion]`的返回值，具体形式为一个表示当前系统版本的字符串。比如可能是"10.3"。

### 检测Android版本
在Android上，`Version`属性是一个数字，表示Android的api level：

```javascript
import { Platform } from 'react-native';

if(Platform.Version === 21){
  console.log('当前api level是21，即运行的是Android 5.0，代号Lolipop');
}
```
