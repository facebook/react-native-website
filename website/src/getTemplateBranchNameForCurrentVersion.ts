import {useActiveVersion} from '@docusaurus/plugin-content-docs/client';

export function getTemplateBranchNameForCurrentVersion() {
  const version = useActiveVersion(undefined);
  return version.label === 'Next' ? 'main' : `${version.label}-stable`;
}
