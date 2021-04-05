import React from 'react';

import styles from './Bench.scss';
import pt from '../../propTypes';
import { getBenchPosition } from '../../lib/footballField';
import TileContainer from '../../containers/TileContainer';

const Bench = (props) => {
  const { players, team, teamInfo } = props;
  if (!team) return '';

  const renderPlayerList = () => (
    <ul className={styles.list}>
      {Object.keys(players).map((playerPos, index) => {
        const player = players[playerPos];
        return (
          <li className={styles.listItem} key={playerPos}>
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
    </ul>
  );

  return (
    <div
      className={styles.bench}
      id={`team-${team.id}-bench`}
      onContextMenu={event => event.preventDefault()}
    >
      <span className={styles.teamName}>{teamInfo.name}</span>
      {renderPlayerList()}
    </div>
  );
};

Bench.propTypes = {
  players: pt.playersByPos.isRequired,
  team: pt.team.isRequired,
  teamInfo: pt.teamInfo.isRequired,
};

export default Bench;
