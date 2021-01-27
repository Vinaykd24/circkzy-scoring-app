import React, { createContext, useState } from "react";
import {
  addPlayerToList,
  removePlayerFromList,
  addMatchDetailsToDb,
  addPlayerObj,
  removeObj,
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
    tossWonBy: "",
    electedTo: "",
    teamBatingFirst: "",
    isHomTeamBattingFirst: false,
  },
  currentStats: {},
  inn1: {
    battingTeam: {},
    bowlingTeam: {},
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
    tossWonBy: "",
    electedTo: "",
    teamBatingFirst: "",
    isHomTeamBattingFirst: false,
  });
  const addMatchDetails = (matchDetails) =>
    setMatchDetails(addMatchDetailsToDb(matchDetails));
  const [playerList, setPlayerList] = useState({
    homeTeam: [],
    awayTeam: [],
    homeTeamClone: {},
    awayTeamClone: {},
  });
  const [currentStats, setCurrentStats] = useState({});
  const [inn1, setInn1] = useState({ battingTeam: {}, bowlingTeam: {} });
  const updateBattingTeam = () => {
    if (matchDetails.isHomTeamBattingFirst) {
      setInn1({
        ...inn1,
        battingTeam: playerList.homeTeamClone,
        bowlingTeam: playerList.awayTeamClone,
      });
    }
  };
  const addCurrentStatsDetails = (statDetails) => {
    setCurrentStats(statDetails);
  };
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
          // homeTeam: removePlayerFromList(playerList.homeTeam, playerId),
          homeTeamClone: removeObj(playerList.homeTeamClone, playerId),
        })
      : setPlayerList({
          ...playerList,
          // awayTeam: removePlayerFromList(playerList.awayTeam, playerId),
          awayTeamClone: removeObj(playerList.awayTeamClone, playerId),
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
        currentStats,
        addCurrentStatsDetails,
        inn1,
        updateBattingTeam,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;
