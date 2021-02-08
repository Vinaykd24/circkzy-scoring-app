export const addPlayerToList = (playerList, player) => {
  return [...playerList, { ...player }];
};

export const removePlayerFromList = (playerList, playerId) => {
  return playerList.filter((player) => player.id !== playerId);
};

export const removeObj = (list, objKey) => {
  delete list[objKey];
  return list;
};

export const addMatchDetailsToDb = (matchDetails) => {
  return {
    ...matchDetails,
    venue: matchDetails.venue,
    homeTeamName: matchDetails.homeTeamName,
    awayTeamName: matchDetails.awayTeamName,
    tournametName: matchDetails.tournametName,
    tossWonBy: matchDetails.tossWonBy,
    electedTo: matchDetails.electedTo,
    teamBatingFirst: matchDetails.teamBatingFirst,
  };
};

export const addPlayerObj = (state, player) => {
  console.log([...state, { ...player }]);
};

export const updateCurrentStats = (stats, battingList, bowlingList) => {
  return {
    ...stats,
    striker: battingList[stats.striker],
    nonStriker: battingList[stats.nonStriker],
    currentBowler: bowlingList[stats.currentBowler],
  };
};

export const convertArrayToObject = (array) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item['id']]: item,
    };
  }, initialValue);
};

const updateOver = (state) => {
  const _totalBalls = state.inn1.totalBalls + 1;
  const _totalOvers = calcOver(_totalBalls);
  // const _currentBowlerTotalBalls = currentBowler["balls"] + 1;
  return {
    ...state,
    inn1: {
      ...state.inn1,
      totalOvers: state.inn1.totalOvers + _totalOvers,
      totalBalls: state.inn1.totalBalls + _totalBalls,
    },
  };
};

const calcOver = (balls) => {
  return Math.floor(balls / 6) + (balls % 6) / 10;
};

export const updateRuns = (state, player, runs) => {
  const bowlerId = state.currentStats.currentBowler;
  const bowler = state.inn1.bowlingTeam[bowlerId];
  const _totalBalls = state.inn1.totalBalls + 1;
  updateOver(state);

  switch (runs) {
    case 1:
    case 3:
      const { striker, nonStriker } = state.currentStats;
      const temp = striker;
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          striker: nonStriker,
          nonStriker: temp,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalBalls: _totalBalls,
          totalOvers: calcOver(_totalBalls),
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          battingTeam: {
            ...state.inn1.battingTeam,
            [player.id]: {
              ...player,
              ballsPlayed: player.ballsPlayed + 1,
              runs: player.runs + runs,
            },
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowlerId]: {
              ...bowler,
              balls: bowler.balls + 1,
              overs: calcOver(bowler.balls + 1),
              runsGiven: bowler.runsGiven + runs,
            },
          },
        },
      };
    case 0:
    case 2:
    case 4:
    case 6:
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalBalls: _totalBalls,
          totalOvers: calcOver(_totalBalls),
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          battingTeam: {
            ...state.inn1.battingTeam,
            [player.id]: {
              ...player,
              ballsPlayed: player.ballsPlayed + 1,
              runs: player.runs + runs,
              fours: runs === 4 ? player.fours + 1 : player.fours,
              sixes: runs === 6 ? player.sixes + 1 : player.sixes,
            },
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowlerId]: {
              ...bowler,
              balls: bowler.balls + 1,
              overs: calcOver(bowler.balls + 1),
              runsGiven: bowler.runsGiven + runs,
            },
          },
        },
      };
    default:
      break;
  }
};

