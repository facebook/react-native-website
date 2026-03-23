import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export default {
  community: [
    {
      type: 'category',
      label: 'Community',
      collapsed: false,
      collapsible: false,
      items: ['overview', 'staying-updated', 'communities', 'support'],
    },
  ],
} satisfies SidebarsConfig;
