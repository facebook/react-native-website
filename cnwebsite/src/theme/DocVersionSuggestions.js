import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import {
  useActivePlugin,
  useActiveVersion,
  useDocVersionSuggestions,
} from '@theme/hooks/useDocs';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';

const getVersionMainDoc = version =>
  version.docs.find(doc => doc.id === version.mainDocId);

function DocVersionSuggestions() {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {pluginId} = useActivePlugin({failfast: true});

  const {savePreferredVersionName} = useDocsPreferredVersion(pluginId);

  const activeVersion = useActiveVersion(pluginId);
  const {
    latestDocSuggestion,
    latestVersionSuggestion,
  } = useDocVersionSuggestions(pluginId);

  // No suggestion to be made
  if (!latestVersionSuggestion) {
    return null;
  }

  // try to link to same doc in latest version (not always possible)
  // fallback to main doc of latest version
  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);

  return (
    <div className="alert alert--warning margin-bottom--md" role="alert">
      {activeVersion.name === 'current' ? (
        <div>
          注意：这是尚未发布的测试版本的文档。
        </div>
      ) : (
        <div>
          This is documentation for {siteTitle}{' '}
          <strong>{activeVersion.label}</strong>, which is no longer actively
          maintained.
        </div>
      )}
      <div className="margin-top--md">
        要查看当前正式版本的文档，请点击{' '}
        <strong>
          <Link
            to={latestVersionSuggestedDoc.path}
            onClick={() =>
              savePreferredVersionName(latestVersionSuggestion.name)
            }>
            最新正式版文档
          </Link>
        </strong>{' '}
        ({latestVersionSuggestion.label}).
      </div>
    </div>
  );
}

export default DocVersionSuggestions;
