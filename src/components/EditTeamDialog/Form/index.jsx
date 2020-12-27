import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import { SelectField, TextField, RadioButtonGroup } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RadioButton from 'material-ui/RadioButton';
import ShirtColorPicker from '../../ShirtColorPicker';
import Player from '../../Player';
import styles from './Form.scss';

const Form = (props) => {
  const { onSubmit, handleSubmit, initialValues } = props;

  console.log(props.initialValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div>
        <Field
          autoFocus
          fullWidth
          name="name"
          component={TextField}
          floatingLabelText="Team name"
        />
      </div>
      <div>
        <Player className={styles.player} team={{ shirt: initialValues.shirt }} />
      </div>
      <div>
        <Field name="shirt" component={RadioButtonGroup} className={styles.shirtOptions}>
          <RadioButton value="text" label="Text" />
          <RadioButton value="background" label="Background" />
          <RadioButton value="border" label="Border" />
        </Field>
      </div>
      <div>
        <ShirtColorPicker />
        <Field
          name="shirtType"
          component={SelectField}
          floatingLabelText="Shirt type"
        >
          <MenuItem value="solid" primaryText="Type 1" />
          <MenuItem value="dashed" primaryText="Type 2" />
        </Field>
      </div>
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  const { name } = values;
  const length = { min: 1, max: 25 };
  if (!name || name.length < length.min || name.length > length.max) {
    errors.name = `Team name should be between ${length.min} and ${length.max} characters long`;
  }
  return errors;
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'editTacticForm',
  validate,
})(Form);
