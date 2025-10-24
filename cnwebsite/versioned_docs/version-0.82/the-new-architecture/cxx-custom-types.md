---
id: cxx-custom-types
title: 支持自定义 C++ 类型
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

默认情况下，C++ Turbo Native 模块支持大多数 `std::` 标准类型的[桥接功能](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactCommon/react/bridging)。

如果您想在应用程序 / 库中添加对新 / 自定义类型的支持，则只需提供必要的`桥接`头文件即可。

本指南延续上一节[C++ Turbo 原生模块](./cxx-cxxturbomodules)。

## 实例: Int64

C++ Turbo 原生模块尚不支持`int64_t`数字 - 因为 JavaScript 不支持大于`2^53`的数字。

我们无法将 > `2^53` 的数字表示为JavaScript 的`number`类型，但我们可以将它们表示为 JavaScript 的`string`类型并通过在`tm`文件夹中创建名为`Int64.h`的自定义桥接头文件来自动把它们转换到 C++ 的`int64_t`类型: 

```cpp Int64.h
#pragma once

#include <react/bridging/Bridging.h>

namespace facebook::react {

template <>
struct Bridging<int64_t> {
  static int64_t fromJs(jsi::Runtime &rt, const jsi::String &value) {
    try {
      size_t pos;
      auto str = value.utf8(rt);
      auto num = std::stoll(str, &pos);
      if (pos != str.size()) {
        throw std::invalid_argument("Invalid number"); // don't support alphanumeric strings
      }
      return num;
    } catch (const std::logic_error &e) {
      throw jsi::JSError(rt, e.what());
    }
  }

  static jsi::String toJs(jsi::Runtime &rt, int64_t value) {
    return bridging::toJs(rt, std::to_string(value));
  }
};

} // namespace facebook::react
```

自定义的桥接头文件的关键组件包括：

- 明确指定`Bridging`结构体为自定义的类型，本例中为`int64_t`
- 一个 `fromJs` 函数将从 `jsi::` 类型转换为自定义的类型
- 一个 `toJS` 函数将从自定义的类型转换为 `jsi:` 类型

省略任一函数都会使你的桥接头文件成为 _只读_ 或 _只写_ 。

现在，您可以向JavaScript规范添加以下函数：

<Tabs groupId="turbomodule-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="NativeSampleModule.ts"
   // ...
   readonly cubicRoot: (input: string) => number;
   // ..
```

</TabItem>
<TabItem value="flow">

```js title="NativeSampleModule.js"
   // ...
   +cubicRoot: (input: string) => number;
   // ..
```

</TabItem>
</Tabs>

在你的 `NativeSampleModule.h` 文件中声明它并包含 `Int64.h` 头文件：

```cpp
//...
#include "Int64.h"
//...
int32_t cubicRoot(jsi::Runtime& rt, int64_t input);
```

并将其实现在`NativeSampleModule.cpp`中：

```cpp
//...
#include <cmath>
//...
int32_t NativeSampleModule::cubicRoot(jsi::Runtime& rt, int64_t input) {
    return std::cbrt(input);
}
```

在您的应用中，您可以通过以下方式调用此新的本地函数：

```js
<Section title="Cxx TurboModule">
  NativeSampleModule.cubicRoot(...) ={' '}
  {JSON.stringify(
    NativeSampleModule.cubicRoot('9223372036854775807'),
  )}
</Section>
```

应该返回 `2097152`。

## 任意自定义类型

与上面的示例类似，您现在可以为要公开给 React Native 的任何自定义 C++ 类型编写自定义桥接功能。例如，您可以在 C++ Turbo 原生模块中添加对`folly::StringPiece`、`QString`、`boost::filesystem::path`、`absl::optional`或其他任何需要支持的类型。

```cpp title="Path.h"
#pragma once

#include <react/bridging/Bridging.h>
#include <boost/filesystem.hpp>

namespace facebook::react {

template<>
struct Bridging<boost::filesystem::path> {
  static boost::filesystem::path fromJs(jsi::Runtime& rt, const std::string& value) { // auto-bridge from jsi::String to std::string
    return boost::filesystem::path(value);
  }

