import React from 'react';

import GridBackground from './GridBackground';
import FloorBackground from './FloorBackground';
import Logo from './Logo';
import Devices from './Devices';
import styles from './styles.module.css';

export function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundContainer}>
        <div className={styles.gridBackground}>
          <GridBackground />
        </div>
        <div className={styles.devices}>
          <Devices />
        </div>
        <div className={styles.floorBackground}>
          <FloorBackground />
        </div>
      </div>
      <div className={styles.content}>
        <Logo />
        <h1 className={styles.title}>React Native</h1>
        <h2 className={styles.subtitle}>Learn once, write anywhere.</h2>
        <div className={styles.buttonContainer}>
          <a href="/docs/environment-setup" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="/docs/getting-started" className={styles.secondaryButton}>
            Learn the Basics
          </a>
        </div>
      </div>
    </div>
  );
}
