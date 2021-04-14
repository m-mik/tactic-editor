import React from 'react';
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import { FlatButton } from 'material-ui';

export default props => (
  <FlatButton
    icon={<RemoveCircleOutlineIcon style={{ color: 'red' }} />}
    label="Remove"
    style={{ color: 'red' }}
    secondary
    {...props}
  />
);
