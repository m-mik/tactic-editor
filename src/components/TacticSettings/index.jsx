import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './TacticSettings.scss';

const TacticSettings = (props) => {
  const { id, name, options } = props.tactic;
  const { showGrid, showRatings, showNumbers } = options;

  const renderOptions = () => {
    const toggleOptions = [
        { key: 'showGrid', label: 'Grid', toggled: showGrid },
        { key: 'showRatings', label: 'Ratings', toggled: showRatings },
        { key: 'showNumbers', label: 'Numbers', toggled: showNumbers },
    ];
    return toggleOptions.map(option =>
      <Toggle
        key={option.key}
        defaultToggled={option.toggled}
        label={option.label}
        onToggle={() => {
          props.updateTactic(id, { options: { [option.key]: !option.toggled } });
        }}
      />);
  };

  const handleTacticNameChange = (event) => {
    //console.log(event.target.value);
    //props.updateTactic(id, { name: event.target.value });
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
      showRatings: PropTypes.bool.isRequired,
      showNumbers: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  updateTactic: PropTypes.func.isRequired,
};

export default TacticSettings;
