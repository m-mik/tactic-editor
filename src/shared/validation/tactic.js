export const validate = (values) => {
  const errors = {};
  const { name } = values;
  const length = { min: 1, max: 30 };
  if (!name || name.length < length.min || name.length > length.max) {
    errors.name = `Tactic name should be between ${length.min} and ${length.max} characters long`;
  }
  return errors;
};

export const isValid = values => Object.keys(validate(values)).length === 0;
