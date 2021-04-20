import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import { Paper } from 'material-ui';

import { isValid } from '../../shared/validation/tactic';
import Options from './Options';
import DeleteTacticContainer from '../../containers/DeleteTacticContainer';
import styles from './TacticSettings.scss';
import pt from '../../propTypes';

class TacticSettings extends PureComponent {
  constructor(props) {
    super(props);

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
      <Paper zDepth={3} className={styles.wrapper}>
        <TextField
          floatingLabelText="Tactic name" value={tactic.name}
          onChange={this.handleTacticNameChange}
        />
        <Options
          className={styles.options}
          tactic={tactic}
          onSettingChange={onSettingChange}
        />
        <div className={styles.buttons}>
          <div>
            <RaisedButton
              label="Save"
              primary icon={<SaveIcon />}
              onTouchTap={() => this.props.onTacticSave(tactic)}
            />
          </div>
          <div>
            <DeleteTacticContainer />
          </div>
        </div>
      </Paper>
    );
  }
}

TacticSettings.defaultProps = {
  tactic: null,
};

TacticSettings.propTypes = {
  tactic: pt.denormalizedTactic,
  onSettingChange: PropTypes.func.isRequired,
  onTacticSave: PropTypes.func.isRequired,
};

export default TacticSettings;
