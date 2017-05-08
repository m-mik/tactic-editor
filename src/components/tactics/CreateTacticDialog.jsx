import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../../components/Loading';
import CreateTacticForm from './CreateTacticForm';

const CreateTacticDialog = (props) => {
  const { onSubmit, onClose, open, pending } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      disabled={pending}
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Create"
      primary
      type="submit"
      disabled={pending}
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
      {pending && <Loading className="create-tactic-dialog__loading" />}
      <CreateTacticForm
        ref={(form) => { this.form = form; }}
        open={open}
        onSubmit={onSubmit}
        pending={pending}
      />
    </Dialog>
  );
};

CreateTacticDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateTacticDialog;
