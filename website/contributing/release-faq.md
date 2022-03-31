---
id: release-faq
title: Release FAQ
---

### What is a qualified pick request?

Judgement call, but using these dimensions to evaluate:

- Is a fix for an issue introduced in current release.
- Fix for a critical developer workflow.

### What is release blocking?

Judgement call, but using these dimensions to evaluate:

- Is it a new issue on the release candidate?
- Is it breaking a core experience of working in React Native?

### What versions does the release community commit to supporting?

We commit to handling issues on the current release and release candidate.
Any versions prior to this, we cannot commit to supporting.

### When will my fix make it into a release?

We follow a release cycle that is not strictly monthly - you can read more [about it here](https://github.com/react-native-community/discussions-and-proposals/issues/17). When creating a new release, we cut a new branch from `main` (e.g. `0.67-stable`), with all the merged commits up to this point. After this initial cut, new commits on `main` will only be included on this release if they get manually cherry picked. Otherwise, they will be included in the next stable version (when a new cut from `main` will happen). This means that once a pull request is merged to the [core `react-native` repo](https://github.com/facebook/react-native), it may take one or two months for the changes to make it into a stable React Native release.

### How do I know if my fix/feature is in a certain release?

To determine whether a fix or feature is present in a given release, you will need the commit hash where the fix or feature was added to the `main` branch of the core `react-native` repo. If you know the PR, you can look for the comment from **@facebook-github-bot** that says 'closed this in <COMMIT_HASH>'.

Once you have the commit hash, navigate to `https://github.com/facebook/react-native/commit/<COMMIT_HASH>`. Look closely at the commit message, underneath which you will find a list of tags associated with the commit.
These tags will tell you which releases contains this commit. For example, commit [a6768bfd70187634e587d7b2e92d2b6735a4037e](https://github.com/facebook/react-native/commit/a6768bfd70187634e587d7b2e92d2b6735a4037e) has the following tags as of this writing:
```plain
v0.67.0-rc.3 v0.67.0-rc.2 v0.67.0-rc.1 v0.67.0-rc.0 v0.66.3 v0.66.2 v0.66.1 v0.66.0 v0.66.0-rc.4 v0.66.0-rc.3 v0.66.0-rc.2 v0.66.0-rc.1 v0.66.0-rc.0 latest
```
These tags tell us that the commit first made it into the 0.66 release candidate, eventually landing in the 0.66 stable release. It is also present, as you'd expect, in the 0.67 release candidate (and should make it to 0.67 stable, and so on).

If the commit is only present in `main` (i.e. has no tags), then the commit has yet to be picked up by a release (or it may have been included in a follow up cherry pick for a patch version). You can expect it to be included in the next release candidate that is cut once the designed features have all landed.

### How can I find the status of the current release?

We have a dedicated [release discussions repo](https://github.com/reactwg/react-native-releases/discussions). We have a category for [new releases](https://github.com/reactwg/react-native-releases/discussions/categories/releases) and one for [patches](https://github.com/reactwg/react-native-releases/discussions/categories/patches).

- For a new release version, we track the status of each new release candidate patch with any ongoing blocking issues and checklist of work. [Example of releasing 0.67](https://github.com/reactwg/react-native-releases/discussions/1)
- For patches, a discussion is opened asking whether there are picks that qualify to run a patch (see qualifying picks). People can comment and share any picks from main and the release captain will run a patch when necessary and subsequently open a new discussion for the next patch version. Example of [discussion for 0.66.4](https://github.com/reactwg/react-native-releases/discussions/6), once it was released, the discussion is locked and a discussion for 0.66.5 is opened.

### What if I find a release blocker that needs escalation?

- Is there an existing release blocking issue?
  - If no, [create a release blocking issue via this form](https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2CType%3A+Upgrade+Issue&template=upgrade-regression-form.yml).
- Once you have a release blocking issue, share the issue with the [relevant release discussion](https://github.com/reactwg/react-native-releases/discussions).
