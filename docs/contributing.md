---
id: contributing
title: How to Contribute
---

We want to make contributing to this project as easy and transparent as possible. Read on to learn more about our development process and how to propose bug fixes and improvements.

## [Code of Conduct](https://code.fb.com/codeofconduct/)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://code.fb.com/codeofconduct/) so that you can understand what actions will and will not be tolerated.

## Our Development Process

Most changes from engineers at Facebook will sync to [GitHub](https://github.com/facebook/react-native) through a bridge with Facebook's internal source control. Changes from the community are handled through GitHub pull requests. Once a change made on GitHub is approved, it will first be imported into Facebook's internal source control. The change will eventually sync back to GitHub as a single commit once it has passed Facebook's internal tests.

## Branch Organization

We will do our best to keep the [`master` branch](https://github.com/facebook/react-native/tree/master) in good shape, with tests passing at all times. Sometimes, commits from Facebook engineers may land on `master`, temporarily breaking tests. While we have a comprehensive suite of tests that every diff must go through before it syncs out to GitHub, there are still some differences in development environments that prevent us from catching every one of these failures. We will do our best to resolve these quickly.

Each React Native version is built from a release branch named after the version (e.g. `0.NN-stable`). Each release branch is cut from the `master` branch and subjected to a 30 day soak period, during which contributors will closely monitor for any regressions. You can opt into these release candidates by installing `react-native@next` from npm. The release will eventually be promoted to stable, and published to npm as `react-native@latest`.

To see what changes are coming and provide better feedback to React Native contributors, use the latest release candidate whenever possible. By the time a release candidate is released, the changes it contains will have been shipped in production Facebook apps for over two weeks.

## Bugs

### Where to Find Known Issues

We are using [GitHub Issues](https://github.com/facebook/react-native/issues) for our public bugs.

### Reporting a New Issue

The best way to get your bug fixed is to provide a reduced test case. You can use a tool such as [Snack](https://snack.expo.io/) to provide a minimal example.

### Security Bugs

Facebook has a [bounty program](https://www.facebook.com/whitehat/) for the safe disclosure of security bugs. In those cases, please go through the process outlined on that page and do not file a public issue.

## How to Get in Touch

We have a discussion forum for React and React Native: [discuss.reactjs.org](https://discuss.reactjs.org/)

There is also [an active community of users on the Discord chat platform](http://www.reactiflux.com/) in case you need help with React or React Native.

### Request for Comments (RFC)

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are “substantial”, and we ask that these be put through a bit of a design process and produce a consensus among the React Native core team.

The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to be proposed and championed to then enter the project.

It is inspired by the [React RFCs repository](https://github.com/reactjs/rfcs), but today we don't expect for every substantial change to go through this process; however, we hope that this brings more awareness to the community.

You can contribute by visiting the [discussions and proposals repository](https://github.com/react-native-community/discussions-and-proposals).

### Get Involved

There are many ways to contribute to React Native, and many of them do not involve writing any code. Here's a few ideas to get started:

* Simply start using React Native. Go through the [Getting Started](getting-started.md) guide. Does everything work as expected? If not, we're always looking for improvements.
* Look through the [open issues](https://github.com/facebook/react-native/issues). Provide workarounds, ask for clarification, or suggest labels. Active community members can get access to our issue management tools, unlocking the ability to label, close, or re-open issues.
* If you find an issue you would like to fix, open a pull request. Issues tagged as [_Good first issue_](https://github.com/facebook/react-native/labels/Good%20first%20issue) are a good place to get started.
* Read through the docs. If you find anything that is confusing or can be improved, you can make edits by clicking "Edit" at the top of most docs.
* Browse [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native) and answer questions. This will help you get familiarized with common pitfalls or misunderstandings, which can be useful when contributing updates to the documentation.
* Before opening your pull request, make sure you have fully tested your changes. Test your changes locally and by running the various tests provided.
* Check out the [Testing your changes guide](https://facebook.github.io/react-native/docs/testing.html) to find out about the numerous tests which has been provided to help ensure that any new changes wont cause a regression.

Core contributors to React Native meet regularly and post their meeting notes [online](https://github.com/react-native-community/discussions-and-proposals/tree/master/core-meetings). You can also find ad hoc discussions at [https://discuss.reactjs.org/](https://discuss.reactjs.org/).

## Pull requests

### Your first pull request

So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

If you are working on your first pull request, you can learn how from this free video series: [**How to Contribute to an Open Source Project on GitHub**](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

### Proposing a change

If you intend to change the API, or make any non-trivial changes to the implementation, we recommend [filing an issue](https://github.com/react-native-community/discussions-and-proposals/issues/new). This lets us reach an agreement on your proposal before you put significant effort into it.

If you're only fixing a bug, it's fine to submit a pull request right away but we still recommend to file an issue detailing what you're fixing. This is helpful in case we don't accept that specific fix but want to keep track of the issue.

### Sending a pull request

Small pull requests are much easier to review and more likely to get merged. Make sure the PR does only one thing, otherwise please split it.

Please make sure the following is done when submitting a pull request:

1. Fork [the repository](https://github.com/facebook/react-native) and create your branch from `master`.
2. Add the copyright notice to the top of any new files you've added.
3. Describe your **test plan** in your pull request description (e.g. how did you test this?)
4. Make sure your code lints (`npm run lint` and `npm run prettier`).
5. If you haven't already, complete the Contributor License Agreement ("CLA").

### Contributor License Agreement ("CLA")

In order to accept your pull request, we need you to submit a CLA. You only need to do this once to work on any of Facebook's open source projects.

[**Complete your CLA here.**](https://code.facebook.com/cla)

### Changelog

Provide a changelog entry to help reviewers during the release process. Changes that do not impact React Native developers may be ommitted from the changelog.

A changelog entry has the following format:

```
[CATEGORY] [TYPE] - Message
```

* `CATEGORY` may be:

  * [General]
  * [iOS]
  * [Android]

* `TYPE` may be:

  * [Added] for new features.
  * [Changed] for changes in existing functionality.
  * [Deprecated] for soon-to-be removed features.
  * [Removed] for now removed features.
  * [Fixed] for any bug fixes.
  * [Security] in case of vulnerabilities.

* `MESSAGE` may answer "what and why" on a feature level. Use this to briefly tell React Native users about notable changes.

For more detail, see [How do I make a good changelog?](https://keepachangelog.com/en/1.0.0/#how)

#### Changelog Examples

* [General][added] - Add snapToOffsets prop to ScrollView component
* [General][fixed] - Fix various issues in snapToInterval on ScrollView component
* [iOS][fixed] - Fix crash in RCTImagePicker

### Test plan

A good test plan has the exact commands you ran and their output, provides screenshots or videos if the pull request changes UI or updates the website.

* If you've added code that should be tested, add tests!
* If you've changed APIs, update the documentation via an additional PR to the [react-native-website](https://github.com/facebook/react-native-website) repo.
* If you've updated the docs, verify the website locally and submit screenshots if applicable (see the [react-native-website](https://github.com/facebook/react-native-website) README).

See [What is a Test Plan?](https://medium.com/@martinkonicek/what-is-a-test-plan-8bfc840ec171#.y9lcuqqi9) to learn more.

### Coding Style

We use Prettier to format our JavaScript code. This saves you time and energy as you can let Prettier fix up any formatting issues automatically through its editor integrations, or by manually running `npm run prettier`. We also use a linter to catch styling issues that may exist in your code. You can check the status of your code styling by simply running `npm run lint`.

However, there are still some styles that the linter cannot pick up, notably in Java or Objective-C code.

**Objective-C:**

* Space after `@property` declarations
* Brackets on _every_ `if`, on the _same_ line
* `- method`, `@interface`, and `@implementation` brackets on the following line
* _Try_ to keep it around 80 characters line length (sometimes it's just not possible...)
* `*` operator goes with the variable name (e.g. `NSObject *variableName;`)

**Java:**

* If a method call spans multiple lines closing bracket is on the same line as the last argument.
* If a method header doesn't fit on one line each argument goes on a separate line.
* 100 character line length

## License

By contributing to React Native, you agree that your contributions will be licensed under the [LICENSE](https://github.com/facebook/react-native/blob/master/LICENSE) file.
