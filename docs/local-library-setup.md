---
id: local-library-setup
title: Local libraries setup
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

The local library is created outside of the `android/` and `ios/` folders and makes use of autolinking to integrate with your app. To create local library we will use [create-react-native-library](https://callstack.github.io/react-native-builder-bob/create). This tool contains all the necessary templates.

### Getting Started

Inside your React Native application's root folder, run the following command:

```shell
npx create-react-native-library@latest awesome-module
```

Where `awesome-module` is the name you would like for the new module. After going through the prompts, you will have a new folder called `modules` in your project's root directory which contains the new module.

### Linking

By default, the generated library is automatically linked to the project using `link:` protocol when using Yarn and `file:` when using npm:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>

<TabItem value="npm">

```json
"dependencies": {
  "awesome-module": "file:./modules/awesome-module"
}
```

</TabItem>
<TabItem value="yarn">

```json
"dependencies": {
  "awesome-module": "link:./modules/awesome-module"
}
```

</TabItem>
</Tabs>

This creates a symlink to the library under `node_modules` which makes autolinking work.

### Installing dependencies

To link the module you need to install dependencies:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>

<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

### Using module inside your app

To use the module inside your app, you can import it by its name:

```js
import {multiply} from 'awesome-module';
```
