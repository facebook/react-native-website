/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + '/siteConfig.js');

// we must adjust the data to be x.y.z versions because we need this format
// https://github.com/pvinis/rn-diff-purge/compare/version/0.59.0..version/0.59.0
const versions = require(process.cwd() + '/versions.json').map(v => v + '.0');
const defaultVersionShown = siteConfig.defaultVersionShown + '.0';
const fromVersion = '0.58.0';
const toVersion = defaultVersionShown;

const Link = ({href, children, id, target}) => (
  <a href={href} id={id} target={target}>
    {children}
  </a>
);

const Select = ({selected, options, onChange, id}) => {
  const renderOption = option => (
    <option key={option} value={option}>
      {option}
    </option>
  );
  return (
    <select value={selected} onChange={onChange} id={id}>
      {options.map(option => renderOption(option))}
    </select>
  );
};

const Upgrade = () => (
  <div className="pageContainer">
    <Container className="mainContainer documentContainer postContainer">
      <h1>Upgrading to new React Native versions</h1>
      <p>
        Upgrading to new versions of React Native will give you access to more
        APIs, views, developer tools and other goodies. Upgrading requires a
        small amount of effort, but we try to make it easy for you.
      </p>
      <h2>Manual Upgrades</h2>
      <p>
        Some people have more success manually upgrading React Native. So, we
        built a tool to help you upgrade manually.
      </p>
      <h3>Select the options matching your project</h3>
      <p>
        Select which version you are coming from and which version you want to
        upgrade to. We auto-selected version {fromVersion} for your convenience.
      </p>
      <Select options={versions} selected={fromVersion} id="fromSelect" />
      {' to '}
      <Select options={versions} selected={toVersion} id="toSelect" />
      <div id="results">
        <h3>
          Manual Upgrade from <span id="fromVersion" /> to{' '}
          <span id="toVersion" />
        </h3>
        <p>
          Click on one of these links to see what you need to change to upgrade
          manually from the versions you selected above.
        </p>
        <p>
          <Link id="diffLink" target="_blank">
            View Diff →
          </Link>
        </p>
        <p>
          <Link id="patchLink" target="_blank">
            View Patch →
          </Link>
        </p>
      </div>
    </Container>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // TODO: Once V2 Docusaurus lands we shouldn't do this.
          // see: https://github.com/facebook/Docusaurus/issues/582#issuecomment-382488782

          function showInstructions() {
            var fromSelect = document.getElementById('fromSelect');
            var fromVersion = fromSelect.options[fromSelect.selectedIndex].value;

            var toSelect = document.getElementById('toSelect');
            var toVersion = toSelect.options[toSelect.selectedIndex].value;

            var diffLink = "https://github.com/react-native-community/rn-diff-purge/compare/release/${fromVersion}..release/${toVersion}";
            var patchLink = "https://raw.githubusercontent.com/react-native-community/rn-diff-purge/diffs/diffs/${fromVersion}..${toVersion}.diff";
            
            var diffLinkElement = document.getElementById('diffLink');
            diffLinkElement.href = diffLink;

            var patchLinkElement = document.getElementById('patchLink');
            patchLinkElement.href = patchLink;

            var fromVersionElement = document.getElementById('fromVersion');
            fromVersionElement.textContent = fromVersion;
            var toVersionElement = document.getElementById('toVersion');
            toVersionElement.textContent = toVersion;
          }

          var fromSelect = document.getElementById('fromSelect');
          fromSelect.onchange = showInstructions;

          var toSelect = document.getElementById('toSelect');
          toSelect.onchange = showInstructions;

          showInstructions();
        `,
      }}
    />
  </div>
);

Upgrade.defaultProps = {
  language: 'en',
};

module.exports = Upgrade;
