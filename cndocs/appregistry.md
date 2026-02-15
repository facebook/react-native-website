---
id: appregistry
title: AppRegistry
---

<div className="banner-native-code-required">
  <h3>Project with Native Code Required</h3>
  <p>If you are using the managed Expo workflow there is only ever one entry component registered with <code>AppRegistry</code> and it is handled automatically (or through <a href="https://docs.expo.dev/versions/latest/sdk/register-root-component/">registerRootComponent</a>). You do not need to use this API.</p>
</div>

`AppRegistry` 是运行所有 React Native 应用程序的 JS 入口点。应用程序根组件应使用“AppRegistry.registerComponent”注册自身，然后本机系统可以加载应用程序的捆绑包，然后在准备就绪时通过调用“AppRegistry.runApplication”实际运行该应用程序。

```tsx
import {Text, AppRegistry} from 'react-native';

const App = () => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
```

要在视图被销毁时“停止”应用程序，请使用传递到“runApplication”的标签调用“AppRegistry.unmountApplicationComponentAtRootTag”。这些应该始终成对使用。

`AppRegistry` 应该在 `require` 序列的早期被调用，以确保在需要其他模块之前已经设置好 JS 执行环境。

---

＃ 参考

＃＃ 方法

### `getAppKeys()`

```tsx
static getAppKeys(): string[];
```

返回一个字符串数组。

---

### `getRegistry()`

```tsx
static getRegistry(): {sections: string[]; runnables: Runnable[]};
```

