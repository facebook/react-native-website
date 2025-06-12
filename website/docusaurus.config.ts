/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';
import path from 'path';

import users from './showcase.json';
import versions from './versions.json';

// See https://docs.netlify.com/configure-builds/environment-variables/
const isProductionDeployment =
  !!process.env.NETLIFY && process.env.CONTEXT === 'production';

const lastVersion = versions[0];
const copyright = `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc.`;

export interface EditUrlButton {
  label: string;
  href: string;
}

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl: (options => {
    const baseUrl =
      'https://github.com/facebook/react-native-website/edit/main';
    const nextReleasePath = `docs/${options.docPath}`;
    const isNextRelease = options.version === 'current';
    const buttons: EditUrlButton[] = [
      {
        label: isNextRelease ? 'Edit this page' : 'Edit page for next release',
        href: `${baseUrl}/${nextReleasePath}`,
      },
    ];
    if (!isNextRelease) {
      const label =
        options.version === lastVersion
          ? 'Edit page for current release'
          : `Edit page for ${options.version} release`;
      const thisVersionPath = path.posix.join(
        'website',
        options.versionDocsDirPath,
        options.docPath
      );
      buttons.push({
        label,
        href: `${baseUrl}/${thisVersionPath}`,
      });
    }
    return JSON.stringify(buttons);
  }) as PluginContentDocs.EditUrlFunction,
  remarkPlugins: [
    require('@react-native-website/remark-snackplayer'),
    require('@react-native-website/remark-codeblock-language-as-title'),
  ],
};

const isDeployPreview = process.env.PREVIEW_DEPLOY === 'true';

