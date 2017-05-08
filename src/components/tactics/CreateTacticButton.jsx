import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const CreateTacticButton = ({ onTouchTap }) => (
  <RaisedButton
    fullWidth label="Create Tactic"
    primary
    icon={<FontIcon className="material-icons">add_circle</FontIcon>}
    onTouchTap={onTouchTap}
  />
);

export default CreateTacticButton;

CreateTacticButton.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
};
