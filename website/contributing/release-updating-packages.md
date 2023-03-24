---
id: release-updating-packages
title: Updating monorepo packages
---

This page contains relevant information about how to update packages in the `react-native` [monorepo](https://github.com/react-native-community/discussions-and-proposals/pull/480).

## Finding all packages that have unpublished changes

#### Use case

1. You want to identify each package with unpublished (on npm) changes and update its version. This can be used in release cycle if you have merged some fixes to `*-stable` branch.
2. You want to force-bump each public package to the next minor version. This happens usually before release branch cutoff. In this case, please specify `release-branch-cutoff` argument before executing the script.

#### How to execute

`yarn bump-all-updated-packages` or `yarn bump-all-updated-packages --release-branch-cutoff`

#### Pseudocode

```
check that no git changes are present

for each package:
    if package is private -> skip

    if release-branch-cutoff argument is provided:
        bump package version to the next minor
        return

    grep id of the last commit that changed package
    grep id of the last commit that changed version of the package

    if these ids are different:
        bump package version (minor or patch)

align packages versions across whole monorepo
commit changes if required
```

### Notes

At the final step you will be asked if you want to commit all these changes. Always confirm committing if you want these packages to be published then on CircleCI, because the workflow that does this [will check that commit has a tag inside its message](https://github.com/facebook/react-native/wiki/Release-and-its-automated-processes#notes-1).

Updated versions will also be updated in packages consumers. This means if `@react-native/x` has `@react-native/y` as a dependency and we bump version of `@react-native/y`, then `@react-native/x` will have updated version of `@react-native/y` specified.

## Publishing an updated package to npm

We have a [CircleCI workflow](https://github.com/facebook/react-native/blob/292268ea3fa429cd1a1245b6239e0a85b59da02a/.circleci/config.yml#L1801-L1804), which runs **only on main or stable-\* branches**.

#### Pseudocode

```
for each package:
    if last commit contains version change:
        if this commit has specific message:
            publish package to npm
```

#### Notes

This workflow explicitly checks that commit has a specific [tag](https://github.com/facebook/react-native/blob/main/scripts/monorepo/constants.js#L11) inside its message. This is used to prevent accidental publishes. To create such specific commit you should use [script from above](https://github.com/facebook/react-native/wiki/Release-and-its-automated-processes#finding-all-packages-that-have-unpublished-changes).

If you want to bump package version and publish it to npm registry, your version change should be exactly in the last commit. This is because of two things:

1. If multiple commits are merged to `main` branch at the same time, CircleCI will execute workflows only once on top of the latest commit.
2. To determine that version was changed we [evaluate the difference between HEAD and HEAD~1](https://github.com/facebook/react-native/blob/daeee2a6619db59391de3b7c6e08db0dbe2331aa/scripts/monorepo/find-and-publish-all-bumped-packages.js#L32-L35).

Example script output, where no package versions were changed:
<img width="800" alt="Screenshot 2023-01-03 at 12 21 01" src="https://user-images.githubusercontent.com/28902667/210362611-97530b4d-0405-499c-9a3c-5542e069e929.png" />

## Align package versions across monorepo

> Side note: We do not anticipate that this script might be useful in future. With current monorepo setup, all packages versions should be updated and aligned by using `bump-all-updated-packages` script, both in `main` and `*-stable` branches.

#### Use case

You (or someone from release cycle team) want to verify that the latest versions of @react-native/\* packages are specified across monorepo, including `template`.

#### How to execute

`yarn align-package-versions`

#### Pseudocode

```
check that no git changes are present

for each package x:
   for each package y:
       if y has x as dependency:
           validate that y uses the latest version of x
```
