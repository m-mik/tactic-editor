import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { isValid } from '../../shared/validation/tactic';
import Options from './Options';
import DeleteTacticContainer from '../../containers/DeleteTacticContainer';
import styles from './TacticSettings.scss';

class TacticSettings extends PureComponent {
  constructor() {
    super();

    this.handleTacticNameChange = this.handleTacticNameChange.bind(this);
  }

  handleTacticNameChange(event) {
    const { onSettingChange, tactic } = this.props;
    const tacticName = event.target.value;
    const data = { name: tacticName };
    if (isValid(data)) onSettingChange(tactic.id, data);
  }

  render() {
    const { onSettingChange, tactic } = this.props;
    if (!tactic) return null;

    return (
      <div className={styles.wrapper}>
        <TextField
          floatingLabelText="Tactic name" value={tactic.name}
          onChange={this.handleTacticNameChange}
        />
        <Options
          className={styles.options}
          tactic={tactic}
          onSettingChange={onSettingChange}
        />
        <RaisedButton label="Save" primary />
        <DeleteTacticContainer />
      </div>
    );
  }
}

TacticSettings.defaultProps = {
  tactic: null,
};

TacticSettings.propTypes = {
  tactic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.shape({
      showGrid: PropTypes.bool.isRequired,
      showNumbers: PropTypes.bool.isRequired,
      showRatings: PropTypes.bool.isRequired,
      showCards: PropTypes.bool.isRequired,
      showGoals: PropTypes.bool.isRequired,
      showAssists: PropTypes.bool.isRequired,
    }),
  }),
  onSettingChange: PropTypes.func.isRequired,
};

export default TacticSettings;
