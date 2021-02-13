import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.scss';

const Sidebar = props => <div className={styles.wrapper}>{props.children}</div>;

Sidebar.defaultProps = {
  children: null,
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
