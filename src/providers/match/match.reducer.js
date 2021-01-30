import {
  ADD_MATCH_DETAILS,
  ADD_HOME_TEAM_PLAYER,
  ADD_AWAY_TEAM_PLAYER,
  REMOVE_HOME_PLAYER,
  REMOVE_AWAY_PLAYER,
  SET_BATTING_TEAM,
  SET_INITIAL_STATS,
} from "./match.actions";
import { addMatchDetailsToDb, removeObj } from "./match.util";

export const initialState = {
  count: 0,
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
  currentStats: { striker: "", nonStriker: "", currentBowler: "" },
  inn1: {
    battingTeam: {},
    bowlingTeam: {},
  },
};

export const matchReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case ADD_MATCH_DETAILS:
      return {
        ...state,
        matchDetails: addMatchDetailsToDb(action.matchDetails),
      };
    case ADD_HOME_TEAM_PLAYER:
      return {
        ...state,
        playerList: {
          ...state.playerList,
          homeTeamClone: {
            ...state.playerList.homeTeamClone,
            [action.player.id]: {
              ...action.player,
              runs: 0,
              ballsPlayed: 0,
              fours: 0,
              sixes: 0,
              overs: 0,
              balls: 0,
              maidens: 0,
              wkts: 0,
              wbs: 0,
              nbs: 0,
            },
          },
        },
      };
    case ADD_AWAY_TEAM_PLAYER:
      return {
        ...state,
        playerList: {
          ...state.playerList,
          awayTeamClone: {
            ...state.playerList.awayTeamClone,
            [action.player.id]: {
              ...action.player,
              runs: 0,
              ballsPlayed: 0,
              fours: 0,
              sixes: 0,
              overs: 0,
              balls: 0,
              maidens: 0,
              wkts: 0,
              wbs: 0,
              nbs: 0,
            },
          },
        },
      };
    case REMOVE_HOME_PLAYER:
      return {
        ...state,
        playerList: {
          ...state.playerList,
          homeTeamClone: removeObj(
            state.playerList.homeTeamClone,
            action.playerId
          ),
        },
      };
    case REMOVE_AWAY_PLAYER:
      return {
        ...state,
        playerList: {
          ...state.playerList,
          awayTeamClone: removeObj(
            state.playerList.awayTeamClone,
            action.playerId
          ),
        },
      };
    case SET_BATTING_TEAM:
      return {
        ...state,
        inn1: {
          ...state.inn1,
          battingTeam: state.matchDetails.isHomTeamBattingFirst
            ? state.playerList.homeTeamClone
            : state.playerList.awayTeamClone,
          bowlingTeam: state.matchDetails.isHomTeamBattingFirst
            ? state.playerList.awayTeamClone
            : state.playerList.homeTeamClone,
        },
      };
    case SET_INITIAL_STATS:
      return {
        ...state,
        currentStats: action.currentStats,
      };
    default:
      throw new Error();
  }
};
