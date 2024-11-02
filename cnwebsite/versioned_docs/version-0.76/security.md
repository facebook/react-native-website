---
id: security
title: 网络安全策略
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

开发应用时安全常常是一个被忽视的话题。的确，搭建一个完全无懈可击的软件是不可能的——我们还没有发明一个完全坚不可摧的锁（毕竟，银行金库已经足够坚固但仍然会被闯入）。然而，遭受恶意攻击或暴露安全漏洞的可能性与您愿意投入保护应用程序免受此类事件的努力成反比。尽管普通的挂锁可以被撬开，但它仍然比橱柜挂钩更难攻破！

<img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/d_security_chart.svg" width="283" alt=" " style={{float:'right'}} />

在本指南中，您将了解到存储敏感信息、认证、网络安全的最佳实践以及可以帮助您保护应用程序的工具。这不是一个飞行前检查清单——这是一个选项目录，每一个选项都将有助于进一步保护您的应用程序和用户。

## 保存敏感信息

永远不要在应用代码中存储敏感的API密钥。任何包含在您的代码中的内容都可能被任何人以明文形式访问，只要他们检查了应用包。像[react-native-dotenv](https://github.com/zetachang/react-native-dotenv)和[react-native-config](https://github.com/luggit/react-native-config/)这样的工具非常适合添加环境特定的变量，比如API端点，但它们不应该与服务器端的环境变量混淆，后者通常可以包含秘密和API密钥。

如果你的应用需要使用API密钥或秘密来访问某些资源，最安全的处理方式是在应用和资源之间构建一个编排层。这可以是一个无服务器函数（例如使用AWS Lambda或Google Cloud Functions），它可以转发带有所需API密钥或秘密的请求。服务器端代码中的秘密不能像应用代码中的秘密那样被API消费者访问。

**对于持久化用户数据，请根据其敏感性选择合适的存储类型。** 随着你的应用程序的使用，你经常会发现需要在设备上保存数据，无论是为了支持应用程序离线使用、减少网络请求还是保存用户在会话之间的访问令牌，这样他们就不必每次使用应用程序时都重新认证。

> **持久化与非持久化** —— 持久化数据被写入设备的内存中，这允许数据在应用程序启动后由你的应用程序读取而无需再次进行网络请求以获取它或要求用户重新输入它。但这也可能使这些数据更容易被攻击者访问。非持久化数据从未被写入内存——所以没有可访问的数据！

### Async Storage

[Async Storage](https://github.com/react-native-community/async-storage) 是一个由社区维护的 React Native 模块，它提供了一个异步、未加密的键值对存储。异步存储不是在应用之间共享的：每个应用都有自己的沙盒环境，并且无法访问其他应用的数据。

| **使用Async Storage的情况** | **不推荐使用Async Storage的情况** |
| ---------------------- | -------------------------- |
| 在应用运行间持久保存非敏感数据   | 令牌存储                   |
| 持久保存 Redux 状态         | 密钥                        |
| 持久保存 GraphQL 状态       |                             |

> Async Storage 是 React Native 中与 Web 的 Local Storage 类似的功能

### 安全存储

React Native 本身没有提供任何用于安全地储存敏感数据的方式。然而，对于 Android 和 iOS 平台来说，已经有现成的解决方案。

#### iOS - Keychain Services

[Keychain Services](https://developer.apple.com/documentation/security/keychain_services)允许你安全地为用户储存少量敏感信息。这是存放证书、令牌、密码以及任何不应该放在 Async Storage 中的其他敏感信息的理想场所。

#### Android - Secure Shared Preferences

[Shared Preferences](https://developer.android.com/reference/android/content/SharedPreferences)是 Android 上的一个持久化键值对数据仓库。默认情况下，在 Shared Preferences 中的数据**不会被加密**，但是 [Encrypted Shared Preferences](https://developer.android.com/topic/security/data) 对于 Android 的 Shared Preferences 类进行了封装，并自动加密了键和值。

#### Android - Keystore

[Android Keystore](https://developer.android.com/training/articles/keystore)系统允许您将加密密钥存储在容器中，使其更难以从设备中提取。

为了使用iOS Keychain服务或Android Secure Shared Preferences，您可以自己编写一个桥接程序，或者使用一个库来为您包装它们，并提供统一的API供您自行承担风险。以下是一些值得考虑的库：

- [react-native-keychain](https://github.com/oblador/react-native-keychain)
- [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info) - 对于iOS是安全的，但对于Android使用的是Shared Preferences（默认情况下不安全）。然而有一个[分支](https://github.com/mCodex/react-native-sensitive-info/tree/keystore))使用了Android Keystore
- [redux-persist-sensitive-storage](https://github.com/CodingZeal/redux-persist-sensitive-storage) - 包装了react-native-sensitive-info

> **请注意不要无意中存储或暴露敏感信息。**这可能会意外发生，例如在redux状态中保存敏感表单数据并持久化整个状态树到Async Storage。或者将用户令牌和个人信息发送到应用程序监控服务如Sentry或Crashlytics。


## 认证和深度链接（Deep Linking）

<img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/d_security_deep-linking.svg" width="225" alt=" " style={{float: 'right', margin: '0 0 1em 1em'}} />

移动应用程序有一个独特的漏洞，这在网络中是不存在的：**深度链接**。深度链接是一种将数据直接发送到原生应用程序的方式，来自外部来源。一个深度链接看起来像 `app://` ，其中 `app` 是您的应用方案，//后面的任何内容都可能被内部用来处理请求。

例如，如果您正在构建一个电子商务应用程序，您可以使用 `app://products/1` 来深入链接到您的应用程序，并打开具有id为1的产品的详细页面。您可以将这些视为网络上的URLs，但有一个关键的区别：
深度链接是不安全的，您永远不应该在它们中发送任何敏感信息。

深度链接不安全的原因是因为没有集中的方法注册URL方案。作为一个应用开发者，您可以通过 [在Xcode中配置它](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) 对于iOS或[在Android上添加意图](https://developer.android.com/training/app-links/deep-linking)来使用几乎任何您选择的url方案。

没有什么可以阻止恶意应用通过也注册相同的计划并随后获取包含的数据来劫持您的深层连接。发送像 `app://products/1` 的东西并没有什么害处，但发送令牌会是一个安全问题。

当操作系统在打开链接时有两个或更多应用程序可供选择时，Android会向用户显示一个模态框并询问他们使用哪个应用程序来打开链接。然而，在iOS上，操作系统将为您做出选择，因此用户将毫无察觉。苹果公司已经在后来的iOS版本（iOS 11）中采取了措施来解决这个问题，其中他们实施了一个先到先服务的原则，尽管这个漏洞仍然可以以不同的方式被利用，你可以在[这里](https://thehackernews.com/2019/07/ios-custom-url-scheme.html)阅读更多相关内容。使用[通用链接](https://developer.apple.com/ios/universal-links/)将允许您安全地在iOS内连接到您的应用内容。

### OAuth2 和重定向

OAuth2 认证协议现在非常流行，被誉为最完整和安全的协议之一. OpenID Connect 协议也是基于此构建的. 在 OAuth2 中, 用户需要通过第三方进行身份验证. 成功完成后, 第三方会带着一个验证码重新定向回请求的应用, 这个验证码可以用来交换 JWT - 即JSON Web Token。

在网上这一步是安全的因为网上的URL保证是唯一的. 对于应用来说却并非如此，因为如前所述没有统一的方法去注册URL方案!为了解决这个安全隐患必须增加额外的一个检查步骤叫做 PKCE.

[PKCE](https://oauth.net/2/pkce/)发音为“Pixy”代表Proof of Key Code Exchange，是对OAuth 2规范的一个扩展。这涉及到增加了一层安全措施，用来验证身份验证和令牌交换请求来自同一个客户端。PKCE使用了SHA256加密哈希算法。SHA256 为任意大小的文字或者文件创建了一个独特的“签名”,但它:

* 不管输入文件的大小总是保持一致的长度
* 对同样的输入始终产生一样的结果
* 是单向的（也就是说你不可以通过它反向工程出原始输入）
  
现在你有这两个值：

* **code_verifier** -由客户端生成的大随机字符串
* **code_challenge** - code_verifier 的 SHA256

在初始的 `/authorize` 请求期间，客户端还会发送它保存在内存中的 `code_verifier` 对应的 `code_challenge`。授权请求正确返回后，客户端还会发送用于生成 `code_challenge` 的 `code_verifier`。身份提供商（IDP）随后会计算 `code_challenge`，检查它是否与最初的 `/authorize` 请求中设置的值匹配，并仅在值匹配时才发送访问令牌。

这保证了只有触发初始授权流程的应用才能成功地将验证码交换为 JWT。因此，即使恶意应用获得了验证码，它本身也是无用的。要查看这个过程的实际演示，请查看 [这个示例](https://aaronparecki.com/oauth-2-simplified/#mobile-apps)。

考虑用于原生 OAuth 的库是 [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth)。React-native-app-auth 是一个与 OAuth2 提供商通信的 SDK。它封装了原生的 [AppAuth-iOS](https://github.com/openid/AppAuth-iOS) 和 [AppAuth-Android](https://github.com/openid/AppAuth-Android) 库，并可以支持 PKCE。

> React-native-app-auth 只有在您的身份提供商支持 PKCE 时才能支持它。

![OAuth2 with PKCE](/docs/assets/diagram_pkce.svg)

## 网络安全

您的 API 应该始终使用[SSL加密](https://www.ssl.com/faqs/faq-what-is-ssl/)。SSL加密可以防止请求的数据在离开服务器后、到达客户端之前以明文形式被读取。您可以通过端点以`https://`而不是`http://`开头来判断它是安全的。

### SSL 固定

即使使用HTTPS端点，您的数据仍然可能容易受到拦截的威胁。在HTTPS中，只有当服务器能够提供由预装在客户端上的可信证书颁发机构签名的有效证书时，客户端才会信任该服务器。攻击者可以利用这一点，在用户的设备上安装恶意根CA证书，这样客户端就会信任所有由攻击者签名的证书。因此，仅依赖于证书本身仍可能使您容易受到[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。

**SSL固定**是一种可以在客户端使用的技巧来避免这种攻击。它的工作原理是在开发期间将受信任的证书列表嵌入（或固定）到客户端中，以便只接受用其中一个受信任的证书签名的请求，并拒绝任何自签名的证书。

> 使用SSL固定时，您应该注意到期日期的问题。每1-2年就需要更新一次数字认证书，在数字认证书过期之后需要同时更新应用程序和服务器上的版本信息。一旦服务器上的数字认证书得到更新，则那些内嵌有旧版数字认证书的应用将无法正常工作了。

## 小结

没有绝对安全的方法来处理安全性问题，但通过有意识的努力和勤奋，可以显著降低应用程序中安全漏洞的可能性。根据存储在您的应用程序中的数据的敏感性、用户数量以及黑客获得访问权限时可能造成的损害，相应地投资于安全性。并记住：从未首先请求的信息更难被获取。
