import React from 'react';
import { Paper } from 'material-ui';

import styles from './MatchSummary.scss';
import { isFieldPlayer, matchScore } from '../../lib/footballField';
import SubstitutionOnIcon from '../SubstitutionOnIcon';
import SubstitutionOffIcon from '../SubstitutionOffIcon';
import GoalIcon from '../GoalIcon';
import OwnGoalIcon from '../OwnGoalIcon';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import pt from '../../propTypes';

const MatchSummary = (props) => {
  if (!props.summary || !props.options.showSummary) return null;
  const { summary, options } = props;
  const { teams, events } = summary;

  const { showNames, showGoals, showAssists, showCards, showSubstitutions, showMinutes } = options;

  const [homeTeam, awayTeam] = teams;
  const [homeTeamGoals, awayTeamGoals] = matchScore(...teams);

  const visibilityData = {
    substitution: showSubstitutions,
    yellowCard: showCards,
    redCard: showCards,
    goal: showGoals,
  };

  const renderMatchScore = () => (
    <div className={styles.matchScoreWrapper}>
      <div className={styles.teamName}>{homeTeam.name}</div>
      {showGoals && <div className={styles.score}>
        <span className={styles.goals}>({homeTeamGoals})</span>
        <span>-</span>
        <span className={styles.goals}>({awayTeamGoals})</span>
      </div>}
      <div className={styles.teamName}>{awayTeam.name}</div>
    </div>
  );

  const renderStat = (stat, Icon) => {
    const { minute, player, assistedBy, type } = stat;
    if (!visibilityData[type]) return null;
    return (
      <div className={styles.stat}>
        {showMinutes && <div className={styles.minute}>{minute}</div>}
        <div className={styles.icon}>{<Icon className={styles.smallIcon} />}</div>
        {showNames && <div className={styles.playerName}>{player.name}</div>}
        {showNames && showAssists && !!assistedBy &&
        <div className={styles.assist}>({assistedBy.name})</div>}
      </div>
    );
  };

  const renderSubstitution = (sub) => {
    const { players, minute } = sub;
    players.sort((p1, p2) => isFieldPlayer(p1) - isFieldPlayer(p2));
    const [p1, p2] = players;
    return (
      <div className={styles.substitution}>
        {showMinutes && <div className={styles.minute}>{minute}</div>}
        <div className={styles.on}>
          <SubstitutionOnIcon className={styles.subIcon} />
          {showNames && <span className={styles.name}>{p1.name}</span>}
        </div>
        <div className={styles.off}>
          <SubstitutionOffIcon className={styles.subIcon} />
          {showNames && <span className={styles.name}>{p2.name}</span>}
        </div>
      </div>
    );
  };

  const renderEvent = (event) => {
    switch (event.type) {
      case 'goal':
        return event.ownGoal ? renderStat(event, OwnGoalIcon) : renderStat(event, GoalIcon);
      case 'yellowCard':
        return renderStat(event, YellowCardIcon);
      case 'redCard':
        return renderStat(event, RedCardIcon);
      case 'substitution':
        return renderSubstitution(event);
      default:
        return null;
    }
  };

  const renderEvents = () => events.map((event) => {
    if (visibilityData[event.type] === false) return null;
    return (
      <div className={styles[event.side]} key={event.type + event.id}>
        {renderEvent(event)}
      </div>
    );
  });

  return (
    <Paper id="match-summary" zDepth={3} className={styles.wrapper}>
      {renderMatchScore()}
      {renderEvents()}
    </Paper>
  );
};

MatchSummary.defaultProps = {
  summary: null,
  options: null,
};

MatchSummary.propTypes = {
  summary: pt.summary,
  options: pt.tacticOptions,
};

export default MatchSummary;
