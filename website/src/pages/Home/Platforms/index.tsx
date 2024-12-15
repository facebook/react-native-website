/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import ThemeImage from '../components/ThemeImage';

import FoxFact from './FoxFact';
import styles from './styles.module.css';

function Platforms() {
  return (
    <Section>
      <SectionTitle
        title="Create native apps for Android, iOS, and more using React"
        description="React Native brings the best parts of developing with React to native development. It's a best-in-class JavaScript library for building user interfaces."
      />
      <div className={styles.platformsContainer}>
        <div className={styles.featureContainer}>
          <div className={styles.codeEditor}>
            <div className={styles.codeEditorTitleContainer}>index.js</div>
            <div className={styles.codeEditorContentContainer}>
              <pre>
                <span style={{color: 'var(--home-code-red)'}}>function</span>{' '}
                <span style={{color: 'var(--home-code-purple'}}>
                  HomeScreen
                </span>
                {`()`}
                {` {`} <br />
                <span
                  style={{color: 'var(--home-code-red)'}}>{`  return `}</span>
                {`(`} <br />
                {`    <`}
                <span style={{color: 'var(--home-code-green)'}}>View</span>
                {`>`} <br />
                {`      <`}
                <span style={{color: 'var(--home-code-green)'}}>{`Text`}</span>
                {`>`} Hello World 👋 🌍!{`</`}
                <span style={{color: 'var(--home-code-green)'}}>{`Text`}</span>
                {`>`}
                <br />
                {`    </`}
                <span style={{color: 'var(--home-code-green)'}}>View</span>
                {`>`} <br />
                {`  );`} <br />
                {`}`}
              </pre>
            </div>
          </div>
          <div className={styles.deviceContainer}>
            <ThemeImage
              lightSrc="/img/homepage/devices.png"
              darkSrc="/img/homepage/devices-dark.png"
              className={styles.devices}
              alt="Android device and iOS device"
            />
          </div>
        </div>
      </div>
      <div className={styles.foxFactContainer}>
        <FoxFact className={styles.fox} />
        <p>
          <strong>Written in JavaScript, rendered with native code.</strong>{' '}
          React primitives render to native platform UI, meaning your app uses
          the same native platform APIs other apps do.
        </p>
      </div>
    </Section>
  );
}

export default Platforms;
