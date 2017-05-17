import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const Form = (props) => {
  const { onSubmit, pending, handleSubmit } = props;

  const TacticNameField = () => (
    <Field
      autoFocus
      fullWidth
      name="name"
      component={TextField}
      floatingLabelText="Tactic name"
      disabled={pending}
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

Form.propTypes = {
  pending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'createTacticForm',
  validate,
})(Form);
