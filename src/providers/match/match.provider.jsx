import React, { createContext, useState } from "react";
import {
  addPlayerToList,
  removePlayerFromList,
  addMatchDetailsToDb,
  addPlayerObj,
} from "./match.util";

export const MatchContext = createContext({
  playerList: {
    homeTeam: [],
    awayTeam: [],
    homeTeamClone: {},
    awayTeamClone: {},
  },
  matchDetails: {
    homeTeamName: "",
    awayTeamName: "",
    venue: "",
    tournametName: "",
  },
  addMatchDetails: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
});

const MatchProvider = ({ children }) => {
  const [matchDetails, setMatchDetails] = useState({
    homeTeamName: "",
    awayTeamName: "",
    venue: "",
    tournametName: "",
  });
  const addMatchDetails = (matchDetails) =>
    setMatchDetails(addMatchDetailsToDb(matchDetails));
  const [playerList, setPlayerList] = useState({
    homeTeam: [],
    awayTeam: [],
    homeTeamClone: {},
    awayTeamClone: {},
  });
  const addPlayer = (player, isHomeTeam) =>
    isHomeTeam
      ? setPlayerList({
          ...playerList,
          homeTeam: addPlayerToList(playerList.homeTeam, player),
          homeTeamClone: {
            ...playerList.homeTeamClone,
            [player.id]: player,
          },
        })
      : setPlayerList({
          ...playerList,
          awayTeam: addPlayerToList(playerList.awayTeam, player),
          awayTeamClone: { ...playerList.awayTeamClone, [player.id]: player },
        });
  const removePlayer = (playerId, isHomeTeam) =>
    isHomeTeam
      ? setPlayerList({
          ...playerList,
          homeTeam: removePlayerFromList(playerList.homeTeam, playerId),
          homeTeamClone: delete playerList.homeTeamClone[playerId],
        })
      : setPlayerList({
          ...playerList,
          awayTeam: removePlayerFromList(playerList.awayTeam, playerId),
          awayTeamClone: delete playerList.awayTeamClone[playerId],
        });
  // const homeTeamClone = setPlayerList({
  //   ...playerList,
  //   homeTeamClone: convertArrayToObject(playerList.homeTeam),
  // });
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
