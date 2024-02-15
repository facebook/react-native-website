---
id: release-updating-packages
title: Updating monorepo packages
---

This page contains relevant information about how to update packages in the `react-native` [monorepo](https://github.com/react-native-community/discussions-and-proposals/pull/480).

:::note

From 0.72 onwards, all packages versions should be updated and aligned by using `bump-all-updated-packages` script, both in `main` and `*-stable` branches.
Practically, this means that the secondary command `align-package-versions` is only present in the 0.71 branch - and neither are present in versions lower than that.

:::

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
if last commit contains '#publish-packages-to-npm'
    for each package:
        if package version is not present on npm registry:
            publish package to npm
```

#### Notes

This workflow explicitly checks that commit has a specific [tag](https://github.com/facebook/react-native/blob/main/scripts/monorepo/constants.js#L11) inside its message. This is used to prevent accidental publishes. To create such specific commit you should use [script from above](https://github.com/facebook/react-native/wiki/Release-and-its-automated-processes#finding-all-packages-that-have-unpublished-changes).

## Align package versions across monorepo

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
