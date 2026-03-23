import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export default {
  architecture: [
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture-overview',
        'landing-page',
        {
          type: 'category',
          label: 'Rendering',
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
          label: 'Build Tools',
          collapsible: false,
          collapsed: false,
          items: ['bundled-hermes'],
        },
        'architecture-glossary',
      ],
    },
  ],
} satisfies SidebarsConfig;
