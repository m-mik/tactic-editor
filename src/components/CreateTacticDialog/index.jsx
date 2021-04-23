import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DialogLoadingIndicator from '../DialogLoadingIndicator';
import Form from './Form';
import styles from './CreateTacticDialog.scss';

class CreateTacticDialog extends Component {
  render() {
    const { onCreate, onClose, open, pending } = this.props;

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
        {pending && <DialogLoadingIndicator />}
        <Form
          ref={(form) => { this.form = form; }}
          open={open}
          onSubmit={data => onCreate({ data })}
          pending={pending}
        />
      </Dialog>
    );
  }
}

CreateTacticDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateTacticDialog;
