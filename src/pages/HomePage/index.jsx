import React from 'react';
import { Paper } from 'material-ui';
import styles from './HomePage.scss';

const HomePage = () => (
  <section className={styles.wrapper}>
    <Paper className={styles.content} zDepth={3}>Tactic Editor</Paper>
  </section>
);

export default HomePage;
