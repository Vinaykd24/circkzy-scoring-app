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
        },
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalBalls: _totalBalls,
          totalOvers: calcOver(_totalBalls),
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
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalBalls: _totalBalls,
          totalOvers: calcOver(_totalBalls),
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
  switch (type) {
    case 'WB':
      return {
        ...state,
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: {
            ...state.inn1.totalExtras,
            wbs: state.inn1.totalExtras.wbs + runs,
            total: state.inn1.totalExtras.total + runs,
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
        inn1: {
          ...state.inn1,
          totalRuns: state.inn1.totalRuns + runs,
          totalExtras: state.inn1.totalExtras + runs,
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

    default:
      break;
  }
};
