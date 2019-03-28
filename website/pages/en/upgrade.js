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

class Button extends React.Component {
  render() {
    return (
      <a
        className="big-button"
        href={this.props.href}
        target={this.props.target}>
        {this.props.children}
      </a>
    );
  }
}

class Upgrade extends React.Component {
  render() {
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
          <h3>What type of project do you have?</h3>
          <h3>What are some of your app dependencies?</h3>
          <h3>How would you like to update?</h3>
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
