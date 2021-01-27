import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { firestore } from "../../firebase/config";
import { Button, Input, Form } from "semantic-ui-react";
import PlayerListPage from "../../pages/player-list/player-list";

import { MatchContext } from "../../providers/match/match.provider";
import AddPlayerFormPage from "./add-player-form.component";

const AddPlayerPage = () => {
  let history = useHistory();
  const {
    addPlayer,
    removePlayer,
    playerList,
    matchDetails,
    updateBattingTeam,
  } = useContext(MatchContext);
  const [awayPlayer, setAwayPlayer] = useState("");
  const [homePlayer, setHomePlayer] = useState("");
  // const [homeTeamList, setHomeTeamList] = useState([]);
  // const [awayTeamList, setAwayTeamList] = useState([]);
  const [isPlayerListFinalized, setIsPlayerListFinalized] = useState(false);

  const handleHomeTeamSubmit = (evt, isHomeTeam, teamCategory) => {
    evt.preventDefault();
    const homePlayerObj = {
      id: uuid(),
      playerName: isHomeTeam ? homePlayer : awayPlayer,
    };
    addPlayer(homePlayerObj, isHomeTeam);
    isHomeTeam ? setHomePlayer("") : setAwayPlayer("");
    // setHomeTeamList(homeTeamList.concat(homePlayerCopy));
    // setHomePlayer('');
    // if (playerList[teamCategory].length === 10) {
    //   updateDb(teamCategory);
    // }
  };

  const addPlayerName = (playerName, isHomeTeam) => {
    isHomeTeam ? setHomePlayer(playerName) : setAwayPlayer(playerName);
  };

  const handleDelete = (playerId, isHomeTeam) => {
    removePlayer(playerId, isHomeTeam);
  };

  const updateDb = async (teamCategory) => {
    await firestore
      .collection("matches")
      .doc()
      .set({
        playerList: {
          homeTeam: playerList[teamCategory],
        },
      });
  };

  const confirmPlayerList = () => {
    updateBattingTeam();
    history.push("/currentStats");
  };
  return (
    <>
      <div className="flex justify-center pa2">
        <div className="outline w-100 pa3 mr2">
          <AddPlayerFormPage
            handleHomeTeamSubmit={handleHomeTeamSubmit}
            playerList={playerList}
            addPlayerName={addPlayerName}
            homePlayer={homePlayer}
            teamName={matchDetails.homeTeamName}
            teamCategory="homeTeam"
            isHomeTeam={true}
          />

          {playerList.homeTeamClone !== null ||
          playerList.homeTeamClone !== undefined ? (
            <PlayerListPage
              playerList={playerList.homeTeam}
              playerListClone={playerList.homeTeamClone}
              handleDelete={handleDelete}
              isHomeTeam={true}
            />
          ) : (
            ""
          )}
        </div>
        <div className="outline w-100 pa3 mr2">
          <AddPlayerFormPage
            handleHomeTeamSubmit={handleHomeTeamSubmit}
            playerList={playerList}
            addPlayerName={addPlayerName}
            homePlayer={awayPlayer}
            teamName={matchDetails.awayTeamName}
            teamCategory="awayTeam"
            isHomeTeam={false}
          />
          {playerList.homeTeamClone !== null ||
          playerList.homeTeamClone !== undefined ? (
            <PlayerListPage
              playerList={playerList.awayTeam}
              playerListClone={playerList.awayTeamClone}
              handleDelete={handleDelete}
              isHomeTeam={true}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={confirmPlayerList}
          disabled={isPlayerListFinalized}
        >
          Confirm Teams
        </Button>
      </div>
      <div>
        {/* {playerList.homeTeamClone !== null ||
        playerList.homeTeamClone !== undefined ? (
          Object.keys(playerList.homeTeamClone).map((keyName, i) => (
            <li className="travelcompany-input" key={i}>
              <span className="input-label">
                key: {i} Name: {playerList.homeTeamClone[keyName]['playerName']}
              </span>
            </li>
          ))
        ) : (
          <p>List is not ready</p>
        )} */}
      </div>
    </>
  );
};

export default AddPlayerPage;
