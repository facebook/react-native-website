---
id: react-devtools
title: React DevTools
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[React DevTools](https://github.com/facebook/react/tree/main/packages/react-devtools) can be used to debug the React component hierarchy within your app.

The standalone version of React DevTools allows connecting to React Native apps. To use it, install or run the `react-devtools` package. It should connect to your simulator within a few seconds.

```sh
npx react-devtools
```

![The React DevTools interface](/docs/assets/debugging-react-devtools-detail.jpg)

<details>
<summary>💡 Installing React DevTools globally</summary>

We recommend running `react-devtools` via `npx`, but you can also install a given version globally.

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```sh
npm install -g react-devtools
```

</TabItem>
<TabItem value="yarn">

```shell
yarn global add react-devtools
```

</TabItem>
</Tabs>

Then, run the global `react-devtools` command:

```sh
react-devtools
```

</details>

<details>
<summary>💡 Adding React DevTools as a project dependency</summary>

If you prefer to avoid global installations, you can add `react-devtools` as a project dependency. Add the `react-devtools` package to your project using `npm install --save-dev react-devtools`, then add `"react-devtools": "react-devtools"` to the `scripts` section in your `package.json`, and then run `npm run react-devtools` from your project folder to open the DevTools.

</details>

:::tip
Learn more about using DevTools in the [React Developer Tools guide on react.dev](https://react.dev/learn/react-developer-tools).
:::

## Integration with the Element Inspector

React Native provides an Element Inspector, available under the Dev Menu as "Show Element Inspector". The inspector lets you tap on any UI element and see information about it.

![Video of the Element Inspector interface](/docs/assets/debugging-element-inspector.gif)

When React DevTools is connected, the Element Inspector will enter a **collapsed mode**, and instead use DevTools as the primary UI. In this mode, clicking on something in the simulator will navigate to the relevant component in DevTools.

You can select "Hide Element Inspector" in the same menu to exit this mode.

![React DevTools Element Inspector integration](/docs/assets/debugging-element-inspector-react-devtools.gif)

## Debugging application state

[Reactotron](https://github.com/infinitered/reactotron) is an open-source desktop app that allows you to inspect Redux or MobX-State-Tree application state as well as view custom logs, run custom commands such as resetting state, store and restore state snapshots, and other helpful debugging features for React Native apps.

You can view installation instructions [in the README](https://github.com/infinitered/reactotron). If you're using Expo, here is an article detailing [how to install on Expo](https://shift.infinite.red/start-using-reactotron-in-your-expo-project-today-in-3-easy-steps-a03d11032a7a).

## Troubleshooting

:::tip
Once you have React DevTools running, follow the instructions. If you had your application running prior to opening React DevTools, you may need to [open the Dev Menu](./debugging#accessing-the-dev-menu) to connect it.

![React DevTools connection flow](/docs/assets/debugging-react-devtools-connection.gif)
:::

:::info
If connecting to an Android emulator proves troublesome, try running `adb reverse tcp:8097 tcp:8097` in a new terminal.
:::
