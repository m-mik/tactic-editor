import React from 'react';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import { red500 } from 'material-ui/styles/colors';

const RemoveButton = props => (
  <IconButton {...props}>
    <RemoveIcon color={red500} />
  </IconButton>
);

export default RemoveButton;
