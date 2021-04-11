import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import classNames from 'classnames/bind';

import pt from '../../propTypes';
import TileContainer from '../../containers/TileContainer';
import styles from './TeamGrid.scss';

const cx = classNames.bind(styles);

const TeamGrid = (props) => {
  const {
    id,
    options,
    type,
    tilesCount,
    players,
    team,
  } = props;

  const wrapperStyle = cx({
    wrapper: true,
    grid: options.showGrid,
  });

  const tiles = times(tilesCount).map((index) => {
    const position = type === 'home' ? index : (tilesCount - index - 1);
    const player = players[position];

    return (
      <TileContainer
        key={position}
        team={team}
        position={position}
        player={player}
      />
    );
  });
  return (
    <div
      id={id}
      className={wrapperStyle}
      data-grid-type={type}
      onContextMenu={event => event.preventDefault()}
    >
      {tiles}
    </div>
  );
};

TeamGrid.defaultProps = {
  team: undefined,
};

TeamGrid.propTypes = {
  tilesCount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  options: PropTypes.shape({
    showGrid: PropTypes.bool.isRequired,
  }).isRequired,
  players: pt.playersByPos.isRequired,
  team: pt.team,
};

export default TeamGrid;
