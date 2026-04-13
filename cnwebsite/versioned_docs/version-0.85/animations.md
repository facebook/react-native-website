---
id: animations
title: 动画
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

动画对于创造出色的用户体验非常重要。静止物体开始移动时必须克服惯性。运动中的物体具有动量，很少会立即停止。动画使您能够在界面中传达物理上可信的运动。

React Native 提供了两个互补的动画系统：[`Animated`](animations#animated-api) 用于对特定值进行粒度和交互式控制，以及 [`LayoutAnimation`](animations#layoutanimation-api) 用于动画全局布局事务。

## `动画` API

[`Animated`]（动画）API 旨在以非常高效的方式简洁地表达各种有趣的动画和交互模式。 “Animated”专注于输入和输出之间的声明关系，以及之间的可配置转换，以及控制基于时间的动画执行的“start”/“stop”方法。

`Animated` 导出六种可动画组件类型：`View`、`Text`、`Image`、`ScrollView`、`FlatList` 和 `SectionList`，但您也可以使用 `Animated.createAnimatedComponent()` 创建自己的组件类型。

例如，安装时淡入的容器视图可能如下所示：

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer ext=js
import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer ext=tsx
import React, {useEffect, useRef, type PropsWithChildren} from 'react';
import {Animated, Text, View, type ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
```

</TabItem>
</Tabs>

让我们来分析一下这里发生了什么。在“FadeInView”渲染方法中，使用“useRef”初始化一个名为“fadeAnim”的新“Animated.Value”。 “View”上的不透明度属性映射到该动画值。在幕后，提取数值并用于设置不透明度。

当组件安装时，不透明度设置为 0。然后，在“fadeAnim”动画值上启动缓动动画，随着该值动画到最终值 1，这将更新每个帧上的所有依赖映射（在本例中，仅不透明度）。

这是以比调用“setState”和重新渲染更快的优化方式完成的。由于整个配置是声明性的，因此我们将能够实现进一步的优化，序列化配置并在高优先级线程上运行动画。

### 配置动画

动画是高度可配置的。自定义和预定义的缓动函数、延迟、持续时间、衰减因子、弹簧常数等都可以根据动画类型进行调整。

`Animated` 提供了多种动画类型，最常用的一种是 [`Animated.timing()`](animated#timing)。它支持使用各种预定义的缓动函数之一随时间对值进行动画处理，或者您也可以使用自己的函数。缓动函数通常在动画中使用来传达对象的逐渐加速和减速。

默认情况下，“timing”将使用 escapeInOut 曲线，该曲线将逐渐加速到全速，并通过逐渐减速到停止来结束。您可以通过传递“easing”参数来指定不同的缓动函数。还支持动画开始之前的自定义“持续时间”甚至“延迟”。

例如，如果我们想要创建一个 2 秒长的对象动画，该动画在移动到最终位置之前会稍微后退：

```tsx
Animated.timing(this.state.xPosition, {
  toValue: 100,
  easing: Easing.back(),
  duration: 2000,
  useNativeDriver: true,
}).start();
```

查看“Animated” API 参考的[配置动画](animated#configuring-animations) 部分，了解有关内置动画支持的所有配置参数的更多信息。

### 创作动画

动画可以组合并按顺序或并行播放。顺序动画可以在上一个动画完成后立即播放，也可以在指定的延迟后开始。 “Animated” API 提供了多种方法，例如“sequence()”和“delay()”，每个方法都需要执行一组动画，并根据需要自动调用“start()”/“stop()”。

例如，以下动画滑行停止，然后在平行旋转时弹回：

```tsx
Animated.sequence([
  // decay, then spring to start and twirl
  Animated.decay(position, {
    // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
    useNativeDriver: true,
  }),
  Animated.parallel([
    // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}, // return to start
      useNativeDriver: true,
    }),
    Animated.timing(twirl, {
      // and twirl
      toValue: 360,
      useNativeDriver: true,
    }),
  ]),
]).start(); // start the sequence group
```

如果一个动画停止或中断，则该组中的所有其他动画也会停止。 `Animated.parallel` 有一个 `stopTogether` 选项，可以设置为 `false` 来禁用它。

您可以在“Animated” API 参考的[组合动画](animated#composition-animations) 部分找到组合方法的完整列表。

### 组合动画值

您可以通过加法、乘法、除法或取模[组合两个动画值](animated#combining-animated-values)来创建一个新的动画值。

在某些情况下，一个动画值需要反转另一个动画值才能进行计算。一个例子是反转比例 (2x --> 0.5x)：

```tsx
const a = new Animated.Value(1);
const b = Animated.divide(1, a);

