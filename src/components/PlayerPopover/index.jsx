import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import { MenuItem, SelectField } from 'material-ui';
import set from 'lodash/set';
import debounce from 'lodash/debounce';
// eslint-disable-next-line import/extensions
import { nanoid } from 'nanoid';

import CircleRemoveButton from '../CircleRemoveButton';
import AddButton from '../AddButton';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import styles from './PlayerPopover.scss';
import pt from '../../propTypes';
import OwnGoalIcon from '../OwnGoalIcon';
import RemoveButton from '../RemoveButton';
import { isBenchPlayer, isFieldPlayer } from '../../lib/footballField';
import SubstitutionOnIcon from '../SubstitutionOnIcon';
import SubstitutionOffIcon from '../SubstitutionOffIcon';
import SubstitutionIcon from '../SubstitutionIcon';

export default class PlayerPopover extends Component {
  static isValid(statName, value) {
    const validationData = {
      minute: val => val >= 1 && val <= 120,
      goals: val => val >= 0 && val <= 5,
      assists: val => val >= 0 && val <= 5,
      yellowCards: val => val >= 0 && val <= 2,
      redCards: val => val >= 0 && val <= 1,
      number: val => val >= 0 && val <= 99,
      rating: val => val >= 1 && val <= 10,
      name: val => val.length >= 0 && val.length <= 15,
    };
    const test = validationData[statName];
    return !test || test(value);
  }

  static renderIcon(statName, stat) {
    const icons = {
      substitutions: <SubstitutionIcon className={styles.smallSubIcon} />,
      yellowCards: <YellowCardIcon className={styles.smallCard} />,
      redCards: <RedCardIcon className={styles.smallCard} />,
      goals: stat.ownGoal
        ? <OwnGoalIcon className={styles.smallBall} />
        : <GoalIcon className={styles.smallBall} />,
    };
    return icons[statName];
  }

  static renderAddButton(statName, value, tooltip, addFn) {
    return (
      <AddButton
        className={styles.button}
        tooltip={tooltip}
        disabled={!PlayerPopover.isValid(statName, value + 1)}
        onTouchTap={() => PlayerPopover.validate(statName, value + 1, addFn)}
      />
    );
  }

  static validate(statName, value, callback) {
    if (PlayerPopover.isValid(statName, value)) callback();
  }

