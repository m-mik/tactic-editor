import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LoadingIndicator from '../LoadingIndicator';
import Form from './Form';
import styles from './CreateTacticDialog.scss';

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
      bodyClassName={styles.body}
      title="Create Tactic"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      {pending && <LoadingIndicator className={styles.loadingIndicator} />}
      <Form
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
