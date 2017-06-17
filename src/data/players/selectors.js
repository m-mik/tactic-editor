import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

const selectPlayer = (state, props) => state.data.players.byPos[props.position];

