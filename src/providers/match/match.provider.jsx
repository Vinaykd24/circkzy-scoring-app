import React, { createContext, useState, useReducer } from "react";
import { matchReducer, initialState } from "./match.reducer";
import {
  addPlayerToList,
  removePlayerFromList,
  addMatchDetailsToDb,
  addPlayerObj,
  removeObj,
  updateCurrentStats,
} from "./match.util";

export const MatchContext = createContext({
  playerList: {
    homeTeam: [],
    awayTeam: [],
    homeTeamClone: {},
    awayTeamClone: {},
  },
  // matchDetails: {
  //   homeTeamName: "",
  //   awayTeamName: "",
  //   venue: "",
  //   tournametName: "",
  //   tossWonBy: "",
  //   electedTo: "",
  //   teamBatingFirst: "",
  //   isHomTeamBattingFirst: false,
  // },
  currentStats: { striker: "", nonStriker: "", currentBowler: "" },
  inn1: {
    battingTeam: {},
    bowlingTeam: {},
  },
  // addMatchDetails: () => {},
  // addPlayer: () => {},
  // removePlayer: () => {},
});

const MatchProvider = ({ children }) => {
  const [rootState, dispatch] = useReducer(matchReducer, initialState);
  // const [matchDetails, setMatchDetails] = useState({
  //   homeTeamName: "",
  //   awayTeamName: "",
  //   venue: "",
  //   tournametName: "",
  //   tossWonBy: "",
  //   electedTo: "",
  //   teamBatingFirst: "",
  //   isHomTeamBattingFirst: false,
  // });
  // const addMatchDetails = (matchDetails) =>
  //   setMatchDetails(addMatchDetailsToDb(matchDetails));
  const [playerList, setPlayerList] = useState({
    homeTeam: [],
    awayTeam: [],
    homeTeamClone: {},
    awayTeamClone: {},
  });
  const [currentStats, setCurrentStats] = useState({
    striker: "",
    nonStriker: "",
    currentBowler: "",
  });
  const [inn1, setInn1] = useState({ battingTeam: {}, bowlingTeam: {} });
  const updateBattingTeam = () => {
    if (rootState.matchDetails.isHomTeamBattingFirst) {
      setInn1({
        ...inn1,
        battingTeam: playerList.homeTeamClone,
        bowlingTeam: playerList.awayTeamClone,
      });
    } else {
      setInn1({
        ...inn1,
        battingTeam: playerList.awayTeamClone,
        bowlingTeam: playerList.homeTeamClone,
      });
    }
  };
  const addCurrentStatsDetails = (statDetails) => {
    setCurrentStats(
      updateCurrentStats(statDetails, inn1.battingTeam, inn1.bowlingTeam)
    );
  };
  // const addPlayer = (player, isHomeTeam) =>
  //   isHomeTeam
  //     ? setPlayerList({
  //         ...playerList,
  //         homeTeam: addPlayerToList(playerList.homeTeam, player),
  //         homeTeamClone: {
  //           ...playerList.homeTeamClone,
  //           [player.id]: {
  //             ...player,
  //             runs: 0,
  //             ballsPlayed: 0,
  //             fours: 0,
  //             sixes: 0,
  //             overs: 0,
  //             balls: 0,
  //             maidens: 0,
  //             wkts: 0,
  //             wbs: 0,
  //             nbs: 0,
  //           },
  //         },
  //       })
  //     : setPlayerList({
  //         ...playerList,
  //         awayTeam: addPlayerToList(playerList.awayTeam, player),
  //         awayTeamClone: {
  //           ...playerList.awayTeamClone,
  //           [player.id]: {
  //             ...player,
  //             runs: 0,
  //             ballsPlayed: 0,
  //             fours: 0,
  //             sixes: 0,
  //             overs: 0,
  //             balls: 0,
  //             maidens: 0,
  //             wkts: 0,
  //             wbs: 0,
  //             nbs: 0,
  //           },
  //         },
  //       });
  // const removePlayer = (playerId, isHomeTeam) =>
  //   isHomeTeam
  //     ? setPlayerList({
  //         ...playerList,
  //         // homeTeam: removePlayerFromList(playerList.homeTeam, playerId),
  //         homeTeamClone: removeObj(playerList.homeTeamClone, playerId),
  //       })
  //     : setPlayerList({
  //         ...playerList,
  //         // awayTeam: removePlayerFromList(playerList.awayTeam, playerId),
  //         awayTeamClone: removeObj(playerList.awayTeamClone, playerId),
  //       });
  // const homeTeamClone = setPlayerList({
  //   ...playerList,
  //   homeTeamClone: convertArrayToObject(playerList.homeTeam),
  // });
  return (
    <MatchContext.Provider
      value={{
        playerList,
        // addPlayer,
        // removePlayer,
        // matchDetails,
        // addMatchDetails,
        currentStats,
        addCurrentStatsDetails,
        inn1,
        updateBattingTeam,
        rootState,
        rootDispatch: dispatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;
