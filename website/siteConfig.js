/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const RemarkablePlugins = require('./core/RemarkablePlugins');

const users = require('./showcase.json');
let communityRepos = [];
try {
  communityRepos = require('./community-repos.json');
} catch (e) {
  // We don't care if there are no repos synced locally
  // We only care if we are on the CI server and about to deploy
}
const defaultVersionShown = '0.59';
const baseUrl = '/';
const repoUrl = 'https://github.com/facebook/react-native/tree/archive';
const siteConfig = {
  title: 'React Native Archive',
  tagline: 'A framework for building native apps using React',
  url: 'https://archive.reactnative.dev',
  baseUrl,
  projectName: 'react-native',
  cname: 'archive.reactnative.dev',
  repoUrl,
  defaultVersionShown,
  users,
  communityRepos,
  editUrl:
    'https://github.com/facebook/react-native-website/blob/archive/docs/',
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {doc: 'components-and-apis', label: 'Components'},
    {doc: 'accessibilityinfo', label: 'API'},
    {page: 'help', label: 'Community'},
    {search: true},
    {href: repoUrl, label: 'GitHub'},
  ],
  headerIcon: 'img/header_logo.svg',
  footerIcon: 'img/header_logo.png',
  favicon: 'img/favicon.ico',
  colors: {
    brand: '#61dafb', // electric blue
    dark: '#282c34', // dark blue
    deepdark: '#20232a', // really dark blue
    light: '#373940', // light blue
    text: '#1a1a1a', // black substitute
    subtle: '#6d6d6d', // light grey for text
    divider: '#ececec', // very light grey
    tintColor: '#f7f7f7', // slightly off white
    backgroundColor: 'white',
    // we don't use these any more but docusaurus complains if we don't
    primaryColor: 'black',
    secondaryColor: 'gray',
  },
  blogSidebarCount: 'ALL',
  algolia: {
    // apiKey: '2c98749b4a1e588efec53b2acec13025',
    appId: '2W9DUHXF3I',
    apiKey: 'f3a42b24f7c22d56073f9d1b024799f0',
    indexName: 'react-native-archive',
    algoliaOptions: {
      facetFilters: ['version:VERSION'],
      hitsPerPage: 5,
    },
  },
  facebookAppId: '1677033832619985',
  twitter: 'reactnative',
  twitterImage: 'img/logo-og.png',
  ogImage: 'img/logo-og.png',
  markdownPlugins: [
    RemarkablePlugins.SnackPlayer,
    RemarkablePlugins.ReactNativeWebPlayer,
  ],
  usePrism: [
    'javascript',
    'js',
    'jsx',
    'java',
    'objective-c',
    'json',
    'sh',
    'tsx',
  ],
  highlight: {
    theme: 'solarized-dark',
  },
  gaTrackingId: 'UA-41298772-2',
  scripts: [
    'https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js',
    'https://snack.expo.io/embed.js',
    'https://platform.twitter.com/widgets.js',
    'https://buttons.github.io/buttons.js',
    baseUrl + 'js/codeblocks.js',
    baseUrl + 'js/tabs.js',
    baseUrl + 'js/docs-rating.js',
  ],
  cleanUrl: true,
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  docsSideNavCollapsible: true,
  onPageNav: 'separate',
  slugPreprocessor: baseSlug =>
    baseSlug.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, ''),
};

module.exports = siteConfig;
