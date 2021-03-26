import React from 'react';
import PropTypes from 'prop-types';

import styles from './Bench.scss';

const Bench = (props) => {
  const { players } = props;
  console.log(players);
  return <div className={styles.bench}>bench</div>;
};

Bench.propTypes = {
  //players: PropTypes.arrayOf().isRequired,
};

export default Bench;
