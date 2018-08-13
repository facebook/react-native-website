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
          <h1>The React Native Community</h1>
          <h2>Where To Get Help</h2>
          <p>
            If you need help with your React Native app, the right place to go
            depends on the type of help that you need.
          </p>
          <h3>Repository</h3>
          <p>
            <strong>React Native</strong> is worked on full-time by Facebook's
            product infrastructure engineering team. But there are far more
            people in the community who make key contributions and fix things;
            if the issue you are facing is code related, you should consider
            checking the open issues in the main repo and create a new one
            following the template if it's something none faced yet.
          </p>
          <h3>Stack Overflow</h3>
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
          <h2>Staying up to date</h2>
          <h3>Official channels</h3>
          <p>
            The [React Twitter account](https://twitter.com/reactjs) covers both
            React and React Native. Follow the React Native [Twitter
            account](https://twitter.com/reactnative) and
            [blog](/react-native/blog/) to find out what's happening in the
            world of React Native.
          </p>
          <h3>Discussion Forum</h3>
          <p>
            For longer-form conversations about React Native, we’ve set up a{" "}
            <a href="https://discuss.reactjs.org/t/welcome-react-native-community-group/10239">
              discussion forum at <strong>discuss.reactjs.org</strong>
            </a>. This forum is a great place for discussion about best
            practices and application architecture as well as the future of
            React Native. If you have an answerable code-level question, please
            post it to Stack Overflow instead.
          </p>
          <h3>Proposals</h3>
          <p>Discussions and proposals repo</p>
          <h3>Conferences</h3>
          <p>
            There are a lot of [React Native
            Meetups](http://www.meetup.com/topics/react-native/) that happen
            around the world. Often there is React Native content in React
            meetups as well. Sometimes we have React conferences. We posted the
            [videos from React.js Conf
            2017](https://www.youtube.com/playlist?list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0),
            [React.js Conf
            2016](https://www.youtube.com/playlist?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY),
            and [React.js Conf
            2015](https://www.youtube.com/watch?list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr&v=KVZ-P-ZI6W4).
            We'll probably have more conferences in the future, too. Stay tuned.
            You can also find a list of dedicated React Native conferences
            [here](http://www.awesome-react-native.com/#conferences).
          </p>
          <h2>Communities at large</h2>
          <h3>Reactiflux Chat</h3>
          <p>
            If you need an answer right away, check out the{" "}
            <a href="https://discord.gg/0ZcbPKXt5bZjGY5n">Reactiflux Discord</a>{" "}
            community. There are usually a number of React Native experts there
            who can help out or point you to somewhere you might want to look.
          </p>
          <h3>DevTo</h3>
          <p>bla</p>
          <h3>Spectrum</h3>
          <p>bla</p>
        </Container>
      </div>
    );
  }
}

Help.defaultProps = {
  language: "en"
};

module.exports = Help;
