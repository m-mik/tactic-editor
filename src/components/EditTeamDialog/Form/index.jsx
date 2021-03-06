import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { SelectField, TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { ChromePicker } from 'react-color';
import MenuItem from 'material-ui/MenuItem';
import RadioButton from 'material-ui/RadioButton';
import throttle from 'lodash/throttle';

import pt from '../../../propTypes';
import FootballField from '../../FootballField';
import Player from '../../Player';
import styles from './Form.scss';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleShirtColorOptionChange = this.handleShirtColorOptionChange.bind(this);
    this.handleShirtStyleChange = this.handleShirtStyleChange.bind(this);
    this.handleShirtColorChange = this.handleShirtColorChange.bind(this);
    this.getColor = this.getColor.bind(this);
    this.handleShirtColorChange = throttle(this.handleShirtColorChange, 200);
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

  renderPreview() {
    const { textColor, backgroundColor, borderStyle, borderColor } = this.props.newValues;

    return (
      <div className={styles.playerPreview}>
        <FootballField style={{ width: '100%', height: '100%' }}>
          {textColor && <Player
            style={{ width: 75, height: 75 }}
            className={styles.player}
            team={{
              substitutions: [],
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
      {['Background', 'Border', 'Text'].map(item =>
        <RadioButton key={item} value={`${item.toLocaleLowerCase()}Color`} label={item} />)}
    </Field>);
  }

  renderColorPicker() {
    return (<ChromePicker
      disableAlpha
      color={this.getColor()}
      onChange={this.handleShirtColorChange}
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
      fullWidth
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
          {this.renderShirtColorOptions()}
        </div>
        {this.renderShirtStyle()}
        <div className={styles.colorPicker}>
          {this.renderColorPicker()}
          {this.renderPreview()}
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
  team: pt.team.isRequired,
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
