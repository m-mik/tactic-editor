import React from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';

const SelectableList = makeSelectable(List);

const TacticList = (props) => {
  const {
    fetching,
    selectedTacticId,
    onSelectTactic,
  } = props;

  const renderTactics = () => props.tactics.map(tactic =>
    <ListItem
      key={tactic.id}
      value={tactic.id}
      primaryText={tactic.name}
    />,
  );

  return (
    <SelectableList
      className="tactic-list"
      value={selectedTacticId}
      onChange={onSelectTactic}
    >
      {fetching && <LoadingIndicator />}
      {renderTactics()}
    </SelectableList>
  );
};

TacticList.defaultProps = {
  fetching: false,
  tactics: [],
  selectedTacticId: 0,
  onFetchTacticsRequest: () => {},
  onSelectTactic: () => {},
};

TacticList.propTypes = {
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  fetching: PropTypes.bool,
  selectedTacticId: PropTypes.number,
  onSelectTactic: PropTypes.func,
};

export default TacticList;
