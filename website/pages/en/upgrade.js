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
  projectTypes: ['React Native', 'Expo'],
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

const RadioGroup = ({name, values}) => {
  const renderRadio = value => (
    <div key={value}>
      <input type="radio" name={name} value={value} />
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
    const {fromVersion, toVersion} = this.state;

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
          <h3>React Native Version</h3>
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
          <RadioGroup name="projectType" values={formConfig.projectTypes} />
          <h3>How would you like to update?</h3>
          <RadioGroup name="projectType" values={formConfig.upgradeTypes} />
          <div className="buttons-unit">
            <Button>Show me how to update!</Button>
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