export const updateExtras = (state, type, runs, bowler) => {
  const _totalBalls = state.inn1.totalBalls + 1;
  switch (type) {
    case 'WB':
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: {
            ...state.inn1.totalExtras,
            wbs: state.inn1.totalExtras.wbs + runs,
            total: state.inn1.totalExtras.total + runs,
          },
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowler.id]: {
              ...bowler,
              wbs: bowler.wbs + runs,
              runsGiven: bowler.runsGiven + runs,
            },
          },
        },
      };
    case 'NB':
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: state.inn1.totalExtras + runs,
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowler.id]: {
              ...bowler,
              nbs: bowler.nbs + runs,
              runsGiven: bowler.runsGiven + runs,
            },
          },
        },
      };
    case 'NB_PLUS':
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: {
            ...state.inn1.totalExtras,
            nbs: state.inn1.totalExtras.nbs + runs,
            total: state.inn1.totalExtras.total + runs,
          },
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowler.id]: {
              ...bowler,
              nbs: bowler.nbs + runs,
              runsGiven: bowler.runsGiven + runs,
            },
          },
        },
      };
    case 'WB_PLUS':
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: {
            ...state.inn1.totalExtras,
            wbs: state.inn1.totalExtras.wbs + runs,
            total: state.inn1.totalExtras.total + runs,
          },
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowler.id]: {
              ...bowler,
              wbs: bowler.wbs + runs,
              runsGiven: bowler.runsGiven + runs,
            },
          },
        },
      };
    case 'BYE_PLUS':
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalBalls: _totalBalls,
          totalOvers: calcOver(_totalBalls),
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: {
            ...state.inn1.totalExtras,
            byes: state.inn1.totalExtras.byes + runs,
            total: state.inn1.totalExtras.total + runs,
          },
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowler.id]: {
              ...bowler,
              balls: bowler.balls + 1,
              overs: calcOver(bowler.balls + 1),
            },
          },
        },
      };
    case 'LBYE_PLUS':
      return {
        ...state,
        currentStats: {
          ...state.currentStats,
          currentOver: [...state.currentStats.currentOver, runs],
        },
        inn1: {
          ...state.inn1,
          totalBalls: _totalBalls,
          totalOvers: calcOver(_totalBalls),
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: {
            ...state.inn1.totalExtras,
            lBye: state.inn1.totalExtras.lBye + runs,
            total: state.inn1.totalExtras.total + runs,
          },
          currentPartnership: {
            runs: state.inn1.currentPartnership.runs + runs,
            balls: state.inn1.currentPartnership.balls + 1,
          },
          bowlingTeam: {
            ...state.inn1.bowlingTeam,
            [bowler.id]: {
              ...bowler,
              balls: bowler.balls + 1,
              overs: calcOver(bowler.balls + 1),
            },
          },
        },
      };
    default:
      break;
  }
};

export const updateWicket = (state, action) => {
  const { striker, nonStriker, currentBowler } = state.currentStats;
  const stikerClone = state.inn1.battingTeam[striker];
  const nonStrikerClone = state.inn1.battingTeam[nonStriker];
  const bowlerId = state.currentStats.currentBowler;
  const bowler = state.inn1.bowlingTeam[bowlerId];
  const _totalBalls = state.inn1.totalBalls + 1;
  updateOver(state);
  if (striker === action.data.outBatsmanId) {
    return {
      ...state,
      currentStats: {
        ...state.currentStats,
        striker: action.data.nextBatsmanId,
        currentOver: [...state.currentStats.currentOver, 'W'],
      },
      inn1: {
        ...state.inn1,
        totalBalls: _totalBalls,
        totalOvers: calcOver(_totalBalls),
        totalWickets: state.inn1.totalWickets + 1,
        currentPartnership: {
          runs: 0,
          balls: 0,
        },
        partnerships: {
          ...state.inn1.partnerships,
          [state.inn1.totalWickets + 1]: {
            ...state.inn1.currentPartnership,
            player1: striker,
            player2: nonStriker,
          },
        },
        battingTeam: {
          ...state.inn1.battingTeam,
          [striker]: {
            ...stikerClone,
            ballsPlayed: stikerClone.ballsPlayed + 1,
            isOut: true,
          },
        },
        bowlingTeam: {
          ...state.inn1.bowlingTeam,
          [currentBowler]: {
            ...bowler,
            balls: bowler.balls + 1,
            overs: calcOver(bowler.balls + 1),
            wkts:
              action.data.howOut === 'Run Out' ? bowler.wkts : bowler.wkts + 1,
          },
        },
      },
    };
  } else if (nonStriker === action.data.outBatsmanId) {
    return {
      ...state,
      currentStats: {
        ...state.currentStats,
        nonStriker: action.data.nextBatsmanId,
        currentOver: [...state.currentStats.currentOver, 'W'],
      },
      inn1: {
        ...state.inn1,
        totalBalls: _totalBalls,
        totalOvers: calcOver(_totalBalls),
        totalWickets: state.inn1.totalWickets + 1,
        currentPartnership: {
          runs: 0,
          balls: 0,
        },
        partnerships: {
          ...state.inn1.partnerships,
          [state.inn1.totalWickets + 1]: {
            ...state.inn1.currentPartnership,
            player1: striker,
            player2: nonStriker,
          },
        },
        battingTeam: {
          ...state.inn1.battingTeam,
          [nonStriker]: {
            ...nonStrikerClone,
            ballsPlayed: nonStrikerClone.ballsPlayed + 1,
            isOut: true,
          },
        },
        bowlingTeam: {
          ...state.inn1.bowlingTeam,
          [currentBowler]: {
            ...bowler,
            balls: bowler.balls + 1,
            overs: calcOver(bowler.balls + 1),
            wkts:
              action.data.howOut === 'Run Out' ? bowler.wkts : bowler.wkts + 1,
          },
        },
      },
    };
  }
};
