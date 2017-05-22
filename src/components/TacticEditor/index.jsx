import React from 'react';
import PropTypes from 'prop-types';
import styles from './TacticEditor.scss';

const TacticEditor = props => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
  );

TacticEditor.defaultProps = {
  children: null,
};

TacticEditor.propTypes = {
  children: PropTypes.node,
};

export default TacticEditor;
