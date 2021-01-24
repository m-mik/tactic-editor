import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import styles from './TacticSettings.scss';

const TacticSettings = () => {
  return (
    <Paper zDepth={2} className={styles.wrapper}>
      <TextField floatingLabelText="Tactic name" />
      <div className={styles.options}>
        <Toggle label="Grid" />
        <Toggle label="Ratings" />
        <Toggle label="Numbers" />
      </div>
      <RaisedButton label="Save" primary />
      <RaisedButton label="Delete" secondary />
    </Paper>
  );
};

export default TacticSettings;