Animated.spring(a, {
  toValue: 2,
  useNativeDriver: true,
}).start();
```

### 插值

每个属性都可以首先通过插值运行。插值将输入范围映射到输出范围，通常使用线性插值，但也支持缓动函数。默认情况下，它会推断超出给定范围的曲线，但您也可以让它限制输出值。

将 0-1 范围转换为 0-100 范围的基本映射如下：

```tsx
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

例如，您可能希望将“Animated.Value”视为从 0 到 1，但将位置从 150px 动画到 0px，不透明度从 0 到 1。这可以通过修改上面示例中的“style”来完成，如下所示：

```tsx
  style={{
    opacity: this.state.fadeAnim, // Binds directly
    transform: [{
      translateY: this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }}
```

[`interpolate()`](animated#interpolate) 也支持多个范围段，这对于定义死区和其他方便的技巧很方便。例如，要在 -300 处获得否定关系，在 -100 处变为 0，然后在 0 处返回到 1，然后在 100 处返回到 0，然后是一个死区，在此之后的所有情况都保持为 0，您可以这样做：

```tsx
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300, 0, 1, 0, 0],
});
```

它将像这样映射：

```
Input | Output
------|-------
  -400|    450
  -300|    300
  -200|    150
  -100|      0
   -50|    0.5
     0|      1
    50|    0.5
   100|      0
   101|      0
   200|      0
```

`interpolate()` 还支持映射到字符串，允许您对颜色以及带有单位的值进行动画处理。例如，如果你想设置旋转动画，你可以这样做：

```tsx
value.interpolate({
  inputRange: [0, 360],
  outputRange: ['0deg', '360deg'],
});
```

`interpolate()` 还支持任意缓动函数，其中许多函数已经在 [`Easing`](easing) 模块中实现。 `interpolate()` 还具有用于推断 `outputRange` 的可配置行为。您可以通过设置“extrapolate”、“extrapolateLeft”或“extrapolateRight”选项来设置外推。默认值为“extend”，但您可以使用“clamp”来防止输出值超出“outputRange”。

### 跟踪动态值

动画值还可以通过将动画的“toValue”设置为另一个动画值而不是普通数字来跟踪其他值。例如，像 Android 上 Messenger 使用的动画一样的“聊天头”动画可以通过固定在另一个动画值上的“spring()”来实现，或者使用“timing()”和 0 的“duration”来实现刚性跟踪。它们也可以通过插值组成：

```tsx
Animated.spring(follower, {toValue: leader}).start();
Animated.timing(opacity, {
  toValue: pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  }),
  useNativeDriver: true,
}).start();
```

“leader”和“follower”动画值将使用“Animated.ValueXY()”来实现。 `ValueXY` 是处理 2D 交互（例如平移或拖动）的便捷方法。它是一个基本包装器，包含两个“Animated.Value”实例和一些调用它们的辅助函数，使“ValueXY”在许多情况下成为“Value”的直接替代品。它允许我们跟踪上例中的 x 和 y 值。

### 跟踪手势

手势（例如平移或滚动）和其他事件可以使用 [`Animated.event`](animated#event) 直接映射到动画值。这是通过结构化映射语法完成的，以便可以从复杂的事件对象中提取值。第一级是一个允许跨多个参数映射的数组，并且该数组包含嵌套对象。

例如，在使用水平滚动手势时，您可以执行以下操作，以便将“event.nativeEvent.contentOffset.x”映射到“scrollX”（“Animated.Value”）：

```tsx
 onScroll={Animated.event(
   // scrollX = e.nativeEvent.contentOffset.x
   [{nativeEvent: {
        contentOffset: {
          x: scrollX
        }
      }
    }]
 )}
```

以下示例实现了水平滚动轮播，其中滚动位置指示器使用“ScrollView”中使用的“Animated.event”进行动画处理

#### 带有动画事件的 ScrollView 示例

```SnackPlayer name=Animated&supportedPlatforms=ios,android
import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  useAnimatedValue,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const images = new Array(6).fill(
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const App = () => {
  const scrollX = useAnimatedValue(0);

  const {width: windowWidth} = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
              return (
                <View
                  style={{width: windowWidth, height: 250}}
                  key={imageIndex}>
                  <ImageBackground source={{uri: image}} style={styles.card}>
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>
                        {'Image - ' + imageIndex}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, {width}]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

使用“PanResponder”时，您可以使用以下代码从“gestureState.dx”和“gestureState.dy”中提取x和y位置。我们在数组的第一个位置使用“null”，因为我们只对传递给“PanResponder”处理程序的第二个参数感兴趣，即“gestureState”。

```tsx
onPanResponderMove={Animated.event(
  [null, // ignore the native event
  // extract dx and dy from gestureState
  // like 'pan.x = gestureState.dx, pan.y = gestureState.dy'
  {dx: pan.x, dy: pan.y}
])}
```

#### PanResponder 与动画事件示例

```SnackPlayer name=Animated
import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag & Release this box!</Text>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
```

### 响应当前动画值

您可能会注意到，在制作动画时没有明确的方法来读取当前值。这是因为由于优化，该值可能仅在本机运行时中已知。如果您需要运行 JavaScript 来响应当前值，有两种方法：

- `spring.stopAnimation(callback)` 将停止动画并使用最终值调用 `callback`。这在进行手势转换时很有用。
- `spring.addListener(callback)` 将在动画运行时异步调用 `callback`，提供最近的值。这对于触发状态更改非常有用，例如，当用户将其拖近时将小球捕捉到新选项，因为与需要以 60 fps 运行的连续手势（如平移）相比，这些较大的状态更改对几帧延迟不太敏感。

“Animated”被设计为完全可序列化，以便动画可以以高性能方式运行，独立于正常的 JavaScript 事件循环。这确实会影响 API，因此当与完全同步系统相比做某事似乎有点棘手时，请记住这一点。查看“Animated.Value.addListener”作为解决其中一些限制的方法，但请谨慎使用它，因为它可能会对将来的性能产生影响。

### 使用本机驱动程序

“Animated” API 被设计为可序列化。通过使用[本机驱动程序](/blog/2017/02/14/using-native-driver-for-animated)，我们在启动动画之前将有关动画的所有内容发送到本机，从而允许本机代码在 UI 线程上执行动画，而无需在每一帧上都经过桥接器。一旦动画开始，就可以阻塞 JS 线程而不影响动画。

使用原生驱动程序进行普通动画可以通过在启动时在动画配置中设置 useNativeDriver: true 来完成。由于遗留原因，没有 `useNativeDriver` 属性的动画将默认为 false，但会发出警告（以及 TypeScript 中的类型检查错误）。

```tsx
Animated.timing(this.state.animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // <-- Set this to true
}).start();
```

动画值仅与一个驱动程序兼容，因此如果您在某个值上启动动画时使用本机驱动程序，请确保该值上的每个动画也使用本机驱动程序。

本机驱动程序还可以与“Animated.event”一起使用。这对于跟随滚动位置的动画特别有用，因为没有本机驱动程序，由于 React Native 的异步特性，动画将始终在手势后面运行一帧。

```tsx
<Animated.ScrollView // <-- Use the Animated ScrollView wrapper
  onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: this.state.animatedValue},
        },
      },
    ],
    {useNativeDriver: true}, // <-- Set this to true
  )}>
  {content}
