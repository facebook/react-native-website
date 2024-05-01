import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

function Framework() {
  return (
    <Section>
      <SectionTitle
        title="Get a head start with a framework"
        description="React Native brings the React programming paradigm to platforms like Android and iOS. It doesn’t prescribe how to do routing, or how to access each of the numerous platform APIs. To build a new app with React Native, we recommend a framework like Expo."
      />
    </Section>
  );
}

export default Framework;
