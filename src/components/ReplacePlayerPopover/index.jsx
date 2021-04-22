import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/extensions
import { nanoid } from 'nanoid';
import Popover from 'material-ui/Popover';
import ScheduleIcon from 'material-ui/svg-icons/action/schedule';
import SwapHorizIcon from 'material-ui/svg-icons/action/swap-horiz';
import AddIcon from 'material-ui/svg-icons/content/add';

import { Menu, MenuItem, RaisedButton, TextField } from 'material-ui';
import SubstitutionIcon from '../SubstitutionIcon';
import styles from './ReplacePlayerPopover.scss';
import pt from '../../propTypes';

export default class ReplacePlayerPopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSubstitutionMinute: false,
      substitutionMinute: 60,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubstitutionMinuteChange = this.handleSubstitutionMinuteChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      this.props.onRequestClose();
    }
  }

  handleSubstitutionMinuteChange(event, value) {
    const minute = Number(value);
    if (value < 1 || value > 120) return;
    this.setState({ substitutionMinute: minute });
  }

  renderMenu() {
    const { players, onPlayerSwap } = this.props;
    const { p1, p2 } = players;
    return (
      <Menu>
        <MenuItem
          primaryText="Substitute player" leftIcon={<SubstitutionIcon />}
          onTouchTap={() => this.setState({ showSubstitutionMinute: true })}
        />
        <MenuItem
          primaryText="Swap positions" leftIcon={<SwapHorizIcon />}
          onTouchTap={() => onPlayerSwap(p1, p2)}
        />
      </Menu>
    );
  }

  renderSubstitutionMinute() {
    const { p1, p2 } = this.props.players;

    return (
      <div className={styles.substitutionWrapper}>
        <div className={styles.substitutionMinute}>
          <ScheduleIcon />&nbsp;&nbsp;
          <span className={styles.substitutionMinuteText}>Substitution minute</span>
        </div>
        <div>
          <TextField
            className={styles.substitutionMinuteField}
            id="substitution-minute-field"
            value={this.state.substitutionMinute}
            type="number"
            onChange={this.handleSubstitutionMinuteChange}
            min={1}
            max={120}
            autoFocus
          />
        </div>
        <div>
          <RaisedButton
            label="Add"
            icon={<AddIcon />}
            primary
            onTouchTap={() => this.props.onPlayerSubstitute(p1.team.id, {
              id: nanoid(),
              players: [p1.id, p2.id],
              minute: this.state.substitutionMinute,
            })}
          />
        </div>
      </div>
    );
  }

  render() {
    const { players, onPlayerSubstitute, onPlayerSwap, ...rest } = this.props;
    const { showSubstitutionMinute } = this.state;

    return (
      <Popover
        open={!!players}
        anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
        onRequestClose={this.props.onRequestClose}
        useLayerForClickAway
        className={styles.wrapper}
        {...rest}
      >
        {showSubstitutionMinute ? this.renderSubstitutionMinute() : this.renderMenu()}
      </Popover>
    );
  }
}

ReplacePlayerPopover.defaultProps = {
  anchorEl: null,
  players: null,
};

ReplacePlayerPopover.propTypes = {
  players: pt.playersToReplace,
  onRequestClose: PropTypes.func.isRequired,
  onPlayerSwap: PropTypes.func.isRequired,
  onPlayerSubstitute: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
