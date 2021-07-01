/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  useActivePlugin,
  useActiveVersion,
  useDocVersionSuggestions,
} from '@theme/hooks/useDocs';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';

function UnreleasedVersionLabel({siteTitle, versionLabel}) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that he's browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionLabel}</b>,
      }}>
      {
        'This is unreleased documentation for {siteTitle} {versionLabel} version.'
      }
    </Translate>
  );
}

function UnmaintainedVersionLabel({siteTitle, versionLabel}) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionLabel}</b>,
      }}>
      {
        'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'
      }
    </Translate>
  );
}

function LatestVersionSuggestionLabel({versionLabel, to, onClick}) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label userd to tell the user that he's browsing an unmaintained doc version"
      values={{
        versionLabel,
        latestVersionLink: (
          <b>
            <Link to={to} onClick={onClick}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label">
                latest version
              </Translate>
            </Link>
          </b>
        ),
      }}>
      {
        'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).'
      }
    </Translate>
  );
}

const getVersionMainDoc = version =>
  version.docs.find(doc => doc.id === version.mainDocId);

function DocVersionSuggestions() {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {pluginId} = useActivePlugin({
    failfast: true,
  });
  const {savePreferredVersionName} = useDocsPreferredVersion(pluginId);
  const activeVersion = useActiveVersion(pluginId);
  const {
    latestDocSuggestion,
    latestVersionSuggestion,
  } = useDocVersionSuggestions(pluginId); // No suggestion to be made

  if (!latestVersionSuggestion || activeVersion.isLast) {
    return <></>;
  }

  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);
  return (
    <div className="alert alert--warning margin-bottom--md" role="alert">
      <div>
        {activeVersion.name === 'current' ? (
          <UnreleasedVersionLabel
            siteTitle={siteTitle}
            versionLabel={activeVersion.label}
          />
        ) : (
          <UnmaintainedVersionLabel
            siteTitle={siteTitle}
            versionLabel={activeVersion.label}
          />
        )}
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel
          versionLabel={latestVersionSuggestion.label}
          to={latestVersionSuggestedDoc.path}
          onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
        />
      </div>
    </div>
  );
}

export default DocVersionSuggestions;
