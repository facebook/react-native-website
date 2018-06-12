/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

const pinnedApps = siteConfig.users.filter(app => {
  return app.pinned;
});

class Button extends React.Component {
  render() {
    return (
      <a
        className="big-button"
        href={this.props.href}
        target={this.props.target}
      >
        {this.props.children}
      </a>
    );
  }
}

class HomeCallToAction extends React.Component {
  render() {
    return (
      <div>
        <Button
          href={siteConfig.baseUrl + "docs/getting-started.html"}
          target="_self"
        >
          搭建环境
        </Button>
        <Button href={siteConfig.baseUrl + "docs/tutorial.html"} target="_self">
          开始使用
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
        <div className="text">React Native中文网</div>
        <div className="minitext">使用JavaScript和React编写原生移动应用</div>

        <div className="buttons-unit">
          <HomeCallToAction />
        </div>
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
    if (!app.icon.startsWith("http")) {
      imgSource = siteConfig.baseUrl + "img/showcase/" + app.icon;
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
              <h2>使用JavaScript和React编写原生移动应用</h2>
              <MarkdownBlock>
                React Native使你只使用JavaScript也能编写原生移动应用。
                它在设计原理上和React一致，通过声明式的组件机制来搭建丰富多彩的用户界面。
              </MarkdownBlock>
            </div>
            <MarkdownBlock>
              {`\`\`\`javascript
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class WhyReactNativeIsSoGreat extends Component {
  render() {
    return (
      <View>
        <Text>
          如果你喜欢在Web上使用React，那你也肯定会喜欢React Native.
        </Text>
        <Text>
          基本上就是用原生组件比如'View'和'Text'
          来代替web组件'div'和'span'。
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
              <h2>React Native应用是真正的移动应用</h2>
              <MarkdownBlock>
                React Native产出的并不是“网页应用”，
                或者说“HTML5应用”，又或者“混合应用”。
                最终产品是一个真正的移动应用，从使用感受上和用Objective-C或Java编写的应用相比几乎是无法区分的。
                React Native所使用的基础UI组件和原生应用完全一致。
                你要做的就是把这些基础组件使用JavaScript和React的方式组合起来。
              </MarkdownBlock>
            </div>
            <MarkdownBlock>
              {`\`\`\`javascript
import React, { Component } from 'react';
import { Image, ScrollView, Text } from 'react-native';

class AwkwardScrollingImageWithText extends Component {
  render() {
    return (
      <ScrollView>
        <Image
          source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
          style={{width: 320, height:180}}
        />
        <Text>
          在iOS上，React Native的ScrollView组件封装的是原生的UIScrollView。
          在Android上，封装的则是原生的ScrollView。

          在iOS上，React Native的Image组件封装的是原生的UIImageView。
          在Android上，封装的则是原生的ImageView。

          React Native封装了这些基础的原生组件，使你在得到媲美原生应用性能的同时，还能受益于React优雅的架构设计。 
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
              <h2>别再傻等编译了！</h2>
              <div>
                <MarkdownBlock>
                  React Native让你可以快速迭代开发应用。
                  比起传统原生应用漫长的编译过程，现在你可以在瞬间刷新你的应用。开启[Hot
                  Reloading](docs/debugging.html#自动刷新)的话，甚至能在保持应用运行状态的情况下热替换新代码！
                  试试看吧，包你双击666。
                </MarkdownBlock>
              </div>
            </div>
            <img src="https://media.giphy.com/media/13WZniThXy0hSE/giphy.gif" />
          </div>
        </Container>
        <Container>
          <div className="blockElement">
            <div className="blockContent">
              <h2>可随时呼叫原生外援</h2>
              <div>
                <MarkdownBlock>
                  React Native完美兼容使用Objective-C、Java或是Swift编写的组件。
                  如果你需要针对应用的某一部分特别优化，中途换用原生代码编写也很容易。
                  想要应用的一部分用原生，一部分用React Native也完全没问题 ——
                  Facebook的应用就是这么做的。
                </MarkdownBlock>
              </div>
            </div>
            <MarkdownBlock>
              {`
\`\`\`javascript
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TheGreatestComponentInTheWorld } from './your-native-code';

class SomethingFast extends Component {
  render() {
    return (
      <View>
        <TheGreatestComponentInTheWorld />
        <Text>
          上面这个TheGreatestComponentInTheWorld组件完全可以使用原生Objective-C、
          Java或是Swift来编写 - 开发流程并无二致。
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

/*
class MiniShowcase extends React.Component {
  render() {
    return (
      <div className="home-showcase-section">
        <h2>Who's using React Native?</h2>
        <p>
          Thousands of apps are using React Native, from established Fortune 500
          companies to hot new startups. If you're curious to see what can be
          accomplished with React Native,{" "}
          <a href={siteConfig.baseUrl + "showcase.html"}>
            check out these apps
          </a>!
        </p>
        <div className="logos">
          <AppList apps={pinnedApps} />
        </div>
      </div>
    );
  }
}
*/
// const onAdClicked = gainfo => {
//   ga("send", "event", "ad", "clicked", gainfo);
// };

const Banner = () => {
  const { banner: { img, text, link, topicId, gainfo } } = siteConfig.adData;
  return (
    <div className="vip">
      <a
        target="_blank"
        href={link || siteConfig.bbsUrl + "/topic/" + topicId}
        // onClick={() => onAdClicked(gainfo)}
      >
        <img title={text} src={siteConfig.baseUrl + "img" + img} />
      </a>
    </div>
  );
};

class Index extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <Banner />
        <HeaderHero />
        <Features />
        {/* <MiniShowcase /> */}
        <Hero>
          <HomeCallToAction />
        </Hero>
      </div>
    );
  }
}

module.exports = Index;