返回一个 [Registry](appregistry#registry) 对象。

---

### `getRunnable()`

```tsx
static getRunnable(appKey: string): : Runnable | undefined;
```

返回一个 [Runnable](appregistry#runnable) 对象。

**参数：**

|名称 |类型 |
| ----------------------------------------------------------- | ------ |
| appKey <div className="label basic required">必需</div> |字符串|

---

### `getSectionKeys()`

```tsx
static getSectionKeys(): string[];
```

返回一个字符串数组。

---

### `getSections()`

```tsx
static getSections(): Record<string, Runnable>;
```

返回一个 [Runnables](appregistry#runnables) 对象。

---

### `registerCancellableHeadlessTask()`

```tsx
static registerCancellableHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
  taskCancelProvider: TaskCancelProvider,
);
```

注册一个可以取消的无头任务。无头任务是在没有 UI 的情况下运行的一段代码。

**参数：**

|名称 |类型 |描述 |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| taskKey<br/><div className="标签基本必填两行">必填</div> |字符串|调用 startHeadlessTask 时使用的此任务实例的本机 ID。                                                                                                                                               |
| taskProvider<br/><div className="label basic required两行">必填</div> | [任务提供程序](appregistry#taskprovider) |一个承诺返回函数，将从本机端传递的一些数据作为唯一的参数。当 Promise 被解决或拒绝时，本机端会收到此事件的通知，并且它可能会决定销毁 JS 上下文。 || taskCancelProvider<br/><div className="label basic required两行">必填</div> | [TaskCancelProvider](appregistry#taskcancelprovider) |一个不带参数的 void 返回函数；当请求取消时，taskProvider 正在执行的函数应该尽快结束并返回。                                                                    |

---

### `注册组件()`

```tsx
static registerComponent(
  appKey: string,
  getComponentFunc: ComponentProvider,
  section?: boolean,
): string;
```

**参数：**

|名称 |类型 |
| ---------------------------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">必需</div> |字符串|
| componentProvider <div className="label basic required">必需</div> |组件提供者 |
|部分|布尔 |

---

### `registerConfig()`

```tsx
static registerConfig(config: AppConfig[]);
```

**参数：**

|名称 |类型 |
| ----------------------------------------------------------- | ------------------------------------------------ |
| config <div className="label basic required">必需</div> | [应用程序配置](appregistry#appconfig)[] |

---

### `registerHeadlessTask()`

```tsx
static registerHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
);
```

注册无头任务。无头任务是在没有 UI 的情况下运行的一段代码。

这是一种在应用程序处于后台时在 JavaScript 中运行任务的方法。例如，它可用于同步新数据、处理推送通知或播放音乐。

**参数：**

|名称 |类型 |描述 |
| --------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| taskKey <div className="标签基本必填两行">必填</div> |字符串|调用 startHeadlessTask 时使用的此任务实例的本机 ID。                                                                                                                                               |
| taskProvider <div className="标签基本必填两行">必填</div> | [任务提供程序](appregistry#taskprovider) |一个承诺返回函数，将从本机端传递的一些数据作为唯一的参数。当 Promise 被解决或拒绝时，本机端会收到此事件的通知，并且它可能会决定销毁 JS 上下文。 |

---

### `registerRunnable()`

```tsx
static registerRunnable(appKey: string, func: Runnable): string;
```

**参数：**

|名称 |类型 |
| ----------------------------------------------------------- | -------- |
| appKey <div className="label basic required">必需</div> |字符串|
|运行 <div className="label basic required">必需</div> |功能|

---

### `registerSection()`

```tsx
static registerSection(
  appKey: string,
  component: ComponentProvider,
);
```

**参数：**

|名称 |类型 |
| -------------------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">必需</div> |字符串|
|组件 <div className="label basic required">必需</div> |组件提供者 |

---

### `runApplication()`

```tsx
static runApplication(appKey: string, appParameters: any): void;
```

加载 JavaScript 包并运行应用程序。

**参数：**

|名称 |类型 |
| ------------------------------------------------------------------ | ------ |
| appKey <div className="label basic required">必需</div> |字符串|
| appParameters <div className="label basic required">必需</div> |任何|

---

### `setComponentProviderInstrumentationHook()`

```tsx
static setComponentProviderInstrumentationHook(
  hook: ComponentProviderInstrumentationHook,
);
```

**参数：**

|名称 |类型 |
| -------------------------------------------------------------------- | -------- |
| hook <div className="label basic required">必需</div> |功能|

有效的“hook”函数接受以下参数作为参数：

|名称 |类型 |
| ---------------------------------------------------------------------------------------- | ------------------ |
|组件 <div className="label basic required">必需</div> |组件提供者 |
| scopedPerformanceLogger <div className="label basic required">必需</div> |性能记录器 |

该函数还必须返回一个 React 组件。

---

### `setWrapperComponentProvider()`

```tsx
static setWrapperComponentProvider(
  provider: WrapperComponentProvider,
);
```

**参数：**

|名称 |类型 |
| ------------------------------------------------------------------------ | ----------------- |
|提供者 <div className="label basic required">必需</div> |组件提供者 |

---

### `startHeadlessTask()`

```tsx
static startHeadlessTask(
  taskId: number,
  taskKey: string,
  data: any,
);
```

仅从本机代码调用。启动无头任务。

**参数：**

|名称 |类型 |描述 |
| ------------------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------- |
| taskId <div className="label basic required">必填</div> |数量 |此任务实例的本机 ID，用于跟踪其执行情况。 |
| taskKey <div className="label basic required">必填</div> |字符串|任务启动的关键。                                       |
| data <div className="label basic required">必填</div> |任何|要传递给任务的数据。                                        |

---

### `unmountApplicationComponentAtRootTag()`

```tsx
static unmountApplicationComponentAtRootTag(rootTag: number);
```

当视图应该被销毁时停止应用程序。

**参数：**

|名称 |类型 |
| ------------------------------------------------------------------------ | ------ |
| rootTag <div className="label basic required">必需</div> |数量 |

## 类型定义

### 应用程序配置

`registerConfig` 方法的应用程序配置。

|类型 |
| ------ |
|对象|

**特性：**

|名称 |类型 |
| ----------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">必需</div> |字符串|
|组件|组件提供者 |
|运行|功能|
|部分|布尔 |

:::注意
每个配置都应该设置“组件”或“运行”功能。
:::

### 注册表

|类型 |
| ------ |
|对象|

**特性：**

|名称 |类型 |
| ---------| ------------------------------------------------------ |
|运行程序 | [Runnables](appregistry#runnable) 数组 |
|部分|字符串数组 |

### 可运行

|类型 |
| ------ |
|对象|

**特性：**

|名称 |类型 |
| ---------| ----------------- |
|组件|组件提供者 |
|运行|功能|

### 可运行的

键为 `appKey` 且值类型为 [`Runnable`](appregistry#runnable) 的对象。

|类型 |
| ------ |
|对象|

＃＃＃ 任务

“Task”是一个函数，它接受任何数据作为参数并返回一个解析为“undefined”的 Promise。

|类型 |
| -------- |
|功能|

### 任务取消器

“TaskCanceller”是一个不接受参数并返回 void 的函数。

|类型 |
| -------- |
|功能|

### 任务取消提供者

有效的 `TaskCancelProvider` 是一个返回 [`TaskCanceller`](appregistry#taskcanceller) 的函数。

|类型 |
| -------- |
|功能|

### 任务提供者

有效的 `TaskProvider` 是一个返回 [`Task`](appregistry#task) 的函数。

|类型 |
| -------- |
|功能|
