import React, { Component } from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import classNames from 'classnames/bind';

import TileContainer from '../../containers/TileContainer';
import styles from './TeamGrid.scss';

const cx = classNames.bind(styles);

const TeamGrid = (props) => {
  const { id, options, type, tilesCount } = props;

  const wrapperStyle = cx({
    wrapper: true,
    grid: options.showGrid,
  });

  // const TileListItem = () => <TileContainer key={position} position={position} team={team} />

  const tiles = times(tilesCount).map((index) => {
    const position = type === 'home' ? index : (tilesCount - index - 1);
    return <TileContainer key={position} position={position} />;
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

// todo
//
//
// {
//   constructor() {
//     super();
//
//     this.handleOnPlayerTouchTap = this.handleOnPlayerTouchTap.bind(this);
//   }
//
//   handleOnPlayerTouchTap(event, id) {
//     event.preventDefault();
//     if (this.props.selectedPlayerId !== id) {
//       this.props.onPlayerSelect(id);
//     }
//   }
//
//   renderTile(position, player, team) {
//     return (
//       <TileContainer
//         key={position}
//         position={position}
//         team={team}
//       />
//     );
//   }
//
//
//
//   render() {
//
//
//     return (
//       <div
//         id={this.props.id}
//         className={wrapperStyle}
//         data-grid-type={this.props.type}
//         onContextMenu={event => event.preventDefault()}
//       >
//         {this.renderTiles()}
//       </div>
//     );
//   }
// }
//
// TeamGrid.propTypes = {
//   id: PropTypes.number.isRequired,
//   team: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     players: PropTypes.object.isRequired,
//     shirt: PropTypes.object.isRequired,
//   }).isRequired,
//   type: PropTypes.oneOf(['home', 'away']).isRequired,
//   options: PropTypes.shape({
//     showGrid: PropTypes.bool.isRequired,
//     showName: PropTypes.bool.isRequired,
//     showNumbers: PropTypes.bool.isRequired,
//     showRatings: PropTypes.bool.isRequired,
//     showCards: PropTypes.bool.isRequired,
//     showGoals: PropTypes.bool.isRequired,
//     showAssists: PropTypes.bool.isRequired,
//   }).isRequired,
//   selectedPlayerId: PropTypes.number.isRequired,
//   onPlayerMove: PropTypes.func.isRequired,
//   onPlayersSwap: PropTypes.func.isRequired,
//   onPlayerSelect: PropTypes.func.isRequired,
// };

export default TeamGrid;
