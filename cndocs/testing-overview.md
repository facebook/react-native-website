---
id: testing-overview
title: Testing
author: Vojtech Novak
authorURL: 'https://twitter.com/vonovak'
description: This guide introduces React Native developers to the key concepts behind testing, how to write good tests, and what kinds of tests you can incorporate into your workflow.
---

随着代码库的扩展，你意想不到的小错误和边缘情况可能会引发更大的失败。错误会导致糟糕的用户体验，最终导致业务损失。一种防止脆弱编程的方法是在发布到生产环境之前测试你的代码。

在本指南中，我们将介绍不同的自动化方法，从静态分析到端到端测试，以确保你的应用按预期工作。

<img src="/docs/assets/diagram_testing.svg" alt="Testing is a cycle of fixing, testing, and either passing to release or failing back into testing." />

## 为什么测试

我们都是人类，人类会犯错误。测试很重要，因为它可以帮助你发现这些错误，并验证你的代码是否按预期工作。也许更重要的是，测试确保了你的代码在添加新功能、重构现有代码或升级项目的主要依赖项时继续按预期工作。

测试比你想象的更有价值。修复代码中错误的一种最佳方法是编写一个失败的测试来暴露它。然后当你修复错误并重新运行测试时，如果测试通过，则意味着错误已修复，不会再次引入代码库。

测试还可以作为新加入团队的人的文档。对于从未见过代码库的人来说，阅读测试可以帮助他们理解现有代码的工作原理。

最后但并非最不重要的是，更多的自动化测试意味着更少的时间用于手动 <abbr title="Quality Assurance">QA</abbr>，节省了宝贵的时间。

## 静态分析

提高代码质量的第一步是开始使用静态分析工具。静态分析在编写代码时检查代码错误，但不会运行任何代码。

- **Linters** 分析代码以捕获常见的错误，如未使用的代码，并帮助避免使用 tabs 而不是 spaces 等风格指南的错误。
- **Type checking** 确保传递给函数的构造与函数设计接受的构造匹配，例如传递一个字符串到期望一个数字的计数函数。

