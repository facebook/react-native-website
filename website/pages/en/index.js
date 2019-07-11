const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + '/siteConfig.js');
const {baseUrl} = siteConfig;

function ActionButton({href, type = 'primary', target, children}) {
  return (
    <a className={`ActionButton ${type}`} href={href} target={target}>
      {children}
    </a>
  );
}

function HomeCallToAction() {
  return (
    <div>
      <ActionButton
        type="primary"
        href={baseUrl + 'docs/getting-started'}
        target="_self">
        Get started
      </ActionButton>
      <ActionButton
        type="secondary"
        href={baseUrl + 'docs/tutorial'}
        target="_self">
        Learn basics
      </ActionButton>
    </div>
  );
}

function TwitterButton({showCount = false}) {
  return (
    <a
      href="https://twitter.com/reactnative?ref_src=twsrc%5Etfw"
      class="twitter-follow-button"
      data-size="large"
      data-show-count={`${showCount}`}>
      Follow @reactnative
    </a>
  );
}

function GitHubButton() {
  return (
    <a
      class="github-button"
      href="https://github.com/facebook/react-native"
      data-icon="octicon-star"
      data-size="large"
      aria-label="Star facebook/react-native on GitHub">
      Star
    </a>
  );
}

function LogoAnimation() {
  return (
    <React.Fragment>
      <script src={`${baseUrl}/js/headerAnimation.js`} />
      <svg
        className="LogoAnimation init"
        width={400}
        height={400}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-200 -200 400 400">
        <title>React Logo</title>
        <clipPath id="border">
          <rect className="border" rx="0.5" fill="none" stroke="gray" />
        </clipPath>
        <g clip-path="url(#border)" className="logo">
          <g className="logoInner">
            <circle cx="0" cy="0" r="30" fill="#61dafb" />
            <g stroke="#61dafb" strokeWidth="15" fill="none" id="logo">
              <ellipse rx="165" ry="64" />
              <ellipse rx="165" ry="64" transform="rotate(60)" />
              <ellipse rx="165" ry="64" transform="rotate(120)" />
            </g>
          </g>
        </g>
        <rect className="border" id="border" fill="none" stroke="white" />
        <line
          x1="-30"
          x2="30"
          y1="130"
          y2="130"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          className="speaker"
        />
        <line
          x1="-20"
          x2="20"
          y1="130"
          y2="130"
          stroke="white"
          strokeWidth="15"
          className="stand"
        />
        <polygon
          points="-125,85 125,85, 160,125 -160,125"
          fill="white"
          stroke="white"
          strokeWidth="5"
          className="base"
        />
      </svg>
    </React.Fragment>
  );
}

/* TODO can we enforce max-width: 900px here? */
// TODO add "background" prop (dark|light|light2)
function Section({
  element = 'section',
  children,
  className,
  background = 'light',
  bottomSpacing = false,
}) {
  const El = element;
  const bottomSpacingClass = bottomSpacing ? 'bottomSpacing' : '';
  return (
    <El className={`Section ${className} ${background} ${bottomSpacingClass}`}>
      {children}
    </El>
  );
}

function TwoColumns({columnOne, columnTwo, reverse}) {
  return (
    <div className={`TwoColumns ${reverse ? 'reverse' : ''}`}>
      <div className={`column first ${reverse ? 'right' : 'left'}`}>
        {columnOne}
      </div>
      <div className={`column last ${reverse ? 'left' : 'right'}`}>
        {columnTwo}
      </div>
    </div>
  );
}

function Heading({text}) {
  return <h2 className="Heading">{text}</h2>;
}

function HeaderHero() {
  return (
    <Section
      element="header"
      background="dark"
      className="HeaderHero"
      bottomSpacing>
      <div className="socialLinks">
        <TwitterButton />
        <GitHubButton />
      </div>
      <TwoColumns
        reverse
        columnOne={<LogoAnimation />}
        columnTwo={
          <React.Fragment>
            <h1 className="title">React Native</h1>
            <p className="tagline">Learn once, write everywhere.</p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </React.Fragment>
        }
      />
    </Section>
  );
}

const codeExample = `
\`\`\`jsx
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Header} from './Header';

export default () => 
  <View>
    <Header title="Welcome to React Native"/>
    <Text style={header}>Step One</Text>
    <Text>
      Edit App.js to change this screen and turn it
      into your app.
    </Text>
    <Text style={header}>See Your Changes</Text>
    <Text>
      Press Cmd + R inside the simulator to reload
      your app’s code.
    </Text>
    …
   </View>
\`\`\`
`;

// FIXME style the code blocks
function CodeExample() {
  return (
    <div className="CodeExample">
      <MarkdownBlock>{codeExample}</MarkdownBlock>;
    </div>
  );
}

