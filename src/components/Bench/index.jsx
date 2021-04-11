import React from 'react';
import PropTypes from 'prop-types';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { FloatingActionButton, Paper } from 'material-ui';

import styles from './Bench.scss';
import pt from '../../propTypes';
import { getBenchPosition, isFieldPlayer } from '../../lib/footballField';
import TileContainer from '../../containers/TileContainer';
import SubstitutionOnIcon from '../SubstitutionOnIcon';
import SubstitutionOffIcon from '../SubstitutionOffIcon';
import RemoveButton from '../RemoveButton';

const Bench = (props) => {
  const {
    players,
    team,
    denormalizedSubstitutions,
    onSubstitutionRemove,
    onBenchPlayerAdd,
  } = props;
  denormalizedSubstitutions.sort((s1, s2) => s1.minute - s2.minute);
  if (!team) return null;

  const renderSubstitutionList = () => (
    <ul className={styles.list}>
      {denormalizedSubstitutions.map((sub) => {
        const subPlayers = sub.players;
        subPlayers.sort((p1, p2) => isFieldPlayer(p1) - isFieldPlayer(p2));
        const [p1, p2] = subPlayers;
        return (
          <li className={styles.item} key={sub.id} >
            <div className={styles.minute}>{sub.minute}&apos;</div>
            <div className={styles.players}>
              <span><SubstitutionOnIcon /> {p1.name}</span>
              <span><SubstitutionOffIcon /> {p2.name}</span>
            </div>
            <div>
              <RemoveButton
                tooltip="Remove substitution"
                onTouchTap={() => onSubstitutionRemove(team.id, sub.id)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );

  const renderPlayerList = () => (
    <ul className={styles.list}>
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
      <li className={`${styles.item} ${styles.addPlayer}`}>
        <FloatingActionButton mini>
          <PersonAddIcon onTouchTap={() => onBenchPlayerAdd(team.id)} />
        </FloatingActionButton>
      </li>
    </ul>
  );

  return (
    <Paper
      zDepth={3}
      className={styles.wrapper}
      id={`team-${team.id}-bench`}
      onContextMenu={event => event.preventDefault()}
    >
      <div className={styles.teamName}>
        {team.name}&nbsp;
      </div>
      <div className={styles.players}>
        {renderPlayerList()}
      </div>
      <div className={styles.substitutions}>
        {renderSubstitutionList()}
      </div>
    </Paper>
  );
};

Bench.propTypes = {
  players: pt.playersByPos.isRequired,
  team: pt.team.isRequired,
  denormalizedSubstitutions: pt.denormalizedSubstitutions.isRequired,
  onSubstitutionRemove: PropTypes.func.isRequired,
  onBenchPlayerAdd: PropTypes.func.isRequired,
};

export default Bench;
