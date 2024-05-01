import React from 'react';

import Hero from './Hero';
import Platforms from './Platforms';
import Native from './Native';
import Framework from './Framework';

export function Home() {
  return (
    <div>
      <Hero />
      <Platforms />
      <Native />
      <Framework />
    </div>
  );
}
