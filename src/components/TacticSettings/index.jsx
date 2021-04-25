import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy';
import ImageIcon from 'material-ui/svg-icons/image/image';
import { Paper, Snackbar } from 'material-ui';

import { isValid } from '../../shared/validation/tactic';
import Options from './Options';
import DeleteTacticContainer from '../../containers/DeleteTacticContainer';
import styles from './TacticSettings.scss';
import pt from '../../propTypes';
import AnimatedSaveIcon from '../AnimatedSaveIcon';
import { generateTacticImages } from '../../lib/generateImage';

class TacticSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleTacticNameChange = this.handleTacticNameChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleGenerateImage = this.handleGenerateImage.bind(this);
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

  handleSave(tactic) {
    this.props.onTacticSave(tactic)
      .then(() => {
        if (!this.props.unsavedTacticIds.has(tactic.id)) {
          this.setState({ open: true });
        }
      });
  }

  handleGenerateImage() {
    const { options } = this.props.tactic;
    generateTacticImages(options.showSummary);
  }

  render() {
    const { onSettingChange, tactic, isSavingTactic } = this.props;
    if (!tactic) return null;

    // noinspection JSUnresolvedVariable
    return (
      <Paper id="tactic-settings" zDepth={3} className={styles.wrapper}>
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
              onTouchTap={() => this.handleSave(tactic)}
              disabled={isSavingTactic}
            />
          </div>
          <div>
            <DeleteTacticContainer />
          </div>
          <div>
            <RaisedButton
              label="Copy"
              icon={<ContentCopyIcon />}
              onTouchTap={() => this.props.onTacticCopy(tactic)}
              disabled={isSavingTactic}
            />
          </div>
          <div>
            <RaisedButton
              label="Generate image"
              icon={<ImageIcon />}
              onTouchTap={this.handleGenerateImage}
            />
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
  onTacticCopy: PropTypes.func.isRequired,
  isSavingTactic: PropTypes.bool.isRequired,
  unsavedTacticIds: pt.unsavedTacticIds.isRequired,
};

export default TacticSettings;
