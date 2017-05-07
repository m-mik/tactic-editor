import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PropTypes from 'prop-types';
import * as tacticActions from '../../actions/tactics';
import { tacticsSelector } from '../../selectors/tactics';
import Loading from '../../components/Loading';
import NewTacticButton from '../../components/tactics/NewTacticButton';
import NewTacticDialog from '../../components/tactics/NewTacticDialog';


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
      selectedTacticId,
      newTacticDialogOpen,
      openNewTacticDialog,
      closeNewTacticDialog,
      createTactic,
    } = this.props;

    return (
      <div>
        <NewTacticButton openNewTacticDialog={openNewTacticDialog} />
        <SelectableList
          value={selectedTacticId}
          onChange={this.handleRequestChange}
        >
          {isFetching && <Loading />}
          {this.renderTactics()}
        </SelectableList>
        <NewTacticDialog
          onClose={closeNewTacticDialog}
          open={newTacticDialogOpen}
          onSubmit={createTactic}
        />
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
  newTacticDialogOpen: PropTypes.bool.isRequired,
  openNewTacticDialog: PropTypes.func.isRequired,
  closeNewTacticDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const { entities: { tactics }, ui } = state;
  const { selectedTacticId, newTacticDialogOpen } = ui;
  return {
    tactics: tacticsSelector(state),
    isFetching: tactics.status.isFetching,
    selectedTacticId,
    newTacticDialogOpen,
  };
};

const ConnectedTacticList = connect(mapStateToProps, tacticActions)(TacticList);
export default withRouter(ConnectedTacticList);
