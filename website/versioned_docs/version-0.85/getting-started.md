--
export default function NubankStyleApp() { const cards = [ { title: 'Saldo disponível', value: 'R$ 2.450,90' }, { title: 'Cartão de crédito', value: 'Fatura: R$ 320,50' }, { title: 'Investimentos', value: 'R$ 1.200,00' }, ];

const actions = [ 'Pix', 'Transferir', 'Pagar', 'Depositar', 'Recarga', 'Cartão virtual', ];

const transactions = [ { name: 'Mercado', date: 'Hoje • 10:30', value: '- R$ 120,00', }, { name: 'Pix recebido', date: 'Ontem • 19:12', value: '+ R$ 300,00', }, { name: 'Netflix', date: 'Ontem • 14:20', value: '- R$ 39,90', }, ];

return ( <div className="min-h-screen bg-[#820ad1] text-white flex justify-center p-4"> <div className="w-full max-w-md space-y-4"> <div className="flex items-center justify-between"> <div> <h1 className="text-3xl font-bold">Olá, Anry</h1> <p className="text-sm opacity-80">Bem-vindo ao seu banco digital</p> </div> <div className="bg-white/20 p-3 rounded-full"> 💳 </div> </div>

<div className="bg-white text-black rounded-3xl p-5 shadow-xl space-y-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-2xl p-4 flex justify-between items-center"
        >
          <span className="font-medium">{card.title}</span>
          <span className="font-bold">{card.value}</span>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-3xl p-5 text-black shadow-xl">
      <h2 className="text-xl font-bold mb-4">Ações rápidas</h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-[#820ad1] text-white rounded-2xl p-4 text-sm font-semibold hover:scale-105 transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-3xl p-5 text-black shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Últimas movimentações</h2>
        <button className="text-[#820ad1] font-semibold">Ver todas</button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-2xl"
          >
            <div>
              <p className="font-semibold">{transaction.name}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <span className={`font-bold ${transaction.value.includes('-') ? 'text-red-500' : 'text-green-600'}`}>
              {transaction.value}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white/10 rounded-3xl p-4 text-center text-sm opacity-90">
      Protótipo educativo inspirado em apps de banco digital.
    </div>
  </div>
</div>

); }
id: environment-setup
title: Get Started with React Native
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**React Native allows developers who know React to create native apps.** At the same time, native developers can use React Native to gain parity between native platforms by writing common features once.

We believe that the best way to experience React Native is through a **Framework**, a toolbox with all the necessary APIs to let you build production ready apps.

You can also use React Native without a Framework, however we’ve found that most developers benefit from using a React Native Framework like [Expo](https://expo.dev). Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files.

<details>
<summary>Can I use React Native without a Framework?</summary>

Yes. You can use React Native without a Framework. **However, if you’re building a new app with React Native, we recommend using a Framework.**

In short, you’ll be able to spend time writing your app instead of writing an entire Framework yourself in addition to your app.

The React Native community has spent years refining approaches to navigation, accessing native APIs, dealing with native dependencies, and more. Most apps need these core features. A React Native Framework provides them from the start of your app.

Without a Framework, you’ll either have to write your own solutions to implement core features, or you’ll have to piece together a collection of pre-existing libraries to create a skeleton of a Framework. This takes real work, both when starting your app, then later when maintaining it.

If your app has unusual constraints that are not served well by a Framework, or you prefer to solve these problems yourself, you can make a React Native app without a Framework using Android Studio, Xcode. If you’re interested in this path, learn how to [set up your environment](set-up-your-environment) and how to [get started without a framework](getting-started-without-a-framework).

</details>

## Start a new React Native project with Expo

<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

Expo is a production-grade React Native Framework. Expo provides developer tooling that makes developing apps easier, such as file-based routing, a standard library of native modules, and much more.

Expo's Framework is free and open source, with an active community on [GitHub](https://github.com/expo) and [Discord](https://chat.expo.dev). The Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK.

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:

```shell
npx create-expo-app@latest
```

Once you’ve created your app, check out the rest of Expo’s getting started guide to start developing your app.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue with Expo</BoxLink>