const config: Config = {
  future: {
    // Turns Docusaurus v4 future flags on to make it easier to upgrade later
    v4: true,
    // Make Docusaurus build faster - enabled by default
    // See https://github.com/facebook/docusaurus/issues/10556
    // See https://github.com/facebook/react-native-website/pull/4268
    // See https://docusaurus.io/blog/releases/3.6
    experimental_faster: (process.env.DOCUSAURUS_FASTER ?? 'true') === 'true',
  },

  title: 'React Native',
  tagline: 'A framework for building native apps using React',
  organizationName: 'facebook',
  projectName: 'react-native',
  url: 'https://reactnative.dev',
  baseUrl: '/',
  clientModules: [
    require.resolve('./modules/snackPlayerInitializer.js'),
    require.resolve('./modules/jumpToFragment.js'),
  ],
  trailingSlash: false, // because trailing slashes can break some existing relative links
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    {
      src: 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js',
      defer: true,
    },
    {src: 'https://snack.expo.dev/embed.js', defer: true},
    {src: 'https://platform.twitter.com/widgets.js', async: true},
  ],
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',
  customFields: {
    users,
    facebookAppId: '1677033832619985',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars'),
          editCurrentVersion: true,
          onlyIncludeVersions: isDeployPreview
            ? ['current', ...versions.slice(0, 2)]
            : undefined,
          versions: {
            [lastVersion]: {
              badge: false, // Do not show version badge for last RN version
            },
          },
          ...commonDocsOptions,
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          feedOptions: {
            type: 'all',
            copyright,
          },
          onInlineAuthors: 'ignore',
          // Ignore for now due to old posts
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
          ],
        },
        // TODO: GA is deprecated, remove once we're sure data is streaming in GA4 via gtag.
        googleAnalytics: {
          trackingID: 'UA-41298772-2',
        },
        gtag: {
          trackingID: 'G-58L13S6BDP',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    function disableExpensiveBundlerOptimizationPlugin() {
      return {
        name: 'disable-expensive-bundler-optimizations',
        configureWebpack(_config, isServer) {
          // This optimization is expensive and only reduces by 3% the JS assets size
          // Let's skip it for local and deploy preview builds
          // See also https://github.com/facebook/docusaurus/discussions/11199
          return {
            optimization: {
              concatenateModules: isProductionDeployment ? !isServer : false,
            },
          };
        },
      };
    },
    [
      'content-docs',
      {
        id: 'architecture',
        path: 'architecture',
        routeBasePath: '/architecture',
        sidebarPath: require.resolve('./sidebarsArchitecture'),
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      'content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: '/contributing',
        sidebarPath: require.resolve('./sidebarsContributing'),
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      'content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: '/community',
        sidebarPath: require.resolve('./sidebarsCommunity'),
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#20232a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#20232a',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/pwa/manifest-icon-512.png',
            color: '#06bcee',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#20232a',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'react-conf',
      content:
        'Join us for React Conf on Oct 7-8. <a target="_blank" rel="noopener noreferrer" href="https://conf.react.dev">Learn more</a>.',
      backgroundColor: '#20232a',
      textColor: '#fff',
      isCloseable: false,
    },
    prism: {
      defaultLanguage: 'tsx',
      theme: require('./core/PrismTheme'),
      additionalLanguages: [
        'diff',
        'bash',
        'json',
        'java',
        'kotlin',
        'objectivec',
        'swift',
        'groovy',
        'ruby',
        'flow',
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-add-line',
          line: 'highlight-add-next-line',
          block: {start: 'highlight-add-start', end: 'highlight-add-end'},
        },
        {
          className: 'code-remove-line',
          line: 'highlight-remove-next-line',
          block: {
            start: 'highlight-remove-start',
            end: 'highlight-remove-end',
          },
        },
      ],
    },
    navbar: {
      title: 'React Native',
      logo: {
        src: 'img/header_logo.svg',
        alt: 'React Native',
      },
      style: 'dark',
      items: [
        {
          label: 'Development',
          type: 'dropdown',
          position: 'right',
          items: [
            {
              label: 'Guides',
              type: 'doc',
              docId: 'getting-started',
            },
            {
              label: 'Components',
              type: 'doc',
              docId: 'components-and-apis',
            },
            {
              label: 'APIs',
              type: 'doc',
              docId: 'accessibilityinfo',
            },
            {
              label: 'Architecture',
              type: 'doc',
              docId: 'architecture-overview',
              docsPluginId: 'architecture',
            },
          ],
        },
        {
          type: 'doc',
          docId: 'overview',
          label: 'Contributing',
          position: 'right',
          docsPluginId: 'contributing',
        },
        {
          type: 'doc',
          docId: 'overview',
          label: 'Community',
          position: 'right',
          docsPluginId: 'community',
        },
        {
          to: '/showcase',
          label: 'Showcase',
          position: 'right',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          href: 'https://github.com/facebook/react-native',
          'aria-label': 'GitHub repository',
          position: 'right',
          className: 'navbar-github-link',
        },
      ],
    },
    image: 'img/logo-share.png',
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Develop',
          items: [
            {
              label: 'Guides',
              to: 'docs/getting-started',
            },
            {
              label: 'Components',
              to: 'docs/components-and-apis',
            },
            {
              label: 'APIs',
              to: 'docs/accessibilityinfo',
            },
            {
              label: 'Architecture',
              to: 'architecture/overview',
            },
          ],
        },
        {
          title: 'Participate',
          items: [
            {
              label: 'Showcase',
              to: 'showcase',
            },
            {
              label: 'Contributing',
              to: 'contributing/overview',
            },
            {
              label: 'Community',
              to: 'community/overview',
            },
            {
              label: 'Directory',
              href: 'https://reactnative.directory/',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-native',
            },
          ],
        },
        {
          title: 'Find us',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'X',
              href: 'https://x.com/reactnative',
            },
            {
              label: 'Bluesky',
              href: 'https://bsky.app/profile/reactnative.dev',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/react-native',
            },
          ],
        },
        {
          title: 'Explore More',
          items: [
            {
              label: 'ReactJS',
              href: 'https://react.dev/',
            },
            {
              label: 'Privacy Policy',
              href: 'https://opensource.fb.com/legal/privacy/',
            },
            {
              label: 'Terms of Service',
              href: 'https://opensource.fb.com/legal/terms/',
            },
          ],
        },
      ],
      logo: {
        alt: 'Meta Open Source Logo',
        src: 'img/oss_logo.svg',
        href: 'https://opensource.fb.com/',
      },
      copyright,
    },
    algolia: {
      appId: '8TDSE0OHGQ',
      apiKey: '83cd239c72f9f8b0ed270a04b1185288',
      indexName: 'react-native-v2',
      contextualSearch: true,
    },
    metadata: [
      {
        property: 'og:image',
        content: 'https://reactnative.dev/img/logo-share.png',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'twitter:image',
        content: 'https://reactnative.dev/img/logo-share.png',
      },
      {name: 'twitter:site', content: '@reactnative'},
    ],
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
