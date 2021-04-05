import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import SwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle';
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
import { Menu, MenuItem, Paper } from 'material-ui';

import styles from './ReplacePlayerPopover.scss';
import pt from '../../propTypes';

export default function ReplacePlayerPopover(props) {
  const { players, onPlayerSubstitute, onPlayerSwap, ...rest } = props;
  const { p1, p2 } = players;

  return (
    <Popover
      className={styles.wrapper}
      open={!!players}
      anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
      onRequestClose={props.onRequestClose}
      useLayerForClickAway={false}
      {...rest}
    >
      <Paper>
        <Menu>
          <MenuItem
            primaryText="Substitute player" leftIcon={<SwapVerticalCircle />}
            onTouchTap={() => onPlayerSubstitute(p1, p2)}
          />
          <MenuItem
            primaryText="Swap positions" leftIcon={<SwapHoriz />}
            onTouchTap={() => onPlayerSwap(p1, p2)}
          />
        </Menu>
      </Paper>
    </Popover>
  );
}

ReplacePlayerPopover.defaultProps = {
  anchorEl: null,
  players: null,
};

ReplacePlayerPopover.propTypes = {
  players: pt.playersToReplace,
  onRequestClose: PropTypes.func.isRequired,
  onPlayerSwap: PropTypes.func.isRequired,
  onPlayerSubstitute: PropTypes.func.isRequired,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
