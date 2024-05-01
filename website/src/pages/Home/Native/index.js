import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

import FlyOutIllustration from './FlyOutIllustration';
import styles from './styles.module.css';

function Native() {
  return (
    <Section>
      <SectionTitle
        title="Native development for everyone"
        description={
          <>
            React Native lets you create truly native apps and doesn't
            compromise your users' experiences. It provides a core set of
            platform agnostic native components like <code>View</code>,{' '}
            <code>Text</code>, and <code>Image</code> that map directly to the
            platform's native UI building blocks.
          </>
        }
      />
      <img
        src="/img/homepage/FlyoutIllustration.png"
        alt="A React Native UI pointing out native elements like Views, ScrollViews, and more"
        className={styles.flyoutIllustration}
      />
    </Section>
  );
}

export default Native;