</Animated.ScrollView>
```

您可以通过运行 [RNTester 应用程序](https://github.com/facebook/react-native/blob/main/packages/rn-tester/) 查看本机驱动程序的运行情况，然后加载本机动画示例。您还可以查看[源代码](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/NativeAnimation/NativeAnimationsExample.js)以了解这些示例是如何生成的。

#### 注意事项

目前，本机驱动程序并不支持您可以使用“Animated”执行的所有操作。主要限制是您只能为非布局属性设置动画：“transform”和“opacity”之类的东西可以工作，但 Flexbox 和位置属性则不行。使用“Animated.event”时，它仅适用于直接事件，不适用于冒泡事件。这意味着它不能与“PanResponder”一起使用，但可以与“ScrollView#onScroll”之类的东西一起使用。

当动画运行时，它可以阻止“VirtualizedList”组件渲染更多行。如果您需要在用户滚动列表时运行长动画或循环动画，您可以在动画配置中使用“isInteraction: false”来防止此问题。

###记住

在使用“rotateY”、“rotateX”等变换样式时，确保变换样式“perspective”就位。目前，如果没有它，某些动画可能无法在 Android 上呈现。下面的例子。

```tsx
<Animated.View
  style={{
    transform: [
      {scale: this.state.scale},
      {rotateY: this.state.rotateY},
      {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
    ],
  }}
/>
```

### 其他示例

RNTester 应用程序有各种使用“Animated”的示例：

- [AnimatedGratuitousApp](https://github.com/facebook/react-native/tree/main/packages/rn-tester/js/examples/AnimatedGratuitousApp)
- [NativeAnimationsExample](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/NativeAnimation/NativeAnimationsExample.js)

## `布局动画` API

“LayoutAnimation”允许您全局配置“create”和“update”动画，这些动画将用于下一个渲染/布局周期中的所有视图。这对于进行 Flexbox 布局更新非常有用，无需费心测量或计算特定属性以便直接为它们设置动画，并且当布局更改可能影响祖先时尤其有用，例如“查看更多”扩展也会增加父级的大小并下推下面的行，否则需要组件之间的显式协调才能同步设置动画。

请注意，虽然“LayoutAnimation”非常强大并且非常有用，但它提供的控制比“Animated”和其他动画库要少得多，因此如果无法让“LayoutAnimation”执行您想要的操作，您可能需要使用另一种方法。

请注意，为了使其在 **Android** 上运行，您需要通过“UIManager”设置以下标志：

```tsx
UIManager.setLayoutAnimationEnabledExperimental(true);
```

```SnackPlayer name=LayoutAnimations
import React, {useState} from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  const [state, setState] = useState({
    w: 100,
    h: 100,
  });

  const onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState({w: state.w + 15, h: state.h + 15});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, {width: state.w, height: state.h}]} />
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Press me!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```

本示例使用预设值，您可以根据需要自定义动画，请参阅 [LayoutAnimation.js](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/LayoutAnimation/LayoutAnimation.js) 了解更多信息。

## 附加说明

### `请求动画帧`

`requestAnimationFrame` 是您可能熟悉的浏览器中的填充代码。它接受一个函数作为其唯一参数，并在下一次重绘之前调用该函数。它是动画的重要构建块，是所有基于 JavaScript 的动画 API 的基础。一般来说，您不需要自己调用它 - 动画 API 将为您管理帧更新。

### `setNativeProps`

正如[直接操作部分]（传统/直接操作）中提到的，“setNativeProps”允许我们直接修改本机支持的组件（实际上由本机视图支持的组件，与复合组件不同）的属性，而无需“setState”并重新渲染组件层次结构。

我们可以在 Rebound 示例中使用它来更新比例 - 如果我们要更新的组件是深度嵌套的并且尚未使用“shouldComponentUpdate”进行优化，这可能会有所帮助。

如果您发现动画掉帧（每秒执行低于 60 帧），请考虑使用“setNativeProps”或“shouldComponentUpdate”来优化它们。或者，您可以在 UI 线程而不是 JavaScript 线程上运行动画 [使用 useNativeDriver 选项](/blog/2017/02/14/using-native-driver-for-animated)。您可能还想使用 [InteractionManager](interactionmanager) 将任何计算密集型工作推迟到动画完成之后。您可以使用应用程序内开发菜单中的“FPS Monitor”工具来监视帧速率。
