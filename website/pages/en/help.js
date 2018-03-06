/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Help extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <Container className="mainContainer documentContainer postContainer">
          <h1>Where To Get Support</h1>
          <p>
            <strong>React Native</strong> is worked on full-time by Facebook's
            product infrastructure engineering team. But there are far more
            people in the community who make key contributions and fix things.
            So if you need help with your React Native app, the right place to
            go depends on the type of help that you need.
          </p>
          <h2>Stack Overflow</h2>
          <p>
            Many members of the community use Stack Overflow to ask questions.
            Read through the{" "}
            <a href="http://stackoverflow.com/questions/tagged/react-native?sort=frequent">
              existing questions
            </a>{" "}
            tagged with <strong>react-native</strong> or{" "}
            <a href="http://stackoverflow.com/questions/ask?tags=react-native">
              ask your own
            </a>!
          </p>
          <h2>Discussion Forum</h2>
          <p>
            For longer-form conversations about React Native, we’ve set up a{" "}
            <a href="https://discuss.reactjs.org/t/welcome-react-native-community-group/10239">
              discussion forum at <strong>discuss.reactjs.org</strong>
            </a>. This forum is a great place for discussion about best
            practices and application architecture as well as the future of
            React Native. If you have an answerable code-level question, please
            post it to Stack Overflow instead.
          </p>
          <h2>Reactiflux Chat</h2>
          <p>
            If you need an answer right away, check out the{" "}
            <a href="https://discord.gg/0ZcbPKXt5bZjGY5n">Reactiflux Discord</a>{" "}
            community. There are usually a number of React Native experts there
            who can help out or point you to somewhere you might want to look.
          </p>
          <h2>Twitter</h2>
          <p>
            For the latest news about React,{" "}
            <a href="https://twitter.com/reactnative">
              follow <strong>@reactnative</strong> on Twitter
            </a>.
          </p>
        </Container>
      </div>
    );
  }
}

Help.defaultProps = {
  language: "en"
};

module.exports = Help;
