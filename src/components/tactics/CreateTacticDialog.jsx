import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../../components/Loading';
import CreateTacticForm from './CreateTacticForm';

const CreateTacticDialog = (props) => {
  const { onSubmit, onClose, open, createTacticPending } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      disabled={createTacticPending}
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Create"
      primary
      type="submit"
      disabled={createTacticPending}
      onTouchTap={() => { this.form.submit(); }}
    />,
  ];

  return (
    <Dialog
      bodyClassName="create-tactic-dialog__body"
      title="Create Tactic"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      {createTacticPending && <Loading className="create-tactic-dialog__loading" />}
      <CreateTacticForm
        ref={(form) => { this.form = form; }}
        open={open}
        onSubmit={onSubmit}
        createTacticPending={createTacticPending}
      />
    </Dialog>
  );
};

CreateTacticDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  createTacticPending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateTacticDialog;
