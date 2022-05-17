const users = require('./showcase.json');
const versions = require('./versions.json');

const lastVersion = versions[0];
const copyright = `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc.`;

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl:
    'https://github.com/facebook/react-native-website/blob/master/website/',
  remarkPlugins: [require('@react-native-website/remark-snackplayer')],
};

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Native',
  tagline: 'A framework for building native apps using React',
  organizationName: 'facebook',
  projectName: 'react-native',
  url: 'https://reactnative.dev',
  baseUrl: '/',
  clientModules: [require.resolve('./snackPlayerInitializer.js')],
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
  webpack: {
    jsLoader: isServer => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        format: isServer ? 'cjs' : undefined,
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editCurrentVersion: true,
          onlyIncludeVersions:
            process.env.PREVIEW_DEPLOY === 'true'
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
        },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
          ],
        },
        googleAnalytics: {
          trackingID: 'UA-41298772-2',
        },
        gtag: {
          trackingID: 'UA-41298772-2',
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'architecture',
        path: 'architecture',
        routeBasePath: '/architecture',
        sidebarPath: require.resolve('./sidebarsArchitecture.json'),
        ...commonDocsOptions,
      }),
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'contributing',
        path: 'contributing',
        routeBasePath: '/contributing',
        sidebarPath: require.resolve('./sidebarsContributing.json'),
        ...commonDocsOptions,
      }),
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
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'support_ukraine',
        content:
          'Support Ukraine 🇺🇦 <a target="_blank" rel="noopener noreferrer" href="https://opensource.facebook.com/support-ukraine"> Help Provide Humanitarian Aid to Ukraine</a>.',
        backgroundColor: '#20232a',
        textColor: '#fff',
        isCloseable: false,
      },
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
          'flow',
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
            label: 'Guides',
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
            label: 'Architecture',
            type: 'doc',
            docId: 'architecture-overview',
            position: 'right',
            docsPluginId: 'architecture',
          },
          {
            to: '/contributing/how-to-contribute',
            label: 'Contributing',
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
                href: 'https://stackoverflow.com/questions/tagged/react-native',
              },
              {
                label: 'Contributor Guide',
                href: 'https://github.com/facebook/react-native/blob/main/CONTRIBUTING.md',
              },
              {
                label: 'DEV Community',
                href: 'https://dev.to/t/reactnative',
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
          alt: 'Facebook Open Source Logo',
          src: 'img/oss_logo.png',
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
          content: 'https://reactnative.dev/img/logo-og.png',
        },
        {name: 'twitter:card', content: 'summary_large_image'},
        {
          name: 'twitter:image',
          content: 'https://reactnative.dev/img/logo-og.png',
        },
        {name: 'twitter:site', content: '@reactnative'},
      ],
    }),
};
