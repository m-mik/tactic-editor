import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as tacticActions from '../../actions/tactics';
import Loading from '../../components/Loading';

class TacticDetailContainer extends Component {
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

  render() {
    const { errorOccurred, isFetching, selectedTacticId } = this.props;
    return (
      <section className="tactic-panel">
        {isFetching && <Loading />}
        {errorOccurred && <span className="error">Selected tactic does not exist</span>}
        <div>selectedTacticId: {selectedTacticId}</div>
      </section>
    );
  }
}

const mapStateToProps = ({ ui, entities }) => {
  const { tacticDetails } = entities;
  const { status } = tacticDetails;
  const { fetching, errors } = status;
  const selectedTacticId = ui.selectedTacticId;

  return {
    selectedTacticId,
    isFetching: fetching.indexOf(selectedTacticId) !== -1,
    errorOccurred: errors.indexOf(selectedTacticId) !== -1,
  };
};

TacticDetailContainer.propTypes = {
  selectedTacticId: PropTypes.number.isRequired,
  fetchTacticIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorOccurred: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const ConnectedTacticDetailContainer = connect(
  mapStateToProps,
  tacticActions,
)(TacticDetailContainer);

export default withRouter(ConnectedTacticDetailContainer);
