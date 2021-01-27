import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { MatchContext } from '../../providers/match/match.provider';

const InitialPlayerDetails = () => {
  let history = useHistory();
  const { playerList, addCurrentStatsDetails, matchDetails } = useContext(
    MatchContext
  );
  const { homeTeamClone, awayTeamClone } = playerList;
  const [currentStats, setCurrentStats] = useState({
    striker: '',
    nonStriker: '',
    currentBowler: '',
  });
  // const [battingTeam, setBattingTeam] = useState(
  //   matchDetails.isHomTeamBattingFirst ? homeTeamClone : awayTeamClone
  // );
  // const [bowlingTeam, setBowlingTeam] = useState(
  //   matchDetails.isHomTeamBattingFirst ? awayTeamClone : homeTeamClone
  // );

  // console.log(
  //   'batting first->>>',
  //   battingTeam,
  //   'bowling team->>>',
  //   bowlingTeam
  // );

  // if (matchDetails.isHomTeamBattingFirst) {
  //   setBattingTeam(homeTeamClone);
  //   setBowlingTeam(awayTeamClone);
  // } else {
  //   setBattingTeam(awayTeamClone);
  //   setBowlingTeam(homeTeamClone);
  // }
  const _updateCurrentStats = () => {
    addCurrentStatsDetails(currentStats);
    setCurrentStats({
      striker: '',
      nonStriker: '',
      currentBowler: '',
    });
    history.push('/score');
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
          {homeTeamClone !== null || homeTeamClone !== undefined
            ? Object.keys(homeTeamClone).map((keyName) => (
                <option key={keyName} value={homeTeamClone[keyName]['id']}>
                  {homeTeamClone[keyName]['playerName']}
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
          {homeTeamClone !== null || homeTeamClone !== undefined
            ? Object.keys(homeTeamClone).map((keyName) => (
                <option key={keyName} value={homeTeamClone[keyName]['id']}>
                  {homeTeamClone[keyName]['playerName']}
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
          {awayTeamClone !== null || awayTeamClone !== undefined
            ? Object.keys(awayTeamClone).map((keyName) => (
                <option key={keyName} value={awayTeamClone[keyName]['id']}>
                  {awayTeamClone[keyName]['playerName']}
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
