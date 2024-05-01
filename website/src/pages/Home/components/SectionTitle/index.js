import React from 'react';
import styles from './styles.module.css';

function SectionTitle({title, description}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.description}>{description}</h3>
    </div>
  );
}

export default SectionTitle;
