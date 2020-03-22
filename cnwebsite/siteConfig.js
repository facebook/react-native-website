/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const RemarkablePlugins = require('./core/RemarkablePlugins');
const packageJson = require('./package.json');

// const users = require("./showcase.json");

const baseUrl = '/';
const repoUrl = 'https://github.com/facebook/react-native';
const cdnUrl = 'https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/';
let communityRepos = [];
try {
  communityRepos = require('./community-repos.json');
} catch (e) {
  // We don't care if there are no repos synced locally
  // We only care if we are on the CI server and about to deploy
}
const defaultVersionShown = '0.61';
const siteConfig = {
  organizationName: 'reactnativecn',
  cname: 'www.react-native.cn',
  cdnUrl,
  title: 'React Native 中文网',
  tagline: '使用React来编写原生应用的框架',
  baseUrl,
  projectName: 'react-native',
  repoUrl,
  defaultVersionShown,
  users: [],
  communityRepos,
  editUrl:
    '//github.com/reactnativecn/react-native-website/blob/production/cndocs/',
  headerLinks: [
    {doc: 'getting-started', label: '文档'},
    // { blog: true, label: "博客" },
    {doc: 'activityindicator', label: 'API'},
    // {
    //   href: '//bbs.reactnative.cn/category/3/blogs',
    //   external: true,
    //   label: '博客',
    // },
    {href: '//github.com/reactnativecn/react-native-website/issues', external: true, label: '讨论'},
    {href: '//update.reactnative.cn', label: '热更新', external: true},
    {page: 'about', label: '关于'},
    {search: true},
    {href: repoUrl, label: 'GitHub'},
    {href: '//zh-hans.reactjs.org/', external: true, label: 'React'},
  ],
  headerIcon: cdnUrl + 'img/header_logo.svg',
  footerIcon: cdnUrl + 'img/header_logo.png',
  favicon: cdnUrl + 'img/favicon.ico',
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
  algolia: {
    apiKey: '7ab53ed26928639bae06ef0f6165f68b',
    indexName: 'reactnative_cn',
    algoliaOptions: {
      // TODO
      // facetFilters: ["version:VERSION"],
      hitsPerPage: 5,
    },
  },
  // facebookAppId: "1677033832619985",
  // twitter: "reactnative",
  markdownPlugins: [
    // RemarkablePlugins.SnackPlayer,
    RemarkablePlugins.ReactNativeWebPlayer,
  ],
  highlight: {
    theme: 'solarized-dark',
    version: packageJson.dependencies['highlight.js'].replace('^', '')
  },
  gaTrackingId: 'UA-63485149-4',
  scripts: [
    // 'https://snack.expo.io/embed.js',
    'https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js',
    // 'https://buttons.github.io/buttons.js',
    cdnUrl + 'js/codeblocks.js',
    cdnUrl + 'js/tabs.js',
    cdnUrl + 'js/doccode.js', 
  ],
  cleanUrl: true,
  customDocsPath: 'cndocs',
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  docsSideNavCollapsible: true,
  onPageNav: 'separate',
};

module.exports = siteConfig;
