import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PropTypes from 'prop-types';
import * as tacticActions from '../../actions/tactics';
import { tacticsSelector } from '../../selectors/tactics';
import Loading from '../../components/Loading';
import CreateTacticButton from '../../components/tactics/CreateTacticButton';
import CreateTacticDialog from '../../components/tactics/CreateTacticDialog';

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
    const {
      isFetching,
      createTacticPending,
      selectedTacticId,
      createTacticDialogOpen,
      openCreateTacticDialog,
      closeCreateTacticDialog,
      createAndSelectTactic,
    } = this.props;

    return (
      <div>
        <CreateTacticButton openCreateTacticDialog={openCreateTacticDialog} />
        <SelectableList
          value={selectedTacticId}
          onChange={this.handleRequestChange}
        >
          {isFetching && <Loading />}
          {this.renderTactics()}
        </SelectableList>
        <CreateTacticDialog
          onClose={closeCreateTacticDialog}
          onSubmit={createAndSelectTactic}
          open={createTacticDialogOpen}
          createTacticPending={createTacticPending}
        />
      </div>
    );
  }
}

TacticList.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  selectTactic: PropTypes.func.isRequired,
  createAndSelectTactic: PropTypes.func.isRequired,
  openCreateTacticDialog: PropTypes.func.isRequired,
  closeCreateTacticDialog: PropTypes.func.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  createTacticPending: PropTypes.bool.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
  createTacticDialogOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const { entities: { tactics }, ui } = state;
  const { selectedTacticId, createTacticDialogOpen, createTacticPending } = ui;
  return {
    tactics: tacticsSelector(state),
    isFetching: tactics.status.isFetching,
    createTacticPending,
    selectedTacticId,
    createTacticDialogOpen,
  };
};

const ConnectedTacticList = connect(mapStateToProps, tacticActions)(TacticList);
export default withRouter(ConnectedTacticList);
