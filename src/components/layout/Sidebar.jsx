import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => (
  <aside className="sidebar">
    {children}
  </aside>
);

Sidebar.defaultProps = {
  children: null,
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
