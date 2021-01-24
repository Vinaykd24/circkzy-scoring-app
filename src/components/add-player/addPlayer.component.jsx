import React, { useState, useContext } from 'react';
import uuid from 'react-uuid';
import { firestore } from '../../firebase/config';
import { Button, Input, Form } from 'semantic-ui-react';
import PlayerListPage from '../../pages/player-list/player-list';

import { MatchContext } from '../../providers/match/match.provider';
import AddPlayerFormPage from './add-player-form.component';

const AddPlayerPage = () => {
  const { addPlayer, removePlayer, playerList } = useContext(MatchContext);
  const [awayPlayer, setAwayPlayer] = useState('');
  const [homePlayer, setHomePlayer] = useState('');
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
    isHomeTeam ? setHomePlayer('') : setAwayPlayer('');
    // setHomeTeamList(homeTeamList.concat(homePlayerCopy));
    // setHomePlayer('');
    if (playerList[teamCategory].length === 10) {
      updateDb(teamCategory);
    }
  };

  const addPlayerName = (playerName, isHomeTeam) => {
    isHomeTeam ? setHomePlayer(playerName) : setAwayPlayer(playerName);
  };

  const handleDelete = (playerId, isHomeTeam) => {
    removePlayer(playerId, isHomeTeam);
  };

  const updateDb = async (teamCategory) => {
    setIsPlayerListFinalized(true);
    await firestore
      .collection('matches')
      .doc()
      .set({
        playerList: {
          homeTeam: playerList[teamCategory],
        },
      });
  };

  return (
    <div className="flex justify-center pa2">
      <div className="outline w-100 pa3 mr2">
        <AddPlayerFormPage
          handleHomeTeamSubmit={handleHomeTeamSubmit}
          playerList={playerList}
          addPlayerName={addPlayerName}
          homePlayer={homePlayer}
          teamCategory="homeTeam"
          isHomeTeam={true}
        />
        <PlayerListPage
          playerList={playerList.homeTeam}
          handleDelete={handleDelete}
          isHomeTeam={true}
        />
      </div>
      <div className="outline w-100 pa3 mr2">
        <AddPlayerFormPage
          handleHomeTeamSubmit={handleHomeTeamSubmit}
          playerList={playerList}
          addPlayerName={addPlayerName}
          homePlayer={awayPlayer}
          teamCategory="awayTeam"
          isHomeTeam={false}
        />
        <PlayerListPage
          playerList={playerList.awayTeam}
          handleDelete={handleDelete}
          isHomeTeam={false}
        />
      </div>
    </div>
  );
};

export default AddPlayerPage;
