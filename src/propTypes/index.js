import PropTypes from 'prop-types';

const tactic = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const player = {
  name: PropTypes.string,
  number: PropTypes.number,
  rating: PropTypes.number,
  position: PropTypes.number,
  cards: PropTypes.shape({
    yellow: PropTypes.number,
    red: PropTypes.number,
  }),
  goals: PropTypes.number,
  assists: PropTypes.number,
};

const team = {
  id: PropTypes.number,
  name: PropTypes.string,
  players: PropTypes.arrayOf(PropTypes.number),
  shirt: PropTypes.shape({
    border: PropTypes.shape({
      color: PropTypes.string,
      style: PropTypes.string,
    }),
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }),
};

const tacticOptions = {
  showGrid: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  showRatings: PropTypes.bool.isRequired,
  showCards: PropTypes.bool.isRequired,
  showGoals: PropTypes.bool.isRequired,
  showAssists: PropTypes.bool.isRequired,
};

const propTypes = {
  playerId: PropTypes.number,
  playerName: PropTypes.string,
  playerNumber: PropTypes.number,
  playerRating: PropTypes.number,
  playerPosition: PropTypes.number,
  playerCards: PropTypes.shape({
    yellow: PropTypes.number.isRequired,
    red: PropTypes.number.isRequired,
  }),
  playerGoals: PropTypes.number,
  playerAssists: PropTypes.number,
  team: PropTypes.shape(team),
  teamInfo: PropTypes.shape({
    ...team,
    players: PropTypes.shape(player),
  }),
  transition: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  playerOptions: PropTypes.shape({
    showName: PropTypes.bool.isRequired,
    showNumber: PropTypes.bool.isRequired,
    showRating: PropTypes.bool.isRequired,
    showCards: PropTypes.bool.isRequired,
    showGoals: PropTypes.bool.isRequired,
    showAssists: PropTypes.bool.isRequired,
  }),
  className: PropTypes.string,
  player: PropTypes.shape(player),
  players: PropTypes.arrayOf(PropTypes.shape(player)),
  tactic: PropTypes.shape(tactic),
  tacticDetail: PropTypes.shape({
    id: PropTypes.number,
    options: PropTypes.shape(tacticOptions),
    teams: PropTypes.arrayOf(PropTypes.number),
  }),
  tacticWithOptions: PropTypes.shape({
    ...tactic,
    options: PropTypes.shape(tacticOptions),
    teams: PropTypes.arrayOf(PropTypes.number),
  }),
  tacticOptions: PropTypes.shape(tacticOptions),
  tactics: PropTypes.arrayOf(PropTypes.shape(tactic)),
};

export default propTypes;
