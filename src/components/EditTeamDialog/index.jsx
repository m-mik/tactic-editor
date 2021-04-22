import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import pt from '../../propTypes';
import Form from './Form';

// todo: rwd
const EditTeamDialog = (props) => {
  const { onConfirm, onClose, team } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Edit"
      primary
      type="submit"
      onTouchTap={() => { this.form.getWrappedInstance().submit(); }}
    />,
  ];

  const handleSubmit = (val) => {
    const { name, textColor, backgroundColor } = val;
    onConfirm(team.id, {
      name,
      shirt: {
        backgroundColor,
        textColor,
        border: { color: val.borderColor, style: val.borderStyle },
      },
    });
    onClose();
  };

  return (
    <Dialog
      title="Edit Team"
      actions={actions}
      onRequestClose={onClose}
      modal
      open
      contentStyle={{ width: 420 }}
    >
      <Form
        ref={(form) => { this.form = form; }}
        open={open}
        onSubmit={handleSubmit}
        team={team}
      />
    </Dialog>
  );
};

EditTeamDialog.propTypes = {
  team: pt.team.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default EditTeamDialog;
