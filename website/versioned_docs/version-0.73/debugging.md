---
id: debugging
title: Debugging Basics
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Accessing the Dev Menu

React Native provides an in-app developer menu which offers several debugging options. You can access the Dev Menu by shaking your device or via keyboard shortcuts:

- iOS Simulator: <kbd>Cmd ⌘</kbd> + <kbd>D</kbd> (or Device > Shake)
- Android emulators: <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) or <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows and Linux)

Alternatively for Android devices and emulators, you can run `adb shell input keyevent 82` in your terminal.

![The React Native Dev Menu](/docs/assets/debugging-dev-menu.jpg)

:::note
The Dev Menu is disabled in release (production) builds.
:::

## Opening the Debugger

The debugger allows you to understand and debug how your JavaScript code is running, similar to a web browser.

:::info
**In Expo projects**, press <kbd>j</kbd> in the CLI to directly open the Hermes Debugger.
:::

<Tabs groupId="js-debugger" queryString defaultValue={constants.defaultJsDebugger} values={constants.jsDebuggers}>
<TabItem value="hermes">

Hermes supports the Chrome debugger by implementing the Chrome DevTools Protocol. This means Chrome's tools can be used to directly debug JavaScript running on Hermes, on an emulator or on a physical device.

1. In a Chrome browser window, navigate to `chrome://inspect`.
2. Use the "Configure..." button to add the dev server address (typically `localhost:8081`).
3. You should now see a "Hermes React Native" target with an **"inspect"** link. Click this to open the debugger.

![Overview of Chrome's inspect interface and a connected Hermes debugger window](/docs/assets/debugging-hermes-debugger-instructions.jpg)

</TabItem>
<TabItem value="flipper">

[Flipper](https://fbflipper.com/) is a native debugging tool which provides JavaScript debugging capabilities for React Native via an embedded Chrome DevTools panel.

To debug JavaScript code in Flipper, select **"Open Debugger"** from the Dev Menu. Learn more about Flipper [here](https://fbflipper.com/docs/features/react-native/).

:::info
To debug using Flipper, the Flipper app must be [installed on your system](https://fbflipper.com/docs/getting-started/).
:::

![The Flipper desktop app opened to the Hermes debugger panel](/docs/assets/debugging-flipper-console.jpg)

:::warning
Debugging React Native apps with Flipper is [deprecated in React Native 0.73](https://github.com/react-native-community/discussions-and-proposals/pull/641). We will eventually remove out-of-the box support for JS debugging via Flipper.
:::

</TabItem>
<TabItem value="new-debugger">

:::note
**This is an experimental feature** and several features may not work reliably today. When this feature does launch in future, we intend for it to work more completely than the current debugging methods.
:::

The React Native team is working on a new JavaScript debugger experience, intended to replace Flipper, with a preview available as of React Native 0.73.

The new debugger can be enabled via React Native CLI. This will also enable <kbd>j</kbd> to debug.

```sh
npx react-native start --experimental-debugger
```

When selecting **"Open Debugger"** in the Dev Menu, this will launch the new debugger using Google Chrome or Microsoft Edge.

![The new debugger frontend opened to the "Welcome" pane](/docs/assets/debugging-debugger-welcome.jpg)

</TabItem>
</Tabs>

## React DevTools

You can use React DevTools to inspect the React element tree, props, and state.

```sh
npx react-devtools
```

![A React DevTools window](/docs/assets/debugging-react-devtools-blank.jpg)

:::tip

**Learn how to use React DevTools!**

- [React DevTools guide](/docs/next/react-devtools)
- [React Developer Tools on react.dev](https://react.dev/learn/react-developer-tools)

:::

## LogBox

Errors and warnings in development builds are displayed in LogBox inside your app.

![A LogBox warning and an expanded LogBox syntax error](/docs/assets/debugging-logbox.jpg)

:::note
LogBox is disabled in release (production) builds.
:::

### Console Errors and Warnings

Console errors and warnings are displayed as on-screen notifications with a red or yellow badge, and a notification count. To see more about an error or warning, tap the notification to see an expanded view and to paginate through other logs.

LogBox notifications can be disabled using `LogBox.ignoreAllLogs()`. This can be useful when giving product demos, for example. Additionally, notifications can be disabled on a per-log basis via `LogBox.ignoreLogs()`. This can be useful for noisy warnings or those that cannot be fixed, e.g. in a third-party dependency.

:::info
Ignore logs as a last resort and create a task to fix any logs that are ignored.
:::

```js
import {LogBox} from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs([
  // Exact message
  'Warning: componentWillReceiveProps has been renamed',

  // Substring or regex match
  /GraphQL error: .*/,
]);

// Ignore all log notifications
LogBox.ignoreAllLogs();
```

### Syntax Errors

When a JavaScript syntax error occurs, LogBox will open with the location of the error. In this state, LogBox is not dismissable since your code cannot be executed. LogBox will automatically dismiss once the syntax error is fixed — either via Fast Refresh or after a manual reload.

## Performance Monitor

On Android and iOS, an in-app performance overlay can be toggled during development by selecting **"Perf Monitor"** in the Dev Menu. Learn more about this feature [here](/docs/performance).

![The Performance Monitor overlay on iOS and Android](/docs/assets/debugging-performance-monitor.jpg)

:::info
The Performance Monitor runs in-app and is a guide. We recommend investigating the native tooling under Android Studio and Xcode for accurate performance measurements.
:::
