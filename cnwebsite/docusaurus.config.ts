import type * as PluginContentDocs from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';
import path from 'path';
// const users = require('./showcase.json');
const versions = require('./versions.json');
const lastVersion = versions[0];
const cdnUrl = '';

export interface EditUrlButton {
  label: string;
  href: string;
}

const commonDocsOptions = {
  admonitions: {keywords: ['important'], extendDefaults: true},
  breadcrumbs: true,
  showLastUpdateAuthor: false,
  // showLastUpdateTime: true,
  editUrl:
    'https://github.com/reactnativecn/react-native-website/blob/production/cnwebsite/',
  remarkPlugins: [
    require('@react-native-website/remark-snackplayer'),
    require('@react-native-website/remark-codeblock-language-as-title'),
  ],
};

const isDeployPreview =
  process.env.PREVIEW_DEPLOY === 'true' ||
  (!!process.env.VERCEL && process.env.VERCEL_ENV === 'preview');

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  future: {
    // Turns Docusaurus v4 future flags on to make it easier to upgrade later
    v4: true,
    // Make Docusaurus build faster - enabled by default
    // See https://github.com/facebook/docusaurus/issues/10556
    // See https://github.com/facebook/react-native-website/pull/4268
    // See https://docusaurus.io/blog/releases/3.6
    faster: (process.env.DOCUSAURUS_FASTER ?? 'true') === 'true',
  },
  title: 'React Native 中文网',
  tagline: '使用React来编写原生应用的框架',
  organizationName: 'reactnativecn',
  projectName: 'react-native',
  url: 'https://reactnative.cn',
  baseUrl: '/',
  clientModules: [
    require.resolve('./modules/snackPlayerInitializer.js'),
    require.resolve('./modules/jumpToFragment.js'),
  ],
  trailingSlash: false,
  scripts: [
    {src: '//snack.expo.dev/embed.js', defer: true},
    {src: '//cdn.wwads.cn/js/makemoney.js', defer: true},
  ],
  favicon: cdnUrl + 'img/favicon.ico',
  titleDelimiter: '·',
  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../cndocs',
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
        // blog: {
        //   path: 'blog',
        //   blogSidebarCount: 'ALL',
        //   blogSidebarTitle: 'All Blog Posts',
        //   feedOptions: {
        //     type: 'all',
        //     copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
        //   },
        // },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            // require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
          ],
        },
        googleAnalytics: {
          trackingID: 'UA-63485149-4',
        },
        gtag: {
          trackingID: 'UA-63485149-4',
        },
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      'content-docs',
      {
        id: 'architecture',
        path: 'architecture',
        routeBasePath: '/architecture',
        sidebarPath: require.resolve('./sidebarsArchitecture.ts'),
        ...commonDocsOptions,
      } satisfies PluginContentDocs.Options,
    ],
    // [
    //   'content-docs',
    //   /** @type {import('@docusaurus/plugin-content-docs').Options} */
    //   ({
    //     id: 'contributing',
    //     path: 'contributing',
    //     routeBasePath: '/contributing',
    //     sidebarPath: require.resolve('./sidebarsContributing.json'),
    //     ...commonDocsOptions,
    //   }),
    // ],
    // [
    //   '@docusaurus/plugin-pwa',
    //   {
    //     debug: true,
    //     offlineModeActivationStrategies: ['appInstalled', 'queryString'],
    //     pwaHead: [
    //       {
    //         tagName: 'link',
    //         rel: 'icon',
    //         href: '/img/pwa/manifest-icon-512.png',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'manifest',
    //         href: '/manifest.json',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'theme-color',
    //         content: '#20232a',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'apple-mobile-web-app-capable',
    //         content: 'yes',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'apple-mobile-web-app-status-bar-style',
    //         content: '#20232a',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'apple-touch-icon',
    //         href: '/img/pwa/manifest-icon-512.png',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'mask-icon',
    //         href: '/img/pwa/manifest-icon-512.png',
    //         color: '#06bcee',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'msapplication-TileImage',
    //         href: '/img/pwa/manifest-icon-512.png',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'msapplication-TileColor',
    //         content: '#20232a',
    //       },
    //     ],
    //   },
    // ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
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
      title: 'React Native 中文网',
      logo: {
        src: cdnUrl + 'img/header_logo.svg',
        alt: 'React Native 中文网',
      },
      style: 'dark',
      items: [
        {
          label: '开发文档',
          type: 'dropdown',
          position: 'right',
          items: [
            {
              label: '入门指南',
              type: 'doc',
              docId: 'getting-started',
            },
            {
              label: '组件',
              type: 'doc',
              docId: 'components-and-apis',
            },
            {
              label: 'API',
              type: 'doc',
              docId: 'accessibilityinfo',
            },
            {
              label: '架构',
              type: 'doc',
              docId: 'architecture-overview',
              docsPluginId: 'architecture',
            },
          ],
        },
        {
          label: '讨论',
          href: '//github.com/reactnativecn/react-native-website/issues',
          position: 'right',
        },
        {
          label: '热更新',
          href: '//pushy.reactnative.cn',
          position: 'right',
          className: 'hot-link',
        },
        {
          to: '/about',
          label: '关于',
          position: 'right',
        },
        // {
        //   to: '/help',
        //   label: 'Community',
        //   position: 'right',
        // },
        // {
        //   to: '/blog',
        //   label: 'Blog',
        //   position: 'right',
        // },
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: '所有版本',
            },
          ],
        },
        {
          href: '//github.com/facebook/react-native',
          'aria-label': 'GitHub repository',
          position: 'right',
          className: 'navbar-github-link',
        },
      ],
    },
    image: cdnUrl + 'img/logo-og.png',
    footer: {
      style: 'dark',
      copyright: `React Native 中文网 © ${new Date().getFullYear()} 武汉青罗网络科技有限公司
      <a style="margin-left:10px" href="http://beian.miit.gov.cn/">鄂ICP备20002031号-3</a>
      <img style="width:25px" src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="鄂公网安备 42011202001821号">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011202001821">鄂公网安备 42011202001821号</a>
      `,
    },
    algolia: {
      appId: 'GJGDC5L5HP',
      apiKey: 'a4ac5b2b47a99cdef76344ab09708d6a',
      indexName: 'reactnative_cn',
      contextualSearch: false,
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
      options: {
        fontFamily:
          '"Optimistic Display", system-ui, -apple-system, sans-serif',
      },
    },
    metadata: [
      {
        name: 'description',
        content: '使用React来编写原生应用的框架',
      },
      {property: 'og:title', content: 'React Native'},
      {
        property: 'og:description',
        content: '使用React来编写原生应用的框架',
      },
      {property: 'og:url', content: 'https://reactnative.cn'},
      {
        property: 'og:image',
        content: cdnUrl + 'img/logo-og.png',
      },
      // {name: 'twitter:card', content: 'summary'},
      // {
      //   name: 'twitter:image',
      //   content: 'https://reactnative.dev/img/logo-og.png',
      // },
    ],
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
