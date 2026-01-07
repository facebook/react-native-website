/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useState} from 'react';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Watch() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <Section>
      <SectionTitle
        title="Watch and learn"
        description={
          <>
            Watch talks by the React team and learn how to get the most out of
            React Native.
            <br />
            Find the latest on{' '}
            <a href="https://bsky.app/profile/reactnative.dev">
              Bluesky
            </a> and{' '}
            <a href="https://twitter.com/intent/follow?screen_name=reactnative&region=follow_link">
              X
            </a>
            .
          </>
        }
      />
      <div className={styles.videos}>
        <div
          role="button"
          aria-label="Play: FB 2019: Mobile innovation with React Native"
          className={[
            styles.videoContainer,
            playingId === 'fb2019'
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId('fb2019')}>
          {playingId === 'fb2019' ? (
            <iframe
              src="https://www.youtube.com/embed/NCAY0HIfrwc?autoplay=1"
              title="Mobile Innovation with React Native, ComponentKit, and Litho"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src="https://img.youtube.com/vi/NCAY0HIfrwc/maxresdefault.jpg"
              alt="Mobile Innovation with React Native, ComponentKit, and Litho"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>FB 2019: Mobile innovation with React Native</h4>
            <p>45:29</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="Play: Why React Native?"
          className={[
            styles.videoContainer,
            playingId === 'why'
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId('why')}>
          {playingId === 'why' ? (
            <iframe
              src="https://www.youtube.com/embed/wUDeLT6WXnQ?autoplay=1"
              title="Explain Like I'm 5: React Native"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src="https://img.youtube.com/vi/wUDeLT6WXnQ/maxresdefault.jpg"
              alt="Explain Like I'm 5: React Native"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>Why React Native?</h4>
            <p>1:42</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Watch;
