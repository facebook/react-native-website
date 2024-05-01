import React from 'react';

import Hero from './Hero';
import Platforms from './Platforms';
import Native from './Native';
import Framework from './Framework';
import Watch from './Watch';
import Community from './Community';
import CallToAction from './CallToAction';

export function Home() {
  return (
    <>
      <Hero />
      <Platforms />
      <Native />
      <Framework />
      <Watch />
      <Community />
      <CallToAction />
    </>
  );
}
