import React, { useState, useContext } from "react";
import { Button, Form, Label, Select } from "semantic-ui-react";

import { MatchContext } from "../../providers/match/match.provider";

const InitialPlayerDetails = () => {
  const [currentStats, setCurrentStats] = useState({
    striker: "",
    nonStriker: "",
    currentBowler: "",
  });
  const { playerList } = useContext(MatchContext);
  const { homeTeam, awayTeam } = playerList;
  //   const updateCurrentStats = (playerId) = {
  //       setCurrentStats({...currentStats, striker: playerId})
  //   }
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
          {homeTeam.map((option) => (
            <option key={option.id} value={option.playerName}>
              {option.playerName}
            </option>
          ))}
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
          {homeTeam.map((option) => (
            <option key={option.id} value={option.playerName}>
              {option.playerName}
            </option>
          ))}
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
          {awayTeam.map((option) => (
            <option key={option.id} value={option.playerName}>
              {option.playerName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default InitialPlayerDetails;
