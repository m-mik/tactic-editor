import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ children }) => (
  <aside>
    {children}
  </aside>
);

SideBar.defaultProps = {
  children: null,
};

SideBar.propTypes = {
  children: PropTypes.node,
};

export default SideBar;
