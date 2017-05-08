import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

const CreateTacticButton = ({ openCreateTacticDialog }) => (
  <RaisedButton
    fullWidth label="Create Tactic"
    primary
    icon={<FontIcon className="material-icons">add_circle</FontIcon>}
    onTouchTap={openCreateTacticDialog}
  />
);

export default CreateTacticButton;

CreateTacticButton.propTypes = {
  openCreateTacticDialog: PropTypes.func.isRequired,
};
