import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export default {
  architecture: [
    {
      type: 'category',
      label: '架构',
      collapsed: false,
      items: [
        'architecture-overview',
        'landing-page',
        {
          type: 'category',
          label: '渲染',
          collapsible: false,
          collapsed: false,
          items: [
            'fabric-renderer',
            'render-pipeline',
            'xplat-implementation',
            'view-flattening',
            'threading-model',
          ],
        },
        {
          type: 'category',
          label: '构建工具',
          collapsible: false,
          collapsed: false,
          items: ['bundled-hermes'],
        },
        'architecture-glossary',
      ],
    },
  ],
} satisfies SidebarsConfig;
