import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List';

import LoadingIndicator from '../LoadingIndicator';
import CreateTacticContainer from '../../containers/CreateTacticContainer';

const SelectableList = makeSelectable(List);

const TacticList = props => (
  <div>
    <CreateTacticContainer />
    <SelectableList
      value={props.activeTacticId}
      onChange={props.onSelectTactic}
    >
      {props.fetching && <LoadingIndicator />}
      {props.tactics.map(tactic =>
        <ListItem
          key={tactic.id}
          value={tactic.id}
          primaryText={tactic.name}
        />)}
    </SelectableList>
  </div>
);

TacticList.propTypes = {
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  activeTacticId: PropTypes.number.isRequired,
  onSelectTactic: PropTypes.func.isRequired,
};

export default TacticList;
