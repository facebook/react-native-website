// const users = require('./showcase.json');
const cdnUrl =
  '//cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/';

module.exports = {
  title: 'React Native 中文网',
  tagline: '使用React来编写原生应用的框架',
  organizationName: 'reactnativecn',
  projectName: 'react-native',
  url: 'https://reactnative.cn',
  baseUrl: '/',
  ssrTemplate: require('./ssr.html.template'),
  clientModules: [require.resolve('./snackPlayerInitializer.js')],
  scripts: [
    {
      src:
        '//cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    {src: '//snack.expo.io/embed.js', defer: true},
    {src: '//wwads.cn/js/ads.js', defer: true},
  ],
  favicon: cdnUrl + 'img/favicon.ico',
  titleDelimiter: '·',
  // customFields: {
  //   users,
  //   facebookAppId: '1677033832619985',
  // },
  onBrokenLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/reactnativecn/react-native-website/blob/production/cnwebsite',
          path: '../cndocs',
          sidebarPath: require.resolve('./sidebars.json'),
          remarkPlugins: [require('@react-native-website/remark-snackplayer')],
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
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    './sitePlugin',
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
    prism: {
      defaultLanguage: 'jsx',
      theme: require('./core/PrismTheme'),
      additionalLanguages: [
        'java',
        'kotlin',
        'objectivec',
        'swift',
        'groovy',
        'ruby',
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
          label: '文档',
          type: 'doc',
          docId: 'getting-started',
          position: 'right',
        },
        {
          label: '组件',
          type: 'doc',
          docId: 'components-and-apis',
          position: 'right',
        },
        {
          label: 'API',
          type: 'doc',
          docId: 'accessibilityinfo',
          position: 'right',
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
          className: 'pushy',
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
      apiKey: '7ab53ed26928639bae06ef0f6165f68b',
      indexName: 'reactnative_cn',
      contextualSearch: true,
    },
    googleAnalytics: {
      trackingID: 'UA-63485149-4',
    },
    gtag: {
      trackingID: 'UA-63485149-4',
    },
    metadatas: [
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
  },
};
