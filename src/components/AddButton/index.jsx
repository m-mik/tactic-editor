import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { green500 } from 'material-ui/styles/colors';

const AddButton = props => (
  <IconButton {...props}>
    <AddIcon color={green500} />
  </IconButton>
);

export default AddButton;
