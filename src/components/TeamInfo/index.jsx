import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { white } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Color from 'color';
import formations from '../../lib/footballField/formations.json';
import { getFormationText, getFormation } from '../../lib/footballField';
import styles from './TeamInfo.scss';

export default class TeamInfo extends Component {
  constructor() {
    super();

    this.state = { isEditing: false };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTacticChange = this.handleTacticChange.bind(this);
    this.disableEditing = this.disableEditing.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    if (!name || (name.length <= 20 && /^[a-z0-9\s-]+$/i.test(name))) {
      this.props.onUpdate(this.props.team.id, { name });
    }
  }

  handleTacticChange(event, index, value) {
    if (value === 0) return;
    const formation = formations[value];
    const { team, onPlayerPositionChange } = this.props;
    const { players } = team;
    Object.keys(players).sort((a, b) => a - b).forEach((pos, i) => {
      const player = players[pos];
      const targetPos = formation.positions[i];
      if (player.position !== targetPos) {
        onPlayerPositionChange({ ...player, team: { id: team.id } }, targetPos);
      }
    });
  }

  disableEditing(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
  }

  renderTeamName(team) {
    if (this.state.isEditing) {
      return (<TextField
        className={styles.nameField}
        name="name"
        value={team.name}
        autoFocus
        onChange={this.handleNameChange}
        onBlur={this.disableEditing}
        ref={(name) => { this.name = name; }}
      />);
    }

    return (<span // eslint-disable-line jsx-a11y/no-static-element-interactions
      onClick={() => this.setState({ isEditing: true })}
      className={styles.name}
      style={{ color: team.shirt.textColor }}
    >
      {team.name}
    </span>);
  }

  renderTacticList() { // eslint-disable-line class-methods-use-this
    const currentFormation = getFormation(this.props.team.players);
    const formationText = getFormationText(currentFormation);

    return (
      <SelectField
        onChange={this.handleTacticChange}
        labelStyle={{ color: '#fff' }}
        className={styles.tacticSelect}
        value={0}
      >
        <MenuItem value={0} primaryText={formationText} />
        {Object.keys(formations).map((key) => {
          const formation = formations[key];
          if (formationText !== formation.name) {
            return (<MenuItem
              key={formation.id}
              value={formation.id}
              primaryText={formation.name}
            />);
          }
          return null;
        })}
      </SelectField>
    );
  }

  renderIcons() {
    return (
      <IconButton
        className={styles.colors}
        onTouchTap={() => this.props.openEditTeamDialog(this.props.team.id)}
      >
        <EditIcon color={white} />
      </IconButton>
    );
  }

  render() {
    const { team } = this.props;
    if (!team) return null;

    const teamGoals = Object.keys(team.players)
      .reduce((goals, key) => goals + team.players[key].goals, 0);

    const color = Color(team.shirt.backgroundColor);
    const background = `linear-gradient(to bottom, ${color}, ${color.darken(0.8)})`;
    const wrapperStyle = {
      background,
    };

    return (
      <div className={styles.wrapper} style={wrapperStyle}>
        <form className={styles.form} onSubmit={this.disableEditing}>
          <span className={styles.goals}>{teamGoals}</span>
          {this.renderTeamName(team)}
          {this.renderIcons()}
          {this.renderTacticList()}
        </form>
      </div>
    );
  }
}

TeamInfo.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    players: PropTypes.object,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  openEditTeamDialog: PropTypes.func.isRequired,
  onPlayerPositionChange: PropTypes.func.isRequired,
};
