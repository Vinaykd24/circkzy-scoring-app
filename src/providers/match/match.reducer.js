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
} from './match.actions';
import { addMatchDetailsToDb, removeObj, updateRuns } from './match.util';

// export const initialState = {
//   count: 0,
//   playerList: {
//     homeTeam: [],
//     awayTeam: [],
//     homeTeamClone: {},
//     awayTeamClone: {},
//   },
//   matchDetails: {
//     homeTeamName: '',
//     awayTeamName: '',
//     venue: '',
//     tournametName: '',
//     tossWonBy: '',
//     electedTo: '',
//     teamBatingFirst: '',
//     isHomTeamBattingFirst: false,
//   },
//   currentStats: { striker: '', nonStriker: '', currentBowler: '' },
//   inn1: {
//     battingTeam: {},
//     bowlingTeam: {},
//     totalRuns: 0,
//     totalWickets: 0,
//     totalExtras: 0,
// totalOvers: 0,
// totalBalls: 0,
//   },
// };

export const initialState = {
  count: 0,
  playerList: {
    homeTeam: [],
    awayTeam: [],
    homeTeamClone: {
      '5b6feb-b7ec-371-b6a4-01c48587b7': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '5b6feb-b7ec-371-b6a4-01c48587b7',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Vinay',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      '6e10a7a-2ae-3d2-0d22-2c736e0bc4': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '6e10a7a-2ae-3d2-0d22-2c736e0bc4',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Ajit',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      'f02fbc6-f5cf-85d8-0156-7b82c20645a': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: 'f02fbc6-f5cf-85d8-0156-7b82c20645a',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Sachin',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
    },
    awayTeamClone: {
      '0d7443-8ea0-11e6-acac-8a0f7f11117': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '0d7443-8ea0-11e6-acac-8a0f7f11117',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Sai',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      '5ef7e66-48b6-4606-6a24-eab116e63c51': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '5ef7e66-48b6-4606-6a24-eab116e63c51',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Ram',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      '364f6c-6fc5-40ca-f5c3-acad4e6c348': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '364f6c-6fc5-40ca-f5c3-acad4e6c348',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Mohan',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
    },
  },
  matchDetails: {
    homeTeamName: '',
    awayTeamName: '',
    venue: '',
    tournametName: '',
    tossWonBy: '',
    electedTo: '',
    teamBatingFirst: '',
    isHomTeamBattingFirst: false,
  },
  currentStats: {
    currentBowler: '0d7443-8ea0-11e6-acac-8a0f7f11117',
    nonStriker: '6e10a7a-2ae-3d2-0d22-2c736e0bc4',
    striker: '5b6feb-b7ec-371-b6a4-01c48587b7',
  },
  inn1: {
    battingTeam: {
      '5b6feb-b7ec-371-b6a4-01c48587b7': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '5b6feb-b7ec-371-b6a4-01c48587b7',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Vinay',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      '6e10a7a-2ae-3d2-0d22-2c736e0bc4': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '6e10a7a-2ae-3d2-0d22-2c736e0bc4',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Ajit',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      'f02fbc6-f5cf-85d8-0156-7b82c20645a': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: 'f02fbc6-f5cf-85d8-0156-7b82c20645a',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Sachin',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
    },
    bowlingTeam: {
      '0d7443-8ea0-11e6-acac-8a0f7f11117': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '0d7443-8ea0-11e6-acac-8a0f7f11117',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Sai',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      '5ef7e66-48b6-4606-6a24-eab116e63c51': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '5ef7e66-48b6-4606-6a24-eab116e63c51',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Ram',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
      '364f6c-6fc5-40ca-f5c3-acad4e6c348': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '364f6c-6fc5-40ca-f5c3-acad4e6c348',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Mohan',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
      },
    },
    totalRuns: 0,
    totalWickets: 0,
    totalExtras: 0,
    totalOvers: 0,
    totalBalls: 0,
  },
};

export const matchReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
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
    case CHANGE_STRIKER:
      const { striker, nonStriker } = state.currentStats;
      const temp = striker;
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          striker: nonStriker,
          nonStriker: temp,
        },
      };
    case SET_DOT_BALL:
      const bowlerId = state.currentStats.currentBowler;
      const bowler = state.inn1.bowlingTeam[bowlerId];
      return {
        ...state,
        inn1: {
          ...state.inn1,
          battingTeam: {
            ...state.inn1.battingTeam,
            [action.player.id]: {
              ...action.player,
              ballsPlayed: action.player.ballsPlayed + 1,
            },
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowlerId]: {
              ...bowler,
              balls: bowler.balls + 1,
            },
          },
        },
      };
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
    default:
      throw new Error();
  }
};
