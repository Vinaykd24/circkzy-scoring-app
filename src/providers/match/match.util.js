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

const calcOver = (balls) => {
  return Math.floor(balls / 6) + (balls % 6) / 10;
};

export const updateRuns = (state, player, runs) => {
  const bowlerId = state.currentStats.currentBowler;
  const bowler = state.inn1.bowlingTeam[bowlerId];
  const _totalBalls = state.inn1.totalBalls + 1;
  if (runs === 1 || runs === 3) {
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
            runsGiven: bowler.runsGiven + runs,
          },
        },
      },
    };
  } else {
    return {
      ...state,
      inn1: {
        ...state.inn1,
        totalRuns: state.inn1.totalRuns + runs,
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
            runsGiven: bowler.runsGiven + runs,
          },
        },
      },
    };
  }
};
