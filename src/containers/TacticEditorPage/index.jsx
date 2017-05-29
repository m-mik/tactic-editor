import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTacticIfNeeded } from '../../entities/tacticDetails/actions';
import { selectPlayer } from './actions';
import TacticEditor from '../../components/TacticEditor';
import FootballField from '../../components/FootballField';
import PlayerPopover from '../../components/PlayerPopover';
import TeamGrid from '../TeamGrid';
import {
  tacticDetailSelector,
  isFetchingSelector,
  hasErrorSelector,
} from '../../entities/tacticDetails/selectors';
import { findPlayerElement } from '../../services/footballField/index';

class TacticEditorPage extends Component {
  componentDidMount() {
    const id = +this.props.match.params.id;
    this.props.fetchTacticIfNeeded(id);
  }

  componentWillUpdate(nextProps) {
    const nextId = +nextProps.match.params.id;
    const currentId = +this.props.match.params.id;
    if (nextId !== currentId) {
      this.props.fetchTacticIfNeeded(nextId);
    }
  }

  renderErrorMessage() {
    const { hasError } = this.props;
    const message = 'Tactic does not exist';
    return hasError && <span className="error">{message}</span>;
  }

  render() {
    // TODO: Add LoadingIndicator
    const { isFetching, tactic, selectedPlayer } = this.props;
    if (isFetching) return <div>Fetching...</div>;
    if (!tactic) return <div>Waiting...</div>;

    const anchorEl = selectedPlayer ? findPlayerElement(tactic.teams, selectedPlayer) : null;

    return (
      <section>
        {this.renderErrorMessage()}
        <TacticEditor loading={isFetching} tactic={tactic}>
          <FootballField>
            {tactic.teams.map((team, index) =>
              <TeamGrid
                key={team.id}
                type={index === 0 ? 'home' : 'away'}
                team={team}
              />)}
          </FootballField>
          {selectedPlayer && <PlayerPopover
            player={selectedPlayer}
            anchorEl={anchorEl}
            onRequestClose={() => this.props.selectPlayer(0)}
          />}
        </TacticEditor>
      </section>
    );
  }
}

TacticEditorPage.defaultProps = {
  tactic: null,
  selectedPlayer: null,
};

TacticEditorPage.propTypes = {
  fetchTacticIfNeeded: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  tactic: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  selectedPlayer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
  }),
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const selectedTacticId = state.app.selectedTacticId;
  const selectedPlayerId = state.editor.selectedPlayerId;

  return {
    selectedTacticId,
    isFetching: isFetchingSelector(state),
    hasError: hasErrorSelector(state),
    tactic: tacticDetailSelector(state),
    selectedPlayer: state.entities.players.byId[selectedPlayerId],
  };
};

const ConnectedTacticEditorPage = connect(
  mapStateToProps,
  { fetchTacticIfNeeded, selectPlayer },
)(TacticEditorPage);

export default withRouter(ConnectedTacticEditorPage);
