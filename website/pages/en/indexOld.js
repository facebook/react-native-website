/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + '/siteConfig.js');

const pinnedApps = siteConfig.users.filter(app => app.pinned);

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

// FIXME keep as an svg
function Logo() {
  return (
    <svg
      width={350}
      height={350}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348">
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" stroke-width="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

class HomeCallToAction extends React.Component {
  render() {
    return (
      <div>
        <Button
          href={siteConfig.baseUrl + 'docs/getting-started'}
          target="_self">
          Get started
        </Button>
        <Button href={siteConfig.baseUrl + 'docs/tutorial'} target="_self">
          Learn basics
        </Button>
      </div>
    );
  }
}

class Hero extends React.Component {
  render() {
    return <div className="hero">{this.props.children}</div>;
  }
}

class HeaderHero extends React.Component {
  render() {
    return (
      <Hero>
        <Container>
          <div className="grid">
            <div className="grid-column">
              <div className="text">React Native</div>
              <div className="tagline">Learn once, write anywhere.</div>
              <div className="buttons-unit">
                <HomeCallToAction />
              </div>
            </div>
            <div className="grid-column image-cell">
              <Logo />
            </div>
          </div>
        </Container>
      </Hero>
    );
  }
}

class AppList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._renderApp = this._renderApp.bind(this);
  }

  render() {
    return <div>{this.props.apps.map(this._renderApp)}</div>;
  }

  _renderApp(app, i) {
    return (
      <div className="showcase" key={i}>
        <a href={app.infoLink}>{this._renderAppIcon(app)}</a>
      </div>
    );
  }

  _renderAppIcon(app) {
    let imgSource = app.icon;
    if (!app.icon.startsWith('http')) {
      imgSource = siteConfig.baseUrl + 'img/showcase/' + app.icon;
    }
    return <img src={imgSource} alt={app.name} />;
  }
}

class Features extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>Build native mobile apps using JavaScript and React</h2>
              <MarkdownBlock>
                React Native lets you build mobile apps using only JavaScript.
                It uses the same design as React, letting you compose a rich
                mobile UI using declarative components.
              </MarkdownBlock>
            </div>
            <MarkdownBlock>
              {`\`\`\`jsx
import React, {Component} from 'react';
import {Text, View} from 'react-native';

class HelloReactNative extends Component {
  render() {
    return (
      <View>
        <Text>
          If you like React, you'll also like React Native.
        </Text>
        <Text>
          Instead of 'div' and 'span', you'll use native components
          like 'View' and 'Text'.
        </Text>
      </View>
    );
  }
}
\`\`\``}
            </MarkdownBlock>
          </div>
        </Container>
        <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>A React Native app is a real mobile app</h2>
              <MarkdownBlock>
                The apps you are building with React Native aren't mobile web
                apps because React Native uses the same fundamental UI building
                blocks as regular iOS and Android apps. Instead of using Swift,
                Kotlin or Java, you are putting those building blocks together
                using JavaScript and React.
              </MarkdownBlock>
            </div>
            <MarkdownBlock>
              {`\`\`\`javascript
import React, {Component} from 'react';
import {Image, ScrollView, Text} from 'react-native';

class ScrollingImageWithText extends Component {
  render() {
    return (
      <ScrollView>
        <Image
          source={{uri: 'https://facebook.github.io/react-native/img/header_logo.png'}}
          style={{width: 66, height: 58}}
        />
        <Text>
          On iOS, a React Native ScrollView uses a native UIScrollView.
          On Android, it uses a native ScrollView.

          On iOS, a React Native Image uses a native UIImageView.
          On Android, it uses a native ImageView.

          React Native wraps the fundamental native components, giving you
          the performance of a native app using the APIs of React.
        </Text>
      </ScrollView>
    );
  }
}
\`\`\`
`}
            </MarkdownBlock>
          </div>
        </Container>
        <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>Don't waste time recompiling</h2>
              <div>
                <MarkdownBlock>
                  React Native lets you build your app faster. Instead of
                  recompiling, you can reload your app instantly. With [Hot
                  Reloading](http://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading),
                  you can even run new code while retaining your application
                  state. Give it a try - it's a magical experience.
                </MarkdownBlock>
              </div>
            </div>
            <img
              src="https://media.giphy.com/media/13WZniThXy0hSE/giphy.gif"
              alt="Hot Reloading Demonstration"
            />
          </div>
        </Container>
        <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>Use native code when you need to</h2>
              <div>
                <MarkdownBlock>
                  React Native combines smoothly with components written in
                  Swift, Java, or Objective-C. It's simple to drop down to
                  native code if you need to optimize a few aspects of your
                  application. It's also easy to build part of your app in React
                  Native, and part of your app using native code directly -
                  that's how the Facebook app works.
                </MarkdownBlock>
              </div>
            </div>
            <MarkdownBlock>
              {`
\`\`\`javascript
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {MapViewComponent} from './your-native-map-implementation';

class CustomMapView extends Component {
  render() {
    return (
      <View>
        <MapViewComponent />
        <Text>
          MapViewComponent could use native Swift, Java, or Objective-C -
          the product development process is the same.
        </Text>
      </View>
    );
  }
}
\`\`\`
`}
            </MarkdownBlock>
          </div>
        </Container>
      </div>
    );
  }
}

class MiniShowcase extends React.Component {
  render() {
    return (
      <div className="home-showcase-section">
        <h2>Who's using React Native?</h2>
        <p>
          Thousands of apps are using React Native, from established Fortune 500
          companies to hot new startups. If you're curious to see what can be
          accomplished with React Native,{' '}
          <a href={siteConfig.baseUrl + 'showcase'}>check out these apps</a>!
        </p>
        <div className="logos">
          <AppList apps={pinnedApps} />
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <HeaderHero />
        <Features />
        <MiniShowcase />
        <Hero>
          <HomeCallToAction />
        </Hero>
      </div>
    );
  }
}

module.exports = Index;
