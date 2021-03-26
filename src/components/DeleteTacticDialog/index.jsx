import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DialogLoadingIndicator from '../DialogLoadingIndicator';
import pt from '../../propTypes';

const DeleteTacticDialog = (props) => {
  const { onDelete, onClose, open, pending, tactic } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      disabled={pending}
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Delete"
      type="submit"
      secondary
      disabled={pending}
      onTouchTap={() => onDelete(tactic.id)}
    />,
  ];

  return (
    <Dialog
      title={`Delete tactic "${tactic.name}"?`}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      {pending && <DialogLoadingIndicator />}
    </Dialog>
  );
};

DeleteTacticDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  tactic: pt.tactic.isRequired,
};

export default DeleteTacticDialog;
