import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import { connect } from 'react-redux';
import { SelectField, TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { ChromePicker } from 'react-color';
import MenuItem from 'material-ui/MenuItem';
import RadioButton from 'material-ui/RadioButton';
import Player from '../../Player';
import styles from './Form.scss';

class Form extends Component {
  constructor() {
    super();

    this.handleShirtOptionChange = this.handleShirtOptionChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  componentWillMount() {
    const { shirt } = this.props.team;
    this.setState({
      selectedShirtOption: 'textColor',
      backgroundColor: shirt.backgroundColor,
      textColor: shirt.textColor,
      borderColor: shirt.border.color,
      borderStyle: shirt.border.style,
    });
  }

  getColor() {
    const { selectedShirtOption } = this.state;
    return this.state[selectedShirtOption];
  }

  handleShirtOptionChange(event) {
    this.setState({ selectedShirtOption: event.target.value });
  }

  handleColorChange(color) {
    this.setState((prevState) => {
      const { selectedShirtOption } = prevState;
      return { ...prevState, [selectedShirtOption]: color.hex };
    });
  }

  renderNameField() {
    return (<Field
      autoFocus
      fullWidth
      name="name"
      component={TextField}
      floatingLabelText="Name"
    />);
  }

  renderPlayer() {
    const { textColor, backgroundColor, borderStyle, borderColor } = this.state;
    return (<Player
      className={styles.player} team={{
        shirt: {
          border: { style: borderStyle, color: borderColor },
          textColor,
          backgroundColor,
        },
      }}
    />);
  }

  renderShirtOptions() {
    return (<Field
      name="shirtOption"
      component={RadioButtonGroup}
      className={styles.shirtOptions}
      onChange={this.handleShirtOptionChange}
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
      onChange={this.handleColorChange}
    />);
  }

  renderShirtStyle() {
    return (<Field
      name="borderStyle"
      component={SelectField}
      floatingLabelText="Shirt style"
      floatingLabelFixed
    >
      <MenuItem value="solid" primaryText="Type 1" />
      <MenuItem value="dashed" primaryText="Type 2" />
      <MenuItem value="dotted" primaryText="Type 3" />
    </Field>);
  }

  render() {
    const { onSubmit, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div>
          {this.renderNameField()}
        </div>
        <div>
          {this.renderPlayer()}
        </div>
        <div>
          {this.renderShirtOptions()}
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

// todo: move to lib
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

const EditTacticForm = reduxForm({
  form: 'editTacticForm',
  validate,
})(Form);

const mapStateToProps = (state, { team }) => {
  const { shirt } = team;
  return {
    initialValues: {
      shirtOption: 'textColor',
      name: team.name,
      backgroundColor: shirt.backgroundColor,
      textColor: shirt.textColor,
      borderColor: shirt.border.color,
      borderStyle: shirt.border.style,
    },
  };
};

export default connect(mapStateToProps)(EditTacticForm);
