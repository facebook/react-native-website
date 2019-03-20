/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const RemarkablePlugins = require('./core/RemarkablePlugins');

const users = require('./showcase.json');
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
  editUrl: 'https://github.com/facebook/react-native-website/blob/master/docs/',
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {page: 'help', label: 'Community'},
    {blog: true, label: 'Blog'},
    {search: true},
    {href: repoUrl, label: 'GitHub'},
  ],
  headerIcon: 'img/header_logo.png',
  footerIcon: 'img/header_logo.png',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: 'rgb(34, 34, 34)',
    secondaryColor: '#05A5D1',
    tintColor: '#005068',
    backgroundColor: '#f5fcff',
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
  scripts: ['https://snack.expo.io/embed.js', baseUrl + 'js/codeblocks.js'],
  cleanUrl: true,
};

module.exports = siteConfig;
