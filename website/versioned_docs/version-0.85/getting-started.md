export default function GlobalTecnoAppMockup() {
  const products = [
    { name: 'Cargador iPhone', stock: 12, price: '$25.000' },
    { name: 'Cable Tipo C', stock: 30, price: '$8.500' },
    { name: 'Auriculares Bluetooth', stock: 8, price: '$45.000' },
    { name: 'Vidrio Templado', stock: 20, price: '$6.000' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-cyan-400">
              GlobalTecno
            </h1>
            <p className="text-slate-300 mt-2 text-lg">
              Sistema de control para accesorios de celulares
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 rounded-2xl font-semibold shadow-lg">
              Nueva Venta
            </button>
            <button className="bg-slate-800 border border-cyan-400 px-5 py-3 rounded-2xl font-semibold">
              Agregar Producto
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-800/70 backdrop-blur rounded-3xl p-6 shadow-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">Ventas del día</p>
            <h2 className="text-3xl font-bold mt-2">$185.000</h2>
          </div>

          <div className="bg-slate-800/70 backdrop-blur rounded-3xl p-6 shadow-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">Productos</p>
            <h2 className="text-3xl font-bold mt-2">124</h2>
          </div>

          <div className="bg-slate-800/70 backdrop-blur rounded-3xl p-6 shadow-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">Clientes</p>
            <h2 className="text-3xl font-bold mt-2">58</h2>
          </div>

          <div className="bg-slate-800/70 backdrop-blur rounded-3xl p-6 shadow-2xl border border-red-500">
            <p className="text-red-400 text-sm">Stock Bajo</p>
            <h2 className="text-3xl font-bold mt-2">3 productos</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/70 rounded-3xl p-6 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-cyan-300">
                Productos Recientes
              </h2>
              <input
                placeholder="Buscar producto..."
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm w-56 outline-none"
              />
            </div>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-900/70 rounded-2xl p-4 border border-slate-700 hover:border-cyan-500 transition"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-slate-400 text-sm">
                      Stock disponible: {product.stock}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-cyan-400 font-bold text-lg">
                      {product.price}
                    </p>
                    <button className="mt-2 bg-cyan-500 hover:bg-cyan-400 transition px-4 py-2 rounded-xl text-sm font-semibold">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/70 rounded-3xl p-6 border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-cyan-300 mb-5">
              Accesos rápidos
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-400 transition rounded-2xl p-5 font-bold text-lg shadow-lg">
                Ventas
              </button>

              <button className="bg-slate-900 border border-slate-700 hover:border-cyan-400 transition rounded-2xl p-5 font-bold text-lg">
                Stock
              </button>

              <button className="bg-slate-900 border border-slate-700 hover:border-cyan-400 transition rounded-2xl p-5 font-bold text-lg">
                Clientes
              </button>

              <button className="bg-slate-900 border border-slate-700 hover:border-cyan-400 transition rounded-2xl p-5 font-bold text-lg">
                Caja
              </button>
            </div>

            <div className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-5 shadow-2xl">
              <h3 className="font-black text-2xl mb-2">GlobalTecno</h3>
              <p className="text-sm text-slate-100">
                Gestión inteligente para tu negocio de accesorios tecnológicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
---
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
