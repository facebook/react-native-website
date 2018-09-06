---
id: version-0.56-network
title: 网络
original_id: network
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

很多移动应用都需要从远程地址中获取数据或资源。你可能需要给某个 REST API 发起 POST 请求以提交用户数据，又或者可能仅仅需要从某个服务器上获取一些静态内容——以下就是你会用到的东西。新手可以对照这个[简短的视频教程](http://v.youku.com/v_show/id_XMTUyNTEwMTA5Ng==.html)加深理解。

## 使用 Fetch

React Native 提供了和 web 标准一致的[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)，用于满足开发者访问网络的需求。如果你之前使用过`XMLHttpRequest`(即俗称的 ajax)或是其他的网络 API，那么 Fetch 用起来将会相当容易上手。这篇文档只会列出 Fetch 的基本用法，并不会讲述太多细节，你可以使用你喜欢的搜索引擎去搜索`fetch api`关键字以了解更多信息。

#### 发起请求

要从任意地址获取内容的话，只需简单地将网址作为参数传递给 fetch 方法即可（fetch 这个词本身也就是`获取`的意思）：

```javascript
fetch("https://mywebsite.com/mydata.json");
```

Fetch 还有可选的第二个参数，可以用来定制 HTTP 请求一些参数。你可以指定 header 参数，或是指定使用 POST 方法，又或是提交数据等等：

```javascript
fetch("https://mywebsite.com/endpoint/", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    firstParam: "yourValue",
    secondParam: "yourOtherValue"
  })
});
```

提交数据的格式关键取决于 headers 中的`Content-Type`。`Content-Type`有很多种，对应 body 的格式也有区别。到底应该采用什么样的`Content-Type`取决于服务器端，所以请和服务器端的开发人员沟通确定清楚。常用的'Content-Type'除了上面的'application/json'，还有传统的网页表单形式，示例如下：

```js
fetch("https://mywebsite.com/endpoint/", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "key1=value1&key2=value2"
});
```

可以参考[Fetch 请求文档](https://developer.mozilla.org/en-US/docs/Web/API/Request)来查看所有可用的参数。

> 注意：使用 Chrome 调试目前无法观测到 React Native 中的网络请求，你可以使用第三方的[react-native-debugger](https://github.com/jhen0409/react-native-debugger)来进行观测。

#### 处理服务器的响应数据

上面的例子演示了如何发起请求。很多情况下，你还需要处理服务器回复的数据。

网络请求天然是一种异步操作（译注：同样的还有[asyncstorage](asyncstorage.html)，请不要再问怎样把异步变成同步！无论在语法层面怎么折腾，它们的异步本质是无法变更的。异步的意思是你应该趁这个时间去做点别的事情，比如显示 loading，而不是让界面卡住傻等）。Fetch 方法会返回一个[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)，这种模式可以简化异步风格的代码（译注：同样的，如果你不了解 promise，建议使用搜索引擎补课）：

```javascript
function getMoviesFromApiAsync() {
  return fetch("https://facebook.github.io/react-native/movies.json")
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.movies;
    })
    .catch(error => {
      console.error(error);
    });
}
```

你也可以在 React Native 应用中使用 ES2017 标准中的`async`/`await` 语法：

```javascript
// 注意这个方法前面有async关键字
async function getMoviesFromApi() {
  try {
    // 注意这里的await语句，其所在的函数必须有async关键字声明
    let response = await fetch(
      "https://facebook.github.io/react-native/movies.json"
    );
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}
```

别忘了 catch 住`fetch`可能抛出的异常，否则出错时你可能看不到任何提示。

```SnackPlayer name=Fetch%20Example
import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }
}
```

> 默认情况下，iOS 会阻止所有非 https 的请求。如果你请求的接口是 http 协议，那么首先需要添加一个 App Transport Security 的例外，详细可参考[这篇帖子](https://segmentfault.com/a/1190000002933776)。

### 使用其他的网络库

React Native 中已经内置了[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)(也就是俗称的 ajax)。一些基于 XMLHttpRequest 封装的第三方库也可以使用，例如[frisbee](https://github.com/niftylettuce/frisbee)或是[axios](https://github.com/mzabriskie/axios)等。但注意不能使用 jQuery，因为 jQuery 中还使用了很多浏览器中才有而 RN 中没有的东西（所以也不是所有 web 中的 ajax 库都可以直接使用）。

```javascript
var request = new XMLHttpRequest();
request.onreadystatechange = e => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log("success", request.responseText);
  } else {
    console.warn("error");
  }
};

request.open("GET", "https://mywebsite.com/endpoint/");
request.send();
```

> 需要注意的是，安全机制与网页环境有所不同：在应用中你可以访问任何网站，没有[跨域](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)的限制。

## WebSocket 支持

React Native 还支持[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)，这种协议可以在单个 TCP 连接上提供全双工的通信信道。

```javascript
var ws = new WebSocket("ws://host.com/path");

ws.onopen = () => {
  // connection opened
  ws.send("something"); // send a message
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};
```

## High Five!

现在你的应用已经可以从各种渠道获取数据了，那么接下来面临的问题多半就是如何在不同的页面间组织和串联内容了。要管理页面的跳转，你需要学习[使用导航器跳转页面](navigation.md)。
