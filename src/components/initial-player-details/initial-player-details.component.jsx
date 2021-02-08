import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { SET_INITIAL_STATS } from '../../providers/match/match.actions';

import { MatchContext } from '../../providers/match/match.provider';

const InitialPlayerDetails = () => {
  let history = useHistory();
  const location = useLocation();
  const { addCurrentStatsDetails, rootState, rootDispatch } = useContext(
    MatchContext
  );
  const battingTeam = location.state.isFirstInn
    ? rootState.inn1.battingTeam
    : rootState.inn2.battingTeam;
  const bowlingTeam = location.state.isFirstInn
    ? rootState.inn1.bowlingTeam
    : rootState.inn2.bowlingTeam;
  // const { battingTeam, bowlingTeam } = rootState.inn1;
  const [currentStats, setCurrentStats] = useState({
    striker: '',
    nonStriker: '',
    currentBowler: '',
    currentOver: [],
  });

  const _updateCurrentStats = () => {
    rootDispatch({ type: SET_INITIAL_STATS, currentStats: currentStats });
    addCurrentStatsDetails(currentStats);
    setCurrentStats({
      striker: '',
      nonStriker: '',
      currentBowler: '',
    });
    history.push({
      pathname: '/scoreboard',
      state: { isFirstInn: location.state.isFirstInn },
    });
  };
  return (
    <>
      <div className="pa3">
        <label className="f6 b db mb2 pr2">Select Striker</label>
        <select
          className="ui selection dropdown mr3"
          value={currentStats.striker}
          onChange={(e) =>
            setCurrentStats({ ...currentStats, striker: e.target.value })
          }
        >
          <option key="striker" value="select striker">
            Select Striker
          </option>
          {battingTeam !== null || battingTeam !== undefined
            ? Object.keys(battingTeam).map((keyName) => (
                <option key={keyName} value={battingTeam[keyName]['id']}>
                  {battingTeam[keyName]['playerName']}
                </option>
              ))
            : ''}
        </select>
        <label className="f6 b db mb2 pr2">Select Non-Striker</label>
        <select
          className="ui selection dropdown mr3"
          value={currentStats.nonStriker}
          onChange={(e) =>
            setCurrentStats({ ...currentStats, nonStriker: e.target.value })
          }
        >
          <option key="nonStriker" value="select non striker">
            Select Non Striker
          </option>
          {battingTeam !== null || battingTeam !== undefined
            ? Object.keys(battingTeam).map((keyName) => (
                <option key={keyName} value={battingTeam[keyName]['id']}>
                  {battingTeam[keyName]['playerName']}
                </option>
              ))
            : ''}
        </select>
        <label className="f6 b db mb2 pr2">Select Opening Bowler</label>
        <select
          className="ui selection dropdown mr3"
          value={currentStats.currentBowler}
          onChange={(e) =>
            setCurrentStats({ ...currentStats, currentBowler: e.target.value })
          }
        >
          <option key="currentBowler" value="select bowler">
            Select Bowler
          </option>
          {bowlingTeam !== null || bowlingTeam !== undefined
            ? Object.keys(bowlingTeam).map((keyName) => (
                <option key={keyName} value={bowlingTeam[keyName]['id']}>
                  {bowlingTeam[keyName]['playerName']}
                </option>
              ))
            : ''}
        </select>
      </div>
      <div className="flex justify-center">
        <Button type="button" onClick={_updateCurrentStats}>
          Confirm Teams
        </Button>
      </div>
    </>
  );
};

export default InitialPlayerDetails;
