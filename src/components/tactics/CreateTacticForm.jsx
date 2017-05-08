import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const CreateTacticForm = (props) => {
  const { onSubmit, createTacticPending, handleSubmit } = props;

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TacticNameField />
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  const { name } = values;
  const length = { min: 1, max: 30 };

  if (!name || name.length < length.min || name.length > length.max) {
    errors.name = `Tactic name should be between ${length.min} and ${length.max} characters long`;
  }
  return errors;
};

CreateTacticForm.propTypes = {
  createTacticPending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'createTacticForm',
  validate,
})(CreateTacticForm);
