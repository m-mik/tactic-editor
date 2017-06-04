import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { white } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

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
    >
      {team.name}
    </span>);
  }

  render() {
    const { team } = this.props;

    const teamGoals = Object.keys(team.players)
      .reduce((goals, key) => goals + team.players[key].goals, 0);

    return (
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={this.disableEditing}>
          <span className={styles.goals}>{teamGoals}</span>
          {this.renderTeamName(team)}
          <IconButton
            className={styles.colors}
            onTouchTap={() => this.props.openEditTeamDialog(team.id)}
          >
            <EditIcon color={white} />
          </IconButton>
          <SelectField
            style={{ marginLeft: 10 }}
            labelStyle={{ color: '#fff' }}
            className={styles.tacticSelect}
            value={1}
          >
            <MenuItem value={1} primaryText="4-4-2" />
            <MenuItem value={2} primaryText="4-4-1-1" />
          </SelectField>
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
