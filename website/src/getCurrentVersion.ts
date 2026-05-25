import {useActiveVersion} from '@docusaurus/plugin-content-docs/client';

export function getCurrentVersion() {
  const version = useActiveVersion(undefined);
  return version.label === 'Next' ? 'latest' : version.label;
}
