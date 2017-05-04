import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import { fetchTactics, selectTactic } from '../../actions/tactics';
import { tacticsSelector } from '../../selectors/tactics';
import Loading from '../../components/Loading';

const SelectableList = makeSelectable(List);

class TacticList extends Component {
  constructor() {
    super();

    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id) || this.props.selectedTacticId;
    this.props.selectTactic(id);
    this.props.fetchTactics();
  }

  handleRequestChange(event, id) {
    this.props.history.push(`/tactic/${id}`);
    this.props.selectTactic(id);
  }

  renderTactics() {
    return this.props.tactics.map(tactic =>
      <ListItem value={tactic.id} primaryText={tactic.name} key={tactic.id} />,
    );
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div>
        <RaisedButton fullWidth label="New Tactic" />
        <SelectableList
          value={this.props.selectedTacticId}
          onChange={this.handleRequestChange}
        >
          {isFetching && <Loading />}
          {this.renderTactics()}
        </SelectableList>
      </div>
    );
  }
}

TacticList.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  selectTactic: PropTypes.func.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { entities: { tactics }, ui } = state;
  return {
    tactics: tacticsSelector(state),
    isFetching: tactics.status.isFetching,
    selectedTacticId: ui.selectedTacticId,
  };
};

const ConnectedTacticList = connect(mapStateToProps, { fetchTactics, selectTactic })(TacticList);
export default withRouter(ConnectedTacticList);
