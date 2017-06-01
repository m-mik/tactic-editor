import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import { green500, red500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import AddButton from '../AddButton';
import RemoveButton from '../RemoveButton';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import AssistIcon from '../AssistIcon';
import styles from './PlayerPopover.scss';

export default class PlayerPopover extends Component {
  constructor() {
    super();

    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.player !== nextProps.player;
  }

  handleNumberChange(event) {
    const number = +event.target.value;
    if (number >= 0 && number < 99) {
      this.props.onPlayerChange(this.props.player.id, { number });
    }
  }

  render() {
    const { player, onPlayerChange } = this.props;
    return (
      <Popover
        className={styles.wrapper}
        open={!!this.props.player}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
        onRequestClose={this.props.onRequestClose}
        useLayerForClickAway={false}
      >
        <ul className={styles.list}>
          <li>
            <YellowCardIcon className={styles.card} />
            <RemoveButton tooltip="Remove Yellow Card" />
            <AddButton tooltip="Add Yellow Card" />
          </li>
          <li>
            <GoalIcon className={styles.ball} />
            <RemoveButton tooltip="Remove Goal" />
            <AddButton tooltip="Add Goal" />
          </li>
          <li>
            <RedCardIcon className={styles.card} />
            <RemoveButton tooltip="Remove Red Card" />
            <AddButton tooltip="Add Red Card" />
          </li>
          <li>
            <AssistIcon className={styles.ball} />
            <RemoveButton tooltip="Remove Assist" />
            <AddButton tooltip="Add Assist" />
          </li>
          <li className={styles.fullWidth}>
            <TextField
              className={styles.numberField}
              hintText="Number"
              floatingLabelFixed
              name="number"
              type="number"
              value={player.number <= 0 ? '' : player.number}
              onChange={this.handleNumberChange}
              min={1}
              max={99}
            />
            <TextField
              className={styles.nameField}
              hintText="Name"
              floatingLabelFixed
              name="name"
              value={player.name}
              onChange={e => onPlayerChange(player.id, { name: e.target.value })}
              autoFocus
            />
          </li>
        </ul>
      </Popover>
    );
  }
}

PlayerPopover.defaultProps = {
  anchorEl: null,
};

PlayerPopover.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