React Native 自带两种这样的工具：[ESLint](https://eslint.org/) 用于 linting，[TypeScript](typescript) 用于类型检查。

## 编写可测试的代码

要开始测试，你首先需要编写可测试的代码。考虑一个飞机制造过程--在任何模型首次起飞以展示其复杂系统是否正常工作之前，各个部件都经过测试，以确保它们安全且正常工作。例如，机翼在极端负载下被弯曲测试；发动机部件被测试其耐用性；挡风玻璃被测试以模拟鸟类撞击。

软件开发也是如此。与将整个程序写在一个巨大的文件中，不如将代码写成多个小模块，这些模块可以更彻底地测试，而不是测试整个程序。这样，编写可测试的代码与编写干净、模块化的代码是相辅相成的。

为了使你的应用更易于测试，首先将你的应用的视图部分--你的 React 组件--与你的业务逻辑和应用状态分离（无论你使用的是 Redux、MobX 还是其他解决方案）。这样，你可以将业务逻辑的测试--不应依赖于你的 React 组件--与组件本身独立开来，组件的主要工作是渲染你的应用的 UI！

理论上，你可以将所有逻辑和数据获取从你的组件中移出。这样你的组件将专门用于渲染。你的状态将完全独立于你的组件。你的应用的逻辑将完全不依赖于任何 React 组件！

:::tip
我们鼓励你进一步探索可测试代码的主题，在其他学习资源中。
:::

## 编写测试

编写可测试的代码后，就可以编写一些实际的测试了！React Native 的默认模板附带 [Jest](https://jestjs.io) 测试框架。它包括一个针对此环境的预设，因此你可以在不进行配置调整的情况下快速上手--稍后将介绍[模拟](#mocking)。你可以使用 Jest 编写本指南中提到的所有类型的测试。

:::note
如果你进行测试驱动开发，你实际上是先编写测试！这样，代码的可测试性就得到了保证。
:::

### 结构化测试

你的测试应该简短且理想情况下只测试一件事。让我们从一个用 Jest 编写的示例单元测试开始：

```js
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

测试由传递给 [`it`](https://jestjs.io/docs/en/api#testname-fn-timeout) 函数的字符串描述。请仔细编写描述，以便清楚地说明正在测试的内容。尽你所能覆盖以下内容：

1. **Given** - 一些预条件
2. **When** - 由正在测试的函数执行的动作
3. **Then** - 预期的结果

这被称为 AAA（安排、行动、断言）。

Jest 提供了 [`describe`](https://jestjs.io/docs/en/api#describename-fn) 函数来帮助结构化你的测试。使用 `describe` 将属于一个功能的所有测试组合在一起。如果需要，描述可以嵌套。你还会经常使用 [`beforeEach`](https://jestjs.io/docs/en/api#beforeeachfn-timeout) 或 [`beforeAll`](https://jestjs.io/docs/en/api#beforeallfn-timeout) 来设置正在测试的对象。更多信息请参阅 [Jest api 参考](https://jestjs.io/docs/en/api)。

如果你的测试有很多步骤或很多期望，你可能需要将其拆分为多个更小的测试。同样，确保你的测试完全独立于其他测试。你的测试套件中的每个测试必须可以单独执行，而无需先运行其他测试。相反，如果你一起运行所有测试，第一个测试不能影响第二个测试的输出。

最后，作为开发人员，我们喜欢我们的代码工作良好且不崩溃。有了测试，这通常是相反的。将失败的测试视为 _好事情_！当测试失败时，通常意味着某些事情不正确。这给你一个机会在影响用户之前修复问题。

## 单元测试

单元测试覆盖代码的最小部分，如单个函数或类。

当正在测试的对象有任何依赖项时，你通常需要模拟它们，如下一节所述。

单元测试的优点是它们写起来很快，运行也很快。因此，在你工作时，你可以快速获得测试是否通过的反馈。Jest 甚至有一个选项可以持续运行与正在编辑的代码相关的测试：[Watch mode](https://jestjs.io/docs/en/cli#watch)。

<img src="/docs/assets/p_tests-unit.svg" alt=" " />

### 模拟

有时，当正在测试的对象有外部依赖项时，你可能需要"模拟"它们。"模拟"是指用你自己的实现替换代码的某些依赖项。

:::info
通常，在测试中使用真实对象比使用模拟更好，但有时这是不可能的。例如：当你的 JS 单元测试依赖于用 Java 或 Objective-C 编写的原生模块时。
:::

想象你正在编写一个显示你所在城市当前天气的应用，并且你正在使用一个提供天气信息的外部服务或其他依赖项。如果服务告诉你正在下雨，你想要显示一张带有雨云的图片。你不想在测试中调用那个服务，因为：

- 它会使测试变慢和不稳定（因为涉及网络请求）
- 服务每次运行测试时可能会返回不同的数据
- 第三方服务可以在你真正需要运行测试时离线！

因此，你可以提供一个服务的模拟实现，有效地替换数千行代码和一些连接互联网的温度计！

:::note
Jest 从函数到模块级别都支持[模拟](https://jestjs.io/docs/en/mock-functions#mocking-modules)。
:::

## 集成测试

在编写较大的软件系统时，其中的各个部分需要相互交互。在单元测试中，如果你的单元依赖于另一个单元，你有时会模拟依赖项，用一个假的单元替换它。

在集成测试中，真正的单元被组合在一起（与你的应用相同），并一起测试以确保它们协作正常。这不是说模拟不会在这里发生：你仍然需要模拟（例如，模拟与天气服务的通信），但与单元测试相比，需要的模拟要少得多。

:::info
请注意，关于集成测试的术语并不总是一致的。同样，单元测试和集成测试之间的界限并不总是清晰的。对于本指南，如果你的测试符合以下条件，则属于"集成测试"：

- 组合了你的应用的几个模块（如上所述）
- 使用外部系统
- 对其他应用（如天气服务 API）进行网络调用
- 进行任何类型的文件或数据库 <abbr title="Input/Output">I/O</abbr> 操作
:::

<img src="/docs/assets/p_tests-integration.svg" alt=" " />

## 组件测试

React 组件负责渲染你的应用，用户将直接与它们交互。即使你的应用的业务逻辑有很高的测试覆盖率并且是正确的，没有组件测试，你仍然可能向用户交付一个损坏的 UI。组件测试可以属于单元测试和集成测试，但由于它们是 React Native 的核心部分，我们将它们单独介绍。

对于测试 React 组件，你可能会想要测试以下内容：

- 交互：确保组件在用户交互时正确行为（例如，当用户按下按钮时）
- 渲染：确保组件的渲染输出正确（例如，按钮的外观和在 UI 中的位置）

例如，如果你有一个带有 `onPress` 监听器的按钮，你想要测试按钮是否正确显示，并且点击按钮时组件能够正确处理。

有几个库可以帮助你进行这些测试：

- React 的 [Test Renderer](https://reactjs.org/docs/test-renderer.html)，与核心一起开发，提供了一个 React 渲染器，可以用来将 React 组件渲染为纯 JavaScript 对象，而不依赖于 DOM 或原生移动环境。
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) 建立在 React 的测试渲染器之上，并添加了本段中描述的 `fireEvent` 和 `query` API。

:::warning
组件测试仅在 Node.js 环境中运行。它们不考虑任何 iOS、Android 或其他平台代码，这些代码支持 React Native 组件。因此，它们不能给你 100% 的信心确保一切正常工作。如果 iOS 或 Android 代码中存在错误，它们将无法找到。
:::

<img src="/docs/assets/p_tests-component.svg" alt=" " />

### 测试用户交互

除了渲染一些 UI，你的组件处理诸如 `TextInput` 的 `onChangeText` 或 `Button` 的 `onPress` 等事件。它们可能还包含其他函数和事件回调。考虑以下示例：

```tsx
function GroceryShoppingList() {
  const [groceryItem, setGroceryItem] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const addNewItemToShoppingList = useCallback(() => {
    setItems([groceryItem, ...items]);
    setGroceryItem('');
  }, [groceryItem, items]);

  return (
    <>
      <TextInput
        value={groceryItem}
        placeholder="Enter grocery item"
        onChangeText={text => setGroceryItem(text)}
      />
      <Button
        title="Add the item to list"
        onPress={addNewItemToShoppingList}
      />
      {items.map(item => (
        <Text key={item}>{item}</Text>
      ))}
    </>
  );
}
```

当测试用户交互时，从用户的角度测试组件--页面上有什么？交互时有什么变化？

作为一个经验法则，优先使用用户可以看到或听到的内容：

- 使用渲染的文本或 [accessibility helpers](https://reactnative.dev/docs/accessibility#accessibility-properties) 进行断言

相反，你应该避免：

- 对组件的 props 或状态进行断言
- 基于 testID 的查询

避免测试实现细节，如 props 或状态--虽然这些测试有效，但它们不是面向用户如何与组件交互的，并且容易在重构时（例如，当你想要重命名某些内容或重写使用 Hooks 的类组件时）失效。

:::info
类组件特别容易测试其实现细节，如内部状态、props 或事件处理程序。为了避免测试实现细节，优先使用带有 Hooks 的函数组件，这使得依赖组件内部变得困难。
:::

组件测试库，如 [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)，通过仔细选择提供的 API 来促进编写用户中心的测试。以下示例使用 `fireEvent` 方法 `changeText` 和 `press` 来模拟用户与组件的交互，并使用 `getAllByText` 查询函数来找到渲染输出中匹配的 `Text` 节点。

```tsx
test('given empty GroceryShoppingList, user can add an item to it', () => {
  const {getByPlaceholderText, getByText, getAllByText} = render(
    <GroceryShoppingList />,
  );

  fireEvent.changeText(
    getByPlaceholderText('Enter grocery item'),
    'banana',
  );
  fireEvent.press(getByText('Add the item to list'));

  const bananaElements = getAllByText('banana');
  expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});
```

这个示例不是测试当调用某个函数时某些状态的变化。它测试的是当用户在 `TextInput` 中更改文本并按下 `Button` 时会发生什么！

### 测试渲染输出

[快照测试](https://jestjs.io/docs/en/snapshot-testing) 是 Jest 启用的先进测试类型。它是一个非常强大且低级别的工具，因此在使用时需要额外注意。

一个"组件快照"是一个由 Jest 内置的 React 序列化器创建的 JSX 字符串。这个序列化器让 Jest 能够将 React 组件树转换为人类可读的字符串。换句话说：组件快照是组件渲染输出的文本表示，在测试运行期间生成。它可能看起来像这样：

```tsx
<Text
  style={
    Object {
      "fontSize": 20,
      "textAlign": "center",
    }
  }>
  Welcome to React Native!
</Text>
```

使用快照测试时，通常首先实现组件，然后运行快照测试。快照测试然后创建一个快照，并将其保存到你的仓库中的参考快照文件中。**然后提交并检查该文件**。任何对组件渲染输出的未来更改都会更改其快照，这将导致测试失败。然后你需要更新测试的存储参考快照以通过测试。该更改再次需要提交和审查。

快照有几个弱点：

- 对于你作为开发人员或审阅者来说，很难判断快照中的变化是否是有意为之，还是错误的证据。尤其是大型快照很快变得难以理解，其价值变得很低。
- 当快照创建时，此时它被认为是正确的--即使渲染输出实际上是错误的。
- 当快照失败时，使用 `--updateSnapshot` jest 选项更新它而不采取适当措施调查更改是否是预期的，这是诱人的。因此需要一定的开发纪律。

快照本身并不能确保你的组件渲染逻辑是正确的，它们只是很好地守护着意外的变化，并检查测试的 React 树下的组件是否接收了预期的 props（样式等）。

我们建议你只使用小的快照（见 [`no-large-snapshots` 规则](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md)）。如果你想要测试两个 React 组件状态之间的变化，使用 [`snapshot-diff`](https://github.com/jest-community/snapshot-diff)。在不确定的情况下，优先使用前面段落中描述的显式期望。

<img src="/docs/assets/p_tests-snapshot.svg" alt=" " />

## 端到端测试

在端到端（E2E）测试中，尝试从用户的角度来验证应用在设备（或模拟器 / 模拟器）上的工作情况。

这是通过在发布配置中构建应用并运行测试来完成的。在 E2E 测试中，你不再考虑 React 组件、React Native API、Redux 存储或任何业务逻辑。这不是 E2E 测试的目的，这些在 E2E 测试期间甚至对你不可用。

相反，E2E 测试库允许你找到并控制应用屏幕上的元素：例如，你可以 _实际地_ 点击按钮或像真实用户一样在 `TextInputs` 中插入文本。然后你可以做出关于某个元素是否存在于应用的屏幕上、是否可见、包含什么文本等的断言。

E2E 测试给你最高的信心，部分应用正在工作。权衡包括：

- 编写它们比其他类型的测试更耗时
- 它们运行得更慢
- 它们更容易出现"flaky"（一个"flaky"测试是随机通过和失败的测试，没有任何代码更改）

尝试用 E2E 测试覆盖应用的关键部分：认证流程、核心功能、支付等。对于应用的非关键部分，使用更快的 JS 测试。你添加的测试越多，你的信心就越高，但同时，你维护和运行它们的成本也越高。考虑权衡，并决定什么最适合你。

有几种 E2E 测试工具可用：在 React Native 社区中，[Detox](https://github.com/wix/detox/) 是一个流行的框架，因为它专为 React Native 应用设计。另一个流行的库是 [Appium](https://appium.io/) 或 [Maestro](https://maestro.mobile.dev/)。

<img src="/docs/assets/p_tests-e2e.svg" alt=" " />

## 总结

我们希望你享受阅读并从本指南中学习到一些东西。有很多方法可以测试你的应用。一开始可能很难决定使用什么。然而，我们相信一旦你开始为你的优秀 React Native 应用添加测试，一切都会变得有意义。所以，你还在等什么？提高你的覆盖率！

### 链接

- [React 测试概述](https://reactjs.org/docs/testing.html)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest docs](https://jestjs.io/docs/en/tutorial-react-native)
- [Detox](https://github.com/wix/detox/)
- [Appium](https://appium.io/)
- [Maestro](https://maestro.mobile.dev/)

---

_This guide originally authored and contributed in full by [Vojtech Novak](https://twitter.com/vonovak)._
