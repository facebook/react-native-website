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
const versions = require(process.cwd() + '/versions.json');

const formConfig = {
  projectTypes: ['React Native'],
  upgradeTypes: ['React Native CLI', 'Automated', 'Manually'],
};

const Button = ({onClick, children}) => (
  <a className="big-button" onClick={onClick}>
    {children}
  </a>
);

const Select = ({selected, options, onChange}) => {
  const renderOption = option => (
    <option key={option} value={option}>
      {option}
    </option>
  );
  return (
    <select value={selected} onChange={onChange}>
      {options.map(option => renderOption(option))}
    </select>
  );
};

const RadioGroup = ({name, values, selected, onChange}) => {
  const renderRadio = value => (
    <div key={value}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={value === selected}
        onChange={onChange}
      />
      <span>{value}</span>
    </div>
  );

  return <div>{values.map(value => renderRadio(value))}</div>;
};

class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectType: 'React Native',
      upgradeType: 'React Native CLI',
      fromVersion: '0.58',
      toVersion: siteConfig.defaultVersionShown,
    };
  }

  render() {
    const {fromVersion, toVersion, projectType, upgradeType} = this.state;

    return (
      <div className="pageContainer">
        <Container className="mainContainer documentContainer postContainer">
          <h1>Upgrading to new React Native versions</h1>
          <p>
            Upgrading to new versions of React Native will give you access to
            more APIs, views, developer tools and other goodies. Upgrading
            requires a small amount of effort, but we try to make it easy for
            you.
          </p>
          <h2>Select the options matching your project</h2>
          <p>
            Finding the best way to upgrade can be a challenge. So, we built a
            tool to make it easier that helps you upgrade with ease.
          </p>
          <h3>React Native Version</h3>
          <p>
            Select which version you are coming from and which version you want
            to upgrade to. We auto-selected version{' '}
            {siteConfig.defaultVersionShown} for your convenience.
          </p>
          <Select
            options={versions}
            selected={fromVersion}
            onChange={version => this.setState({fromVersion: version})}
          />
          to
          <Select
            options={versions}
            selected={toVersion}
            onChange={version => this.setState({toVersion: version})}
          />
          <h3>What type of project do you have?</h3>
          <p>
            Select what type of React Native project you're using. Eventually we
            will support Expo and ejected Expo projects but for now we only
            allow for React Native ones.
          </p>
          <RadioGroup
            name="projectType"
            values={formConfig.projectTypes}
            selected={this.state.projectType}
            onChange={type => this.setState({upgradeType: type})}
          />
          <h3>How would you like to upgrade?</h3>
          <RadioGroup
            name="upgradeType"
            values={formConfig.upgradeTypes}
            selected={upgradeType}
            onChange={type => this.setState({upgradeType: type})}
          />
          <div className="buttons-unit">
            <Button>Show me how to upgrade!</Button>
          </div>
        </Container>
      </div>
    );
  }
}

Upgrade.defaultProps = {
  language: 'en',
};

module.exports = Upgrade;
