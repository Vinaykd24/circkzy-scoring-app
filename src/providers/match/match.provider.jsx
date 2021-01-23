import React, { createContext, useState } from 'react';
import {
  addPlayerToList,
  removePlayerFromList,
  addMatchDetailsToDb,
} from './match.util';

export const MatchContext = createContext({
  playerList: { homeTeam: [], awayTeam: [] },
  matchDetails: {
    homeTeamName: '',
    awayTeamName: '',
    venue: '',
    tournametName: '',
  },
  addMatchDetails: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
});

const MatchProvider = ({ children }) => {
  const [matchDetails, setMatchDetails] = useState({
    homeTeamName: '',
    awayTeamName: '',
    venue: '',
    tournametName: '',
  });
  const addMatchDetails = (matchDetails) =>
    setMatchDetails(addMatchDetailsToDb(matchDetails));
  const [playerList, setPlayerList] = useState({ homeTeam: [], awayTeam: [] });
  const addPlayer = (player, isHomeTeam) =>
    isHomeTeam
      ? setPlayerList({
          ...playerList,
          homeTeam: addPlayerToList(playerList.homeTeam, player),
        })
      : setPlayerList({
          ...playerList,
          awayTeam: addPlayerToList(playerList.awayTeam, player),
        });
  const removePlayer = (playerId, isHomeTeam) =>
    isHomeTeam
      ? setPlayerList({
          ...playerList,
          homeTeam: removePlayerFromList(playerList.homeTeam, playerId),
        })
      : setPlayerList({
          ...playerList,
          awayTeam: removePlayerFromList(playerList.awayTeam, playerId),
        });
  return (
    <MatchContext.Provider
      value={{
        playerList,
        addPlayer,
        removePlayer,
        matchDetails,
        addMatchDetails,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;
