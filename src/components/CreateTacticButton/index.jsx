import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/av/add-to-queue';

const CreateTacticButton = ({ onTouchTap }) => (
  <RaisedButton
    fullWidth label="Create Tactic"
    primary
    icon={<AddIcon />}
    onTouchTap={onTouchTap}
  />
);

export default CreateTacticButton;

CreateTacticButton.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
};
