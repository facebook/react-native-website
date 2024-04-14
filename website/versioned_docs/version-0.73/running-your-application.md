---
id: running-your-application
title: Running Your React Native Application
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

### Step 1: Start Metro

[**Metro**](https://metrobundler.dev/) is the JavaScript build tool for React Native. To start the Metro development server, run the following from your project folder:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

:::note
If you're familiar with web development, Metro is similar to bundlers such as Vite and webpack, but is designed end-to-end for React Native. For instance, Metro uses [Babel](https://babel.dev/) to transform syntax such as JSX into executable JavaScript.
:::

### Step 2: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

If everything is set up correctly, you should see your new app running in your Android emulator shortly.

This is one way to run your app - you can also run it directly from within Android Studio.

> If you can't get this to work, see the [Troubleshooting](troubleshooting.md) page.

### Modifying your app

Now that you have successfully run the app, let's modify it.

- Open `App.tsx` in your text editor of choice and edit some lines.
- Press the <kbd>R</kbd> key twice or select `Reload` from the Dev Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd>) to see your changes!

### That's it!

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](integration-with-existing-apps.md).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).
