import React from 'react';
import PropTypes from 'prop-types';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { FloatingActionButton, Paper } from 'material-ui';

import styles from './Bench.scss';
import pt from '../../propTypes';
import { getBenchPosition } from '../../lib/footballField';
import TileContainer from '../../containers/TileContainer';
import defaultTeam from '../../lib/footballField/defaultTeam.json';

const Bench = (props) => {
  const {
    players,
    team,
    onBenchPlayerAdd,
    className,
  } = props;

  const benchPlayersCount = Object.keys(players).length || 0;

  const renderPlayerList = () => (
    <ul className={styles.playerList}>
      {Object.keys(players).map((playerPos, index) => {
        const player = players[playerPos];
        return (
          <li className={styles.item} key={playerPos}>
            <TileContainer
              style={{ width: '100%', height: '100%' }}
              data-bench-pos={getBenchPosition(player.position)}
              key={playerPos}
              team={team}
              position={index}
              player={player}
            />
          </li>);
      })}
      {benchPlayersCount < 11 && <li
        className={styles.addPlayer}
        id={`bench-${team.id}-add-player`}
      >
        <FloatingActionButton mini>
          <PersonAddIcon
            onTouchTap={() => onBenchPlayerAdd(team.id)}
          />
        </FloatingActionButton>
      </li>}
    </ul>
  );

  return (
    <Paper
      zDepth={3}
      className={`${className} ${styles.wrapper}`}
      id={`team-${team.id}-bench`}
      onContextMenu={event => event.preventDefault()}
    >
      <div className={styles.teamName}>{team.name}</div>
      {team.id && renderPlayerList()}
    </Paper>
  );
};

Bench.defaultProps = {
  team: {
    name: defaultTeam.name,
    players: [],
  },
  className: '',
};

Bench.propTypes = {
  players: pt.playersByPos.isRequired,
  team: pt.team,
  className: PropTypes.string,
  onBenchPlayerAdd: PropTypes.func.isRequired,
};

export default Bench;
