import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export default {
  contributing: [
    {
      type: 'category',
      label: 'Contributing to React Native',
      collapsed: false,
      collapsible: true,
      items: [
        'overview',
        'versioning-policy',
        'how-to-report-a-bug',
        'how-to-contribute-code',
        'how-to-build-from-source',
        'how-to-run-and-write-tests',
        'how-to-open-a-pull-request',
        'changelogs-in-pull-requests',
        'contribution-license-agreement',
        {
          type: 'category',
          label: 'Managing repository',
          collapsed: false,
          collapsible: false,
          items: [
            'triaging-github-issues',
            'labeling-github-issues',
            'managing-pull-requests',
            'bots-reference',
          ],
        },
      ],
    },
  ],
} satisfies SidebarsConfig;
