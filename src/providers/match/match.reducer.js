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
} from './match.actions';
import {
  addMatchDetailsToDb,
  removeObj,
  updateExtras,
  updateRuns,
  updateWicket,
} from './match.util';

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
//   currentStats: { striker: '', nonStriker: '', currentBowler: '', currentOver: [], },
//   inn1: {
//     battingTeam: {},
//     bowlingTeam: {},
// currentPartnership: {
//   runs: 0,
//   balls: 0,
// },
// partnerships: {},
//     totalRuns: 0,
//     totalWickets: 0,
//     totalExtras: 0,
// totalRuns: 0,
// totalWickets: 0,
// totalExtras: {
//   wbs: 0,
//   nbs: 0,
//   byes: 0,
//   lBye: 0,
//   total: 0,
// },
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
    currentOver: [],
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
        isOut: false,
      },
      '2b6feb-b7ec-371-b6a4-01c48588b3': {
        balls: 0,
        ballsPlayed: 0,
        fours: 0,
        id: '2b6feb-b7ec-371-b6a4-01c48588b3',
        maidens: 0,
        nbs: 0,
        overs: 0,
        playerName: 'Adam',
        runs: 0,
        runsGiven: 0,
        sixes: 0,
        wbs: 0,
        wkts: 0,
        isOut: false,
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
        isOut: false,
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
        isOut: false,
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
        isOut: false,
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
        isOut: false,
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
        isOut: false,
      },
    },
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

export const matchReducer = (state, action) => {
  const { currentBowler } = state.currentStats;
  const { bowlingTeam } = state.inn1;
  const bowler = bowlingTeam[currentBowler];
  const { striker, nonStriker } = state.currentStats;
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
      return updateExtras(state, 'WB', 1, action.bowler);
    case SET_NO_BALL:
      return updateExtras(state, 'NB', 1, action.bowler);
    case SET_BYES:
      return updateExtras(state, 'BYES', 1, action.bowler);
    case SET_LEG_BYES:
      return updateExtras(state, 'LBYES', 1, action.bowler);
    case SET_WIDE_PLUS_RUNS:
      return updateExtras(state, 'WB_PLUS', action.extras, bowler);
    case SET_NO_PLUS_RUNS:
      return updateExtras(state, 'NB_PLUS', action.extras, bowler);
    case SET_BYE_PLUS_RUNS:
      return updateExtras(state, 'BYE_PLUS', action.extras, bowler);
    case SET_LBYE_PLUS_RUNS:
      return updateExtras(state, 'LBYE_PLUS', action.extras, bowler);
    default:
      throw new Error();
  }
};
