import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import IconButton from 'material-ui/IconButton';
import ColorLensIcon from 'material-ui/svg-icons/image/color-lens';
import { white } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './Info.scss';

const cx = classNames.bind(styles);

const Info = ({ type, team }) => {
  const { name } = team;
  const teamGoals = Object.keys(team.players)
    .reduce((goals, key) => goals + team.players[key].goals, 0);

  const wrapperStyle = cx(
    'wrapper',
    { home: type === 'home' },
    { away: type === 'away' },
  );

  return (
    <div className={wrapperStyle}>
      <span className={styles.goals}>{teamGoals}</span>
      <span className={styles.name}>{name}</span>
      <IconButton className={styles.colors}>
        <ColorLensIcon color={white} />
      </IconButton>
    </div>
  );
};

Info.defaultProps = {
  team: {
    name: '',
    players: {},
  },
  type: 'home',
};

Info.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
  }),
  type: PropTypes.string,
};

export default Info;
