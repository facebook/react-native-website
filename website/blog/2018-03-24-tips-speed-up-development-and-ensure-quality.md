---
title: Tips on how to speed up development and ensure quality with React Native
author: Adrien Thiery
authorTitle: CTO at OSEDEA
authorURL: https://github.com/adrienthiery
authorImage: https://avatars0.githubusercontent.com/u/2392118?s=460&v=4
authorTwitter: adrien0
category: engineering
---

At OSEDEA, our expertise was mainly on Web development before we began working with React Native in 2015 (react-native 0.11). Our mobile experience was limited to using Ionic, an AngularJS related framework allowing you to create mobile applications by embedding WebViews into a mobile application. 
But we were never quite satisfied with the feel of such applications.

Thanks to our knowledge with ReactJS, React Native gave us the opportunity to enter the world of “real” mobile applications (i.e. mobile applications that behave like native applications).

Since then, we've continued working with React Native and mobile projects have become about half of our digital agency projects today. We have published already 11 apps using React Native on the app stores.

Here are a few things that we have learned along the way and we can't get by without.

## Work environment must-haves for a happy React (Native) developer

### Linting code and static code analysis: ESLint, Prettier 

ESLint and Prettier allow us to have consistent formatting throughout all of our Javascript projects, according to the rules we want and like (check out [eslint-config-osedea](https://www.npmjs.com/package/eslint-config-osedea) to learn more about our formatting options)

The point of these tools are that you spend more time writing code and less time formatting it.

Get started right here:

[Prettier](https://prettier.io/docs/en/install.html)
[ESLint](https://eslint.org/docs/user-guide/getting-started)

### Git hooks

In case you have never worked with git hooks, they are scripts that are going to be run before or after some git commands.

You can find them in the `.git/hooks` folder of your project:

```bash
$ ls -l .git/hooks/
total 152
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 applypatch-msg
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 commit-msg
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-applypatch
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-checkout
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-commit
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-merge
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-receive
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-rewrite
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 post-update
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 pre-applypatch
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 pre-auto-gc
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 pre-commit
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 pre-push
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 pre-rebase
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 pre-receive
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 prepare-commit-msg
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 push-to-checkout
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 sendemail-validate
-rwxr-xr-x  1 osedea  staff  150 Mar 20 09:22 update
```

For example, the `post-commit` hook will be run just after creating a new commit (`git commit -m "My message"`) and the `pre-push` hook will be run just before pushing your branch (`git push origin my-branch`).

In addition, the `pre-*` hooks will block the action if the script exits with a non-zero status (meaning the script failed/threw an error).

We have two types of git hooks in our projects:

* Global git hooks for company wide checks/helpers

    [Is your documentation up-to-date?](https://osedea.com/blog/how-to-tackle-the-documentation-problem)

    Do you have configuration files that should be in every project? ([.editorconfig](http://editorconfig.org/), [PULL_REQUEST_TEMPLATE](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/))

* Project dependent git hooks

    **Running tests**

    Because Test frameworks and their respective setup change for every project, so this is project dependent. We usually run "unit tests" (in our case [Jest tests](https://facebook.github.io/jest/)) on the `pre-push` hook, that way you cannot push a branch that doesn't pass the tests.

    Integration tests usually run when we merge a branch into `dev`.

    **Linting staged changes**

    Some people like to run "linting fix" or prettier on save, or on the whole project at once. We found that this was sometimes making the editing of files too heavy, or the Pull Requests too big and too confusing. So we adopted a middle solution where we lint the files that are staged for commit using [lint-staged](https://github.com/okonet/lint-staged).

    This is great, especially if you want to improve the quality/homogeneity of code of a pre-existing project, as it will format any file you touch in a standard way when doing your normal development.

    We run this in the `post-commit` hook.

    If you're interested in how to use git hooks more in your React Native project, be sure to check [Husky](https://github.com/typicode/husky), a tool that simplifies git hooks setup for JS projects.

### React and React Native snippets

*Note about editors*: The predominant editor used amongst our developers is VSCode, followed by Atom.

Snippets are one of the most underrated tools to speed up development.

These pieces of code that you're rewriting from scratch on a regular basis don't deserve your time, so just check out Snippets Extensions like the [VSCode React Native Snippets](https://marketplace.visualstudio.com/items?itemName=jundat95.react-native-snippet) or the [Atom react-native-snippets package](https://atom.io/packages/react-native-snippets).

## React Native Libraries we like and use in almost every project

* Firebase: [react-native-firebase](https://rnfirebase.io/)

We mostly use Firebase for [Analytics](https://firebase.google.com/products/analytics/) and [Cloud Messaging](https://firebase.google.com/products/cloud-messaging/) but it seems to be very popular for [Authentication](https://firebase.google.com/products/auth/) in the community as well. Adding Ads to your app to monetize it is super easy with [AdMob](https://firebase.google.com/docs/admob/).

* [Fabric](http://fabric.io) for crash reporting ([react-native-fabric](https://github.com/corymsmith/react-native-fabric) + check out the [ignite plugin](https://github.com/Osedea/ignite-fabric)), although it is now [Firebase Crashlytics](https://firebase.google.com/products/crashlytics/)

* [CodePush](https://github.com/Microsoft/react-native-code-push) for live update/bug fixing 

CodePush allows you to update the JS package of your React Native app over the air, either live (even if the user is using the app, useful for critical bug fixing) or at the next resume/app launch.

* [Detox](https://github.com/wix/detox) for end to end testing of your React Native app

* [Ignite](https://github.com/infinitered/ignite), not really a library, but an awesome tool to speed up React Native development, created by the great team at [Infinite Red](https://infinite.red/)

## Automate your deployment

When coming from the world of web development, one of the most painful steps in building a React Native application is publishing it (especially on iOS).
Thankfully [Fastlane](https://fastlane.tools/) exists to ease the pain of deployment and actually even make the process enjoyable.
This is a no-brainer for us. All of our projects use Fastlane.

As a very short introduction, Fastlane is not React Native specific, but is a great automation tool created to ease the mobile building and deployment process.

After having installed and setup fastlane, you can:

* Build your app (native and JS code)
* Update your CodePush package
* Upload the binaries for testing (Crashlytics beta, TestFlight or Android Play Store Alpha/Beta tracks are all supported)
* Handle metadata (screenshots, description, etc.), e.g. automatically take screenshots of your app, version them with the rest of the metadata (description, title, etc.) and upload all of that to the stores (App Store/Play Store)

In one command.

To learn more about Fastlane, check out the documentation or my colleague's [React Native EU 2017 talk about Fastlane](https://www.youtube.com/watch?v=p67CjO4mcyc).

## Quality Assurance/Deployment Environments

Publishing quality applications is of course very important to us. To help us achieve that, we are working on the following environments:

* Development in simulators

Development is mostly happening in simulators, unless we need to use sensors or we are developing features that need a physical device (ex: Push Notifications, Bluetooth communication, etc.)

* Internal QA with [Crashlytics Beta](http://try.crashlytics.com/beta/) or Play Store Alpha (android only)

During internal QA, we are testing release candidates on various real devices each running different versions of their OS (Android `4.4`-`8` and iOS `10`-`11`), processing power and screens sizes (From a `Samsung Galaxy Nexus` to a `Pixel 2 XL` and from an `iPhone 5C` to the `iPhone X`)

* Client QA with Play Store Beta (android)/[Testflight](https://developer.apple.com/testflight/) (iOS)

Once we are satisfied with the quality of the build and a final design QA has been completed on the app, we submit the build to our client (usually at least once a week), so they can test the new features.

* Production on the Play Store/App Store

Once we have the final GO of the client on the latest version, we "promote" the Beta/Testflight build to production. We always do this step manually.

## Conclusion

Hopefully what we have learned will help you speed up your development process. If you find any information in this blog post to be inaccurate, make sure to get in touch with me on [Twitter (@Adrien0)](https://twitter.com/adrien0) or at [adrien.thiery@osedea.com](mailto:adrien.thiery@osedea.com).

If you want to learn more about OSEDEA, check out our [website](https://osedea.com)!

