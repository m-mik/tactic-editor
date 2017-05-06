import React from 'react';
import PropTypes from 'prop-types';

const TacticEditor = props => (
  <div>TacticEditor: {props.tacticId}</div>
);

TacticEditor.propTypes = {
  tacticId: PropTypes.number.isRequired,
};

export default TacticEditor;
