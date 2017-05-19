import React from 'react';
import Overlay from './Overlay';
import styles from './FootballField.scss';
import Grid from './Grid';

const FootballField = () => (
  <div className={styles.wrapper}>
    <Grid />
    <Overlay />
  </div>
  );

export default FootballField;
