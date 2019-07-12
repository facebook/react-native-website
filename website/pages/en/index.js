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
      <script src={`${baseUrl}js/headerAnimation.js`} />
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
}) {
  const El = element;
  return <El className={`Section ${className} ${background}`}>{children}</El>;
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
    <Section element="header" background="dark" className="HeaderHero">
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

function CodeExample() {
  return (
    <div className="CodeExample">
      <MarkdownBlock>{codeExample}</MarkdownBlock>;
    </div>
  );
}

const features = [
  {
    title: 'Create native apps for Android and iOS using React and JavaScript',
    text: `
React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.

**Use a little—or a lot**. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.
    `,
    image: `${baseUrl}img/homepage/phones.png`,
  },
  {
    title: 'Native Development for Everyone',
    text:
      "React Native lets you create truly native apps and doesn't compromise on your users' experience. It provides a core set of platform agnostic native components like `View`, `Text`, and `Image` that map directly to the platform’s native UI building blocks.",
    image: CodeExample,
  },
  {
    title: 'Written in JavaScript—rendered with native code',
    text: `
React primitives render to native platform UI, meaning your app uses the same native platform APIs other apps do.

**Many platforms**, one React. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, one team can maintain two platforms and share a common technology—React.
    `,
    // TODO animate the image
    image: `${baseUrl}img/homepage/dissection.svg`,
  },
  {
    title: 'Seamless cross-platform',
    text:
      'React components wrap existing native code and interact with native APIs via React’s declarative UI paradigm and JavaScript. This enables native app development for whole new teams of developers, and can let existing native teams work much faster.',
    image: `${baseUrl}img/homepage/cross-platform.svg`,
  },
  {
    title: 'React Refresh',
    text:
      '**See your changes as soon as you save.** With the power of JavaScript, React Native lets you iterate at lightning speed. No more waiting for native builds to finish. Save, see, repeat.',
    image: () => (
      <video controls width="450">
        `
        <source
          src={`${baseUrl}img/homepage/ReactRefresh.mp4`}
          type="video/mp4"
        />
      </video>
    ),
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

function Talks() {
  return (
    <Section className="DocsAndTalks" background="light2">
      <TwoColumns
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
Facebook released React Native in 2015 and has been maintaining it ever since.
In 2018, React Native had the [2nd highest] number of contributors for any repository in GitHub.
Today, React Native is maintained by contributions from 
[Callstack], [Expo], [Infinite Red], [Microsoft], and [Software
Mansion].

Our community is always shipping exciting new projects and exploring platforms beyond Android and iOS
with repos like React Native Windows and React Native Web.

[2nd highest]: https://octoverse.github.com/projects#repositories
[Callstack]: https://callstack.com/
[Expo]: https://expo.io/
[Infinite Red]: https://infinite.red/
[Microsoft]: https://www.microsoft.com/en-gb/
[Software Mansion]: https://swmansion.com/
`;

function Community() {
  return (
    <Section className="Community" background="light">
      <div className="content">
        <Heading text="Facebook Supported, Community Driven" />
        <TwoColumns
          columnOne={
            <React.Fragment>
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
              <code>npx react-native init MyTestApp</code>
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
        <Talks />
        <Community />
        <GetStarted />
      </main>
    </div>
  );
};
