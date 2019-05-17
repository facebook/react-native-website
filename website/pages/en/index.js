const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + '/siteConfig.js');

function ActionButton({href, target, children}) {
  return (
    <a className="ActionButton" href={href} target={target}>
      {children}
    </a>
  );
}

function HomeCallToAction() {
  return (
    <div>
      <ActionButton
        href={siteConfig.baseUrl + 'docs/getting-started'}
        target="_self">
        Get started
      </ActionButton>
      <ActionButton href={siteConfig.baseUrl + 'docs/tutorial'} target="_self">
        Learn basics
      </ActionButton>
    </div>
  );
}

// FIXME keep as an svg file
function Logo() {
  return (
    <svg
      width={350}
      height={350}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348">
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function HeaderHero() {
  return (
    <header className="HeaderHero">
      <div className="grid">
        <div className="column">
          <h1 className="title">React Native</h1>
          <p className="tagline">Learn once, write anywhere.</p>
          <div className="buttons">
            <HomeCallToAction />
          </div>
        </div>
        <div className="column image">
          <Logo />
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: 'Create native apps using React and JavaScript',
    text:
      'React Native lowers the barrier for creating native-quality apps using the world’s most popular programming language and one of the most popular user-interface libraries for it: [React](https://reactjs.org).\n\nReact offers a uni-directional declarative programming model that drastically reduces the complexity in building user interfaces.',
    image: '',
  },
  {
    title: 'View, Text, Image',
    text:
      'React Native provides platform-agnostic APIs, sharing ideas with how native developers have been writing apps for the last decade.\n\nYou can write components which wrap your existing native code, leaving you to interact with all APIs via React’s declarative UI paradigm and JavaScript.\n\nThis enables native app development for whole new teams of developers, and can let existing native teams work much faster.',
    image: '',
  },
  {
    title: 'Native Experience',
    text:
      'React components in React Native map directly to the platform’s native UI building blocks.\n\nYou can use React Native to augment your existing native code in Kotlin, Swift, Java, and Objective-C.\n\nNo web-views. Unless you want to show web pages.',
    image: '',
  },
  {
    title: 'Seamless cross-platform',
    text:
      'Ensure all your apps feel native on all platforms by easily creating platform-specific versions of a Component.\n\nThis technique is used to allow a single codebase to share a large amount of code across all platforms.',
    image: '',
  },
];

function Feature({title, text, image}) {
  // TODO
  return (
    <header className="Feature">
      <div className="grid">
        <div className="column text">
          <h2 className="heading">{title}</h2>
          <MarkdownBlock>{text}</MarkdownBlock>
        </div>
        <div className="column image">
          <img src={image} />
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <main>
      {features.map(feature => (
        <Feature key={feature.title} {...feature} />
      ))}
    </main>
  );
}

module.exports = function Index() {
  return (
    <div>
      <HeaderHero />
      <Features />
    </div>
  );
};
