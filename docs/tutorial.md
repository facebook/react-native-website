---
id: tutorial
title: 基礎を学ぶ
---

React Native は React に似ていますが、ネイティブコンポーネントをウェブコンポーネントの代わりに使用します。つまり、React Native の基礎を理解する為には、React の知識 (JSX, コンポーネント、`state`, `props` 等)が必須になります。もし既に React の知識を持っていたとしても、ネイティブコンポーネント等、React Native 独自の仕様を学ぶ必要があります。このチュートリアルは React の予備知識を問わず、全ての方を対象としています。

それでは始めましょう。

## Hello World

まずは慣例に従って、"Hello world!" とだけ表示するアプリを作ってみましょう。

```SnackPlayer name=Hello%20World
import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default HelloWorldApp;
```

Web シュミレーターで興味の向くままにいじってみましょう。もしくは、そのまま `App.js` に貼り付けて本物のアプリを作成することもできます。

## 何が起こっているの？

1. まずは `JSX` を使用できるようにする為に `React` をインポートします。これらは各プラットフォームのネイティブコンポーネントに変換されます。
2. 二行目では `Text` と `View` を `react-native` からインポートしています。

次に `HelloWorldApp` 関数があります。これは [関数コンポーネント](https://ja.reactjs.org/docs/components-and-props.html#function-and-class-components) と呼ばれ、Web 上の React と同じように動作します。この関数は、いくつかのスタイルを持つ `View` コンポーネントとその子要素としての `Text` を返却します。

`Text` コンポーネントはテキストを表示し、`View` コンポーネントはコンテナを表示します。コンテナはいくつかのスタイリングがされています。一つづつ見てみましょう。

1つ目は `flex: 1`。[`flex`](layout-props#flex) はコンポーネントが主軸に沿って、どの程度空いているスペースを埋めて行くかを定義します。この例では、コンテナは一つしかないので、 `Text` コンポーネントは `View` コンポーネントの全てのスペースを使用し、`View` は唯一のコンポーネントなので、結局全ての利用可能なスクリーンスペースを使用することになります。

次は [`justifyContent`](layout-props#justifycontent): "center". これは子要素を親要素の主軸の中心に沿って整列させます。最後は [`alignItems`](layout-props#alignitems): "center", 子要素を親要素の十字軸の中心に整列させます。

いくつか JavaScript とは思えない文法があったかもしれません。大丈夫です、_これが最先端です_。

ます、ES2015 (ES6) は、現在では公式の標準規格の一部となっている JavaScript の改良セットですが、まだいくつかのブラウザでは非対応の為、使用が避けられることも多いです。React Native はES2015 をサポートしている為、互換性を気にせず使用できます。上記の例の `import`, `from`, `export`, `const` 等は全て ES2015 の機能です、もし ES2015 に慣れていない場合は。このチュートリアルのようなサンプルコードを読むことで、ES2015 の機能を理解できるでしょう。もし必要であれば、 [この](https://babeljs.io/learn-es2015/) ページでES2015の機能の概要を見ることができます。

もう一はこのコード `<View><Text>Hello world!</Text></View>`. これは JSX と呼ばれ、JavaScriptの 中に XML を埋め込むための構文です。 多くのフレームワークではマークアップの中に特殊なテンプレート言語を使用することができます。対して、React ではこれが逆です。JSX では、マークアップをコードの中に記述できます。HTML のように見えますが、`<div>`や`<span>`などのウェブコンポーネントの代わりに React コンポーネントを使用します。この例では、`<Text>`はテキストを表示する[コアコンポーネント](intro-react-native-components)で、`View`は`<div>`や`<span>`と似た役割です。

## コンポーネント

この例では `HelloWorldApp` という新しいコンポーネントを定義しています。React Native アプリの開発中、あなたはたくさんのコンポーネントを作成することでしょう。スクリーンで見る全てのものは何かしらのコンポーネントです。

## Props

ほとんどのコンポーネントは作成時にパラメータを渡すことによってカスタマイズが可能です。これらのパラメータは `props` (日本語では'小道具')と呼ばれます。

あなたが作ったコンポーネントを `props` 使用することが可能です。`props` はコンポーネントを一般化し、色々な場所で少しづつ違ったプロパティを持つことができます。関数コンポーネントの場合は`props.{NAME}`、クラスコンポーネントの場合は `this.props.{NAME}` でアクセスできます。例：

```SnackPlayer name=Hello%20Props
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})

const Greeting = (props) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
}

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='Rexxar' />
      <Greeting name='Jaina' />
      <Greeting name='Valeera' />
    </View>
  );
}

export default LotsOfGreetings;
```

`name` を `prop` として使用すると、`Greeting` コンポーネントをカスタマイズすることができ、一つ一つの Greeting (挨拶)に再利用できます。 この例では、JSX のGreeting コンポーネントも使用しています。このようなことができる力こそが、Reactをクールにしているのです。

もう一つの注目すべきポイントは、`View` コンポーネントです。`View` は、他のコンポーネントのコンテナとして、スタイルやレイアウトを制御するのに役立ちます。

`props` と基本的な[`Text`](text.md)、[`Image`](image.md)、や[`View`](view.md)コンポーネントを使えば、さまざまな静的な画面を構築することができます。アプリを時間の経過とともに変化させるには、State について学ぶ必要があります。

## State

[読み取り専用](https://reactjs.org/docs/components-and-props.html#props-are-read-only) で改変すべきでない `props` と違って、 `state` は、React コンポーネントユーザーのアクション、ネットワークのレスポンスや時間の経過とともに出力を変化させることを可能にします。

#### state とprops の違い

React コンポーネントでは、`props` は親コンポーネントから子コンポーネントに渡す変数です。同様に、`state` も変数ですが、パラメータとして渡されるのではなく、コンポーネントが内部で初期化して管理するという違いがあります。

#### React と React Native では state の取り扱いに違いはあるのか？

<div className="two-columns">

```jsx
// ReactJS Counter Example using Hooks!

import React, { useState } from 'react';



const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <p>You clicked {count} times</p>
            <button
                onClick={() => setCount(count + 1)}>
                Click me!
            </button>
        </div>
    );
};


// CSS
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

```

```jsx
// React Native Counter Example using Hooks!

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text>You clicked {count} times</Text>
            <Button
                onPress={() => setCount(count + 1)}
                title="Click me!"
            />
        </View>
    );
};

// React Native Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
```

</div>

上記の通り、[React](https://reactjs.org/docs/state-and-lifecycle.html) と React Native の`state` に違いはありません。 [hooks](https://reactjs.org/docs/hooks-intro.html) を使用して`state`を管理することができます。

下記の例では先程の例を`class`を使って表現しています。

```SnackPlayer name=Hello%20Classes
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class App extends Component {
  state = {
    count: 0
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
```
