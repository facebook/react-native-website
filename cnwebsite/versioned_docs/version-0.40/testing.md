---
id: version-0.40-testing
title: 自动化测试
original_id: testing
---

## 运行测试与贡献代码

React Native的官方代码仓库里有一些测试代码，你可以在贡献代码之后回归测试一下，以检测有没有引起别的问题。这些测试是通过[Travis](http://docs.travis-ci.com/)持续集成系统来运行的，并且会自动针对你提交的代码给出测试结果。

当然我们的测试不可能有完整的覆盖率（尤其对于复杂的用户交互），所以很多更改也还需要仔细的人工审查。我们期待你能帮助我们提高测试覆盖率，以及提供更多的测试代码或是测试用例。

## 使用Jest来测试

[Jest](http://facebook.github.io/jest/)是在命令行通过node来执行的纯js测试工具。测试代码放置在`__tests__`目录下。有一些功能我们还没有完成模拟(jest中需要模拟一些接口)，因而没有纳入测试，以避免测试不通过和提高测试速度，但我们正在尽最大努力去逐渐补完这些功能的模拟。你可以在react-native源代码的根目录中使用如下命令来运行现有的jest测试代码:

```
npm test
```

我们建议你在贡献代码的时候也添加自己的测试代码。你可以参考这个简单的例子[`getImageSource-test.js`](https://github.com/facebook/react-native/blob/master/Examples/Movies/__tests__/getImageSource-test.js)。

注意：要运行你自己的测试代码，请首先去jest的官网阅读指导文档，然后在`package.json`中加入`jest`对象，在其中包含一些预备测试环境的脚本。下面是一个示例：

```
...
"scripts": {
  ...
  "test": "jest"
},
...
"jest": {
  "scriptPreprocessor": "node_modules/react-native/jestSupport/preprocessor.js",
  "setupEnvScriptFile": "node_modules/react-native/jestSupport/env.js",
  "testPathIgnorePatterns": [
    "/node_modules/",
    "packager/react-packager/src/Activity/"
  ],
  "testFileExtensions": [
    "js"
  ],
  "unmockedModulePathPatterns": [
    "promise",
    "source-map"
  ]
},
...
```

注意：你可能需要先在当前的环境中安装、更新或是链接Node.js和其他的一些工具，不然测试可能无法正常运行。点这里查看最新的[测试配置文件.travis.yml](https://github.com/facebook/react-native/blob/master/.travis.yml#L11-24)。

## 单元测试 (Android)

React Native使用[Buck](https://github.com/facebook/buck)编译工具来运行测试。 单元测试部分直接在本地运行，不需要模拟器。运行下面的命令来执行这些测试：

```bash
$ cd react-native
$ ./scripts/run-android-local-unit-tests.sh
```

## 集成测试 (Android)

React Native使用[Buck](https://github.com/facebook/buck)编译工具来运行测试。 集成测试需要在模拟器/真机上运行，以验证模块、组件以及React Native的内核部分（比如bridge）在端对端测试中运作正常。

确保你正确安装和配置了Android NDK，具体配置参见[这篇文档](https://github.com/facebook/react-native/blob/master/ReactAndroid/README.md#prerequisites)，然后运行下面的命令来执行测试：

```bash
$ cd react-native
$ npm install
$ ./scripts/run-android-local-integration-tests.sh
```

## 集成测试 (iOS)

React Native提供了一些工具来简化跨原生与JS端的组件的集成测试。这套工具的两个主要部分是`RCTTestRunner`与`RCTTestModule`。`RCTTestRunner`预设了ReactNative的环境，并且可以以`XCTestCase`的形式在Xcode中直接运行测试 （最简单的方法就是使用`runTest:module`）。而`RCTTestModule`则是以 `NativeModules.TestModule`对象导出到了JS环境中。测试代码需要以JS写成的，并且必须在测试完成后调用`TestModule.markTestCompleted()`方法，否则测试过程会超时并且失败。失败的表现一般是抛出一个JS异常。测试错误条件也是可行的，使用`runTest:module:initialProps:expectErrorRegex:`或是`runTest:module:initialProps:expectErrorBlock:`方法，它们会按提供的条件去验证抛出的错误是否符合。你可以参考[`IntegrationTestHarnessTest.js`](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/UIExplorerIntegrationTests/js/IntegrationTestHarnessTest.js)、[`IntegrationTests.m`](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/UIExplorerIntegrationTests/IntegrationTests.m)以及 [IntegrationTestsApp.js](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/UIExplorerIntegrationTests/js/IntegrationTestsApp.js)来看具体怎么做集成测试。

Xcode中运行IntegrationTest和UIExplorer两个官方示例应用时，可以按下`cmd + U`键来直接在本地运行集成测试。

## 快照测试 (iOS)

快照测试是集成测试的一种常见类型。这类测试首先渲染一个组件，然后使用`TestModule.verifySnapshot()`比对屏幕截图与参考效果图，其原理是利用了[`FBSnapshotTestCase`](https://github.com/facebook/ios-snapshot-test-case)这个库。参考效果图是通过在`RCTTestRunner`中设置`recordMode = YES`，然后在运行测试时录制的。屏幕截图在32位和64位色深以及不同的操作系统版本上可能会有细微的差别，所以建议强制在指定的配置环境中执行测试。此外我们还强烈建议所有的网络数据和其他的潜在依赖项都应该事先模拟。你可以参考[`SimpleSnapshotTest`](https://github.com/facebook/react-native/blob/master/IntegrationTests/SimpleSnapshotTest.js)这个例子。

如果你提交的PR（Pull Request，即提交你贡献的代码，并请求官方人员合并到仓库中）会影响到快照测试，比如给现有的快照测试添加一个新的测试用例，那么首先需要重新录制参考效果图。只需在[UIExplorer/UIExplorerSnapshotTests.m](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/UIExplorerIntegrationTests/UIExplorerSnapshotTests.m#L42)中设置`_runner.recordMode = YES;`，然后重新运行先前失败的测试代码，再之后将这一设置改回去，最后提交/更新你的PR，看Travis的自动测试能否通过。
