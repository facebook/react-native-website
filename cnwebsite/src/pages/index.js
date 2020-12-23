import React, {useEffect} from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import GitHubButton from 'react-github-btn';
import Head from '@docusaurus/Head';

import useBaseUrl from '@docusaurus/useBaseUrl';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import CrossPlatformSVG from '../../static/img/homepage/cross-platform.svg';
import {setupDissectionAnimation} from './animations/_dissectionAnimation';
import {setupHeaderAnimations} from './animations/_headerAnimation';

const textContent = {
  intro: `
  React Native 将原生开发的最佳部分与 React 相结合，
  致力于成为构建用户界面的顶尖 JavaScript 框架。
<br/><br/>
<strong>酌量添加，多少随意。</strong>随时都可以把 React Native 无缝集成到你已有的 Android 或 iOS 项目，当然也可以完全从头焕然一新地重写。
  `,
  nativeCode: `
将 React 基础抽象组件渲染为原生平台UI组件，意味着每个视图和原生应用都别无二致。
<br/><br/>
<strong>流水的多平台</strong>，铁打的 React。绝大多数情况下，使用 React Native 的团队可以在多个平台间共享一份基础代码，以及通用的技术 —— React。
  `,
  codeExample: `
import React from 'react';
import {Text, View} from 'react-native';
import {Header} from './Header';
import {heading} from './Typography';

const WelcomeScreen = () =>
  <View>
    <Header title="Welcome to React Native"/>
    <Text style={heading}>Step One</Text>
    <Text>
      Edit App.js to change this screen and turn it
      into your app.
    </Text>
    <Text style={heading}>See Your Changes</Text>
    <Text>
      Press Cmd + R inside the simulator to reload
      your app’s code.
    </Text>
    <Text style={heading}>Debug</Text>
    <Text>
      Press Cmd + M or Shake your device to open the
      React Native Debug Menu.
    </Text>
    <Text style={heading}>Learn</Text>
    <Text>
      Read the docs to discover what to do next:
    </Text>
   </View>
  `,
  forEveryone: `
React Native 使你可以创建真正原生的应用，用户体验绝不拉胯。它提供了一些平台无关的抽象核心组件，像是<code>View</code>, <code>Text</code> 以及 <code>Image</code>等，可直接映射渲染为
对应平台的原生UI组件。
  `,
  crossPlatform: `
  通过 React 的声明式组件机制和 JavaScript 代码，现有的原生代码和api可以完美地封装嵌合到 React 组件中。这样既为更多新的开发团队赋予原生应用的开发能力，也能极大地提升现有原生团队的开发效率。
  `,
  fastRefresh: `
<strong>保存即刷新。</strong> 借助 JavaScript 的动态特性，
React Native 能够让你光速迭代。不要再傻等编译了，改、存、刷新！
  `,
};

function Heading({text}) {
  return <h2 className="Heading">{text}</h2>;
}

function ActionButton({href, type = 'primary', target, children}) {
  return (
    <a className={`ActionButton ${type}`} href={href} target={target}>
      {children}
    </a>
  );
}

function TextColumn({title, text, moreContent}) {
  return (
    <>
      <Heading text={title} />
      <div dangerouslySetInnerHTML={{__html: text}} />
      {moreContent}
    </>
  );
}

function HomeCallToAction() {
  return (
    <>
      <ActionButton
        type="primary"
        href={useBaseUrl('docs/getting-started')}
        target="_self">
        开始使用
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl('docs/environment-setup')}
        target="_self">
        搭建环境
      </ActionButton>
    </>
  );
}

function GitHubStarButton() {
  return (
    <div className="github-button">
      <GitHubButton
        href="https://github.com/facebook/react-native"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star facebook/react-native on GitHub">
        Star
      </GitHubButton>
    </div>
  );
}

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

function ScreenRect({className, fill, stroke}) {
  return (
    <rect
      className={`screen ${className}`}
      rx="3%"
      width="180"
      height="300"
      x="-90"
      y="-150"
      fill={fill}
      stroke={stroke}
    />
  );
}

function LogoAnimation() {
  return (
    <svg
      className="LogoAnimation init"
      width={350}
      height={350}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-200 -200 400 400">
      <title>React Logo</title>
      <clipPath id="screen">
        <ScreenRect fill="none" stroke="gray" />
      </clipPath>
      <rect
        x="-25"
        y="120"
        width="50"
        height="25"
        rx="2"
        fill="white"
        stroke="none"
        className="stand"
      />
      <polygon
        points="-125,90 125,90 160,145 -160,145"
        fill="white"
        stroke="white"
        strokeWidth="5"
        strokeLinejoin="round"
        className="base"
      />
      <ScreenRect className="background" stroke="none" />
      <g clipPath="url(#screen)" className="logo">
        <g className="logoInner">
          <circle cx="0" cy="0" r="30" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="15" fill="none" id="logo">
            <ellipse rx="165" ry="64" />
            <ellipse rx="165" ry="64" transform="rotate(60)" />
            <ellipse rx="165" ry="64" transform="rotate(120)" />
          </g>
        </g>
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
      </g>
      <ScreenRect fill="none" stroke="white" />
    </svg>
  );
}

