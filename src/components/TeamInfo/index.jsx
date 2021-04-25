import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { white } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Color from 'color';

import pt from '../../propTypes';
import formations from '../../lib/footballField/formations.json';
import { getFormationText, getFormation } from '../../lib/footballField';
import defaultTeam from '../../lib/footballField/defaultTeam.json';
import styles from './TeamInfo.scss';

export default class TeamInfo extends Component {
  constructor(props) {
    super(props);

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
    const { team, onFormationChange } = this.props;
    onFormationChange(team, formation);
  }

  disableEditing(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
  }

  renderTeamName() {
    const { team } = this.props;
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
      onClick={() => team.id && this.setState({ isEditing: true })}
      className={styles.name}
      style={{ color: team.shirt.textColor }}
    >
      {team.name}
    </span>);
  }

  renderTacticList() {
    if (!this.props.team.id) return null;
    const { id } = this.props.team;
    const currentFormation = getFormation(this.props.team.players);
    const formationText = getFormationText(currentFormation);

    return (
      <SelectField
        id={`team-${id}-formation`}
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

  renderEditIcon() {
    if (!this.props.team.id) return null;
    const { id } = this.props.team;
    return (
      <IconButton
        onTouchTap={() => this.props.onEditTeamTouchTap(id)}
        id={`edit-team-${id}`}
      >
        <EditIcon color={white} />
      </IconButton>
    );
  }

  renderGoals() {
    return <span className={styles.goals}>{this.props.goals}</span>;
  }

  render() {
    const { team, showGoals } = this.props;
    const color = Color(team.shirt.backgroundColor);
    const background = `linear-gradient(to bottom, ${color}, ${color.darken(0.8)})`;

    return (
      <div className={styles.wrapper} style={{ background }}>
        <form className={styles.form} onSubmit={this.disableEditing}>
          {showGoals && this.renderGoals()}
          {this.renderTeamName()}
          {team && this.renderEditIcon()}
          {team && this.renderTacticList()}
        </form>
      </div>
    );
  }
}

TeamInfo.defaultProps = {
  team: defaultTeam,
  showGoals: true,
};

TeamInfo.propTypes = {
  team: pt.teamInfo,
  showGoals: PropTypes.bool.isRequired,
  goals: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEditTeamTouchTap: PropTypes.func.isRequired,
  onFormationChange: PropTypes.func.isRequired,
};
