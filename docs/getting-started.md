---export default function StarPulseEntertainmentHub() { // Mobile App Version (Expo React Native Style UI) // Optimized for iPhone & Android entertainment browsing const featuredCelebs = [ { name: 'Tate McRae', role: 'Singer • Dancer • Performer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop', bio: 'Trending music artist known for emotional pop anthems, dance-driven performances, and chart-topping hits.' }, { name: 'Zac Efron', role: 'Actor • Producer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop', bio: 'Hollywood actor recognized for blockbuster films, action roles, and iconic performances.' }, { name: 'Megan Fox', role: 'Actress • Model', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop', bio: 'Known for stylish red carpet appearances, movie roles, and pop culture influence.' }, { name: 'MGK', role: 'Artist • Musician • Actor', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop', bio: 'Genre-bending artist blending rock, rap, and cinematic visuals into a unique brand.' } ];

const trendingNews = [ 'Top music videos trending this week', 'Behind-the-scenes celebrity interviews', 'Upcoming movie trailers and entertainment news', 'Live performances and fan-favorite moments' ];

return ( <div className="min-h-screen bg-black text-white overflow-hidden"> <section className="relative h-screen flex items-center justify-center text-center px-6"> <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 opacity-90" />

<div className="relative z-10 max-w-5xl">
      <p className="uppercase tracking-[0.4em] text-pink-400 mb-4 text-sm">
        Entertainment • Music • Hollywood
      </p>

      <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
        StarPulse
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
        Your entertainment universe for trending music artists, actors, celebrity news, movie trailers, exclusive fan content, and viral pop culture moments.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button className="bg-pink-500 hover:bg-pink-400 transition-all px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl">
          Explore Artists
        </button>

        <button className="border border-white/30 hover:bg-white/10 transition-all px-8 py-4 rounded-2xl text-lg font-semibold">
          Watch Trailers
        </button>
      </div>
    </div>
  </section>

  <section className="py-24 px-6 md:px-12 lg:px-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Featured Stars
          </h2>
          <p className="text-gray-400 text-lg">
            Discover popular actors, musicians, and entertainment icons.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search celebrities..."
          className="bg-black border border-white/10 rounded-xl px-5 py-3 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {featuredCelebs.map((celeb, index) => (
          <div
            key={index}
            className="group bg-black/50 border border-white/10 rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-2xl"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={celeb.image}
                alt={celeb.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">
                {celeb.name}
              </h3>

              <p className="text-pink-400 mb-4 text-sm uppercase tracking-wider">
                {celeb.role}
              </p>

              <p className="text-gray-400 leading-relaxed mb-6">
                {celeb.bio}
              </p>

              <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-pink-400 hover:text-white transition-all">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black to-zinc-900">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p className="uppercase tracking-[0.3em] text-pink-500 mb-4 text-sm">
          Trending Now
        </p>

        <h2 className="text-5xl font-black mb-8 leading-tight">
          Entertainment News & Viral Moments
        </h2>

        <div className="space-y-5">
          {trendingNews.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-xl font-bold">
                {index + 1}
              </div>

              <p className="text-lg text-gray-200">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-lg shadow-2xl">
        <h3 className="text-3xl font-bold mb-6">
          Join The Fan Community
        </h3>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Get updates on new songs, celebrity appearances, movie premieres, fan events, and exclusive entertainment content.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button className="w-full bg-pink-500 hover:bg-pink-400 transition-all py-4 rounded-xl text-lg font-bold shadow-xl">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  </section>

  <footer className="border-t border-white/10 py-10 px-6 text-center bg-black">
    <h2 className="text-3xl font-black mb-2">
      StarPulse
    </h2>

    <p className="text-gray-500 mb-6">
      Entertainment website for music lovers, movie fans, and celebrity culture.
    </p>

    <div className="flex justify-center gap-6 text-gray-400 flex-wrap">
      <a href="#" className="hover:text-pink-400 transition-colors">
        Home
      </a>
      <a href="#" className="hover:text-pink-400 transition-colors">
        Artists
      </a>
      <a href="#" className="hover:text-pink-400 transition-colors">
        Actors
      </a>
      <a href="#" className="hover:text-pink-400 transition-colors">
        News
      </a>
      <a href="#" className="hover:text-pink-400 transition-colors">
        Contact
      </a>
    </div>
  </footer>
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
