/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.props.config.baseUrl + 'docs/getting-started.html'}>
              Getting Started
            </a>
            <a href={this.props.config.baseUrl + 'docs/tutorial.html'}>
              Tutorial
            </a>
            <a
              href={
                this.props.config.baseUrl + 'docs/components-and-apis.html'
              }>
              Components and APIs
            </a>
            <a href={this.props.config.baseUrl + 'docs/more-resources.html'}>
              More Resources
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.props.config.baseUrl + 'help.html'}>
              The React Native Community
            </a>
            <a href={this.props.config.baseUrl + 'showcase.html'}>
              Who's using React Native?
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/react-native"
              target="_blank">
              Ask Questions on Stack Overflow
            </a>
            <a href="https://github.com/facebook/react-native/blob/master/CONTRIBUTING.md">
              Contributor Guide
            </a>
            <a href="https://dev.to/t/reactnative" target="_blank">
              DEV Community
            </a>
          </div>
          <div>
            <h5>More Resources</h5>
            <a href={this.props.config.baseUrl + 'blog/'}>Blog</a>
            <a href="https://twitter.com/reactnative" target="_blank">
              Twitter
            </a>
            <a href="https://github.com/facebook/react-native" target="_blank">
              GitHub
            </a>
            <a href="http://reactjs.org" target="_blank">
              React
            </a>
          </div>
        </section>

        <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} Facebook Inc.
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