  static jsi::String toJs(jsi::Runtime& rt, boost::filesystem::path value) {
    return bridging::toJs(rt, value.string());
  }
};

} // namespace facebook::react
```

## 自定义结构体

你可以使用相同的方法来处理 JavaScript 中的自定义类型，例如：

```js
export type CustomType = {
  key: string,
  enabled: boolean,
  time?: number,
};
```

可以通过 C++ Turbo 原生模块公开访问

<Tabs groupId="turbomodule-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="NativeSampleModule.ts"
   // ...
   readonly passCustomType: (input: CustomType) => CustomType;
   // ..
```

</TabItem>
<TabItem value="flow">

```js title="NativeSampleModule.js"
   // ...
   +passCustomType: (input: CustomType) => CustomType;
   // ..
```

</TabItem>
</Tabs>

### 手动声明类型

要在 C++ 中使用此自定义类型，您需要在`NativeSampleModule.h`文件中直接定义自己的结构体和桥接函数：

```cpp
struct CustomType {
  std::string key;
  bool enabled;
  std::optional<int32_t> time;
};

template <>
struct Bridging<CustomType> {
  static CustomType fromJs(
      jsi::Runtime &rt,
      const jsi::Object &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    return CustomType{
        bridging::fromJs<std::string>(
            rt, value.getProperty(rt, "key"), jsInvoker),
        bridging::fromJs<bool>(
            rt, value.getProperty(rt, "enabled"), jsInvoker),
        bridging::fromJs<std::optional<int32_t>>(
            rt, value.getProperty(rt, "time"), jsInvoker)};
  }

  static jsi::Object toJs(jsi::Runtime &rt, const CustomType &value) {
    auto result = facebook::jsi::Object(rt);
    result.setProperty(rt, "key", bridging::toJs(rt, value.key));
    result.setProperty(rt, "enabled", bridging::toJs(rt, value.enabled));
    if (value.time) {
      result.setProperty(rt, "time", bridging::toJs(rt, value.time.value()));
    }
    return result;
  }
};
```

在你的 `NativeSampleModule.h` 文件中声明它：

```cpp
  CustomType passCustomType(jsi::Runtime& rt, CustomType input);
```

在 `NativeSampleModule.cpp` 文件中实现:

```cpp
CustomType NativeSampleModule::passCustomType(jsi::Runtime& rt, CustomType input) {
  input.key = "1909";
  input.enabled = !input.enabled;
  input.time = 42;
  return input;
}
```

在应用中，可以通过以下方式调用此新的原生函数：

```js
<Section title="Cxx TurboModule">
  NativeSampleModule.passCustomType(...) ={' '}
  {JSON.stringify(
    NativeSampleModule.passCustomType({
      key: '123',
      enabled: true,
      time: undefined,
    }),
  )}
</Section>
```

应该会返回`{"key":"1909","enabled":false","time":42}`。

以上做法可行，但比较复杂。

### 结构体生成器

[**Codegen**](pillars-codegen.md) 支持 C++ Turbo 原生模块的结构体生成器，因此您可以将 `NativeSampleModule.h` 中的代码简化为：

```cpp
using CustomType = NativeSampleModuleBaseCustomType<std::string, bool, std::optional<int32_t>>;
template <>
struct Bridging<CustomType>
    : NativeSampleModuleBaseCustomTypeBridging<std::string, bool, std::optional<int32_t>> {};
```

使用 `using CustomType` 可以为你的具体结构体声明一个名称。

#### 成员类型

使用 `std::string、bool 和 std::optional<int32_t>`，您可以按照在 JavaScript 规范中定义的顺序定义结构成员的属性类型。**顺序很重要**。第一个模板参数指的是结构体的第一个数据类型，依此类推。

如果没有任何自定义转换函数：

- 您只能将 JS 字符串桥接到 [std::string](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactCommon/react/bridging/AString.h)，并将 JS 布尔值桥接到 [bool](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactCommon/react/bridging/Bool.h)。
- 但是您可以选择不同的 JS `number` 的[C++表示方式](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactCommon/react/bridging/Number.h)。

#### 基类

`NativeSampleModuleBaseCustomType` 是在你的 `AppSpecsJSI.h` 中自动生成的模板，其名称由以下内容生成：

- `NativeSampleModule`（C++ Turbo 原生模块在 JavaScript 规范中的名称）+
- `Base`（常量）+
- `CustomType`（JavaScript 规范中类型的名称）

同样的命名规则也适用于必要的 `Bridging` 结构体，该结构体通过 `struct Bridging<CustomType>` 定义。
