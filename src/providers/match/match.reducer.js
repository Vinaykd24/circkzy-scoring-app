import {
  ADD_MATCH_DETAILS,
  ADD_HOME_TEAM_PLAYER,
  ADD_AWAY_TEAM_PLAYER,
  REMOVE_HOME_PLAYER,
  REMOVE_AWAY_PLAYER,
  SET_BATTING_TEAM,
  SET_INITIAL_STATS,
  SET_DOT_BALL,
  CHANGE_STRIKER,
  SET_ONE_RUN,
  SET_TWO_RUNS,
  SET_THREE_RUNS,
  SET_FOUR_RUNS,
  SET_SIX_RUNS,
  SET_WIDE_BALL,
  SET_NO_BALL,
  SET_BYES,
  SET_LEG_BYES,
  CHANGE_BOWLER,
  SET_WIDE_PLUS_RUNS,
  SET_NO_PLUS_RUNS,
  SET_BYE_PLUS_RUNS,
  SET_LBYE_PLUS_RUNS,
  WICKET_FALLEN,
  NEW_BATSMAN,
  END_OF_INN1,
} from "./match.actions";
import {
  addMatchDetailsToDb,
  removeObj,
  updateExtras,
  updateRuns,
  updateWicket,
} from "./match.util";
import { testInitialState } from "./test-data";

export const initialState = {
  count: 0,
  isFirstInnCompleted: false,
  target: 0,
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
  currentStats: {
    striker: "",
    nonStriker: "",
    currentBowler: "",
    currentOver: [],
  },
  inn1: {
    battingTeam: {},
    bowlingTeam: {},
    currentPartnership: {
      runs: 0,
      balls: 0,
    },
    partnerships: {},
    totalRuns: 0,
    totalWickets: 0,
    totalExtras: {
      wbs: 0,
      nbs: 0,
      byes: 0,
      lBye: 0,
      total: 0,
    },
    totalOvers: 0,
    totalBalls: 0,
  },
  inn2: {
    battingTeam: {},
    bowlingTeam: {},
    currentPartnership: {
      runs: 0,
      balls: 0,
    },
    partnerships: {},
    totalRuns: 0,
    totalWickets: 0,
    totalExtras: {
      wbs: 0,
      nbs: 0,
      byes: 0,
      lBye: 0,
      total: 0,
    },
    totalOvers: 0,
    totalBalls: 0,
  },
};

// export const initialState = testInitialState;

export const matchReducer = (state, action) => {
  const { currentBowler } = state.currentStats;
  const { bowlingTeam } = !state.isFirstInnCompleted ? state.inn1 : state.inn2;
  const bowler = bowlingTeam[currentBowler];
  const { striker, nonStriker } = state.currentStats;
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
              runsGiven: 0,
              balls: 0,
              maidens: 0,
              wkts: 0,
              wbs: 0,
              nbs: 0,
              isOut: false,
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
              runsGiven: 0,
              balls: 0,
              maidens: 0,
              wkts: 0,
              wbs: 0,
              nbs: 0,
              isOut: false,
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
        inn2: {
          ...state.inn2,
          battingTeam: state.matchDetails.isHomTeamBattingFirst
            ? state.playerList.awayTeamClone
            : state.playerList.homeTeamClone,
          bowlingTeam: state.matchDetails.isHomTeamBattingFirst
            ? state.playerList.homeTeamClone
            : state.playerList.awayTeamClone,
        },
      };
    case SET_INITIAL_STATS:
      return {
        ...state,
        currentStats: action.currentStats,
      };
    case CHANGE_STRIKER:
      const temp = striker;
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          striker: nonStriker,
          nonStriker: temp,
        },
      };
    case CHANGE_BOWLER:
      // const { currentBowler } = state.currentStats;
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentBowler: action.bowler,
        },
      };
    case NEW_BATSMAN:
      return updateWicket(state, action);
    case WICKET_FALLEN:
      if (!state.isFirstInnCompleted) {
        return {
          ...state,
          inn1: {
            ...state.inn1,
            totalWickets: state.inn1.totalWickets + 1,
            bowlingTeam: {
              ...state.inn1.bowlingTeam,
              [currentBowler]: {
                ...bowler,
                wkts: bowler.wkts + 1,
              },
            },
          },
        };
      } else {
        return {
          ...state,
          inn2: {
            ...state.inn2,
            totalWickets: state.inn1.totalWickets + 1,
            bowlingTeam: {
              ...state.inn1.bowlingTeam,
              [currentBowler]: {
                ...bowler,
                wkts: bowler.wkts + 1,
              },
            },
          },
        };
      }
    case END_OF_INN1:
      return {
        ...state,
        target: state.inn1.totalRuns,
        isFirstInnCompleted: action.isFirstInnCompleted,
      };
    case SET_DOT_BALL:
      return updateRuns(state, action.player, 0);
    case SET_ONE_RUN:
      return updateRuns(state, action.player, 1);
    case SET_TWO_RUNS:
      return updateRuns(state, action.player, 2);
    case SET_THREE_RUNS:
      return updateRuns(state, action.player, 3);
    case SET_FOUR_RUNS:
      return updateRuns(state, action.player, 4);
    case SET_SIX_RUNS:
      return updateRuns(state, action.player, 6);
    case SET_WIDE_BALL:
      return updateExtras(state, "WB", 1, action.bowler);
    case SET_NO_BALL:
      return updateExtras(state, "NB", 1, action.bowler);
    case SET_BYES:
      return updateExtras(state, "BYES", 1, action.bowler);
    case SET_LEG_BYES:
      return updateExtras(state, "LBYES", 1, action.bowler);
    case SET_WIDE_PLUS_RUNS:
      return updateExtras(state, "WB_PLUS", action.extras, bowler);
    case SET_NO_PLUS_RUNS:
      return updateExtras(state, "NB_PLUS", action.extras, bowler);
    case SET_BYE_PLUS_RUNS:
      return updateExtras(state, "BYE_PLUS", action.extras, bowler);
    case SET_LBYE_PLUS_RUNS:
      return updateExtras(state, "LBYE_PLUS", action.extras, bowler);
    default:
      throw new Error();
  }
};
