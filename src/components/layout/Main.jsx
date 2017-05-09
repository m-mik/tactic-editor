import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

const Main = props => (
  <div className="main">
    <Paper zDepth={1}>
      text
      {props.children}
    </Paper>
  </div>
);

Main.defaultProps = {
  children: null,
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