const features = [
  {
    title: 'Create native apps using React and JavaScript',
    text:
      'React Native lowers the barrier for creating native-quality apps using the world’s most popular programming language and one of the most popular user-interface libraries for it: [React](https://reactjs.org).\n\nReact offers a uni-directional declarative programming model that drastically reduces the complexity in building user interfaces.',
    // TODO animate the image
    image: () => (
      <div className="IntroImage">
        <img
          className="iphone"
          src={`${baseUrl}img/homepage/iphone-demo.png`}
        />
        <img
          className="android"
          src={`${baseUrl}img/homepage/android-demo.png`}
        />
      </div>
    ),
  },
  {
    title: 'View, Text, Image',
    text:
      'React Native provides platform-agnostic APIs, sharing ideas with how native developers have been writing apps for the last decade.\n\nYou can write components which wrap your existing native code, leaving you to interact with all APIs via React’s declarative UI paradigm and JavaScript.\n\nThis enables native app development for whole new teams of developers, and can let existing native teams work much faster.',
    image: CodeExample,
  },
  {
    title: 'Native Experience',
    text:
      'React components in React Native map directly to the platform’s native UI building blocks.\n\nYou can use React Native to augment your existing native code in Kotlin, Swift, Java, and Objective-C.\n\nNo web-views. Unless you want to show web pages.',
    image: `${baseUrl}img/homepage/dissection.svg`,
  },
  {
    title: 'Seamless cross-platform',
    text:
      'Ensure all your apps feel native on all platforms by easily creating platform-specific versions of a Component.\n\nThis technique is used to allow a single codebase to share a large amount of code across all platforms.',
    // FIXME fix text alignment here
    image: `${baseUrl}img/homepage/cross-platform.svg`,
  },
];

function Feature({title, text, image, reverse, background}) {
  let imageEl;
  if (typeof image === 'string') {
    imageEl = <img src={image} />;
  } else {
    const Image = image;
    imageEl = <Image />;
  }
  return (
    <Section className="Feature" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={
          <React.Fragment>
            <Heading text={title} />
            <MarkdownBlock>{text}</MarkdownBlock>
          </React.Fragment>
        }
        columnTwo={imageEl}
      />
    </Section>
  );
}

function Features() {
  return (
    <React.Fragment>
      {features.map((feature, i) => (
        <Feature
          key={feature.title}
          background={i % 2 === 0 ? 'light' : 'light2'}
          reverse={i % 2 === 0}
          {...feature}
        />
      ))}
    </React.Fragment>
  );
}

function CodeReloadDemo() {
  return (
    <Section className="CodeReloadDemo" background="dark">
      <Heading text="Speed up your work with code reloading" />
      <img src="https://media.giphy.com/media/13WZniThXy0hSE/giphy.gif" />
    </Section>
  );
}

function DocsAndTalks() {
  return (
    <Section className="DocsAndTalks" background="light">
      <TwoColumns
        reverse
        columnOne={
          <React.Fragment>
            <Heading text="Talks" />
            <p>
              Members of the React Native team frequently speak at various
              conferences.
            </p>
            <p>
              You can follow the latest news from the React Native team on
              Twitter
            </p>
            <TwitterButton showCount />
          </React.Fragment>
        }
        columnTwo={
          <React.Fragment>
            <iframe
              src="https://www.youtube.com/embed/NCAY0HIfrwc"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <p>
              <a href="https://youtu.be/NCAY0HIfrwc">
                Mobile innovation with React Native... at f8
              </a>
            </p>
          </React.Fragment>
        }
      />
    </Section>
  );
}

const apps = siteConfig.users.filter(app => app.pinned);

function AppList({apps}) {
  return (
    <ul className="AppList">
      {apps.map((app, i) => {
        let imgSource = app.icon;
        if (!app.icon.startsWith('http')) {
          imgSource = baseUrl + 'img/showcase/' + app.icon;
        }
        return (
          <li key={i} className="item">
            <a href={app.infoLink}>
              <img src={imgSource} alt={app.name} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

const communityText = `
In 2018, React Native had the [2nd highest] number of contributors
for any repos in GitHub. However, there are a few standout
companies which partner with Facebook to create React Native:
[Callstack], [Expo], [Infinite Red], [Microsoft], and [Software
Mansion].

[2nd highest]: https://octoverse.github.com/projects#repositories
[Callstack]: https://callstack.com/
[Expo]: https://expo.io/
[Infinite Red]: https://infinite.red/
[Microsoft]: https://www.microsoft.com/en-gb/
[Software Mansion]: https://swmansion.com/
`;

function Community() {
  return (
    <Section className="Community" background="light2" bottomSpacing>
      <div className="content">
        <Heading text="Open Community" />
        <TwoColumns
          columnOne={
            <React.Fragment>
              <p className="firstP">
                <img src={`${baseUrl}img/homepage/fb-logo.png`} />
                <span>
                  React Native was built by Facebook and has been maintained for
                  over 5 years.
                </span>
              </p>
              <MarkdownBlock>{communityText}</MarkdownBlock>
            </React.Fragment>
          }
          columnTwo={
            <React.Fragment>
              <p>
                React Native is being used in thousands of apps, but it's likely
                you've already used it in one of these apps:
              </p>
              <AppList apps={apps} />
              <p>
                and <a href={`${baseUrl}showcase`}>many more</a>.
              </p>
            </React.Fragment>
          }
        />
      </div>
    </Section>
  );
}

function GetStarted() {
  return (
    <Section className="GetStarted" background="dark">
      <div className="content">
        <Heading text="Give it a try" />
        <ol className="steps">
          <li>
            <p>Run this</p>
            <div class="terminal">
              <code>npm install -g react-native</code>
              <code>react-native init MyTestApp</code>
            </div>
          </li>
          <li>
            <p>Read these</p>
            <HomeCallToAction />
          </li>
        </ol>
      </div>
    </Section>
  );
}

module.exports = function Index() {
  return (
    <div>
      <HeaderHero />
      <main>
        <Features />
        <CodeReloadDemo />
        <DocsAndTalks />
        <Community />
        <GetStarted />
      </main>
    </div>
  );
};
