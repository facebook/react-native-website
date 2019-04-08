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

const Button = ({onClick, children, id}) => (
  <a className="big-button" onClick={onClick} id={id}>
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
      <h2>Select the options matching your project</h2>
      <p>
        Finding the best way to upgrade can be a challenge. So, we built a tool
        to make it easier that helps you upgrade with ease.
      </p>
      <h3>React Native Version</h3>
      <p>
        Select which version you are coming from and which version you want to
        upgrade to. We auto-selected version {fromVersion} for your convenience.
      </p>
      <Select options={versions} selected={fromVersion} id="fromSelect" />
      to
      <Select options={versions} selected={toVersion} id="toSelect" />
      <div className="buttons-unit">
        <Button id="upgradeButton">Show me how to upgrade!</Button>
      </div>
      <div id="results" className="hide">
        <Link id="diffLink" target="_blank">
          Diff here
        </Link>
        <br />
        <Link id="patchLink" target="_blank">
          Patch here
        </Link>
      </div>
    </Container>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // TODO: Once V2 Docusaurus lands we shouldn't do this.
          // see: https://github.com/facebook/Docusaurus/issues/582#issuecomment-382488782

          function showInstructions() {
            var results = document.getElementById('results');
            results.style.display = "block";

            var fromSelect = document.getElementById('fromSelect');
            var fromVersion = fromSelect.options[fromSelect.selectedIndex].value;

            var toSelect = document.getElementById('toSelect');
            var toVersion = toSelect.options[toSelect.selectedIndex].value;

            var diffLink = "https://github.com/pvinis/rn-diff-purge/compare/version/${fromVersion}..version/${toVersion}";
            var patchLink = "https://raw.githubusercontent.com/pvinis/rn-diff-purge/master/diffs/${fromVersion}..${toVersion}.diff";
            
            var diffLinkElement = document.getElementById('diffLink');
            diffLinkElement.href = diffLink;

            var patchLinkElement = document.getElementById('patchLink');
            patchLinkElement.href = patchLink;
          }
          var button = document.getElementById('upgradeButton');
          button.onclick = showInstructions;
        `,
      }}
    />
  </div>
);

Upgrade.defaultProps = {
  language: 'en',
};

module.exports = Upgrade;
