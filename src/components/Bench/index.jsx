import React from 'react';
import PropTypes from 'prop-types';

import styles from './Bench.scss';
import pt from '../../propTypes';
import { getBenchPosition } from '../../lib/footballField';
import TileContainer from '../../containers/TileContainer';

const Bench = (props) => {
  const { players, team, teamInfo, playerOptions, onPlayerSelect } = props;
  if (!team) return '';

  const renderPlayerList = () => (
    <ul className={styles.list}>
      {Object.keys(players).map((playerPos) => {
        const player = players[playerPos];
        return (<li className={styles.listItem} key={playerPos}>
          <TileContainer
            style={{ width: '100%', height: '100%' }}
            data-bench-pos={getBenchPosition(player.position)}
            key={playerPos}
            team={team}
            position={+playerPos}
            player={player}
            playerOptions={playerOptions}
            onPlayerTouchTap={() => onPlayerSelect(player.id)}
            onPlayerMove={() => console.log('player move')}
            onPlayersSwap={() => console.log('player swap')}
          />
        </li>);
      })}
    </ul>
  );

  return (
    <div className={styles.bench} id={`team-${team.id}-bench`}>
      <span className={styles.teamName}>{teamInfo.name}</span>
      {renderPlayerList()}
    </div>
  );
};

Bench.propTypes = {
  players: pt.playersByPos.isRequired,
  team: pt.team.isRequired,
  teamInfo: pt.teamInfo.isRequired,
  playerOptions: pt.playerOptions.isRequired,
  onPlayerSelect: PropTypes.func.isRequired,
};

export default Bench;
