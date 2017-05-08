import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

const NewTacticDialog = (props) => {
  const { onSubmit, onClose, open, createTacticPending, handleSubmit } = props;

  const handleNewTacticSubmit = handleSubmit(onSubmit);

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Create"
      primary
      type="submit"
      onTouchTap={handleNewTacticSubmit}
    />,
  ];

  const TacticNameField = () => (
    <Field
      autoFocus
      fullWidth
      name="name"
      component={TextField}
      floatingLabelText="Tactic name"
      disabled={createTacticPending}
    />
  );

  return (
    <Dialog
      title="Create New Tactic"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >{createTacticPending}
      <form onSubmit={handleNewTacticSubmit}>
        <TacticNameField />
      </form>
    </Dialog>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Tactic name cannot be empty';
  }
  return errors;
};

NewTacticDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'newTacticForm',
  validate,
})(NewTacticDialog);
