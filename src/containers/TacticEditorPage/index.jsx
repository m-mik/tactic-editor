import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTacticIfNeeded } from '../../entities/tacticDetails/actions';
import TacticEditor from '../../components/TacticEditor/index';
import FootballField from '../../components/FootballField';
import PlayerPopover from '../../components/PlayerPopover';
import TeamGrid from '../TeamGrid';
import {
  tacticDetailSelector,
  isFetchingSelector,
  hasErrorSelector,
} from '../../entities/tacticDetails/selectors';

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
    const { isFetching, tactic } = this.props;
    if (isFetching) return <div>Fetching...</div>;
    if (!tactic) return <div>Waiting...</div>;

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
          <PlayerPopover />
        </TacticEditor>
      </section>
    );
  }
}

TacticEditorPage.defaultProps = {
  tactic: null,
};

TacticEditorPage.propTypes = {
  fetchTacticIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  tactic: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const selectedTacticId = state.app.selectedTacticId;

  return {
    selectedTacticId,
    isFetching: isFetchingSelector(state),
    hasError: hasErrorSelector(state),
    tactic: tacticDetailSelector(state),
  };
};

const ConnectedTacticEditorPage = connect(
  mapStateToProps,
  { fetchTacticIfNeeded },
)(TacticEditorPage);

export default withRouter(ConnectedTacticEditorPage);
