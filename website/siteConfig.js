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
const baseUrl = '/react-native/';
const repoUrl = 'https://github.com/facebook/react-native';
const siteConfig = {
  title: 'React Native',
  tagline: 'A framework for building native apps using React',
  url: 'https://facebook.github.io',
  baseUrl,
  projectName: 'react-native',
  repoUrl,
  defaultVersionShown,
  users,
  communityRepos,
  editUrl: 'https://github.com/facebook/react-native-website/blob/master/docs/',
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {doc: 'activityindicator', label: 'API'},
    {page: 'help', label: 'Community'},
    {blog: true, label: 'Blog'},
    {search: true},
    {href: repoUrl, label: 'GitHub'},
  ],
  headerIcon: 'img/header_logo.png',
  footerIcon: 'img/header_logo.png',
  favicon: 'img/favicon.png',
  colors: {
    brand: '#61dafb', // electric blue
    dark: '#282c34', // dark blue
    darker: '#20232a', // really dark blue
    text: '#1a1a1a', // black substitute
    subtle: '#6d6d6d', // light grey for text
    divider: '#ececec', // very light grey
    primaryColor: 'rgb(34, 34, 34)',
    secondaryColor: '#888888',
    tintColor: '#f7f7f7', // slightly off white
    backgroundColor: 'white',
  },
  blogSidebarCount: 'ALL',
  algolia: {
    apiKey: '2c98749b4a1e588efec53b2acec13025',
    indexName: 'react-native-versions',
    algoliaOptions: {
      facetFilters: ['tags:VERSION'],
      hitsPerPage: 5,
    },
  },
  facebookAppId: '1677033832619985',
  twitter: 'reactnative',
  markdownPlugins: [
    RemarkablePlugins.SnackPlayer,
    RemarkablePlugins.ReactNativeWebPlayer,
  ],
  usePrism: ['javascript', 'js', 'jsx', 'java', 'objective-c', 'json'],
  highlight: {
    theme: 'solarized-dark',
  },
  gaTrackingId: 'UA-41298772-2',
  scripts: [
    'https://snack.expo.io/embed.js',
    'https://platform.twitter.com/widgets.js',
    'https://buttons.github.io/buttons.js',
    baseUrl + 'js/codeblocks.js',
  ],
  cleanUrl: true,
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  docsSideNavCollapsible: true,
};

module.exports = siteConfig;
