import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import isEqual from 'lodash/isEqual';
import { isValid } from '../../shared/validation/tactic';
import styles from './TacticSettings.scss';

class TacticSettings extends Component {
  constructor() {
    super();

    this.renderOptions = this.renderOptions.bind(this);
    this.handleTacticNameChange = this.handleTacticNameChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.tactic.name !== nextProps.tactic.name
      || !isEqual(this.props.tactic.options, nextProps.tactic.options);
  }

  handleTacticNameChange(event) {
    const { onSettingChange, tactic } = this.props;
    const tacticName = event.target.value;
    const data = { name: tacticName };
    if (isValid(data)) onSettingChange(tactic.id, data);
  }

  renderOptions() {
    const { onSettingChange, tactic } = this.props;
    const { id, options } = tactic;
    const {
      showGrid,
      showName,
      showRatings,
      showNumbers,
      showCards,
      showGoals,
      showAssists,
    } = options;

    const toggleOptions = [
      { key: 'showGrid', label: 'Grid', toggled: showGrid },
      { key: 'showRatings', label: 'Ratings', toggled: showRatings },
      { key: 'showNumbers', label: 'Numbers', toggled: showNumbers },
      { key: 'showCards', label: 'Cards', toggled: showCards },
      { key: 'showGoals', label: 'Goals', toggled: showGoals },
      { key: 'showAssists', label: 'Assists', toggled: showAssists },
      { key: 'showName', label: 'Name', toggled: showName },
    ];

    return toggleOptions.map(option =>
      <Toggle
        key={option.key}
        defaultToggled={option.toggled}
        label={option.label}
        onToggle={() => onSettingChange(id, { options: { [option.key]: !option.toggled } })}
      />);
  }

  render() {
    const { onDeleteTacticTouchTap, tactic } = this.props;
    return (
      <div className={styles.wrapper}>
        <TextField
          floatingLabelText="Tactic name" value={tactic.name}
          onChange={this.handleTacticNameChange}
        />
        <div className={styles.options}>
          {this.renderOptions()}
        </div>
        <RaisedButton label="Save" primary />
        <RaisedButton onTouchTap={onDeleteTacticTouchTap} label="Delete" secondary />
      </div>
    );
  }
}

TacticSettings.propTypes = {
  tactic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    options: PropTypes.shape({
      showGrid: PropTypes.bool.isRequired,
      showNumbers: PropTypes.bool.isRequired,
      showRatings: PropTypes.bool.isRequired,
      showCards: PropTypes.bool.isRequired,
      showGoals: PropTypes.bool.isRequired,
      showAssists: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  onSettingChange: PropTypes.func.isRequired,
  onDeleteTacticTouchTap: PropTypes.func.isRequired,
};

export default TacticSettings;
