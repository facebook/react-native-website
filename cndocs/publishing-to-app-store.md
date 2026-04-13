---
id: publishing-to-app-store
title: 上架 App Store
---

上架应用的过程和任何其它原生 iOS 应用一样，但有一些额外的注意事项要考虑。

:::info
如果你正在使用 Expo，请阅读 Expo 的 [Deploying to App Stores](https://docs.expo.dev/distribution/app-stores/) 指南来构建和提交你的 app 到 Apple App Store。本指南适用于任何 React Native app，可以自动化部署过程。
:::

### 1. 配置 release scheme

需要在 Xcode 使用`Release` scheme 编译在 App Store 发布的 app。`Release`版本的应用会自动禁用开发者菜单，同时也会将 js 文件和静态图片打包压缩后内置到包中，这样应用可以在本地读取而无需访问开发服务器（同时这样一来你也无法再调试，需要调试请将 Build Configuration 再改为 debug）。

要配置 app 为使用`Release` scheme 编译，请前往**Product** → **Scheme** → **Edit Scheme**。选择侧边栏的**Run**标签，然后设置下拉的 Build Configuration 为`Release`。

![](/docs/assets/ConfigureReleaseScheme.png)

#### 优化技巧

静态包在每次你目标物理设备时都会生成，即使在 Debug 模式下也是如此。如果你想节省时间，可以通过在 Xcode Build Phase `Bundle React Native code and images` 的 shell 脚本中添加以下内容来在 Debug 模式下关闭包生成：

```shell
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

### 2. 编译发布 app

现在可以通过点击<kbd>Cmd ⌘</kbd> + <kbd>B</kbd>或从菜单栏选择 **Product** → **Build** 编译发布 app。一旦编译发布，就能够向 beta 测试者发布 app，提交 app 到 App Store。

:::info
你也可以使用 `React Native CLI` 通过 `--mode` 选项（值为 `Release`，例如从项目根目录执行：`npm run ios -- --mode="Release"` 或 `yarn ios --mode Release`）来执行此操作。
:::

当你完成测试并准备好发布到 App Store 时，请按照以下指南操作。

- 启动终端，导航到你 app 的 iOS 文件夹，输入 `open .`。
- 双击 YOUR_APP_NAME.xcworkspace。它应该会启动 Xcode。
- 点击 `Product` → `Archive`。确保将设备设置为 "Any iOS Device (arm64)"。

:::note
检查你的 Bundle Identifier，确保它与你在 Apple Developer Dashboard 的 Identifiers 中创建的完全一致。
:::

- 归档完成后，在归档窗口中点击 `Distribute App`。
- 点击 `App Store Connect`（如果你想发布到 App Store）。
- 点击 `Upload` → 确保所有复选框都已选中，点击 `Next`。
- 根据需要选择 `Automatically manage signing` 或 `Manually manage signing`。
- 点击 `Upload`。
- 现在你可以在 App Store Connect 的 TestFlight 中找到它。

现在填写必要的信息，在 Build 部分，选择 app 的 build，然后点击 `Save` → `Submit For Review`。

### 3. 截图

Apple Store 要求你提供最新设备的截图。可以在[这里](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/)找到相关设备的参考。请注意，如果为其他尺寸提供了截图，则某些显示尺寸的截图不是必需的。
