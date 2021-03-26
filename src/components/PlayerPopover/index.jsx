import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import set from 'lodash/set';
import AddButton from '../AddButton';
import RemoveButton from '../RemoveButton';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import AssistIcon from '../AssistIcon';
import styles from './PlayerPopover.scss';
import pt from '../../propTypes';

export default class PlayerPopover extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.player !== nextProps.player;
  }

  handleChange(path, newVal, test) {
    const { player, onPlayerChange } = this.props;
    if (!test || test(newVal)) {
      const result = set({}, path, newVal);
      onPlayerChange(player.id, result);
    }
  }

  renderButtons(path, val, label, validate) {
    return (
    [
      <RemoveButton
        key={`remove.${path}`}
        tooltip={`Remove ${label}`}
        disabled={!validate(val - 1)}
        onTouchTap={() =>
          this.handleChange(path, val - 1, validate)}
      />,
      <AddButton
        key={`add.${path}`}
        tooltip={`Add ${label}`}
        disabled={!validate(val + 1)}
        onTouchTap={() =>
          this.handleChange(path, val + 1, validate)}
      />,
    ]);
  }

  render() {
    const { player } = this.props;

    const validate = {
      goals: val => val >= 0 && val <= 5,
      assists: val => val >= 0 && val <= 5,
      cards: {
        yellow: val => val >= 0 && val <= 2,
        red: val => val >= 0 && val <= 1,
      },
      number: val => val >= 0 && val <= 99,
      rating: val => val >= 1 && val <= 10,
      name: val => val.length >= 0 && val.length <= 15,
    };

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
            {this.renderButtons('cards.yellow', player.cards.yellow, 'Yellow Card',
              validate.cards.yellow)}
          </li>
          <li>
            <GoalIcon className={styles.ball} />
            {this.renderButtons('goals', player.goals, 'Goal', validate.goals)}
          </li>
          <li>
            <RedCardIcon className={styles.card} />
            {this.renderButtons('cards.red', player.cards.red, 'Red Card', validate.cards.red)}
          </li>
          <li>
            <AssistIcon className={styles.ball} />
            {this.renderButtons('assists', player.assists, 'Assist', validate.assists)}
          </li>
          <li className={styles.fullWidth}>
            <TextField
              className={styles.numberField}
              floatingLabelText="Number"
              floatingLabelFixed
              name="number"
              type="number"
              value={player.number <= 0 ? '' : player.number}
              onChange={e =>
                this.handleChange('number', +e.target.value, validate.number)}
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
              onChange={e =>
                this.handleChange('rating', +e.target.value, validate.rating)}
              min={1}
              max={10}
            />
            <TextField
              className={styles.nameField}
              floatingLabelText="Name"
              floatingLabelFixed
              name="name"
              value={player.name}
              onChange={e =>
                this.handleChange('name', e.target.value, validate.name)}
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
  player: pt.player.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
