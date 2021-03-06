import React from 'react';
import PropTypes from 'prop-types';

import Toggle from 'material-ui/Toggle';
import pt from '../../../propTypes';

const Options = (props) => {
  const { onSettingChange, tactic: { id, options }, ...rest } = props;
  const toggleOptions = [
    { key: 'showGrid', label: 'Grid', toggled: options.showGrid },
    { key: 'showRatings', label: 'Ratings', toggled: options.showRatings },
    { key: 'showNumbers', label: 'Numbers', toggled: options.showNumbers },
    { key: 'showCards', label: 'Cards', toggled: options.showCards },
    { key: 'showGoals', label: 'Goals', toggled: options.showGoals },
    { key: 'showAssists', label: 'Assists', toggled: options.showAssists },
    { key: 'showNames', label: 'Names', toggled: options.showNames },
    { key: 'showSubstitutions', label: 'Subs', toggled: options.showSubstitutions },
    { key: 'showMinutes', label: 'Minutes', toggled: options.showMinutes },
    { key: 'showSummary', label: 'Summary', toggled: options.showSummary },
  ];

  return (
    <div {...rest}>
      {toggleOptions.map(option =>
        <Toggle
          key={option.key}
          defaultToggled={option.toggled}
          label={option.label}
          onToggle={() => onSettingChange(id, { options: { [option.key]: !option.toggled } })}
        />,
      )}
    </div>
  );
};

Options.propTypes = {
  tactic: pt.denormalizedTactic.isRequired,
  onSettingChange: PropTypes.func.isRequired,
};

export default Options;
