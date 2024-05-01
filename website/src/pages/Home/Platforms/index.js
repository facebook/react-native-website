/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

import FoxFact from './FoxFact';
import Devices from './Devices';
import styles from './styles.module.css';

function Platforms() {
  const codeString = `import React from 'react';\n\nfunction HomeScreen() {\n  return (\n    <View>\n      <Text>Hello World 👋 🌍!</Text>\n    </View>\n  );\n}`;

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
                <span style={{color: '#d73a49'}}>function</span>{' '}
                <span style={{color: '#6f42c1'}}>HomeScreen</span>
                {`()`}
                {` {`} <br />
                <span style={{color: '#d73a49'}}>{`  return `}</span>
                {`(`} <br />
                {`    <`}
                <span style={{color: '#22863a'}}>View</span>
                {`>`} <br />
                {`      <`}
                <span style={{color: '#22863a'}}>{`Text`}</span>
                {`>`} Hello World 👋 🌍!{`</`}
                <span style={{color: '#22863a'}}>{`Text`}</span>
                {`>`}
                <br />
                {`    </`}
                <span style={{color: '#22863a'}}>View</span>
                {`>`} <br />
                {`  );`} <br />
                {`}`}
              </pre>
            </div>
          </div>
          <div className={styles.deviceContainer}>
            <img
              src="/img/homepage/devices.png"
              alt="Android device and iOS device"
              className={styles.devices}
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
