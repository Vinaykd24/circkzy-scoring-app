import React, { useState, useContext } from "react";
import { Button, Form, Label, Select } from "semantic-ui-react";

import { MatchContext } from "../../providers/match/match.provider";

const InitialPlayerDetails = () => {
  const [currentStats, setCurrentStats] = useState({
    striker: "",
    nonStriker: "",
    currentBowler: "",
  });
  const { playerList, addCurrentStatsDetails } = useContext(MatchContext);
  const { homeTeamClone, awayTeamClone } = playerList;
  const _updateCurrentStats = () => {
    addCurrentStatsDetails(currentStats);
  };
  return (
    <>
      <div className="pa3">
        <label className="f6 b db mb2 pr2">Select Striker</label>
        <select
          className="ui selection dropdown mr3"
          placeholder="Select your country"
          value={currentStats.striker}
          onChange={(e) =>
            setCurrentStats({ ...currentStats, striker: e.target.value })
          }
        >
          {homeTeamClone !== null || homeTeamClone !== undefined
            ? Object.keys(homeTeamClone).map((keyName) => (
                <option
                  key={keyName}
                  value={homeTeamClone[keyName]["playerName"]}
                >
                  {homeTeamClone[keyName]["playerName"]}
                </option>
              ))
            : ""}
        </select>
        <label className="f6 b db mb2 pr2">Select Non-Striker</label>
        <select
          className="ui selection dropdown mr3"
          placeholder="Select your country"
          value={currentStats.nonStriker}
          onChange={(e) =>
            setCurrentStats({ ...currentStats, nonStriker: e.target.value })
          }
        >
          {homeTeamClone !== null || homeTeamClone !== undefined
            ? Object.keys(homeTeamClone).map((keyName) => (
                <option
                  key={keyName}
                  value={homeTeamClone[keyName]["playerName"]}
                >
                  {homeTeamClone[keyName]["playerName"]}
                </option>
              ))
            : ""}
        </select>
        <label className="f6 b db mb2 pr2">Select Opening Bowler</label>
        <select
          className="ui selection dropdown mr3"
          placeholder="Select your country"
          value={currentStats.currentBowler}
          onChange={(e) =>
            setCurrentStats({ ...currentStats, currentBowler: e.target.value })
          }
        >
          {awayTeamClone !== null || awayTeamClone !== undefined
            ? Object.keys(awayTeamClone).map((keyName) => (
                <option
                  key={keyName}
                  value={awayTeamClone[keyName]["playerName"]}
                >
                  {awayTeamClone[keyName]["playerName"]}
                </option>
              ))
            : ""}
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
