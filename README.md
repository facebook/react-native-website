# [reactnative.dev](https://reactnative.dev/) &middot; [![CC BY 4.0 license](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](LICENSE-docs) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md) <a href="https://twitter.com/intent/follow?screen_name=reactnative"><img src="https://img.shields.io/twitter/follow/reactnative.svg?label=Follow%20@reactnative" alt="Follow @reactnative" /></a>

This repo contains the website configuration and documentation powering the [React Native website](https://reactnative.dev/).

If you are looking for the source code of the [React Native Archive website](https://archive.reactnative.dev/) select the [`archive`](https://github.com/facebook/react-native-website/tree/archive) branch.

## Contents

- [Getting started](#%EF%B8%8F-getting-started)
- [Overview](#-overview)
- [Website configuration](#-website-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## ✈️ Getting started

### Prerequisites

1. [Git](https://git-scm.com/downloads).
1. [Node](https://nodejs.org/en/download/) _(version 12 or greater)_.
1. [Yarn](https://yarnpkg.com/lang/en/docs/install/) _(version 1.5 or greater)_.
1. A fork of the repo _(for any contributions)_.
1. A clone of the `react-native-website` repo.

### Installation

1. `cd react-native-website` to go into the project root.
1. Run `yarn` to install the website's workspace dependencies.

### Running locally

1. Run `yarn start` to start the development server _(powered by [Docusaurus](https://v2.docusaurus.io))_.
1. Open <http://localhost:3000/> site in your favorite browser.

## 📖 Overview

If you would like to **_contribute an edit or addition to the docs,_** read through our [style guide](STYLEGUIDE.md) before you write anything.
Almost all our content is generated from markdown files you can find in the `docs`, `website/architecture` and `website/contributing` directories.

**_To edit the internals of how the site is built,_** you may want to get familiarized with how the site is built. The React Native website is a static site generated using [Docusaurus](https://docusaurus.io/).
The website configuration can be found in the `website` directory. Visit the Docusaurus website to learn more about all the available configuration options.

### Directory Structure

The following is a high-level overview of relevant files and folders.

```
react-native-website/
├── docs/
│   ├── [BASE VERSIONED DOC FILES]
│   └── ...
└── website/
    ├── architecture/
    │   ├── [ARCHITECTURE DOC FILES]
    │   └── ...
    ├── blog/
    │   ├── [BLOG POSTS]
    │   └── ...
    ├── contributing/
    │   ├── [CONTRIBUTING DOC FILES]
    │   └── ...
    ├── core/
    │   ├── [CUSTOM COMPONENTS]
    │   └── ...
    ├── src/
    │   ├── css/
    │   │   ├── [CUSTOM STYLES]
    │   │   └── ...
    │   ├── pages/
    │   │   ├── [STATIC PAGES]
    │   │   └── ...
    │   └── theme/
    │   │   ├── [SWIZZLED COMPONENTS]
    │   │   └── ...
    ├── static/
    │   ├── blog/
    │   │   └── assets/
    │   ├── docs/
    │   │   └── assets/
    │   └── img/
    ├── versioned_docs/
    │   ├── [GENERATED VERSIONED DOC FILES]
    │   └── ...
    ├── versioned_sidebars/
    │   ├── [GENERATED VERSIONED SIDEBARS]
    │   └── ...
    ├── docusaurus.config.js
    ├── package.json
    ├── showcase.json
    ├── sidebars.json
    ├── sidebarsArchitecture.json
    ├── sidebarsContributing.json
    └── versions.json
```

### Documentation sources

As mentioned above, the `docs` folder contains the source files for docs from "Guides", "Components" and "APIs" tabs on the React Native website (versioned docs).
The doc files for the "Architecture" and "Contribution" tabs are located inside `website` in the respective directories (unversioned/static docs).
In most cases, you will only want to edit the files within those directories.

If you're adding a new doc or you need to alter the order the docs appear in the sidebar, take a look at the `sidebars.json`, `sidebarsArchitecture.json` and `sidebarsContributing.json` files in the `website` directory. The sidebar files contain a list of document ids that should match those defined in the header metadata (aka frontmatter) of the docs markdown files.

### Versioned docs

Part of the React Native website is versioned to allow users to go back and see the Guides or API reference documentation for any given release. A new version of the website is generally generated whenever there is a new React Native release. When this happens, any changes made to the `docs` and `website/sidebars.json` files will be copied over to the corresponding location within `website/versioned_docs` and `website/versioned_sidebars`.

> **_Note:_** Do not edit the auto-generated files within `versioned_docs` or `versioned_sidebars` unless you are sure it is necessary. Edits made to older versions will not be propagated to newer versions of the versioned docs.

Docusaurus keeps track of the list of versions for the site in the `website/versions.json` file. The ordering of versions in this file should be in reverse chronological order.

#### Cutting a new version

##### After RC

The React Native website lints and typechecks documents in "next". The version of React Native used by the linter should be updated before a release for consistency and to catch any documents/examples where APIs have changed.

This can be done by updating the `package.json` and configuration files in `script/lint-examples` the same way a React Native application would be updated. The diff of these files can be seen using a tool like [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/?from=0.70.6&to=0.71.0).

##### After Release

1. `cd react-native-website` to go into the project root.
1. `cd website` to go into the website portion of the project.
1. Run `yarn version:cut <newVersion>` where `<newVersion>` is the new version being released.

## 🔧 Website configuration

The main config file for the website can be found at `website/docusaurus.config.js`. This file tells [Docusaurus how to build the website](https://v2.docusaurus.io/docs/configuration). Edits to this file are rarely necessary.

The `core` subdirectory contains JavaScript and React components that are the core part of the website.

The `src/pages` subdirectory contains the React components that make up the non-documentation pages of the site, such as the homepage.

The `src/theme` subdirectory contains the swizzled React components from the Docusaurus theme.

The `showcase.json` file contains the list of users that are highlighted in the React Native showcase.

## 👏 Contributing

### Create a branch

1. `git checkout main` from any folder in your local `react-native-website` repository.
1. `git pull origin main` to ensure you have the latest main code.
1. `git checkout -b the-name-of-my-branch` to create a branch.
    > replace `the-name-of-my-branch` with a suitable name, such as `update-animations-page`

### Make the change

1. Follow the "[Running locally](#running-locally)" instructions.
1. Save the files and check in the browser.
1. Some changes may require a server restart to generate new files. (Pages in `docs` always do!)
1. Edits to pages in `docs` will only be visible in the latest version of the documentation, called "Next", located under the `docs/next` path.

Visit **<http://localhost:3000/docs/next/YOUR-DOCS-PAGE>** to see your work.

> Visit <http://localhost:3000/versions> to see the list of all versions of the docs.

### Test the change

If possible, test any visual changes in all latest versions of the following browsers:

- Chrome and Firefox on the desktop.
- Chrome and Safari on mobile.

### Push it

1. Run `yarn prettier` and `yarn language:lint` in `./website` directory to ensure your changes are consistent with other files in the repo.
1. `git add -A && git commit -m "My message"` to stage and commit your changes.
    > replace `My message` with a commit message, such as `Fixed header logo on Android`
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [react-native-website repo](https://github.com/facebook/react-native-website) and you should see recently pushed branches.
1. Follow GitHub's instructions.
1. Describe briefly your changes (in case of visual changes, please include screenshots).

## 📄 License

React Native is [MIT licensed](./LICENSE).

React Native documentation is [Creative Commons licensed](./LICENSE-docs).
