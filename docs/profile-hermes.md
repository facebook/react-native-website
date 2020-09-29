---
id: profile-hermes
title: Profiling with Hermes
---

You can visualize JavaScript's performance in a React Native app using [Hermes](https://github.com/facebook/hermes). Hermes is a small and lightweight JavaScript engine optimized for running React Native on Android (you can [read more about using it with React Native here](hermes). Hermes helps improve app performance and also exposes ways to analyze the performance of the JavaScript that it runs.

In this section, you will learn how to profile your React Native app running on Hermes and how to visualize the profile using [the Performance tab on Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)

> Be sure to [enable hermes in your app](hermes) before you get started!

Follow the instructions below to get started profiling:

1. [Record a Hermes sampling profile](profile-hermes.md#record-a-hermes-sampling-profile)
2. [Execute command from CLI](profile-hermes.md#execute-command-from-cli)
3. [Open the downloaded profile on Chrome DevTools](profile-hermes.md#open-the-downloaded-profile-on-chrome-devtools)

## Record a Hermes sampling profile

To record a sampling profiler from the Developer Menu:

1. Navigate to your running Metro server terminal.
2. Press `d` to open the **Developer Menu.**
3. Select **Enable Sampling Profiler.**
4. Execute your JavaScript by in your app (press buttons, etc.)
5. Open the **Developer Menu** by pressing `d` again.
6. Select **Disable Sampling Profiler** to stop recording and save the sampling profiler.

A toast will show the location where the sampling profiler has been saved, usually in `/data/user/0/com.appName/cache/*.cpuprofile`

<img src="/docs/assets/HermesProfileSaved.png" height=465 width=250 alt="Toast Notification of Profile saving">

## Execute command from CLI

You can use the [React Native CLI](https://github.com/react-native-community/cli) to convert the Hermes tracing profile to Chrome tracing profile, and then pull it to your local machine using:

```sh
npx react-native profile-hermes [destinationDir]
```

### Enabling source map

A source map is used to enhance the profile and associate trace events with the application code. You can automatically generate a source map when converting the Hermes tracing profile to a Chrome tracing profile by enabling `bundleInDebug` if the app is running in development mode. This allows React Native to build the bundle during its running process. Here's how:

1. In your app's `android/app/build.gradle` file, add:

```java
project.ext.react = [
  bundleInDebug: true,
]
```

> Be sure to clean the build whenever you make any changes to `build.gradle`

2. Clean the build by running:

```sh
cd android && ./gradlew clean
```

3. Run your app:

```sh
npx react-native run-android
```

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

 <img src="/docs/assets/openChromeProfile.png" alt="Loading a performance profile on Chrome DevTools">

## How does the Hermes Profile Transformer work?

The Hermes Sample Profile is of the `JSON object format`, while the format that Google's DevTools supports is `JSON Array Format`. (More information about the formats can be found on the [Trace Event Format Document](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview))

```ts
export interface HermesCPUProfile {
  traceEvents: SharedEventProperties[];
  samples: HermesSample[];
  stackFrames: { [key in string]: HermesStackFrame };
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

<img src="/docs/assets/CallStackDemo.jpg" height=800 width=600 alt="CallStack Terms Explained">

You can now construct a `flamechart` of function calls as you have all the function information including its start and end timestamps.

The `hermes-profile-transformer` can convert any profile generated using Hermes into a format that can be directly displayed in Chrome DevTools. More information about this can be found on [ `@react-native-community/hermes-profile-transformer` ](https://github.com/react-native-community/hermes-profile-transformer)
