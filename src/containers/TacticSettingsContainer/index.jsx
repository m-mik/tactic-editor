import { connect } from 'react-redux';

import TacticSettings from '../../components/TacticSettings';
import { cloneTactic, saveTactic, updateTactic } from '../../data/tactics/actions';
import { makeSelectFullTacticDetail } from '../../data/tacticDetails/selectors';
import { selectIsSavingTactic, selectUnsavedTacticIds } from '../../pages/TacticPage/selectors';

const makeMapStateToProps = () => {
  const selectFullTacticDetail = makeSelectFullTacticDetail();
  return state => ({
    tactic: selectFullTacticDetail(state),
    isSavingTactic: selectIsSavingTactic(state),
    unsavedTacticIds: selectUnsavedTacticIds(state),
  });
};

const mapDispatchToProps = {
  onSettingChange: updateTactic,
  onTacticSave: saveTactic,
  onTacticClone: cloneTactic,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(TacticSettings);
