import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

const NewTacticDialog = (props) => {
  const { open, onClose, handleSubmit, onSubmit } = props;

  const handleNewTactic = (values) => {
    console.log(values);
    onSubmit(values);
  };

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
      onTouchTap={handleSubmit(handleNewTactic)}
    />,
  ];

  return (
    <Dialog
      title="Create New Tactic"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      <Field
        autoFocus
        fullWidth
        name="tacticName"
        component={TextField}
        floatingLabelText="Tactic name"
      />
    </Dialog>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.tacticName) {
    errors.tacticName = 'Tactic name cannot be empty';
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
