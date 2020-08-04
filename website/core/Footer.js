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
    const {baseUrl} = this.props.config;
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={baseUrl + 'docs/getting-started'}>Getting Started</a>
            <a href={baseUrl + 'docs/tutorial'}>Tutorial</a>
            <a href={baseUrl + 'docs/components-and-apis'}>
              Components and APIs
            </a>
            <a href={baseUrl + 'docs/more-resources'}>More Resources</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={baseUrl + 'help'}>The React Native Community</a>
            <a href={baseUrl + 'showcase'}>Who's using React Native?</a>
            <a
              href="https://stackoverflow.com/questions/tagged/react-native"
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
            <a href={baseUrl + 'blog'}>Blog</a>
            <a href="https://twitter.com/reactnative" target="_blank">
              Twitter
            </a>
            <a href="https://github.com/facebook/react-native" target="_blank">
              GitHub
            </a>
            <a href="https://reactjs.org" target="_blank">
              React
            </a>
          </div>
        </section>
        <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          className="fbOpenSource">
          <img
            src={baseUrl + 'img/oss_logo.png'}
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
