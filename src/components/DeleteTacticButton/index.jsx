import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/av/remove-from-queue';

const DeleteTacticButton = ({ onTouchTap }) => (
  <RaisedButton
    className="btn-action"
    label="Delete"
    secondary
    icon={<DeleteIcon />}
    onTouchTap={onTouchTap}
  />
);

DeleteTacticButton.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
};

export default DeleteTacticButton;
