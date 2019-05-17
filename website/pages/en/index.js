const React = require('react');
const {css} = require('glamor');

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

module.exports = function Index() {
  return (
    <div>
      <HeaderHero />
    </div>
  );
};
