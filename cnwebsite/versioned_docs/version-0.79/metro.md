---
id: metro
title: Metro
---

React Native 使用[Metro](https://metrobundler.dev/)构建 JavaScript 代码和资源。

## 配置 Metro

可以在项目的`metro.config.js`文件中自定义 Metro 的配置选项。它可以导出:

- **一个对象(推荐)**,将与 Metro 的内部配置默认值合并。
- [**一个函数**](#advanced-using-a-config-function),该函数将使用 Metro 的内部配置默认值被调用,并返回最终的配置对象。

:::tip
请查看 Metro 网站上的[**配置 Metro**](https://metrobundler.dev/docs/configuration),了解所有可用的配置选项文档。
:::

在 React Native 中,你的 Metro 配置应该扩展[`@react-native/metro-config`](https://www.npmjs.com/package/@react-native/metro-config)或[`@expo/metro-config`](https://www.npmjs.com/package/@expo/metro-config)。这些包含构建和运行 React Native 应用所需的基本默认值。

下面是 React Native 模板项目中默认的`metro.config.js`文件:

```js
const {
  getDefaultConfig,
  mergeConfig,
} = require('@react-native/metro-config');

/**
 * Metro配置
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

你希望自定义的 Metro 选项可以在`config`对象中完成。

### 高级:使用配置函数

导出一个配置函数是自行管理最终配置的选择 - **Metro 不会应用任何内部默认值**。当需要从 Metro 读取基础默认配置对象或动态设置选项时,此模式会很有用。

:::info
**从`@react-native/metro-config` 0.72.1 开始**,不再需要使用配置函数来访问完整的默认配置。请参阅下面的**提示**部分。
:::

```js
const {
  getDefaultConfig,
  mergeConfig,
} = require('@react-native/metro-config');

module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(
    baseConfig,
    getDefaultConfig(__dirname),
  );
  const {
    resolver: {assetExts, sourceExts},
  } = defaultConfig;

  return mergeConfig(defaultConfig, {
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  });
};
```

:::tip
使用配置函数是为高级用例而设计的。如需自定义`sourceExts`等选项,一种更简单的方法是从`@react-native/metro-config`中读取这些默认值。

**替代方案**

```js
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

**但是!**,我们建议在覆盖这些配置值时复制并编辑 - 将真实来源放在你的配置文件中。

✅ **推荐**

```js
const config = {
  resolver: {
    sourceExts: ['js', 'ts', 'tsx', 'svg'],
  },
};
```

:::

## 了解更多关于 Metro 的信息

- [Metro 网站](https://metrobundler.dev/)
- [视频: "Metro & React Native DevX" 在 App.js 2023 上的演讲](https://www.youtube.com/watch?v=c9D4pg0y9cI)
