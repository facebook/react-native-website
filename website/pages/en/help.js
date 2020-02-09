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

class Help extends React.Component {
  render() {
    return (
      <div className="pageContainer HelpPage">
        <Container className="mainContainer documentContainer postContainer">
          <h1 className="postHeaderTitle">The React Native Community</h1>
          <p>
            There are a lot of developers around the world using React Native.
            This is a brief overview of where you can find them.
          </p>
          <h2>Where To Get Help</h2>
          <p>
            If you need help with your React Native app, the right place to go
            depends on the type of help that you need.
          </p>
          <h3>Repository</h3>
          <p>
            The core of <strong>React Native</strong> is worked on full-time by
            Facebook's React Native team. But there are far more people in the
            community who make key contributions and fix things. If the issue
            you are facing is code related, you should consider checking the
            open issues in the{' '}
            <a href="https://github.com/facebook/react-native/issues">
              main repository
            </a>
            . If you cannot find an existing issue, please{' '}
            <a href="https://github.com/facebook/react-native/issues/new?template=bug_report.md">
              use the Bug Report template
            </a>{' '}
            to create an issue with a minimal example.
          </p>
          <h3>Stack Overflow</h3>
          <p>
            Many members of the community use Stack Overflow to ask questions.
            Read through the{' '}
            <a href="http://stackoverflow.com/questions/tagged/react-native?sort=frequent">
              existing questions
            </a>{' '}
            tagged with <strong>react-native</strong> or{' '}
            <a href="http://stackoverflow.com/questions/ask?tags=react-native">
              ask your own
            </a>
            !
          </p>
          <h2>Staying up to date</h2>
          <h3>Official channels</h3>
          <p>
            The <a href="https://twitter.com/reactjs">React Twitter account</a>{' '}
            covers both React and React Native. Follow the React Native{' '}
            <a href="https://twitter.com/reactnative">Twitter account</a> and{' '}
            <a href="/react-native/blog/">blog</a> to find out what's happening
            in the world of React Native.
          </p>
          <h3>Proposals</h3>
          <p>
            React Native is still a young framework, and its rapid release cycle
            leaves the door open for discussing how it can evolve at every step
            of the way. If you want to know what the current proposals and RFCs
            are talking about, you can read through the{' '}
            <a href="https://github.com/react-native-community/discussions-and-proposals">
              Discussions and Proposals repository
            </a>
            {'.'}
          </p>
          <h3>Conferences</h3>
          <p>
            There are a lot of{' '}
            <a href="http://www.meetup.com/topics/react-native/">
              React Native Meetups
            </a>{' '}
            that happen around the world. Often there is React Native content in
            React meetups as well. React Native has been covered often in past
            React Conf talks. Videos for these talks can be found online in the
            following playlists:{' '}
            <a href="https://www.youtube.com/watch?v=WXYPpY_mElQ">
              React Conf 2018
            </a>
            {', '}
            <a href="https://www.youtube.com/playlist?list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0">
              React Conf 2017
            </a>
            {', '}
            <a href="https://www.youtube.com/playlist?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY">
              React Conf 2016
            </a>
            {', '}
            and{' '}
            <a href="https://www.youtube.com/watch?list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr&v=KVZ-P-ZI6W4">
              React Conf 2015
            </a>
            {'. '}
            The next <a href="https://conf.reactjs.org/">React Conf</a> will
            take place October 24 and 25 in Henderson, Nevada. You can also find
            a list of dedicated React Native conferences{' '}
            <a href="http://www.awesome-react-native.com/#conferences">here</a>
            {'.'}
          </p>
          <h3>React Native Show</h3>
          <p>
            The React Native Show is a video series from the React Native team
            covering updates to React Native:
          </p>
          <p>
            <iframe
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              src="https://www.youtube-nocookie.com/embed/bjwwIqaKSo4"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          </p>
          <h2>Communities</h2>
          <h3>Reactiflux Chat</h3>
          <p>
            If you need an answer right away, check out the{' '}
            <a href="https://discord.gg/reactiflux">Reactiflux Discord</a>{' '}
            community. There are usually a number of React Native experts there
            who can help out or point you to somewhere you might want to look.
          </p>
          <h3>Forum-like groups</h3>
          <p>
            If you want to create less temporary conversations, check out the{' '}
            <a href="https://spectrum.chat/react-native">
              React Native Spectrum
            </a>{' '}
            community or the{' '}
            <a href="https://www.facebook.com/groups/react.native.community">
              React Native Facebook Group
            </a>
            {', '} which is more focused on post announcements, blog posts,
            talks, videos, cool new libraries, and apps.{' '}
            <a href="https://forums.expo.io">The Expo Forums</a> are a good
            place to get help if you are using Expo.
          </p>
          <h3>Company-based Communities</h3>
          <p>
            Some companies actively involved in the React Native have also their
            own communication channels focused towards the projects they
            maintain, like{' '}
            <a href="https://discordapp.com/invite/zwR2Cdh">
              Callstack.io's Discord server
            </a>
            {', '}
            <a href="https://discord.gg/C9aK28N">
              Invertase.io's Discord server (e.g. React Native Firebase)
            </a>
            {', '}
            <a href="https://infiniteredcommunity.herokuapp.com/">
              Infinite Red's Slack Group
            </a>
            {' and '}
            <a href="https://slack.expo.io/">The Expo Slack Group</a>.
          </p>
          <h3>Content sharing</h3>
          <p>
            <a href="https://dev.to/t/reactnative">DevTo community's</a> and{' '}
            <a href="https://medium.com/tag/react-native">Medium's</a> React
            Native tag are places where you can share React Native projects,
            articles and tutorials as well as start discussions and ask for
            feedback on React Native related topics. (but remember to give some
            love to the{' '}
            <a href="https://github.com/facebook/react-native-website">
              main documentation
            </a>{' '}
            too!)
          </p>
        </Container>
      </div>
    );
  }
}

Help.defaultProps = {
  language: 'en',
};

module.exports = Help;
