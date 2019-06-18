const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + '/siteConfig.js');
const {baseUrl} = siteConfig;

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
      <ActionButton href={baseUrl + 'docs/getting-started'} target="_self">
        Get started
      </ActionButton>
      <ActionButton href={baseUrl + 'docs/tutorial'} target="_self">
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
  // TODO "reverse" should reverse columns only on desktop
  // Figure out a way to do this in only css
  const left = reverse ? columnTwo : columnOne;
  const right = reverse ? columnOne : columnTwo;
  return (
    <div className="TwoColumns">
      <div className="column left">{left}</div>
      <div className="column right">{right}</div>
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
      <TwoColumns
        columnOne={
          <React.Fragment>
            <h1 className="title">React Native</h1>
            <p className="tagline">Learn once, write everywhere.</p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </React.Fragment>
        }
        columnTwo={<Logo />}
      />
    </Section>
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
    image: 'https://media.giphy.com/media/13WZniThXy0hSE/giphy.gif',
  },
  {
    title: 'Native Experience',
    text:
      'React components in React Native map directly to the platform’s native UI building blocks.\n\nYou can use React Native to augment your existing native code in Kotlin, Swift, Java, and Objective-C.\n\nNo web-views. Unless you want to show web pages.',
    image: 'https://media.giphy.com/media/13WZniThXy0hSE/giphy.gif',
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
        columnOne={
          <React.Fragment>
            <iframe
              width="560"
              height="315"
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
        columnTwo={
          <React.Fragment>
            <Heading text="Docs and Talks" />
            <p>[get list of docs]</p>
            <p>[get list of talks]</p>
            <p>
              You can follow the latest news from the React Native team on
              Twitter
              {/* TODO twitter link */}
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
        {features.map((feature, i) => (
          <Feature
            key={feature.title}
            background={i % 2 === 0 ? 'light' : 'light2'}
            reverse={i % 2 === 0}
            {...feature}
          />
        ))}
        <CodeReloadDemo />
        <DocsAndTalks />
        <Community />
        <GetStarted />
      </main>
    </div>
  );
};
