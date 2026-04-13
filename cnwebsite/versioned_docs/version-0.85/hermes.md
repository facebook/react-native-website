---
id: hermes
title: 使用 Hermes
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<a href="https://hermesengine.dev">
  <img width={300} height={300} className="hermes-logo" src="/docs/assets/HermesLogo.svg" style={{height: "auto"}}/>
</a>

[Hermes](https://hermesengine.dev) 是一个专门针对 React Native 应用而优化的开源 JavaScript 引擎。对于很多应用来说，使用 Hermes 引擎可以缩短启动时间，减少内存占用以及包体积（相比 JavaScriptCore）。
Hermes 已被 React Native 默认使用，无需额外配置即可启用。

## Bundled Hermes

React Native 自带一个**捆绑版本**的 Hermes。
每当我们发布新版本的 React Native 时，都会为你构建对应版本的 Hermes。这确保你使用的 Hermes 版本与你使用的 React Native 版本完全兼容。

这个变更对 React Native 用户来说是完全透明的。你仍然可以使用本页描述的方式禁用 Hermes。
你可以[在此页面上阅读更多有关技术实现的信息](/architecture/bundled-hermes)。

## 确认 Hermes 是否启用

如果你最近从头创建了一个新应用，可以在欢迎视图中查看 Hermes 是否已启用：

<figure>
<img src="/docs/assets/HermesApp.png" height="600" alt="在新项目中查看 JS 引擎状态的位置" />
</figure>

JavaScript 中可以使用一个名为 `HermesInternal` 的全局变量来验证是否正在使用 Hermes：

```jsx
const isHermes = () => !!global.HermesInternal;
```

:::caution
如果你使用了非标准的 JS bundle 加载方式，则可能会出现虽然 `HermesInternal` 变量存在，但并没有使用高度优化的预编译字节码的情况。请确认你正在使用 `.hbc` 文件，并按照以下说明进行性能对比测试。
:::

要了解 Hermes 的优势，请尝试构建应用的发布版本进行对比。例如，在项目根目录下执行：

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Android'

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android -- --mode="release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android --mode release
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ios">

[//]: # 'iOS'

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --mode="Release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --mode Release
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

这将在构建时将 JavaScript 编译为 Hermes 字节码，从而提高应用在设备上的启动速度。

## 切换回 JavaScriptCore

React Native 也支持使用 JavaScriptCore 作为 [JavaScript 引擎](javascript-environment)。请按照[社区仓库的说明](https://github.com/react-native-community/javascriptcore)来退出使用 Hermes。
