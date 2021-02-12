import { connect } from 'react-redux';

import TacticSettings from '../../components/TacticSettings';
import { tacticDetailSelector } from '../../data/tacticDetails/selectors';
import { updateTactic } from '../../data/tactics/actions';

const mapStateToProps = state => ({
  tactic: tacticDetailSelector(state),
});

const mapDispatchToProps = {
  onSettingChange: updateTactic,
};

export default connect(mapStateToProps, mapDispatchToProps)(TacticSettings);
