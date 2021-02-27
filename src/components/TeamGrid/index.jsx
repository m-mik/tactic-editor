import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import classNames from 'classnames/bind';

import TileContainer from '../../containers/TileContainer';
import styles from './TeamGrid.scss';

const cx = classNames.bind(styles);

const TeamGrid = (props) => {
  const { id, options, type, teamId, tilesCount } = props;

  const wrapperStyle = cx({
    wrapper: true,
    grid: options.showGrid,
  });

  const tiles = times(tilesCount).map((index) => {
    const position = type === 'home' ? index : (tilesCount - index - 1);
    return (
      <TileContainer
        key={position}
        teamId={teamId}
        position={position}
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

TeamGrid.propTypes = {
  teamId: PropTypes.number.isRequired,
  tilesCount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  options: PropTypes.shape({
    showGrid: PropTypes.bool.isRequired,
    showName: PropTypes.bool.isRequired,
    showNumbers: PropTypes.bool.isRequired,
    showRatings: PropTypes.bool.isRequired,
    showCards: PropTypes.bool.isRequired,
    showGoals: PropTypes.bool.isRequired,
    showAssists: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TeamGrid;
