import React from 'react';
import PropTypes from 'prop-types';

import styles from './Bench.scss';
import pt from '../../propTypes';
import Player from '../Player';
import { getBenchPosition } from '../../lib/footballField';

const Bench = (props) => {
  const { players, team, playerOptions, activePlayerId, onPlayerSelect } = props;
  if (!team) return '';

  const { textColor, backgroundColor, border } = team.shirt;
  const { style: borderStyle, color: borderColor } = border;

  const handlePlayerTouchTap = (event, playerId) => {
    event.preventDefault();
    if (activePlayerId !== playerId) {
      onPlayerSelect(playerId);
    }
  };

  const renderPlayerList = () => (
    <ul className={styles.list}>
      {players.map(({ id, position, ...rest }) => <li className={styles.listItem} key={id}>
        <Player
          className={styles.player} options={playerOptions} team={{
            shirt: {
              border: { style: borderStyle, color: borderColor },
              textColor,
              backgroundColor,
            },
          }}
          onTouchTap={event => handlePlayerTouchTap(event, id)}
          data-bench-pos={getBenchPosition(position)}
          {...rest}
        />
      </li>)}
    </ul>
  );

  return (
    <div className={styles.bench} id={`team-${team.id}-bench`}>
      {renderPlayerList()}
    </div>
  );
};

Bench.propTypes = {
  activePlayerId: pt.playerId.isRequired,
  players: pt.players.isRequired,
  team: pt.teamInfo.isRequired,
  playerOptions: pt.playerOptions.isRequired,
  onPlayerSelect: PropTypes.func.isRequired,
};

export default Bench;
