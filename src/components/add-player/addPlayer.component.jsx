import React, { useState, useContext } from 'react';
import uuid from 'react-uuid';
import { firestore } from '../../firebase/config';
import { Button, Input, Form } from 'semantic-ui-react';
import PlayerListPage from '../../pages/player-list/player-list';

import { MatchContext } from '../../providers/match/match.provider';

const AddPlayerPage = ({ isHomeTeam }) => {
  const { addPlayer, removePlayer, playerList } = useContext(MatchContext);
  // const [awayPlayer, setAwayPlayer] = useState('');
  const [homePlayer, setHomePlayer] = useState('');
  // const [homeTeamList, setHomeTeamList] = useState([]);
  // const [awayTeamList, setAwayTeamList] = useState([]);
  const [isPlayerListFinalized, setIsPlayerListFinalized] = useState(false);

  const handleHomeTeamSubmit = (evt) => {
    evt.preventDefault();
    const homePlayerObj = { id: uuid(), playerName: homePlayer };
    addPlayer(homePlayerObj, isHomeTeam);
    setHomePlayer('');
    // setHomeTeamList(homeTeamList.concat(homePlayerCopy));
    // setHomePlayer('');
    if (playerList['homeTeam'].length === 10) {
      updateDb();
    }
  };

  const handleDelete = (playerId) => {
    removePlayer(playerId, isHomeTeam);
  };

  const updateDb = async () => {
    setIsPlayerListFinalized(true);
    await firestore
      .collection('matches')
      .doc()
      .set({
        playerList: {
          homeTeam: playerList['homeTeam'],
        },
      });
  };

  return (
    <div className="flex justify-center pa2">
      <div className="outline w-100 pa3 mr2">
        <h2>Add Home Team Players</h2>
        <Form onSubmit={handleHomeTeamSubmit}>
          <Form.Field>
            <label>First Name</label>
            <Input
              placeholder="First Name"
              name="homeTeam"
              value={homePlayer}
              onChange={(e) => setHomePlayer(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" disabled={playerList['homeTeam'].length >= 10}>
            Submit
          </Button>
        </Form>
        <PlayerListPage
          playerList={playerList.homeTeam}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddPlayerPage;
