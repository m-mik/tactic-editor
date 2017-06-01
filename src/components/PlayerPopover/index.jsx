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

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.player !== nextProps.player;
  }

  handleChange(key, val, validate) {
    if (validate(val)) {
      this.props.onPlayerChange(this.props.player.id, { [key]: val });
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
            <RemoveButton
              tooltip="Remove Yellow Card"
            />
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
              floatingLabelText="Number"
              floatingLabelFixed
              name="number"
              type="number"
              value={player.number <= 0 ? '' : player.number}
              onChange={e => this.handleChange('number', +e.target.value, val =>
                val >= 0 && val < 99,
              )}
              min={1}
              max={99}
            />
            <TextField
              className={styles.ratingField}
              floatingLabelText="Rating"
              floatingLabelFixed
              name="rating"
              type="number"
              value={player.rating <= 0 ? '' : player.rating}
              onChange={e => this.handleChange('rating', +e.target.value, val =>
                val >= 0 && val <= 10,
              )}
              min={1}
              max={10}
            />
            <TextField
              className={styles.nameField}
              floatingLabelText="Name"
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
