---
id: react-native-devtools
title: React Native DevTools
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native DevTools is our new debugging experience featuring an end-to-end rewrite of our debugger stack. It aims to be more deeply integrated and fundamentally more reliable than previous debugging methods in React Native.

![React Native DevTools opened to the "Welcome" pane](/docs/assets/debugging-rndt-welcome.jpg)

React Native DevTools is designed for debugging React app concerns, and not to replace native tools. If you want to inspect React Native’s underlying platform layers (for example, while developing a Native Module), please use the debugging tools available in Android Studio and Xcode (see [Debugging Native Code](/docs/next/debugging-native-code)).

<details>
<summary>**💡 Compatibility** — released in 0.76</summary>

React Native DevTools supports all React Native apps running Hermes. It replaces the previous Flipper, Experimental Debugger, and Hermes debugger (Chrome) frontends.

It is not possible to set up React Native DevTools with any older versions of React Native.

- **Chrome Browser DevTools — unsupported**
  - Connecting to React Native via `chrome://inspect` is no longer supported. Features may not work correctly, as the latest versions of Chrome DevTools (which are built to match the latest browser capabilities and APIs) have not been tested, and this frontend lacks our customisations. Instead, we ship a supported version with React Native DevTools.
- **Visual Studio Code — unsupported** (pre-existing)
  - Third party extensions such as [Expo Tools](https://github.com/expo/vscode-expo) and [Radon IDE](https://ide.swmansion.com/) may have improved compatibility, but are not directly supported by the React team.

</details>
<details>
<summary>**💡 Feedback & FAQs**</summary>

We want the tooling you use to debug React across all platforms to be reliable, familiar, simple, and cohesive. All the features described on this page are built with these principles in mind, and we also want to offer more capabilities in future.

We are actively iterating on the future of React Native DevTools, and have created a centralized [GitHub discussion](https://github.com/react-native-community/discussions-and-proposals/discussions/819) to keep track of issues, frequently asked questions, and feedback.

</details>

## Core features

React Native DevTools is based on the Chrome DevTools frontend. If you have a web development background, its features should be familiar. As a starting point, we recommend browsing the [Chrome DevTools docs](https://developer.chrome.com/docs/devtools) which contain full guides as well as video resources.

### Console

![A series of logs React Native DevTools Sources view, alongside a device](/docs/assets/debugging-rndt-console.jpg)

The Console panel allows you to view and filter messages, evaluate JavaScript, inspect object properties, and more.

[Console features reference | Chrome DevTools](https://developer.chrome.com/docs/devtools/console/reference)

#### Useful tips

- If your app has a lot of logs, use the filter box or change the log levels that are shown.
- Watch values over time with [Live Expressions](https://developer.chrome.com/docs/devtools/console/live-expressions).
- Persist messages across reloads with [Preserve Logs](https://developer.chrome.com/docs/devtools/console/reference#persist).
- Use <kbd>Ctrl</kbd> + <kbd>L</kbd> to clear the console view.

### Sources & breakpoints

![A paused breakpoint in the React Native DevTools Sources view, alongside a device](/docs/assets/debugging-rndt-sources-paused-with-device.jpg)

The Sources panel allows you to view the source files in your app and register breakpoints. Use a breakpoint to define a line of code where your app should pause — allowing you to inspect the live state of the program and incrementally step through code.

[Pause your code with breakpoints | Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/breakpoints)

:::tip

#### Mini-guide

Breakpoints are a fundamental tool in your debugging toolkit!

1. Navigate to a source file using the sidebar or <kbd>Cmd ⌘</kbd>+<kbd>P</kbd> / <kbd>Ctrl</kbd>+<kbd>P</kbd>.
2. Click in the line number column next to a line of code to add a breakpoint.
3. Use the navigation controls at the top right to [step through code](https://developer.chrome.com/docs/devtools/javascript/reference#stepping) when paused.

:::

#### Useful tips

- A "Paused in Debugger" overlay will appear when your app is paused. Tap it to resume.
- Pay attention to the right hand side panels when on a breakpoint, which allow you to inspect the current scope and call stack, and set watch expressions.
- Use a `debugger;` statement to quickly set a breakpoint from your text editor. This will reach the device immediately via Fast Refresh.
- There are multiple kinds of breakpoints! For example, [Conditional Breakpoints and Logpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints#overview).

### Memory

![Inspecting a heap snapshot in the Memory panel](/docs/assets/debugging-rndt-memory.jpg)

The Memory panel allows you to take a heap snapshot and view the memory usage of your JavaScript code over time.

[Record heap snapshots | Chrome DevTools](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots)

#### Useful tips

- Use <kbd>Cmd ⌘</kbd>+<kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>F</kbd> to filter for specific objects in the heap.
- Taking an [allocation timeline report](https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler) can be useful to see memory usage over time as a graph, to identify possible memory leaks.

## React DevTools features

In the integrated Components and Profiler panels, you'll find all the features of the [React DevTools](https://react.dev/learn/react-developer-tools) browser extension. These work seamlessly in React Native DevTools.

### React Components

![Selecting and locating elements using the React Components panel](/docs/assets/debugging-rndt-react-components.gif)

The React Components panel allows you to inspect and update the rendered React component tree.

- Hover or select an element in DevTools to highlight it on device.
- To locate an element in DevTools, click the top-left "Select element" button, then tap any element in the app.

#### Useful tips

- Props and state on a component can be viewed and modified at runtime using the right hand panel.
- Components optimized with [React Compiler](https://react.dev/learn/react-compiler) will be annotated with a "Memo ✨" badge.

:::tip

#### Protip: Highlight re-renders

Re-renders can be a significant contributor to performance issues in React apps. DevTools can highlight component re-renders as they happen.

- To enable, click the View Settings (`⚙︎`) icon and check "Highlight updates when components render".

![Location of the "highlight updates" setting, next to a recording of the live render overlay](/docs/assets/debugging-rndt-highlight-renders.gif)

:::

### React Profiler

![A profile rendered as a flame graph](/docs/assets/debugging-rndt-react-profiler.jpg)

The React Profiler panel allows you to record performance profiles to understand the timing of component renders and React commits.

For more info, see the [original 2018 guide](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html#reading-performance-data) (note that parts of this may be outdated).

## Reconnecting DevTools

Occasionally, DevTools might disconnect from the target device. This can happen if:

- The app is closed.
- The app is rebuilt (a new native build is installed).
- The app has crashed on the native side.
- The dev server (Metro) is quit.
- A physical device is disconnected.

On disconnect, a dialog will be shown with the message "Debugging connection was closed".

![A reconnect dialog shown when a device is disconnected](/docs/assets/debugging-reconnect-menu.jpg)

From here, you can either:

- **Dismiss**: Select the close (`×`) icon or click outside the dialog to return to the DevTools UI in the last state before disconnection.
- **Reconnect**: Select "Reconnect DevTools", having addressed the reason for disconnection.
