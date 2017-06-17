import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectActiveTacticId } from '../App/selectors';
import { selectTacticsArray, selectIsFetching } from '../../data/tactics/selectors';
import { selectTactic } from '../App/actions';
import { fetchTactics } from '../../data/tactics/actions';
import TacticList from '../../components/TacticList';

class TacticListContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchTactics();
    this.props.selectTactic(+this.props.match.params.id);
  }

  render() {
    const { tactics, fetching, activeTacticId } = this.props;
    return (
      <TacticList
        tactics={tactics}
        activeTacticId={activeTacticId}
        fetching={fetching}
        onSelectTactic={(event, id) => this.props.selectTactic(id)}
      />
    );
  }
}

TacticListContainer.propTypes = {
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectTactic: PropTypes.func.isRequired,
  fetchTactics: PropTypes.func.isRequired,
  activeTacticId: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  tactics: selectTacticsArray(state),
  activeTacticId: selectActiveTacticId(state),
  fetching: selectIsFetching(state),
});

const mapDispatchToProps = {
  selectTactic,
  fetchTactics,
};

export default connect(mapStateToProps, mapDispatchToProps)(TacticListContainer);
