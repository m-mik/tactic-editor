import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { white } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Color from 'color';
import styles from './TeamInfo.scss';

export default class TeamInfo extends Component {
  constructor() {
    super();

    this.state = { isEditing: false };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.disableEditing = this.disableEditing.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    if (!name || (name.length <= 20 && /^[a-z0-9\s-]+$/i.test(name))) {
      this.props.onUpdate(this.props.team.id, { name });
    }
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
    return (
      <SelectField
        style={{ marginLeft: 10 }}
        labelStyle={{ color: '#fff' }}
        className={styles.tacticSelect}
        value={1}
      >
        <MenuItem value={1} primaryText="4-4-2" />
        <MenuItem value={2} primaryText="4-4-1-1" />
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  openEditTeamDialog: PropTypes.func.isRequired,
};
