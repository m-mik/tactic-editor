import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { SelectField, TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { ChromePicker } from 'react-color';
import MenuItem from 'material-ui/MenuItem';
import RadioButton from 'material-ui/RadioButton';
import FootballField from '../../FootballField';
import Player from '../../Player';
import styles from './Form.scss';

class Form extends Component {
  constructor() {
    super();

    this.handleShirtColorOptionChange = this.handleShirtColorOptionChange.bind(this);
    this.handleShirtStyleChange = this.handleShirtStyleChange.bind(this);
    this.handleShirtColorChange = this.handleShirtColorChange.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  getColor() {
    const { shirtColorOption } = this.props.newValues;
    return this.props.newValues[shirtColorOption];
  }

  handleShirtColorOptionChange(event) {
    this.props.change('shirtColorOption', event.target.value);
  }

  handleShirtStyleChange(event, index) {
    this.props.change('borderStyle', index);
  }

  handleShirtColorChange(color) {
    const { newValues: { shirtColorOption }, change } = this.props;
    change(shirtColorOption, color.hex);
  }

  renderNameField() { // eslint-disable-line class-methods-use-this
    return (<Field
      autoFocus
      fullWidth
      name="name"
      component={TextField}
      floatingLabelText="Name"
    />);
  }

  renderPlayer() {
    const { textColor, backgroundColor, borderStyle, borderColor } = this.props.newValues;

    return (
      <div className={styles.playerPreview}>
        <FootballField>
          {textColor && <Player
            className={styles.player} team={{
              shirt: {
                border: { style: borderStyle, color: borderColor },
                textColor,
                backgroundColor,
              },
            }}
          />}
        </FootballField>
      </div>
    );
  }

  renderShirtColorOptions() {
    return (<Field
      name="shirtColorOption"
      component={RadioButtonGroup}
      className={styles.shirtColorOptions}
      onChange={this.handleShirtColorOptionChange}
    >
      <RadioButton value="backgroundColor" label="Background" />
      <RadioButton value="borderColor" label="Foreground" />
      <RadioButton value="textColor" label="Text" />
    </Field>);
  }

  renderColorPicker() {
    return (<ChromePicker
      disableAlpha
      color={this.getColor()}
      onChangeComplete={this.handleShirtColorChange}
    />);
  }

  renderShirtStyleItems() { // eslint-disable-line class-methods-use-this
    const items = ['Solid', 'Dashed', 'Dotted', 'Double', 'Groove', 'Ridge'];
    return items.map(item =>
      <MenuItem key={item} value={item.toLocaleLowerCase()} primaryText={item} />,
    );
  }

  renderShirtStyle() {
    return (<Field
      name="borderStyle"
      component={SelectField}
      floatingLabelText="Shirt style"
      floatingLabelFixed
      onChange={this.handleShirtStyleChange}
    >
      {this.renderShirtStyleItems()}
    </Field>);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div>
          {this.renderNameField()}
        </div>
        <div>
          {this.renderPlayer()}
        </div>
        <div>
          {this.renderShirtColorOptions()}
        </div>
        <div>
          {this.renderColorPicker()}
        </div>
        <div>
          {this.renderShirtStyle()}
        </div>
      </form>
    );
  }
}

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
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    shirt: PropTypes.shape({
      border: PropTypes.shape({
        color: PropTypes.string,
        style: PropTypes.string,
      }),
    }),
  }).isRequired,
  ...propTypes,
};

const EditTeamForm = reduxForm({
  form: 'editTeamForm',
  validate,
})(Form);

const selector = formValueSelector('editTeamForm');

const mapStateToProps = (state, { team }) => {
  const { shirt } = team;
  return {
    initialValues: {
      shirtColorOption: 'backgroundColor',
      name: team.name,
      backgroundColor: shirt.backgroundColor,
      textColor: shirt.textColor,
      borderColor: shirt.border.color,
      borderStyle: shirt.border.style,
    },
    newValues: selector(state, 'shirtColorOption', 'backgroundColor', 'borderColor', 'borderStyle', 'textColor'),
  };
};

export default connect(mapStateToProps, null, null, { withRef: true })(EditTeamForm);