  constructor(props) {
    super(props);

    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTeamStatAdd = this.handleTeamStatAdd.bind(this);
    this.handleTeamStatRemove = this.handleTeamStatRemove.bind(this);
    this.handleTeamStatChange = this.handleTeamStatChange.bind(this);
    this.handleOwnGoalAdd = this.handleGoalAdd.bind(this, true);
    this.handleGoalAdd = this.handleGoalAdd.bind(this, false);
    this.handleCardAdd = this.handleCardAdd.bind(this);
    this.handleYellowCardAdd = this.handleCardAdd.bind(this, 'yellowCards');
    this.handleRedCardAdd = this.handleCardAdd.bind(this, 'redCards');
    this.debouncedOnPlayerChange = debounce(props.onPlayerChange.bind(this), 100);

    const { name, number, rating } = props.player;
    this.state = { name, number, rating };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props !== nextProps) || (this.state !== nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handlePlayerChange(statName, value) {
    const { player } = this.props;
    if (PlayerPopover.isValid(statName, value)) {
      const result = set(this.state, statName, value);
      this.setState(prevState => ({ ...prevState, ...result }));
      this.debouncedOnPlayerChange(player.id, result);
    }
  }

  handleTeamStatAdd(statName, statData) {
    this.props.onTeamStatAdd({ teamId: this.props.team.id, statName, ...statData });
  }

  handleTeamStatRemove(statName, statId) {
    this.props.onTeamStatRemove({ teamId: this.props.team.id, statName, statId });
  }

  handleTeamStatChange(statName, statId, statData) {
    this.props.onTeamStatChange({ teamId: this.props.team.id, statName, statId, statData });
  }

  handleGoalAdd(ownGoal) {
    this.handleTeamStatAdd('goals', {
      statName: 'goals',
      statData: {
        id: nanoid(),
        playerId: this.props.player.id,
        minute: 45,
        assistedBy: 0,
        ownGoal,
      },
    });
  }

  handleCardAdd(statName) {
    this.handleTeamStatAdd(statName, {
      statName,
      statData: {
        id: nanoid(),
        playerId: this.props.player.id,
        minute: 45,
      },
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      this.props.onRequestClose();
    }
  }

  renderSubstitution(sub) {
    const { team } = this.props;
    const players = sub.players.map(
        (playerId, i) => team.players.find(p => p.id === sub.players[i]),
      );
    players.sort((p1, p2) => isFieldPlayer(p1) - isFieldPlayer(p2));
    const [p1, p2] = players;

    return (
      <div key={sub.id} className={styles.substitution}>
        <div className={styles.on}>
          <SubstitutionOnIcon />
          <span className={styles.name}>{p1.name}</span>
        </div>
        <div className={styles.off}>
          <SubstitutionOffIcon />
          <span className={styles.name}>{p2.name}</span>
        </div>
      </div>
    );
  }

  renderStats(statName) {
    const selectedPlayerStats = s => s.playerId === this.props.player.id;
    const data = statName === 'substitutions'
    ? this.props.team[statName].filter(sub => sub.players.includes(this.props.player.id))
    : this.props.team[statName].filter(selectedPlayerStats);

    if (statName === 'goals') data.sort((g1, g2) => g1.ownGoal - g2.ownGoal);

    return (
      <div className={styles.stats}>
        <ul className={styles.list}>
          {data.map(stat => (
            <li className="fadeIn" key={stat.id}>
              <div className={styles.icon}>
                {PlayerPopover.renderIcon(statName, stat)}
              </div>
              <div className={styles.minute}>
                <TextField
                  className={styles.minuteField}
                  value={stat.minute}
                  type="number"
                  hintText="minute"
                  onChange={(e, val) => PlayerPopover.validate('minute', +val, this.handleTeamStatChange.bind(this, statName, stat.id, {
                    minute: +val,
                  }))}
                  min={1}
                  max={120}
                  autoFocus
                />
                min.
              </div>
              {statName === 'substitutions' && this.renderSubstitution(stat)}
              {statName === 'goals' && !stat.ownGoal && <div className={styles.players}>
                {this.renderPlayersMenu(stat)}
              </div>}
              <div className={styles.button}>
                <RemoveButton onTouchTap={() => this.handleTeamStatRemove(statName, stat.id)} />
              </div>
            </li>))
        }
        </ul>
      </div>
    );
  }

  renderPlayersMenu(goal) {
    const { id: goalId, assistedBy } = goal;
    const { player, team } = this.props;
    const { players } = team;
    const teamPlayers = players.filter(p => (p.id !== player.id) && (p.position > -1));

    return (
      <SelectField
        className={styles.select}
        hintText="Assisted by"
        value={assistedBy === 0 ? null : assistedBy}
        hintStyle={{ color: '#fff', paddingLeft: 10 }}
        labelStyle={{ color: '#fff' }}
        menuStyle={{ width: 130 }}
        maxHeight={300}
        onChange={(event, index, value) => PlayerPopover.validate(
          'name',
          event.target.textContent,
          this.handleTeamStatChange.bind(this, 'goals', goalId, {
            assistedBy: +value,
          }))}
      >
        <MenuItem value={null} primaryText="" />
        {teamPlayers.map(({ id, name }) => <MenuItem key={id} value={id} primaryText={name} />)}
      </SelectField>
    );
  }

  render() {
    const { name, number, rating } = this.state;
    const { playerStats, player, team, center } = this.props;
    const { goals, yellowCards, redCards } = playerStats;

    return (
      <Popover
        className={styles.wrapper}
        open={!!this.props.player}
        anchorEl={this.props.anchorEl}
        anchorOrigin={center ? { horizontal: 'middle', vertical: 'bottom' } : undefined}
        targetOrigin={center ? { horizontal: 'middle', vertical: 'top' } : undefined}
        onRequestClose={this.props.onRequestClose}
        canAutoPosition
        useLayerForClickAway
      >
        {this.renderStats('substitutions')}
        {this.renderStats('yellowCards')}
        {this.renderStats('redCards')}
        {this.renderStats('goals')}
        <ul className={styles.list}>
          <li className={styles.iconItem}>
            <GoalIcon className={styles.ball} />
            {PlayerPopover.renderAddButton('goals', goals, 'Add Goal', this.handleGoalAdd)}
          </li>
          <li className={styles.iconItem}>
            <OwnGoalIcon className={styles.ball} />
            {PlayerPopover.renderAddButton('goals', goals, 'Add Own Goal', this.handleOwnGoalAdd)}
          </li>
          <li className={styles.iconItem}>
            <YellowCardIcon className={styles.card} />
            {PlayerPopover.renderAddButton('yellowCards', yellowCards, 'Add Yellow Card', this.handleYellowCardAdd)}
          </li>
          <li className={styles.iconItem}>
            <RedCardIcon className={styles.card} />
            {PlayerPopover.renderAddButton('redCards', redCards, 'Add Red Card', this.handleRedCardAdd)}
          </li>
          <li className={styles.fullWidth}>
            <TextField
              className={styles.numberField}
              floatingLabelText="Number"
              floatingLabelFixed
              name="number"
              type="number"
              value={number <= 0 ? '' : number}
              onChange={e => this.handlePlayerChange('number', +e.target.value)}
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
              onChange={e => this.handlePlayerChange('rating', +e.target.value)}
              min={1}
              max={10}
            />
            <TextField
              className={styles.nameField}
              floatingLabelText="Name"
              floatingLabelFixed
              name="name"
              value={name}
              onChange={e => this.handlePlayerChange('name', e.target.value)}
              autoFocus
            />
          </li>
          <li className={styles.removePlayer}>
            {isBenchPlayer(player) &&
            <CircleRemoveButton
              onTouchTap={() => this.props.onBenchPlayerRemove(player.id, team.id)}
            />}
          </li>
        </ul>
      </Popover>
    );
  }
}

PlayerPopover.defaultProps = {
  anchorEl: null,
  center: false,
};

PlayerPopover.propTypes = {
  player: pt.player.isRequired,
  team: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  playerStats: pt.playerStats.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  onBenchPlayerRemove: PropTypes.func.isRequired,
  onTeamStatAdd: PropTypes.func.isRequired,
  onTeamStatRemove: PropTypes.func.isRequired,
  onTeamStatChange: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  center: PropTypes.bool,
};
