---
title: React Native's Many Platform Vision
authors: [abernathyca, Eli_White, lunaleaps, yungsters]
tags: [announcement]
---

React Native has been very successful at raising the bar for mobile development, both at Facebook and elsewhere in the industry. As we interact with computers in new ways and as new devices are invented, we want React Native to be there for everyone. Although React Native was originally created to build mobile apps, we believe that focusing on many platforms and building to each platform’s strengths and constraints has a symbiotic effect. We have seen huge benefits when we extended this technology to desktop and virtual reality, and we're excited to share what this means for the future of React Native.

<!--truncate-->

## Respecting the Platform

Our first guiding principle is [to match the expectations people have for each platform](https://reactnative.dev/blog/2020/07/17/react-native-principles#native-experience). Android users expect accessible apps using TalkBack. Navigation should work the way it does in other Android apps. A button should look and feel the way buttons look and feel on Android. It should not look and feel like an iOS button. Although we seek to offer a consistent cross-platform developer experience, we resist the temptation to sacrifice users’ expectations.

We believe that React Native enables developers to meet users’ expectations while also gaining the benefits of a better developer experience. In this section, we share the following:

1. By embracing platform constraints, we actually improve the experience on other platforms.
2. We can learn from institutional knowledge to build higher level cross-platform abstractions.
3. Other players on each platform inspire us to build better developer and user experiences.

### Embracing Platform Constraints

<!-- alex ignore easily -->

Specific device hardware or user expectations impose unique constraints and requirements. As an example, memory is typically more constrained on Android and VR headsets than on iOS, macOS, and Windows. As another example, users expect mobile apps to start up almost instantaneously, but they are less frustrated when desktop apps take longer to start up. **We have found that by approaching these problems with React Native, we can more easily borrow lessons learned and code written for one platform, and apply them to other platforms.**

<figure>
  <img src="/blog/assets/many-platform-vision-facebook-dating.png" alt="Screenshot of Facebook Dating on mobile" />
  <figcaption>
    React Native and Relay power over 1000 Facebook surfaces on Android and iOS.
  </figcaption>
</figure>

For example, React Native relies on an optimization known as “view flattening” which is critical for reducing memory usage on Android. We never built this optimization for iOS because it does not bear the same memory constraints. Over the past few years as we built our new cross-platform renderer, we had to reimplement “view flattening”. But this time, it was written in C++ instead of platform-specific Java. Trying out this same optimization on iOS was now only a matter of flipping a switch. In the production Facebook app, we observed that this improved performance on iOS! We likely never would have built this for iOS, but our investment on Android was able to benefit our investment on iOS.

### Learning from Institutional Knowledge

One of the reasons that React Native was originally created was to reduce engineering silos. There is a tendency for Android engineers to be siloed from iOS engineers working on the same product. Android engineers review code for Android engineers and attend Android meetups and conferences. iOS engineers review code for iOS engineers and attend iOS meetups and conferences. Engineers working on different platforms bring unique domain and institutional knowledge about how to build great product experiences.

One of the best outcomes of cross-platform frameworks like React Native is how they bring together engineers with vastly different domain expertise. **We believe that by targeting more platforms, we can accelerate cross-pollination of institutional knowledge between platform experts.**

As an example, the accessibility abstractions in React Native are influenced by how Android, iOS, and web each approach accessibility in different ways. This enabled us to build a common interface that improves how accessibility hints are handled on both mobile platforms.

As another example, our research into user perception of speed on the web led to concurrent features like Suspense. Over the past year, these features were vetted by the new [Facebook.com](http://facebook.com/) website. Now with our new renderer, these features are making their way to React Native and influencing how we design event scheduling and priorities. The React team’s investment into improving the web experience is benefiting React Native for native platforms.

### Competition Drives Innovation

In addition to domain-specific engineers and meetups and conferences, each platform also brings other unique players solving similar problems. On the web, React (which directly powers React Native) frequently draws inspiration from other open source web frameworks like [Vue](https://vuejs.org/), [Preact](https://preactjs.com/), and [Svelte](https://svelte.dev/). On mobile, React Native has been inspired by other open source mobile frameworks, and we have been learning from other mobile frameworks built inside Facebook.

<!-- alex ignore challenged -->

**We believe that competition leads to better outcomes for everyone in the long run.** By studying what makes other players on each platform great, we can learn lessons that may apply to other platforms. For example, the race to simplify complex websites influenced the development of React and gave React Native a head start to offer a declarative framework for mobile apps. The demand for faster iteration cycles and build times for the web also led to the development of Fast Refresh which significantly benefited React Native. Similarly, performance optimizations in our internal mobile frameworks — especially around data fetching and parallelization — challenged us to improve React Native in a way that has also influenced React when we built the new [Facebook.com](http://facebook.com/) website.

<figure>
  <img src="/blog/assets/many-platform-vision-facebook-website.png" alt="Screenshot of the Facebook.com website" />
  <figcaption>
    React and Relay powers the <a href="http://facebook.com/">Facebook.com</a> website.
  </figcaption>
</figure>

## Expanding to New Platforms

React and React Native are at a turning point. React has [started the road to a React 18 release](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html), and [the new React Native renderer is now fully powering the Facebook mobile apps](https://twitter.com/reactnative/status/1415099806507167745). Our team has grown substantially this year in order to support the growing adoption at Facebook. Teams developing on other platforms have noticed the adoption and see the opportunity for them to also reap the benefits of React Native.

**For the past year, we have been partnering with Microsoft and the Messenger team to create a truly native video calling experience on Windows and macOS.** Due to the high scrutiny that we place on startup time for mobile apps, our initial implementation of desktop video calling using React Native completely blew away the performance of the Electron implementation that it replaced. For the first couple weeks of building this experience, we recorded videos of us resizing a window with multiple live video calls and marveled at the smooth frame rates.

Building for desktop has been very exciting for us. We have taken what we know about building mobile experiences and applied them to desktop with eyes wide open. We’ve expanded our horizons with multiple child windows, menu bars, system trays, and more. As we continue collaborating on new desktop Messenger features, we expect to find opportunities that influence how we build on web and mobile. If you want to stay up to date, our desktop collaboration work is taking place [on GitHub](https://github.com/microsoft/react-native-windows).

<figure>
  <img src="/blog/assets/many-platform-vision-messenger-desktop.png" alt="Screenshot of the Messenger app on macOS" />
  <figcaption>
    React Native powers Video Calling in Messenger for Windows and macOS.
  </figcaption>
</figure>

**We are also partnering more closely with [Facebook Reality Labs](https://tech.fb.com/ar-vr/) to understand how React is uniquely positioned to deliver virtual reality experiences on Oculus.** Building experiences in VR with React Native will be particularly interesting because of tighter memory constraints and user sensitivity to interaction latency.

Similar to how we approach React Native for mobile, we will be validating our technology at Facebook scale before we share anything publicly. A lot is still changing and we still have many questions. We want to have confidence that the technology is production-ready and reliable before sharing with the community.

Although most of the development for VR will still be internal, we hope to share more as soon as we can. We also anticipate that improvements to React Native for VR will surface in open source. For example, we anticipate that projects to reduce memory usage for VR use cases will also reduce memory usage for React Native on mobile and desktop experiences.

<figure>
  <img src="/blog/assets/many-platform-vision-oculus-home.png" alt="Screenshot of Oculus Home in virtual reality" />
  <figcaption>
    React and Relay power the Oculus Home and many other virtual reality experiences.
  </figcaption>
</figure>

When we reflect back on how the industry has adopted React, there has always been an appetite in the community for React on more platforms. Even before we announced React Native to the community, Netflix had already been crafting Gibbon, their custom renderer for building TV experiences with React. And before Facebook started building Messenger for desktop, [Microsoft was already using React to build native desktop experiences in Office and Windows 10](https://www.youtube.com/watch?v=IUMWFExtDSg&t=382s).

## Summary

In summary, our vision is to expand React Native's reach beyond mobile and we've already started by partnering with desktop and VR teams at Facebook. We know that when we embrace the platform constraints of each platform, learn from institutional knowledge, and gather inspiration from other players, it benefits every platform in the ecosystem. And most importantly, in doing so, we stay true to [our guiding principles](https://reactnative.dev/blog/2020/07/17/react-native-principles).

We are excited about what's to come as we continue to explore what many platforms unlocks for React Native. Connect with us ([@reactnative](https://twitter.com/reactnative)) for more updates and share your thoughts!
