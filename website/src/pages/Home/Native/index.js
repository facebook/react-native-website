import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

function Native() {
  return (
    <Section>
      <SectionTitle
        title="Native development for everyone"
        description="React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform’s native UI building blocks."
      />
    </Section>
  );
}

export default Native;
