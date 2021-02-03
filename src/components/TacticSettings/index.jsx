import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { isValid } from '../../shared/validation/tactic';
import styles from './TacticSettings.scss';

const TacticSettings = (props) => {
  const { onSettingChange } = props;
  const { id, name, options } = props.tactic;
  const {
    showGrid,
    showName,
    showRatings,
    showNumbers,
    showCards,
    showGoals,
    showAssists,
  } = options;

  const renderOptions = () => {
    const toggleOptions = [
        { key: 'showGrid', label: 'Grid', toggled: showGrid },
        { key: 'showName', label: 'Name', toggled: showName },
        { key: 'showRatings', label: 'Ratings', toggled: showRatings },
        { key: 'showNumbers', label: 'Numbers', toggled: showNumbers },
        { key: 'showCards', label: 'Cards', toggled: showCards },
        { key: 'showGoals', label: 'Goals', toggled: showGoals },
        { key: 'showAssists', label: 'Assists', toggled: showAssists },
    ];
    return toggleOptions.map(option =>
      <Toggle
        key={option.key}
        defaultToggled={option.toggled}
        label={option.label}
        onToggle={() => onSettingChange(id, { options: { [option.key]: !option.toggled } })}
      />);
  };

  const handleTacticNameChange = (event) => {
    const tacticName = event.target.value;
    const data = { name: tacticName };
    if (isValid(data)) onSettingChange(id, data);
  };

  return (
    <div className={styles.wrapper}>
      <TextField floatingLabelText="Tactic name" value={name} onChange={handleTacticNameChange} />
      <div className={styles.options}>
        {renderOptions()}
      </div>
      <RaisedButton label="Save" primary />
      <RaisedButton label="Delete" secondary />
    </div>
  );
};

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
};

export default TacticSettings;