function HeaderHero() {
  return (
    <Section background="dark" className="HeaderHero">
      <div className="socialLinks">
        <GitHubStarButton />
      </div>
      <TwoColumns
        reverse
        columnOne={<LogoAnimation />}
        columnTwo={
          <>
            <h1 className="title">React Native</h1>
            <p className="tagline">一次学习，随处编写</p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </>
        }
      />
    </Section>
  );
}

function NativeApps() {
  return (
    <Section className="NativeApps" background="light">
      <TwoColumns
        reverse
        columnOne={
          <TextColumn
            title="使用 React 来创建 Android 和 iOS 的原生应用"
            text={textContent.intro}
          />
        }
        columnTwo={<img alt="" src={useBaseUrl('img/homepage/phones.png')} />}
      />
    </Section>
  );
}

function NativeCode() {
  return (
    <Section className="NativeCode" background="tint">
      <TwoColumns
        columnOne={
          <TextColumn
            title="JavaScript 在手，原生我有 "
            text={textContent.nativeCode}
          />
        }
        columnTwo={
          <CodeBlock language="jsx">{textContent.codeExample}</CodeBlock>
        }
      />
    </Section>
  );
}

function NativeDevelopment() {
  return (
    <Section className="NativeDevelopment" background="light">
      <TwoColumns
        reverse
        columnOne={
          <TextColumn
            title="简单易开发，人人有功练"
            text={textContent.forEveryone}
          />
        }
        columnTwo={
          <div className="dissection">
            {[0, 1, 2, 3].map(i => (
              <img
                alt=""
                key={i}
                src={useBaseUrl(`img/homepage/dissection/${i}.png`)}
              />
            ))}
          </div>
        }
      />
    </Section>
  );
}

function CrossPlatform() {
  return (
    <Section className="CrossPlatform" background="tint">
      <TwoColumns
        columnOne={
          <TextColumn title="无缝跨平台" text={textContent.crossPlatform} />
        }
        columnTwo={<CrossPlatformSVG />}
      />
    </Section>
  );
}

function FastRefresh() {
  return (
    <Section className="FastRefresh" background="light">
      <TwoColumns
        reverse
        columnOne={
          <TextColumn title="秒速刷新" text={textContent.fastRefresh} />
        }
        columnTwo={
          <video
            muted
            autoPlay
            loop
            playsInline
            src={useBaseUrl(`img/homepage/ReactRefresh.mp4`)}
          />
        }
      />
    </Section>
  );
}

function Community() {
  return (
    <Section className="Community" background="light">
      <div className="content">
        <Heading text="Facebook 掌舵，社区划桨" />
        <TwoColumns
          columnOne={
            <>
              <p className="firstP">
                <img src={useBaseUrl(`img/homepage/fb-logo.svg`)} alt="" />
                <span>
                  Facebook 早在 2015 年就开源了 React
                  Native，至今一直在积极维护和使用。
                </span>
              </p>
              <p>
                在 2018 年, React Native 的贡献者数量在所有github的项目中{' '}
                <a href="https://octoverse.github.com/2018/projects#repositories">
                  排名第二
                </a>
                。如今，遍布世界各地的公司和个人持续地为 React Native
                贡献着代码（包括但不限于）：
                <span>
                  <a href="https://callstack.com/">Callstack</a>
                </span>
                ,{' '}
                <span>
                  <a href="https://expo.io/">Expo</a>
                </span>
                , <a href="https://infinite.red/">Infinite Red</a>,{' '}
                <a href="https://www.microsoft.com/">Microsoft</a> 以及{' '}
                <a href="https://swmansion.com/">Software Mansion</a>等。
              </p>
            </>
          }
          columnTwo={
            <p>
              优秀的社区开发者们一直源源不断地贡献着新的项目，将 React Native
              拓展到一个又一个新的平台，例如：
              <span>
                <a href="https://github.com/microsoft/react-native-windows#readme">
                  React Native Windows
                </a>
              </span>
              ,{' '}
              <a href="https://github.com/microsoft/react-native-macos#readme">
                React Native macOS
              </a>{' '}
              以及{' '}
              <a href="https://github.com/necolas/react-native-web#readme">
                React Native Web
              </a>
              等。
            </p>
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
        <Heading text="现在就试试吧！" />
        <ol className="steps">
          <li>
            <p>在命令行中运行</p>
            <div className="terminal">
              <code>npx react-native init MyTestApp</code>
            </div>
          </li>
          <li>
            <p>阅读文档</p>
            <HomeCallToAction />
          </li>
        </ol>
      </div>
    </Section>
  );
}

const useHomePageAnimations = () => {
  useEffect(() => setupHeaderAnimations(), []);
  useEffect(() => setupDissectionAnimation(), []);
};

const Index = () => {
  useHomePageAnimations();
  return (
    <Layout wrapperClassName="homepage">
      <Head>
        <title>React Native 中文网 · 使用React来编写原生应用的框架</title>
      </Head>
      <HeaderHero />
      <NativeApps />
      <NativeCode />
      <NativeDevelopment />
      <CrossPlatform />
      <FastRefresh />
      <Community />
      <GetStarted />
    </Layout>
  );
};

export default Index;
