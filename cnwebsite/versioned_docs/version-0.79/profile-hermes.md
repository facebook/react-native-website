---
id: profile-hermes
title: 在 Hermes 中进行性能分析
---

你可以使用[Hermes](https://github.com/facebook/hermes)在 React Native 应用中可视化 JavaScript 的性能。Hermes 是一个小型且轻量的 JavaScript 引擎（你可以[在这里阅读更多有关在 React Native 中使用它的信息](hermes)）。Hermes 有助于提高应用性能，并且还提供了分析其运行的 JavaScript 性能的方式。

在本节中，您将学习如何对在 Hermes 上运行的 React Native 应用进行分析，并如何使用[Chrome DevTools 上的性能选项卡](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)可视化配置文件。

:::caution 注意
请确保您[已在应用中启用 Hermes](Hermes)
:::

按照以下步骤开始分析:

1. [记录 Hermes 采样分析](profile-hermes.md#记录hermes采样分析)
2. [从命令行执行命令](profile-hermes.md#从命令行执行命令)
3. [在 Chrome DevTools 中打开下载的分析文件](profile-hermes.md#在chrome-devtools中打开下载的分析文件)

## 记录 Hermes 采样分析

从开发菜单记录采样分析器:

1. 导航到正在运行的 Metro 服务器终端。
2. 按"d"键打开**开发菜单**。
3. 选择**启用采样分析器**。
4. 在应用中执行 JavaScript(按按钮等)。
5. 再次按"d"键打开**开发菜单**。
6. 选择**禁用采样分析器**以停止记录并保存采样分析器。

会显示一个提示,指示采样分析器保存的位置,通常在`/data/user/0/com.appName/cache/*.cpuprofile`

<img src="/docs/assets/HermesProfileSaved.png" height="465" width="250" alt="Toast Notification of Profile saving" />

## Execute command from CLI

You can use the [React Native CLI](https://github.com/react-native-community/cli) to convert the Hermes tracing profile to Chrome tracing profile, and then pull it to your local machine using:

```sh
npx react-native profile-hermes [destinationDir]
```

### Enabling source map

:::info
You may read about source maps on the [Debugging Release Builds](debugging-release-builds.md) page.
:::

### Common errors

#### `adb: no devices/emulators found` or `adb: device offline`

- **Why this happens** The CLI cannot access the device or emulator (through adb) you are using to run the app.
- **How to fix** Make sure your Android device/emulator is connected and running. The command only works when it can access adb.

#### `There is no file in the cache/ directory`

- **Why this happens** The CLI cannot find any **.cpuprofile** file in your app's **cache/** directory. You might have forgotten to record a profile from the device.
- **How to fix** Follow the [instructions](profile-hermes.md#record-a-hermes-sampling-profile) to enable/disable profiler from device.

#### `Error: your_profile_name.cpuprofile is an empty file`

- **Why this happens** The profile is empty, it might be because Hermes is not running correctly.
- **How to fix** Make sure your app is running on the latest version of Hermes.

## Open the downloaded profile in Chrome DevTools

To open the profile in Chrome DevTools:

1. Open Chrome DevTools.
2. Select the **Performance** tab.
3. Right click and choose **Load profile...**

<img src="/docs/assets/openChromeProfile.png" alt="Loading a performance profile on Chrome DevTools" />

## How does the Hermes Profile Transformer work?

The Hermes Sample Profile is of the `JSON object format`, while the format that Google's DevTools supports is `JSON Array Format`. (More information about the formats can be found on the [Trace Event Format Document](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview))

```ts
export interface HermesCPUProfile {
  traceEvents: SharedEventProperties[];
  samples: HermesSample[];
  stackFrames: {[key in string]: HermesStackFrame};
}
```

The Hermes profile has most of its information encoded into the `samples` and `stackFrames` properties. Each sample is a snapshot of the function call stack at that particular timestamp as each sample has a `sf` property which corresponds to a function call.

```ts
export interface HermesSample {
  cpu: string;
  name: string;
  ts: string;
  pid: number;
  tid: string;
  weight: string;
  /**
   * Will refer to an element in the stackFrames object of the Hermes Profile
   */
  sf: number;
  stackFrameData?: HermesStackFrame;
}
```

The information about a function call can be found in `stackFrames` which contains key-object pairs, where the key is the `sf` number and the corresponding object gives us all the relevant information about the function including the `sf` number of its parent function. This parent-child relationship can be traced upwards to find the information of all the functions running at a particular timestamp.

```ts
export interface HermesStackFrame {
  line: string;
  column: string;
  funcLine: string;
  funcColumn: string;
  name: string;
  category: string;
  /**
   * A parent function may or may not exist
   */
  parent?: number;
}
```

At this point, you should define a few more terms, namely:

1. Nodes: The objects corresponding to `sf` numbers in `stackFrames`
2. Active Nodes: The nodes which are currently running at a particular timestamp. A node is classified as running if its `sf` number is in the function call stack. This call stack can be obtained from the `sf` number of the sample and tracing upwards till parent `sf`s are available

The `samples` and the `stackFrames` in tandem can then be used to generate all the start and end events at the corresponding timestamps, wherein:

1. Start Nodes/Events: Nodes absent in the previous sample's function call stack but present in the current sample's.
2. End Nodes/Events: Nodes present in the previous sample's function call stack but absent in the current sample's.

<img src="/docs/assets/CallStackDemo.jpg" height="800" width="600" alt="CallStack Terms Explained" />

You can now construct a `flamechart` of function calls as you have all the function information including its start and end timestamps.

The `hermes-profile-transformer` can convert any profile generated using Hermes into a format that can be directly displayed in Chrome DevTools. More information about this can be found on [ `@react-native-community/hermes-profile-transformer` ](https://github.com/react-native-community/hermes-profile-transformer)
