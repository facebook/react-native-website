const users = require('./showcase.json');
const versions = require('./versions.json');

module.exports = {
  title: 'React Native',
  tagline: 'A framework for building native apps using React',
  organizationName: 'facebook',
  projectName: 'react-native',
  url: 'https://reactnative.dev',
  baseUrl: '/',
  clientModules: [require.resolve('./snackPlayerInitializer.js')],
  scripts: [
    {
      src:
        'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    {src: 'https://snack.expo.io/embed.js', defer: true},
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
  onBrokenLinks: 'throw',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/facebook/react-native-website/blob/master/website/',
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          remarkPlugins: [require('@react-native-website/remark-snackplayer')],
          editCurrentVersion: true,
          onlyIncludeVersions:
            process.env.PREVIEW_DEPLOY === 'true'
              ? ['current', ...versions.slice(0, 2)]
              : undefined,
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
        },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
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
      title: 'React Native',
      logo: {
        src: 'img/header_logo.svg',
        alt: 'React Native',
      },
      style: 'dark',
      items: [
        {
          label: 'Docs',
          type: 'doc',
          docId: 'getting-started',
          position: 'right',
        },
        {
          label: 'Components',
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
          to: '/help',
          label: 'Community',
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
    image: 'img/logo-og.png',
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            {
              label: 'Tutorial',
              to: 'docs/tutorial',
            },
            {
              label: 'Components and APIs',
              to: 'docs/components-and-apis',
            },
            {
              label: 'More Resources',
              to: 'docs/more-resources',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'The React Native Community',
              to: 'help',
            },
            {
              label: "Who's using React Native?",
              to: 'showcase',
            },
            {
              label: 'Ask Questions on Stack Overflow',
              to: 'https://stackoverflow.com/questions/tagged/react-native',
            },
            {
              label: 'Contributor Guide',
              to:
                'https://github.com/facebook/react-native/blob/master/CONTRIBUTING.md',
            },
            {
              label: 'DEV Community',
              to: 'https://dev.to/t/reactnative',
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
              label: 'Twitter',
              href: 'https://twitter.com/reactnative',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/react-native',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'React',
              href: 'https://reactjs.org/',
            },
            {
              label: 'Privacy Policy',
              to: 'https://opensource.facebook.com/legal/privacy',
            },
            {
              label: 'Terms of Service',
              href: 'https://opensource.facebook.com/legal/terms',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'img/oss_logo.png',
        href: 'https://opensource.facebook.com',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
    },
    algolia: {
      apiKey: '2c98749b4a1e588efec53b2acec13025',
      indexName: 'react-native-v2',
      contextualSearch: true,
    },
    googleAnalytics: {
      trackingID: 'UA-41298772-2',
    },
    gtag: {
      trackingID: 'UA-41298772-2',
    },
    metadatas: [
      {
        property: 'og:image',
        content: 'https://reactnative.dev/img/logo-og.png',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'twitter:image',
        content: 'https://reactnative.dev/img/logo-og.png',
      },
      {name: 'twitter:site', content: '@reactnative'},
    ],
  },
};
