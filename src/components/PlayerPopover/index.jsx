import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import { MenuItem, SelectField } from 'material-ui';
import set from 'lodash/set';
import debounce from 'lodash/debounce';

import AddButton from '../AddButton';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import styles from './PlayerPopover.scss';
import pt from '../../propTypes';

export default class PlayerPopover extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTeamStatAdd = this.handleTeamStatAdd.bind(this);
    this.debouncedOnPlayerChange = debounce(props.onPlayerChange.bind(this), 100);

    const { name, number, rating } = props.player;
    this.state = { name, number, rating };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.player !== nextProps.player) || (this.state !== nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleChange(path, newVal, test) {
    const { player } = this.props;
    if (!test || test(newVal)) {
      const result = set(this.state, path, newVal);
      this.setState(prevState => ({ ...prevState, ...result }));
      this.debouncedOnPlayerChange(player.id, result);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      this.props.onRequestClose();
    }
  }

 /* handlePlayerStatsChange(event) {
    const { team } = this.props;
    // const result = set({}, path, newVal);
    console.log('handle');
    this.props.onPlayerStatChange(team.id, {
      goals: [...team.goals, { wtf: 3 }],
    });
    // event.target.value;

    // onPlayerStatsChange
  }*/

  handleTeamStatAdd() {

  }

  renderGoals() {
    const { team, player } = this.props;

    return (
      <div className={styles.goals}>
        <ul className={styles.list}>
          {team.goals.filter(goal => goal.playerId === player.id)
          .map(goal =>
            <li key={goal.id}>
              <div>
                <GoalIcon className={styles.smallIcon} />
              </div>
              <div>
                <TextField
                  className={styles.minute}
                  id="minute-field"
                  value={goal.minute}
                  type="number"
                  hintText="minute"
                  onChange={this.handlePlayerStatsChange}
                  min={1}
                  max={120}
                  autoFocus
                />
              min.
              </div>
              <div className={styles.players}>({this.renderPlayersMenu()})</div>
            </li>)
        }
        </ul>
      </div>
    );
  }

  renderPlayersMenu() {
    const { player, team } = this.props;
    const { players } = team;
    const teamPlayers = players.filter(p => (p.id !== player.id) && (p.position > -1));

    return (
      <SelectField
        className={styles.select}
        hintText="Assisted by"
        value={null}
        multiLine={false}
        hintStyle={{ color: 'white', paddingLeft: 10 }}
        menuStyle={{ width: 130 }}
        maxHeight={300}
        onChange={this.handlePlayerStatsChange}
      >
        <MenuItem value={null} primaryText="-" />
        {teamPlayers.map(({ id, name }) => <MenuItem key={id} value={id} primaryText={name} />)}
      </SelectField>
    );
  }

  renderButtons(path, val, label, validate) {
    return [
      <AddButton
        className={styles.button}
        key={`add.${path}`}
        tooltip={`Add ${label}`}
        disabled={!validate(val + 1)}
        onTouchTap={() =>
          this.handleTeamStatAdd(path, val + 1, validate)}
      />,
    ];
  }

  render() {
    const { name, number, rating } = this.state;
    const { team, player, playerStats } = this.props;
    const { goals, yellowCards, redCards } = playerStats;

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
        useLayerForClickAway
      >
        {this.renderGoals()}
        <ul className={styles.list}>
          <li>
            <GoalIcon className={styles.ball} />
            {this.renderButtons('goals', goals, 'Goal', validate.goals)}
          </li>
          <li>
            <YellowCardIcon className={styles.card} />
            {this.renderButtons('cards.yellow', yellowCards, 'Yellow Card',
              validate.cards.yellow)}
          </li>
          <li>
            <RedCardIcon className={styles.card} />
            {this.renderButtons('cards.red', redCards, 'Red Card', validate.cards.red)}
          </li>
          <li className={styles.fullWidth}>
            <TextField
              className={styles.numberField}
              floatingLabelText="Number"
              floatingLabelFixed
              name="number"
              type="number"
              value={number <= 0 ? '' : number}
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
              value={rating <= 0 ? '' : rating}
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
              value={name}
              onChange={e => this.handleChange('name', e.target.value, validate.name)}
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
  team: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  playerStats: pt.playerStats.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  onTeamStatAdd: PropTypes.func.isRequired,
  onTeamStatRemove: PropTypes.func.isRequired,
  onTeamStatChange: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
