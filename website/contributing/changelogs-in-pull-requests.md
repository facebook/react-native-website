---
title: Changelogs in Pull Requests
---

The changelog entry in your pull request serves as a sort of "tl;dr:" for your changes: do they affect Android? are these breaking changes? is something new being added?

Providing a changelog using a standardized format helps release coordinators write release notes. Please include a changelog as part of your pull request description. Your pull request description will be used as the commit message should the pull request get merged.

### Format

A changelog entry has the following format

```
## Changelog:

[Category] [Type] - Message
```

The "Category" field may be one of:

- **Android**, for changes that affect Android.
- **iOS**, for changes that affect iOS.
- **General**, for changes that do not fit any of the other categories.
- **Internal**, for changes that would not be relevant to developers consuming the release notes.

The "Type" field may be one of:

- **Breaking**, for breaking changes.
- **Added**, for new features.
- **Changed**, for changes in existing functionality.
- **Deprecated**, for soon-to-be removed features.
- **Removed**, for now removed features.
- **Fixed**, for any bug fixes.
- **Security**, in case of vulnerabilities.

Finally, the "Message" field may answer "what and why" on a feature level. Use this to briefly tell React Native users about notable changes.

For more detail, see [How do I make a good changelog?](https://keepachangelog.com/en/1.0.0/#how) and [Why keep a changelog?](https://keepachangelog.com/en/1.0.0/#why)

### Examples

- `[General] [Added] - Add snapToOffsets prop to ScrollView component`
- `[General] [Fixed] - Fix various issues in snapToInterval on ScrollView component`
- `[iOS] [Fixed] - Fix crash in RCTImagePicker`

### FAQ

#### What if my pull request contains changes to both Android and JavaScript?

Use the Android category.

#### What if my pull request contains changes to both Android and iOS?

Use the General category if the change is made in a single pull request.

#### What if my pull request contains changes to Android, iOS, and JavaScript?

Use the General category if the change is made in a single pull request.

#### What if...?

Any changelog entry is better than none. If you are unsure if you have picked the right category, use the "message" field to succinctly describe your change.

These entries are used by the [`@rnx-kit/rn-changelog-generator`](https://github.com/microsoft/rnx-kit/tree/main/incubator/rn-changelog-generator) script to build a rough draft, which is then edited by a release coordinator.

Your notes will be used to add your change to the correct location in the final release notes.
