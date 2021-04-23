import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import { Paper, Snackbar } from 'material-ui';

import { isValid } from '../../shared/validation/tactic';
import Options from './Options';
import DeleteTacticContainer from '../../containers/DeleteTacticContainer';
import styles from './TacticSettings.scss';
import pt from '../../propTypes';
import AnimatedSaveIcon from '../AnimatedSaveIcon';

class TacticSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleTacticNameChange = this.handleTacticNameChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tactic && nextProps.tactic && (this.props.tactic.id !== nextProps.tactic.id)) {
      this.handleRequestClose();
    }
  }

  handleTacticNameChange(event) {
    const { onSettingChange, tactic } = this.props;
    const tacticName = event.target.value;
    const data = { name: tacticName };
    if (isValid(data)) onSettingChange(tactic.id, data);
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleRequestSave(tactic) {
    this.props.onTacticSave(tactic)
      .then(() => {
        if (!this.props.unsavedTacticIds.has(tactic.id)) {
          this.setState({ open: true });
        }
      });
  }

  render() {
    const { onSettingChange, tactic, isSavingTactic } = this.props;
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
              primary
              icon={isSavingTactic ? <AnimatedSaveIcon /> : <SaveIcon />}
              onTouchTap={() => this.handleRequestSave(tactic)}
              disabled={isSavingTactic}
            />
          </div>
          <div>
            <DeleteTacticContainer />
          </div>
        </div>
        <Snackbar
          open={this.state.open}
          message={`Tactic "${this.props.tactic.name}" has been saved`}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          contentStyle={{ textAlign: 'center' }}
        />
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
  isSavingTactic: PropTypes.bool.isRequired,
  unsavedTacticIds: pt.unsavedTacticIds.isRequired,
};

export default TacticSettings;
