import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const NewTacticButton = ({ openNewTacticDialog }) => (
  <RaisedButton
    fullWidth label="New Tactic"
    primary
    icon={<FontIcon className="material-icons">add_circle</FontIcon>}
    onTouchTap={openNewTacticDialog}
  />
);

export default NewTacticButton;

NewTacticButton.propTypes = {
  openNewTacticDialog: PropTypes.func.isRequired,
};
